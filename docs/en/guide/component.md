# Component

Wrap content in the component and use `v-model` to control fullscreen. When the user exits with Esc, the bound value returns to `false`.

::: warning Upgrading existing projects
5.x uses named imports and no longer provides a global plugin. See the [migration example](#migration).
:::

## Playground {#playground}

[Playground](/en/playground?example=component)

<UsageDemo kind="component" />

```fullscreen-example
component vue3 en
```

## Props {#props}

| Prop                 | Type      | Default        | Purpose                                                               |
| -------------------- | --------- | -------------- | --------------------------------------------------------------------- |
| `modelValue`         | `boolean` | `false`        | `v-model` value                                                       |
| `pageOnly`           | `boolean` | `false`        | Fill the page; automatic fallback if native fullscreen is unavailable |
| `teleport`           | `boolean` | `false`        | Move the element to the body while active                             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | Class applied while active                                            |
| `exitOnClickWrapper` | `boolean` | `true`         | Exit on wrapper background clicks, not child clicks                   |
| `fullscreen`         | `boolean` | `false`        | Deprecated model prop                                                 |

## Events {#events}

| Event               | Argument     | Purpose                                                      |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `change`            | `boolean`    | Fullscreen state changed                                     |
| `update:modelValue` | `boolean`    | Synchronize `v-model`                                        |
| `update:fullscreen` | `boolean`    | Synchronize the deprecated model                             |
| `error`             | Error object | A model change or wrapper click triggered a failed operation |

## Methods and state {#methods}

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

| Member         | Type / signature                   | Purpose                  |
| -------------- | ---------------------------------- | ------------------------ |
| `request`      | `(): Promise<void>`                | Enter fullscreen         |
| `exit`         | `(): Promise<void>`                | Exit fullscreen          |
| `toggle`       | `(force?: boolean): Promise<void>` | Toggle or force a state  |
| `isFullscreen` | `boolean`                          | Current fullscreen state |
| `isEnabled`    | `boolean`                          | Native API support       |

## Migrating older versions {#migration}

```js
// Before
import VueFullscreen from 'vue-fullscreen'
app.use(VueFullscreen)

// Now
import { Fullscreen } from 'vue-fullscreen'
```

```vue
<!-- Before -->
<fullscreen :fullscreen="active" @update:fullscreen="active = $event" />

<!-- Now -->
<Fullscreen v-model="active" />
```
