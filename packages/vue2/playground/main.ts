import Vue from 'vue'

import { api, component } from '../src/index'
import './style.css'
const options = new URLSearchParams(location.search)
const pageOnly = options.has('pageOnly')

new Vue({
  data: { active: false, error: '' },
  render(h) {
    return h('main', [
      h('h1', 'Vue 2 Fullscreen'),
      h('p', 'Component and API examples. Use Escape to exit.'),
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
        'Enter component fullscreen',
      ),
      h(
        component,
        {
          attrs: { id: 'target' },
          props: { value: this.active, pageOnly, teleport: true },
          on: {
            input: (v: boolean) => {
              this.active = v
            },
            error: (e: Error) => {
              this.error = e.message
            },
          },
        },
        [
          h('p', 'Fullscreen content'),
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
            'Exit',
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
        'Toggle API fullscreen',
      ),
      h('section', { attrs: { id: 'api-target' } }, 'API content'),
      h('output', { attrs: { id: 'state' } }, String(this.active)),
      h('p', { attrs: { role: 'alert' } }, this.error),
    ])
  },
}).$mount('#app')
