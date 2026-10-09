import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import FullscreenDemo from './FullscreenDemo.vue'
import TeleportDemo from './TeleportDemo.vue'
import Vue2Demo from './Vue2Demo.vue'
import './custom.css'
import { api } from 'vue-fullscreen'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('FullscreenDemo', FullscreenDemo)
    app.component('Vue2Demo', Vue2Demo)
    app.component('TeleportDemo', TeleportDemo)
    router.onBeforeRouteChange = async () => {
      if (api.isFullscreen) await api.exit()
    }
  },
} satisfies Theme
