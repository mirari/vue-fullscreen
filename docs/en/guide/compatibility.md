# Compatibility

## Package and API versions

Vue `3.0+` is supported. Stable releases use the default `latest` channel:

```sh
npm install vue-fullscreen
```

This API reference describes `5.0.0`. For Vue 2, use `vue-fullscreen@legacy`; see [Vue 2 compatibility](/en/vue2/guide/compatibility).

## Fullscreen API browser support

Native fullscreen is provided by the browser. See [Can I use: Fullscreen API](https://caniuse.com/fullscreen) for version coverage and [MDN's requestFullscreen compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#browser_compatibility) for device restrictions.

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

## User activation and iframe permissions

Native fullscreen **can only be triggered by** a user interaction such as a click, touch or key press. Avoid waiting for a network request before calling the API, as user activation may expire.

An embedded document needs fullscreen permission, for example:

```html
<iframe src="/example/" allow="fullscreen" allowfullscreen></iframe>
```

The parent document's `Permissions-Policy` can still restrict fullscreen. An iframe attribute cannot override a stricter response-header policy.

## Capability detection and page-only fallback

Read the `isSupported` ref returned by `useFullscreen()` in the browser to check whether the current document allows native fullscreen. It does not indicate whether fullscreen is active or guarantee that the next request will succeed.

```js
import { useFullscreen } from 'vue-fullscreen'

// Read after mount or during a user interaction
const { isSupported } = useFullscreen()
const nativeAvailable = isSupported.value
```

- When native fullscreen is unavailable, the component, directive and API fall back to page-only mode.
- Explicitly setting `pageOnly: true` (`page-only` on the component) always uses page-only mode.
- If the native capability is available but a request is rejected, the library reports the error and restores the DOM without silently falling back. Catch API Promise rejections; use the component's `error` event or the directive's `fullscreen-error` event.

Page-only mode keeps the browser toolbar and fills only the current document's viewport. Inside an iframe, it fills the frame. `teleport` moves the target to that document's `body`; it cannot escape the iframe boundary.
