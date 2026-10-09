# 快速上手

先选择与你项目对应的 Vue 版本，再注册组件。安装的是同一个 npm 包 `vue-fullscreen`。

::: warning 开发版文档
本文档对应尚未发布的重构版本。下列命令安装现有渠道版本；错误事件、清理修复和新产物路径将在重构版本发布后可用。不要提前安装尚不存在的 beta 标签。
:::

## 1. 安装

::: code-group

```sh [Vue 3]
npm install vue-fullscreen@next
```

```sh [Vue 2]
npm install vue-fullscreen@legacy
```

:::

显式指定渠道可以避免安装到错误的 Vue 维护线。`latest` 暂时仍指向旧的 Vue 2 版本，详见[版本与兼容](/guide/compatibility)。

## 2. 注册插件

::: code-group

```ts [Vue 3 · main.ts]
import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

createApp(App).use(VueFullscreen).mount('#app')
```

```js [Vue 2 · main.js]
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

Vue.use(VueFullscreen)
new Vue({ render: (h) => h(App) }).$mount('#app')
```

:::

插件会一起注册 `<fullscreen>`、`v-fullscreen` 和实例属性 `$fullscreen`。只需要其中一种时，可以按页面局部导入，参见[组件](/guide/component)、[指令](/guide/directive)和 [API](/guide/api)。

## 3. 连接页面状态

下面的 Options API 示例可以同时用于 Vue 2 和 Vue 3。先用 `page-only` 体验网页全屏，再按需移除这个属性以启用原生全屏。

```vue
<template>
  <div>
    <button @click="active = true">查看全屏内容</button>
    <fullscreen v-model="active" page-only teleport @error="handleError">
      <h2>你的内容</h2>
      <button @click="active = false">退出全屏</button>
    </fullscreen>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return { active: false, error: '' }
  },
  methods: {
    handleError(error) {
      this.error = error.message
    },
  },
}
</script>
```

<ClientOnly><FullscreenDemo /></ClientOnly>

## 接下来怎么选？

| 你想做什么                               | 推荐入口                 |
| ---------------------------------------- | ------------------------ |
| 让一个区域随着 `v-model` 进入和退出全屏  | [组件](/guide/component) |
| 给已有按钮增加全屏操作，不改页面状态管理 | [指令](/guide/directive) |
| 在业务函数里等待全屏完成、指定任意目标   | [API](/guide/api)        |
| 比较原生全屏、网页全屏与 teleport        | [交互实验室](/examples)  |
