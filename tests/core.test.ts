import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  api,
  bindDirective,
  createFullscreen,
  unbindDirective,
} from '../packages/core/src/index'
import screenfull from 'screenfull'

const native = vi.hoisted(() => ({
  enabled: false,
  element: null as Element | null,
  listeners: new Set<() => void>(),
  fail: false,
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
    on: (_: string, callback: () => void) => native.listeners.add(callback),
    off: (_: string, callback: () => void) => native.listeners.delete(callback),
    request: vi.fn(async (node: Element) => {
      if (native.fail) throw new Error('Permission denied')
      native.element = node
      native.listeners.forEach((callback) => callback())
    }),
    exit: vi.fn(async () => {
      native.element = null
      native.listeners.forEach((callback) => callback())
    }),
  },
}))
afterEach(async () => {
  await api.exit()
  native.enabled = false
  native.element = null
  native.fail = false
  native.listeners.clear()
  document.body.innerHTML = ''
})
function target() {
  document.body.innerHTML =
    '<section><div id="target" style="position: relative !important; color: red" class="existing"></div><span></span></section>'
  return document.querySelector<HTMLElement>('#target')!
}
describe('fullscreen lifecycle', () => {
  it('restores teleported position, inline priorities and existing classes', async () => {
    const node = target(),
      parent = node.parentNode,
      api = createFullscreen(),
      callback = vi.fn()
    await api.request(node, {
      teleport: true,
      pageOnly: true,
      fullscreenClass: 'existing overlay',
      callback,
    })
    expect(node.parentNode).toBe(document.body)
    expect(node.style.position).toBe('fixed')
    await api.exit()
    expect(node.parentNode).toBe(parent)
    expect(parent!.firstChild).toBe(node)
    expect(node.style.position).toBe('relative')
    expect(node.style.getPropertyPriority('position')).toBe('important')
    expect(node.style.color).toBe('red')
    expect(node.className).toBe('existing')
    expect(callback.mock.calls).toEqual([[true], [false]])
    expect(api.element).toBeNull()
  })
  it('removes Escape listeners on manual exit and dispose', async () => {
    const remove = vi.spyOn(document, 'removeEventListener'),
      api = createFullscreen(),
      callback = vi.fn()
    await api.request(target(), { pageOnly: true, callback })
    await api.exit()
    expect(remove).toHaveBeenCalledWith('keyup', expect.any(Function))
    await api.request(document.body, { pageOnly: true, callback })
    api.dispose()
    const count = callback.mock.calls.length
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    expect(callback).toHaveBeenCalledTimes(count)
    await expect(api.request()).rejects.toThrow('disposed')
  })
  it('falls back to page mode and exits on Escape', async () => {
    const api = createFullscreen()
    await api.request(target())
    expect(api.isFullscreen).toBe(true)
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    expect(api.isFullscreen).toBe(false)
  })
  it('rolls back rejected native requests and can retry', async () => {
    native.enabled = true
    native.fail = true
    const node = target(),
      parent = node.parentNode,
      api = createFullscreen()
    await expect(api.request(node, { teleport: true })).rejects.toThrow(
      'Permission denied',
    )
    expect(node.parentNode).toBe(parent)
    expect(node.className).toBe('existing')
    expect(native.listeners.size).toBe(0)
    expect(api.element).toBeNull()
    native.fail = false
    await api.request(node)
    expect(api.isFullscreen).toBe(true)
    await api.exit()
    expect(native.listeners.size).toBe(0)
  })
  it('handles native Escape and disposes active sessions', async () => {
    native.enabled = true
    const node = target(),
      api = createFullscreen(),
      callback = vi.fn()
    await api.request(node, { callback })
    await screenfull.exit()
    expect(api.isFullscreen).toBe(false)
    expect(node.classList.contains('fullscreen')).toBe(false)
    expect(callback.mock.calls).toEqual([[true], [false]])
    await api.request(node)
    api.dispose()
    await Promise.resolve()
    expect(native.element).toBeNull()
  })
  it('cleans up a pending native request when disposed', async () => {
    native.enabled = true
    let complete!: () => void
    vi.mocked(screenfull.request).mockImplementationOnce(
      (node) =>
        new Promise((resolve) => {
          complete = () => {
            native.element = node!
            resolve()
          }
        }),
    )
    const api = createFullscreen(),
      node = target(),
      parent = node.parentNode
    const requested = api.request(node, { teleport: true })
    api.dispose()
    complete()
    await requested
    await Promise.resolve()
    expect(native.element).toBeNull()
    expect(node.parentNode).toBe(parent)
    expect(native.listeners.size).toBe(0)
  })
})
describe('directive lifecycle', () => {
  it('updates the click binding once and removes it on unbind', async () => {
    const node = target(),
      button = document.createElement('button')
    bindDirective(button, { value: '#missing', modifiers: {} })
    bindDirective(button, {
      value: { target: node },
      modifiers: { pageOnly: true },
    })
    button.click()
    expect(api.element).toBe(node)
    await api.exit()
    unbindDirective(button)
    button.click()
    expect(api.isFullscreen).toBe(false)
  })
  it('reports missing selectors instead of fullscreening the body', () => {
    const button = document.createElement('button'),
      error = vi.fn()
    button.addEventListener('fullscreen-error', error)
    bindDirective(button, { value: '#missing', modifiers: {} })
    button.click()
    expect(error).toHaveBeenCalledOnce()
    expect(api.isFullscreen).toBe(false)
    unbindDirective(button)
  })
})
