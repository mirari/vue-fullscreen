# Vue 2 component

Wrap content in the component, then change the `v-model` value to enter or exit fullscreen. It binds the `value` prop and `input` event. Exiting fullscreen automatically sets the bound value to `false`.

## Playground {#playground}

[Playground](/en/vue2/playground?example=component)

<Vue2Demo kind="component" />

```fullscreen-example
component vue2 en
```

## Component props {#props}

| Prop                             | Type      | Default        | Purpose                                                               |
| -------------------------------- | --------- | -------------- | --------------------------------------------------------------------- |
| `value`                          | `boolean` | `false`        | `v-model` value                                                       |
| [`pageOnly`](/en/vue2/#pageonly) | `boolean` | `false`        | Fill the page; automatic fallback if native fullscreen is unavailable |
| [`teleport`](/en/vue2/#teleport) | `boolean` | `false`        | Move the element to the body while active                             |
| `fullscreenClass`                | `string`  | `'fullscreen'` | Class applied while active                                            |
| `exitOnClickWrapper`             | `boolean` | `true`         | Exit on wrapper background clicks, not child clicks                   |
| `fullscreen`                     | `boolean` | `false`        | Deprecated model prop                                                 |

## Instance properties {#instance-properties}

Read these through the component ref.

| Property       | Type      | Purpose                  |
| -------------- | --------- | ------------------------ |
| `isFullscreen` | `boolean` | Current fullscreen state |
| `isEnabled`    | `boolean` | Native API support       |
| `support`      | `boolean` | Alias for `isEnabled`    |

## Events {#events}

| Event               | Argument     | Purpose                                                      |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `change`            | `boolean`    | Fullscreen state changed                                     |
| `input`             | `boolean`    | Synchronize `v-model`                                        |
| `update:fullscreen` | `boolean`    | Synchronize the deprecated model                             |
| `error`             | Error object | A model change or wrapper click triggered a failed operation |

## Methods {#methods}

Set `ref="panel"` on the component to call its methods:

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

| Method     | Signature                          | Purpose                 |
| ---------- | ---------------------------------- | ----------------------- |
| `request`  | `(): Promise<void>`                | Enter fullscreen        |
| `exit`     | `(): Promise<void>`                | Exit fullscreen         |
| `toggle`   | `(force?: boolean): Promise<void>` | Toggle or force a state |
| `enter`    | `(): Promise<void>`                | Alias for `request`     |
| `getState` | `(): boolean`                      | Read fullscreen state   |

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
