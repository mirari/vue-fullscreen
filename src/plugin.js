import Component from './component.vue'
import service from './service'

export default {
  install (Vue, opts = {}) {
    const name = opts.name || 'fullscreen'
    Vue.component(name, Object.assign(Component, { name }))
    Vue.prototype[`$${name}`] = service
  }
}
