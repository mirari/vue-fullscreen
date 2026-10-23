# Vue 2 组件

使用 `v-model` 控制全屏状态。它对应 `value` 属性和 `input` 事件；按 Esc 退出时，绑定值会同步更新。

## 演练场 {#playground}

[演练场](/vue2/playground?example=component)

<Vue2Demo kind="component" />

```fullscreen-example
component vue2 zh
```

## 组件属性（Props） {#props}

| 属性                 | 类型      | 默认值         | 说明                                  |
| -------------------- | --------- | -------------- | ------------------------------------- |
| `value`              | `boolean` | `false`        | `v-model` 绑定值                      |
| `pageOnly`           | `boolean` | `false`        | 仅填满网页；不支持原生 API 时自动启用 |
| `teleport`           | `boolean` | `false`        | 全屏期间将元素移动到 body             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | 激活期间的 class                      |
| `exitOnClickWrapper` | `boolean` | `true`         | 点击容器背景退出；点击子元素不会触发  |
| `fullscreen`         | `boolean` | `false`        | 已废弃的模型属性，保留兼容            |

## 实例属性 {#instance-properties}

通过组件 ref 读取。

| 属性           | 类型      | 作用                   |
| -------------- | --------- | ---------------------- |
| `isFullscreen` | `boolean` | 当前全屏状态           |
| `isEnabled`    | `boolean` | 原生全屏是否可用       |
| `support`      | `boolean` | `isEnabled` 的兼容属性 |

## 事件 {#events}

| 事件                | 参数      | 时机                             |
| ------------------- | --------- | -------------------------------- |
| `change`            | `boolean` | 全屏状态改变                     |
| `input`             | `boolean` | 同步 `v-model`                   |
| `update:fullscreen` | `boolean` | 同步旧模型属性                   |
| `error`             | 错误对象  | 模型变化或容器点击触发的操作失败 |

## 方法 {#methods}

通过 `this.$refs.panel` 可以调用组件实例：

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

模板中的组件需要设置 `ref="panel"`。

| 方法       | 签名                               | 作用                 |
| ---------- | ---------------------------------- | -------------------- |
| `request`  | `(): Promise<void>`                | 请求全屏             |
| `exit`     | `(): Promise<void>`                | 退出全屏             |
| `toggle`   | `(force?: boolean): Promise<void>` | 切换或指定状态       |
| `enter`    | `(): Promise<void>`                | `request` 的兼容入口 |
| `getState` | `(): boolean`                      | 读取全屏状态         |

## 旧版本迁移 {#migration}

```vue
<!-- 旧写法 -->
<fullscreen :fullscreen="active" @update:fullscreen="active = $event" />

<!-- 新写法 -->
<fullscreen v-model="active" />
```

```js
// 旧写法
this.$refs.panel.enter()
this.$refs.panel.getState()
this.$refs.panel.support

// 新写法
this.$refs.panel.request()
this.$refs.panel.isFullscreen
this.$refs.panel.isEnabled
```
