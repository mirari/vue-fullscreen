---
layout: home
hero:
  name: vue-fullscreen
  text: 给内容，多一点空间。
  tagline: 为 Vue 2 和 Vue 3 添加全屏体验。用组件连接状态，用指令增强按钮，或用 API 精确控制。
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/getting-started
    - theme: alt
      text: 体验交互示例
      link: /examples
features:
  - title: 三种入口，同一套能力
    details: 组件适合 v-model，指令适合点击触发，API 适合业务流程。无需更换全屏实现。
    link: /guide/modes
  - title: 原生全屏，也能填满网页
    details: 按场景选择隐藏浏览器工具栏，或仅填满当前页面；不支持原生全屏时自动降级。
    link: /guide/modes#两种全屏模式
  - title: Vue 2 / Vue 3 一起维护
    details: 共用浏览器核心，分别适配生命周期和模型事件，继续支持现有使用方式。
    link: /guide/compatibility
---

<div class="vp-doc" style="max-width: 960px; margin: 32px auto; padding: 0 24px;">

## 先体验，再接入

<ClientOnly><FullscreenDemo /></ClientOnly>

::: info 当前文档版本
本站描述重构开发版：Vue 3 的 `3.2.0-beta.0` 和 Vue 2 的 `2.7.0-beta.0`，尚未发布。安装渠道与迁移范围见[版本说明](/guide/compatibility)。
:::

</div>
