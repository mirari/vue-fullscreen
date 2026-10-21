import { createApp, h, nextTick, ref } from 'vue'
import { expect, it } from 'vitest'
import { Fullscreen } from '../src/index'
it('syncs v-model, forwards attributes and cleans up teleport on unmount', async () => {
  const model = ref(false),
    visible = ref(true),
    changes: boolean[] = []
  const host = document.createElement('main')
  document.body.append(host)
  const app = createApp({
    render: () =>
      visible.value
        ? h(
            Fullscreen,
            {
              modelValue: model.value,
              'onUpdate:modelValue': (v: boolean) => {
                model.value = v
              },
              onChange: (v: boolean) => changes.push(v),
              pageOnly: true,
              teleport: true,
              id: 'vue3-target',
            },
            () => h('span', 'content'),
          )
        : null,
  })
  app.mount(host)
  model.value = true
  await nextTick()
  const node = document.querySelector('#vue3-target')!
  expect(node.parentNode).toBe(document.body)
  document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
  await nextTick()
  expect(model.value).toBe(false)
  expect(changes).toEqual([true, false])
  expect(node.parentNode).toBe(host)
  model.value = true
  await nextTick()
  visible.value = false
  await nextTick()
  expect(document.querySelector('#vue3-target')).toBeNull()
  app.unmount()
  host.remove()
})
