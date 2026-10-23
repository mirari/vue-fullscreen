import { createApp, h, nextTick, ref } from 'vue'
import { expect, it } from 'vitest'
import { Fullscreen, useFullscreen } from '../src/index'
it('uses the same support flag and enter method as the composable', async () => {
  const host = document.createElement('main')
  document.body.append(host)
  const app = createApp({
    render: () => h(Fullscreen, { ref: 'panel', pageOnly: true }),
  })
  const root = app.mount(host)
  const panel = root.$refs.panel as InstanceType<typeof Fullscreen>
  const controls = useFullscreen()
  expect(panel.isSupported).toBe(controls.isSupported.value)
  await panel.enter()
  expect(panel.isFullscreen).toBe(true)
  await panel.exit()
  app.unmount()
  host.remove()
})
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
  expect(node.parentNode!.parentNode).toBe(document.body)
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
  expect(model.value).toBe(false)
  expect(changes).toEqual([true, false, true, false])
  visible.value = true
  await nextTick()
  expect(model.value).toBe(false)
  expect(document.querySelector('.fullscreen')).toBeNull()
  app.unmount()
  host.remove()
})

it.each([false, true])(
  'restores a conditional root before replacement and remount (element=%s)',
  async (replacement) => {
    const visible = ref(true),
      model = ref(false)
    const host = document.createElement('main')
    document.body.append(host)
    const app = createApp({
      render: () =>
        visible.value
          ? h(
              Fullscreen,
              {
                id: 'conditional-root',
                modelValue: model.value,
                'onUpdate:modelValue': (value: boolean) => {
                  model.value = value
                },
                pageOnly: true,
                teleport: true,
              },
              () => h('span', 'content'),
            )
          : replacement
            ? h('p', { id: 'replacement' }, 'other')
            : null,
    })
    app.mount(host)
    try {
      for (let cycle = 0; cycle < 3; cycle++) {
        model.value = true
        await nextTick()
        visible.value = false
        await nextTick()
        expect(model.value).toBe(false)
        expect(document.querySelector('#conditional-root')).toBeNull()
        expect(host.childNodes).toHaveLength(1)
        if (replacement)
          expect(host.querySelector('#replacement')).not.toBeNull()
        visible.value = true
        await nextTick()
        expect(document.querySelector('#conditional-root')!.parentNode).toBe(
          host,
        )
      }
    } finally {
      app.unmount()
      host.remove()
    }
  },
)
