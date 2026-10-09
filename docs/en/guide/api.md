# API

The API controls an existing DOM element. Each operation returns a Promise.

<ClientOnly><FullscreenDemo kind="api" /></ClientOnly>

## Request fullscreen

```vue
<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { api } from 'vue-fullscreen'

const target = ref()
const active = ref(false)
const error = ref('')

async function enter() {
  try {
    await api.request(target.value, {
      pageOnly: true,
      teleport: true,
      callback: (value) => {
        active.value = value
      },
    })
  } catch (reason) {
    error.value = reason.message
  }
}
async function exit() {
  try {
    await api.exit()
  } catch (reason) {
    error.value = reason.message
  }
}
onBeforeUnmount(() => {
  if (api.element === target.value) void api.exit().catch(() => {})
})
</script>

<template>
  <button @click="enter">Enter fullscreen</button>
  <section ref="target">
    <h2>Panel</h2>
    <button v-if="active" @click="exit">Exit fullscreen</button>
  </section>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

This example uses page-only mode, which restores the DOM immediately on exit. In native mode, await `api.exit()` in a route leave guard before removing the target. For a component-owned area, the [component](/en/guide/component) handles its own lifecycle.

## Toggle or force a state

```ts
await api.toggle(element, { pageOnly: true }) // Toggle
await api.toggle(element, { pageOnly: true }, true) // Enter
await api.toggle(element, undefined, false) // Exit
await api.exit() // No-op when inactive
```

`request()` defaults to `document.body`. Calling it while active does not switch targets; exit first, then request the new target.

## Read state

```ts
api.isFullscreen // Whether this controller is active
api.element // Current target; null after exit
api.isEnabled // Native API support, not permission for a specific request
api.options // Current session options
```

These are ordinary properties, not Vue reactive refs. Use `callback` to update Vue state, or use the component's `v-model`.

Native requests must be initiated by a user gesture. Call `request()` directly from a click or key handler, before awaiting network requests.

See the [API reference](/en/reference/api#api-singleton) for method signatures and options.
