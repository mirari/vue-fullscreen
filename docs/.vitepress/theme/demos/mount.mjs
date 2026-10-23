import { examples, styles } from 'virtual:fullscreen-examples'

export function createMount(mountComponent) {
  return (host, kind, english, comparison) => {
    const style = document.createElement('style')
    style.textContent = styles
    document.head.appendChild(style)
    try {
      const component =
        examples[
          `${kind} ${english ? 'en' : 'zh'}${comparison ? ` ${comparison}` : ''}`
        ]
      const unmount = mountComponent(host, component)
      return () => {
        try {
          unmount()
        } finally {
          style.remove()
        }
      }
    } catch (error) {
      style.remove()
      throw error
    }
  }
}
