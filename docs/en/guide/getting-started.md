# Getting started

Install the package, register the plugin in your application, and bind fullscreen to a state value.

## 1. Install

```sh
npm install vue-fullscreen@next
```

See [compatibility](/en/guide/compatibility) for API versions and package channels.

## 2. Register the plugin

```ts
import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

createApp(App).use(VueFullscreen).mount('#app')
```

The plugin registers the `<fullscreen>` component, the `v-fullscreen` directive and the `$fullscreen` instance property. You can also import the [component](/en/guide/component), [directive](/en/guide/directive) or [API](/en/guide/api) individually.

## 3. Bind a state value

This example uses the Options API. `page-only` fills the browser viewport; remove it to request native fullscreen.

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
  data() {
    return { active: false, error: '' }
  },
  methods: {
    handleError(error) {
      this.active = false
      this.error = error.message
    },
  },
}
</script>
```

<ClientOnly><FullscreenDemo /></ClientOnly>

## Choose an interface

| Task                                           | Interface                        |
| ---------------------------------------------- | -------------------------------- |
| Keep fullscreen state in sync with a Vue model | [Component](/en/guide/component) |
| Add fullscreen behavior to an existing button  | [Directive](/en/guide/directive) |
| Control a DOM element and await the result     | [API](/en/guide/api)             |
| Compare fullscreen modes and teleport          | [Examples](/en/examples)         |
