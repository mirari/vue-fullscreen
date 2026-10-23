# Vue 2 组件

使用 `v-model` 控制全屏状态。它对应 `value` 属性和 `input` 事件；按 Esc 退出时，绑定值会同步更新。

::: warning 旧版本升级提醒
4.x 是重构后的新主版本，保留全局插件注册。组件状态使用 `v-model`，见[迁移示例](#migration)。
:::

## 演练场 {#playground}

[演练场](/vue2/playground?example=component)

<Vue2Demo kind="component" />

图片预览使用 [v-viewer](https://github.com/mirari/v-viewer)，需额外安装：`npm install v-viewer@legacy`。

```fullscreen-example
component vue2 zh
```

## 属性 {#props}

| 属性                 | 类型      | 默认值         | 说明                                  |
| -------------------- | --------- | -------------- | ------------------------------------- |
| `value`              | `boolean` | `false`        | `v-model` 绑定值                      |
| `pageOnly`           | `boolean` | `false`        | 仅填满网页；不支持原生 API 时自动启用 |
| `teleport`           | `boolean` | `false`        | 全屏期间将元素移动到 body             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | 激活期间的 class                      |
| `exitOnClickWrapper` | `boolean` | `true`         | 点击容器背景退出；点击子元素不会触发  |
| `fullscreen`         | `boolean` | `false`        | 已废弃的模型属性，保留兼容            |

## 事件 {#events}

| 事件                | 参数      | 时机                             |
| ------------------- | --------- | -------------------------------- |
| `change`            | `boolean` | 全屏状态改变                     |
| `input`             | `boolean` | 同步 `v-model`                   |
| `update:fullscreen` | `boolean` | 同步旧模型属性                   |
| `error`             | 错误对象  | 模型变化或容器点击触发的操作失败 |

## 方法与状态 {#methods}

通过 `this.$refs.panel` 可以调用组件实例：

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

模板中的组件需要设置 `ref="panel"`。实例提供 `request()`、`exit()`、`toggle(force?)`，以及兼容方法 `enter()`、`getState()` 和属性 `support`。

| 成员           | 类型 / 签名                        | 作用                   |
| -------------- | ---------------------------------- | ---------------------- |
| `request`      | `(): Promise<void>`                | 请求全屏               |
| `exit`         | `(): Promise<void>`                | 退出全屏               |
| `toggle`       | `(force?: boolean): Promise<void>` | 切换或指定状态         |
| `isFullscreen` | `boolean`                          | 当前全屏状态           |
| `isEnabled`    | `boolean`                          | 原生全屏是否可用       |
| `enter`        | `(): Promise<void>`                | `request` 的兼容入口   |
| `getState`     | `(): boolean`                      | 读取全屏状态           |
| `support`      | `boolean`                          | `isEnabled` 的兼容属性 |

直接调用方法时捕获返回 Promise 的拒绝。组件卸载时清理监听器和被移动的 DOM。

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
