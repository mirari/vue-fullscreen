# 常见问题

## 点击后没有进入原生全屏？

先检查错误事件或 Promise 拒绝。浏览器需要直接的用户手势；在网络请求、计时器或自动挂载之后请求，可能被拒绝。嵌入 iframe 时还需要宿主允许 fullscreen 权限。

`isEnabled` 只表示 API 可用，不保证每次请求都被批准。可先启用 `pageOnly`，排除原生权限问题。

## 手机上的表现为什么不同？

不同浏览器、设备及嵌入方式的原生全屏支持不同。不支持时库会降级到网页全屏；网页全屏仍保留浏览器工具栏。请在目标设备上验证，而不是根据桌面浏览器推断。

## 弹窗或下拉菜单看不到？

尝试开启 `teleport`，让原生全屏的目标变成 body。弹窗本身的挂载位置和层级仍由 UI 库决定。网页全屏时可为 `fullscreenClass` 指定合适的背景、`z-index` 和滚动样式。

## teleport 后样式变了？

元素从原父节点移动到了 body。依赖祖先的 CSS 选择器和继承值可能失效；把关键样式放到目标自身的 class 上。退出时会恢复原 DOM 位置和被库修改的行内布局样式。

## SSR 或 Nuxt 可以用吗？

可以在服务端导入包。只在浏览器挂载后读取 DOM，并在用户操作中请求原生全屏。不要在服务端调用 `api.request()`。VitePress 文档里的交互示例通过 `ClientOnly` 渲染。

## API 状态为什么没有更新页面？

`api.isFullscreen` 不是响应式引用。使用 `callback` 写入 Vue 状态，或改用组件的 `v-model`。

## 切换路由后如何清理？

组件会在卸载时清理。直接使用 API 或指令时，在路由移除全屏目标之前等待 `api.exit()`。指令卸载只负责移除点击处理器，不代表它拥有整个共享 API 会话。

## 怎么在本地检查文档？

```sh
npm ci
npm run docs:dev
```

默认路径是 `/`，对应 `vue-fullscreen.mirari.cc`。如果另行部署到 GitHub Pages 项目子路径，使用 `DOCS_BASE=/vue-fullscreen/ npm run docs:build`，并同步调整预览路径。
