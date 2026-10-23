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
  vm.$el.dispatchEvent(new MouseEvent('click'))
  expect(target.parentNode).toBe(document.body)
  vm.$destroy()
  expect(target.parentNode).toBe(parent)
  expect(fullscreen.isFullscreen).toBe(false)
  expect(vm.$fullscreen).toBe(fullscreen)
  expect(vm.$fullscreen.isSupported).toBe(false)
  await vm.$fullscreen.enter(target, { pageOnly: true })
  expect(vm.$fullscreen.element).toBe(target)
  await vm.$fullscreen.exit()
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
  expect(document.querySelector('#vue2-target')!.parentNode).toBe(document.body)
  document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
  await Vue.nextTick()
  expect(vm.active).toBe(false)
  expect(changes).toEqual([true, false])
  await child.enter()
  await Vue.nextTick()
  vm.visible = false
  await Vue.nextTick()
  expect(document.querySelector('#vue2-target')).toBeNull()
  vm.$destroy()
  vm.$el.remove()
})
