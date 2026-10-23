# Vue 2 API

适合从多个按钮、快捷键或业务逻辑中控制同一全屏目标。插件将 `fullscreen` 单例注册为实例属性 `$fullscreen`，可以直接调用。

## 演练场 {#playground}

[演练场](/vue2/playground?example=api)

<Vue2Demo kind="api" />

```fullscreen-example
api vue2 zh
```

原生模式下，应在路由离开守卫中等待 `fullscreen.exit()`，再移除目标。

## 目标 {#target}

通过 `fullscreen.enter()` 的第一个参数指定全屏目标，支持以下类型：

| 目标类型     | 示例                                                        |
| ------------ | ----------------------------------------------------------- |
| HTML 元素    | `fullscreen.enter(document.getElementById('panel'))`        |
| Vue ref 对象 | `fullscreen.enter(panelRef)`                                |
| 组件实例     | `fullscreen.enter(this.$refs.panel)`，使用其 `$el`          |
| id 字符串    | `fullscreen.enter('panel')` 或 `fullscreen.enter('#panel')` |
| CSS 选择器   | `fullscreen.enter('.panel')`                                |
| getter       | `fullscreen.enter(() => this.$refs.panel)`                  |

字符串先按 id 查找（允许带 `#`），未找到时再按 CSS 选择器解析；两者都能匹配时，id 优先。每次进入全屏时解析当前目标。

省略目标或直接传入 `null` 时使用 `document.body`；选择器未匹配、ref 尚未挂载等无法解析目标的情况会拒绝 Promise。

## 切换与强制状态

```ts
await fullscreen.toggle(element, { pageOnly: true }) // 根据当前状态切换
await fullscreen.toggle(element, { pageOnly: true }, true) // 强制进入
await fullscreen.toggle(element, undefined, false) // 强制退出
await fullscreen.exit() // 已退出时不执行操作
```

`enter()` 默认控制 `document.body`。已处于全屏时再次 `enter()` 不会切换目标；先退出，再请求新目标。

::: tip 保留用户手势
原生全屏请求要直接由点击、按键等操作触发。不要先等待网络请求再调用 `enter()`，否则浏览器可能拒绝。
:::

## 方法 {#methods}

```ts
fullscreen.enter(target?: FullscreenTarget, options?: ApiOptions): Promise<void>
fullscreen.toggle(target?: FullscreenTarget, options?: ApiOptions, force?: boolean): Promise<void>
fullscreen.exit(): Promise<void>
```

## 实例属性 {#state}

| 属性           | 类型              | 说明                         |
| -------------- | ----------------- | ---------------------------- |
| `isFullscreen` | `boolean`         | 当前控制器状态               |
| `isSupported`  | `boolean`         | 原生全屏支持情况             |
| `element`      | `Element \| null` | 目标元素，退出后为 null      |
| `options`      | 会话配置          | 当前配置；不要在会话期间修改 |

这些是普通属性，不是 Vue 的响应式引用。想让页面随 Esc 等操作更新，请使用 `callback` 同步 Vue 状态，或使用组件的 `v-model`。

## 配置项 {#options}

| 选项                          | 类型                              | 默认值         | 说明                                |
| ----------------------------- | --------------------------------- | -------------- | ----------------------------------- |
| [`pageOnly`](/vue2/#pageonly) | `boolean`                         | `false`        | 网页全屏                            |
| [`teleport`](/vue2/#teleport) | `boolean`                         | `false`        | 移动到 body；目标是 body 时自动关闭 |
| `fullscreenClass`             | `string`                          | `'fullscreen'` | 激活时添加，退出时恢复              |
| `callback`                    | `(isFullscreen: boolean) => void` | 无             | 状态变化回调                        |

## 回调 {#callbacks}

```js
fullscreen.enter(target, {
  callback(value) {
    // 同步页面状态
    isFullscreen = value
  },
})
```

## 旧版本迁移 {#migration}

使用 `enter()` 替代 `request()`，使用 `isSupported` 替代 `isEnabled`。旧名称作为兼容入口保留。
