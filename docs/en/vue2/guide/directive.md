# Vue 2 directive

Register the directive locally, then click the button to toggle a target element.

::: tip On this page
See the [**directive reference**](#reference) for all binding values, modifiers and options.
:::

<ClientOnly><Vue2Demo kind="directive" /></ClientOnly>

```vue
<template>
  <div>
    <button
      v-fullscreen.pageOnly.teleport="{ target: '#report' }"
      @fullscreen-error="error = $event.detail.message"
    >
      Toggle fullscreen
    </button>
    <section id="report">Content</section>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { vFullscreen } from 'vue-fullscreen'
export default {
  directives: { fullscreen: vFullscreen },
  data: () => ({ error: '' }),
}
</script>
```

## Binding values

```vue
<!-- No binding: target document.body -->
<button v-fullscreen>Fullscreen page</button>

<!-- CSS selector -->
<button v-fullscreen="'#report'">Fullscreen report</button>

<!-- Target and options -->
<button v-fullscreen="{ target: '#report', pageOnly: true, teleport: true }">
  Page-only fullscreen
</button>
```

`target` also accepts HTML elements, Vue refs, component instances (using `$el`) and getters. The current target is resolved on entry. Strings passed directly are CSS selectors; use `'#report'` for an id.

An unresolved target dispatches `fullscreen-error`. Omitting `target` or passing `null` directly uses `document.body`.

## Modifiers and options

`.pageOnly` and `.teleport` set the corresponding options. Explicit object values take precedence over modifiers. For example, `.pageOnly="{ pageOnly: false }"` requests native mode.

The binding object also accepts `fullscreenClass` and `callback(isFullscreen)`. The directive uses the shared API, so `fullscreen.exit()` can exit a session started by a directive.

## Errors

Failures dispatch a bubbling native `fullscreen-error` event. The error is in `event.detail`; this is separate from the component's `error` event.

```js
button.addEventListener('fullscreen-error', (event) => {
  console.error(event.detail)
})
```

A button outside the fullscreen target may not be visible in native mode. Put an exit button inside the target, or use Esc.

## Reference

```ts
interface DirectiveOptions extends ApiOptions {
  target?: FullscreenTarget
}
```

| Option            | Type                              | Default         | Purpose                                      |
| ----------------- | --------------------------------- | --------------- | -------------------------------------------- |
| `target`          | `FullscreenTarget`                | `document.body` | Target; direct strings are CSS selectors     |
| `pageOnly`        | `boolean`                         | `false`         | Use page-only mode                           |
| `teleport`        | `boolean`                         | `false`         | Move to the body; disabled for a body target |
| `fullscreenClass` | `string`                          | `'fullscreen'`  | Class to add while active                    |
| `callback`        | `(isFullscreen: boolean) => void` | None            | Report changes in state                      |
