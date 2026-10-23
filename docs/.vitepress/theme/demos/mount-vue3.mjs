import { createApp } from 'vue'
import { createMount } from './mount.mjs'

export const mount = createMount((host, component) => {
  const app = createApp(component)
  app.mount(host)
  return () => {
    app.unmount()
  }
})
