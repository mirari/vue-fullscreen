# Maintenance and releases

## Branch and version model

The refactor starts from published Vue 3 tag `v3.1.3` (`050eb7e`), also recorded as npm's `gitHead`. Vue 2 compatibility was checked against `vue-fullscreen`'s `2.6.3` source (`6a115db`). Keep both adapters on the same development branch. No default branch or existing npm tag is changed by this refactor.

The internal workspace packages are private. Their versions independently determine the generated `vue-fullscreen` packages. A core change must pass both adapters' checks, but releasing both lines is optional.

## Checks

- `npm run lint`: formatting consistency using Prettier.
- `npm run typecheck`: strict TypeScript checks for both adapters and shared core.
- `npm test`: controller, rejection rollback, teleport restoration, listener cleanup, directive rebinding and Vue component lifecycle tests.
- `npm run build`: Vite ESM/CJS/UMD builds with Vue external, followed by TypeScript declaration generation. screenfull and its license/types are bundled.
- `npm run check:packages`: pack actual release directories, install tarballs into isolated consumers with Vue 2.6.14, 2.7.16, 3.0.0 and the current Vue 3 development version; verify SSR ESM/CJS imports, browser-global UMD exports, mounted component lifecycles and TypeScript NodeNext consumers. Vue 3.0's own declarations require `skipLibCheck` with modern TypeScript; current Vue and both Vue 2 consumers are checked without it.
- `npm run build:examples`: build both playgrounds.
- `npm run test:browser`: Chromium tests for both adapters in page and native fullscreen modes. Native exit uses the browser API because synthetic Escape is not a reliable native browser fullscreen command.

CI runs checks on Node 22/24, browser tests on Node 24, and uploads both tarballs. Browser engines other than Chromium are not part of the automated coverage yet.

## First-time GitHub/npm configuration

1. Review and merge this branch, or make the reviewed branch the repository's default. Release tags must point to commits reachable from the default branch. CI supports both `main` and `master`.
2. In npm's **vue-fullscreen → Settings → Trusted Publisher**, configure GitHub Actions for owner `mirari`, repository `vue-fullscreen`, workflow `release.yml`, environment `npm`.
3. Create the GitHub `npm` environment; configure reviewers if desired. The publish job requests `id-token: write` and uses Node 24's npm (OIDC support requires npm 11.5.1+). No `NPM_TOKEN` secret is required.
4. For example deployment, select GitHub Pages source **GitHub Actions** and run the `Documentation Pages` workflow on the reviewed branch. It deploys the VitePress site, including interactive examples; pushes to the current default branch (`main` or `master`) also deploy it. It uses the Pages deployment API, not commits to `gh-pages`.

These account settings cannot be supplied by repository code. Never test the release workflow by publishing an already-used version.

## Prepare a release

Start with a clean working tree. For example:

```sh
npm run release:prepare -- vue3 3.2.0-beta.1 "Modernize builds and fix fullscreen cleanup."
npm run check
npm run test:browser
```

The helper updates the selected adapter's version, npm lockfile and `releases/vue3-v3.2.0-beta.1.md`. It does not commit, tag or publish. Review/commit those files and merge them into the default branch. Then tag the merged commit:

```sh
git tag vue3-v3.2.0-beta.1
git push origin vue3-v3.2.0-beta.1
```

Use `vue2-v2.x.y` for Vue 2 and `vue3-v3.x.y` for Vue 3. A release must include matching version metadata and a release notes file. Versions only increase. The initial beta versions in this branch are placeholders for review, not existing releases.

| Version       | npm dist-tag |
| ------------- | ------------ |
| Stable Vue 2  | `legacy`     |
| Stable Vue 3  | `next`       |
| Vue 2 beta/rc | `vue2-beta`  |
| Vue 3 beta/rc | `vue3-beta`  |

The workflow re-runs all checks, publishes the exact verified tarball using npm OIDC/provenance, then creates a GitHub Release with that tarball. It never writes `latest`. Promotion of Vue 3 to `latest` is a separate decision after compatibility review. Do not run different releases for the same version line concurrently, because npm tags follow the last successful publish.

If npm publishing succeeds but GitHub Release creation fails, re-run only the failed Release job or create that release using the existing tag and tarball; do not retry publishing an immutable version. If publication fails before npm accepts it, re-run the failed publish job. If the outcome is uncertain, inspect npm first.

## Migration notes

- Component/plugin/directive/API import names and both Vue model conventions remain supported.
- Vue 2 minimum is explicitly 2.6.14; releases before 2.6.14 are outside the validated support range.
- Output paths change to root-level `index.js`, `index.cjs`, and `index.umd.js`; update direct CDN/deep-file URLs. Package-root imports use `exports` and need no path change.
- Declaration entries are generated rather than maintained separately; public component types avoid exposing build-time Vue internal generics.
- screenfull is updated from 5 to 6 and bundled in every format. IE and ES5-only environments are outside the ES2018 build target.
- `teleport` defaults to `false`, matching existing code (old README examples incorrectly documented `true`).
- Native request rejection restores styles/DOM and removes listeners. Component errors use `error`; directive errors use the native `fullscreen-error` event.
- Missing directive selectors now report an error instead of silently targeting the body.
- Components now honor an initially true model on mount; native mode still requires browser user activation.

## VitePress documentation

User-facing documentation lives in `docs/`, with Chinese navigation, local search and interactive component/directive/API examples. `README.md` is the npm/repository entry point.

- `npm run docs:dev`: develop at `/vue-fullscreen/`.
- `npm run docs:build`: SSR/static build, including dead-link checks.
- `npm run docs:preview`: serve the production build.
- `npm run test:docs`: build and test the production site with Chromium, including GitHub Pages subpath navigation and fullscreen examples.

VitePress is pinned to its stable 1.6.4 release and uses its own compatible Vite dependency; the library still builds with Vite 8. The root Vue 3 dependency supplies the docs runtime, while the Vue 2 workspace keeps its own runtime. Demo imports resolve to the local Vue 3 adapter. The site labels the unpublished refactor versions explicitly.

The default base is `/vue-fullscreen/`. For a root-domain deployment use `DOCS_BASE=/ npm run docs:build`. Keep the base consistent when serving previews. Browser tests deliberately exercise the standard GitHub Pages base.
