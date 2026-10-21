# 快速上手

在使用的位置按需导入组件、指令或 API。

## 1. 安装

```sh
npm install vue-fullscreen
```

接口版本和安装渠道见[兼容性说明](/guide/compatibility)。

## 2. 基本使用方式

以下三种方式任选其一。示例使用 `<script setup>`，要求 Vue 3.2+。

### 组件

通过 `v-model` 控制内容区域的全屏状态。详细用法见[组件](/guide/component)。

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const active = ref(false)
</script>

<template>
  <Fullscreen v-model="active">
    <button @click="active = !active">切换全屏</button>
  </Fullscreen>
</template>
```

### 指令

点击按钮切换整个页面的全屏状态。详细用法见[指令](/guide/directive)。

```vue
<script setup>
import { vFullscreen } from 'vue-fullscreen'
</script>

<template>
  <button v-fullscreen>切换页面全屏</button>
</template>
```

### API

通过 `useFullscreen()` 获取响应式状态和操作方法。详细用法见 [API](/guide/api)。

```vue
<script setup>
import { useFullscreen } from 'vue-fullscreen'

const { toggle } = useFullscreen()
</script>

<template>
  <button @click="toggle">切换页面全屏</button>
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

浏览器支持、自动降级和 iframe 权限见[兼容性](/guide/compatibility)。

### 试试「teleport」的作用

`teleport` 将全屏目标临时移到 `body`，退出时恢复原位置。「详情」按钮切换挂载在 `body` 下的居中弹窗，模拟 UI 组件库的对话框。

保持「仅网页全屏」关闭，按下面的步骤比较：

1. **不勾选「teleport」**：进入全屏，点击「详情」。图片会铺满屏幕，但弹窗在全屏元素之外，无法显示。
2. **退出并勾选「teleport」**：重新进入全屏，再点击「详情」。图片同样铺满屏幕，此时 `body` 是原生全屏元素，其下的弹窗也能显示。

两种设置都会让图片区域进入全屏，区别是 **body 弹窗是否可见**。网页全屏下，两种设置的弹窗均可见。

<ClientOnly><FullscreenDemo compare-teleport /></ClientOnly>
