# API

通过 `useFullscreen()` 获取响应式状态和操作方法，适合从多个按钮、快捷键或业务逻辑中控制同一全屏目标。

## 演练场 {#playground}

[演练场](/playground?example=api)

<UsageDemo kind="api" />

```fullscreen-example
api vue3 zh
```

## 目标 {#target}

目标支持 HTML 元素、Vue 模板 ref、组件实例（使用 `$el`）、id 字符串（`'panel'` 或 `'#panel'`）以及 getter。每次进入时解析当前目标；id 不存在或 ref 尚未挂载会拒绝 Promise。省略目标或直接传入 `null` 时控制 `document.body`。

```js
useFullscreen(document.getElementById('panel')) // HTML 元素
useFullscreen(target) // Vue 模板 ref
useFullscreen('panel') // id
useFullscreen('#panel') // 带 # 的 id
```

各次调用的全屏状态相互独立。需要从多个位置控制同一目标时，共享同一次 `useFullscreen()` 调用返回的状态和方法。组件卸载时自动退出，恢复被移动的元素并移除监听器。原生全屏请求应直接由点击或按键触发，不要先等待网络请求。

## 组件外使用

`useFullscreen()` 也可以在组件外调用。每次调用独立管理会话；组件外没有卸载生命周期，结束时需要自行调用 `exit()`。

```ts
import { useFullscreen } from 'vue-fullscreen'

const { enter, exit } = useFullscreen('#panel', {
  pageOnly: true,
  teleport: true,
})
await enter()
await exit()
```

## 参数 {#parameters}

```ts
useFullscreen(target?: UseFullscreenTarget, options?: UseFullscreenOptions): UseFullscreenReturn
```

## 返回值 {#returns}

### 属性 {#properties}

| 属性           | 类型                     | 说明                           |
| -------------- | ------------------------ | ------------------------------ |
| `isFullscreen` | `Readonly<Ref<boolean>>` | 随实际退出同步的响应式状态     |
| `isSupported`  | `ComputedRef<boolean>`   | 原生全屏可用性；不影响网页全屏 |

### 方法 {#methods}

| 方法     | 签名                | 说明     |
| -------- | ------------------- | -------- |
| `enter`  | `(): Promise<void>` | 进入全屏 |
| `exit`   | `(): Promise<void>` | 退出全屏 |
| `toggle` | `(): Promise<void>` | 切换全屏 |

## 配置项 {#options}

| 选项                                          | 类型                     | 默认值         |
| --------------------------------------------- | ------------------------ | -------------- |
| [`pageOnly`](/guide/getting-started#pageonly) | `boolean`、ref 或 getter | `false`        |
| [`teleport`](/guide/getting-started#teleport) | `boolean`、ref 或 getter | `false`        |
| `fullscreenClass`                             | `string`、ref 或 getter  | `'fullscreen'` |

选项在每次进入时读取。原生能力不支持时自动使用网页全屏，请求失败时恢复 DOM 并拒绝 Promise。

还可以按需导入 `screenfull`，它是底层原生全屏工具；直接使用它不会执行本库的网页全屏、样式和 teleport 管理。

## 旧版本迁移 {#migration}

```js
// 旧写法
import { api } from 'vue-fullscreen'
api.request(target, { callback: onChange })

// 新写法
import { useFullscreen } from 'vue-fullscreen'
const { isFullscreen, enter, exit } = useFullscreen(target)
```
