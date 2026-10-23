# Changelog

Vue 2 releases from the v4 rewrite. Legacy release history is intentionally excluded.

## [4.1.2](https://github.com/mirari/vue-fullscreen/compare/vue2-v4.1.1...vue2-v4.1.2) (2026-10-23)

### Bug Fixes

- preserve conditional root placement after teleport cleanup ([c2f0ccc](https://github.com/mirari/vue-fullscreen/commit/c2f0ccc2ff616024fc710216577e512b6ee4b43f))

## [4.1.1](https://github.com/mirari/vue-fullscreen/compare/vue2-v4.1.0...vue2-v4.1.1) (2026-10-23)

### Bug Fixes

- synchronize fullscreen cleanup and preserve API references ([e96ccb2](https://github.com/mirari/vue-fullscreen/commit/e96ccb29307241e7536e1fa24f2b7f1c92771804))

### Documentation

- align target references and directive sections ([c498468](https://github.com/mirari/vue-fullscreen/commit/c49846891c22dfa8a45b90cfd0262282b1585c4a))
- centralize native fullscreen activation requirements ([f99f7f4](https://github.com/mirari/vue-fullscreen/commit/f99f7f4815a690664703a083ef1b565dfffd7951))
- remove redundant playground capability notes ([75baa2f](https://github.com/mirari/vue-fullscreen/commit/75baa2f90f809bf2de1d2332efb4da4114d1d8b7))
- simplify guidance and clarify example editor links ([4507204](https://github.com/mirari/vue-fullscreen/commit/4507204d94884c6f242d7ff648f4408eaae71f63))
- stabilize version references and release handoff guidance ([6e9152b](https://github.com/mirari/vue-fullscreen/commit/6e9152b2e7b721a0760f88a7a1dc7cb56365f5e0))
- unify Vue 2 and Vue 3 inline examples ([cca758c](https://github.com/mirari/vue-fullscreen/commit/cca758c0061c7f67f1d896a2a5af41e67eab1871))

### Build System

- **deps:** remove vulnerable git dependencies from consumer tests ([204e36d](https://github.com/mirari/vue-fullscreen/commit/204e36dce9621e84255ae88657a07c270efe3d01))
- **deps:** update Nuxt fixture and patched docs tooling ([1e61428](https://github.com/mirari/vue-fullscreen/commit/1e6142805f88d038f4ceb0385088c4aa63b7633b))

## [4.1.0](https://github.com/mirari/vue-fullscreen/compare/vue2-v4.0.0...vue2-v4.1.0) (2026-10-23)

### Features

- unify fullscreen targets and public controls ([79df595](https://github.com/mirari/vue-fullscreen/commit/79df595172d58793784289fad1c7a4aa39e8a69f))

### Bug Fixes

- **docs:** load usage demos as public assets in development ([7c9b5b7](https://github.com/mirari/vue-fullscreen/commit/7c9b5b732b2dfcc40b7a65ae0d937797dedfd180))
- **docs:** preserve example theme after teleport ([3c2ec57](https://github.com/mirari/vue-fullscreen/commit/3c2ec57af767935ebd87ebe6a1a8c2805ea7602b))

### Documentation

- align API introductions with quick start ([8e159ad](https://github.com/mirari/vue-fullscreen/commit/8e159adef65bba5a4f75695d23531a80fbbd9b42))
- align project guides and simplify browser imports ([244de55](https://github.com/mirari/vue-fullscreen/commit/244de557f43c71a272a762e930e92321eac9ad4f))
- clarify fullscreen state naming and legacy model migration ([676ef23](https://github.com/mirari/vue-fullscreen/commit/676ef23f7e700ce543cbb0eb87981ace9f57bb58))
- clarify v-model fullscreen control ([e1ea71c](https://github.com/mirari/vue-fullscreen/commit/e1ea71cfd9cb8c281979930aa2e98f69f5c782f5))
- demonstrate teleport with v-viewer image previews ([ddcdf3a](https://github.com/mirari/vue-fullscreen/commit/ddcdf3a039d41035733b6590598173652becb7d6))
- describe API use cases and shared controls ([859aa59](https://github.com/mirari/vue-fullscreen/commit/859aa591c3cf4e5935e3602b7185f8bc6931eebb))
- distinguish directive triggers from fullscreen targets ([742497c](https://github.com/mirari/vue-fullscreen/commit/742497c53219c626943018023666f154e1719621))
- emphasize fullscreen actions and simplify image previews ([c33bf3d](https://github.com/mirari/vue-fullscreen/commit/c33bf3d97358850782df9de80ffd6d47b517245c))
- explain overlay visibility without teleport ([0a2e4b2](https://github.com/mirari/vue-fullscreen/commit/0a2e4b27067381df8f20960844e439fe22dcdddf))
- explain supported directive target types ([551347f](https://github.com/mirari/vue-fullscreen/commit/551347fa7cbf2d3d5e4133f4cfe1d99899882430))
- focus usage snippets on fullscreen behavior ([523a62e](https://github.com/mirari/vue-fullscreen/commit/523a62e94d5eedb72b61a480cc8edc8cc1bd0ed6))
- give the home image viewer more vertical space ([347226a](https://github.com/mirari/vue-fullscreen/commit/347226a1b21e54b37c55e322631775a452d6eea2))
- link fullscreen options and clarify exit state sync ([949c50e](https://github.com/mirari/vue-fullscreen/commit/949c50eb46981201c199cb57fc6ee7471183eb82))
- move upgrade notices to getting started ([3be77b8](https://github.com/mirari/vue-fullscreen/commit/3be77b8b55ab0ce7f331c646f42b30e587f2f875))
- refine basic usage introduction ([01aef6b](https://github.com/mirari/vue-fullscreen/commit/01aef6bfc49a0ac9b3443d5ccd63f329b18a5674))
- remove image preview installation notices ([233f9ee](https://github.com/mirari/vue-fullscreen/commit/233f9eeadf0448450fcf9a18b5ecebf8d0af5da2))
- remove image-preview library callouts ([99462d9](https://github.com/mirari/vue-fullscreen/commit/99462d9aa6dea56077b7a12a5bfca9b4d8ed7e22))
- remove redundant component cleanup guidance ([9c2a5a7](https://github.com/mirari/vue-fullscreen/commit/9c2a5a70f231bd1cebb56f3605e4c4d7958990a1))
- remove redundant usage snippet notices ([15c038c](https://github.com/mirari/vue-fullscreen/commit/15c038c21fe657eddbf796387d59e395fd95f158))
- separate props instance properties and methods ([99b4865](https://github.com/mirari/vue-fullscreen/commit/99b4865c7b21fcdc9a0600a9661fcff7339162fd))
- show fullscreen-only exit actions in full rows ([bf6420f](https://github.com/mirari/vue-fullscreen/commit/bf6420f3dc0b4a4d23a9d1326a77707ec145dd1a))
- show tiled images before opening teleport previews ([d658da4](https://github.com/mirari/vue-fullscreen/commit/d658da44bc5e5553bd05b768dd1a231d632ad49f))
- simplify directive target guidance ([23aa762](https://github.com/mirari/vue-fullscreen/commit/23aa7629877701d5d06273b2db83b1d5ae312b0b))
- unify runnable examples and improve guide navigation ([aa20dc0](https://github.com/mirari/vue-fullscreen/commit/aa20dc06db879092fe325f5cc0c8ac20aa1d561d))
- use inline v-viewer galleries on home and quick start ([8449acc](https://github.com/mirari/vue-fullscreen/commit/8449accdbc42e7137892356e3d7c313532b36100))
- use master for development and future releases ([2b23f15](https://github.com/mirari/vue-fullscreen/commit/2b23f1543f5aa35d8d6e5f5271752bdd55abca04))

### Code Refactoring

- **docs:** share data module loading with playground ([864b1c8](https://github.com/mirari/vue-fullscreen/commit/864b1c8345dbdd3138a0d19f84267438bef85867))

## 4.0.0 (2026-10-22)

### ⚠ BREAKING CHANGES

- establish Vue 2 v4 and Vue 3 v5 release lines

### Features

- add documentation playground and refine fullscreen APIs ([daf9f06](https://github.com/mirari/vue-fullscreen/commit/daf9f06b57ec0f31cc01f42e25b579e9ce835e7a))
- build Vue 2 for IE 11 with bundled polyfills and remove demo status ([2eee4fc](https://github.com/mirari/vue-fullscreen/commit/2eee4fcbe664c8f45043c0a9d293cd9619506321))
- establish Vue 2 v4 and Vue 3 v5 release lines ([91a1065](https://github.com/mirari/vue-fullscreen/commit/91a1065a394267b29560084b890f3e696e185641))
- make Vue 2 runtime polyfills an optional entry ([9d72c60](https://github.com/mirari/vue-fullscreen/commit/9d72c60534f1b437cbf873dd6b9b8619c618d64e))
- modernize fullscreen APIs, docs and release tooling ([0b703c2](https://github.com/mirari/vue-fullscreen/commit/0b703c29a497aea86ad0ab994d0e3a599da84080))

### Bug Fixes

- **ci:** publish npm tarballs using explicit local paths ([050120c](https://github.com/mirari/vue-fullscreen/commit/050120ce58ec017bb7c224b8c995d9039af455d0))
- **docs:** restore bottom spacing below gallery previews ([cdb65e7](https://github.com/mirari/vue-fullscreen/commit/cdb65e7fc422fcea91c841fafcc6631c74d195f2))
- **docs:** show uncropped previews and enlarge fullscreen photos ([0f7c5c8](https://github.com/mirari/vue-fullscreen/commit/0f7c5c8eb377c77966cd1ccdb69db686a56e947d))

### Documentation

- add bilingual guides with separate Vue 2 navigation ([3d8f8b5](https://github.com/mirari/vue-fullscreen/commit/3d8f8b52b7bfe35fb29ec3c74df8178156d798bc))
- default demos to native fullscreen and link standalone Vue 2 example ([9d15f13](https://github.com/mirari/vue-fullscreen/commit/9d15f136e1bf8f1f2b689d1b3525bb0b4da1ecba))
- demonstrate teleport with body popups and constrained parents ([37785ee](https://github.com/mirari/vue-fullscreen/commit/37785eecaf42b796239431acaeec038c21276440))
- expand fullscreen browser compatibility and platform limitations ([37f07c8](https://github.com/mirari/vue-fullscreen/commit/37f07c81c1693443f50955514f117aafd564dfdc))
- present current Vue documentation as the default ([10009a3](https://github.com/mirari/vue-fullscreen/commit/10009a3f76a9c426549a0225f323f5d9888673ae))
- preserve custom domain and gh-pages publishing ([c440153](https://github.com/mirari/vue-fullscreen/commit/c440153d983f172dee0ef10cd4803296ef377562))
- rebuild documentation with VitePress and interactive examples ([cc33120](https://github.com/mirari/vue-fullscreen/commit/cc33120c7229d93c4a57721c771ba11a098993e1))
- replace placeholder charts with a fullscreen photo gallery ([46ab251](https://github.com/mirari/vue-fullscreen/commit/46ab251b8c84395b8e8d937e2833b67140d801f7))
- replace remote demo photos with optimized local gallery ([3410a80](https://github.com/mirari/vue-fullscreen/commit/3410a801262812ee20df36a7d33e37d5aecfe65d))
- restore original demo image service ([fc0e5a9](https://github.com/mirari/vue-fullscreen/commit/fc0e5a9bb637da1b6bbc65be3ea5dac49182d2a2))
- show gallery thumbnails only in fullscreen ([1bbfc47](https://github.com/mirari/vue-fullscreen/commit/1bbfc479e4e22a8a095b2a42e17bb6e50f84e48e))
- simplify homepage gallery and remove photo attribution text ([c66552d](https://github.com/mirari/vue-fullscreen/commit/c66552da9882c1ed8cf35757ba7ff90c5044423d))
- use v-viewer demo image sources in the fullscreen gallery ([b9446e4](https://github.com/mirari/vue-fullscreen/commit/b9446e4501c067184be417cd0cb00d551f760a75))

### Code Refactoring

- unify Vue fullscreen workspaces and modernize releases ([9b59359](https://github.com/mirari/vue-fullscreen/commit/9b5935989779660e07bedb1405a41d9cc69d281c))

### Build System

- upgrade pnpm to 12.14.0 ([dfb76df](https://github.com/mirari/vue-fullscreen/commit/dfb76dfc9d9190ebaca69d66e7e0af30d3ad8e41))
