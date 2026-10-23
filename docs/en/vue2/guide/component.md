# Vue 2 component

Use `v-model` to control fullscreen. It binds the `value` prop and `input` event. Exiting with Esc updates the bound value.

::: warning Upgrading existing projects
4.x is a new major release and retains the Vue plugin. Use `v-model` for component state; see the [migration example](#migration).
:::

## Playground {#playground}

[Playground](/en/vue2/playground?example=component)

<Vue2Demo kind="component" />

The image preview uses [v-viewer](https://github.com/mirari/v-viewer); install it separately with `npm install v-viewer@legacy`.

```fullscreen-example
component vue2 en
```

## Props {#props}

| Prop                 | Type      | Default        | Purpose                                                               |
| -------------------- | --------- | -------------- | --------------------------------------------------------------------- |
| `value`              | `boolean` | `false`        | `v-model` value                                                       |
| `pageOnly`           | `boolean` | `false`        | Fill the page; automatic fallback if native fullscreen is unavailable |
| `teleport`           | `boolean` | `false`        | Move the element to the body while active                             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | Class applied while active                                            |
| `exitOnClickWrapper` | `boolean` | `true`         | Exit on wrapper background clicks, not child clicks                   |
| `fullscreen`         | `boolean` | `false`        | Deprecated model prop                                                 |

## Events {#events}

| Event               | Argument     | Purpose                                                      |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `change`            | `boolean`    | Fullscreen state changed                                     |
| `input`             | `boolean`    | Synchronize `v-model`                                        |
| `update:fullscreen` | `boolean`    | Synchronize the deprecated model                             |
| `error`             | Error object | A model change or wrapper click triggered a failed operation |

## Methods and state {#methods}

Set `ref="panel"` on the component to call its methods:

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

The instance provides `request()`, `exit()` and `toggle(force?)`, as well as the compatibility members `enter()`, `getState()` and `support`.

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

## Migrating older versions {#migration}

```vue
<!-- Before -->
<fullscreen :fullscreen="active" @update:fullscreen="active = $event" />

<!-- Now -->
<fullscreen v-model="active" />
```

```js
// Before
this.$refs.panel.enter()
this.$refs.panel.getState()
this.$refs.panel.support

// Now
this.$refs.panel.request()
this.$refs.panel.isFullscreen
this.$refs.panel.isEnabled
```
