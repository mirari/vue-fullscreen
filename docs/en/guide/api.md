# API

Control an existing element from buttons or application logic, with reactive fullscreen state.

## Playground {#playground}

[Playground](/en/playground?example=api)

<UsageDemo kind="api" />

The image preview uses [v-viewer](https://github.com/mirari/v-viewer); install it separately with `npm install v-viewer`.

```fullscreen-example
api vue3 en
```

## Targets {#target}

Targets accept an HTML element, Vue template ref, component instance (using its `$el`), id string (`'panel'` or `'#panel'`) or getter. The target is resolved on each entry. Missing ids and unmounted refs reject the Promise. Omitting the target or passing `null` directly uses `document.body`.

```js
useFullscreen(document.getElementById('panel')) // HTML element
useFullscreen(target) // Vue template ref
useFullscreen('panel') // id
useFullscreen('#panel') // id with #
```

Each call maintains its own fullscreen state. Component unmount restores moved nodes and removes listeners, exiting fullscreen. Native requests must run directly from a click or key handler, before awaiting network requests.

## Use outside components

`useFullscreen()` can also be called outside a component. Each call owns an independent session; call `exit()` when finished because there is no component lifecycle to clean it up.

```ts
import { useFullscreen } from 'vue-fullscreen'

const { enter, exit } = useFullscreen('#panel', {
  pageOnly: true,
  teleport: true,
})
await enter()
await exit()
```

## Parameters {#parameters}

```ts
useFullscreen(target?: UseFullscreenTarget, options?: UseFullscreenOptions): UseFullscreenReturn
```

## Return values {#returns}

| Return value                | Type                     | Meaning                                                  |
| --------------------------- | ------------------------ | -------------------------------------------------------- |
| `isFullscreen`              | `Readonly<Ref<boolean>>` | Reactive state synchronized with actual exits            |
| `isSupported`               | `ComputedRef<boolean>`   | Native API availability; page-only mode works regardless |
| `enter` / `exit` / `toggle` | `(): Promise<void>`      | Enter, exit or toggle                                    |

## Options {#options}

| Option            | Type                     | Default        |
| ----------------- | ------------------------ | -------------- |
| `pageOnly`        | `boolean`, ref or getter | `false`        |
| `teleport`        | `boolean`, ref or getter | `false`        |
| `fullscreenClass` | `string`, ref or getter  | `'fullscreen'` |

Options are read on each entry. Unsupported browsers fall back to page-only mode; failed native requests restore the DOM and reject.

`screenfull` is also available as a named export. It is the underlying native fullscreen utility; calling it directly does not manage page-only mode, styles or teleport.

## Migrating older versions {#migration}

```js
// Before
import { api } from 'vue-fullscreen'
api.request(target, { callback: onChange })

// Now
import { useFullscreen } from 'vue-fullscreen'
const { isFullscreen, enter, exit } = useFullscreen(target)
```
