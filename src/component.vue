<template>
  <teleport to="body" :disabled="!teleport || !fullscreen">
    <div
      ref="wrapper"
      v-bind="$attrs"
      :style="wrapperStyle"
      :class="{[fullscreenClass]: isFullscreen}"
      @click="shadeClick($event)"
      @keyup="exit"
    >
      <slot />
    </div>
  </teleport>
</template>
<script lang="ts">
import {
  ref,
  computed,
  watch,
  defineComponent, toRefs, reactive, CSSProperties,
} from 'vue'
import screenfull, { Screenfull } from 'screenfull'

const sf = screenfull as Screenfull

export default defineComponent({
  props: {
    fullscreen: {
      type: Boolean,
      default: false,
    },
    exitOnClickWrapper: {
      type: Boolean,
      default: true,
    },
    fullscreenClass: {
      type: String,
      default: 'fullscreen',
    },
    pageOnly: {
      type: Boolean,
      default: false,
    },
    teleport: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'update:fullscreen'],
  setup(props, { emit }) {
    const wrapper = ref()

    const state = reactive({
      isFullscreen: false,
      isEnabled: sf.isEnabled,
    })

    const wrapperStyle = computed(() => {
      return props.teleport && state.isFullscreen
        ? {
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
        } as CSSProperties
        : undefined
    })

    const isPageOnly = computed(() => {
      // 如果不支持浏览器全屏，改用网页全屏
      return props.pageOnly || !sf.isEnabled
    })

    // isFullscreen变化时，上报事件
    function onChangeFullScreen() {
      emit('change', state.isFullscreen)
      emit('update:fullscreen', state.isFullscreen)
    }
    // 全屏api事件回调
    function fullScreenCallback() {
      if (!sf.isFullscreen) {
        sf.off('change', fullScreenCallback)
      }
      state.isFullscreen = sf.isFullscreen
      onChangeFullScreen()
    }
    // 按键回调
    function keypressCallback(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        exit()
      }
    }

    function toggle(value?: Boolean) {
      if (value === undefined) {
        // 如果已经是全屏状态，则退出
        if (state.isFullscreen) {
          exit()
        }
        else {
          request()
        }
      }
      else {
        value ? request() : exit()
      }
    }

    function request() {
      if (isPageOnly.value) {
        state.isFullscreen = true
        onChangeFullScreen()
        document.removeEventListener('keyup', keypressCallback)
        document.addEventListener('keyup', keypressCallback)
      }
      else {
        sf.off('change', fullScreenCallback)
        sf.on('change', fullScreenCallback)
        sf.request(props.teleport ? document.body : wrapper.value)
      }
    }

    function exit() {
      if (!state.isFullscreen) {
        return
      }
      if (isPageOnly.value) {
        state.isFullscreen = false
        onChangeFullScreen()
        document.removeEventListener('keyup', keypressCallback)
      }
      else {
        sf.exit()
      }
    }

    function shadeClick(e: Event) {
      if (e.target === wrapper.value) {
        if (props.exitOnClickWrapper) {
          exit()
        }
      }
    }

    // watch effect
    watch(() => props.fullscreen, (value) => {
      if (value !== state.isFullscreen) {
        value ? request() : exit()
      }
    })

    return {
      wrapper,
      wrapperStyle,
      ...toRefs(state),
      toggle,
      request,
      exit,
      shadeClick,
    }
  },
})
</script>
