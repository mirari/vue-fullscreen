# Vue 2 compatibility

## Package versions

Vue 2 versions from `2.4.0` onward are supported through `vue-fullscreen@legacy`. This API reference describes `4.0.0`.

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
| Internet Explorer        | IE 11 uses the ms-prefixed API; page-only mode is used when unavailable                                |

These versions describe the browser API, not this package's minimum browser versions or a promise of testing on each device. UMD/CJS builds use ES5 syntax; ESM builds retain module declarations for your application bundler. The underlying `screenfull` library handles some vendor prefixes, but cannot supply missing browser capabilities.

### Safari and mobile devices

iPad fullscreen displays browser-provided exit controls, and system gestures such as swiping down may exit fullscreen. The iPhone video player's dedicated fullscreen feature does not provide native fullscreen for charts, ordinary `div` elements or the whole page. See the [WebKit release notes](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/) for Safari 16.4 changes.

### Internet Explorer

Vue 2 release files use ES5 syntax. The main entry does **not** load global polyfills. For IE 11, choose one of the following approaches.

### Use the optional polyfill entry

Load it before the component package in your application entry:

```js
import 'vue-fullscreen/polyfills'
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueFullscreen)
```

CommonJS consumers can use `require('vue-fullscreen/polyfills')` before `require('vue-fullscreen')`.

For classic scripts, load the files in this order. The paths below refer to files copied from the installed packages:

```html
<script src="/vendor/vue-fullscreen/polyfills.js"></script>
<script src="/vendor/vue/dist/vue.js"></script>
<script src="/vendor/vue-fullscreen/index.umd.js"></script>
```

Keep script execution in order; do not use `async`. IE cannot load ESM directly. The optional entry fills missing global capabilities; it is marked as having side effects so bundlers retain an explicit import.

### Use your application's polyfills

If your application already supplies these capabilities, omit the optional entry:

- Promise, including `Promise.prototype.finally`;
- WeakMap;
- Symbol and `Symbol.iterator`;
- array iteration, including `Array.prototype.entries`;
- Object.assign.

A global `core-js/stable` import in the application entry is one option. Load it before the component. A library-local ponyfill or only a Promise polyfill does not supply all of these globals. For code-split setups, finish loading polyfills before dynamically importing the component.

Modern browsers with these capabilities do not need the optional entry. Your application, Vue 2 and other dependencies must still be compatible with IE 11. These polyfills cannot make Vue 3 work in IE.

Automated checks parse the emitted code as ES5 and exercise missing capabilities, the ms-prefixed native API, page-only fallback, DOM restoration and directive errors in a simulated environment. This is not an actual IE browser run; verify your application on IE 11 before deployment. IE 10 and earlier are not supported. The VitePress documentation site and Vite demo pages require a modern browser.

## User activation and iframe permissions

Native fullscreen **can only be triggered by** a user interaction such as a click, touch or key press. Avoid waiting for a network request before calling the API, as user activation may expire.

An embedded document needs fullscreen permission, for example:

```html
<iframe src="/example/" allow="fullscreen" allowfullscreen></iframe>
```

The parent document's `Permissions-Policy` can still restrict fullscreen. An iframe attribute cannot override a stricter response-header policy.

## Capability detection and page-only fallback

Read `fullscreen.isEnabled` in the browser to check whether the current document allows native fullscreen. It does not indicate whether fullscreen is active or guarantee that the next request will succeed.

```js
import { fullscreen } from 'vue-fullscreen'

// Read after mount or during a user interaction
const nativeAvailable = fullscreen.isEnabled
```

- When native fullscreen is unavailable, the component, directive and API fall back to page-only mode.
- Explicitly setting `pageOnly: true` (`page-only` on the component) always uses page-only mode.
- If the native capability is available but a request is rejected, the library reports the error and restores the DOM without silently falling back. Catch API Promise rejections; use the component's `error` event or the directive's `fullscreen-error` event.

Page-only mode keeps the browser toolbar and fills only the current document's viewport. Inside an iframe, it fills the frame. `teleport` moves the target to that document's `body`; it cannot escape the iframe boundary.
