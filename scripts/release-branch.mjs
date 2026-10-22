import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const tag = process.argv[2]
if (!/^vue[23]-v\d+\.\d+\.\d+(?:-(?:beta|rc)\.\d+)?$/.test(tag ?? ''))
  throw new Error('Invalid release tag')
const { sourceBranch } = JSON.parse(readFileSync('release.config.json', 'utf8'))
execFileSync(
  'git',
  ['merge-base', '--is-ancestor', 'HEAD', `origin/${sourceBranch}`],
  {
    stdio: 'inherit',
  },
)
console.log(`${tag}: verified release commit on ${sourceBranch}`)
