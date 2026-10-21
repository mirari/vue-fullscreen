import Vue from 'vue'

import { fullscreen, Fullscreen } from '../src/index'
import './style.css'
const options = new URLSearchParams(location.search)
const pageOnly = options.has('pageOnly')
const zh = options.get('lang') === 'zh'
const text = zh
  ? {
      title: 'Vue 2 全屏示例',
      help: '组件与 API 示例。按 Esc 退出。',
      enter: '进入组件全屏',
      content: '全屏内容',
      details: '详情',
      hiddenPopup:
        '弹窗已挂载到 body，但在当前原生全屏元素之外。退出并开启 teleport 后再试。',
      exit: '退出全屏',
      toggle: '切换 API 全屏',
      api: 'API 内容',
    }
  : {
      title: 'Vue 2 Fullscreen',
      help: 'Component and API examples. Use Escape to exit.',
      enter: 'Enter component fullscreen',
      content: 'Fullscreen content',
      details: 'Details',
      hiddenPopup:
        'The popup is mounted under body, outside the current native fullscreen element. Exit and enable teleport to see it.',
      exit: 'Exit',
      toggle: 'Toggle API fullscreen',
      api: 'API content',
    }
document.documentElement.lang = zh ? 'zh-CN' : 'en'

new Vue({
  data: { active: false, error: '', teleport: true, popup: false },
  watch: {
    popup(value: boolean) {
      const popup = document.querySelector<HTMLElement>('#body-popup')
      if (popup) popup.hidden = !value
    },
  },
  mounted() {
    const popup = document.createElement('aside')
    popup.id = 'body-popup'
    popup.hidden = true
    popup.setAttribute('role', 'dialog')
    popup.setAttribute('aria-label', text.details)
    popup.textContent = zh
      ? '这个弹窗直接挂载在 body 下。'
      : 'This popup is mounted directly under body.'
    const close = document.createElement('button')
    close.textContent = zh ? '关闭弹窗' : 'Close popup'
    close.onclick = () => {
      this.popup = false
    }
    popup.append(close)
    document.body.append(popup)
  },
  beforeDestroy() {
    document.querySelector('#body-popup')?.remove()
  },
  render(h) {
    return h('main', [
      h('h1', text.title),
      h('p', text.help),
      h('label', [
        h('input', {
          attrs: { type: 'checkbox', id: 'teleport', disabled: this.active },
          domProps: { checked: this.teleport },
          on: {
            change: (event: Event) => {
              this.teleport = (event.target as HTMLInputElement).checked
            },
          },
        }),
        'teleport',
      ]),
      h(
        'button',
        {
          attrs: { id: 'enter' },
          on: {
            click: () => {
              this.active = true
            },
          },
        },
        text.enter,
      ),
      h(
        Fullscreen,
        {
          attrs: { id: 'target' },
          props: { value: this.active, pageOnly, teleport: this.teleport },
          on: {
            input: (v: boolean) => {
              this.active = v
              if (!v) this.popup = false
            },
            error: (e: Error) => {
              this.error = e.message
            },
          },
        },
        [
          h('p', text.content),
          h(
            'button',
            {
              attrs: {
                id: 'popup',
                'aria-expanded': String(this.popup),
                'aria-controls': 'body-popup',
              },
              on: {
                click: () => {
                  this.popup = !this.popup
                },
              },
            },
            text.details,
          ),
          this.active && this.popup && !this.teleport && !pageOnly
            ? h('p', { attrs: { role: 'status' } }, text.hiddenPopup)
            : null,
          h(
            'button',
            {
              attrs: { id: 'exit' },
              on: {
                click: () => {
                  this.active = false
                },
              },
            },
            text.exit,
          ),
        ],
      ),
      h(
        'button',
        {
          attrs: { id: 'api' },
          on: {
            click: () =>
              fullscreen
                .toggle(document.querySelector('#api-target'), {
                  pageOnly,
                  teleport: true,
                })
                .catch((e) => {
                  this.error = e.message
                }),
          },
        },
        text.toggle,
      ),
      h('section', { attrs: { id: 'api-target' } }, text.api),
      h('output', { attrs: { id: 'state' } }, String(this.active)),
      h('p', { attrs: { role: 'alert' } }, this.error),
    ])
  },
}).$mount('#app')
