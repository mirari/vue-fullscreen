# vue-fullscreen
A simple Vue.js component for fullscreen


# Install & and Usage
Install from GitHub via NPM
```bash
npm install mirari/vue-fullscreen
```
To use the vue-fullscreen component in your templates, simply import it, and register it with your component.

```vue
<template>
  <div id="app">
    <fullscreen :fullscreen.sync="fullscreen">
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
        this.fullscreen = !this.fullscreen
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

**Caution:** Because of the browser security function, you can only set the `fullscreen` property by a user gesture. (*e.g.* a click callback)

#Available options
#### Props

| Option          | Description                              | Default value |
| --------------- | ---------------------------------------- | ------------- |
| fullscreen      | Just change it to toggle fullscreen mode. Use `.sync` to synchronize the parent's value | false         |
| background      | The background style of wrapper, only available for fullscreen mode | #333          |
| fullscreenClass | Similar to the former, the class will be added to the wrapper when fullscreen mode is on | 'fullscreen'  |

#### Events

| Event name | Description                              | Arguments              |
| ---------- | ---------------------------------------- | ---------------------- |
| change     | will be triggered when the fullscreen mode changed | (isFullscreen:boolean) |

#### Methods

Except for the `.sync` modifier, you can call these methods after getting components by `refs`.

| Method name | Description                              | Arguments                 |
| ----------- | ---------------------------------------- | ------------------------- |
| toggle      | toggle the fullscreen mode. You can pass `value` to force enter or exit fullscreen mode | (value:Boolean)(optional) |
| enter       | toggle the fullscreen mode               | none                      |
| exit        | toggle the fullscreen mode               | none                      |
