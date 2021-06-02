# vue-fullscreen

A simple Vue.js component for fullscreen, based on [screenfull.js](https://github.com/sindresorhus/screenfull.js)

[![npm version](https://img.shields.io/npm/v/vue-fullscreen.svg)](https://www.npmjs.com/package/vue-fullscreen)
[![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/vue-fullscreen)

[![npm version](https://img.shields.io/npm/v/vue-fullscreen/next.svg)](https://www.npmjs.com/package/vue-fullscreen)
[![language](https://img.shields.io/badge/language-Vue3-brightgreen.svg)](https://www.npmjs.com/package/vue-fullscreen)

[![npm download](https://img.shields.io/npm/dw/vue-fullscreen.svg)](https://www.npmjs.com/package/vue-fullscreen)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)

## [vue-fullscreen for vue2](https://github.com/mirari/vue-fullscreen)

## [Live demo](http://mirari.github.io/vue3-fullscreen/)

## Quick Example

- [component](https://codepen.io/mirari/pen/LYWeNZM)
- [api](https://codepen.io/mirari/pen/abJENpa)
- [vue-fullscreen in iPhone & options](https://codepen.io/mirari/pen/abJEVNe)

## [中文文档](https://mirari.cc/2021/06/01/Vue3%E5%85%A8%E5%B1%8F%E5%88%87%E6%8D%A2%E7%BB%84%E4%BB%B6vue-fullscreen/)

## Browser support

[Full Screen API](http://caniuse.com/fullscreen)

## Installation

Install from NPM

```bash
npm install vue-fullscreen@next
```

## Usage

To use `vue-fullscreen`, simply import it, and call `app.use()` to install.

The component and api will be installed together in the global.

```ts
import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

export const app = createApp(App)
app.use(VueFullscreen)
app.mount('#app')

```

```vue
<template>
<div id="app" ref="root">
  <fullscreen v-model:fullscreen="fullscreen" :teleport="teleport" :page-only="pageOnly" >
    <div class="fullscreen-wrapper">
      <div>
        <button type="button" class="button" @click="toggle">
          {{ fullscreen ? 'exit fullscreen' : 'request fullscreen' }}
  </button>
        <button type="button" @click="toggleApi" >FullscreenApi</button>
  </div>
      <img v-show="!fullscreen" :src="'//picsum.photos/640/360?random=1'">
      <img v-show="fullscreen" :src="'//picsum.photos/1280/720?random=1'">
  </div>
  </fullscreen>
  </div>
</template>
<script lang="ts">
  import {
    ref,
    defineComponent,
    toRefs,
    reactive
  } from 'vue'
  export default defineComponent({
    methods: {
      toggleApi () {
        this.$fullscreen.toggle(this.$el.querySelector('.fullscreen-wrapper'), {
          teleport: this.teleport,
          callback: (isFullscreen) => {
            this.fullscreen = isFullscreen
          }
        })
      }
    },
    setup () {
      const root = ref()
      const state = reactive({
        fullscreen: false,
        teleport: true,
        pageOnly: false
      })
      function toggle () {
        state.fullscreen = !state.fullscreen
      }

      return {
        root,
        ...toRefs(state),
        toggle
      }
    }
  })
</script>
```

**Caution:** Because of the browser security function, you can only call these methods by a user gesture(`click` or `keypress`).

### Usage of api

In your vue component, You can use `this.$fullscreen` to get the instance.

Or you can just import the api method and call it.

```vue
<template>
<div ref="root" id="app">
  <div class="fullscreen-wrapper">
    Content
  </div>
  <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script lang="ts">
  import {
    ref,
    defineComponent,
    toRefs,
    reactive,
  } from 'vue'
  import { api as fullscreen } from 'vue-fullscreen'
  export default defineComponent({
    setup() {
      const root = ref()
      const state = reactive({
        fullscreen: false,
        teleport: true,
      })

      async function toggle () {
        fullscreen.toggle(root.value.querySelector('.fullscreen-wrapper'), {
          teleport: state.teleport,
          callback: (isFullscreen) => {
            state.fullscreen = isFullscreen
          },
        })
      }

      return {
        root,
        ...toRefs(state),
        toggle,
      }
    },
  })
</script>
```

### Methods & Attributes

#### toggle([target, options, force])

Toggle the fullscreen mode.

- **target**:
  - Type: `Element`
  - Default: `document.body`
  - The element target for fullscreen.
- **options** (optional):
  - Type: `Object`
  - The fullscreen options.
- **force** (optional):
  - Type: `Boolean`
  - Default: `undefined`
  - pass `true` to  force enter , `false` to exit fullscreen mode.



#### request([target, options])

enter the fullscreen mode.

- **target**:
  - Type: `Element`
  - Default: `document.body`
  - The element target for fullscreen.
- **options** (optional):
  - Type: `Object`
  - The fullscreen options.



#### exit()

exit the fullscreen mode.


#### isFullscreen

get the fullscreen state.

- Type: `Boolean`

**Caution:** The action is asynchronous, you can not get the expected state immediately following the calling method.

#### isEnabled

check browser support for the fullscreen API.

- Type: `Boolean`

#### element

get the fullscreen element.

- Type: `Element | null`


### Options

### callback

- Type: `Function`
- Default: `null`

It will be called when the fullscreen mode changed.

### fullscreenClass

- Type: `String`
- Default: `fullscreen`

The class will be added to target element when fullscreen mode is on.

#### pageOnly

- Type: `Boolean`
- Default: `false`

If `true`, only fill the page with current element.

**Note:** If the browser does not support full-screen Api, this option will be automatically enabled.

### teleport

- Type: `Boolean`
- Default: `true`

If `true`, the target element will be appended to `document.body` when it is fullscreen.

This can avoid some pop-ups not being displayed.


### Usage of component

You can simply import the component and register it locally too.

```vue
<template>
<div id="app">
  <fullscreen v-model:fullscreen="fullscreen" :teleport="teleport" :page-only="pageOnly" >
    Content
  </fullscreen>
  <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    toRefs,
    reactive,
  } from 'vue'
  import { component } from 'vue-fullscreen'

  export default defineComponent({
    name: 'ComponentExample',
    components: {
      fullscreen: component,
    },
    setup() {
      const state = reactive({
        fullscreen: false,
        teleport: true,
        pageOnly: false,
      })
      function toggle() {
        state.fullscreen = !state.fullscreen
      }

      return {
        ...toRefs(state),
        toggle,
      }
    },
  })
</script>
```

### Props

#### fullscreen-class

- Type: `String`
- Default: `fullscreen`

The class will be added to the component when fullscreen mode is on.

#### exit-on-click-wrapper

- Type: `Boolean`
- Default: `true`

If `true`, clicking wrapper will exit fullscreen.

#### page-only

- Type: `Boolean`
- Default: `false`

If `true`, only fill the page with current element.

**Note:** If the browser does not support full-screen Api, this option will be automatically enabled.

### teleport

- Type: `Boolean`
- Default: `true`

If `true`, the component will be appended to `document.body` when it is fullscreen.

This can avoid some pop-ups not being displayed.

### Events

#### change

- **isFullscreen**:  The current fullscreen state.

This event fires when the fullscreen mode changed.


## Plugin options

### name

- Type: `String`
- Default: `fullscreen`

If you need to avoid name conflict, you can import it like this:

```ts
import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'

export const app = createApp(App)
app.use(VueFullscreen, {
  name: 'fs',
})
app.mount('#app')

```

```vue
<template>
<div id="app" ref="root">
  <fs v-model:fullscreen="fullscreen" :teleport="teleport" :page-only="pageOnly" >
    <div class="fullscreen-wrapper">
      <div>
        <button type="button" class="button" @click="toggle">
          {{ fullscreen ? 'exit fullscreen' : 'request fullscreen' }}
  </button>
        <button type="button" @click="toggleApi" >FullscreenApi</button>
  </div>
      <img v-show="!fullscreen" :src="'//picsum.photos/640/360?random=1'">
      <img v-show="fullscreen" :src="'//picsum.photos/1280/720?random=1'">
  </div>
  </fs>
  </div>
</template>
<script lang="ts">
  import {
    ref,
    defineComponent,
    toRefs,
    reactive
  } from 'vue'
  export default defineComponent({
    methods: {
      toggleApi () {
        this.$fs.toggle(this.$el.querySelector('.fullscreen-wrapper'), {
          teleport: this.teleport,
          callback: (isFullscreen) => {
            this.fullscreen = isFullscreen
          }
        })
      }
    },
    setup () {
      const root = ref()
      const state = reactive({
        fullscreen: false,
        teleport: true,
        pageOnly: false
      })
      function toggle () {
        state.fullscreen = !state.fullscreen
      }

      return {
        root,
        ...toRefs(state),
        toggle
      }
    }
  })
</script>
```
