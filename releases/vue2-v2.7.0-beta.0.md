# vue2 2.7.0-beta.0

- Consolidate Vue 2 and Vue 3 development into one npm workspace with a shared fullscreen controller.
- Build ESM, CommonJS and browser UMD artifacts using Vite 8, with generated TypeScript declarations and Vue as a peer dependency.
- Restore DOM/styles after rejected requests and remove listeners and teleported nodes on component teardown.
- Preserve component/plugin/API/directive exports and existing model events.
- Replace legacy workflows with tested tarball publishing via npm OIDC and GitHub Releases.

This is a prerelease. Review CONTRIBUTING.md for changed direct bundle URLs, browser targets and supported peer versions.

- Target IE 11 with ES5 output and bundled runtime polyfills; support MS fullscreen success/error events and legacy DOM operations.
