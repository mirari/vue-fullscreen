# Directive

The directive toggles fullscreen when its element is clicked. It does not require a model value.

<ClientOnly><FullscreenDemo kind="directive" /></ClientOnly>

## Local registration

```vue
<script setup>
import { directive as vFullscreen } from 'vue-fullscreen'
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

With the global plugin installed, use `v-fullscreen` directly without a local import.

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

`target` may also be an existing HTML element. Selectors are resolved on click. A selector with no matching element reports an error rather than targeting the body.

## Modifiers and options

`.pageOnly` and `.teleport` set the corresponding options. Explicit object values take precedence over modifiers. For example, `.pageOnly="{ pageOnly: false }"` requests native mode.

The binding object also accepts `fullscreenClass` and `callback(active)`. The directive uses the shared API, so `api.exit()` can exit a session started by a directive.

## Errors

Failures dispatch a bubbling native `fullscreen-error` event. The error is in `event.detail`; this is separate from the component's `error` event.

```js
button.addEventListener('fullscreen-error', (event) => {
  console.error(event.detail)
})
```

A button outside the fullscreen target may not be visible in native mode. Put an exit button inside the target, or use Esc.
