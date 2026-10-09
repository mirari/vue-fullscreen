# 快速上手

安装 Vue 3 对应的软件包，再注册组件。Vue 2 请使用独立的 [Vue 2 文档](/vue2/)。

## 1. 安装

```sh
npm install vue-fullscreen@next
```

Vue 3 使用 `next` 渠道。接口版本和安装渠道见[兼容性说明](/guide/compatibility)。

## 2. 注册插件

```ts
import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

createApp(App).use(VueFullscreen).mount('#app')
```

插件会一起注册 `<fullscreen>`、`v-fullscreen` 和实例属性 `$fullscreen`。只需要其中一种时，可以按页面局部导入，参见[组件](/guide/component)、[指令](/guide/directive)和 [API](/guide/api)。

## 3. 连接页面状态

下面的示例使用 Options API。`page-only` 表示网页全屏，移除这个属性后使用原生全屏。

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
      this.active = false
      this.error = error.message
    },
  },
}
</script>
```

<ClientOnly><FullscreenDemo /></ClientOnly>

## 选择使用方式

| 你想做什么                               | 推荐入口                 |
| ---------------------------------------- | ------------------------ |
| 让一个区域随着 `v-model` 进入和退出全屏  | [组件](/guide/component) |
| 给已有按钮增加全屏操作，不改页面状态管理 | [指令](/guide/directive) |
| 在业务函数里等待全屏完成、指定任意目标   | [API](/guide/api)        |
| 比较原生全屏、网页全屏与 teleport        | [交互示例](/examples)    |
