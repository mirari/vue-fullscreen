# Vue 2 component

Use `v-model` to control fullscreen. It binds the `value` prop and `input` event. Exiting with Esc updates the bound value.

::: tip On this page
See the [**component reference**](#reference) for all props, events and methods.
:::

<ClientOnly><Vue2Demo kind="component" /></ClientOnly>

## Local registration

```vue
<template>
  <div>
    <button @click="active = true">Enter fullscreen</button>
    <Fullscreen v-model="active" page-only teleport @error="handleError">
      <h2>Content</h2>
      <button @click="active = false">Exit fullscreen</button>
    </Fullscreen>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { Fullscreen } from 'vue-fullscreen'
export default {
  components: { Fullscreen },
  data: () => ({ active: false, error: '' }),
  methods: {
    handleError(error) {
      this.active = false
      this.error = error.message
    },
  },
}
</script>
```

## Component methods

Set `ref="panel"` on the component to call its methods:

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

The instance provides `request()`, `exit()` and `toggle(force?)`, as well as the compatibility members `enter()`, `getState()` and `support`.

## Reference

### Props

| Prop                 | Type      | Default        | Purpose                                                               |
| -------------------- | --------- | -------------- | --------------------------------------------------------------------- |
| `value`              | `boolean` | `false`        | `v-model` value                                                       |
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
| `input`             | `boolean`    | Synchronize `v-model`                                        |
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
| `enter`        | `(): Promise<void>`                | Alias for `request`      |
| `getState`     | `(): boolean`                      | Read fullscreen state    |
| `support`      | `boolean`                          | Alias for `isEnabled`    |

Handle rejected Promises when calling methods directly. The component cleans up listeners and moved DOM nodes on unmount.
