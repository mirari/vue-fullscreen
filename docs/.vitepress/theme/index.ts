import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import FullscreenDemo from './FullscreenDemo.vue'
import UsageDemo from './UsageDemo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FullscreenDemo', FullscreenDemo)
    app.component('UsageDemo', UsageDemo)
    app.component(
      'FullscreenPlayground',
      defineAsyncComponent(
        () => import('./playground/FullscreenPlayground.vue'),
      ),
    )
  },
} satisfies Theme
