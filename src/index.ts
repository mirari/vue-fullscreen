import { App } from 'vue'
import defaults from 'lodash/defaults'
import screenfull from 'screenfull'
import component from './component.vue'
import directive from './directive'
import api from './api'

export interface InstallationOptions {
  name?: string
}

export {
  screenfull,
  api,
  component,
  directive,
}

export default {
  install(app: App, { name = 'fullscreen' }: InstallationOptions = {}) {
    app.config.globalProperties[`$${name}`] = api
    app.component(name, defaults(component, { name }))
    app.directive(name, directive)
  },
}
