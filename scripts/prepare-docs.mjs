import { build } from 'vite'
import { resolve } from 'node:path'
import { cp, mkdir, writeFile } from 'node:fs/promises'
import { sample } from '../docs/.vitepress/theme/playground/samples.ts'
import { compile } from '../docs/.vitepress/theme/playground/compile.ts'

// Serve the workspace version in the editor, including changes not yet published.
for (const version of ['vue2', 'vue3']) {
  const destination = resolve(`docs/public/playground/${version}`)
  await build({
    configFile: false,
    build: {
      outDir: destination,
      emptyOutDir: true,
      lib: {
        entry: resolve(`packages/${version}/src/index.ts`),
        formats: ['es'],
        fileName: () => 'vue-fullscreen.js',
      },
      rolldownOptions: { external: ['vue'] },
    },
  })
  await mkdir(destination, { recursive: true })
  await cp(
    resolve(
      `packages/${version}/node_modules/vue/dist/${version === 'vue2' ? 'vue.esm.browser.js' : 'vue.esm-browser.js'}`,
    ),
    resolve(destination, 'vue.js'),
  )
  const sources = new Map()
  for (const kind of ['component', 'directive', 'api']) {
    for (const language of ['zh', 'en']) {
      sources.set(
        `${kind} ${language}`,
        compile(
          sample(kind, version === 'vue2', language === 'en'),
          version === 'vue2',
        ),
      )
    }
  }
  await build({
    configFile: false,
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
    resolve: {
      alias: [
        {
          find: 'vue-fullscreen',
          replacement: resolve(`packages/${version}/src/index.ts`),
        },
        ...(version === 'vue2'
          ? [
              {
                find: /^vue$/,
                replacement: resolve(
                  'packages/vue2/node_modules/vue/dist/vue.esm.browser.js',
                ),
              },
            ]
          : []),
      ],
    },
    plugins: [
      {
        name: 'fullscreen-examples',
        resolveId(id) {
          if (
            id === 'virtual:fullscreen-examples' ||
            id.startsWith('virtual:fullscreen-example:')
          )
            return '\0' + id
        },
        load(id) {
          if (id === '\0virtual:fullscreen-examples') {
            const entries = [...sources.keys()]
            return (
              entries
                .map(
                  (key, index) =>
                    `import example${index} from ${JSON.stringify('virtual:fullscreen-example:' + key)}`,
                )
                .join('\n') +
              `\nexport const examples = {${entries.map((key, index) => `${JSON.stringify(key)}:example${index}`).join(',')}}` +
              `\nexport const styles = ${JSON.stringify(sources.values().next().value.styles)}`
            )
          }
          if (id.startsWith('\0virtual:fullscreen-example:'))
            return sources.get(id.slice('\0virtual:fullscreen-example:'.length))
              .code
        },
      },
    ],
    build: {
      outDir: destination,
      emptyOutDir: false,
      lib: {
        entry: resolve(`docs/.vitepress/theme/demos/mount-${version}.mjs`),
        formats: ['es'],
        fileName: () => 'demos.js',
      },
    },
  })
  if (version === 'vue2')
    await writeFile(
      resolve(destination, 'demo.html'),
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fullscreen example</title></head><body><div id="app"></div><script type="module" src="./demos.js"></script></body></html>',
    )
}

await build({
  configFile: false,
  root: resolve('packages/vue2/playground'),
  base: './',
  build: { outDir: resolve('docs/public/vue2-demo'), emptyOutDir: true },
})
