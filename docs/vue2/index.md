# Vue 2 快速上手

基于 [screenfull](https://github.com/sindresorhus/screenfull)。

::: warning 旧版本升级提醒
4.x 是重构后的新主版本，保留全局插件注册。组件状态使用 `v-model`，见[迁移示例](/vue2/guide/component#migration)。
:::

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

### 自定义名称

```ts
Vue.use(VueFullscreen, { name: 'fs' })
```

| 选项   | 类型     | 默认值         | 作用                               |
| ------ | -------- | -------------- | ---------------------------------- |
| `name` | `string` | `'fullscreen'` | 同时决定组件名、指令名和实例属性名 |

`name: 'fs'` 注册 `<fs>`、`v-fs` 和 `$fs`。默认的 `$fullscreen` 已提供类型增强；自定义名称需在项目中补充类型。

## 3. 基本使用方式

注册插件后，按照使用场景从三种使用方式中选择适合的接入。

### 组件

通过 `v-model` 控制内容区域的全屏状态。详细用法见[组件](/vue2/guide/component)。

```vue
<template>
  <fullscreen v-model="isFullscreen">
    <button v-if="isFullscreen" @click="isFullscreen = false">退出全屏</button>
    <button v-else @click="isFullscreen = true">进入全屏</button>
  </fullscreen>
</template>

<script>
export default {
  data: () => ({ isFullscreen: false }),
}
</script>
```

### 指令

按钮作为触发器；此例省略目标，默认切换 `document.body` 的全屏状态。详细用法见[指令](/vue2/guide/directive)。

```vue
<template>
  <button v-fullscreen>切换页面全屏</button>
</template>
```

### API

适合从多个按钮、快捷键或业务逻辑中控制同一全屏目标。插件将 `fullscreen` 单例注册为实例属性 `$fullscreen`，可以直接调用。详细用法见 [API](/vue2/guide/api)。

```vue
<template>
  <button @click="$fullscreen.toggle()">切换页面全屏</button>
</template>
```

## 其他导入方式

### CommonJS

```js
const Vue = require('vue')
const VueFullscreen = require('vue-fullscreen').default

Vue.use(VueFullscreen)
```

### 浏览器全局

先加载 Vue，再加载 vue-fullscreen：

```html
<div id="app">
  <fullscreen v-model="isFullscreen">
    <button @click="isFullscreen = !isFullscreen">
      {{ isFullscreen ? '退出全屏' : '进入全屏' }}
    </button>
  </fullscreen>
</div>

<script src="https://unpkg.com/vue@legacy"></script>
<script src="https://unpkg.com/vue-fullscreen@legacy"></script>
<script>
  Vue.use(VueFullscreen.default)
  new Vue({
    data: () => ({ isFullscreen: false }),
  }).$mount('#app')
</script>
```

## 全屏选项

### pageOnly

`pageOnly` 决定使用原生全屏还是网页全屏，默认值为 `false`。

- `false`：请求浏览器原生全屏，隐藏地址栏、标签栏等浏览器界面，适合看图、视频等沉浸式内容。
- `true`：在当前网页内铺满视口，保留浏览器界面，适合编辑器、仪表盘等需要随时切换标签页的场景。

|              | 原生全屏                       | 网页全屏                |
| ------------ | ------------------------------ | ----------------------- |
| 配置         | `pageOnly: false`（默认）      | `pageOnly: true`        |
| 显示范围     | 浏览器提供的全屏区域           | 当前网页视口            |
| 浏览器工具栏 | 由浏览器隐藏                   | 保留                    |
| 用户手势     | 需要点击、按键等用户操作       | 不需要                  |
| 退出         | 浏览器 Esc、退出按钮、`exit()` | Esc、退出按钮、`exit()` |

<ClientOnly><Vue2Demo comparison="pageOnly" /></ClientOnly>

浏览器支持、自动降级和 iframe 权限见[兼容性](/vue2/guide/compatibility)。

### teleport

`teleport` 决定是否将全屏目标临时移到 `document.body`，默认值为 `false`，退出全屏时恢复原位置。

原生全屏只显示全屏元素及其后代。未开启 `teleport` 时，挂载在 `body` 下、位于目标元素之外的对话框、下拉菜单等浮层，即使已经打开，也无法显示。

开启 `teleport` 后，目标元素会被移到 `body` 下并铺满视口，再由 `body` 进入原生全屏，使目标内容和这些浮层都能正常显示。

网页全屏下，移动目标还可以避免祖先元素的裁剪、定位或层叠上下文影响。

| 配置              | 原生全屏元素 | 点击图片后的结果             |
| ----------------- | ------------ | ---------------------------- |
| `teleport: false` | 内容区域     | 弹窗在全屏元素之外，无法显示 |
| `teleport: true`  | `body`       | 弹窗属于全屏元素，正常显示   |

先关闭 `teleport` 进入全屏并点击图片，再退出、开启 `teleport` 后重复操作。**两种设置下内容区域都会全屏，区别是 body 弹窗是否可见**。

<ClientOnly><Vue2Demo comparison="teleport" /></ClientOnly>
