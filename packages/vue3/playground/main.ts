import { createApp, h, ref } from 'vue'

import { api, component } from '../src/index'
import './style.css'
const options = new URLSearchParams(location.search)
const pageOnly = options.has('pageOnly')

createApp({
  setup() {
    const active = ref(false)
    const error = ref('')
    return () =>
      h('main', [
        h('h1', 'Vue 3 Fullscreen'),
        h('p', 'Component and API examples. Use Escape to exit.'),
        h(
          'button',
          {
            id: 'enter',
            onClick: () => {
              active.value = true
            },
          },
          'Enter component fullscreen',
        ),
        h(
          component,
          {
            id: 'target',
            modelValue: active.value,
            'onUpdate:modelValue': (v: boolean) => {
              active.value = v
            },
            pageOnly,
            teleport: true,
            onError: (e: unknown) => {
              error.value = e instanceof Error ? e.message : String(e)
            },
          },
          () => [
            h('p', 'Fullscreen content'),
            h(
              'button',
              {
                id: 'exit',
                onClick: () => {
                  active.value = false
                },
              },
              'Exit',
            ),
          ],
        ),
        h(
          'button',
          {
            id: 'api',
            onClick: () =>
              api
                .toggle(document.querySelector('#api-target'), {
                  pageOnly,
                  teleport: true,
                })
                .catch((e) => {
                  error.value = e instanceof Error ? e.message : String(e)
                }),
          },
          'Toggle API fullscreen',
        ),
        h('section', { id: 'api-target' }, 'API content'),
        h('output', { id: 'state' }, String(active.value)),
        h('p', { role: 'alert' }, error.value),
      ])
  },
}).mount('#app')
