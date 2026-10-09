import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
const [line, version, ...notes] = process.argv.slice(2)
if (
  !['vue2', 'vue3'].includes(line) ||
  !new RegExp(
    `^${line === 'vue2' ? 2 : 4}\\.\\d+\\.\\d+(?:-(?:beta|rc)\\.\\d+)?$`,
  ).test(version ?? '') ||
  !notes.length
) {
  throw new Error(
    'Usage: npm run release:prepare -- vue2|vue3 4.0.1-beta.1 "Release notes" (Vue 2 uses 2.x; Vue 3 uses 4.x)',
  )
}
if (execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim())
  throw new Error('Commit working changes before preparing a release')
const path = `packages/${line}/package.json`
const pkg = JSON.parse(readFileSync(path, 'utf8'))
function parts(v) {
  const [base, pre] = v.split('-')
  return [
    ...base.split('.').map(Number),
    pre ? (pre.startsWith('beta') ? 0 : 1) : 2,
    pre ? Number(pre.split('.')[1]) : 0,
  ]
}
const previous = parts(pkg.version),
  next = parts(version)
const different = next.findIndex((value, i) => value !== previous[i])
if (different === -1 || next[different] < previous[different])
  throw new Error('Version must increase')
pkg.version = version
writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n')
execFileSync('npm', ['install', '--package-lock-only', '--ignore-scripts'], {
  stdio: 'inherit',
})
mkdirSync('releases', { recursive: true })
writeFileSync(`releases/${line}-v${version}.md`, notes.join(' ') + '\n')
console.log(
  `Run npm run check, commit and merge the version change, then push tag ${line}-v${version}. No tag or publish was performed.`,
)
