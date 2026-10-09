# Vue 2 API 参考

## 导出

```ts
import VueFullscreen, {
  component,
  directive,
  api,
  screenfull,
  type ApiOptions,
  type InstallationOptions,
  type VueFullscreenApi,
  type DirectiveOptions,
} from 'vue-fullscreen'
```

默认导出是安装插件。`screenfull` 是底层原生全屏工具；直接使用它不会执行本库的网页全屏、样式和 teleport 管理。

## 插件

```ts
Vue.use(VueFullscreen, { name: 'fs' }) // Vue 2
```

| 选项   | 类型     | 默认值         | 作用                               |
| ------ | -------- | -------------- | ---------------------------------- |
| `name` | `string` | `'fullscreen'` | 同时决定组件名、指令名和实例属性名 |

`name: 'fs'` 注册 `<fs>`、`v-fs` 和 `$fs`。默认的 `$fullscreen` 已提供类型增强；自定义名称需在项目中补充类型。

## 组件

### Props

| 属性                 | 类型      | 默认值         | 说明                                  |
| -------------------- | --------- | -------------- | ------------------------------------- |
| `value`              | `boolean` | `false`        | `v-model` 绑定值                      |
| `pageOnly`           | `boolean` | `false`        | 仅填满网页；不支持原生 API 时自动启用 |
| `teleport`           | `boolean` | `false`        | 全屏期间将元素移动到 body             |
| `fullscreenClass`    | `string`  | `'fullscreen'` | 激活期间的 class                      |
| `exitOnClickWrapper` | `boolean` | `true`         | 点击容器背景退出；点击子元素不会触发  |
| `fullscreen`         | `boolean` | `false`        | 已废弃的模型属性，保留兼容            |

不要同时用多个模型属性控制相互矛盾的状态。

### 事件

| 事件                | 参数      | 时机                             |
| ------------------- | --------- | -------------------------------- |
| `change`            | `boolean` | 全屏状态改变                     |
| `input`             | `boolean` | 同步 `v-model`                   |
| `update:fullscreen` | `boolean` | 同步旧模型属性                   |
| `error`             | 错误对象  | 模型变化或容器点击触发的操作失败 |

### 实例

| 成员           | 类型 / 签名                        | 作用                   |
| -------------- | ---------------------------------- | ---------------------- |
| `request`      | `(): Promise<void>`                | 请求全屏               |
| `exit`         | `(): Promise<void>`                | 退出全屏               |
| `toggle`       | `(force?: boolean): Promise<void>` | 切换或指定状态         |
| `isFullscreen` | `boolean`                          | 当前全屏状态           |
| `isEnabled`    | `boolean`                          | 原生全屏是否可用       |
| `enter`        | `(): Promise<void>`                | `request` 的兼容入口   |
| `getState`     | `(): boolean`                      | 读取全屏状态           |
| `support`      | `boolean`                          | `isEnabled` 的兼容属性 |

直接调用方法时捕获返回 Promise 的拒绝。组件卸载时清理监听器和被移动的 DOM。

## API 单例

```ts
api.request(target?: Element | null, options?: ApiOptions): Promise<void>
api.toggle(target?: Element | null, options?: ApiOptions, force?: boolean): Promise<void>
api.exit(): Promise<void>
```

`target` 省略或为 `null` 时使用 body；运行时目标必须是 HTML 元素。SSR 中可以导入包，调用操作会因缺少浏览器环境而拒绝。

| 属性           | 类型              | 说明                         |
| -------------- | ----------------- | ---------------------------- |
| `isFullscreen` | `boolean`         | 当前控制器状态               |
| `isEnabled`    | `boolean`         | 原生全屏支持情况             |
| `element`      | `Element \| null` | 目标元素，退出后为 null      |
| `options`      | 会话配置          | 当前配置；不要在会话期间修改 |

### ApiOptions

| 选项              | 类型                        | 默认值         | 说明                                |
| ----------------- | --------------------------- | -------------- | ----------------------------------- |
| `pageOnly`        | `boolean`                   | `false`        | 网页全屏                            |
| `teleport`        | `boolean`                   | `false`        | 移动到 body；目标是 body 时自动关闭 |
| `fullscreenClass` | `string`                    | `'fullscreen'` | 激活时添加，退出时恢复              |
| `callback`        | `(active: boolean) => void` | 无             | 状态变化回调                        |

## 指令

绑定值为选择器字符串或 `DirectiveOptions` 对象，也可不传值。

```ts
interface DirectiveOptions extends ApiOptions {
  target?: string | Element | null
}
```

修饰符 `.pageOnly`、`.teleport` 设置默认选项，对象中的显式值优先。错误通过原生 `fullscreen-error` 事件的 `detail` 属性传出。卸载指令会移除点击监听；由共享 API 开启的会话应通过 `api.exit()` 退出。

## 构建格式

| 用途       | 入口                                             |
| ---------- | ------------------------------------------------ |
| ESM        | `import ... from 'vue-fullscreen'`               |
| CommonJS   | `require('vue-fullscreen')`；插件位于 `.default` |
| 浏览器全局 | `index.umd.js`；导出 `window.VueFullscreen`      |
| 类型声明   | 由 `exports` 按 ESM/CJS 选择对应声明             |

UMD 需要先加载匹配的 Vue 全局构建，再使用 `VueFullscreen.default` 安装插件。直接引用文件时，请核对所安装版本的包入口。
