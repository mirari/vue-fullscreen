# FAQ

## Why does a native fullscreen request fail?

Check the error event or rejected Promise. The browser requires a direct user gesture; requests made after a network call, timer or automatic mount can be rejected. An iframe also needs permission from its host to use fullscreen.

`isEnabled` only indicates API support. Try `pageOnly` to distinguish native permission issues from other problems.

## Why does fullscreen behave differently on mobile?

Native fullscreen support varies by browser, device and embedding context. The library uses page-only mode when native fullscreen is unavailable. Page-only mode keeps browser controls visible. Check the behavior on the target device.

## Why are dropdowns or dialogs hidden?

Try `teleport`, which makes the body the native fullscreen target. The UI library still controls where overlays are mounted and how they are stacked. For page-only mode, set background, `z-index` and overflow styles on `fullscreenClass` as needed.

## Why do styles change with teleport?

The target moves from its original parent to the body. Ancestor selectors and inherited values may no longer apply. Put important styles directly on the target. On exit, the original location and the inline layout properties changed by the library are restored.

## Can I use SSR or Nuxt?

The package can be imported on the server. Read DOM elements after mount and request native fullscreen from a browser user action. Do not call `api.request()` on the server.

## Why does API state not update the UI?

`api.isFullscreen` is not a reactive ref. Use `callback` to update Vue state, or use the component's `v-model`.

## How should I handle route changes?

The component cleans up on unmount. When using the API or directive directly, await `api.exit()` before the route removes the target. Removing a directive only removes its click listener; it does not own the shared API session.
