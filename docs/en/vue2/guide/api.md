# Vue 2 API

Control an existing element from buttons, keyboard shortcuts or application logic. Every operation returns a Promise.

## Playground {#playground}

[Playground](/en/vue2/playground?example=api)

<Vue2Demo kind="api" />

```fullscreen-example
api vue2 en
```

In native mode, await `fullscreen.exit()` in a route leave guard before removing the target.

## Target types

Targets accept an HTML element, Vue template ref, component instance (using its `$el`), id string (`'panel'` or `'#panel'`) or getter. The target is resolved on each entry. Missing ids and unmounted refs reject the Promise. Omitting the target or passing `null` directly uses `document.body`.

```js
await fullscreen.request('panel') // id
await fullscreen.request('#panel') // id with #
await fullscreen.request(this.$refs.target) // DOM element or Vue component
```

## Toggle or force a state

```ts
await fullscreen.toggle(element, { pageOnly: true }) // Toggle
await fullscreen.toggle(element, { pageOnly: true }, true) // Enter
await fullscreen.toggle(element, undefined, false) // Exit
await fullscreen.exit() // No-op when inactive
```

`request()` defaults to `document.body`. Calling it while active does not switch targets; exit first, then request the new target.

Native requests must be initiated by a user gesture. Call `request()` directly from a click or key handler, before awaiting network requests.

## Methods {#methods}

```ts
fullscreen.request(target?: FullscreenTarget, options?: ApiOptions): Promise<void>
fullscreen.toggle(target?: FullscreenTarget, options?: ApiOptions, force?: boolean): Promise<void>
fullscreen.exit(): Promise<void>
```

## Instance properties {#state}

| Property       | Type              | Meaning                                          |
| -------------- | ----------------- | ------------------------------------------------ |
| `isFullscreen` | `boolean`         | Whether the controller is active                 |
| `isEnabled`    | `boolean`         | Native fullscreen API support                    |
| `element`      | `Element \| null` | Target element; null after exit                  |
| `options`      | Session options   | Current settings; do not modify during a session |

These are ordinary properties, not Vue reactive refs. Use `callback` to update Vue state, or use the component's `v-model`.

## Options {#options}

| Option                           | Type                              | Default        | Purpose                                      |
| -------------------------------- | --------------------------------- | -------------- | -------------------------------------------- |
| [`pageOnly`](/en/vue2/#pageonly) | `boolean`                         | `false`        | Use page-only mode                           |
| [`teleport`](/en/vue2/#teleport) | `boolean`                         | `false`        | Move to the body; disabled for a body target |
| `fullscreenClass`                | `string`                          | `'fullscreen'` | Class to add while active                    |
| `callback`                       | `(isFullscreen: boolean) => void` | None           | Report changes in state                      |

`screenfull` is also available as a named export. It is the underlying native fullscreen utility; calling it directly does not manage page-only mode, styles or teleport.

## Callbacks {#callbacks}

```js
fullscreen.request(target, {
  callback(isFullscreen) {
    // Synchronize application state
    active = isFullscreen
  },
})
```
