# API

`useFullscreen()` provides VueUse-style reactive state and controls, without a state callback.

<ClientOnly><FullscreenDemo kind="api" /></ClientOnly>

## Specify a target

```vue
<script setup>
import { ref } from 'vue'
import { useFullscreen } from 'vue-fullscreen'

const target = ref()
const error = ref('')
const { isFullscreen, enter, exit, toggle } = useFullscreen(target, {
  pageOnly: true,
  teleport: true,
})
</script>

<template>
  <button @click="enter().catch((e) => (error = e.message))">
    Enter fullscreen
  </button>
  <section ref="target">
    <h2>Panel</h2>
    <button v-if="isFullscreen" @click="exit">Exit fullscreen</button>
    <button @click="toggle">Toggle fullscreen</button>
  </section>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

The target accepts a DOM element, template ref or getter. Omitting it uses `document.body`. The target is resolved on entry; entering while already active does not switch targets.

## State and options

- `isFullscreen`: readonly reactive state that follows Escape and browser exits.
- `isSupported`: native Fullscreen API availability. Page-only mode still works when it is `false`.
- `enter()`, `exit()`, `toggle()`: return Promises and reject if a native request fails.
- `pageOnly`, `teleport`: both default to `false`. They also accept refs or getters, resolved on entry.
- `fullscreenClass`: class applied while active; defaults to `'fullscreen'`.

Each call owns an independent controller. Component unmount restores moved nodes and removes listeners, exiting fullscreen. Native requests must run directly from a click or key handler, before awaiting network requests.

## Imperative calls

Use the `fullscreen` singleton for code outside components or sessions shared with directives:

```ts
import { fullscreen } from 'vue-fullscreen'

await fullscreen.request(element, { pageOnly: true, teleport: true })
await fullscreen.exit()
```

The singleton exposes ordinary state properties. Prefer `useFullscreen()` inside Vue 3 components. See the [API reference](/en/reference/api#usefullscreen) for complete signatures.
