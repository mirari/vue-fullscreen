<template>
  <div
    ref="wrapper"
    v-bind="$attrs"
    :style="wrapperStyle"
    :class="{[fullscreenClass]: isFullscreen}"
    @click="shadeClick($event)"
  >
    <slot />
  </div>
</template>
<script>
import sf from 'screenfull'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    /**
     * @deprecated
     */
    fullscreen: {
      type: Boolean,
      default: false
    },
    exitOnClickWrapper: {
      type: Boolean,
      default: true
    },
    fullscreenClass: {
      type: String,
      default: 'fullscreen'
    },
    pageOnly: {
      type: Boolean,
      default: false
    },
    teleport: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isFullscreen: false,
      isEnabled: false
    }
  },

  computed: {
    support () {
      return this.isEnabled
    },
    isPageOnly () {
      // 如果不支持浏览器全屏，改用网页全屏
      return this.pageOnly || !sf.isEnabled
    },
    wrapperStyle () {
      return (this.isPageOnly || this.teleport) && this.isFullscreen
        ? {
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%'
        }
        : undefined
    }
  },

  methods: {
    toggle (value) {
      if (value === undefined) {
        // 如果已经是全屏状态，则退出
        if (this.isFullscreen) {
          this.exit()
        } else {
          this.request()
        }
      } else {
        value ? this.request() : this.exit()
      }
    },
    request () {
      if (this.isPageOnly) {
        this.isFullscreen = true
        this.onChangeFullScreen()
        document.removeEventListener('keyup', this.keypressCallback)
        document.addEventListener('keyup', this.keypressCallback)
      } else {
        sf.off('change', this.fullScreenCallback)
        sf.on('change', this.fullScreenCallback)
        sf.request(this.teleport ? document.body : this.$el)
      }
      if (this.teleport) {
        // teleport：将目标元素挪到body下，并在原地留一个标记用于还原
        if (this.$el.parentNode === document.body) {
          return
        }
        this.__parentNode = this.$el.parentNode
        this.__token = document.createComment('fullscreen-token')
        this.__parentNode.insertBefore(this.__token, this.$el)
        document.body.appendChild(this.$el)
      }
    },
    exit () {
      if (!this.isFullscreen) {
        return
      }
      if (this.isPageOnly) {
        this.isFullscreen = false
        this.onChangeFullScreen()
        document.removeEventListener('keyup', this.keypressCallback)
      } else {
        sf.exit()
      }
    },
    shadeClick (e) {
      if (e.target === this.$el) {
        if (this.exitOnClickWrapper) {
          this.exit()
        }
      }
    },
    // 全屏api事件回调
    fullScreenCallback () {
      if (!sf.isFullscreen) {
        sf.off('change', this.fullScreenCallback)
      }
      this.isFullscreen = sf.isFullscreen
      this.onChangeFullScreen()
    },
    // 按键回调
    keypressCallback (e) {
      if (e.key === 'Escape') {
        this.exit()
      }
    },
    // isFullscreen变化时，上报事件
    onChangeFullScreen () {
      if (!this.isFullscreen) {
        if (this.teleport && this.__parentNode) {
          // 还原位置
          this.__parentNode.insertBefore(this.$el, this.__token)
          this.__parentNode.removeChild(this.__token)
        }
      }
      this.$emit('change', this.isFullscreen)
      this.$emit('update:fullscreen', this.isFullscreen)
      this.$emit('input', this.isFullscreen)
    },
    enter () {
      this.request()
    },
    getState () {
      return this.isFullscreen
    }
  },

  watch: {
    value (value) {
      if (value !== this.isFullscreen) {
        value ? this.request() : this.exit()
      }
    },
    fullscreen (value) {
      if (value !== this.isFullscreen) {
        value ? this.request() : this.exit()
      }
    }
  },

  created () {
    this.isEnabled = sf.isEnabled
  }
}
</script>
