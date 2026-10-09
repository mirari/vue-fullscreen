# vue-fullscreen

[![npm version](https://img.shields.io/npm/v/vue-fullscreen?label=npm)](https://www.npmjs.com/package/vue-fullscreen)
[![npm downloads](https://img.shields.io/npm/dm/vue-fullscreen)](https://www.npmjs.com/package/vue-fullscreen)
[![CI](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml/badge.svg?branch=v4)](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml?query=branch%3Av4)
[![Vue](https://img.shields.io/badge/Vue-3%20%7C%202-42b883?logo=vuedotjs)](https://vue-fullscreen.mirari.cc/en/guide/compatibility)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mirari/vue-fullscreen)](https://github.com/mirari/vue-fullscreen/stargazers)

Fullscreen components, directives and a promise-based API for **Vue 2 and Vue 3**. Supports native fullscreen, page-only mode and moving content to `document.body`.

**[English documentation](https://vue-fullscreen.mirari.cc/en/)** · **[中文文档](https://vue-fullscreen.mirari.cc/)** · [Documentation source](./docs/index.md) · [Contributing](./CONTRIBUTING.md)

This branch prepares **4.0.0**, which has not been published yet. The npm badge and installation commands below refer to published packages.

## Install

```sh
npm install vue-fullscreen@next    # Vue 3
npm install vue-fullscreen@legacy  # Vue 2
```

See the [compatibility page](https://vue-fullscreen.mirari.cc/en/guide/compatibility) for API versions and package channels.

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
npm run docs:dev      # VitePress documentation, /
npm run dev           # Vue 3 playground
npm run dev:vue2      # Vue 2 playground
npm run check         # types, tests, packages, examples and documentation
npm run test:docs     # production documentation browser checks
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for browser setup, CI/CD, release channels and compatibility details. Historical releases remain in [CHANGELOG.md](./CHANGELOG.md).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mirari/vue-fullscreen&type=Date)](https://star-history.com/#mirari/vue-fullscreen&Date)

## License

[MIT](./LICENSE)
