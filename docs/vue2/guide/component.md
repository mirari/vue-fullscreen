# Vue 2 组件

使用 `v-model` 控制全屏状态。它对应 `value` 属性和 `input` 事件；按 Esc 退出时，绑定值会同步更新。

::: tip 本页参考
完整的属性、事件和方法列表见[**组件参考**](#参考)。
:::

<ClientOnly><Vue2Demo kind="component" /></ClientOnly>

## 局部注册

```vue
<template>
  <div>
    <button @click="active = true">进入全屏</button>
    <Fullscreen v-model="active" page-only teleport @error="handleError">
      <h2>内容区域</h2>
      <button @click="active = false">退出全屏</button>
    </Fullscreen>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { Fullscreen } from 'vue-fullscreen'

export default {
  components: { Fullscreen },
  data: () => ({ active: false, error: '' }),
  methods: {
    handleError(error) {
      this.active = false
      this.error = error.message
    },
  },
}
</script>
```

## 用 ref 调用方法

通过 `this.$refs.panel` 可以调用组件实例：

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

模板中的组件需要设置 `ref="panel"`。实例提供 `request()`、`exit()`、`toggle(force?)`，以及兼容方法 `enter()`、`getState()` 和属性 `support`。

## 参考

### 属性

| 属性                 | 类型      | 默认值         | 说明                                  |
| -------------------- | --------- | -------------- | ------------------------------------- |
| `value`              | `boolean` | `false`        | `v-model` 绑定值                      |
| `pageOnly`           | `boolean` | `false`        | 仅填满网页；不支持原生 API 时自动启用 |
| `teleport`           | `boolean` | `false`        | 全屏期间将元素移动到 body             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | 激活期间的 class                      |
| `exitOnClickWrapper` | `boolean` | `true`         | 点击容器背景退出；点击子元素不会触发  |
| `fullscreen`         | `boolean` | `false`        | 已废弃的模型属性，保留兼容            |

不要同时用多个模型属性控制相互矛盾的状态。

### 事件

| 事件                | 参数      | 时机                             |
| ------------------- | --------- | -------------------------------- |
| `change`            | `boolean` | 全屏状态改变                     |
| `input`             | `boolean` | 同步 `v-model`                   |
| `update:fullscreen` | `boolean` | 同步旧模型属性                   |
| `error`             | 错误对象  | 模型变化或容器点击触发的操作失败 |

### 实例

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
