import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import FullscreenDemo from './FullscreenDemo.vue'
import Vue2Demo from './Vue2Demo.vue'
import UsageDemo from './UsageDemo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FullscreenDemo', FullscreenDemo)
    app.component('Vue2Demo', Vue2Demo)
    app.component('UsageDemo', UsageDemo)
    app.component(
      'FullscreenPlayground',
      defineAsyncComponent(
        () => import('./playground/FullscreenPlayground.vue'),
      ),
    )
  },
} satisfies Theme
