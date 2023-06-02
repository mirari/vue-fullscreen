<template>
  <div ref="root">
    <label class="checkbox">
      <input
        v-model="pageOnly"
        type="checkbox"
        name="button"
      > pageOnly
    </label>
    <label class="checkbox">
      <input
        v-model="teleport"
        type="checkbox"
        name="button"
      > teleport
    </label>
    <div class="fullscreen-wrapper">
      <button type="button" class="button" @click="toggle">
        {{ fullscreen ? 'exit fullscreen' : 'request fullscreen' }}
      </button>
      <img v-show="!fullscreen" :src="'//picsum.photos/640/360?random=2'">
      <img v-show="fullscreen" :src="'//picsum.photos/1280/720?random=2'">
    </div>
  </div>
</template>

<script>
import { api as fullscreen } from '../../../src'

export default {
  name: 'ApiExample',
  data() {
    return {
      fullscreen: false,
      teleport: true,
      pageOnly: false,
    }
  },
  methods: {
    async toggle() {
      await fullscreen.toggle(this.$el.querySelector('.fullscreen-wrapper'), {
        teleport: this.teleport,
        pageOnly: this.pageOnly,
        callback: (isFullscreen) => {
          this.fullscreen = isFullscreen
          console.log(fullscreen.element)
          console.log(fullscreen.isFullscreen)
        },
      })
      this.fullscreen = fullscreen.isFullscreen
    },
  },
}
</script>

<style lang="scss" scoped>
.fullscreen-wrapper {
  width: 100%;
  height: 100%;
  background: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .button {
    margin-bottom: 20px;
  }
}
</style>
