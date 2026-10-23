---
aside: false
pageClass: playground-page
---

# 演练场

修改代码后点击「运行」，在预览中测试 `pageOnly`、`teleport` 和弹窗效果。原生全屏**只能由**点击、触摸或按键等用户操作触发。

<ClientOnly><FullscreenPlayground /></ClientOnly>

图片预览使用 [v-viewer](https://github.com/mirari/v-viewer)，需额外安装：`npm install v-viewer`。

预览中的 `pageOnly` 只填满预览区域。支持单个 `App.vue` 的 JavaScript 与 CSS；内置 `vue` 和`vue-fullscreen`。
