# API

Use `useFullscreen()` for reactive state and methods to control the same fullscreen target from multiple buttons, keyboard shortcuts or application logic.

## Playground {#playground}

[Playground](/en/playground?example=api)

<UsageDemo kind="api" />

```fullscreen-example
api vue3 en
```

## Targets {#target}

Pass the fullscreen target as the first argument to `useFullscreen()`:

| Target type        | Example                                                 |
| ------------------ | ------------------------------------------------------- |
| HTML element       | `useFullscreen(document.getElementById('panel'))`       |
| Vue ref object     | `useFullscreen(panelRef)`                               |
| Component instance | `useFullscreen(panelComponent)`; uses its `$el`         |
| id string          | `useFullscreen('panel')` or `useFullscreen('#panel')`   |
| CSS selector       | `useFullscreen('.panel')`                               |
| Getter             | `useFullscreen(() => document.getElementById('panel'))` |

Strings are resolved by id first (with an optional `#` prefix), then as CSS selectors. An id takes priority when both match. The current target is resolved on each entry.

Omitting the target or passing `null` directly uses `document.body`. Missing selectors, unmounted refs and other unresolved targets reject the Promise.

Each call maintains its own fullscreen state. To control the same target from multiple places, share the state and methods returned by a single `useFullscreen()` call. Component unmount restores moved nodes and removes listeners, exiting fullscreen.

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

### Properties {#properties}

| Property       | Type                     | Meaning                                                  |
| -------------- | ------------------------ | -------------------------------------------------------- |
| `isFullscreen` | `Readonly<Ref<boolean>>` | Reactive state synchronized with actual exits            |
| `isSupported`  | `ComputedRef<boolean>`   | Native API availability; page-only mode works regardless |

### Methods {#methods}

| Method   | Signature           | Meaning           |
| -------- | ------------------- | ----------------- |
| `enter`  | `(): Promise<void>` | Enter fullscreen  |
| `exit`   | `(): Promise<void>` | Exit fullscreen   |
| `toggle` | `(): Promise<void>` | Toggle fullscreen |

## Options {#options}

| Option                                           | Type                     | Default        |
| ------------------------------------------------ | ------------------------ | -------------- |
| [`pageOnly`](/en/guide/getting-started#pageonly) | `boolean`, ref or getter | `false`        |
| [`teleport`](/en/guide/getting-started#teleport) | `boolean`, ref or getter | `false`        |
| `fullscreenClass`                                | `string`, ref or getter  | `'fullscreen'` |

Options are read on each entry. Unsupported browsers fall back to page-only mode; failed native requests restore the DOM and reject.

## Migrating older versions {#migration}

```js
// Before
import { api } from 'vue-fullscreen'
api.request(target, { callback: onChange })

// Now
import { useFullscreen } from 'vue-fullscreen'
const { isFullscreen, enter, exit } = useFullscreen(target)
```
