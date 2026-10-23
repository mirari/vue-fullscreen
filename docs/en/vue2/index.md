# Getting started with Vue 2

This section describes the Vue 2 package.

::: warning Upgrading existing projects
4.x is a new major release and retains the Vue plugin. Use `v-model` for component state; see the [migration example](/en/vue2/guide/component#migration).
:::

## 1. Install

```sh
npm install vue-fullscreen@legacy
```

The `legacy` channel provides the Vue 2 package. See [compatibility](/en/vue2/guide/compatibility) for API versions.

## 2. Register the plugin

```js
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

Vue.use(VueFullscreen)
new Vue({ render: (h) => h(App) }).$mount('#app')
```

The plugin registers `<fullscreen>`, `v-fullscreen` and the `$fullscreen` instance property.

### Custom names

```ts
Vue.use(VueFullscreen, { name: 'fs' })
```

| Option | Type     | Default        | Purpose                                         |
| ------ | -------- | -------------- | ----------------------------------------------- |
| `name` | `string` | `'fullscreen'` | Component, directive and instance property name |

`name: 'fs'` registers `<fs>`, `v-fs` and `$fs`. The default `$fullscreen` property has type augmentation; custom names require your own declaration.

## 3. Basic usage

After registering the plugin, choose the most suitable of the three integration methods for your use case.

### Component

Bind a state value with `v-model`. See [component usage](/en/vue2/guide/component).

```vue
<template>
  <fullscreen v-model="active">
    <button v-if="active" @click="active = false">Exit fullscreen</button>
    <button v-else @click="active = true">Enter fullscreen</button>
  </fullscreen>
</template>

<script>
export default {
  data: () => ({ active: false }),
}
</script>
```

### Directive

The button is the trigger. This example omits the target and toggles fullscreen for `document.body`. See [directive usage](/en/vue2/guide/directive).

```vue
<template>
  <button v-fullscreen>Toggle page fullscreen</button>
</template>
```

### API

Control the same fullscreen target from multiple buttons, keyboard shortcuts or application logic. The plugin exposes the `fullscreen` singleton as `$fullscreen`. See [API usage](/en/vue2/guide/api).

```vue
<template>
  <button @click="$fullscreen.toggle()">Toggle page fullscreen</button>
</template>
```

## Other import methods

### CommonJS

```js
const Vue = require('vue')
const VueFullscreen = require('vue-fullscreen').default

Vue.use(VueFullscreen)
```

### Browser global

Load the latest Vue 2 build and the package's `legacy` channel from UNPKG. Load Vue first:

```html
<div id="app">
  <fullscreen v-model="active">
    <button @click="active = !active">
      {{ active ? 'Exit fullscreen' : 'Enter fullscreen' }}
    </button>
  </fullscreen>
</div>

<script src="https://unpkg.com/vue@legacy"></script>
<script src="https://unpkg.com/vue-fullscreen@legacy"></script>
<script>
  Vue.use(VueFullscreen.default)
  new Vue({
    data: () => ({ active: false }),
  }).$mount('#app')
</script>
```

TypeScript declarations are selected automatically through `exports` for ESM and CommonJS.

## Fullscreen options

### pageOnly

`pageOnly` chooses between native and page-only fullscreen. Its default is `false`.

- `false`: request native browser fullscreen and hide browser UI such as the address bar and tabs. Use it for immersive images or video.
- `true`: fill the current page viewport and keep browser UI visible. Use it for editors or dashboards where users still need access to their tabs.

|                 | Native                                  | Page-only                       |
| --------------- | --------------------------------------- | ------------------------------- |
| Setting         | `pageOnly: false` (default)             | `pageOnly: true`                |
| Area            | Browser-provided fullscreen area        | Current page viewport           |
| Browser toolbar | Hidden by the browser                   | Remains visible                 |
| User gesture    | Required                                | Not required                    |
| Exit            | Browser Esc, an exit button or `exit()` | Esc, an exit button or `exit()` |

<ClientOnly><Vue2Demo comparison="pageOnly" /></ClientOnly>

For browser support, automatic fallback and iframe permissions, see [compatibility](/en/vue2/guide/compatibility).

### teleport

`teleport` temporarily moves the fullscreen target under `document.body` and restores its original position on exit. Its default is `false`.

Native fullscreen displays only the fullscreen element and its descendants. With `teleport` disabled, dialogs, dropdowns and other overlays mounted under `body`, outside the target element, cannot appear even when they are open.

Enabling `teleport` moves the target element under `body`, expands it to fill the viewport, and requests native fullscreen for `body`. Both the target content and these overlays are then included in fullscreen and can appear together.

In page-only mode, moving the target can also avoid clipping, positioning and stacking contexts from ancestor elements.

| Setting           | Native fullscreen element | Result after clicking the image                               |
| ----------------- | ------------------------- | ------------------------------------------------------------- |
| `teleport: false` | Content panel             | The popup is outside the fullscreen element and cannot appear |
| `teleport: true`  | `body`                    | The popup is inside the fullscreen element and appears        |

Enter fullscreen with `teleport` off and click the image. Exit, enable `teleport` and repeat. **Both settings make the content panel fullscreen; the difference is whether the body popup is visible.**

<ClientOnly><Vue2Demo comparison="teleport" /></ClientOnly>
