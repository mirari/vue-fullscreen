# API

通过 `useFullscreen()` 获取响应式状态和操作方法，适合从多个按钮、快捷键或业务逻辑中控制同一全屏目标。

## 演练场 {#playground}

[演练场](/playground?example=api)

<UsageDemo kind="api" />

```fullscreen-example
api vue3 zh
```

## 目标 {#target}

通过 `useFullscreen()` 的第一个参数指定全屏目标，支持以下类型：

| 目标类型     | 示例                                                    |
| ------------ | ------------------------------------------------------- |
| HTML 元素    | `useFullscreen(document.getElementById('panel'))`       |
| Vue ref 对象 | `useFullscreen(panelRef)`                               |
| 组件实例     | `useFullscreen(panelComponent)`，使用其 `$el`           |
| id 字符串    | `useFullscreen('panel')` 或 `useFullscreen('#panel')`   |
| CSS 选择器   | `useFullscreen('.panel')`                               |
| getter       | `useFullscreen(() => document.getElementById('panel'))` |

字符串先按 id 查找（允许带 `#`），未找到时再按 CSS 选择器解析；两者都能匹配时，id 优先。每次进入全屏时解析当前目标。

省略目标或直接传入 `null` 时使用 `document.body`；选择器未匹配、ref 尚未挂载等无法解析目标的情况会拒绝 Promise。

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

## 旧版本迁移 {#migration}

```js
// 旧写法
import { api } from 'vue-fullscreen'
api.request(target, { callback: onChange })

// 新写法
import { useFullscreen } from 'vue-fullscreen'
const { isFullscreen, enter, exit } = useFullscreen(target)
```
