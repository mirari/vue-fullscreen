# 开发与发布

## 本地开发

推荐使用 Node 24.15+。安装依赖后，可分别启动文档和两个 Vue 版本的 playground。

```sh
npm ci
npm run docs:dev      # VitePress 文档与内嵌 Vue 3 示例
npm run dev           # 独立 Vue 3 playground
npm run dev:vue2      # 独立 Vue 2 playground
```

文档通过别名引用本仓库的 Vue 3 适配器，因此改动组件源码后可以直接在示例中检查。VitePress 使用稳定版 1.6，库构建继续使用 Vite 8；两者的构建依赖独立解析。

## 检查

```sh
npm run check        # 格式、类型、单元测试、发布包、playground 和文档构建
npm run test:browser # 两套适配器的浏览器测试
npm run test:docs    # 构建后的文档、导航和全屏示例测试
```

`test:docs` 先构建文档，再启动静态预览，验证 GitHub Pages 子路径下的资源和页面。需要预先安装 Chromium：`npx playwright install chromium`。环境已有浏览器时，可设置 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`。

## 仓库结构

```text
packages/core/       与 Vue 无关的全屏实现
packages/vue2/       Vue 2 适配器与 playground
packages/vue3/       Vue 3 适配器与 playground
docs/                VitePress 内容与交互组件
scripts/             构建、包验证与发布辅助脚本
```

工作区包使用不同的内部名称且不可直接发布。构建时生成 `dist/vue2` / `dist/vue3`，两个发布清单均使用 `vue-fullscreen`，但版本独立。

## 发布流程

1. 在干净工作区运行版本辅助脚本，例如下面的命令。
2. 检查版本、锁文件与生成的 release notes，运行验证并提交合并。
3. 在默认分支已包含的提交上创建并推送匹配标签。
4. Actions 重新验证，发布已检查的 tarball，再创建 GitHub Release。

```sh
npm run release:prepare -- vue3 3.2.0-beta.1 "Modernize fullscreen builds."
# 完成检查、提交和合并后：
git tag vue3-v3.2.0-beta.1
git push origin vue3-v3.2.0-beta.1
```

标签必须与包版本一致。Vue 2 稳定版发布到 `legacy`，Vue 3 稳定版发布到 `next`；预发布分别使用 `vue2-beta` 与 `vue3-beta`。不会自动写入 `latest`。

## 一次性配置

在 npm 的 Trusted Publisher 配置 GitHub 仓库 `mirari/vue-fullscreen`、工作流 `release.yml`、环境 `npm`。发布使用 OIDC，不需要长期 `NPM_TOKEN`。

GitHub Pages 的 Source 选择 **GitHub Actions**。`Documentation Pages` 工作流构建 VitePress 并部署静态产物；支持手动运行，在 `main` / `master` 推送后也会触发，仅仓库当前默认分支会自动部署。

部署根路径默认为 `/vue-fullscreen/`。独立域名可通过构建时的 `DOCS_BASE=/` 调整。这里的配置不会替你修改仓库默认分支，也不会自动配置 npm 账户。

发布失败后的恢复步骤和完整维护约定见[仓库 CONTRIBUTING.md](https://github.com/mirari/vue-fullscreen/blob/refactor/fullscreen-workspace/CONTRIBUTING.md)。
