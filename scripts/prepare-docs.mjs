import { build } from 'vite'
import { resolve } from 'node:path'
import { cp, mkdir } from 'node:fs/promises'

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
}

await build({
  configFile: false,
  root: resolve('packages/vue2/playground'),
  base: './',
  build: { outDir: resolve('docs/public/vue2-demo'), emptyOutDir: true },
})
