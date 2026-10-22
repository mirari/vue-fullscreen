# FAQ

## Why can't the page enter native fullscreen automatically on load?

Native fullscreen **can only be triggered by** a user interaction such as a click, touch or key press. This is a browser user activation requirement. Request fullscreen directly in the event handler; waiting for a network response or timer may let user activation expire. Use `pageOnly: true` if content needs to expand automatically without a user interaction. See [user activation and iframe permissions](/en/vue2/guide/compatibility#user-activation-and-iframe-permissions).

## Why does a native fullscreen request fail?

Check the error event or rejected Promise. An iframe also needs permission from its host to use fullscreen.

`isEnabled` only indicates API support. Try `pageOnly` to distinguish native permission issues from other problems.

## Why does fullscreen behave differently on mobile?

Native fullscreen support varies by browser, device and embedding context. The library uses page-only mode when native fullscreen is unavailable. Page-only mode keeps browser controls visible. Check the behavior on the target device.

## Why are dropdowns or dialogs hidden?

The browser only displays the native fullscreen element and its descendants. A larger `z-index` cannot reveal a popup outside that element. Enable `teleport` and configure your UI library to mount the popup under `body`, or leave `teleport` disabled and mount it inside the fullscreen target. Compare both settings in [Getting started](/en/vue2/).

## Why do styles change with teleport?

The target moves from its original parent to the body. Ancestor selectors and inherited values may no longer apply. Put important styles directly on the target. On exit, the original location and the inline layout properties changed by the library are restored.

Apply background, scrolling and stacking styles through `fullscreenClass`. The library does not set these styles:

```css
.my-fullscreen {
  background: white;
  overflow: auto;
  z-index: 1000;
}
```

## Can I use SSR or Nuxt?

The package can be imported on the server. Read DOM elements after mount and request native fullscreen from a browser user action. Do not call `fullscreen.request()` on the server.
