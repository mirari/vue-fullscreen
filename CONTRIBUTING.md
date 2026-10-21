# Maintenance and releases

## Branch and version model

The v4 rewrite is a fresh release history, beginning at the commit recorded in `release.config.json`. The old implementation's changelog and version tags are not used as the new release baseline. Vue 3 starts at `4.0.0`; the rewritten Vue 2 adapter keeps its independent `2.x` version line.

`v4` is a temporary development branch for this rewrite. Only the bootstrap release `vue3-v4.0.0` is released from `v4`. After that release succeeds, replace `master` with the reviewed v4 history. All later development and releases use `master`, including Vue 2 releases. Release validation uses this explicit policy instead of requiring the old master history before the first v4 release.

The internal workspace packages are private. Their versions independently determine the generated `vue-fullscreen` packages. A core change must pass both adapters' checks, but releasing both lines is optional.

Use the pnpm version pinned in the root `packageManager` field and install with `pnpm install --frozen-lockfile`. `pnpm-workspace.yaml` includes both adapters; the root lockfile is `pnpm-lock.yaml`. The isolated published-package consumers intentionally use npm and their own lockfile, and CI publishes the verified tarball with npm trusted publishing.

## Checks

- `pnpm run lint`: formatting consistency using Prettier.
- `pnpm run typecheck`: strict TypeScript checks for both adapters and shared core.
- `pnpm test`: controller, rejection rollback, teleport restoration, listener cleanup, directive rebinding, Vue component lifecycle and isolated Git release integration tests.
- `pnpm run build`: Vite ESM/CJS/UMD builds with Vue external, followed by TypeScript declaration generation. screenfull and its license/types are bundled.
- `pnpm run check:packages`: pack actual release directories, install tarballs into isolated consumers with Vue 2.6.14, 2.7.16, 3.0.0 and the current Vue 3 development version; verify SSR ESM/CJS imports, browser-global UMD exports, mounted component lifecycles and TypeScript NodeNext consumers. Vue 3.0's own declarations require `skipLibCheck` with modern TypeScript; current Vue and both Vue 2 consumers are checked without it.
- `pnpm run check:ie11`: ES5 parsing of Vue 2 outputs and simulated missing runtime/DOM capabilities, MS native fullscreen, page fallback and Vue lifecycle. This is not a real IE engine test.
- `pnpm run build:examples`: build both playgrounds.
- `pnpm run test:browser`: Chromium tests for both adapters in page and native fullscreen modes. Native exit uses the browser API because synthetic Escape is not a reliable native browser fullscreen command.

CI runs checks on Node 22/24, browser and consumer tests on Node 24, and uploads both tarballs. Browser engines other than Chromium are not part of the automated coverage yet.

## Published-package consumer tests

Run `pnpm run test:consumers` after installing Chromium. The command builds and packs both adapters, installs the current tarball into an isolated fixture with a committed dependency lockfile, then builds Vite and Nuxt in production mode. It uses no source aliases or workspace links to the library.

| Consumer                    | Checks                                                                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Plain HTML, Vue 2 and Vue 3 | Classic `<script>` tags load the extracted UMD tarball and Vue global build; enter/exit page and native fullscreen                           |
| Vue with Vite               | Package-root imports, local component/directive registration, component model, directive and API in a production build                       |
| Nuxt 4                      | Named imports and server rendering, HTML with JavaScript disabled, hydration, component/directive/API interactions and route unmount/remount |

All browser assertions run in Chromium. Local script URLs keep the tests independent of third-party CDN availability; they exercise the same files a CDN serves. Nuxt uses its Node server output; this does not claim coverage of every Nitro deployment adapter. Existing `check:packages` tests additionally cover ESM/CJS imports and TypeScript declarations across supported Vue versions.

## First-time GitHub/npm configuration

1. Review and merge the rewrite into the temporary `v4` branch. The bootstrap tag must point to a commit on `origin/v4`. After publishing v4 and switching master, subsequent tags must point to commits on `origin/master`; changing the GitHub default branch is not required.
2. In npm's **vue-fullscreen → Settings → Trusted Publisher**, configure GitHub Actions for owner `mirari`, repository `vue-fullscreen`, workflow `release.yml`, environment `npm`.
3. Create the GitHub `npm` environment; configure reviewers if desired. The publish job requests `id-token: write` and uses Node 24's npm (OIDC support requires npm 11.5.1+). No `NPM_TOKEN` secret is required.
4. The existing production site is `https://vue-fullscreen.mirari.cc/`, with static content on the `gh-pages` branch and its `CNAME` file. Keep this branch-based publishing configuration. `Documentation Pages` replaces the static payload with VitePress output and preserves the domain; no DNS change or source default-branch switch is needed.

These account settings cannot be supplied by repository code. Never test the release workflow by publishing an already-used version.

## Prepare a release

