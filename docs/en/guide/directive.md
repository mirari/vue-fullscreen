# Directive

The directive toggles fullscreen when its element is clicked. It does not require a model value.

::: tip On this page
See the [**directive reference**](#reference) for all binding values, modifiers and options.
:::

<ClientOnly><FullscreenDemo kind="directive" /></ClientOnly>

## Local registration

```vue
<script setup>
import { vFullscreen } from 'vue-fullscreen'
import { ref } from 'vue'

const error = ref('')
</script>

<template>
  <button
    v-fullscreen.pageOnly.teleport="{ target: '#report' }"
    @fullscreen-error="error = $event.detail.message"
  >
    Toggle fullscreen
  </button>
  <section id="report">
    <h2>Report</h2>
    <p>Press Esc to exit, or add an exit button inside this area.</p>
  </section>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

With a regular `setup()` function or the Options API, register the directive locally in the component’s `directives` option as `fullscreen: vFullscreen`.

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

The binding object also accepts `fullscreenClass` and `callback(isFullscreen)`. Bind the same directive inside the target to provide an exit button. Unmounting the directive that started the session cleans it up automatically.

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
