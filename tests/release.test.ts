import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { expect, it } from 'vitest'

const script = resolve('scripts/release-info.mjs')
function run(line: string, version: string, tag: string, notes = true) {
  const directory = mkdtempSync(join(tmpdir(), 'fullscreen-release-'))
  try {
    mkdirSync(join(directory, 'dist', line), { recursive: true })
    mkdirSync(join(directory, 'releases'))
    writeFileSync(
      join(directory, 'dist', line, 'package.json'),
      JSON.stringify({ version }),
    )
    if (notes)
      writeFileSync(join(directory, 'releases', `${tag}.md`), 'Release notes')
    return execFileSync(process.execPath, [script, tag], {
      cwd: directory,
      encoding: 'utf8',
      stdio: 'pipe',
      env: { ...process.env, GITHUB_OUTPUT: '' },
    })
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}
it.each([
  ['vue2', '2.7.0', 'legacy'],
  ['vue3', '4.0.0', 'latest'],
  ['vue2', '2.7.0-beta.1', 'vue2-beta'],
  ['vue3', '4.0.0-rc.1', 'vue3-beta'],
])('routes %s %s to %s', (line, version, channel) => {
  expect(run(line, version, `${line}-v${version}`)).toContain(
    `channel=${channel}\n`,
  )
})
it('rejects mismatched versions, majors, missing notes and malformed tags', () => {
  expect(() => run('vue3', '4.0.0', 'vue3-v3.1.3')).toThrow()
  expect(() => run('vue3', '3.0.0', 'vue3-v3.0.0')).toThrow()
  expect(() => run('vue2', '4.0.0', 'vue2-v4.0.0')).toThrow()
  expect(() => run('vue3', '30.0.0', 'vue3-v30.0.0')).toThrow()
  expect(() => run('vue3', '4.0.0', 'vue3-v4.0.0', false)).toThrow()
  expect(() => run('vue3', '4.0.0', 'v4.0.0')).toThrow()
})
