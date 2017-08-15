# vue-fullscreen
A simple Vue.js component for fullscreen

[![npm version](https://badge.fury.io/js/vue-fullscreen.svg)](https://badge.fury.io/js/vue-fullscreen)

## [Live demo](http://mirari.github.io/vue-fullscreen/)


## Install & and Usage
Install from GitHub via NPM
```bash
npm install vue-fullscreen
```
To use the vue-fullscreen component in your templates, simply import it, and register it with your component.

```vue
<template>
  <div id="app">
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
      Content
    </fullscreen>
    <button type="button" @click="toggle" >Fullscreen</button>
  </div>
</template>
<script>
  import Fullscreen from "vue-fullscreen"
  export default {
    components: {Fullscreen},
    methods: {
      toggle () {
        this.$refs['fullscreen'].toggle()
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

**Caution:** Because of the browser security function, you can only call these methods by a user gesture. (*e.g.* a click callback)

## Available options

#### Methods

| Method name | Description                              | Arguments                 |
| ----------- | ---------------------------------------- | ------------------------- |
| toggle      | toggle the fullscreen mode. You can pass `value` to force enter or exit fullscreen mode | (value:Boolean)(optional) |
| enter       | enter the fullscreen mode               | none                      |
| exit        | exit the fullscreen mode               | none                      |

#### Props

| Option          | Description                              | Default value |
| --------------- | ---------------------------------------- | ------------- |
| fullscreen      | Use `.sync` to synchronize the parent's value. You can change it to toggle fullscreen mode too, but **cannot** work in Firefox, because it has stricter constraints with async operation.   | false         |
| background      | The background style of wrapper, only available for fullscreen mode | #333          |
| fullscreenClass | Similar to the former, the class will be added to the wrapper when fullscreen mode is on | 'fullscreen'  |

#### Events

| Event name | Description                              | Arguments              |
| ---------- | ---------------------------------------- | ---------------------- |
| change     | will be triggered when the fullscreen mode changed | (isFullscreen:boolean) |
