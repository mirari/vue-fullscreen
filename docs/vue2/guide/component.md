# Vue 2 组件

使用 `v-model` 控制全屏状态。它对应 `value` 属性和 `input` 事件；按 Esc 退出时，绑定值会同步更新。

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

## 事件与方法

`change(active)` 报告状态变化，`error(error)` 报告由模型变化或容器点击触发的失败。失败后可把模型重置为 `false`，以便重试。

通过 `this.$refs.panel` 可以调用组件实例：

```js
async enterPanel() {
  try { await this.$refs.panel.request() }
  catch (error) { this.error = error.message }
}
```

模板中的组件需要设置 `ref="panel"`。实例提供 `request()`、`exit()`、`toggle(force?)`，以及兼容方法 `enter()`、`getState()` 和属性 `support`。所有选项见 [API 参考](/vue2/reference/api#组件)。

`fullscreen` / `update:fullscreen` 作为兼容模型保留；新代码可以使用 `v-model`。组件销毁时会清理事件和被移动的 DOM。

## 切换页面内容时保持全屏

把全屏容器放在会被替换的内容之外。切换标签页如此，使用 Vue Router 时也一样：让 `<router-view>` 位于稳定的全屏容器内部。

```vue
<fullscreen v-model="active" teleport :exit-on-click-wrapper="false">
  <nav>
    <router-link to="/chart">图表</router-link>
    <router-link to="/table">表格</router-link>
  </nav>
  <router-view />
  <button @click="active = false">退出全屏</button>
</fullscreen>
```

这段模板放在持久存在的应用布局中，前提是已注册全屏插件并配置路由。SPA 路由只替换内部视图，全屏容器需要保持挂载。如果每个路由页面各自创建全屏组件，切换时销毁组件就会退出全屏。跳转到另一个文档或刷新页面不能保留全屏。
