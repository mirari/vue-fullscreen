<template>
  <div :style="isFullscreen?[wrapperStyle]:[]"
       :class="isFullscreen?[fullscreenClass]:[]"
       @click="shadeClick($event)"
  >
    <slot>
    </slot>
  </div>
</template>
<script>
  // These helper functions available only to our plugin scope.
  function supportFullScreen () {
    const doc = document.documentElement

    return ('requestFullscreen' in doc) ||
      ('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) ||
      ('webkitRequestFullScreen' in doc)
  }

  function requestFullScreen (elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(global.Element.ALLOW_KEYBOARD_INPUT)
    }
  }

  function fullScreenStatus () {
    return document.fullscreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen ||
      false
  }

  function cancelFullScreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }

  function onFullScreenEvent (callback) {
    document.addEventListener('fullscreenchange', callback)
    document.addEventListener('mozfullscreenchange', callback)
    document.addEventListener('webkitfullscreenchange', callback)
  }

  function offFullScreenEvent (callback) {
    document.removeEventListener('fullscreenchange', callback)
    document.removeEventListener('mozfullscreenchange', callback)
    document.removeEventListener('webkitfullscreenchange', callback)
  }

  export default {
    props: {
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
      }
    },

    data () {
      return {
        supportFullScreen: false,
        isFullscreen: false
      }
    },

    computed: {
      wrapperStyle () {
        return {
          'background': this.background,
          'overflow-y': 'auto',
          'width': '100%',
          'height': '100%'
        }
      }
    },

    methods: {
      toggle (value) {
        if (value === undefined) {
          // 如果已经是全屏状态，则退出
          if (fullScreenStatus()) {
            this.exit()
          } else {
            this.enter()
          }
        } else {
          value ? this.enter() : this.exit()
        }
      },
      enter () {
        if (!this.supportFullScreen) {
          return
        }
        onFullScreenEvent(this.fullScreenCallback)
        requestFullScreen(this.$el)
      },
      exit () {
        if (!this.supportFullScreen) {
          return
        }
        cancelFullScreen()
      },
      shadeClick (e) {
        if (e.target === this.$el) {
          this.exit()
        }
      },
      fullScreenCallback () {
        this.isFullscreen = fullScreenStatus()
        if (!this.isFullscreen) {
          // 退出全屏时解绑回调
          offFullScreenEvent(this.fullScreenCallback)
        }
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
      this.supportFullScreen = supportFullScreen()
    }
  }
</script>
