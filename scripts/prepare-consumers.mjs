import { execFileSync } from 'node:child_process'
import { mkdirSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
const fixture = resolve('tests/consumers/fixture')
const run = (command, args, cwd = fixture) =>
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, NUXT_TELEMETRY_DISABLED: '1' },
  })
run('npm', ['ci', '--no-audit', '--no-fund'])
rmSync(`${fixture}/public`, { recursive: true, force: true })
mkdirSync('artifacts', { recursive: true })
for (const line of ['vue2', 'vue3']) {
  const version = JSON.parse(readFileSync(`dist/${line}/package.json`)).version
  run(
    'npm',
    ['pack', `./dist/${line}`, '--pack-destination', 'artifacts'],
    process.cwd(),
  )
  const tarball = resolve(`artifacts/vue-fullscreen-${version}.tgz`)
  const publicDir = `${fixture}/public/${line}`
  mkdirSync(publicDir, { recursive: true })
  run('tar', ['-xzf', tarball, '--strip-components=1', '-C', publicDir])
  cpSync(
    `${fixture}/node_modules/${line === 'vue2' ? 'vue2/dist/vue.js' : 'vue/dist/vue.global.js'}`,
    `${publicDir}/vue.js`,
  )
  const setup =
    line === 'vue2'
      ? "Vue.use(VueFullscreen.default); new Vue(options).$mount('#app')"
      : "Vue.createApp(options).use(VueFullscreen.default).mount('#app')"
  writeFileSync(
    `${publicDir}/index.html`,
    `<!doctype html><html><head><meta charset="utf-8"><title>${line} script consumer</title></head><body><div id="app"><main><button id="enter" @click="active = true">Enter</button><fullscreen id="target" v-model="active" :page-only="pageOnly" teleport><p>Script tag content</p><button id="exit" @click="active = false">Exit</button></fullscreen><output id="state">{{ active }}</output></main></div><script src="./vue.js"></script><script src="./index.umd.js"></script><script>const options = { data() { return { active: false, pageOnly: !location.search.includes('native') } } }; ${setup}</script></body></html>`,
  )
  if (line === 'vue3')
    run('npm', ['install', '--no-save', '--no-audit', '--no-fund', tarball])
}
run('node', ['../node_modules/vite/bin/vite.js', 'build'], `${fixture}/vite`)
run('node', ['../node_modules/nuxt/bin/nuxt.mjs', 'build'], `${fixture}/nuxt`)
