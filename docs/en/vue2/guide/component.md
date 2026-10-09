# Vue 2 component

Use `v-model` to control fullscreen. It binds the `value` prop and `input` event. Exiting with Esc updates the bound value.

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
import { component as Fullscreen } from 'vue-fullscreen'
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

## Events and methods

`change(active)` reports state changes. `error(error)` reports failures triggered by a model change or wrapper click. Reset the model to `false` after a failure so the operation can be retried.

Set `ref="panel"` on the component to call its methods:

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

The instance provides `request()`, `exit()` and `toggle(force?)`, as well as the compatibility members `enter()`, `getState()` and `support`. See the [API reference](/en/vue2/reference/api#component).

The `fullscreen` / `update:fullscreen` model is retained for compatibility. Prefer `v-model`. Destroying the component cleans up event listeners and moved DOM nodes.
