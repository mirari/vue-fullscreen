import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import FullscreenDemo from './FullscreenDemo.vue'
import './custom.css'
import { api } from 'vue-fullscreen'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('FullscreenDemo', FullscreenDemo)
    router.onBeforeRouteChange = async () => {
      if (api.isFullscreen) await api.exit()
    }
  },
} satisfies Theme
