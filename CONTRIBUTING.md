# Maintenance and releases

For issue-driven changes, follow the [Issue fixing workflow](./.github/ISSUE_FIXING.md).

## Branch and version model

The rewrite has a fresh release history, beginning at the commit recorded in `release.config.json`. The old implementation's changelog and version tags are not used as the new release baseline. The Vue 2 adapter starts at `4.0.0` and stays on 4.x; the Vue 3 adapter starts at `5.0.0` and can advance to later majors. Both require an explicit major upgrade from the previously published 2.x/3.x packages.

`master` is the default branch for all development and releases, including Vue 2 releases. Both adapters are maintained in this branch; npm channels such as `legacy` do not require separate Git branches.

The internal workspace packages are private. Their versions independently determine the generated `vue-fullscreen` packages. A core change must pass both adapters' checks, but releasing both lines is optional.

Use the pnpm version pinned in the root `packageManager` field and install with `pnpm install --frozen-lockfile`. `pnpm-workspace.yaml` includes both adapters; the root lockfile is `pnpm-lock.yaml`. The isolated published-package consumers intentionally use npm and their own lockfile, and CI publishes the verified tarball with npm trusted publishing.

## Checks

Install the three engines before running the basic browser tests:

```sh
pnpm exec playwright install chromium firefox webkit
```

On Linux CI or a machine missing browser system libraries, use `pnpm exec playwright install --with-deps chromium firefox webkit`. The Chromium project uses full Chromium; a headless-shell-only installation is insufficient for native fullscreen coverage. To run a single engine, use `pnpm run test:browser --project=firefox` (or `chromium` / `webkit`). The Chromium executable override applies only to the Chromium project.

- `pnpm run lint`: formatting consistency using Prettier.
- `pnpm run typecheck`: strict TypeScript checks for both adapters and shared core.
- `pnpm test`: controller, rejection rollback, teleport restoration, listener cleanup, directive rebinding, Vue component lifecycle and isolated Git release integration tests.
- `pnpm run build`: Vite ESM/CJS/UMD builds with Vue external, followed by TypeScript declaration generation. screenfull and its license/types are bundled.
- `pnpm run check:packages`: pack actual release directories, install tarballs into isolated consumers with Vue 2.4.0, 2.5.22, 2.6.0, 2.6.14, 2.7.16, 3.0.0 and the current Vue 3 development version; verify SSR ESM/CJS imports, browser-global UMD exports, mounted component lifecycles and TypeScript NodeNext consumers. Vue 2 checks also cover plugin registration, attribute/listener forwarding, model events and component instance types. Vue 3.0's own declarations require `skipLibCheck` with modern TypeScript; current Vue and all Vue 2 consumers are checked without it. Vue 2.5 runtime checks omit Node's global MessageChannel so its old scheduler does not keep the process alive.
- `pnpm run check:ie11`: ES5 parsing of Vue 2 outputs and simulated missing runtime/DOM capabilities, MS native fullscreen, page fallback and Vue lifecycle. This is not a real IE engine test.
- `pnpm run build:examples`: build both playgrounds.
- `pnpm run test:browser`: basic Chromium, Firefox and WebKit tests for both adapters in page and native fullscreen modes (12 cases). Native exit uses the browser API because synthetic Escape is not a reliable native browser fullscreen command.

CI runs checks on Node 22/24, browser and consumer tests on Node 24, and uploads both tarballs. Basic three-engine tests also run before publishing a release. Documentation and published-package consumer suites remain Chromium-only. CI runs basic browser cases with one worker for stability. WebKit automation does not constitute real Safari or iPhone acceptance; real-device testing on those platforms is deferred.

Browser jobs in CI, release validation and documentation deployment use the official Playwright Docker image, with all three browsers and their system libraries preinstalled. They do not run `playwright install`. Keep the image tag in all three workflows aligned with the exact `@playwright/test` version (currently `mcr.microsoft.com/playwright:v1.64.0-noble`); update them together when upgrading Playwright. pnpm dependencies remain cached through `actions/setup-node`.

