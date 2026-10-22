import catv from 'commit-and-tag-version'
import semver from 'semver'
import { format, resolveConfig } from 'prettier'
import { execFileSync } from 'node:child_process'
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  unlinkSync,
} from 'node:fs'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    'first-release': { type: 'boolean' },
    'dry-run': { type: 'boolean' },
    prepare: { type: 'boolean' },
    prerelease: { type: 'string' },
    help: { type: 'boolean' },
  },
})
const usage =
  'Usage: pnpm run release[:prepare] vue2|vue3 [patch|minor|major|version] [--first-release] [--prerelease beta|rc] [--dry-run] [--prepare]'
if (values.help) {
  console.log(usage)
  process.exit(0)
}
const [line, releaseAs] = positionals
if (
  !['vue2', 'vue3'].includes(line) ||
  positionals.length > 2 ||
  (releaseAs &&
    !['patch', 'minor', 'major'].includes(releaseAs) &&
    !semver.valid(releaseAs)) ||
  (values.prerelease && !['beta', 'rc'].includes(values.prerelease)) ||
  (values['first-release'] && (releaseAs || values.prerelease))
)
  throw new Error(usage)

const dryRun = values['dry-run'] ?? false
const firstRelease = values['first-release'] ?? false
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const originalHead = git('rev-parse', 'HEAD')
let stagedForCommit = false
if (!dryRun && git('status', '--porcelain'))
  throw new Error(
    'Commit working changes before preparing a release; --dry-run previews committed history without changing files',
  )
if (git('rev-parse', '--is-shallow-repository') === 'true')
  throw new Error('Fetch full history and tags before preparing a release')
const { refactorCommit } = JSON.parse(
  readFileSync('release.config.json', 'utf8'),
)
git('merge-base', '--is-ancestor', refactorCommit, 'HEAD')
const legacyParent = git('rev-parse', `${refactorCommit}^`)
const legacyHashes = git('rev-list', legacyParent).split('\n')
const prefix = `${line}-v`
const tags = git('tag', '--merged', 'HEAD', '--list', `${prefix}*`)
  .split('\n')
  .filter((tag) => semver.valid(tag.slice(prefix.length)))
if (firstRelease && tags.length)
  throw new Error('This version line already has release tags')
if (!firstRelease && !tags.length)
  throw new Error('Start this refactored version line with --first-release')

const manifestPath = `packages/${line}/package.json`
const changelogPath = `packages/${line}/CHANGELOG.md`
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const validateVersion = (version) => {
  if (
    !/^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:beta|rc)\.(?:0|[1-9]\d*))?$/.test(
      version,
    ) ||
    (line === 'vue2' ? semver.major(version) !== 4 : semver.major(version) < 5)
  )
    throw new Error(
      'Vue 2 requires 4.x; Vue 3 requires 5.x or newer; prereleases use beta.N or rc.N',
    )
  if (!firstRelease && !semver.gt(version, manifest.version))
    throw new Error('Version must increase')
  if (git('tag', '--list', `${prefix}${version}`))
    throw new Error(`Tag ${prefix}${version} already exists`)
}
let nextVersion = firstRelease ? manifest.version : undefined
if (firstRelease) validateVersion(nextVersion)
if (releaseAs && semver.valid(releaseAs)) validateVersion(releaseAs)
const opposite = line === 'vue2' ? 'vue3' : 'vue2'
const paths = [
  '.',
  `:(exclude)packages/${opposite}`,
  ...(line === 'vue3'
    ? [':(exclude)docs/vue2', ':(exclude)docs/en/vue2']
    : [
        ':(exclude)docs/guide',
        ':(exclude)docs/reference',
        ':(exclude)docs/en/guide',
        ':(exclude)docs/en/reference',
      ]),
  ':(exclude)releases',
  ':(exclude)**/CHANGELOG.md',
]
const snapshots = new Map(
  [manifestPath, changelogPath].map((path) => [
    path,
    existsSync(path) ? readFileSync(path) : null,
  ]),
)
try {
  await catv({
    firstRelease,
    dryRun,
    releaseAs,
    prerelease: values.prerelease,
    tagPrefix: prefix,
    path: paths,
    preset: {
      name: new URL('./release-preset.mjs', import.meta.url).href,
      legacyHashes,
    },
    packageFiles: [manifestPath],
    bumpFiles: [
      {
        filename: manifestPath,
        updater: {
          readVersion: (text) => JSON.parse(text).version,
          writeVersion(text, version) {
            validateVersion(version)
            nextVersion = version
            return (
              JSON.stringify({ ...JSON.parse(text), version }, null, 2) + '\n'
            )
          },
        },
      },
    ],
    infile: changelogPath,
    releaseCount: firstRelease ? 0 : 1,
    header: `# Changelog\n\n${line === 'vue2' ? 'Vue 2' : 'Vue 3'} releases from the v4 rewrite. Legacy release history is intentionally excluded.\n`,
    skip: { commit: true, tag: true },
  })
  if (!nextVersion) throw new Error('CATV did not determine a release version')
  const tag = `${prefix}${nextVersion}`
  if (dryRun)
    console.log(
      `Preview: ${tag}. Only committed changes are included; no files, commits or tags changed.`,
    )
  else {
    if (JSON.parse(readFileSync(manifestPath, 'utf8')).version !== nextVersion)
      throw new Error('CATV did not update the workspace version')
    const changelog = readFileSync(changelogPath, 'utf8')
    const section = changelog.match(/^#{2,3} .*\d+\.\d+\.\d+.*$/m)
    if (!section) throw new Error('CATV did not generate a release section')
    const latest = changelog
      .slice(section.index)
      .split(/\n(?=#{2,3} (?:\[)?\d+\.\d+\.\d+)/)[0]
      .trim()
    const notesPath = `releases/${tag}.md`
    if (existsSync(notesPath)) throw new Error(`${notesPath} already exists`)
    snapshots.set(notesPath, null)
    const formatting = {
      ...(await resolveConfig('CHANGELOG.md')),
      parser: 'markdown',
    }
    const formattedChangelog = await format(changelog, formatting)
    const formattedNotes = await format(latest + '\n', formatting)
    mkdirSync('releases', { recursive: true })
    writeFileSync(changelogPath, formattedChangelog)
    writeFileSync(notesPath, formattedNotes)
    if (!values.prepare) {
      git('add', '--', manifestPath, changelogPath, notesPath)
      stagedForCommit = true
      await catv({
        packageFiles: [manifestPath],
        bumpFiles: [],
        skip: { bump: true, changelog: true },
        commitAll: true,
        tagPrefix: prefix,
      })
      console.log(
        `Created the release commit and annotated tag ${tag}. Review them, then push with git push --follow-tags origin <branch>. CI publishes the tagged version after checks pass. No push or publish was performed.`,
      )
    } else {
      console.log(
        `Prepared ${tag}. Review and commit the generated files, then create and push the annotated tag ${tag}. No commit, tag or publish was performed.`,
      )
    }
  }
} catch (error) {
  if (!dryRun && git('rev-parse', 'HEAD') === originalHead) {
    if (stagedForCommit) git('restore', '--staged', '--', ...snapshots.keys())
    for (const [path, original] of snapshots) {
      if (original) writeFileSync(path, original)
      else if (existsSync(path)) unlinkSync(path)
    }
  }
  throw error
}
