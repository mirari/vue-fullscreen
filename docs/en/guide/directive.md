# Directive

The directive toggles fullscreen when its element is clicked. It does not require a model value.

## Playground {#playground}

[Playground](/en/playground?example=directive)

<UsageDemo kind="directive" />

The image preview uses [v-viewer](https://github.com/mirari/v-viewer); install it separately with `npm install v-viewer`.

```fullscreen-example
directive vue3 en
```

With a regular `setup()` function or the Options API, register the directive locally in the component’s `directives` option as `fullscreen: vFullscreen`.

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

The binding object also accepts `fullscreenClass` and `callback(isFullscreen)`. Bind the same directive inside the target to provide an exit button. Unmounting the directive that started the session cleans it up automatically.

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
