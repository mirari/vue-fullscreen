import { execFileSync } from 'node:child_process'
import {
  mkdtempSync,
  writeFileSync,
  readFileSync,
  rmSync,
  mkdirSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
const root = process.cwd()
mkdirSync('artifacts', { recursive: true })
for (const [line, versions] of [
  ['vue2', ['2.6.14', '2.7.16']],
  ['vue3', ['3.0.0', '3.5.43']],
]) {
  const pack = JSON.parse(
    execFileSync(
      'npm',
      ['pack', `./dist/${line}`, '--json', '--pack-destination', 'artifacts'],
      { encoding: 'utf8' },
    ),
  )[0]
  const paths = pack.files.map((file) => file.path)
  const manifest = JSON.parse(readFileSync(`dist/${line}/package.json`, 'utf8'))
  if (
    manifest.name !== 'vue-fullscreen' ||
    !paths.includes('SCREENFULL-LICENSE') ||
    paths.some((path) => path.includes('node_modules'))
  )
    throw new Error('Invalid package contents')
  for (const version of versions) {
    const directory = mkdtempSync(join(tmpdir(), 'vue-fullscreen-consumer-'))
    try {
      writeFileSync(
        join(directory, 'package.json'),
        JSON.stringify({ private: true, type: 'module' }),
      )
      execFileSync(
        'npm',
        [
          'install',
          '--ignore-scripts',
          '--no-audit',
          '--no-fund',
          '--package-lock=false',
          `vue@${version}`,
          resolve('artifacts', pack.filename),
        ],
        { cwd: directory, stdio: 'pipe' },
      )
      const esm = `import plugin, { api, component, directive, screenfull } from 'vue-fullscreen'; if (!plugin.install || !component || !directive || !screenfull || api.isFullscreen) throw Error('Invalid exports'); console.log('SSR ESM OK')`
      execFileSync('node', ['--input-type=module', '-e', esm], {
        cwd: directory,
        stdio: 'inherit',
      })
      execFileSync(
        'node',
        [
          '--input-type=commonjs',
          '-e',
          `const p = require('vue-fullscreen'); if (!p.default.install || !p.api || !p.component || !p.directive) throw Error('Invalid CJS exports'); console.log('SSR CJS OK')`,
        ],
        { cwd: directory, stdio: 'inherit' },
      )
      execFileSync(
        'node',
        [
          '--input-type=commonjs',
          '-e',
          `
        const { readFileSync } = require('node:fs');
        const { dirname, join } = require('node:path');
        const { runInNewContext } = require('node:vm');
        const context = { Vue: require('vue') };
        runInNewContext(readFileSync(join(dirname(require.resolve('vue-fullscreen/package.json')), 'index.umd.js'), 'utf8'), context);
        if (!context.VueFullscreen.default.install || !context.VueFullscreen.api) throw Error('Invalid browser-global exports');
        console.log('UMD OK');
      `,
        ],
        { cwd: directory, stdio: 'inherit' },
      )
      const domPath = resolve('node_modules/jsdom/lib/api.js')
      execFileSync(
        'node',
        [
          '--input-type=module',
          '-e',
          `
        import { createRequire } from 'node:module';
        const require = createRequire(import.meta.url);
        const { JSDOM } = require(${JSON.stringify(domPath)});
        const dom = new JSDOM('<main id="mount"></main>');
        for (const key of ['window', 'document', 'Element', 'HTMLElement', 'SVGElement', 'Node']) globalThis[key] = dom.window[key];
        const vue = await import('vue');
        const { component } = await import('vue-fullscreen');
        let instance, close;
        if (${JSON.stringify(line)} === 'vue2') {
          const app = new vue.default({ render(h) { return h(component, { ref: 'fs', props: { pageOnly: true, teleport: true } }, ['content']) } }).$mount('#mount');
          instance = app.$refs.fs;
          close = () => { app.$destroy(); app.$el.remove() };
        } else {
          const app = vue.createApp({ render() { return vue.h(component, { ref: 'fs', pageOnly: true, teleport: true }, () => 'content') } });
          const root = app.mount('#mount'); instance = root.$refs.fs;
          close = () => app.unmount();
        }
        await instance.request();
        if (!instance.isFullscreen || !document.querySelector('body > .fullscreen')) throw Error('Component enter failed');
        await instance.exit();
        if (instance.isFullscreen || document.querySelector('.fullscreen')) throw Error('Component exit failed');
        close(); dom.window.close();
        console.log('Installed component lifecycle OK');
      `,
        ],
        { cwd: directory, stdio: 'inherit' },
      )
      const source = `import plugin, { api, component, directive, type ApiOptions } from 'vue-fullscreen'; const options: ApiOptions = { pageOnly: true }; const result: Promise<void> = api.request(undefined, options); void [plugin, component, directive, result];\n`
      writeFileSync(join(directory, 'consumer.mts'), source)
      writeFileSync(join(directory, 'consumer.cts'), source)
      execFileSync(
        'node',
        [
          join(root, 'node_modules/typescript/bin/tsc'),
          '--noEmit',
          '--strict',
          '--module',
          'NodeNext',
          '--moduleResolution',
          'NodeNext',
          '--target',
          'ES2020',
          ...(version === '3.0.0' ? ['--skipLibCheck'] : []),
          'consumer.mts',
          'consumer.cts',
        ],
        { cwd: directory, stdio: 'inherit' },
      )
      console.log(`${line}: installed tarball verified with Vue ${version}`)
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  }
}
