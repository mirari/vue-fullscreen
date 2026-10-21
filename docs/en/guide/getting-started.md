# Getting started

Import the component, directive or API where you need it.

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

Toggle fullscreen for the entire page with a click. See [directive usage](/en/guide/directive).

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

## Fullscreen options

|                 | Native                                  | Page-only                       |
| --------------- | --------------------------------------- | ------------------------------- |
| Setting         | `pageOnly: false` (default)             | `pageOnly: true`                |
| Area            | Browser-provided fullscreen area        | Current page viewport           |
| Browser toolbar | Hidden by the browser                   | Remains visible                 |
| User gesture    | Required                                | Not required                    |
| Exit            | Browser Esc, an exit button or `exit()` | Esc, an exit button or `exit()` |

For browser support, automatic fallback and iframe permissions, see [compatibility](/en/guide/compatibility).

### See what “teleport” changes

The `teleport` option moves the fullscreen target to `body` and restores it on exit. The “Details” button toggles a centered popup mounted under `body`, like a dialog from a UI library.

Keep “Page-only fullscreen” off and compare:

1. **Without “teleport”**: enter fullscreen and open image details. The panel fills the screen, but the popup is outside the fullscreen element and cannot appear.
2. **Exit and enable “teleport”**: enter fullscreen and open image details again. The panel still fills the screen. Now `body` is the native fullscreen element, so its popup can appear too.

Both settings make the image panel fullscreen. The difference is **whether the body popup is visible**. In page-only mode, the popup is visible with either setting.

<ClientOnly><FullscreenDemo compare-teleport /></ClientOnly>
