# Vue 2 快速上手

这里介绍 Vue 2 对应的安装和用法。

## 安装

```sh
npm install vue-fullscreen@legacy
```

`legacy` 渠道提供 Vue 2 软件包。接口版本说明见[兼容性](/vue2/guide/compatibility)。

## 注册插件

```js
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

Vue.use(VueFullscreen)
new Vue({ render: (h) => h(App) }).$mount('#app')
```

插件注册 `<fullscreen>`、`v-fullscreen` 和 `$fullscreen`。也可以局部导入[组件](/vue2/guide/component)、[指令](/vue2/guide/directive)或 [API](/vue2/guide/api)。

## 使用组件

```vue
<template>
  <div>
    <button @click="active = true">进入全屏</button>
    <fullscreen v-model="active" page-only teleport @error="handleError">
      <h2>内容区域</h2>
      <button @click="active = false">退出全屏</button>
    </fullscreen>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
export default {
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

`page-only` 填满当前网页，移除后请求原生全屏。`teleport` 在全屏期间把目标移到 body。详细区别见[全屏方式](/vue2/guide/modes)。

[打开 Vue 2 交互示例](/vue2/examples)。
