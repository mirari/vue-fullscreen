# Vue 2 快速上手

这里介绍 Vue 2 对应的安装和用法。

## 1. 安装

```sh
npm install vue-fullscreen@legacy
```

`legacy` 渠道提供 Vue 2 软件包。接口版本说明见[兼容性](/vue2/guide/compatibility)。

## 2. 注册插件

```js
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

Vue.use(VueFullscreen)
new Vue({ render: (h) => h(App) }).$mount('#app')
```

插件会一起注册 `<fullscreen>`、`v-fullscreen` 和实例属性 `$fullscreen`。

## 3. 基本使用方式

注册插件后，可以选择以下任意一种方式。

### 组件

通过 `v-model` 控制内容区域的全屏状态。详细用法见[组件](/vue2/guide/component)。

```vue
<template>
  <fullscreen v-model="active">
    <button @click="active = !active">切换全屏</button>
  </fullscreen>
</template>

<script>
export default {
  data: () => ({ active: false }),
}
</script>
```

### 指令

点击按钮切换整个页面的全屏状态。详细用法见[指令](/vue2/guide/directive)。

```vue
<template>
  <button v-fullscreen>切换页面全屏</button>
</template>
```

### API

插件将 `fullscreen` 单例注册为实例属性 `$fullscreen`，可以直接调用。详细用法见 [API](/vue2/guide/api)。

```vue
<template>
  <button @click="$fullscreen.toggle()">切换页面全屏</button>
</template>
```

## 全屏选项

|              | 原生全屏                       | 网页全屏                |
| ------------ | ------------------------------ | ----------------------- |
| 配置         | `pageOnly: false`（默认）      | `pageOnly: true`        |
| 显示范围     | 浏览器提供的全屏区域           | 当前网页视口            |
| 浏览器工具栏 | 由浏览器隐藏                   | 保留                    |
| 用户手势     | 需要点击、按键等用户操作       | 不需要                  |
| 退出         | 浏览器 Esc、退出按钮、`exit()` | Esc、退出按钮、`exit()` |

浏览器支持、自动降级和 iframe 权限见[兼容性](/vue2/guide/compatibility)。

### 试试「teleport」的作用

保持「仅网页全屏」关闭，进入组件全屏后点击「详情」，切换挂载在 body 下的居中弹窗。关闭 `teleport` 时，弹窗在原生全屏元素之外，无法显示；开启后，body 成为全屏元素，弹窗也能显示。两种设置下内容区域都会全屏。

<ClientOnly><Vue2Demo /></ClientOnly>
