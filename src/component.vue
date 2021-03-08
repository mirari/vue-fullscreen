<template>
  <div :style="wrapperStyle"
       :class="wrapperClass"
       @click="shadeClick($event)"
  >
    <slot>
    </slot>
  </div>
</template>
<script>
  import {supportFullScreen, fullScreenStatus, requestFullscreen, exitFullscreen, onFullScreenEvent, offFullScreenEvent} from './utils'

  export default {
    props: {
      exitOnClickWrapper: {
        type: Boolean,
        default: true
      },
      background: {
        type: String,
        default: '#333'
      },
      fullscreenClass: {
        type: String,
        default: 'fullscreen'
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
      pageOnly: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        support: false,
        isFullscreen: false
      }
    },

    computed: {
      isPageOnly () {
        return this.pageOnly || !this.support
      },
      wrapperClass () {
        const wrapperClass = []
        if (this.isFullscreen) {
          wrapperClass.push(this.fullscreenClass)
        }
        return wrapperClass
      },
      wrapperStyle () {
        let wrapperStyle = {}
        if (this.isFullscreen) {
          wrapperStyle = {
            'background': this.background,
            'overflow-y': 'auto',
            'width': '100%',
            'height': '100%'
          }
          if (this.isPageOnly) {
            wrapperStyle['position'] = 'fixed !important'
            wrapperStyle['z-index'] = '100000 !important'
            wrapperStyle['left'] = '0'
            wrapperStyle['top'] = '0'
            wrapperStyle['width'] = '100% !important'
            wrapperStyle['height'] = '100% !important'
          }
        }
        return wrapperStyle
      }
    },

    methods: {
      toggle (value) {
        if (value === undefined) {
          // 如果已经是全屏状态，则退出
          if (this.getState()) {
            this.exit()
          } else {
            this.enter()
          }
        } else {
          value ? this.enter() : this.exit()
        }
      },
      enter () {
        if (this.isPageOnly) {
          this.isFullscreen = true
          this.onChangeFullScreen()
        } else {
          onFullScreenEvent(this.fullScreenCallback)
          requestFullscreen(this.$el)
        }
      },
      exit () {
        if (!this.getState()) {
          return
        }
        if (this.isPageOnly) {
          this.isFullscreen = false
          this.onChangeFullScreen()
        } else {
          exitFullscreen()
        }
      },
      getState () {
        if (this.isPageOnly) {
          return this.isFullscreen
        }
        return fullScreenStatus()
      },
      shadeClick (e) {
        if (e.target === this.$el) {
          if (this.exitOnClickWrapper) {
            this.exit()
          }
        }
      },
      fullScreenCallback () {
        this.isFullscreen = fullScreenStatus()
        if (!this.isFullscreen) {
          // 退出全屏时解绑回调
          offFullScreenEvent(this.fullScreenCallback)
        }
        this.onChangeFullScreen()
      },
      onChangeFullScreen () {
        this.$emit('change', this.isFullscreen)
        this.$emit('update:fullscreen', this.isFullscreen)
      }
    },

    watch: {
      fullscreen (value) {
        if (value !== fullScreenStatus()) {
          value ? this.enter() : this.exit()
        }
      }
    },

    created () {
      this.support = supportFullScreen()
    }
  }
</script>
