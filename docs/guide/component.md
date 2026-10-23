# 组件

把内容放进组件，用 `v-model` 控制。退出全屏时，绑定的状态会自动变回 `false`。

## 演练场 {#playground}

[演练场](/playground?example=component)

<UsageDemo kind="component" />

```fullscreen-example
component vue3 zh
```

## 组件属性（Props） {#props}

| 属性                                          | 类型      | 默认值         | 说明                                  |
| --------------------------------------------- | --------- | -------------- | ------------------------------------- |
| `modelValue`                                  | `boolean` | `false`        | `v-model` 绑定值                      |
| [`pageOnly`](/guide/getting-started#pageonly) | `boolean` | `false`        | 仅填满网页；不支持原生 API 时自动启用 |
| [`teleport`](/guide/getting-started#teleport) | `boolean` | `false`        | 全屏期间将元素移动到 body             |
| `fullscreenClass`                             | `string`  | `'fullscreen'` | 激活期间的 class                      |
| `exitOnClickWrapper`                          | `boolean` | `true`         | 点击容器背景退出；点击子元素不会触发  |
| `fullscreen`                                  | `boolean` | `false`        | 已废弃的模型属性，保留兼容            |

## 实例属性 {#instance-properties}

通过组件 ref 读取。

| 属性           | 类型      | 作用             |
| -------------- | --------- | ---------------- |
| `isFullscreen` | `boolean` | 当前全屏状态     |
| `isEnabled`    | `boolean` | 原生全屏是否可用 |

## 事件 {#events}

| 事件                | 参数      | 时机                             |
| ------------------- | --------- | -------------------------------- |
| `change`            | `boolean` | 全屏状态改变                     |
| `update:modelValue` | `boolean` | 同步 `v-model`                   |
| `update:fullscreen` | `boolean` | 同步旧模型属性                   |
| `error`             | 错误对象  | 模型变化或容器点击触发的操作失败 |

## 方法 {#methods}

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const panel = ref()
const error = ref('')
async function enter() {
  try {
    await panel.value.request()
  } catch (reason) {
    error.value = reason.message
  }
}
</script>

<template>
  <button @click="enter">进入全屏</button>
  <Fullscreen ref="panel" page-only>内容</Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

| 方法      | 签名                               | 作用           |
| --------- | ---------------------------------- | -------------- |
| `request` | `(): Promise<void>`                | 请求全屏       |
| `exit`    | `(): Promise<void>`                | 退出全屏       |
| `toggle`  | `(force?: boolean): Promise<void>` | 切换或指定状态 |

## 旧版本迁移 {#migration}

```js
// 旧写法
import VueFullscreen from 'vue-fullscreen'
app.use(VueFullscreen)

// 新写法
import { Fullscreen } from 'vue-fullscreen'
```

```vue
<!-- 旧写法 -->
<fullscreen :fullscreen="active" @update:fullscreen="active = $event" />

<!-- 新写法 -->
<Fullscreen v-model="active" />
```