Browser tests retain failure screenshots and traces. In CI, HTML reports and test output are uploaded even after failures and kept for 14 days, with separate directories for browser, documentation and consumer tests. See the [report instructions](./.github/ISSUE_FIXING.md#查看失败报告).

## Published-package consumer tests

Run `pnpm run test:consumers` after installing Chromium. The command builds and packs both adapters, installs the current tarball into an isolated fixture with a committed dependency lockfile, then builds Vite and Nuxt in production mode. It uses no source aliases or workspace links to the library.

| Consumer                    | Checks                                                                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Plain HTML, Vue 2 and Vue 3 | Classic `<script>` tags load the extracted UMD tarball and Vue global build; enter/exit page and native fullscreen                           |
| Vue with Vite               | Package-root imports, local component/directive registration, component model, directive and API in a production build                       |
| Nuxt 4                      | Named imports and server rendering, HTML with JavaScript disabled, hydration, component/directive/API interactions and route unmount/remount |

The consumer suite runs in Chromium. Local script URLs keep the tests independent of third-party CDN availability; they exercise the same files a CDN serves. Nuxt uses its Node server output; this does not claim coverage of every Nitro deployment adapter. Existing `check:packages` tests additionally cover ESM/CJS imports and TypeScript declarations across supported Vue versions.

## Consumer dependency security

`tests/consumers/fixture` is a private test application with its own npm lockfile and registry setting. Its `.npmrc` uses the official registry so newly patched dependencies do not depend on mirror synchronization. Its Nuxt, Vite and Vue installations exercise packed releases; they are not dependencies of the published `vue-fullscreen` tarballs. Direct dependency updates must update both the manifest and lockfile; compatible transitive updates can change only the lockfile. Run `pnpm run test:consumers` from the repository root after either change.

Run audits against the official registry, since some registry mirrors do not implement the audit endpoint:

```sh
pnpm audit --registry=https://registry.npmjs.org
cd tests/consumers/fixture
npm audit --registry=https://registry.npmjs.org
```

The remaining upstream advisories are listed below. They are recorded for review, rather than treated as fixed or automatically dismissed. npm may also report parent packages affected by `node-forge`; those entries refer to the same underlying advisory.

| Package      | Advisory                                                                                      | Exposure in this fixture                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `node-forge` | [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv); no patched release  | Nitro's `listhen` dependency for TLS certificate handling. The consumer servers use local HTTP and do not verify untrusted RSA signatures. |
| Vue 2        | [GHSA-5j4c-8p2g-v4jx](https://github.com/advisories/GHSA-5j4c-8p2g-v4jx); no public Vue 2 fix | The `vue2` alias deliberately tests 2.7.16. Its template compiler processes repository-authored HTML; do not compile untrusted templates.  |

Recheck these advisories when updating the fixture and after an upstream fix is released. Replacing the Vue 2 alias with Vue 3 would remove Vue 2 coverage. Avoid `npm audit fix --force`: its suggested Nuxt downgrade and Vue major upgrade do not preserve the consumer test matrix.

## First-time GitHub/npm configuration

1. Publish tags from commits on `origin/master`. Repository rules must allow maintainers to push `vue2-v*` / `vue3-v*` tags and the workflow's `GITHUB_TOKEN` to create GitHub Releases.
2. In npm's **vue-fullscreen → Settings → Trusted Publisher**, configure GitHub Actions for owner `mirari`, repository `vue-fullscreen`, workflow `release.yml`, environment `npm`, with publishing allowed.
3. Create the GitHub `npm` environment. Leave required reviewers unset for unattended publishing; configuring reviewers intentionally pauses the publish job for approval. The publish job requests `id-token: write` and uses Node 24's npm (OIDC support requires npm 11.5.1+). No `NPM_TOKEN` secret is required.
4. The existing production site is `https://vue-fullscreen.mirari.cc/`, with static content on the `gh-pages` branch and its `CNAME` file. Keep this branch-based publishing configuration. `Documentation Pages` replaces the static payload with VitePress output and preserves the domain; no DNS change or source default-branch switch is needed.

These account settings cannot be supplied by repository code. Never test the release workflow by publishing an already-used version.

## Prepare a release

Version preparation uses **commit-and-tag-version (CATV)**. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:` recommends a minor release, `fix:` recommends a patch, and `!` or `BREAKING CHANGE:` recommends a major release. CATV's standard recommendation treats other changes as patches; an explicit version or increment overrides it. Vue 2 stays on 4.x; Vue 3 can advance from 5.x to later majors.

Start on an up-to-date `master`, commit implementation changes, then fetch release tags, preview and create a release:

```sh
git switch master
git pull --ff-only origin master
git fetch origin --tags
pnpm run release vue3 --dry-run
pnpm run release vue3
git show --stat HEAD
git push --follow-tags origin master
```

`pnpm run release` uses CATV to update the selected adapter's version and changelog, generates `releases/<tag>.md`, then uses CATV's normal commit and annotated-tag steps. Tags are prefixed with `vue2-v` or `vue3-v` so each adapter has an independent release history. The command does not push or publish. Review the commit and tag before pushing. `--dry-run` changes no files, commits or tags and includes committed history only.

Pushing a matching tag runs `release.yml`: check that the tag matches the package version and its commit belongs to the release source branch; run all checks and browser/consumer tests; publish the verified tarball to npm through OIDC; then create the GitHub Release with the generated notes and tarball. Pushing a branch without a tag does not publish. CI checks out the tagged commit, even when the branch has advanced. The commit subject, changed-file list and position in the branch history do not control publishing.

Both version lines have been initialized with `vue2-v4.0.0` and `vue3-v5.0.0`. `--first-release` keeps the adapter's current version and cannot be used again once that line has release tags.

For subsequent releases, fetch tags first and choose the appropriate command, review the generated commit and tag, then `git push --follow-tags origin master`:

```sh
pnpm run release vue3 --dry-run          # preview CATV's recommendation
pnpm run release vue3                    # infer the version from commits
pnpm run release vue3 patch              # choose an increment
pnpm run release vue3 5.1.0-beta.0        # choose an exact version
pnpm run release vue3 --prerelease beta   # start or continue a beta
pnpm run release vue2 patch              # release Vue 2 independently
```

`pnpm run release:prepare` is an optional way to generate only the version, changelog and notes without committing or tagging. If using it, review and commit the generated files, then create an annotated tag matching the prepared version, for example `git tag -a vue3-v5.0.1 -m "5.0.1"`, before pushing. There is no required commit-message format or release-file whitelist.

The pnpm lockfile does not record these private workspace packages' own versions, so a version-only bump leaves it unchanged. Normal release creation requires a clean working tree and full Git history. Failures before the release commit restore generated files and clear their staging; failures after a commit retain it for recovery.

Only history from the rewrite commit onward is eligible. Each adapter uses its own tag prefix and excludes changes confined to the opposite adapter and its guide/reference pages. Shared core, build tooling, shared docs and mixed commits are eligible for both. CATV handles prerelease ranges: a continuing beta contains changes since the preceding beta, while the stable release includes changes that appeared during prereleases. Commit entries are generated as a whole; a mixed commit can appear in both changelogs. `docs`, `refactor` and `build` entries are visible; routine chores, tests and CI changes are hidden unless breaking.

| Version       | npm dist-tag |
| ------------- | ------------ |
| Stable Vue 2  | `legacy`     |
| Stable Vue 3  | `latest`     |
| Vue 2 beta/rc | `vue2-beta`  |
| Vue 3 beta/rc | `vue3-beta`  |

The workflow re-runs all checks, publishes the exact verified tarball using npm OIDC/provenance, then creates a GitHub Release with that tarball. A stable Vue 3 release publishes to `latest`; Vue 2 releases use `legacy`. The historical `next` tag is not used for current releases. Do not run different releases for the same version line concurrently, because npm tags follow the last successful publish.

If npm publishing succeeds but GitHub Release creation fails, use GitHub Actions “Re-run failed jobs” or create that release using the existing tag and tarball; do not re-run successful npm publishing for an immutable version. If publication fails before npm accepts it, re-run the failed publish job. If the outcome is uncertain, inspect npm first.

## Migration notes

- Prefer VueUse conventions for new public names. All adapters use `isSupported` for native fullscreen availability and `isFullscreen` for current state. Component and API operations use `enter`, `exit` and `toggle`; `request` and `isEnabled` remain deprecated aliases. Keep legacy names in migration guidance rather than current reference tables.
- API and directive targets share one resolver: strings first match an id (with an optional `#`), then a CSS selector. Ids take priority when both match, including ids with CSS special characters. Ref and getter values use the same rules on each entry. Unresolved targets never fall back to body.
- Vue 3 exposes `Fullscreen`, `vFullscreen` and `useFullscreen(target, options)`. The default plugin export, `$fullscreen` instance property and API singleton have been removed; migrate old API calls to `useFullscreen()`. Each composable call owns its reactive state and session, with component unmount cleanup; calls outside components must exit explicitly. The deprecated `component` and `directive` aliases remain.
- Vue 2 retains its default plugin export, `$fullscreen` instance property and `fullscreen` / `api` singleton. Use `v-model` for component state; the legacy `fullscreen` / `update:fullscreen` model remains supported in both adapters.
- Vue 2 minimum is 2.4.0, when `inheritAttrs`, `$attrs` and `$listeners` became available. Public declarations use types shared by Vue 2.4 through 2.7 rather than the later `VueConstructor` export.
- Output paths change to root-level `index.js`, `index.cjs`, and `index.umd.js`; update direct CDN/deep-file URLs. Package-root imports use `exports` and need no path change.
- Declaration entries are generated rather than maintained separately; public component types avoid exposing build-time Vue internal generics.
- screenfull is updated from 5 to 6 and bundled in every format. Vue 3 targets ES2018. Vue 2 exposes selected core-js polyfills through the optional `vue-fullscreen/polyfills` entry. The main bundle contains no core-js. Babel transforms the Vue 2 runtime and polyfill outputs for IE 11; only the polyfill files are marked as having side effects. `check:ie11` covers both this entry and independently supplied application polyfills.
- `teleport` defaults to `false`, matching existing code (old README examples incorrectly documented `true`).
- Teleported targets use a temporary container under `body`. During disposal, restore the target synchronously and return the container to its original position until the current render pass finishes, then unwrap it. Vue can cache that container before an unmount hook; removing it immediately can strand a conditional root's replacement outside its mount point. Cover both empty and element replacements, repeated remounts, and child destruction in both adapters.
- Native request rejection restores styles/DOM and removes listeners. Component errors use `error`; directive errors use the native `fullscreen-error` event.
- Missing directive selectors now report an error instead of silently targeting the body.
- Components now honor an initially true model on mount; native mode still requires browser user activation.

## VitePress documentation

User-facing documentation lives in `docs/`, with Chinese and English navigation, separate Vue 2 and Vue 3 guides, local search and interactive component/directive/API examples. `README.md` is copied into both published packages and is also the repository entry point. Keep its links usable on npm: use absolute repository URLs for files that are not included in the package.

Usage-page demos and the Playground share `docs/.vitepress/theme/playground/samples.ts`; `docs:prepare` builds the runnable demos from these sources. Displayed usage code comes from `usage-snippets.ts` in the same directory and focuses on fullscreen imports, options, state and controls, omitting image previews and presentation code. The `fullscreen-example` Markdown fence selects a usage mode, Vue version and language. Keep the snippets aligned with the full examples when changing fullscreen behavior, and rerun the documentation browser tests for interactive changes.

Both adapters' usage and quick-start examples use `UsageDemo.vue` to mount standalone bundles directly in the documentation. Only the runtime-specific mount and unmount adapters differ. `pageOnly` fills the document viewport, while `teleport` popups use the document body. Keep scroll restoration in the examples, and clean up their fullscreen sessions and viewers when navigating away. Editable Playground previews remain isolated in sandboxed iframes for both adapters.

The image-preview libraries are development dependencies for the examples. Keep popup containers under `body` to demonstrate `teleport`, with their z-index above the fullscreen panel so page fullscreen also works. `docs:prepare` includes the matching preview runtime and styles in the local Playground assets.

- `pnpm run docs:dev`: develop at `/`.
- `pnpm run docs:build`: SSR/static build, including dead-link checks.
- `pnpm run docs:preview`: serve the production build.
- `pnpm run test:docs`: build and test the production site with Chromium, including custom-domain root-path navigation and fullscreen examples.

VitePress is pinned to stable 1.6.4. A scoped `vitepress>vite` override uses Vite 6.4.4 to include the [Windows dev-server security fixes](https://github.com/advisories/GHSA-587h-7wmj-h5pm) missing from its Vite 5 dependency. Keep this override until VitePress supports a patched version directly, and verify documentation development, builds and browser tests when changing it. The library still builds with Vite 8. The root Vue 3 dependency supplies the docs runtime, while the Vue 2 workspace keeps its own runtime. Demo imports resolve to the local Vue 3 adapter.

The default base is `/`, matching `vue-fullscreen.mirari.cc`. For a separate project-subpath deployment use `DOCS_BASE=/vue-fullscreen/ pnpm run docs:build`. Keep the base consistent when serving previews. Browser tests exercise the production root path.
