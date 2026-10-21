# API reference

## Exports

```ts
import {
  Fullscreen,
  vFullscreen,
  useFullscreen,
  fullscreen,
  screenfull,
  type ApiOptions,
  type VueFullscreenApi,
  type DirectiveOptions,
  type UseFullscreenOptions,
  type UseFullscreenTarget,
  type UseFullscreenReturn,
} from 'vue-fullscreen'
```

`screenfull` is the underlying native fullscreen utility; calling it directly does not manage page-only mode, styles or teleport.

## Component

### Props

| Prop                 | Type      | Default        | Purpose                                                               |
| -------------------- | --------- | -------------- | --------------------------------------------------------------------- |
| `modelValue`         | `boolean` | `false`        | `v-model` value                                                       |
| `pageOnly`           | `boolean` | `false`        | Fill the page; automatic fallback if native fullscreen is unavailable |
| `teleport`           | `boolean` | `false`        | Move the element to the body while active                             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | Class applied while active                                            |
| `exitOnClickWrapper` | `boolean` | `true`         | Exit on wrapper background clicks, not child clicks                   |
| `fullscreen`         | `boolean` | `false`        | Deprecated model prop                                                 |

Do not supply conflicting model values.

### Events

| Event               | Argument     | Purpose                                                      |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `change`            | `boolean`    | Fullscreen state changed                                     |
| `update:modelValue` | `boolean`    | Synchronize `v-model`                                        |
| `update:fullscreen` | `boolean`    | Synchronize the deprecated model                             |
| `error`             | Error object | A model change or wrapper click triggered a failed operation |

### Instance members

| Member         | Type / signature                   | Purpose                  |
| -------------- | ---------------------------------- | ------------------------ |
| `request`      | `(): Promise<void>`                | Enter fullscreen         |
| `exit`         | `(): Promise<void>`                | Exit fullscreen          |
| `toggle`       | `(force?: boolean): Promise<void>` | Toggle or force a state  |
| `isFullscreen` | `boolean`                          | Current fullscreen state |
| `isEnabled`    | `boolean`                          | Native API support       |

Handle rejected Promises when calling methods directly. The component cleans up listeners and moved DOM nodes on unmount.

## useFullscreen

```ts
useFullscreen(target?: UseFullscreenTarget, options?: UseFullscreenOptions): UseFullscreenReturn
```

Vue 3 composable. The target accepts an element, template ref or getter and defaults to body. Each call owns its state and cleans up on component unmount.

| Return value                | Type                     | Meaning                                                  |
| --------------------------- | ------------------------ | -------------------------------------------------------- |
| `isFullscreen`              | `Readonly<Ref<boolean>>` | Reactive state synchronized with actual exits            |
| `isSupported`               | `ComputedRef<boolean>`   | Native API availability; page-only mode works regardless |
| `enter` / `exit` / `toggle` | `(): Promise<void>`      | Enter, exit or toggle                                    |

### UseFullscreenOptions

| Option            | Type                     | Default        |
| ----------------- | ------------------------ | -------------- |
| `pageOnly`        | `boolean`, ref or getter | `false`        |
| `teleport`        | `boolean`, ref or getter | `false`        |
| `fullscreenClass` | `string`, ref or getter  | `'fullscreen'` |

Options are read on each entry. Unsupported browsers fall back to page-only mode; failed native requests restore the DOM and reject.

## API singleton

```ts
fullscreen.request(target?: Element | null, options?: ApiOptions): Promise<void>
fullscreen.toggle(target?: Element | null, options?: ApiOptions, force?: boolean): Promise<void>
fullscreen.exit(): Promise<void>
```

An omitted or null target defaults to the body. At runtime, the target must be an HTML element. Operations reject when no browser environment exists.

| Property       | Type              | Meaning                                          |
| -------------- | ----------------- | ------------------------------------------------ |
| `isFullscreen` | `boolean`         | Whether the controller is active                 |
| `isEnabled`    | `boolean`         | Native fullscreen API support                    |
| `element`      | `Element \| null` | Target element; null after exit                  |
| `options`      | Session options   | Current settings; do not modify during a session |

### ApiOptions

| Option            | Type                        | Default        | Purpose                                      |
| ----------------- | --------------------------- | -------------- | -------------------------------------------- |
| `pageOnly`        | `boolean`                   | `false`        | Use page-only mode                           |
| `teleport`        | `boolean`                   | `false`        | Move to the body; disabled for a body target |
| `fullscreenClass` | `string`                    | `'fullscreen'` | Class to add while active                    |
| `callback`        | `(active: boolean) => void` | None           | Report changes in state                      |

## Directive

The binding is a selector string, a `DirectiveOptions` object, or omitted.

```ts
interface DirectiveOptions extends ApiOptions {
  target?: string | Element | null
}
```

`.pageOnly` and `.teleport` set options; explicit object values take precedence. Errors appear in `detail` on a native `fullscreen-error` event. Removing the directive removes its click listener. Use `fullscreen.exit()` to end a shared API session.

## Module formats

| Use            | Entry                                                           |
| -------------- | --------------------------------------------------------------- |
| ESM            | `import ... from 'vue-fullscreen'`                              |
| CommonJS       | `require('vue-fullscreen')`; access named exports as properties |
| Browser global | `index.umd.js`; exposes `window.VueFullscreen`                  |
| TypeScript     | `exports` selects ESM or CJS declarations                       |

Load the matching Vue global build before the UMD bundle, then access named exports such as `VueFullscreen.Fullscreen`, `VueFullscreen.vFullscreen` and `VueFullscreen.useFullscreen`. Register components and directives locally through the consuming component's `components` and `directives` options. Check your installed version's package entries when linking to files directly.
