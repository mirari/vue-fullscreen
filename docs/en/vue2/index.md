# Getting started with Vue 2

This section describes the Vue 2 package.

## Install

```sh
npm install vue-fullscreen@legacy
```

The `legacy` channel provides the Vue 2 package. See [compatibility](/en/vue2/guide/compatibility) for API versions.

## Register the plugin

```js
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

Vue.use(VueFullscreen)
new Vue({ render: (h) => h(App) }).$mount('#app')
```

The plugin registers `<fullscreen>`, `v-fullscreen` and `$fullscreen`. The [component](/en/vue2/guide/component), [directive](/en/vue2/guide/directive) and [API](/en/vue2/guide/api) can also be imported individually.

## Use the component

```vue
<template>
  <div>
    <button @click="active = true">Enter fullscreen</button>
    <fullscreen v-model="active" page-only teleport @error="handleError">
      <h2>Content</h2>
      <button @click="active = false">Exit fullscreen</button>
    </fullscreen>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
export default {
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

`page-only` fills the page; remove it to request native fullscreen. `teleport` moves the target to the body while active. See [fullscreen modes](/en/vue2/guide/modes) for details.

[Open the Vue 2 examples](/en/vue2/examples).
