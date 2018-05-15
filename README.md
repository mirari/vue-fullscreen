# vue-fullscreen
A simple Vue.js component for fullscreen

[![npm version](https://badge.fury.io/js/vue-fullscreen.svg)](https://badge.fury.io/js/vue-fullscreen)

## [Live demo](http://mirari.github.io/vue-fullscreen/)

## Quick Example
- [Usage with v-for](https://codepen.io/mirari/pen/LmJRxK)
- [Usage with modal](https://codepen.io/mirari/pen/vjzXJN)

## [中文文档](http://mirari.cc/2017/08/14/%E5%85%A8%E5%B1%8F%E5%88%87%E6%8D%A2%E7%BB%84%E4%BB%B6vue-fullscreen/)

## Browser support
[Full Screen API](http://caniuse.com/fullscreen)

## Installation 
Install from GitHub via NPM
```bash
npm install vue-fullscreen
```
## Usage

To use `vue-fullscreen`, simply import it, and call `Vue.use()` to install.

```html
<template>
  <div id="app">
    <fullscreen ref="fullscreen" @change="fullscreenChange">
      Content
    </fullscreen>
    <!--  deprecated
      <fullscreen :fullscreen.sync="fullscreen">
        Content
      </fullscreen>
    -->
    <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script>
  import fullscreen from 'vue-fullscreen'
  import Vue from 'vue'
  Vue.use(fullscreen)
  export default {
    methods: {
      toggle () {
        this.$refs['fullscreen'].toggle() // recommended
        // this.fullscreen = !this.fullscreen // deprecated
      },
      fullscreenChange (fullscreen) {
        this.fullscreen = fullscreen
      }
    },
    data() {
      return {
        fullscreen: false
      }
    }
  }
</script>
```

**Caution:** Because of the browser security function, you can only call these methods by a user gesture(`click` or `keypress`).

**Caution:** Since the prop watcher can not be a sync action now, the browser will intercept the subsequent operation of the callback. I recommend you to call the method directly by `refs` instead of changing the prop like the old version.

## Use as plugin
In your vue component, You can use `this.$fullscreen` to get the instance.

```html
<template>
  <div id="app">
    <div class="example">
      Content
    </div>
    <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script>
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(fullscreen)
export default {
  methods: {
    toggle () {
      this.$fullscreen.toggle(this.$el.querySelector('.example'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  data() {
    return {
      fullscreen: false
    }
  }
}
</script>
```



### Methods

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



#### enter([target, options])

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


#### getState()

get the fullscreen state.

- Type: `Boolean`

**Caution:** The action is asynchronous, you can not get the expected state immediately following the calling method.     


### Options

### callback

- Type: `Function`
- Default: `null`

It will be called when the fullscreen mode changed.

### fullscreenClass

- Type: `String`
- Default: `fullscreen`

The class will be added to target element when fullscreen mode is on.

### wrap

- Type: `Boolean`
- Default: `true`

If `true`, the target element will be wrapped up in a background `div`, and you can set the background color.

### background

- Type: `String`
- Default: `#333`

The background style of wrapper, only available when fullscreen mode is on and `wrap` is true.






## Use as component

 You can simply import the component and register it locally.

```html
<template>
  <div id="app">
    <fullscreen ref="fullscreen" @change="fullscreenChange">
      Content
    </fullscreen>
    <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script>
  import Fullscreen from "vue-fullscreen/src/component.vue"
  export default {
    components: {Fullscreen},
    methods: {
      toggle () {
        this.$refs['fullscreen'].toggle()
      },
      fullscreenChange (fullscreen) {
        this.fullscreen = fullscreen
      }
    },
    data() {
      return {
        fullscreen: false
      }
    }
  }
</script>
```



### Methods

#### toggle([force])

Toggle the fullscreen mode.You can pass `force` to force enter or exit fullscreen mode.

- **force** (optional):
  - Type: `Boolean`
  - Default: `undefined`
  - pass `true` to  force enter , `false` to exit fullscreen mode.

#### enter()

enter the fullscreen mode.

#### exit()

exit the fullscreen mode.

#### getState()

get the fullscreen state.

- Type: `Boolean`

**Caution:** The action is asynchronous, you can not get the expected state immediately following the calling method.




### Props

#### fullscreenClass

- Type: `String`
- Default: `fullscreen`

The class will be added to the component when fullscreen mode is on.

#### background

- Type: `String`
- Default: `#333`

The background style of component, only available when fullscreen mode is on.

### Events

#### change

- **isFullscreen**:  The current fullscreen state.

This event fires when the fullscreen mode changed.

## No conflict

If you need to avoid name conflict, you can import it like this:

```html
<template>
  <div id="app">
    <fs ref="fullscreen">
      Content
    </fs>
    <div class="example">
      Content
    </div>
    <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script>
import Fullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(Fullscreen, {name: 'fs'})
export default {
  methods: {
    toggle () {
      this.$refs['fullscreen'].toggle()
      this.$fs.toggle(this.$el.querySelector('.example'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  data() {
    return {
      fullscreen: false
    }
  }
}
</script>
```
