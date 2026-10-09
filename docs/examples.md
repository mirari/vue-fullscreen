# 交互示例

用同一块内容比较三种入口。默认启用网页全屏，你可以取消勾选「仅网页全屏」以尝试浏览器原生模式。

## 组件

`v-model` 驱动状态，适合页面内的独立全屏区域。

<ClientOnly><FullscreenDemo /></ClientOnly>

[查看组件代码与说明 →](/guide/component)

## 指令

点击按钮触发；目标通过选择器指定，状态通过回调更新。

<ClientOnly><FullscreenDemo kind="directive" /></ClientOnly>

[查看指令代码与说明 →](/guide/directive)

## API

直接指定 DOM，等待请求完成，手动处理错误。

<ClientOnly><FullscreenDemo kind="api" /></ClientOnly>

[查看 API 代码与说明 →](/guide/api)
