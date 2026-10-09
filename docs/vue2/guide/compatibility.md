# Vue 2 兼容性

## 软件包版本

Vue 2 使用 `vue-fullscreen@legacy`。本文接口参考版本为 `2.7.0-beta.0`，尚未发布；`legacy` 目前提供 `2.6.3`，部分错误事件和包入口存在差异。

## 支持范围

支持 Vue `2.6.14` 和 `2.7.x`。浏览器构建面向 ES2018，不支持 IE。导入包支持 SSR，全屏操作只能在浏览器中调用。

## 模型事件

```vue
<fullscreen v-model="active">内容</fullscreen>

<!-- 等价的显式绑定 -->
<fullscreen :value="active" @input="active = $event" />
```

`fullscreen` / `update:fullscreen` 作为兼容模型保留。不要同时传入相互矛盾的模型值。

## 原生全屏

原生全屏需要点击或按键等用户手势，且可能受 iframe 权限限制。不支持原生 API 时自动使用网页全屏。已支持但拒绝请求时会报告错误。

组件方法与事件见 [API 参考](/vue2/reference/api)。
