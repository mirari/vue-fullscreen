# Vue 2 API

Import the API to control an existing element. Every operation returns a Promise.

::: tip On this page
See the [**API reference**](#reference) for all parameters, return values and methods.
:::

<ClientOnly><Vue2Demo kind="api" /></ClientOnly>

```vue
<template>
  <div>
    <button @click="enter">Enter fullscreen</button>
    <section ref="target">
      <h2>Content</h2>
      <button v-if="active" @click="exit">Exit fullscreen</button>
    </section>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { fullscreen } from 'vue-fullscreen'
export default {
  data: () => ({ active: false, error: '' }),
  methods: {
    async enter() {
      try {
        await fullscreen.request(this.$refs.target, {
          pageOnly: true,
          teleport: true,
          callback: (isFullscreen) => {
            this.active = isFullscreen
          },
        })
      } catch (error) {
        this.error = error.message
      }
    },
    async exit() {
      try {
        await fullscreen.exit()
      } catch (error) {
        this.error = error.message
      }
    },
  },
  beforeDestroy() {
    if (fullscreen.element === this.$refs.target)
      void fullscreen.exit().catch(() => {})
  },
}
</script>
```

This example uses page-only mode. In native mode, await `fullscreen.exit()` in a route leave guard before removing the target.

## Target types

Targets accept an HTML element, Vue template ref, component instance (using its `$el`), id string (`'panel'` or `'#panel'`) or getter. The target is resolved on each entry. Missing ids and unmounted refs reject the Promise instead of fullscreening body. Omitting the target or passing `null` directly uses `document.body`.

```js
await fullscreen.request('panel') // id
await fullscreen.request('#panel') // id with #
await fullscreen.request(this.$refs.target) // DOM element or Vue component
```

## Toggle or force a state

```ts
await fullscreen.toggle(element, { pageOnly: true }) // Toggle
await fullscreen.toggle(element, { pageOnly: true }, true) // Enter
await fullscreen.toggle(element, undefined, false) // Exit
await fullscreen.exit() // No-op when inactive
```

`request()` defaults to `document.body`. Calling it while active does not switch targets; exit first, then request the new target.

Native requests must be initiated by a user gesture. Call `request()` directly from a click or key handler, before awaiting network requests.

## Reference

### Methods

```ts
fullscreen.request(target?: FullscreenTarget, options?: ApiOptions): Promise<void>
fullscreen.toggle(target?: FullscreenTarget, options?: ApiOptions, force?: boolean): Promise<void>
fullscreen.exit(): Promise<void>
```

### State

| Property       | Type              | Meaning                                          |
| -------------- | ----------------- | ------------------------------------------------ |
| `isFullscreen` | `boolean`         | Whether the controller is active                 |
| `isEnabled`    | `boolean`         | Native fullscreen API support                    |
| `element`      | `Element \| null` | Target element; null after exit                  |
| `options`      | Session options   | Current settings; do not modify during a session |

These are ordinary properties, not Vue reactive refs. Use `callback` to update Vue state, or use the component's `v-model`.

### ApiOptions

| Option            | Type                              | Default        | Purpose                                      |
| ----------------- | --------------------------------- | -------------- | -------------------------------------------- |
| `pageOnly`        | `boolean`                         | `false`        | Use page-only mode                           |
| `teleport`        | `boolean`                         | `false`        | Move to the body; disabled for a body target |
| `fullscreenClass` | `string`                          | `'fullscreen'` | Class to add while active                    |
| `callback`        | `(isFullscreen: boolean) => void` | None           | Report changes in state                      |

`screenfull` is also available as a named export. It is the underlying native fullscreen utility; calling it directly does not manage page-only mode, styles or teleport.
