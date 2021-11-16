import component from './component.vue'
import api from './api'
import directive from './directive'
import screenfull from 'screenfull'
import {extend} from './utils'

export {
  screenfull,
  api,
  directive,
  component
}

export default {
  install (Vue, opts = {}) {
    const name = opts.name || 'fullscreen'
    Vue.component(name, extend(component, { name }))
    Vue.prototype[`$${name}`] = api
    Vue.directive(name, directive)
  }
}
