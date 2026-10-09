# Compatibility

## Package and API versions

Install the Vue 3 package with:

```sh
npm install vue-fullscreen@next
```

This API reference describes `4.0.0`, which is not yet published. The `next` channel currently provides `3.1.3`; some error events and package entry paths differ. Check [npm](https://www.npmjs.com/package/vue-fullscreen) for published versions.

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

## Fullscreen API browser support

Native fullscreen is provided by the browser. See [Can I use: Fullscreen API](https://caniuse.com/fullscreen) for version coverage and [MDN's requestFullscreen compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#browser_compatibility) for device restrictions. This overview was checked on 2026-10-09.

| Browser / device         | Native fullscreen support                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| Desktop Chrome / Edge    | Standard API in Chrome 71+ and Edge 79+                                                                |
| Desktop Firefox          | Standard API in 64+                                                                                    |
| macOS Safari             | Standard API in 16.4+; earlier versions have partial prefixed support                                  |
| iPad Safari              | Standard API in iPadOS 16.4+, with device restrictions; earlier versions have partial prefixed support |
| iPhone Safari            | No Fullscreen API for arbitrary elements; use page-only mode                                           |
| Android Chrome / Firefox | Supported in current versions; see the support table for individual releases                           |
| Internet Explorer        | IE 11 has partial native API support; this package does not support IE                                 |

These versions describe the browser API, not this package's minimum browser versions or a promise of testing on each device. Package builds target ES2018. The underlying `screenfull` library handles some vendor prefixes, but cannot supply missing browser capabilities.

### Safari and mobile devices

iPad fullscreen displays browser-provided exit controls, and system gestures such as swiping down may exit fullscreen. The iPhone video player's dedicated fullscreen feature does not provide native fullscreen for charts, ordinary `div` elements or the whole page. See the [WebKit release notes](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/) for Safari 16.4 changes.

### Internet Explorer

This package requires Vue 3 and does not support IE. Adding a `Promise` polyfill cannot supply the Proxy support required by Vue 3. For IE 11, use the separate [Vue 2 package and compatibility guide](/en/vue2/guide/compatibility).

## Capability detection and page-only fallback

Read `api.isEnabled` in the browser to check whether the current document allows native fullscreen. It does not indicate whether fullscreen is active or guarantee that the next request will succeed.

```js
import { api } from 'vue-fullscreen'

// Read after mount or during a user interaction
const nativeAvailable = api.isEnabled
```

- When native fullscreen is unavailable, the component, directive and API fall back to page-only mode.
- Explicitly setting `pageOnly: true` (`page-only` on the component) always uses page-only mode.
- If the native capability is available but a request is rejected, the library reports the error and restores the DOM without silently falling back. Catch API Promise rejections; use the component's `error` event or the directive's `fullscreen-error` event.

Page-only mode keeps the browser toolbar and fills only the current document's viewport. Inside an iframe, it fills the frame. `teleport` moves the target to that document's `body`; it cannot escape the iframe boundary.

## User activation and iframe permissions

Native fullscreen must be triggered by a click, touch or key interaction. Avoid waiting for a network request before calling the API, as user activation may expire.

An embedded document needs fullscreen permission, for example:

```html
<iframe src="/example/" allow="fullscreen" allowfullscreen></iframe>
```

The parent document's `Permissions-Policy` can still restrict fullscreen. An iframe attribute cannot override a stricter response-header policy.

## Exiting fullscreen and tracking state

Users can press Esc or use browser exit controls. Loading another document, reloading, switching tabs or changing applications with Alt-Tab can also exit native fullscreen. Behavior depends on the browser and operating system; see the [MDN fullscreen guide](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide#things_your_users_want_to_know).

Do not assume your exit button is the only source of state changes. The component synchronizes actual state through `v-model`; use `callback` to track API and directive state. Page-only mode does not necessarily exit when changing applications, so keep an exit button visible.

SPA route changes differ from loading another document: fullscreen can continue while the outer target remains mounted, whereas unmounting the fullscreen component exits it. See the [examples](/en/examples).

## SSR

Importing the package does not require a browser, but fullscreen operations such as `request()` do. Obtain DOM elements after mount and request fullscreen during a user interaction.
