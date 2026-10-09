# Component

Wrap content in the component and use `v-model` to control fullscreen. When the user exits with Esc, the bound value returns to `false`.

<ClientOnly><FullscreenDemo /></ClientOnly>

## Local registration

You can import the component without installing the plugin. This `<script setup>` example requires Vue 3.2+. For Vue 3.0/3.1, use the Options API shown in [Getting started](/en/guide/getting-started).

```vue
<script setup>
import { ref } from 'vue'
import { component as Fullscreen } from 'vue-fullscreen'

const active = ref(false)
const error = ref('')
function handleError(reason) {
  active.value = false
  error.value = reason.message
}
</script>

<template>
  <button @click="active = true">Enter fullscreen</button>
  <Fullscreen
    v-model="active"
    page-only
    teleport
    :exit-on-click-wrapper="false"
    @error="handleError"
  >
    <h2>Content</h2>
    <button @click="active = false">Exit fullscreen</button>
  </Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

## State and events

The model uses `modelValue` and `update:modelValue`. `v-model` connects these automatically.

- `change(active)` reports a change in fullscreen state.
- `error(error)` reports a rejected operation triggered by a model change or wrapper click.
- `update:fullscreen` supports the deprecated `fullscreen` prop. Prefer `v-model`.

After a rejected request, reset your model to `false` so a later click can trigger another change. When you call an instance method directly, handle its returned Promise with `try/catch`.

## Component methods

```vue
<script setup>
import { ref } from 'vue'
import { component as Fullscreen } from 'vue-fullscreen'

const panel = ref()
const error = ref('')
async function enter() {
  try {
    await panel.value.request()
  } catch (reason) {
    error.value = reason.message
  }
}
</script>

<template>
  <button @click="enter">Enter fullscreen</button>
  <Fullscreen ref="panel" page-only>Content</Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

See the [component reference](/en/reference/api#component) for all props, events and methods.
