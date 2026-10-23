# Vue 2 directive

Register the directive locally, then click the button to toggle a target element.

## Playground {#playground}

[Playground](/en/vue2/playground?example=directive)

<Vue2Demo kind="directive" />

```fullscreen-example
directive vue2 en
```

## Binding values and modifiers {#reference}

```vue
<!-- No binding: target document.body -->
<button v-fullscreen>Fullscreen page</button>

<!-- CSS selector -->
<button v-fullscreen="'#report'">Fullscreen report</button>

<!-- Target and options -->
<button v-fullscreen="{ target: '#report', pageOnly: true, teleport: true }">
  Page-only fullscreen
</button>
```

`target` also accepts HTML elements, Vue refs, component instances (using `$el`) and getters. The current target is resolved on entry. Strings passed directly are CSS selectors; use `'#report'` for an id.

An unresolved target dispatches `fullscreen-error`. Omitting `target` or passing `null` directly uses `document.body`.

### Modifiers

`.pageOnly` and `.teleport` set the corresponding options. Explicit object values take precedence over modifiers. For example, `.pageOnly="{ pageOnly: false }"` requests native mode.

The binding object also accepts `fullscreenClass` and `callback(isFullscreen)`. The directive uses the shared API, so `fullscreen.exit()` can exit a session started by a directive.

## Options {#options}

```ts
interface DirectiveOptions extends ApiOptions {
  target?: FullscreenTarget
}
```

| Option            | Type                              | Default         | Purpose                                      |
| ----------------- | --------------------------------- | --------------- | -------------------------------------------- |
| `target`          | `FullscreenTarget`                | `document.body` | Target; direct strings are CSS selectors     |
| `pageOnly`        | `boolean`                         | `false`         | Use page-only mode                           |
| `teleport`        | `boolean`                         | `false`         | Move to the body; disabled for a body target |
| `fullscreenClass` | `string`                          | `'fullscreen'`  | Class to add while active                    |
| `callback`        | `(isFullscreen: boolean) => void` | None            | Report changes in state                      |

## Callbacks {#callbacks}

Use `callback` to keep application state synchronized when fullscreen changes.

```js
const options = {
  callback(isFullscreen) {
    console.log(isFullscreen)
  },
}
```

## Error events {#events}

Failures dispatch a bubbling native `fullscreen-error` event. The error is in `event.detail`.

```js
button.addEventListener('fullscreen-error', (event) => {
  console.error(event.detail)
})
```

A button outside the fullscreen target may not be visible in native mode. Put an exit button inside the target, or use Esc.
