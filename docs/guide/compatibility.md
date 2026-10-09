# Vue 2 / Vue 3 与迁移

一个仓库维护两条版本线，发布到同一个 npm 包名 `vue-fullscreen`。共享核心不单独发布。

## 当前渠道

| Vue 版本 | 稳定渠道 | 已发布版本 | 本分支待发布版本 |
| -------- | -------- | ---------- | ---------------- |
| Vue 2    | `legacy` | `2.6.3`    | `2.7.0-beta.0`   |
| Vue 3    | `next`   | `3.1.3`    | `3.2.0-beta.0`   |

以上是本次重构核对的发布状态。`latest` 仍为 Vue 2 的 `2.6.1`，本分支不会自动改变它。新的预发布渠道计划使用 `vue2-beta` / `vue3-beta`；待维护者正式发布后才可安装。

## 支持范围

| 项目         | 范围                                      |
| ------------ | ----------------------------------------- |
| Vue 2        | `2.6.14` 和 `2.7.x`                       |
| Vue 3        | `3.0+`                                    |
| 浏览器构建   | ES2018；不再面向 IE                       |
| SSR          | 支持导入；全屏操作仅在浏览器调用          |
| 仓库开发环境 | Node 24.15+ 推荐；CI 也检查 Node 22.22.2+ |

自动验证覆盖 Vue 2.6.14、2.7.16、3.0.0、3.5.43 的包安装和组件运行。真实浏览器覆盖 Chromium，其他浏览器仍需按业务目标验证。Vue 3.0 自身的旧类型声明在现代 TypeScript 下需要 `skipLibCheck`。

## 模型差异

::: code-group

```vue [通用模板]
<fullscreen v-model="active">内容</fullscreen>
```

```vue [Vue 3 展开形式]
<fullscreen :model-value="active" @update:model-value="active = $event" />
```

```vue [Vue 2 展开形式]
<fullscreen :value="active" @input="active = $event" />
```

:::

旧的 `fullscreen` / `update:fullscreen` 仍保留，但不建议新代码继续使用。

## 迁移检查

1. **保留包根导入。** `component`、`directive`、`api` 和默认插件名称不变。
2. **更新直接引用的文件地址。** 旧的 `dist/index.es.js` / `dist/index.umd.js` 改为包根的 `index.js` / `index.cjs` / `index.umd.js`。普通 `import` 无需改路径。
3. **检查浏览器目标。** screenfull 从 5 升级到 6，构建面向 ES2018，不再承诺 IE 支持。
4. **确认 teleport 默认值。** 实际默认值一直是 `false`；旧 README 写成 `true`，现已修正。
5. **处理失败。** 组件发出 `error`，指令派发 `fullscreen-error`，API 返回拒绝的 Promise。缺失选择器不再静默全屏 body。
6. **检查初始模型。** 新实现会处理挂载时已为 `true` 的模型；原生全屏仍可能因没有用户手势而失败。

合并代码、切换仓库默认分支和把 Vue 3 提升为 npm `latest` 是三件独立的事。发布流程详见[开发与发布](/contributing)。
