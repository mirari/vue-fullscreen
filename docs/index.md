---
layout: home
hero:
  name: vue-fullscreen
  text: Vue 全屏组件
  tagline: 通过组件、指令或 API 控制原生全屏和网页全屏。
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/getting-started
    - theme: alt
      text: 交互示例
      link: /examples
features:
  - title: 组件
    details: 使用 v-model 控制全屏状态。用户退出全屏时，绑定值会同步更新。
    link: /guide/component
  - title: 指令
    details: 为按钮添加点击切换全屏的行为，可指定目标元素和全屏选项。
    link: /guide/directive
  - title: API
    details: 使用 request、toggle 和 exit 控制 DOM 元素，操作结果通过 Promise 返回。
    link: /guide/api
---

<div class="vp-doc" style="max-width: 960px; margin: 32px auto; padding: 0 24px;">

<ClientOnly><FullscreenDemo simple /></ClientOnly>

</div>