Version preparation uses **commit-and-tag-version (CATV)**. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:` recommends a minor release, `fix:` recommends a patch, and `!` or `BREAKING CHANGE:` recommends a major release. CATV's standard recommendation treats other changes as patches; an explicit version or increment overrides it. Vue 2 stays on 2.x; Vue 3 can advance from 4.x to later majors.

Preview the first Vue 3 release without modifying files, then prepare it from a clean working tree:

```sh
pnpm run release:prepare vue3 --first-release --dry-run
pnpm run release:prepare vue3 --first-release
```

`--first-release` keeps the adapter's current version. It is required once per version line and cannot be used once that line has release tags. For Vue 2, use `vue2 --first-release` when its rewritten adapter is ready; its first release is also prepared independently.

For subsequent releases:

```sh
pnpm run release:prepare vue3 --dry-run          # preview CATV's recommendation
pnpm run release:prepare vue3                    # infer the version from commits
pnpm run release:prepare vue3 patch              # choose an increment
pnpm run release:prepare vue3 4.1.0-beta.0        # choose an exact version
pnpm run release:prepare vue3 --prerelease beta   # start or continue a beta
pnpm run release:prepare vue2 patch              # release Vue 2 independently
```

The helper updates the selected adapter's `package.json`, its `packages/vue2/CHANGELOG.md` or `packages/vue3/CHANGELOG.md`, and `releases/<tag>.md`. The pnpm lockfile does not record these private workspace packages' own versions, so a version-only bump leaves it unchanged. It never commits, tags, pushes or publishes. Preview mode is also available in a dirty working tree and includes **committed changes only**. Normal preparation requires a clean tree and full Git history with tags. Commit the current development changes before preparing a real release.

Only history from the rewrite commit onward is eligible. Each adapter uses its own tag prefix and excludes changes confined to the opposite adapter and its guide/reference pages. Shared core, build tooling, shared docs and mixed commits are eligible for both. CATV handles prerelease ranges: a continuing beta contains changes since the preceding beta, while the stable release includes changes that appeared during prereleases. Commit entries are generated as a whole; a mixed commit can appear in both changelogs. `docs`, `refactor` and `build` entries are visible; routine chores, tests and CI changes are hidden unless breaking.

Run the checks, review the generated notes, commit and merge into the appropriate release source branch, then tag that reviewed commit. For the bootstrap:

```sh
pnpm run check
pnpm run test:browser
# Review/commit generated files and merge them into v4 first.
git tag vue3-v4.0.0
git push origin vue3-v4.0.0
```

After the bootstrap package has been published and the GitHub Release has succeeded, switch master to that reviewed v4 history. Fetch the current remote refs and record the expected master SHA before the switch. An explicit refspec updates the remote branch without resetting a local checkout:

```sh
git fetch origin
# Replace <recorded-master-sha> with the SHA just read from origin/master.
git push origin origin/v4:refs/heads/master --force-with-lease=refs/heads/master:<recorded-master-sha>
```

Check that master now contains the published v4 commit, then base future work on master. `v4` has no ongoing release role. This branch replacement is a separate post-release operation, not an automatic side effect of CATV or CI. The initial adapter versions have not been published; their release notes will be generated by the first-release commands.

| Version       | npm dist-tag |
| ------------- | ------------ |
| Stable Vue 2  | `legacy`     |
| Stable Vue 3  | `latest`     |
| Vue 2 beta/rc | `vue2-beta`  |
| Vue 3 beta/rc | `vue3-beta`  |

The workflow re-runs all checks, publishes the exact verified tarball using npm OIDC/provenance, then creates a GitHub Release with that tarball. A stable Vue 3 release publishes to `latest`; Vue 2 releases use `legacy`. The historical `next` tag is left unchanged. Do not run different releases for the same version line concurrently, because npm tags follow the last successful publish.

If npm publishing succeeds but GitHub Release creation fails, re-run only the failed Release job or create that release using the existing tag and tarball; do not retry publishing an immutable version. If publication fails before npm accepts it, re-run the failed publish job. If the outcome is uncertain, inspect npm first.

## Migration notes

- Component/directive/API import names and both Vue model conventions remain supported. Vue 2 retains its plugin; Vue 3 uses named imports without a plugin default export or instance globals.
- Prefer `Fullscreen`, `vFullscreen` and `fullscreen` for named imports; the old `component`, `directive` and `api` exports remain aliases. Vue 3 also exports `useFullscreen(target, options)` for independent reactive sessions with `pageOnly` and `teleport` support and component unmount cleanup.
- Vue 2 minimum is explicitly 2.6.14; releases before 2.6.14 are outside the validated support range.
- Output paths change to root-level `index.js`, `index.cjs`, and `index.umd.js`; update direct CDN/deep-file URLs. Package-root imports use `exports` and need no path change.
- Declaration entries are generated rather than maintained separately; public component types avoid exposing build-time Vue internal generics.
- screenfull is updated from 5 to 6 and bundled in every format. Vue 3 targets ES2018. Vue 2 exposes selected core-js polyfills through the optional `vue-fullscreen/polyfills` entry. The main bundle contains no core-js. Babel transforms both outputs for IE 11; only the polyfill files are marked as having side effects. `check:ie11` covers both this entry and independently supplied application polyfills.
- `teleport` defaults to `false`, matching existing code (old README examples incorrectly documented `true`).
- Native request rejection restores styles/DOM and removes listeners. Component errors use `error`; directive errors use the native `fullscreen-error` event.
- Missing directive selectors now report an error instead of silently targeting the body.
- Components now honor an initially true model on mount; native mode still requires browser user activation.

## VitePress documentation

User-facing documentation lives in `docs/`, with Chinese navigation, local search and interactive component/directive/API examples. `README.md` is the npm/repository entry point.

- `pnpm run docs:dev`: develop at `/`.
- `pnpm run docs:build`: SSR/static build, including dead-link checks.
- `pnpm run docs:preview`: serve the production build.
- `pnpm run test:docs`: build and test the production site with Chromium, including custom-domain root-path navigation and fullscreen examples.

VitePress is pinned to its stable 1.6.4 release and uses its own compatible Vite dependency; the library still builds with Vite 8. The root Vue 3 dependency supplies the docs runtime, while the Vue 2 workspace keeps its own runtime. Demo imports resolve to the local Vue 3 adapter. The site labels the unpublished refactor versions explicitly.

The default base is `/`, matching `vue-fullscreen.mirari.cc`. For a separate project-subpath deployment use `DOCS_BASE=/vue-fullscreen/ pnpm run docs:build`. Keep the base consistent when serving previews. Browser tests exercise the production root path.
