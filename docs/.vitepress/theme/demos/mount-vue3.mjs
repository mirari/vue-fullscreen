import { createApp } from 'vue'
import { examples, styles } from 'virtual:fullscreen-examples'

export function mount(host, kind, english) {
  const style = document.createElement('style')
  style.textContent = styles
  document.head.appendChild(style)
  const app = createApp(examples[`${kind} ${english ? 'en' : 'zh'}`])
  app.mount(host)
  return () => {
    app.unmount()
    style.remove()
  }
}
