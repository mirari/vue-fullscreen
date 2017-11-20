import Component from './component.vue'
import service from './service'
import {extend} from './utils'

export default {
  install (Vue, opts = {}) {
    const name = opts.name || 'fullscreen'
    Vue.component(name, extend(Component, { name }))
    Vue.prototype[`$${name}`] = service
  }
}
