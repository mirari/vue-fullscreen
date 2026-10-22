# 兼容性

## 安装渠道与接口版本

支持 Vue `3.0+`，正式版使用默认的 `latest` 渠道：

```sh
npm install vue-fullscreen
```

本文档的接口参考版本为 `5.0.0`。Vue 2 用户请使用 `vue-fullscreen@legacy`，见 [Vue 2 兼容性说明](/vue2/guide/compatibility)。

## Fullscreen API 浏览器支持

原生全屏由浏览器提供。完整版本列表见 [Can I use：Fullscreen API](https://caniuse.com/fullscreen)，设备限制见 [MDN 的 requestFullscreen 兼容性表](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#browser_compatibility)。以下为常见环境概览。

| 浏览器 / 设备            | 原生全屏支持                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| 桌面 Chrome / Edge       | Chrome 71+、Edge 79+ 支持标准 API                                   |
| 桌面 Firefox             | 64+ 支持标准 API                                                    |
| macOS Safari             | 16.4+ 支持标准 API；更早版本有带前缀的部分支持                      |
| iPad Safari              | iPadOS 16.4+ 支持标准 API，但有设备限制；较早版本有带前缀的部分支持 |
| iPhone Safari            | 不支持任意元素的 Fullscreen API；使用网页全屏                       |
| Android Chrome / Firefox | 当前版本支持，具体版本见支持表                                      |
| Internet Explorer        | IE 11 仅部分支持原生 API；本组件包不支持 IE                         |

表中的版本号描述浏览器 API，不是本组件包的最低浏览器版本或实机测试承诺。本包构建面向 ES2018。底层 `screenfull` 处理部分浏览器前缀差异，但不能补齐浏览器缺失的全屏能力。

### Safari 与移动设备

iPad 原生全屏会显示浏览器提供的退出控件，下滑等系统手势也可能退出。iPhone 的视频播放器全屏是独立能力，不代表图表、普通 `div` 或整个页面可以原生全屏。Safari 16.4 的改动可参阅 [WebKit 发布说明](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)。

### Internet Explorer

当前版本基于 Vue 3，不支持 IE；`Promise` polyfill 不能补齐 Vue 3 所需的 Proxy 能力。需要 IE 11 时，请使用独立的 [Vue 2 版本及兼容性说明](/vue2/guide/compatibility)。

## 用户操作与 iframe 权限

原生全屏**只能由**点击、触摸或按键等用户操作触发。不要先等待网络请求再调用全屏 API，以免用户激活状态过期。

嵌入页面需要允许全屏，例如：

```html
<iframe src="/example/" allow="fullscreen" allowfullscreen></iframe>
```

父页面的 `Permissions-Policy` 仍可能限制全屏；仅添加 iframe 属性不能覆盖更严格的响应头策略。

## 能力检测与网页全屏降级

在浏览器中读取 `useFullscreen()` 返回的 `isSupported`，可判断当前文档是否允许使用原生全屏。它不表示是否已经进入全屏，也不保证下一次请求一定成功。

```js
import { useFullscreen } from 'vue-fullscreen'

// 在组件挂载后或用户点击时读取
const { isSupported } = useFullscreen()
const nativeAvailable = isSupported.value
```

- 原生全屏不可用时，组件、指令和 API 自动使用网页全屏。
- 显式设置 `pageOnly: true`（组件属性为 `page-only`）时，始终使用网页全屏。
- 原生能力可用但请求被拒绝时，会报告错误并恢复 DOM，不会静默降级。API 调用应捕获 Promise 拒绝，组件使用 `error` 事件，指令使用 `fullscreen-error` 事件。

网页全屏保留浏览器工具栏，只覆盖当前文档的视口。在 iframe 内，它只能覆盖 iframe 区域；`teleport` 也只会移动到该文档的 `body`，不能突破 iframe 边界。
