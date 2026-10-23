import Vue from 'vue'
import { createMount } from './mount.mjs'

export const mount = createMount((host, component) => {
  // Vue 2 replaces its mount element; keep the documentation-owned host intact.
  const container = document.createElement('div')
  host.appendChild(container)
  const app = new Vue(component).$mount(container)
  return () => {
    const target = app.$refs.target?.$el ?? app.$refs.target
    if (app.$fullscreen.element === target) app.$fullscreen.dispose()
    app.$destroy()
    app.$el.remove()
  }
})
