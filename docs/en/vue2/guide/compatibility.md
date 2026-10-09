# Vue 2 compatibility

## Package versions

Use `vue-fullscreen@legacy` for Vue 2. This API reference describes `2.7.0-beta.0`, which is not yet published. The `legacy` channel currently provides `2.6.3`; some error events and package entry paths differ.

## Supported environments

Vue `2.6.14` and `2.7.x` are supported. Browser builds target ES2018; Internet Explorer is not supported. Importing works during SSR, but fullscreen operations require the browser.

## Model events

```vue
<fullscreen v-model="active">Content</fullscreen>

<!-- Equivalent explicit binding -->
<fullscreen :value="active" @input="active = $event" />
```

The `fullscreen` / `update:fullscreen` model is retained for compatibility. Do not pass conflicting model values.

## Native fullscreen

Native fullscreen requires a user gesture and may be restricted by iframe permissions. When the native API is unavailable, the library falls back to page-only mode. Rejected native requests report an error.

See the [API reference](/en/vue2/reference/api) for component methods and events.
