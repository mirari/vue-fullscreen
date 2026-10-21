# Getting started with Vue 2

This section describes the Vue 2 package.

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

## 3. Basic usage

After registering the plugin, choose one of these three interfaces.

### Component

Bind a state value with `v-model`. See [component usage](/en/vue2/guide/component).

```vue
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

### Directive

Toggle fullscreen for the entire page with a click. See [directive usage](/en/vue2/guide/directive).

```vue
<template>
  <button v-fullscreen>Toggle page fullscreen</button>
</template>
```

### API

The plugin exposes the `fullscreen` singleton as `$fullscreen`. See [API usage](/en/vue2/guide/api).

```vue
<template>
  <button @click="$fullscreen.toggle()">Toggle page fullscreen</button>
</template>
```

## Fullscreen options

|                 | Native                                  | Page-only                       |
| --------------- | --------------------------------------- | ------------------------------- |
| Setting         | `pageOnly: false` (default)             | `pageOnly: true`                |
| Area            | Browser-provided fullscreen area        | Current page viewport           |
| Browser toolbar | Hidden by the browser                   | Remains visible                 |
| User gesture    | Required                                | Not required                    |
| Exit            | Browser Esc, an exit button or `exit()` | Esc, an exit button or `exit()` |

For browser support, automatic fallback and iframe permissions, see [compatibility](/en/vue2/guide/compatibility).

### See what “teleport” changes

Keep page-only mode off. Enter component fullscreen and click “Details” to toggle the centered body popup. With `teleport` off, the popup is outside the fullscreen element and cannot appear. Enable `teleport` and repeat: body becomes the fullscreen element, allowing its popup to appear too. The content fills the screen with either setting.

<ClientOnly><Vue2Demo /></ClientOnly>
