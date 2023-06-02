<template>
  <div>
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
    <div class="directive-fullscreen-wrapper">
      <button v-fullscreen="options" type="button" class="button">
        toggle
      </button>
      <img v-show="!fullscreen" :src="'//picsum.photos/640/360?random=3'">
      <img v-show="fullscreen" :src="'//picsum.photos/1280/720?random=3'">
    </div>
  </div>
</template>

<script>
import { directive } from '../../../src'

export default {
  name: 'DirectiveExample',
  directives: {
    fullscreen: directive,
  },
  data() {
    return {
      fullscreen: false,
      teleport: true,
      pageOnly: false,
    }
  },
  computed: {
    options() {
      return {
        callback: (isFullscreen) => {
          this.fullscreen = isFullscreen
        },
        target: '.directive-fullscreen-wrapper',
        pageOnly: this.pageOnly,
        teleport: this.teleport,
      }
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.directive-fullscreen-wrapper {
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
