import Vue from 'vue'
import { expect, it } from 'vitest'
import plugin, { Fullscreen, fullscreen, vFullscreen } from '../src/index'
it('cleans up the owning directive and keeps the plugin API usable', async () => {
  Vue.use(plugin)
  const parent = document.createElement('section')
  const target = document.createElement('div')
  parent.append(target)
  document.body.append(parent)
  const vm = new Vue({
    directives: { fullscreen: vFullscreen },
    render(h) {
      return h('button', {
        directives: [
          {
            name: 'fullscreen',
            value: { target, pageOnly: true, teleport: true },
          },
        ],
      })
    },
  }).$mount()
  const savedApi = vm.$fullscreen
  const { enter, exit } = savedApi
  vm.$el.dispatchEvent(new MouseEvent('click'))
  expect(target.parentNode!.parentNode).toBe(document.body)
  vm.$destroy()
  expect(target.parentNode).toBe(parent)
  expect(fullscreen.isFullscreen).toBe(false)
  expect(vm.$fullscreen).toBe(fullscreen)
  expect(vm.$fullscreen).toBe(savedApi)
  expect(vm.$fullscreen.isSupported).toBe(false)
  await enter(target, { pageOnly: true })
  expect(vm.$fullscreen.element).toBe(target)
  await exit()
  parent.remove()
})
it('preserves Vue 2 v-model, deprecated methods and destroys teleported nodes', async () => {
  Vue.use(plugin, { name: 'fs' })
  const host = document.createElement('main')
  document.body.append(host)
  const changes: boolean[] = []
  const vm = new Vue({
    data: { active: false, visible: true },
    render(h) {
      return h(
        'section',
        this.visible
          ? [
              h(
                Fullscreen,
                {
                  ref: 'fullscreen',
                  props: { value: this.active, pageOnly: true, teleport: true },
                  attrs: { id: 'vue2-target' },
                  on: {
                    input: (v: boolean) => {
                      this.active = v
                    },
                    change: (v: boolean) => changes.push(v),
                  },
                },
                [h('span', 'content')],
              ),
            ]
          : [],
      )
    },
  }).$mount(host)
  vm.active = true
  await Vue.nextTick()
  const child = vm.$refs.fullscreen as InstanceType<typeof Fullscreen>
  expect(child.isSupported).toBe(false)
  expect(child.getState()).toBe(true)
  expect(document.querySelector('#vue2-target')!.parentNode!.parentNode).toBe(
    document.body,
  )
  document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
  await Vue.nextTick()
  expect(vm.active).toBe(false)
  expect(changes).toEqual([true, false])
  await child.enter()
  await Vue.nextTick()
  vm.visible = false
  await Vue.nextTick()
  expect(document.querySelector('#vue2-target')).toBeNull()
  expect(vm.active).toBe(false)
  expect(changes).toEqual([true, false, true, false])
  vm.visible = true
  await Vue.nextTick()
  expect(document.querySelector('#vue2-target')!.parentNode).toBe(vm.$el)
  expect(document.querySelector('.fullscreen')).toBeNull()
  vm.$destroy()
  vm.$el.remove()
})

it.each([false, true])(
  'restores a conditional root before replacement and remount (element=%s)',
  async (replacement) => {
    const host = document.createElement('main')
    const mount = document.createElement('div')
    host.append(mount)
    document.body.append(host)
    const vm = new Vue({
      data: { visible: true, active: false },
      render(h) {
        return this.visible
          ? h(
              Fullscreen,
              {
                attrs: { id: 'conditional-root' },
                props: { value: this.active, pageOnly: true, teleport: true },
                on: {
                  input: (value: boolean) => {
                    this.active = value
                  },
                },
              },
              [h('span', 'content')],
            )
          : replacement
            ? h('p', { attrs: { id: 'replacement' } }, 'other')
            : h()
      },
    }).$mount(mount)
    try {
      for (let cycle = 0; cycle < 3; cycle++) {
        vm.active = true
        await Vue.nextTick()
        vm.visible = false
        await Vue.nextTick()
        expect(vm.active).toBe(false)
        expect(document.querySelector('#conditional-root')).toBeNull()
        expect(host.childNodes).toHaveLength(1)
        if (replacement)
          expect(host.querySelector('#replacement')).not.toBeNull()
        vm.visible = true
        await Vue.nextTick()
        expect(document.querySelector('#conditional-root')!.parentNode).toBe(
          host,
        )
      }
    } finally {
      vm.$destroy()
      vm.$el.remove()
      host.remove()
    }
  },
)
