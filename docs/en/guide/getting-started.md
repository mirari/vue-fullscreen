# Getting started

Import the component, directive or API where you need it.

::: warning Upgrading existing projects
5.x uses named imports and no longer provides a global plugin. See the [migration example](/en/guide/component#migration).
:::

## 1. Install

```sh
npm install vue-fullscreen
```

See [compatibility](/en/guide/compatibility) for API versions and package channels.

## 2. Basic usage

Choose one of the following interfaces. These examples use `<script setup>` (Vue 3.2+).

### Component

Bind a state value with `v-model`. See [component usage](/en/guide/component).

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

### Directive

The button is the trigger. This example omits the target and toggles fullscreen for `document.body`. See [directive usage](/en/guide/directive).

```vue
<script setup>
import { vFullscreen } from 'vue-fullscreen'
</script>

<template>
  <button v-fullscreen>Toggle page fullscreen</button>
</template>
```

### API

Use `useFullscreen()` for reactive state and fullscreen controls. See [API usage](/en/guide/api).

```vue
<script setup>
import { useFullscreen } from 'vue-fullscreen'

const { toggle } = useFullscreen()
</script>

<template>
  <button @click="toggle">Toggle page fullscreen</button>
</template>
```

## Other import methods

### CommonJS

```js
const { Fullscreen, vFullscreen, useFullscreen } = require('vue-fullscreen')
```

### Browser global

Load the latest Vue 3 build and the package's `latest` channel from UNPKG. Load Vue first:

```html
<div id="app">
  <fullscreen v-model="active">
    <button @click="active = !active">
      {{ active ? 'Exit fullscreen' : 'Enter fullscreen' }}
    </button>
  </fullscreen>
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-fullscreen"></script>
<script>
  Vue.createApp({
    components: { fullscreen: VueFullscreen.Fullscreen },
    data: () => ({ active: false }),
  }).mount('#app')
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

<ClientOnly><FullscreenDemo compare-page-only /></ClientOnly>

For browser support, automatic fallback and iframe permissions, see [compatibility](/en/guide/compatibility).

### teleport

`teleport` temporarily moves the fullscreen target under `document.body` and restores its original position on exit. Its default is `false`.

Native fullscreen displays only the fullscreen element and its descendants. If dialogs or dropdowns from your content are mounted under `body`, enabling `teleport` makes `body` the native fullscreen element so those overlays can appear too. In page-only mode, moving the target can also avoid clipping, positioning and stacking contexts from ancestor elements.

The example below uses native fullscreen. Click the image to open a [v-viewer](https://github.com/mirari/v-viewer) preview, whose modal is mounted under `body` by default:

| Setting           | Native fullscreen element | Result after clicking the image                               |
| ----------------- | ------------------------- | ------------------------------------------------------------- |
| `teleport: false` | Image panel               | The popup is outside the fullscreen element and cannot appear |
| `teleport: true`  | `body`                    | The popup is inside the fullscreen element and appears        |

Enter fullscreen with `teleport` off and click the image. Exit, enable `teleport` and repeat. **Both settings make the image panel fullscreen; the difference is whether the body popup is visible.**

<ClientOnly><FullscreenDemo compare-teleport /></ClientOnly>
