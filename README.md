# vue-fullscreen

A simple Vue.js component for fullscreen, based on [screenfull.js](https://github.com/sindresorhus/screenfull.js)

[![npm version](https://img.shields.io/npm/v/vue-fullscreen.svg)](https://www.npmjs.com/package/vue-fullscreen)
[![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/vue-fullscreen)

[![npm version](https://img.shields.io/npm/v/vue-fullscreen/next.svg)](https://www.npmjs.com/package/vue-fullscreen)
[![language](https://img.shields.io/badge/language-Vue3-brightgreen.svg)](https://www.npmjs.com/package/vue-fullscreen)

[![npm download](https://img.shields.io/npm/dw/vue-fullscreen.svg)](https://www.npmjs.com/package/vue-fullscreen)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)

## [vue-fullscreen for vue3](https://github.com/mirari/vue-fullscreen/tree/v3)

## [Live demo](http://mirari.github.io/vue-fullscreen/)

## Quick Example

- [Component](https://codepen.io/mirari/pen/MWprxEZ)
- [Api](https://codepen.io/mirari/pen/eYvyXGX)
- [Compatible handling in iPhone & Popups in fullscreen](https://codepen.io/mirari/pen/zYZpbEV)
- [Navigate to a new page without exiting fullscreen](https://codepen.io/mirari/pen/VwjyKPL)

## [中文文档](http://mirari.cc/2017/08/14/%E5%85%A8%E5%B1%8F%E5%88%87%E6%8D%A2%E7%BB%84%E4%BB%B6vue-fullscreen/)

## Support

[Supported browsers](http://caniuse.com/fullscreen)

**Note**: In order to use this package in Internet Explorer, you need a Promise polyfill.

**Note**: Safari is supported on desktop and iPad, but not on iPhone.

**Note:** Navigating to another page, changing tabs, or switching to another application using any application switcher (or Alt-Tab) will likewise exit full-screen mode.

[Learn more](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)

## Migration from <= 2.3.5

### Component

In general, you can simply switch the fullscreen state using two-way binding, so you don't have to call the component methods directly.

The `background` prop are removed, you can set it directly on the component

### Api

The `wrapper` and options such as `background` associated with it are removed, which has limited use cases, is not very customizable, and you can simply implement it yourself.

The method names are changed as follows:

| old        | new          |
| ---------- | ------------ |
| enter      | request      |
| support    | isEnabled    |
| getState() | isFullscreen |

## Installation

Install from NPM

```bash
npm install vue-fullscreen
```
## Usage

To use `vue-fullscreen`, simply import it, and call `Vue.use()` to install.

The component, directive and api will be installed together in the global.

```html
<template>
  <div>
    <!-- Component  -->
    <fullscreen v-model="fullscreen">
      content
    </fullscreen>
    <button type="button" @click="toggle" >Fullscreen</button>
    <!-- Api  -->
    <button type="button" @click="toggleApi" >FullscreenApi</button>
    <!-- Directive  -->
    <button type="button" v-fullscreen >FullscreenDirective</button>
  </div>
</template>
<script>
  import VueFullscreen from 'vue-fullscreen'
  import Vue from 'vue'
  Vue.use(VueFullscreen)
  export default {
    methods: {
      toggle () {
        this.fullscreen = !this.fullscreen
      },
      toggleApi () {
        this.$fullscreen.toggle()
      },
    },
    data() {
      return {
        fullscreen: false,
      }
    }
  }
</script>
```

**Caution:** Because of the browser security function, you can only call these methods by a user gesture(`click` or `keypress`).



### Usage of api

In your vue component, You can use `this.$fullscreen` to get the instance.

```javascript
this.$fullscreen.toggle()
```

Or you can just import the api method and call it.

```html
<template>
  <div>
    <div class="fullscreen-wrapper">
      Content
    </div>
    <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script>
import { api as fullscreen } from 'vue-fullscreen'
export default {
  methods: {
    async toggle () {
      await fullscreen.toggle(this.$el.querySelector('.fullscreen-wrapper'), {
        teleport: this.teleport,
        callback: (isFullscreen) => {
          //this.fullscreen = isFullscreen
        },
      })
      this.fullscreen = fullscreen.isFullscreen
    },
  },
  data() {
    return {
      fullscreen: false,
      teleport: true,
    }
  }
}
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

**Note:** Each of these methods returns a promise object, and you can get the state after the promise has been resolved, or you can pass a callback function in options to get.

```javascript
async toggle () {
  await this.$fullscreen.toggle()
  this.fullscreen = this.$fullscreen.isFullscreen
}
```


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

#### callback

- Type: `Function`
- Default: `null`

It will be called when the fullscreen mode changed.

#### fullscreenClass

- Type: `String`
- Default: `fullscreen`

The class will be added to target element when fullscreen mode is on.

#### pageOnly

- Type: `Boolean`
- Default: `false`

If `true`, only fill the page with current element.

**Note:** If the browser does not support full-screen Api, this option will be automatically enabled.

#### teleport

- Type: `Boolean`
- Default: `true`

If `true`, the target element will be appended to `document.body` when it is fullscreen.

This can avoid some pop-ups not being displayed.




## Use as directive

You can use `v-fullscreen` to make any element have the effect of switching to full screen with a click.

```html
<button v-fullscreen>FullScreen</button>
```
Or you can just import the directive and install it.

```html
<template>
  <div>
    <div class="fullscreen-wrapper">
      Content
    </div>
    <button type="button" v-fullscreen.teleport="options" >Fullscreen</button>
  </div>
</template>
<script>
import { directive as fullscreen } from 'vue-fullscreen'
export default {
  directives: {
    fullscreen
  },
  data() {
    return {
      options: {
        target: ".fullscreen-wrapper",
        callback (isFullscreen) {
          console.log(isFullscreen)
        },
      },
    }
  }
}
</script>
```

### Modifiers

#### pageOnly

only fill the page with current element.

#### teleport

the component will be appended to `document.body` when it is fullscreen.

This can avoid some pop-ups not being displayed.

### Options

#### target

- Type: `String | Element`
- Default: `document.body`

The element can be specified using a style selector string, equivalent to `document.querySelector(target)`. Note that when passing an element object directly, you need to make sure that the element already exists. The internal elements of the current component may not be initialized when the directive is initialized.

#### callback

- Type: `Function`
- Default: `null`

It will be called when the fullscreen mode changed.

#### fullscreenClass

- Type: `String`
- Default: `fullscreen`

The class will be added to target element when fullscreen mode is on.



## Use as component

You can simply import the component and register it locally.

```html
<template>
  <div>
    <fullscreen v-model="fullscreen" :teleport="teleport" :page-only="pageOnly" >
      Content
    </fullscreen>
    <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script>
  import { component } from 'vue-fullscreen'
  export default {
    components: {
      fullscreen: component,
    },
    methods: {
      toggle () {
        this.fullscreen = !this.fullscreen
      },
    },
    data() {
      return {
        fullscreen: false,
        teleport: true,
        pageOnly: false,
      }
    }
  }
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

```html
<template>
  <div>
    <!-- Component  -->
    <fs v-model="fullscreen" :teleport="teleport" :page-only="pageOnly" @change="fullscreenChange" >
      content
    </fs>
    <button type="button" @click="toggle" >Fullscreen</button>
    <!-- Api  -->
    <button type="button" @click="toggleApi" >FullscreenApi</button>
    <!-- Directive  -->
    <button type="button" v-fs.teleport >FullscreenDirective</button>
  </div>
</template>
<script>
import VueFullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(VueFullscreen, {name: 'fs'})
export default {
  methods: {
    toggle () {
      this.fullscreen = !this.fullscreen
    },
    toggleApi() {
      this.$fs.toggle()
    },
  },
  data() {
    return {
      fullscreen: false,
    }
  }
}
</script>
```
