# API

`useFullscreen()` provides VueUse-style reactive state and controls, without a state callback.

::: tip On this page
See the [**API reference**](#reference) for all parameters, return values and methods.
:::

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

Targets accept an HTML element, Vue template ref, component instance (using its `$el`), id string (`'panel'` or `'#panel'`) or getter. The target is resolved on each entry. Missing ids and unmounted refs reject the Promise instead of fullscreening body. Omitting the target or passing `null` directly uses `document.body`.

```js
useFullscreen(document.getElementById('panel')) // HTML element
useFullscreen(target) // Vue template ref
useFullscreen('panel') // id
useFullscreen('#panel') // id with #
```

Each call owns an independent controller. Component unmount restores moved nodes and removes listeners, exiting fullscreen. Native requests must run directly from a click or key handler, before awaiting network requests.

## Use outside components

`useFullscreen()` can also be called outside a component. Each call owns an independent session; call `exit()` when finished because there is no component lifecycle to clean it up.

```ts
import { useFullscreen } from 'vue-fullscreen'

const { enter, exit } = useFullscreen('#panel', {
  pageOnly: true,
  teleport: true,
})
await enter()
await exit()
```

## Reference

### Signature

```ts
useFullscreen(target?: UseFullscreenTarget, options?: UseFullscreenOptions): UseFullscreenReturn
```

### Return values

| Return value                | Type                     | Meaning                                                  |
| --------------------------- | ------------------------ | -------------------------------------------------------- |
| `isFullscreen`              | `Readonly<Ref<boolean>>` | Reactive state synchronized with actual exits            |
| `isSupported`               | `ComputedRef<boolean>`   | Native API availability; page-only mode works regardless |
| `enter` / `exit` / `toggle` | `(): Promise<void>`      | Enter, exit or toggle                                    |

### UseFullscreenOptions

| Option            | Type                     | Default        |
| ----------------- | ------------------------ | -------------- |
| `pageOnly`        | `boolean`, ref or getter | `false`        |
| `teleport`        | `boolean`, ref or getter | `false`        |
| `fullscreenClass` | `string`, ref or getter  | `'fullscreen'` |

Options are read on each entry. Unsupported browsers fall back to page-only mode; failed native requests restore the DOM and reject.

`screenfull` is also available as a named export. It is the underlying native fullscreen utility; calling it directly does not manage page-only mode, styles or teleport.
