# Vue 2 directive

Register the directive locally, then click the button to toggle a target element.

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
import { directive } from 'vue-fullscreen'
export default {
  directives: { fullscreen: directive },
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
