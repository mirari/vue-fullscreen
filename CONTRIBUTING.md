# Maintenance and releases

## Branch and version model

The refactor starts from published Vue 3 tag `v3.1.3` (`050eb7e`), also recorded as npm's `gitHead`. Vue 2 compatibility was checked against `vue-fullscreen`'s `2.6.3` source (`6a115db`). Keep both adapters on the `v4` development branch. The current package starts at `4.0.0`; the Vue 2 maintenance package keeps its independent `2.x` version. No default branch or existing npm tag is changed by this refactor.

The internal workspace packages are private. Their versions independently determine the generated `vue-fullscreen` packages. A core change must pass both adapters' checks, but releasing both lines is optional.

## Checks

- `npm run lint`: formatting consistency using Prettier.
- `npm run typecheck`: strict TypeScript checks for both adapters and shared core.
- `npm test`: controller, rejection rollback, teleport restoration, listener cleanup, directive rebinding and Vue component lifecycle tests.
- `npm run build`: Vite ESM/CJS/UMD builds with Vue external, followed by TypeScript declaration generation. screenfull and its license/types are bundled.
- `npm run check:packages`: pack actual release directories, install tarballs into isolated consumers with Vue 2.6.14, 2.7.16, 3.0.0 and the current Vue 3 development version; verify SSR ESM/CJS imports, browser-global UMD exports, mounted component lifecycles and TypeScript NodeNext consumers. Vue 3.0's own declarations require `skipLibCheck` with modern TypeScript; current Vue and both Vue 2 consumers are checked without it.
- `npm run check:ie11`: ES5 parsing of Vue 2 outputs and simulated missing runtime/DOM capabilities, MS native fullscreen, page fallback and Vue lifecycle. This is not a real IE engine test.
- `npm run build:examples`: build both playgrounds.
- `npm run test:browser`: Chromium tests for both adapters in page and native fullscreen modes. Native exit uses the browser API because synthetic Escape is not a reliable native browser fullscreen command.

CI runs checks on Node 22/24, browser and consumer tests on Node 24, and uploads both tarballs. Browser engines other than Chromium are not part of the automated coverage yet.

## Published-package consumer tests

Run `npm run test:consumers` after installing Chromium. The command builds and packs both adapters, installs the current tarball into an isolated fixture with a committed dependency lockfile, then builds Vite and Nuxt in production mode. It uses no source aliases or workspace links to the library.

| Consumer                  | Checks                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Plain HTML, Vue 2 and Vue | Classic `<script>` tags load the extracted UMD tarball and Vue global build; enter/exit page and native fullscreen                                     |
| Vue with Vite             | Package-root imports, global plugin registration, component model, directive and API in a production build                                             |
| Nuxt 4                    | Universal plugin import and server rendering, HTML with JavaScript disabled, hydration, component/directive/API interactions and route unmount/remount |

All browser assertions run in Chromium. Local script URLs keep the tests independent of third-party CDN availability; they exercise the same files a CDN serves. Nuxt uses its Node server output; this does not claim coverage of every Nitro deployment adapter. Existing `check:packages` tests additionally cover ESM/CJS imports and TypeScript declarations across supported Vue versions.

## First-time GitHub/npm configuration

1. Review and merge this branch, or make the reviewed branch the repository's default. Release tags must point to commits reachable from the default branch. CI supports both `main` and `master`.
2. In npm's **vue-fullscreen → Settings → Trusted Publisher**, configure GitHub Actions for owner `mirari`, repository `vue-fullscreen`, workflow `release.yml`, environment `npm`.
3. Create the GitHub `npm` environment; configure reviewers if desired. The publish job requests `id-token: write` and uses Node 24's npm (OIDC support requires npm 11.5.1+). No `NPM_TOKEN` secret is required.
4. The existing production site is `https://vue-fullscreen.mirari.cc/`, with static content on the `gh-pages` branch and its `CNAME` file. Keep this branch-based publishing configuration. `Documentation Pages` replaces the static payload with VitePress output and preserves the domain; no DNS change or source default-branch switch is needed.

These account settings cannot be supplied by repository code. Never test the release workflow by publishing an already-used version.

## Prepare a release

Start with a clean working tree. For example:

```sh
npm run release:prepare -- vue3 4.0.1-beta.1 "Modernize builds and fix fullscreen cleanup."
npm run check
npm run test:browser
```

The helper updates the selected adapter's version, npm lockfile and `releases/vue3-v4.0.1-beta.1.md`. It does not commit, tag or publish. Review/commit those files and merge them into the default branch. Then tag the merged commit:

```sh
git tag vue3-v4.0.1-beta.1
git push origin vue3-v4.0.1-beta.1
```

Use `vue2-v2.x.y` for Vue 2 and `vue3-v4.x.y` for Vue 3. A release must include matching version metadata and a release notes file. Versions only increase. The initial current release is prepared as `4.0.0` with notes in `releases/vue3-v4.0.0.md`; after review and merge, use tag `vue3-v4.0.0`. It has not been published. The Vue 2 version remains `2.7.0-beta.0`.

| Version       | npm dist-tag |
| ------------- | ------------ |
| Stable Vue 2  | `legacy`     |
| Stable Vue 3  | `latest`     |
| Vue 2 beta/rc | `vue2-beta`  |
| Vue 3 beta/rc | `vue3-beta`  |

The workflow re-runs all checks, publishes the exact verified tarball using npm OIDC/provenance, then creates a GitHub Release with that tarball. A stable 4.x release publishes to `latest`; Vue 2 releases use `legacy`. The historical `next` tag is left unchanged. Do not run different releases for the same version line concurrently, because npm tags follow the last successful publish.

If npm publishing succeeds but GitHub Release creation fails, re-run only the failed Release job or create that release using the existing tag and tarball; do not retry publishing an immutable version. If publication fails before npm accepts it, re-run the failed publish job. If the outcome is uncertain, inspect npm first.

## Migration notes

- Component/plugin/directive/API import names and both Vue model conventions remain supported.
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

- `npm run docs:dev`: develop at `/`.
- `npm run docs:build`: SSR/static build, including dead-link checks.
- `npm run docs:preview`: serve the production build.
- `npm run test:docs`: build and test the production site with Chromium, including custom-domain root-path navigation and fullscreen examples.

VitePress is pinned to its stable 1.6.4 release and uses its own compatible Vite dependency; the library still builds with Vite 8. The root Vue 3 dependency supplies the docs runtime, while the Vue 2 workspace keeps its own runtime. Demo imports resolve to the local Vue 3 adapter. The site labels the unpublished refactor versions explicitly.

The default base is `/`, matching `vue-fullscreen.mirari.cc`. For a separate project-subpath deployment use `DOCS_BASE=/vue-fullscreen/ npm run docs:build`. Keep the base consistent when serving previews. Browser tests exercise the production root path.
