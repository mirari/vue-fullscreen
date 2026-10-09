# vue-fullscreen

Fullscreen components, directives and a promise-based API for **Vue 2 and Vue 3**. Supports native fullscreen, page-only mode and moving content to `document.body`.

**[Documentation & interactive examples](https://mirari.github.io/vue-fullscreen/)** · [Documentation source](./docs/index.md) · [Contributing](./CONTRIBUTING.md)

The new VitePress site is prepared on this branch; the hosted URL will show it after the documentation workflow is deployed.

## Install

```sh
npm install vue-fullscreen@next    # Vue 3
npm install vue-fullscreen@legacy  # Vue 2
```

This branch prepares **3.2.0-beta.0** (Vue 3) and **2.7.0-beta.0** (Vue 2); they are not published yet. The commands above install the existing releases. npm's `latest` channel is unchanged.

## Quick start

```ts
import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

createApp(App).use(VueFullscreen).mount('#app')
```

```vue
<script setup>
import { ref } from 'vue'
const active = ref(false)
</script>

<template>
  <button @click="active = true">Enter fullscreen</button>
  <fullscreen v-model="active" page-only teleport>
    <h2>Your content</h2>
    <button @click="active = false">Exit</button>
  </fullscreen>
</template>
```

For Vue 2, register with `Vue.use(VueFullscreen)` and define `active` in `data`. See the documentation for complete examples, native fullscreen, directives, API control and error handling.

Package-root imports support ESM and CJS, with TypeScript declarations. Browser-global builds expose `VueFullscreen` from `index.umd.js`. Vue is a peer dependency. Supported versions are Vue 2.6.14/2.7 and Vue 3.0+; browser builds target ES2018.

## Development

Use Node 24.15+ (recommended) or Node 22.22.2+.

```sh
npm ci
npm run docs:dev      # VitePress documentation, /vue-fullscreen/
npm run dev           # Vue 3 playground
npm run dev:vue2      # Vue 2 playground
npm run check         # types, tests, packages, examples and documentation
npm run test:docs     # production documentation browser checks
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for browser setup, CI/CD, release channels and migration details. Historical releases remain in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT](./LICENSE)
