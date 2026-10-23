# Component

Wrap content in the component, then change the `v-model` value to enter or exit fullscreen. Exiting fullscreen automatically sets the bound value to `false`.

## Playground {#playground}

[Playground](/en/playground?example=component)

<UsageDemo kind="component" />

```fullscreen-example
component vue3 en
```

## Component props {#props}

| Prop                                             | Type      | Default        | Purpose                                                               |
| ------------------------------------------------ | --------- | -------------- | --------------------------------------------------------------------- |
| `modelValue`                                     | `boolean` | `false`        | `v-model` value                                                       |
| [`pageOnly`](/en/guide/getting-started#pageonly) | `boolean` | `false`        | Fill the page; automatic fallback if native fullscreen is unavailable |
| [`teleport`](/en/guide/getting-started#teleport) | `boolean` | `false`        | Move the element to the body while active                             |
| `fullscreenClass`                                | `string`  | `'fullscreen'` | Class applied while active                                            |
| `exitOnClickWrapper`                             | `boolean` | `true`         | Exit on wrapper background clicks, not child clicks                   |

## Instance properties {#instance-properties}

Read these through the component ref.

| Property       | Type      | Purpose                  |
| -------------- | --------- | ------------------------ |
| `isFullscreen` | `boolean` | Current fullscreen state |
| `isEnabled`    | `boolean` | Native API support       |

## Events {#events}

| Event               | Argument     | Purpose                                                      |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `change`            | `boolean`    | Fullscreen state changed                                     |
| `update:modelValue` | `boolean`    | Synchronize `v-model`                                        |
| `error`             | Error object | A model change or wrapper click triggered a failed operation |

## Methods {#methods}

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

| Method    | Signature                          | Purpose                 |
| --------- | ---------------------------------- | ----------------------- |
| `request` | `(): Promise<void>`                | Enter fullscreen        |
| `exit`    | `(): Promise<void>`                | Exit fullscreen         |
| `toggle`  | `(force?: boolean): Promise<void>` | Toggle or force a state |

## Migrating older versions {#migration}

The legacy `fullscreen` prop and `update:fullscreen` event remain available for compatibility. Use `v-model` in new code.

```js
// Before
import VueFullscreen from 'vue-fullscreen'
app.use(VueFullscreen)

// Now
import { Fullscreen } from 'vue-fullscreen'
```

```vue
<!-- Before -->
<fullscreen
  :fullscreen="isFullscreen"
  @update:fullscreen="isFullscreen = $event"
/>

<!-- Now -->
<Fullscreen v-model="isFullscreen" />
```
