# Getting started

Import the component, directive or API where you need it. Built on [screenfull](https://github.com/sindresorhus/screenfull).

::: warning Upgrading existing projects
5.x uses named imports and no longer provides a global plugin. See the [migration example](/en/guide/component#migration).
:::

## 1. Install

```sh
npm install vue-fullscreen
```

See [compatibility](/en/guide/compatibility) for API versions and package channels.

## 2. Basic usage

Choose the most suitable of the three integration methods for your use case.

### Component

Bind a state value with `v-model`. See [component usage](/en/guide/component).

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const isFullscreen = ref(false)
</script>

<template>
  <Fullscreen v-model="isFullscreen">
    <button v-if="isFullscreen" @click="isFullscreen = false">
      Exit fullscreen
    </button>
    <button v-else @click="isFullscreen = true">Enter fullscreen</button>
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

Use `useFullscreen()` for reactive state and methods to control the same fullscreen target from multiple buttons, keyboard shortcuts or application logic. See [API usage](/en/guide/api).

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
  <fullscreen v-model="isFullscreen">
    <button @click="isFullscreen = !isFullscreen">
      {{ isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen' }}
    </button>
  </fullscreen>
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-fullscreen"></script>
<script>
  Vue.createApp({
    components: { fullscreen: VueFullscreen.Fullscreen },
    data: () => ({ isFullscreen: false }),
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

Native fullscreen displays only the fullscreen element and its descendants. With `teleport` disabled, dialogs, dropdowns and other overlays mounted under `body`, outside the target element, cannot appear even when they are open.

Enabling `teleport` moves the target element under `body`, expands it to fill the viewport, and requests native fullscreen for `body`. Both the target content and these overlays are then included in fullscreen and can appear together.

In page-only mode, moving the target can also avoid clipping, positioning and stacking contexts from ancestor elements.

| Setting           | Native fullscreen element | Result after clicking the image                               |
| ----------------- | ------------------------- | ------------------------------------------------------------- |
| `teleport: false` | Image panel               | The popup is outside the fullscreen element and cannot appear |
| `teleport: true`  | `body`                    | The popup is inside the fullscreen element and appears        |

Enter fullscreen with `teleport` off and click the image. Exit, enable `teleport` and repeat. **Both settings make the image panel fullscreen; the difference is whether the body popup is visible.**

<ClientOnly><FullscreenDemo compare-teleport /></ClientOnly>
