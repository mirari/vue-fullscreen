# 快速上手

在使用的位置按需导入组件、指令或 API。

::: warning 旧版本升级提醒
5.x 改用按需导入，不再提供全局插件注册。旧项目请参阅[迁移示例](/guide/component#migration)。
:::

## 1. 安装

```sh
npm install vue-fullscreen
```

接口版本和安装渠道见[兼容性说明](/guide/compatibility)。

## 2. 基本使用方式

按照使用场景从三种使用方式中选择适合的接入。

### 组件

通过 `v-model` 控制内容区域的全屏状态。详细用法见[组件](/guide/component)。

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const isFullscreen = ref(false)
</script>

<template>
  <Fullscreen v-model="isFullscreen">
    <button v-if="isFullscreen" @click="isFullscreen = false">退出全屏</button>
    <button v-else @click="isFullscreen = true">进入全屏</button>
  </Fullscreen>
</template>
```

### 指令

按钮作为触发器；此例省略目标，默认切换 `document.body` 的全屏状态。详细用法见[指令](/guide/directive)。

```vue
<script setup>
import { vFullscreen } from 'vue-fullscreen'
</script>

<template>
  <button v-fullscreen>切换页面全屏</button>
</template>
```

### API

通过 `useFullscreen()` 获取响应式状态和操作方法，适合从多个按钮、快捷键或业务逻辑中控制同一全屏目标。详细用法见 [API](/guide/api)。

```vue
<script setup>
import { useFullscreen } from 'vue-fullscreen'

const { toggle } = useFullscreen()
</script>

<template>
  <button @click="toggle">切换页面全屏</button>
</template>
```

## 其他导入方式

### CommonJS

```js
const { Fullscreen, vFullscreen, useFullscreen } = require('vue-fullscreen')
```

### 浏览器全局

通过 UNPKG 加载 Vue 3 的最新版本和本包的 `latest` 渠道，先加载 Vue：

```html
<div id="app">
  <fullscreen v-model="isFullscreen">
    <button @click="isFullscreen = !isFullscreen">
      {{ isFullscreen ? '退出全屏' : '进入全屏' }}
    </button>
  </fullscreen>
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-fullscreen"></script>
<script>
  Vue.createApp({
    components: { fullscreen: VueFullscreen.Fullscreen },
    data: () => ({ isFullscreen: false }),
  }).mount('#app')
</script>
```

TypeScript 类型声明由 `exports` 根据 ESM 或 CommonJS 自动选择。

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

<ClientOnly><FullscreenDemo compare-page-only /></ClientOnly>

浏览器支持、自动降级和 iframe 权限见[兼容性](/guide/compatibility)。

### teleport

`teleport` 决定是否将全屏目标临时移到 `document.body`，默认值为 `false`，退出全屏时恢复原位置。

原生全屏只显示全屏元素及其后代。未开启 `teleport` 时，挂载在 `body` 下、位于目标元素之外的对话框、下拉菜单等浮层，即使已经打开，也无法显示。

开启 `teleport` 后，目标元素会被移到 `body` 下并铺满视口，再由 `body` 进入原生全屏，使目标内容和这些浮层都能正常显示。

网页全屏下，移动目标还可以避免祖先元素的裁剪、定位或层叠上下文影响。

| 配置              | 原生全屏元素 | 点击图片后的结果             |
| ----------------- | ------------ | ---------------------------- |
| `teleport: false` | 图片区域     | 弹窗在全屏元素之外，无法显示 |
| `teleport: true`  | `body`       | 弹窗属于全屏元素，正常显示   |

先关闭 `teleport` 进入全屏并点击图片，再退出、开启 `teleport` 后重复操作。**两种设置下图片区域都会全屏，区别是 body 弹窗是否可见**。

<ClientOnly><FullscreenDemo compare-teleport /></ClientOnly>
