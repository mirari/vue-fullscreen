# Vue 2 API

导入 API 可以控制已有元素。每个操作都返回 Promise。

```vue
<template>
  <div>
    <button @click="enter">进入全屏</button>
    <section ref="target">
      <h2>内容区域</h2>
      <button v-if="active" @click="exit">退出全屏</button>
    </section>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { api } from 'vue-fullscreen'
export default {
  data: () => ({ active: false, error: '' }),
  methods: {
    async enter() {
      try {
        await api.request(this.$refs.target, {
          pageOnly: true,
          teleport: true,
          callback: (active) => {
            this.active = active
          },
        })
      } catch (error) {
        this.error = error.message
      }
    },
    async exit() {
      try {
        await api.exit()
      } catch (error) {
        this.error = error.message
      }
    },
  },
  beforeDestroy() {
    if (api.element === this.$refs.target) void api.exit().catch(() => {})
  },
}
</script>
```

示例使用网页全屏。原生模式下，应在路由离开守卫中等待 `api.exit()`，再移除目标。

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

完整签名见 [API 参考](/vue2/reference/api#api-单例)。
