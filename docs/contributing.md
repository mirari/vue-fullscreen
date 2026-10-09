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

`test:docs` 先构建文档，再启动静态预览，验证 自定义域名根路径下的资源和页面。需要预先安装 Chromium：`npx playwright install chromium`。环境已有浏览器时，可设置 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`。

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

生产域名为 [vue-fullscreen.mirari.cc](https://vue-fullscreen.mirari.cc/)。现有仓库从 `gh-pages` 分支的根目录发布；该分支的 `CNAME` 指定这个域名。旧工作流会把 `master` 的示例构建提交到这里。

新的 `Documentation Pages` 工作流沿用 `gh-pages` 静态产物分支，内容替换为 VitePress 文档，保留 `CNAME` 并添加 `.nojekyll`。Cloudflare 的 DNS/代理无需因为文档替换而改变。工作流支持手动运行；默认分支为 `main` / `master` 时推送也会触发。

默认构建路径是 `/`。如果需要另外部署到项目子路径，可用 `DOCS_BASE=/vue-fullscreen/` 覆盖。替换静态站不会切换源码默认分支，也不会发布 npm 包。

发布失败后的恢复步骤和完整维护约定见[仓库 CONTRIBUTING.md](https://github.com/mirari/vue-fullscreen/blob/refactor/fullscreen-workspace/CONTRIBUTING.md)。
