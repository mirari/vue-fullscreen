# 兼容性

## 安装渠道与接口版本

Vue 3 使用 `next` 渠道：

```sh
npm install vue-fullscreen@next
```

本文档的接口参考版本为 `4.0.0`，尚未发布。`next` 渠道目前提供 `3.1.3`，部分错误事件和包入口存在差异。可在 [npm](https://www.npmjs.com/package/vue-fullscreen) 查看已发布版本。

## 支持范围

| 项目   | 范围                             |
| ------ | -------------------------------- |
| Vue    | `3.0+`                           |
| 浏览器 | ES2018；不支持 IE                |
| SSR    | 支持导入；全屏操作仅在浏览器调用 |

文档中使用 `<script setup>` 的示例要求 Vue 3.2+。Vue 3.0/3.1 可以使用[快速上手](/guide/getting-started)中的 Options API 写法。Vue 3.0 自身的类型声明在现代 TypeScript 下可能需要 `skipLibCheck`。

## 模型事件

```vue
<fullscreen v-model="active">内容</fullscreen>

<!-- 等价的显式绑定 -->
<fullscreen :model-value="active" @update:model-value="active = $event" />
```

`fullscreen` / `update:fullscreen` 作为兼容接口保留。不要同时用多个模型属性控制同一个组件。

## 浏览器行为

原生全屏需要用户手势，并受到浏览器和 iframe 权限限制。不支持原生全屏时会使用网页全屏；网页全屏不隐藏浏览器工具栏。

导入包不需要浏览器环境，但在 SSR 中不能调用 `request()`。应在组件挂载后获取 DOM，再通过点击等操作请求全屏。

Vue 2 的用法请查阅独立的 [Vue 2 文档](/vue2/)。
