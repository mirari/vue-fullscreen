# Changelog

Vue 2 releases from the v4 rewrite. Legacy release history is intentionally excluded.

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
