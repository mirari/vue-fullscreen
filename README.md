# vue-fullscreen

[![npm version](https://img.shields.io/npm/v/vue-fullscreen?label=npm)](https://www.npmjs.com/package/vue-fullscreen)
[![npm downloads](https://img.shields.io/npm/dm/vue-fullscreen)](https://www.npmjs.com/package/vue-fullscreen)
[![CI](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml/badge.svg)](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml)
[![Vue](https://img.shields.io/badge/Vue-3%20%7C%202-42b883?logo=vuedotjs)](https://vue-fullscreen.mirari.cc/en/guide/compatibility)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mirari/vue-fullscreen)](https://github.com/mirari/vue-fullscreen/stargazers)

Fullscreen components and directives for **Vue 2 and Vue 3**, with reactive `useFullscreen()` controls for Vue 3 and a promise-based API for Vue 2. Supports native fullscreen, `pageOnly` and `teleport`.

**[English documentation](https://vue-fullscreen.mirari.cc/en/)** · **[中文文档](https://vue-fullscreen.mirari.cc/)** · [Documentation source](https://github.com/mirari/vue-fullscreen/tree/master/docs) · [Contributing](https://github.com/mirari/vue-fullscreen/blob/master/CONTRIBUTING.md)

**5.x supports Vue 3**; **4.x supports Vue 2.4+** through the `legacy` channel. Both are new major versions of the rewritten library; upgrade explicitly from the previous 2.x/3.x releases.

## Install

```sh
npm install vue-fullscreen         # Vue 3
npm install vue-fullscreen@legacy  # Vue 2
```

See the [compatibility page](https://vue-fullscreen.mirari.cc/en/guide/compatibility) for API versions and package channels.

## Quick start

### Vue 3

Import only what you need. This example uses `<script setup>` (Vue 3.2+):

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

Import `vFullscreen` for directive usage, or `useFullscreen` for VueUse-style reactive controls with `pageOnly` and `teleport` options. See the [quick start guide](https://vue-fullscreen.mirari.cc/en/guide/getting-started).

### Vue 2

Register the plugin in your application entry:

```js
// main.js
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

Vue.use(VueFullscreen)
new Vue({ render: (h) => h(App) }).$mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <fullscreen v-model="active">
    <button @click="active = !active">Toggle fullscreen</button>
  </fullscreen>
</template>

<script>
export default {
  data: () => ({ active: false }),
}
</script>
```

The plugin also registers `v-fullscreen` and `$fullscreen`. See the [Vue 2 quick start](https://vue-fullscreen.mirari.cc/en/vue2/) for directive and API examples.

### Fullscreen options

- `pageOnly` (default `false`): fill the page while keeping browser UI visible, instead of requesting native browser fullscreen.
- `teleport` (default `false`): temporarily move the target to `document.body` and restore it on exit. In native mode, fullscreen is requested on `body`, allowing popups appended to `body` to remain visible.

**Native fullscreen can only be entered in response to a user action, such as a click, touch or key press.** See [browser compatibility](https://vue-fullscreen.mirari.cc/en/guide/compatibility) for platform limitations.

## Other import methods

Package-root imports support ESM and CJS, with TypeScript declarations. Browser-global builds expose `VueFullscreen` from `index.umd.js`. Vue is a peer dependency. Supported versions are Vue 2.4+ (Vue 2 adapter) and Vue 3.0+ (Vue 3 adapter); Vue 2 builds target IE 11 with ES5 syntax and an optional `vue-fullscreen/polyfills` entry; Vue 3 builds target ES2018.

For script tags, load the matching Vue global build first, then use the package-root CDN URL:

```html
<!-- Vue 3 -->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-fullscreen"></script>
```

```html
<!-- Vue 2 -->
<script src="https://unpkg.com/vue@legacy"></script>
<script src="https://unpkg.com/vue-fullscreen@legacy"></script>
```

Register `VueFullscreen.Fullscreen` locally in Vue 3; use `Vue.use(VueFullscreen.default)` in Vue 2. See the [Vue 3 import examples](https://vue-fullscreen.mirari.cc/en/guide/getting-started#other-import-methods) or [Vue 2 import examples](https://vue-fullscreen.mirari.cc/en/vue2/#other-import-methods) for complete browser-global and CommonJS examples.

For IE 11 with Vue 2, load `import 'vue-fullscreen/polyfills'` before the component, or supply equivalent global polyfills in your application. Modern browsers can omit this import. See [Vue 2 compatibility](https://vue-fullscreen.mirari.cc/en/vue2/guide/compatibility) for script-tag loading and required capabilities.

## Development

Use Node 24 (24.15.0+, recommended) or Node 22 (22.22.2+). See the root `engines` field for the full supported version ranges.

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

See [CONTRIBUTING.md](https://github.com/mirari/vue-fullscreen/blob/master/CONTRIBUTING.md) for browser setup, CI/CD, release channels and compatibility details. Release history is maintained separately for [Vue 3](https://github.com/mirari/vue-fullscreen/blob/master/packages/vue3/CHANGELOG.md) and [Vue 2](https://github.com/mirari/vue-fullscreen/blob/master/packages/vue2/CHANGELOG.md).

## Star History

[![Star History Chart](https://fullscreen.star-history.com/svg?repos=mirari/vue-fullscreen&type=Date)](https://star-history.com/#mirari/vue-fullscreen&Date)

## License

[MIT](./LICENSE)
