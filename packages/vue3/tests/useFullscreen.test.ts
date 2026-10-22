import { createApp, h, ref, nextTick, isReadonly } from 'vue'
import { afterEach, expect, it, vi } from 'vitest'
import {
  Fullscreen,
  vFullscreen,
  component,
  directive,
  useFullscreen,
} from '../src/index'
import * as exports from '../src/index'

const native = vi.hoisted(() => ({
  enabled: false,
  element: null as Element | null,
  fail: false,
  listeners: new Set<() => void>(),
}))
vi.mock('screenfull', () => ({
  default: {
    get isEnabled() {
      return native.enabled
    },
    get isFullscreen() {
      return !!native.element
    },
    get element() {
      return native.element
    },
    on: (_: string, listener: () => void) => native.listeners.add(listener),
    off: (_: string, listener: () => void) => native.listeners.delete(listener),
    request: vi.fn(async (target: Element) => {
      if (native.fail) throw new Error('Permission denied')
      native.element = target
      native.listeners.forEach((listener) => listener())
    }),
    exit: vi.fn(async () => {
      native.element = null
      native.listeners.forEach((listener) => listener())
    }),
  },
}))
afterEach(() => {
  native.enabled = false
  native.element = null
  native.fail = false
  native.listeners.clear()
  document.body.innerHTML = ''
})

it('exports descriptive names with compatible aliases', () => {
  expect(Fullscreen).toBe(component)
  expect(vFullscreen).toBe(directive)
  expect(exports).not.toHaveProperty('fullscreen')
  expect(exports).not.toHaveProperty('api')
})

it('resolves template refs and reactive options when entering and reacts to Escape', async () => {
  const target = ref<HTMLElement>()
  const teleport = ref(false)
  const controls = useFullscreen(target, { pageOnly: true, teleport })
  const parent = document.createElement('section')
  document.body.append(parent)
  target.value = document.createElement('div')
  parent.append(target.value)
  expect(isReadonly(controls.isFullscreen)).toBe(true)
  expect(controls.isSupported.value).toBe(false)
  await controls.enter()
  expect(controls.isFullscreen.value).toBe(true)
  expect(target.value.parentNode).toBe(parent)
  document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
  expect(controls.isFullscreen.value).toBe(false)
  teleport.value = true
  await controls.toggle()
  expect(target.value.parentNode).toBe(document.body)
  await controls.toggle()
  expect(controls.isFullscreen.value).toBe(false)
  expect(target.value.parentNode).toBe(parent)
})

it('uses the body by default and isolates page-only controllers', async () => {
  const first = useFullscreen(undefined, { pageOnly: true })
  const node = document.createElement('div')
  document.body.append(node)
  const second = useFullscreen(() => node, { pageOnly: () => true })
  await first.enter()
  await second.enter()
  await second.exit()
  expect(first.isFullscreen.value).toBe(true)
  expect(second.isFullscreen.value).toBe(false)
  await first.exit()
  expect(document.body.style.position).toBe('')
})

it('rejects an unmounted template ref and supports component refs after mount', async () => {
  const target = ref<{ $el: HTMLElement } | null>(null)
  const controls = useFullscreen(target, { pageOnly: true })
  await expect(controls.enter()).rejects.toThrow('HTML element')
  expect(controls.isFullscreen.value).toBe(false)
  expect(document.body.classList.contains('fullscreen')).toBe(false)
  const node = document.createElement('div')
  document.body.append(node)
  target.value = { $el: node }
  await controls.enter()
  expect(node.classList.contains('fullscreen')).toBe(true)
  await controls.exit()
})

it.each(['panel', '#panel'])(
  'resolves %s at entry and requests native fullscreen synchronously',
  async (id) => {
    native.enabled = true
    const controls = useFullscreen(id)
    await expect(controls.enter()).rejects.toThrow('target not found')
    const node = document.createElement('div')
    node.id = 'panel'
    document.body.append(node)
    const entered = controls.enter()
    expect(native.element).toBe(node)
    await entered
    expect(controls.isFullscreen.value).toBe(true)
    await controls.exit()
  },
)

it.each([false, true])(
  'tracks native exits and restores the target with teleport=%s',
  async (teleport) => {
    native.enabled = true
    const parent = document.createElement('section')
    const node = document.createElement('div')
    parent.append(node)
    document.body.append(parent)
    const controls = useFullscreen(node, { teleport })
    expect(controls.isSupported.value).toBe(true)
    await controls.enter()
    expect(native.element).toBe(teleport ? document.body : node)
    expect(controls.isFullscreen.value).toBe(true)
    native.element = null
    native.listeners.forEach((listener) => listener())
    expect(controls.isFullscreen.value).toBe(false)
    expect(node.parentNode).toBe(parent)
    expect(native.listeners.size).toBe(0)
  },
)

it('rolls back a rejected request and can retry', async () => {
  native.enabled = true
  native.fail = true
  const parent = document.createElement('section')
  const node = document.createElement('div')
  parent.append(node)
  document.body.append(parent)
  const controls = useFullscreen(node, { teleport: true })
  await expect(controls.enter()).rejects.toThrow('Permission denied')
  expect(controls.isFullscreen.value).toBe(false)
  expect(node.parentNode).toBe(parent)
  expect(node.style.position).toBe('')
  native.fail = false
  await controls.enter()
  expect(controls.isFullscreen.value).toBe(true)
  await controls.exit()
})

it('restores teleported nodes before unmount and disposes its controller', async () => {
  const host = document.createElement('main')
  document.body.append(host)
  let controls!: ReturnType<typeof useFullscreen>
  const app = createApp({
    setup() {
      const target = ref<HTMLElement>()
      controls = useFullscreen(target, { pageOnly: true, teleport: true })
      return () => h('div', { ref: target, id: 'composable-target' })
    },
  })
  app.mount(host)
  await controls.enter()
  expect(document.querySelector('body > #composable-target')).not.toBeNull()
  app.unmount()
  await nextTick()
  expect(controls.isFullscreen.value).toBe(false)
  expect(document.querySelector('#composable-target')).toBeNull()
  await expect(controls.enter()).rejects.toThrow('disposed')
})
