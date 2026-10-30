# vue-fullscreen

[![npm version](https://img.shields.io/npm/v/vue-fullscreen?label=npm)](https://www.npmjs.com/package/vue-fullscreen)
[![npm legacy version](https://img.shields.io/npm/v/vue-fullscreen/legacy?label=Vue%202)](https://www.npmjs.com/package/vue-fullscreen?activeTab=versions)
[![npm downloads](https://img.shields.io/npm/dm/vue-fullscreen)](https://www.npmjs.com/package/vue-fullscreen)
[![CI](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml/badge.svg)](https://github.com/mirari/vue-fullscreen/actions/workflows/ci.yml)
[![Vue](https://img.shields.io/badge/Vue-3%20%7C%202-42b883?logo=vuedotjs)](https://vue-fullscreen.mirari.cc/en/guide/compatibility)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mirari/vue-fullscreen)](https://github.com/mirari/vue-fullscreen/stargazers)

Fullscreen for Vue, with native and page-only modes.

**[English documentation](https://vue-fullscreen.mirari.cc/en/)** · **[中文文档](https://vue-fullscreen.mirari.cc/)**

## Install

```sh
npm install vue-fullscreen         # Vue 3 (5.x)
npm install vue-fullscreen@legacy  # Vue 2 (4.x)
```

Supports Vue 3.0+ and Vue 2.4+. For upgrades from older major versions, see the [Vue 3 migration guide](https://vue-fullscreen.mirari.cc/en/guide/component#migration) or [Vue 2 migration guide](https://vue-fullscreen.mirari.cc/en/vue2/guide/component#migration).

## Quick start

Vue 3.2+:

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const isFullscreen = ref(false)
</script>

<template>
  <Fullscreen v-model="isFullscreen">
    <button @click="isFullscreen = !isFullscreen">Toggle fullscreen</button>
  </Fullscreen>
</template>
```

For Vue 2, directives, API usage and more examples, see the [Vue 3 guide](https://vue-fullscreen.mirari.cc/en/guide/getting-started) or [Vue 2 guide](https://vue-fullscreen.mirari.cc/en/vue2/).

## Star History

[![Star History Chart](https://fullscreen.star-history.com/svg?repos=mirari/vue-fullscreen&type=Date)](https://star-history.com/#mirari/vue-fullscreen&Date)

## License

[MIT](./LICENSE)
