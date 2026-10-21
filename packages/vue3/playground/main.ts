import { createApp, h, ref } from 'vue'

import { Fullscreen, useFullscreen } from '../src/index'
import './style.css'
const options = new URLSearchParams(location.search)
const pageOnly = options.has('pageOnly')

createApp({
  setup() {
    const active = ref(false)
    const error = ref('')
    const apiTarget = ref<HTMLElement>()
    const controls = useFullscreen(apiTarget, { pageOnly, teleport: true })
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
          Fullscreen,
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
              controls.toggle().catch((e) => {
                error.value = e instanceof Error ? e.message : String(e)
              }),
          },
          'Toggle API fullscreen',
        ),
        h('section', { id: 'api-target', ref: apiTarget }, [
          h('p', 'API content'),
          h('button', { onClick: controls.exit }, 'Exit API'),
        ]),
        h('output', { id: 'state' }, String(active.value)),
        h('p', { role: 'alert' }, error.value),
      ])
  },
}).mount('#app')
