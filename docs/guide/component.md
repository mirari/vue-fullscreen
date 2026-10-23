# 组件

把内容放进组件，用 `v-model` 控制。用户按 Esc 退出时，绑定的状态会自动变回 `false`。

::: warning 旧版本升级提醒
5.x 改用按需导入，不再提供全局插件注册。旧项目请参阅[迁移示例](#migration)。
:::

## 演练场 {#playground}

[演练场](/playground?example=component)

<UsageDemo kind="component" />

图片预览使用 [v-viewer](https://github.com/mirari/v-viewer)，需额外安装：`npm install v-viewer`。

```fullscreen-example
component vue3 zh
```

## 属性 {#props}

| 属性                 | 类型      | 默认值         | 说明                                  |
| -------------------- | --------- | -------------- | ------------------------------------- |
| `modelValue`         | `boolean` | `false`        | `v-model` 绑定值                      |
| `pageOnly`           | `boolean` | `false`        | 仅填满网页；不支持原生 API 时自动启用 |
| `teleport`           | `boolean` | `false`        | 全屏期间将元素移动到 body             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | 激活期间的 class                      |
| `exitOnClickWrapper` | `boolean` | `true`         | 点击容器背景退出；点击子元素不会触发  |
| `fullscreen`         | `boolean` | `false`        | 已废弃的模型属性，保留兼容            |

## 事件 {#events}

| 事件                | 参数      | 时机                             |
| ------------------- | --------- | -------------------------------- |
| `change`            | `boolean` | 全屏状态改变                     |
| `update:modelValue` | `boolean` | 同步 `v-model`                   |
| `update:fullscreen` | `boolean` | 同步旧模型属性                   |
| `error`             | 错误对象  | 模型变化或容器点击触发的操作失败 |

## 方法与状态 {#methods}

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

| 成员           | 类型 / 签名                        | 作用             |
| -------------- | ---------------------------------- | ---------------- |
| `request`      | `(): Promise<void>`                | 请求全屏         |
| `exit`         | `(): Promise<void>`                | 退出全屏         |
| `toggle`       | `(force?: boolean): Promise<void>` | 切换或指定状态   |
| `isFullscreen` | `boolean`                          | 当前全屏状态     |
| `isEnabled`    | `boolean`                          | 原生全屏是否可用 |

直接调用方法时捕获返回 Promise 的拒绝。组件卸载时清理监听器和被移动的 DOM。

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
