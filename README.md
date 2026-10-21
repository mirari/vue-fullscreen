# vue-fullscreen

[![npm version](https://img.shields.io/npm/v/vue-fullscreen?label=npm)](https://www.npmjs.com/package/vue-fullscreen)
[![npm downloads](https://img.shields.io/npm/dm/vue-fullscreen)](https://www.npmjs.com/package/vue-fullscreen)
[![CI](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml/badge.svg)](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml)
[![Vue](https://img.shields.io/badge/Vue-3%20%7C%202-42b883?logo=vuedotjs)](https://vue-fullscreen.mirari.cc/en/guide/compatibility)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mirari/vue-fullscreen)](https://github.com/mirari/vue-fullscreen/stargazers)

Fullscreen components, directives and a promise-based API for **Vue 2 and Vue 3**. Supports native fullscreen, page-only mode and moving content to `document.body`.

**[English documentation](https://vue-fullscreen.mirari.cc/en/)** · **[中文文档](https://vue-fullscreen.mirari.cc/)** · [Documentation source](./docs/index.md) · [Contributing](./CONTRIBUTING.md)

The temporary `v4` branch prepares the **4.0.0** rewrite, which has not been published yet. After its first release, development and releases move to `master`. The npm badge and installation commands below refer to published packages.

## Install

```sh
npm install vue-fullscreen         # Vue 3
npm install vue-fullscreen@legacy  # Vue 2
```

See the [compatibility page](https://vue-fullscreen.mirari.cc/en/guide/compatibility) for API versions and package channels.

## Quick start

Import only what you need in a Vue 3 component:

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const active = ref(false)
</script>

<template>
  <Fullscreen v-model="active">
    <button @click="active = !active">Toggle fullscreen</button>
  </Fullscreen>
</template>
```

Import `vFullscreen` for directive usage, or `useFullscreen` for VueUse-style reactive controls with `pageOnly` and `teleport` options. The `fullscreen` singleton remains available for imperative calls. See the [quick start guide](https://vue-fullscreen.mirari.cc/en/guide/getting-started).

For Vue 2, register with `Vue.use(VueFullscreen)` and define `active` in `data`. See the [Vue 2 quick start](https://vue-fullscreen.mirari.cc/en/vue2/) for component, directive and API examples.

Package-root imports support ESM and CJS, with TypeScript declarations. Browser-global builds expose `VueFullscreen` from `index.umd.js`. Vue is a peer dependency. Supported versions are Vue 2.6.14/2.7 and Vue 3.0+; Vue 2 builds target IE 11 with ES5 syntax and an optional `vue-fullscreen/polyfills` entry; Vue 3 builds target ES2018.

For IE 11 with Vue 2, load `import 'vue-fullscreen/polyfills'` before the component, or supply equivalent global polyfills in your application. Modern browsers can omit this import. See [Vue 2 compatibility](https://vue-fullscreen.mirari.cc/en/vue2/guide/compatibility) for script-tag loading and required capabilities.

## Development

Use Node 24.15+ (recommended) or Node 22.22.2+.

Use the pnpm version pinned in the root `packageManager` field.

```sh
pnpm install --frozen-lockfile
pnpm run docs:dev      # VitePress documentation, /
pnpm run dev           # Vue 3 playground
pnpm run dev:vue2      # Vue 2 playground
pnpm run check         # types, tests, packages, examples and documentation
pnpm run test:docs     # production documentation browser checks
pnpm run test:consumers # script tags, Vite and Nuxt 4 using packed releases
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for browser setup, CI/CD, release channels and compatibility details. The rewrite's release history starts in [CHANGELOG.md](./CHANGELOG.md).

## Star History

[![Star History Chart](https://fullscreen.star-history.com/svg?repos=mirari/vue-fullscreen&type=Date)](https://star-history.com/#mirari/vue-fullscreen&Date)

## License

[MIT](./LICENSE)
