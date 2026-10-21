// @vitest-environment node
import { afterEach, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'

const releaseScript = resolve('scripts/release.mjs')
const branchScript = resolve('scripts/release-branch.mjs')
const directories: string[] = []
function fixture() {
  const directory = mkdtempSync(join(tmpdir(), 'fullscreen-release-'))
  directories.push(directory)
  const git = (...args: string[]) =>
    execFileSync('git', args, {
      cwd: directory,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()
  const write = (path: string, content: string) => {
    mkdirSync(dirname(join(directory, path)), { recursive: true })
    writeFileSync(join(directory, path), content)
  }
  const read = (path: string) => readFileSync(join(directory, path), 'utf8')
  const commit = (message: string) => {
    git('add', '.')
    git('commit', '-m', message)
    return git('rev-parse', 'HEAD')
  }
  const run = (...args: string[]) =>
    execFileSync(process.execPath, [releaseScript, ...args], {
      cwd: directory,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  const branch = (tag: string) =>
    execFileSync(process.execPath, [branchScript, tag], {
      cwd: directory,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  git('init', '-b', 'master')
  git('config', 'user.name', 'Release test')
  git('config', 'user.email', 'release@example.test')
  git('config', 'commit.gpgsign', 'false')
  write(
    'package.json',
    JSON.stringify({
      name: 'release-fixture',
      private: true,
      type: 'module',
      repository: 'https://github.com/mirari/vue-fullscreen',
    }),
  )
  write('.gitignore', '')
  write('legacy.js', 'legacy')
  const legacy = commit('feat!: legacy breaking implementation')
  git('tag', 'v3.1.3')
  git('tag', 'v2.6.3')
  for (const [line, version] of [
    ['vue3', '4.0.0'],
    ['vue2', '2.7.0-beta.0'],
  ]) {
    write(
      `packages/${line}/package.json`,
      JSON.stringify({
        name: `@vue-fullscreen/${line}`,
        version,
        private: true,
      }),
    )
    write(`packages/${line}/CHANGELOG.md`, '# Changelog\n\nNew rewrite only.\n')
  }
  write(
    'pnpm-lock.yaml',
    "lockfileVersion: '9.0'\nimporters:\n  .: {}\n  packages/vue2: {}\n  packages/vue3: {}\n",
  )
  write('packages/core/index.js', 'rewrite')
  const refactor = commit('refactor: fresh fullscreen rewrite')
  write(
    'release.config.json',
    JSON.stringify({
      sourceBranch: 'master',
      bootstrapBranch: 'v4',
      bootstrapTag: 'vue3-v4.0.0',
      refactorCommit: refactor,
    }),
  )
  commit('chore: configure releases')
  write('packages/vue2/only.js', 'vue2')
  commit('feat: Vue 2 adapter only')
  write('packages/vue3/only.js', 'vue3')
  commit('fix: Vue 3 adapter only')
  write('packages/core/shared.js', 'shared')
  commit('feat: shared fullscreen controls')
  return { directory, git, write, read, commit, run, branch, legacy }
}
afterEach(() => {
  for (const directory of directories.splice(0)) {
    expect(dirname(resolve(directory))).toBe(resolve(tmpdir()))
    rmSync(directory, { recursive: true, force: true })
  }
})

it('starts fresh independent histories, previews safely, and uses CATV to bump workspace metadata', () => {
  const f = fixture()
  const originalVersion = f.read('packages/vue3/package.json')
  const originalLock = f.read('pnpm-lock.yaml')
  expect(f.run('vue3', '--first-release', '--dry-run')).toContain(
    'Preview: vue3-v4.0.0',
  )
  expect(f.git('status', '--porcelain')).toBe('')
  expect(f.read('packages/vue3/package.json')).toBe(originalVersion)
  const tagsBefore = f.git('tag')
  f.run('vue3', '--first-release')
  const initial = f.read('packages/vue3/CHANGELOG.md')
  expect(initial).toContain('fresh fullscreen rewrite')
  expect(initial).toContain('shared fullscreen controls')
  expect(initial).toContain('Vue 3 adapter only')
  expect(initial).not.toContain('Vue 2 adapter only')
  expect(initial).not.toContain('legacy breaking')
  expect(initial.match(/# Changelog/g)).toHaveLength(1)
  expect(f.read('releases/vue3-v4.0.0.md')).toContain('## 4.0.0')
  expect(f.git('tag')).toBe(tagsBefore)
  expect(f.git('diff', '--cached')).toBe('')
  f.commit('chore(release): vue3-v4.0.0')
  f.git('tag', 'vue3-v4.0.0')

  f.run('vue2', '--first-release')
  const vue2Log = f.read('packages/vue2/CHANGELOG.md')
  expect(vue2Log).toContain('Vue 2 adapter only')
  expect(vue2Log).toContain('shared fullscreen controls')
  expect(vue2Log).not.toContain('Vue 3 adapter only')
  expect(vue2Log).not.toContain('legacy breaking')
  f.commit('chore(release): vue2-v2.7.0-beta.0')
  f.git('tag', 'vue2-v2.7.0-beta.0')
  expect(f.run('vue2', '--prerelease', 'beta', '--dry-run')).toContain(
    'vue2-v2.7.0-beta.1',
  )

  f.write('packages/core/new.js', 'feature')
  f.commit('feat: reactive shared options')
  f.write('scratch.txt', 'uncommitted changes')
  const dirty = f.git('status', '--porcelain')
  expect(f.run('vue3', '--dry-run')).toContain('vue3-v4.1.0')
  expect(f.git('status', '--porcelain')).toBe(dirty)
  expect(() => f.run('vue3')).toThrow()
  f.commit('chore: scratch file')
  f.run('vue3')
  expect(JSON.parse(f.read('packages/vue3/package.json')).version).toBe('4.1.0')
  expect(f.read('pnpm-lock.yaml')).toBe(originalLock)
  expect(JSON.parse(f.read('packages/vue2/package.json')).version).toBe(
    '2.7.0-beta.0',
  )
  expect(f.read('releases/vue3-v4.1.0.md')).toContain('reactive shared options')
  expect(f.read('releases/vue3-v4.1.0.md')).not.toContain(
    'shared fullscreen controls',
  )
  expect(f.read('packages/vue2/CHANGELOG.md')).toBe(vue2Log)
}, 60000)

it('continues prereleases and includes their changes in stable release notes', () => {
  const f = fixture()
  f.run('vue3', '--first-release')
  f.commit('chore(release): initial')
  f.git('tag', 'vue3-v4.0.0')
  f.write('packages/vue3/feature.js', 'beta')
  f.commit('feat: beta fullscreen feature')
  f.run('vue3', '--prerelease', 'beta')
  expect(JSON.parse(f.read('packages/vue3/package.json')).version).toBe(
    '4.1.0-beta.0',
  )
  f.commit('chore(release): beta zero')
  f.git('tag', 'vue3-v4.1.0-beta.0')
  f.write('packages/vue3/fix.js', 'fix')
  f.commit('fix: beta cleanup correction')
  f.run('vue3', '--prerelease', 'beta')
  expect(JSON.parse(f.read('packages/vue3/package.json')).version).toBe(
    '4.1.0-beta.1',
  )
  const beta = f.read('releases/vue3-v4.1.0-beta.1.md')
  expect(beta).toContain('beta cleanup correction')
  expect(beta).not.toContain('beta fullscreen feature')
  f.commit('chore(release): beta one')
  f.git('tag', 'vue3-v4.1.0-beta.1')
  f.run('vue3', '4.1.0')
  const stable = f.read('releases/vue3-v4.1.0.md')
  expect(stable).toContain('beta fullscreen feature')
  expect(stable).toContain('beta cleanup correction')
  expect(stable).not.toContain('legacy breaking')
  f.commit('chore(release): stable')
  f.git('tag', 'vue3-v4.1.0')
  f.write('packages/vue3/feature.js', 'breaking')
  f.commit('feat!: redesign fullscreen controls')
  f.run('vue3')
  expect(JSON.parse(f.read('packages/vue3/package.json')).version).toBe('5.0.0')
}, 60000)

it('rejects invalid versions and restores metadata when notes cannot be written', () => {
  const f = fixture()
  expect(() => f.run('vue3', '4.0.1')).toThrow()
  f.run('vue3', '--first-release')
  f.commit('chore(release): initial')
  f.git('tag', 'vue3-v4.0.0')
  expect(() => f.run('vue3', '--first-release')).toThrow()
  expect(() => f.run('vue3', '3.9.0')).toThrow()
  expect(() => f.run('vue3', '4.0.0')).toThrow()
  f.write('releases/vue3-v4.0.1.md', 'reviewed notes')
  f.commit('chore: preserve reviewed notes')
  expect(() => f.run('vue3', '4.0.1')).toThrow()
  expect(f.git('status', '--porcelain')).toBe('')
  expect(f.read('releases/vue3-v4.0.1.md')).toBe('reviewed notes')
  expect(JSON.parse(f.read('packages/vue3/package.json')).version).toBe('4.0.0')
}, 60000)

it('allows only the bootstrap on v4, then requires master independently of v4', () => {
  const f = fixture()
  f.git('update-ref', 'refs/remotes/origin/master', f.legacy)
  f.git('update-ref', 'refs/remotes/origin/v4', 'HEAD')
  expect(f.branch('vue3-v4.0.0')).toContain('verified release commit on v4')
  expect(() => f.branch('vue3-v4.0.1')).toThrow()
  expect(() => f.branch('vue2-v2.7.0-beta.0')).toThrow()
  f.git('update-ref', 'refs/remotes/origin/master', 'HEAD')
  f.write('packages/core/later.js', 'later')
  f.commit('fix: maintain fullscreen on master')
  f.git('update-ref', 'refs/remotes/origin/master', 'HEAD')
  expect(f.branch('vue3-v4.0.1')).toContain('verified release commit on master')
  expect(f.branch('vue2-v2.7.0-beta.0')).toContain(
    'verified release commit on master',
  )
})
