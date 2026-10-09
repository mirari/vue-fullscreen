import { build } from 'vite'
import { resolve } from 'node:path'
await build({
  configFile: false,
  root: resolve('packages/vue2/playground'),
  base: './',
  build: { outDir: resolve('docs/public/vue2-demo'), emptyOutDir: true },
})
