# 常见问题

## 点击后没有进入原生全屏？

先检查错误事件或 Promise 拒绝。浏览器需要直接的用户手势；在网络请求、计时器或自动挂载之后请求，可能被拒绝。嵌入 iframe 时还需要宿主允许 fullscreen 权限。

`isEnabled` 只表示 API 可用，不保证每次请求都被批准。可先启用 `pageOnly`，排除原生权限问题。

## 手机上的表现为什么不同？

不同浏览器、设备及嵌入方式的原生全屏支持不同。不支持时库会降级到网页全屏；网页全屏仍保留浏览器工具栏。请在目标设备上验证，而不是根据桌面浏览器推断。

## 弹窗或下拉菜单看不到？

浏览器只显示原生全屏元素及其后代，提高 `z-index` 无法显示其外部的弹窗。开启 `teleport` 并配置 UI 库将弹窗挂载到 `body`，或关闭 `teleport`、将弹窗直接挂载在全屏目标内部。可在[快速上手](/guide/getting-started)对比效果。

## teleport 后样式变了？

元素从原父节点移动到了 body。依赖祖先的 CSS 选择器和继承值可能失效；把关键样式放到目标自身的 class 上。退出时会恢复原 DOM 位置和被库修改的行内布局样式。

通过 `fullscreenClass` 设置背景、滚动和层级；库不会强制设置这些样式：

```css
.my-fullscreen {
  background: white;
  overflow: auto;
  z-index: 1000;
}
```

## SSR 或 Nuxt 可以用吗？

可以在服务端导入包。只在浏览器挂载后读取 DOM，并在用户操作中请求原生全屏。不要在服务端调用 `fullscreen.request()`。

## API 状态为什么没有更新页面？

在 Vue 3 中使用 `useFullscreen()` 返回的 `isFullscreen`，它是响应式引用。`fullscreen` 单例的同名属性是普通布尔值，需要用 `callback` 同步状态。

## 切换路由后如何清理？

组件和 `useFullscreen()` 会在卸载时清理。使用 `fullscreen` 单例或指令时，在路由移除全屏目标之前等待 `fullscreen.exit()`。指令卸载只负责移除点击处理器，不代表它拥有整个共享 API 会话。
