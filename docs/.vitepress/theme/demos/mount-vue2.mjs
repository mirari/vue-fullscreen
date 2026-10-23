import Vue from 'vue'
import { examples, styles } from 'virtual:fullscreen-examples'

const query = new URLSearchParams(location.search)
const syncTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}
try {
  syncTheme(parent.document.documentElement.classList.contains('dark'))
} catch {
  syncTheme(matchMedia('(prefers-color-scheme: dark)').matches)
}
addEventListener('message', (event) => {
  if (
    event.source === parent &&
    event.origin === location.origin &&
    event.data?.source === 'fullscreen-docs-theme' &&
    typeof event.data.dark === 'boolean'
  )
    syncTheme(event.data.dark)
})
const kind = ['component', 'directive', 'api'].includes(query.get('kind'))
  ? query.get('kind')
  : 'component'
const language = query.get('lang') === 'en' ? 'en' : 'zh'
document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'
const style = document.createElement('style')
style.textContent =
  styles +
  'body { margin: 0; } .page-only-control { display: none !important; }'
document.head.appendChild(style)
const component = examples[`${kind} ${language}`]
const originalData = component.data
new Vue({
  ...component,
  data() {
    return { ...originalData.call(this), pageOnly: query.has('pageOnly') }
  },
}).$mount('#app')
