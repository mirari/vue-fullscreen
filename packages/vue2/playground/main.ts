import Vue from 'vue'

import { api, component } from '../src/index'
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
      exit: '退出全屏',
      toggle: '切换 API 全屏',
      api: 'API 内容',
    }
  : {
      title: 'Vue 2 Fullscreen',
      help: 'Component and API examples. Use Escape to exit.',
      enter: 'Enter component fullscreen',
      content: 'Fullscreen content',
      exit: 'Exit',
      toggle: 'Toggle API fullscreen',
      api: 'API content',
    }
document.documentElement.lang = zh ? 'zh-CN' : 'en'

new Vue({
  data: { active: false, error: '', teleport: true },
  mounted() {
    const popup = document.createElement('aside')
    popup.id = 'body-popup'
    popup.hidden = true
    popup.textContent = zh
      ? '这个弹窗直接挂载在 body 下。'
      : 'This popup is mounted directly under body.'
    const close = document.createElement('button')
    close.textContent = zh ? '关闭弹窗' : 'Close popup'
    close.onclick = () => {
      popup.hidden = true
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
        component,
        {
          attrs: { id: 'target' },
          props: { value: this.active, pageOnly, teleport: this.teleport },
          on: {
            input: (v: boolean) => {
              this.active = v
              const popup = document.querySelector<HTMLElement>('#body-popup')
              if (popup) popup.hidden = true
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
              attrs: { id: 'popup' },
              on: {
                click: () => {
                  const popup =
                    document.querySelector<HTMLElement>('#body-popup')
                  if (popup) popup.hidden = !popup.hidden
                },
              },
            },
            zh ? '切换 body 弹窗' : 'Toggle body popup',
          ),
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
              api
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
