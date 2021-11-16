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
    <div class="directive-fullscreen-wrapper">
      <button v-fullscreen="options" type="button" class="button">
        {{ fullscreen ? 'exit fullscreen' : 'request fullscreen' }}
      </button>
      <img v-show="!fullscreen" :src="'//picsum.photos/640/360?random=3'">
      <img v-show="fullscreen" :src="'//picsum.photos/1280/720?random=3'">
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  toRefs,
  reactive, computed,
} from 'vue'
import { component, directive as fullscreen } from '../../../src'

export default defineComponent({
  name: 'DirectiveExample',
  directives: {
    fullscreen,
  },
  setup() {
    const root = ref()
    const state = reactive({
      fullscreen: false,
      teleport: true,
      pageOnly: true,
    })
    const options = computed(() => {
      // 如果不支持浏览器全屏，改用网页全屏
      return {
        callback: (isFullscreen) => {
          state.fullscreen = isFullscreen
        },
        target: '.directive-fullscreen-wrapper',
        teleport: state.teleport,
        pageOnly: state.pageOnly,
      }
    })
    return {
      root,
      ...toRefs(state),
      options,
    }
  },
})
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
