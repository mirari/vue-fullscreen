# Component

Wrap content in the component and use `v-model` to control fullscreen. When the user exits with Esc, the bound value returns to `false`.

::: tip On this page
See the [**component reference**](#reference) for all props, events and methods.
:::

<ClientOnly><FullscreenDemo /></ClientOnly>

## Local registration

Import `Fullscreen` in the component that uses it. This `<script setup>` example requires Vue 3.2+. For Vue 3.0/3.1, register `Fullscreen` in `components` and return state from a regular `setup()` function.

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const active = ref(false)
const error = ref('')
function handleError(reason) {
  active.value = false
  error.value = reason.message
}
</script>

<template>
  <button @click="active = true">Enter fullscreen</button>
  <Fullscreen
    v-model="active"
    page-only
    teleport
    :exit-on-click-wrapper="false"
    @error="handleError"
  >
    <h2>Content</h2>
    <button @click="active = false">Exit fullscreen</button>
  </Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

## Component methods

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const panel = ref()
const error = ref('')
async function enter() {
  try {
    await panel.value.request()
  } catch (reason) {
    error.value = reason.message
  }
}
</script>

<template>
  <button @click="enter">Enter fullscreen</button>
  <Fullscreen ref="panel" page-only>Content</Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

## Reference

### Props

| Prop                 | Type      | Default        | Purpose                                                               |
| -------------------- | --------- | -------------- | --------------------------------------------------------------------- |
| `modelValue`         | `boolean` | `false`        | `v-model` value                                                       |
| `pageOnly`           | `boolean` | `false`        | Fill the page; automatic fallback if native fullscreen is unavailable |
| `teleport`           | `boolean` | `false`        | Move the element to the body while active                             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | Class applied while active                                            |
| `exitOnClickWrapper` | `boolean` | `true`         | Exit on wrapper background clicks, not child clicks                   |
| `fullscreen`         | `boolean` | `false`        | Deprecated model prop                                                 |

Do not supply conflicting model values.

### Events

| Event               | Argument     | Purpose                                                      |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `change`            | `boolean`    | Fullscreen state changed                                     |
| `update:modelValue` | `boolean`    | Synchronize `v-model`                                        |
| `update:fullscreen` | `boolean`    | Synchronize the deprecated model                             |
| `error`             | Error object | A model change or wrapper click triggered a failed operation |

### Instance members

| Member         | Type / signature                   | Purpose                  |
| -------------- | ---------------------------------- | ------------------------ |
| `request`      | `(): Promise<void>`                | Enter fullscreen         |
| `exit`         | `(): Promise<void>`                | Exit fullscreen          |
| `toggle`       | `(force?: boolean): Promise<void>` | Toggle or force a state  |
| `isFullscreen` | `boolean`                          | Current fullscreen state |
| `isEnabled`    | `boolean`                          | Native API support       |

Handle rejected Promises when calling methods directly. The component cleans up listeners and moved DOM nodes on unmount.
