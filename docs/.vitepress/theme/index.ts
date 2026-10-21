import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import FullscreenDemo from './FullscreenDemo.vue'
import Vue2Demo from './Vue2Demo.vue'
import './custom.css'
import { fullscreen } from 'vue-fullscreen'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('FullscreenDemo', FullscreenDemo)
    app.component('Vue2Demo', Vue2Demo)
    router.onBeforeRouteChange = async () => {
      if (fullscreen.isFullscreen) await fullscreen.exit()
    }
  },
} satisfies Theme
