<template>
  <div ref="root">
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
      <img v-show="!fullscreen" src="//picsum.photos/640/360">
      <img v-show="fullscreen" src="//picsum.photos/1280/720">
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  toRefs,
  reactive,
} from 'vue'
import { api as fullscreen } from '../../../src'

export default defineComponent({
  name: 'ApiExample',
  setup() {
    const root = ref()
    const state = reactive({
      fullscreen: false,
      teleport: true,
    })
    async function toggle() {
      await fullscreen.toggle(root.value.querySelector('.fullscreen-wrapper'), {
        teleport: state.teleport,
        callback: (isFullscreen) => {
          state.fullscreen = isFullscreen
        },
      })
      state.fullscreen = fullscreen.isFullscreen
    }

    return {
      root,
      ...toRefs(state),
      toggle,
    }
  },
})
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
