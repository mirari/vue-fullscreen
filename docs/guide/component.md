# 组件

把内容放进组件，用 `v-model` 控制。用户按 Esc 退出时，绑定的状态会自动变回 `false`。

::: tip 本页参考
完整的属性、事件和方法列表见[**组件参考**](#参考)。
:::

<ClientOnly><FullscreenDemo /></ClientOnly>

## 局部使用

在使用的组件中导入 `Fullscreen`。下方 `<script setup>` 写法要求 Vue 3.2+；Vue 3.0/3.1 可在 `components` 中注册 `Fullscreen`，并在普通 `setup()` 中返回状态。

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const active = ref(false)
const error = ref('')
function handleError(errorValue) {
  active.value = false
  error.value = errorValue.message
}
</script>

<template>
  <button @click="active = true">进入全屏</button>
  <Fullscreen
    v-model="active"
    page-only
    teleport
    :exit-on-click-wrapper="false"
    @error="handleError"
  >
    <h2>内容区域</h2>
    <button @click="active = false">退出全屏</button>
  </Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

## 用 ref 调用方法

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

## 参考

### 属性

| 属性                 | 类型      | 默认值         | 说明                                  |
| -------------------- | --------- | -------------- | ------------------------------------- |
| `modelValue`         | `boolean` | `false`        | `v-model` 绑定值                      |
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
| `update:modelValue` | `boolean` | 同步 `v-model`                   |
| `update:fullscreen` | `boolean` | 同步旧模型属性                   |
| `error`             | 错误对象  | 模型变化或容器点击触发的操作失败 |

### 实例

| 成员           | 类型 / 签名                        | 作用             |
| -------------- | ---------------------------------- | ---------------- |
| `request`      | `(): Promise<void>`                | 请求全屏         |
| `exit`         | `(): Promise<void>`                | 退出全屏         |
| `toggle`       | `(force?: boolean): Promise<void>` | 切换或指定状态   |
| `isFullscreen` | `boolean`                          | 当前全屏状态     |
| `isEnabled`    | `boolean`                          | 原生全屏是否可用 |

直接调用方法时捕获返回 Promise 的拒绝。组件卸载时清理监听器和被移动的 DOM。
