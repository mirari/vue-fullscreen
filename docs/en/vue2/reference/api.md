# Vue 2 API reference

## Exports

```ts
import VueFullscreen, {
  component,
  directive,
  api,
  screenfull,
  type ApiOptions,
  type InstallationOptions,
  type VueFullscreenApi,
  type DirectiveOptions,
} from 'vue-fullscreen'
```

The default export is the plugin. `screenfull` is the underlying native fullscreen utility; calling it directly does not manage page-only mode, styles or teleport.

## Plugin

```ts
Vue.use(VueFullscreen, { name: 'fs' })
```

| Option | Type     | Default        | Purpose                                         |
| ------ | -------- | -------------- | ----------------------------------------------- |
| `name` | `string` | `'fullscreen'` | Component, directive and instance property name |

`name: 'fs'` registers `<fs>`, `v-fs` and `$fs`. The default `$fullscreen` property has type augmentation; custom names require your own declaration.

## Component

### Props

| Prop                 | Type      | Default        | Purpose                                                               |
| -------------------- | --------- | -------------- | --------------------------------------------------------------------- |
| `value`              | `boolean` | `false`        | `v-model` value                                                       |
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
| `input`             | `boolean`    | Synchronize `v-model`                                        |
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
| `enter`        | `(): Promise<void>`                | Alias for `request`      |
| `getState`     | `(): boolean`                      | Read fullscreen state    |
| `support`      | `boolean`                          | Alias for `isEnabled`    |

Handle rejected Promises when calling methods directly. The component cleans up listeners and moved DOM nodes on unmount.

## API singleton

```ts
api.request(target?: Element | null, options?: ApiOptions): Promise<void>
api.toggle(target?: Element | null, options?: ApiOptions, force?: boolean): Promise<void>
api.exit(): Promise<void>
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

`.pageOnly` and `.teleport` set options; explicit object values take precedence. Errors appear in `detail` on a native `fullscreen-error` event. Removing the directive removes its click listener. Use `api.exit()` to end a shared API session.

## Module formats

| Use            | Entry                                                 |
| -------------- | ----------------------------------------------------- |
| ESM            | `import ... from 'vue-fullscreen'`                    |
| CommonJS       | `require('vue-fullscreen')`; the plugin is `.default` |
| Browser global | `index.umd.js`; exposes `window.VueFullscreen`        |
| TypeScript     | `exports` selects ESM or CJS declarations             |

Load the matching Vue global build before the UMD bundle, then install `VueFullscreen.default`. Check your installed version's package entries when linking to files directly.
