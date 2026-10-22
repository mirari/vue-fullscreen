# API

`useFullscreen()` 提供 VueUse 风格的组合式 API，可直接获取响应式状态，无需维护回调。

::: tip 本页参考
完整的参数、返回值和方法列表见[**API 参考**](#参考)。
:::

<ClientOnly><FullscreenDemo kind="api" /></ClientOnly>

## 指定目标

```vue
<script setup>
import { ref } from 'vue'
import { useFullscreen } from 'vue-fullscreen'

const target = ref()
const error = ref('')
const { isFullscreen, enter, exit, toggle } = useFullscreen(target, {
  pageOnly: true,
  teleport: true,
})
</script>

<template>
  <button @click="enter().catch((e) => (error = e.message))">进入全屏</button>
  <section ref="target">
    <h2>业务面板</h2>
    <button v-if="isFullscreen" @click="exit">退出全屏</button>
    <button @click="toggle">切换全屏</button>
  </section>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

目标支持 HTML 元素、Vue 模板 ref、组件实例（使用 `$el`）、id 字符串（`'panel'` 或 `'#panel'`）以及 getter。每次进入时解析当前目标；id 不存在或 ref 尚未挂载会拒绝 Promise，不会让 body 意外全屏。省略目标或直接传入 `null` 时控制 `document.body`。

```js
useFullscreen(document.getElementById('panel')) // HTML 元素
useFullscreen(target) // Vue 模板 ref
useFullscreen('panel') // id
useFullscreen('#panel') // 带 # 的 id
```

每次调用持有独立控制器。组件卸载时自动退出，恢复被移动的元素并移除监听器。原生全屏请求应直接由点击或按键触发，不要先等待网络请求。

## 组件外使用

`useFullscreen()` 也可以在组件外调用。每次调用独立管理会话；组件外没有卸载生命周期，结束时需要自行调用 `exit()`。

```ts
import { useFullscreen } from 'vue-fullscreen'

const { enter, exit } = useFullscreen('#panel', {
  pageOnly: true,
  teleport: true,
})
await enter()
await exit()
```

## 参考

### 签名

```ts
useFullscreen(target?: UseFullscreenTarget, options?: UseFullscreenOptions): UseFullscreenReturn
```

### 返回值

| 返回值                      | 类型                     | 说明                           |
| --------------------------- | ------------------------ | ------------------------------ |
| `isFullscreen`              | `Readonly<Ref<boolean>>` | 随实际退出同步的响应式状态     |
| `isSupported`               | `ComputedRef<boolean>`   | 原生全屏可用性；不影响网页全屏 |
| `enter` / `exit` / `toggle` | `(): Promise<void>`      | 进入、退出、切换               |

### UseFullscreenOptions

| 选项              | 类型                     | 默认值         |
| ----------------- | ------------------------ | -------------- |
| `pageOnly`        | `boolean`、ref 或 getter | `false`        |
| `teleport`        | `boolean`、ref 或 getter | `false`        |
| `fullscreenClass` | `string`、ref 或 getter  | `'fullscreen'` |

选项在每次进入时读取。原生能力不支持时自动使用网页全屏，请求失败时恢复 DOM 并拒绝 Promise。

还可以按需导入 `screenfull`，它是底层原生全屏工具；直接使用它不会执行本库的网页全屏、样式和 teleport 管理。
