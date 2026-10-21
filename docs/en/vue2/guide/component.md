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
import { Fullscreen } from 'vue-fullscreen'
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

## Keep fullscreen while changing views

Keep the fullscreen container outside the view that changes. This applies to tabs as well as Vue Router: place `<router-view>` inside the stable container.

```vue
<fullscreen v-model="active" teleport :exit-on-click-wrapper="false">
  <nav>
    <router-link to="/chart">Chart</router-link>
    <router-link to="/table">Table</router-link>
  </nav>
  <router-view />
  <button @click="active = false">Exit fullscreen</button>
</fullscreen>
```

This fragment belongs in the persistent application layout after registering the fullscreen plugin and configuring your routes. SPA navigation replaces the inner view; the fullscreen container must remain mounted. Putting a separate fullscreen component inside each route destroys it on navigation and exits fullscreen. Loading another document or reloading the page cannot preserve fullscreen.
