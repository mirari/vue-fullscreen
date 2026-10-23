# Vue 2 directive

The directive provides a click trigger without requiring a model value.

::: tip Trigger and fullscreen target
**The element with `v-fullscreen` is the click trigger; `target` selects the fullscreen element.** If no target is specified, the directive controls `document.body`.
:::

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

<!-- The button triggers fullscreen for #report, rather than for itself. -->
<button v-fullscreen="'#report'">Fullscreen report</button>
<section id="report">
  Report content
  <button v-fullscreen="'#report'">Exit fullscreen</button>
</section>

<!-- Target and options -->
<button v-fullscreen="{ target: '#report', pageOnly: true, teleport: true }">
  Page-only fullscreen
</button>
```

### Modifiers

[`.pageOnly`](/en/vue2/#pageonly) and [`.teleport`](/en/vue2/#teleport) set the corresponding options. Explicit object values take precedence over modifiers. For example, `.pageOnly="{ pageOnly: false }"` requests native mode.

The binding object also accepts `fullscreenClass` and `callback(isFullscreen)`. The directive uses the shared API, so `fullscreen.exit()` can exit a session started by a directive.

## Targets {#target}

Set `target` in the binding object to select the fullscreen element:

| Target type        | Example                                          |
| ------------------ | ------------------------------------------------ |
| HTML element       | `{ target: document.getElementById('panel') }`   |
| Vue ref object     | `{ target: panelRef }`                           |
| Component instance | `{ target: this.$refs.panel }`; uses its `$el`   |
| CSS selector       | `{ target: '#panel' }` or `{ target: '.panel' }` |
| Getter             | `{ target: () => this.$refs.panel }`             |

The current target is resolved on each entry. Omitting `target` or passing `null` directly uses `document.body`. Missing selectors, unmounted refs and other unresolved targets dispatch `fullscreen-error`.

String targets are CSS selectors, including the shorthand `v-fullscreen="'#panel'"`. An id needs the `#` prefix.

## Options {#options}

```ts
interface DirectiveOptions extends ApiOptions {
  target?: FullscreenTarget
}
```

| Option                           | Type                              | Default         | Purpose                                      |
| -------------------------------- | --------------------------------- | --------------- | -------------------------------------------- |
| `target`                         | `FullscreenTarget`                | `document.body` | Accepted types: see [Targets](#target)       |
| [`pageOnly`](/en/vue2/#pageonly) | `boolean`                         | `false`         | Use page-only mode                           |
| [`teleport`](/en/vue2/#teleport) | `boolean`                         | `false`         | Move to the body; disabled for a body target |
| `fullscreenClass`                | `string`                          | `'fullscreen'`  | Class to add while active                    |
| `callback`                       | `(isFullscreen: boolean) => void` | None            | Report changes in state                      |

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
