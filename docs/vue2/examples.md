# Vue 2 交互示例

这个示例使用 Vue 2 运行。选择网页或原生模式，再使用组件或 API 按钮。网页模式填满下方示例区域；原生模式请求浏览器全屏。

<ClientOnly><Vue2Demo /></ClientOnly>

代码示例见[组件](/vue2/guide/component)、[指令](/vue2/guide/directive)和 [API](/vue2/guide/api)。

## 全屏中的 body 弹窗

弹窗是直接挂载在 `body` 下的普通元素，许多下拉菜单和弹窗组件都使用这种方式。

1. 保持「仅网页全屏」勾选，关闭 `teleport`，进入全屏：父容器的 `transform` 会限制面板的固定定位范围。
2. 退出，打开 `teleport` 后再次进入：面板移出父容器，能够铺满视口。
3. 退出，取消「仅网页全屏」并关闭 `teleport`，进入原生全屏后点击「切换 body 弹窗」：弹窗虽已挂载，但位于全屏元素之外，浏览器不会显示它。单纯增大 `z-index` 无法解决。
4. 退出，打开 `teleport` 后重复操作：库请求 `body` 全屏，面板和弹窗都在全屏元素内部，弹窗可以显示。

示例给面板设置 `z-index: 1000`，弹窗设置 `1001`。这些是示例样式，不是库的默认值。不支持原生全屏的浏览器会降级为网页模式，因此无法复现第 3 步的原生全屏隔离。

使用上方示例中的组件按钮操作。网页模式填满的是 iframe 内部，不是整个文档页面。

`teleport` 移动的是全屏目标，不会自动移动你的弹窗。需要另外配置 UI 库，让弹窗挂载到 `body`。另一种方式是关闭 `teleport`，把弹窗直接挂载在全屏目标内部。

## 切换页面内容时保持全屏

把全屏容器放在会被替换的内容之外。切换标签页如此，使用 Vue Router 时也一样：让 `<router-view>` 位于稳定的全屏容器内部。

```vue
<fullscreen v-model="active" teleport :exit-on-click-wrapper="false">
  <nav>
    <router-link to="/chart">图表</router-link>
    <router-link to="/table">表格</router-link>
  </nav>
  <router-view />
  <button @click="active = false">退出全屏</button>
</fullscreen>
```

这段模板放在持久存在的应用布局中，前提是已注册全屏插件并配置路由。SPA 路由只替换内部视图，全屏容器需要保持挂载。如果每个路由页面各自创建全屏组件，切换时销毁组件就会退出全屏。跳转到另一个文档或刷新页面不能保留全屏。
