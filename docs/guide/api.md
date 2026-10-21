# API

`useFullscreen()` 提供 VueUse 风格的组合式 API，可直接获取响应式状态，无需维护回调。

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

目标可以是 DOM 元素、模板 ref 或返回元素的 getter；省略时控制 `document.body`。每次进入时读取当前目标，已在全屏中不会切换目标。

## 状态与选项

- `isFullscreen`：只读响应式状态，随 Esc 或浏览器退出操作同步更新。
- `isSupported`：原生 Fullscreen API 可用性；为 `false` 时仍可使用网页全屏。
- `enter()`、`exit()`、`toggle()`：返回 Promise，原生请求失败时会拒绝。
- `pageOnly`、`teleport`：默认均为 `false`，也可以传入 ref 或 getter，在进入时读取。
- `fullscreenClass`：全屏期间的样式类，默认 `'fullscreen'`。

每次调用持有独立控制器。组件卸载时自动退出，恢复被移动的元素并移除监听器。原生全屏请求应直接由点击或按键触发，不要先等待网络请求。

## 命令式调用

组件外的业务代码或指令共享会话仍可使用 `fullscreen` 单例：

```ts
import { fullscreen } from 'vue-fullscreen'

await fullscreen.request(element, { pageOnly: true, teleport: true })
await fullscreen.exit()
```

单例的状态是普通属性；在 Vue 3 组件中优先使用 `useFullscreen()`。完整签名见 [API 参考](/reference/api#usefullscreen)。
