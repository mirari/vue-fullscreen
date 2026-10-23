# Vue 2 组件

把内容放进组件，控制 `v-model` 来进入和退出全屏。它对应 `value` 属性和 `input` 事件；退出全屏时，绑定的状态会自动变回 `false`。

## 演练场 {#playground}

[编辑此示例](/vue2/playground?example=component)

<UsageDemo kind="component" vue2 />

```fullscreen-example
component vue2 zh
```

## 组件属性（Props） {#props}

| 属性                          | 类型      | 默认值         | 说明                                  |
| ----------------------------- | --------- | -------------- | ------------------------------------- |
| `value`                       | `boolean` | `false`        | `v-model` 绑定值                      |
| [`pageOnly`](/vue2/#pageonly) | `boolean` | `false`        | 仅填满网页；不支持原生 API 时自动启用 |
| [`teleport`](/vue2/#teleport) | `boolean` | `false`        | 全屏期间将元素移动到 body             |
| `fullscreenClass`             | `string`  | `'fullscreen'` | 激活期间的 class                      |
| `exitOnClickWrapper`          | `boolean` | `true`         | 点击容器背景退出；点击子元素不会触发  |

## 实例属性 {#instance-properties}

通过组件 ref 读取。

| 属性           | 类型      | 作用             |
| -------------- | --------- | ---------------- |
| `isFullscreen` | `boolean` | 当前全屏状态     |
| `isSupported`  | `boolean` | 原生全屏是否可用 |

## 事件 {#events}

| 事件     | 参数      | 时机                             |
| -------- | --------- | -------------------------------- |
| `change` | `boolean` | 全屏状态改变                     |
| `input`  | `boolean` | 同步 `v-model`                   |
| `error`  | 错误对象  | 模型变化或容器点击触发的操作失败 |

## 方法 {#methods}

通过 `this.$refs.panel` 可以调用组件实例：

```js
async enterPanel() {
  try { await this.$refs.panel.enter() }
  catch (error) { this.error = error.message }
}
```

模板中的组件需要设置 `ref="panel"`。

| 方法     | 签名                               | 作用           |
| -------- | ---------------------------------- | -------------- |
| `enter`  | `(): Promise<void>`                | 请求全屏       |
| `exit`   | `(): Promise<void>`                | 退出全屏       |
| `toggle` | `(force?: boolean): Promise<void>` | 切换或指定状态 |

## 旧版本迁移 {#migration}

使用 `enter()` 替代 `request()`，使用 `isSupported` 替代 `isEnabled`。旧名称作为兼容入口保留。

旧版的 `fullscreen` 属性和 `update:fullscreen` 事件仅作为兼容接口保留，新代码使用 `v-model`。

```vue
<!-- 旧写法 -->
<fullscreen
  :fullscreen="isFullscreen"
  @update:fullscreen="isFullscreen = $event"
/>

<!-- 新写法 -->
<fullscreen v-model="isFullscreen" />
```

```js
// 旧写法
this.$refs.panel.request()
this.$refs.panel.getState()
this.$refs.panel.support

// 新写法
this.$refs.panel.enter()
this.$refs.panel.isFullscreen
this.$refs.panel.isSupported
```
