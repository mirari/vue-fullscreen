# Vue 2 API

Import the API to control an existing element. Every operation returns a Promise.

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
          callback: (active) => {
            this.active = active
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

## Toggle or force a state

```ts
await fullscreen.toggle(element, { pageOnly: true }) // Toggle
await fullscreen.toggle(element, { pageOnly: true }, true) // Enter
await fullscreen.toggle(element, undefined, false) // Exit
await fullscreen.exit() // No-op when inactive
```

`request()` defaults to `document.body`. Calling it while active does not switch targets; exit first, then request the new target.

## Read state

```ts
fullscreen.isFullscreen // Whether this controller is active
fullscreen.element // Current target; null after exit
fullscreen.isEnabled // Native API support, not permission for a specific request
fullscreen.options // Current session options
```

These are ordinary properties, not Vue reactive refs. Use `callback` to update Vue state, or use the component's `v-model`.

Native requests must be initiated by a user gesture. Call `request()` directly from a click or key handler, before awaiting network requests.

See the [API reference](/en/vue2/reference/api#api-singleton) for method signatures and options.
