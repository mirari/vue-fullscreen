# Compatibility

## Package and API versions

Install the Vue 3 package with:

```sh
npm install vue-fullscreen@next
```

This API reference describes `3.2.0-beta.0`, which is not yet published. The `next` channel currently provides `3.1.3`; some error events and package entry paths differ. Check [npm](https://www.npmjs.com/package/vue-fullscreen) for published versions.

## Supported environments

| Item           | Support                                                |
| -------------- | ------------------------------------------------------ |
| Vue            | `3.0+`                                                 |
| Browser target | ES2018; Internet Explorer is not supported             |
| SSR            | Importing is supported; operations require the browser |

Examples using `<script setup>` require Vue 3.2+. For Vue 3.0/3.1, use the Options API example in [Getting started](/en/guide/getting-started). Vue 3.0's declarations may require `skipLibCheck` with modern TypeScript.

## Model events

```vue
<fullscreen v-model="active">Content</fullscreen>

<!-- Equivalent explicit binding -->
<fullscreen :model-value="active" @update:model-value="active = $event" />
```

The deprecated `fullscreen` / `update:fullscreen` pair is retained for compatibility. Do not control a component with conflicting model values.

## Browser behavior

Native fullscreen needs a user gesture and may be restricted by browser or iframe permissions. When native fullscreen is unavailable, page-only mode fills the page without hiding browser controls.

Importing the package is safe during SSR, but calling `request()` requires the DOM. Obtain the element after mount and request fullscreen from a user action.

Vue 2 has its own [documentation](/en/vue2/).
