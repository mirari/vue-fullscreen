import Vue from 'vue'
import { expect, it } from 'vitest'
import plugin, { component } from '../src/index'
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
                component,
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
  const child = vm.$refs.fullscreen as InstanceType<typeof component>
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
