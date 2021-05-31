import { createApp } from 'vue'
// import VueFullscreen from '../src'
import App from './App.vue'

import 'bulma/bulma.sass'

export const app = createApp(App)
// app.use(VueFullscreen)
app.mount('#app')
