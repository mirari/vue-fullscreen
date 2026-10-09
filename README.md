# vue-fullscreen

Vue components, directives and a promise-based API for native fullscreen and page-only fullscreen, powered by [screenfull](https://github.com/sindresorhus/screenfull).

One repository maintains both Vue versions. The shared browser logic is bundled into each release; Vue itself is always a peer dependency.

## Install

```sh
# Vue 3
npm install vue-fullscreen@next
# Vue 2
npm install vue-fullscreen@legacy
```

This branch prepares **3.2.0-beta.0** and **2.7.0-beta.0**; neither is published yet. Stable releases keep the existing `next` (Vue 3) and `legacy` (Vue 2) channels. Prereleases use `vue3-beta` and `vue2-beta`. Changing npm's `latest` channel is a separate maintainer decision.

Supported peers: Vue 3.0+ and Vue 2.6.14/2.7. Development uses Vue 3.5 and Vue 2.7. Browser bundles target ES2018; Internet Explorer is no longer a supported build target. Importing the package during SSR is supported; fullscreen operations require the DOM.

## Component

```ts
// Vue 3
import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

createApp(App).use(VueFullscreen).mount('#app')
```

```ts
// Vue 2
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueFullscreen)
```

```vue
<template>
  <div>
    <button @click="active = true">Enter fullscreen</button>
    <fullscreen v-model="active" :teleport="true" @error="handleError">
      <p>Fullscreen content</p>
      <button @click="active = false">Exit</button>
    </fullscreen>
  </div>
</template>
```

Declare `active` in your component state and handle `error` as appropriate. Both Vue versions use the same template; Vue 2 uses `value`/`input`, Vue 3 uses `modelValue`/`update:modelValue` internally. For local registration, import `{ component }`.

| Prop                 | Default        | Behavior                                                                                                                                    |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageOnly`           | `false`        | Fill the page without invoking native fullscreen. Automatic fallback where native fullscreen is unavailable.                                |
| `teleport`           | `false`        | Move the wrapper to `document.body` while active and restore it on exit. Native fullscreen targets the body so overlays can remain visible. |
| `fullscreenClass`    | `'fullscreen'` | Class applied while active.                                                                                                                 |
| `exitOnClickWrapper` | `true`         | Clicking the wrapper background exits fullscreen.                                                                                           |
| `fullscreen`         | `false`        | Deprecated model prop; `update:fullscreen` remains supported.                                                                               |

`change` emits the new boolean state. Component-triggered rejected requests emit `error`. Component refs expose `request()`, `exit()`, `toggle(force?)`, `isFullscreen`, and `isEnabled`; Vue 2 also retains `enter()`, `getState()`, and `support`. Methods return promises. Escape exits page mode; browsers control Escape in native mode. Listeners and teleported elements are cleaned up on unmount.

## API

```ts
import { api } from 'vue-fullscreen'

// Call from a user gesture to satisfy native fullscreen activation requirements.
await api.request(document.querySelector('#content'), {
  teleport: true,
  pageOnly: false,
  fullscreenClass: 'fullscreen',
  callback: (active) => console.log(active),
})
await api.exit()
await api.toggle(document.querySelector('#content'), { pageOnly: true })
```

`request(target?, options?)` defaults to `document.body`. `toggle(target?, options?, force?)` accepts an optional forced state. `exit()` is idempotent. Read `api.isFullscreen`, `api.isEnabled`, `api.element`, and `api.options` for state. Handle rejected promises when the browser denies a native request. Only HTML elements are accepted as targets. The singleton API and each component have separate controllers; avoid requesting competing fullscreen targets simultaneously.

## Directive

```vue
<button v-fullscreen.pageOnly.teleport="{ target: '#content' }">
  Toggle fullscreen
</button>
```

The binding accepts a selector string or an options object with `target` (selector or element) and the same API options. With no target it uses the body. A missing selector reports an error rather than fullscreening the body. Listen for the bubbling native `fullscreen-error` event to handle directive failures. Import `{ directive }` for local registration.

## Plugin and module formats

`app.use(VueFullscreen, { name: 'fs' })` (or `Vue.use` in Vue 2) registers the `fs` component, `v-fs` directive and `$fs` API. The default name is `fullscreen`, with `$fullscreen` typed on component instances. Custom global property names need your own TypeScript augmentation.

The default export is the plugin; named exports are `component`, `directive`, `api`, and `screenfull`. ESM, CJS and browser-global UMD bundles are included with declarations for both module systems. The UMD bundle is `index.umd.js` and exposes `window.VueFullscreen`; load the matching Vue global first. Bundled screenfull 6 retains the public `screenfull` export; native fullscreen support follows the browser's capabilities.

## Development

Node.js 24.15+ LTS is recommended; CI also checks Node.js 22.22.2+.

```sh
npm ci
npm run dev          # Vue 3 playground
npm run dev:vue2     # Vue 2 playground
npm run check        # format, types, tests, builds, installed-package checks
npx playwright install chromium
npm run test:browser
```

Append `?pageOnly` to a playground URL to exercise page fullscreen. For a system Chromium installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chromium` when running browser tests.

```text
packages/core/       shared fullscreen controller and directive behavior
packages/vue2/       Vue 2 adapter, tests and playground
packages/vue3/       Vue 3 adapter, tests and playground
scripts/             build, installed-package validation and releases
```

Adapters use typed render functions, so both Vue versions share modern Vite without relying on an obsolete Vue 2 SFC plugin.

Builds produce publishable directories in `dist/vue2` and `dist/vue3`. Workspace packages have unique private names; only generated release manifests use `vue-fullscreen`. Do not publish the workspace root or adapters directly.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for releases, CI/CD setup and migration details. Existing release history remains in [CHANGELOG.md](./CHANGELOG.md).
