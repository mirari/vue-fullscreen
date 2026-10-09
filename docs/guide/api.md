# API：在业务逻辑里控制全屏

API 不依赖组件模板，适合控制已有 DOM。所有操作都返回 Promise。

<ClientOnly><FullscreenDemo kind="api" /></ClientOnly>

## 指定目标并等待结果

```vue
<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { api } from 'vue-fullscreen'

const target = ref()
const active = ref(false)
const error = ref('')

async function enter() {
  try {
    await api.request(target.value, {
      pageOnly: true,
      teleport: true,
      callback: (value) => {
        active.value = value
      },
    })
  } catch (reason) {
    error.value = reason.message
  }
}
async function exit() {
  try {
    await api.exit()
  } catch (reason) {
    error.value = reason.message
  }
}

onBeforeUnmount(() => {
  if (api.element === target.value) void api.exit().catch(() => {})
})
</script>

<template>
  <button @click="enter">进入全屏</button>
  <section ref="target">
    <h2>业务面板</h2>
    <button v-if="active" @click="exit">退出全屏</button>
  </section>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

示例使用网页模式，退出时立即恢复 DOM。原生模式下，如果页面路由将移除目标，应在路由离开守卫中 `await api.exit()`，再继续导航。普通组件场景推荐直接使用[组件封装](/guide/component)，由库管理生命周期。

## 切换与强制状态

```ts
await api.toggle(element, { pageOnly: true }) // 根据当前状态切换
await api.toggle(element, { pageOnly: true }, true) // 强制进入
await api.toggle(element, undefined, false) // 强制退出
await api.exit() // 已退出时不执行操作
```

`request()` 默认控制 `document.body`。已处于全屏时再次 `request()` 不会切换目标；先退出，再请求新目标。

## 读取状态

```ts
api.isFullscreen // 当前控制器是否处于全屏
api.element // 当前目标；退出后为 null
api.isEnabled // 浏览器是否支持原生全屏，不代表请求一定获准
api.options // 当前会话配置
```

这些是普通属性，不是 Vue 的响应式引用。想让页面随 Esc 等操作更新，请使用 `callback` 同步 Vue 状态，或使用组件的 `v-model`。

::: tip 保留用户手势
原生全屏请求要直接由点击、按键等操作触发。不要先等待网络请求再调用 `request()`，否则浏览器可能拒绝。
:::

完整签名见 [API 参考](/reference/api#api-单例)。
