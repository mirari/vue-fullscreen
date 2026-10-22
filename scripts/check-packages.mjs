import { build } from 'vite'
import { runInNewContext } from 'node:vm'
import assert from 'node:assert/strict'
import { execNpm } from './exec-npm.mjs'
import { execFileSync } from 'node:child_process'
import {
  mkdtempSync,
  writeFileSync,
  readFileSync,
  rmSync,
  mkdirSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join, dirname } from 'node:path'
const root = process.cwd()
mkdirSync('artifacts', { recursive: true })
for (const [line, versions] of [
  ['vue2', ['2.6.14', '2.7.16']],
  ['vue3', ['3.0.0', '3.5.43']],
]) {
  const pack = JSON.parse(
    execNpm(
      ['pack', `./dist/${line}`, '--json', '--pack-destination', 'artifacts'],
      { encoding: 'utf8' },
    ),
  )[0]
  const paths = pack.files.map((file) => file.path)
  const manifest = JSON.parse(readFileSync(`dist/${line}/package.json`, 'utf8'))
  if (
    manifest.name !== 'vue-fullscreen' ||
    !paths.includes('SCREENFULL-LICENSE') ||
    !paths.includes('CHANGELOG.md') ||
    readFileSync(`dist/${line}/CHANGELOG.md`, 'utf8') !==
      readFileSync(`packages/${line}/CHANGELOG.md`, 'utf8') ||
    (line === 'vue2' &&
      (!paths.includes('CORE-JS-LICENSE') ||
        !manifest.sideEffects?.includes('./polyfills.js') ||
        !paths.includes('polyfills.js') ||
        !paths.includes('polyfills.cjs'))) ||
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
      execNpm(
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
      const polyfillImport =
        line === 'vue2' ? "import 'vue-fullscreen/polyfills'; " : ''
      if (line === 'vue2') {
        const entry = join(directory, 'polyfill-consumer.js')
        writeFileSync(
          entry,
          "import 'vue-fullscreen/polyfills'; globalThis.polyfillConsumerLoaded = true",
        )
        const result = await build({
          configFile: false,
          root: directory,
          logLevel: 'silent',
          build: {
            write: false,
            lib: { entry, name: 'Consumer', formats: ['iife'] },
            rolldownOptions: { output: { generatedCode: { symbols: false } } },
          },
        })
        const code = (Array.isArray(result) ? result[0] : result).output[0].code
        const sandbox = { setTimeout, clearTimeout }
        runInNewContext(
          'Promise = undefined; WeakMap = undefined; Symbol = undefined; Object.assign = undefined;',
          sandbox,
        )
        runInNewContext(code, sandbox)
        assert.equal(sandbox.polyfillConsumerLoaded, true)
        assert.equal(typeof sandbox.Promise, 'function')
        assert.equal(typeof sandbox.Promise.prototype.finally, 'function')
        assert.equal(typeof sandbox.WeakMap, 'function')
        console.log('Optional polyfill import survives production tree shaking')
      }
      const composable = line === 'vue3' ? ', useFullscreen' : ''
      const pluginImport = line === 'vue2' ? 'plugin, ' : ''
      const singletonImport = line === 'vue2' ? 'fullscreen, ' : ''
      const invalidPlugin = (namespace) =>
        line === 'vue2'
          ? `!${namespace}.default?.install || !${namespace}.fullscreen`
          : `'default' in ${namespace} || 'fullscreen' in ${namespace} || 'api' in ${namespace} || !${namespace}.useFullscreen`
      const checkComposable =
        line === 'vue3'
          ? "const controls = useFullscreen(); if (controls.isFullscreen.value || controls.isSupported.value) throw Error('Invalid SSR composable');"
          : ''
      const esm = `${polyfillImport}import * as exports from 'vue-fullscreen'; import ${pluginImport}{ ${singletonImport}Fullscreen, vFullscreen, screenfull${composable} } from 'vue-fullscreen'; if (${invalidPlugin('exports')} || !Fullscreen || !vFullscreen || !screenfull) throw Error('Invalid exports'); ${checkComposable} console.log('SSR ESM OK')`
      execFileSync('node', ['--input-type=module', '-e', esm], {
        cwd: directory,
        stdio: 'inherit',
      })
      execFileSync(
        'node',
        [
          '--input-type=commonjs',
          '-e',
          `${line === 'vue2' ? "require('vue-fullscreen/polyfills');" : ''} const p = require('vue-fullscreen'); if (${invalidPlugin('p')} || !p.Fullscreen || !p.vFullscreen) throw Error('Invalid CJS exports'); console.log('SSR CJS OK')`,
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
        if (${invalidPlugin('context.VueFullscreen')} || !context.VueFullscreen.Fullscreen || !context.VueFullscreen.vFullscreen) throw Error('Invalid browser-global exports');
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
        const { Fullscreen: component, fullscreen, useFullscreen } = await import('vue-fullscreen');
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
        if (${JSON.stringify(line)} === 'vue2') {
          await fullscreen.request(instance, { pageOnly: true });
          if (fullscreen.element !== instance.$el) throw Error('Component target resolution failed');
          await fullscreen.exit();
        } else {
          const controls = useFullscreen(instance, { pageOnly: true });
          await controls.enter();
          if (!controls.isFullscreen.value || !instance.$el.classList.contains('fullscreen')) throw Error('Component target resolution failed');
          await controls.exit();
        }
        close(); dom.window.close();
        console.log('Installed component lifecycle OK');
      `,
        ],
        { cwd: directory, stdio: 'inherit' },
      )
      const removedPluginTypes =
        line === 'vue3'
          ? `import * as exports from 'vue-fullscreen'; import type { ComponentCustomProperties } from 'vue';
// @ts-expect-error Vue 3 has no plugin default export.
exports.default;
// @ts-expect-error Vue 3 does not augment instance globals.
type RemovedGlobal = ComponentCustomProperties['$fullscreen'];
// @ts-expect-error Plugin installation options belong to Vue 2 only.
type RemovedOptions = import('vue-fullscreen').InstallationOptions;
// @ts-expect-error Vue 3 exposes independent composables instead of a singleton.
exports.fullscreen;
// @ts-expect-error The singleton alias is not public in Vue 3.
exports.api;
// @ts-expect-error Singleton API types belong to Vue 2 only.
type RemovedApi = import('vue-fullscreen').VueFullscreenApi;`
          : ''
      const targetTypes = `
const element = document.createElement('section');
const targetRef: FullscreenTarget = { value: element };
const componentRoot: FullscreenTarget = { $el: element };
${['element', 'targetRef', 'componentRoot', "'panel'", "'#panel'", '() => element'].map((target) => (line === 'vue2' ? `fullscreen.request(${target}, options);` : `useFullscreen(${target}, options);`)).join('\n')}
${
  line === 'vue3'
    ? `import { ref } from 'vue';
const vueTarget = ref<HTMLElement | null>(null);
const componentTarget = ref<{ $el: HTMLElement } | null>(null);
useFullscreen(vueTarget);
useFullscreen(componentTarget);
useFullscreen('#panel');`
    : ''
}
`
      const source = `${polyfillImport}import ${pluginImport}{ ${singletonImport}Fullscreen, vFullscreen${composable}, type ApiOptions, type FullscreenTarget } from 'vue-fullscreen'; const options: ApiOptions = { pageOnly: true }; const result: Promise<void> = ${line === 'vue2' ? 'fullscreen.request(undefined, options)' : 'useFullscreen(undefined, options).enter()'}; ${checkComposable} void [${line === 'vue2' ? 'plugin, ' : ''}Fullscreen, vFullscreen, result];\n${targetTypes}\n${removedPluginTypes}\n`
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
      assert.equal(dirname(resolve(directory)), resolve(tmpdir()))
      rmSync(directory, { recursive: true, force: true })
    }
  }
}
