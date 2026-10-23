# Vue 2 API

导入 API 可以控制已有元素。每个操作都返回 Promise。

## 演练场 {#playground}

[演练场](/vue2/playground?example=api)

<Vue2Demo kind="api" />

```fullscreen-example
api vue2 zh
```

原生模式下，应在路由离开守卫中等待 `fullscreen.exit()`，再移除目标。

## 目标类型

目标支持 HTML 元素、Vue 模板 ref、组件实例（使用 `$el`）、id 字符串（`'panel'` 或 `'#panel'`）以及 getter。每次进入时解析当前目标；id 不存在或 ref 尚未挂载会拒绝 Promise。省略目标或直接传入 `null` 时控制 `document.body`。

```js
await fullscreen.request('panel') // id
await fullscreen.request('#panel') // 带 # 的 id
await fullscreen.request(this.$refs.target) // DOM 元素或 Vue 组件
```

## 切换与强制状态

```ts
await fullscreen.toggle(element, { pageOnly: true }) // 根据当前状态切换
await fullscreen.toggle(element, { pageOnly: true }, true) // 强制进入
await fullscreen.toggle(element, undefined, false) // 强制退出
await fullscreen.exit() // 已退出时不执行操作
```

`request()` 默认控制 `document.body`。已处于全屏时再次 `request()` 不会切换目标；先退出，再请求新目标。

::: tip 保留用户手势
原生全屏请求要直接由点击、按键等操作触发。不要先等待网络请求再调用 `request()`，否则浏览器可能拒绝。
:::

## 方法 {#methods}

```ts
fullscreen.request(target?: FullscreenTarget, options?: ApiOptions): Promise<void>
fullscreen.toggle(target?: FullscreenTarget, options?: ApiOptions, force?: boolean): Promise<void>
fullscreen.exit(): Promise<void>
```

## 实例属性 {#state}

| 属性           | 类型              | 说明                         |
| -------------- | ----------------- | ---------------------------- |
| `isFullscreen` | `boolean`         | 当前控制器状态               |
| `isEnabled`    | `boolean`         | 原生全屏支持情况             |
| `element`      | `Element \| null` | 目标元素，退出后为 null      |
| `options`      | 会话配置          | 当前配置；不要在会话期间修改 |

这些是普通属性，不是 Vue 的响应式引用。想让页面随 Esc 等操作更新，请使用 `callback` 同步 Vue 状态，或使用组件的 `v-model`。

## 配置项 {#options}

| 选项              | 类型                              | 默认值         | 说明                                |
| ----------------- | --------------------------------- | -------------- | ----------------------------------- |
| `pageOnly`        | `boolean`                         | `false`        | 网页全屏                            |
| `teleport`        | `boolean`                         | `false`        | 移动到 body；目标是 body 时自动关闭 |
| `fullscreenClass` | `string`                          | `'fullscreen'` | 激活时添加，退出时恢复              |
| `callback`        | `(isFullscreen: boolean) => void` | 无             | 状态变化回调                        |

还可以按需导入 `screenfull`，它是底层原生全屏工具；直接使用它不会执行本库的网页全屏、样式和 teleport 管理。

## 回调 {#callbacks}

```js
fullscreen.request(target, {
  callback(isFullscreen) {
    // 同步页面状态
    active = isFullscreen
  },
})
```
