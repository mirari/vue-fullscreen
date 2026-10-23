import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  api,
  bindDirective,
  createFullscreen,
  disposeDirective,
  unbindDirective,
  type FullscreenTarget,
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
  it('reports native availability as isSupported', () => {
    const controller = createFullscreen()
    expect(controller.isSupported).toBe(false)
    native.enabled = true
    expect(controller.isSupported).toBe(true)
    expect(controller.isFullscreen).toBe(false)
  })
  it.each(['target', '#target', 'panel:1', '#panel:1'])(
    'resolves the id %s on each request without CSS selector parsing',
    async (id) => {
      const node = target()
      node.id = id.charAt(0) === '#' ? id.slice(1) : id
      const controller = createFullscreen()
      await controller.request(id, { pageOnly: true })
      expect(controller.element).toBe(node)
      await controller.exit()
      const replacement = node.cloneNode() as HTMLElement
      node.replaceWith(replacement)
      await controller.toggle(id, { pageOnly: true })
      expect(controller.element).toBe(replacement)
      await controller.exit()
    },
  )
  it('resolves ref values, component roots and getters at request time', async () => {
    const first = target()
    const second = document.createElement('div')
    document.body.append(second)
    const component = { $el: first, value: 'component model' }
    const templateRef = { value: component }
    const controller = createFullscreen()
    for (const input of [templateRef, component, () => first]) {
      await controller.request(input, { pageOnly: true })
      expect(controller.element).toBe(first)
      await controller.exit()
    }
    templateRef.value = { ...component, $el: second }
    await controller.request(templateRef, { pageOnly: true })
    expect(controller.element).toBe(second)
    await controller.exit()
    // Form controls also have a value property, but are already DOM targets.
    const formControl = document.createElement('input')
    formControl.value = 'missing-id'
    document.body.append(formControl)
    await controller.request(formControl, { pageOnly: true })
    expect(controller.element).toBe(formControl)
    await controller.exit()
  })
  it('rejects unresolved targets without entering body fullscreen and can retry', async () => {
    const controller = createFullscreen()
    const templateRef: { value: HTMLElement | null | undefined } = {
      value: null,
    }
    for (const input of [
      templateRef,
      { value: undefined },
      () => null,
      '#missing',
    ]) {
      await expect(controller.request(input)).rejects.toThrow(
        /HTML element|target not found/,
      )
      expect(controller.element).toBeNull()
      expect(controller.isFullscreen).toBe(false)
      expect(document.body.classList.contains('fullscreen')).toBe(false)
    }
    await expect(
      controller.request(() => {
        throw new Error('Target unavailable')
      }),
    ).rejects.toThrow('Target unavailable')
    templateRef.value = target()
    await controller.request(templateRef, { pageOnly: true })
    expect(controller.element).toBe(templateRef.value)
    await controller.exit()
  })
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
    expect(node.parentNode!.parentNode).toBe(document.body)
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
    expect(document.querySelector('[data-fullscreen-teleport]')).toBeNull()
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
    expect(document.querySelector('[data-fullscreen-teleport]')).toBeNull()
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
    expect(document.querySelector('[data-fullscreen-teleport]')).toBeNull()
  })
})
describe.each(['API', 'directive'] as const)(
  '%s target resolution',
  (entry) => {
    it.each([
      'panel',
      '#panel',
      '.probe',
      'main > [data-panel]',
      'panel:1',
      '#panel:1',
    ])(
      'resolves %s identically for strings, refs and getters, preferring ids',
      async (selector) => {
        document.body.innerHTML =
          '<main><panel></panel><div id="panel" class="probe" data-panel></div><div id="panel:1"></div></main>'
        const expected = document.getElementById(
          selector.includes(':1') ? 'panel:1' : 'panel',
        )
        const controller = entry === 'API' ? createFullscreen() : api
        const button = document.createElement('button')
        const errors = vi.fn()
        button.addEventListener('fullscreen-error', errors)
        for (const input of [selector, { value: selector }, () => selector]) {
          if (entry === 'API')
            await controller.request(input, { pageOnly: true })
          else {
            bindDirective(button, {
              value: { target: input },
              modifiers: { pageOnly: true },
            })
            button.click()
            await Promise.resolve()
            expect(errors).not.toHaveBeenCalled()
          }
          expect(controller.element).toBe(expected)
          await controller.exit()
        }
        if (entry === 'directive') {
          bindDirective(button, {
            value: selector,
            modifiers: { pageOnly: true },
          })
          button.click()
          await Promise.resolve()
          expect(errors).not.toHaveBeenCalled()
          expect(controller.element).toBe(expected)
          await controller.exit()
          unbindDirective(button)
        }
      },
    )
    it.each(['#missing', '[invalid', { value: null }, () => undefined])(
      'reports an unresolved target without fullscreening body: %s',
      async (input) => {
        const controller = entry === 'API' ? createFullscreen() : api
        if (entry === 'API')
          await expect(
            controller.request(input as FullscreenTarget),
          ).rejects.toThrow()
        else {
          const button = document.createElement('button')
          const errors = vi.fn()
          button.addEventListener('fullscreen-error', errors)
          bindDirective(button, {
            value: { target: input as FullscreenTarget },
            modifiers: {},
          })
          button.click()
          await Promise.resolve()
          expect(errors).toHaveBeenCalledOnce()
          unbindDirective(button)
        }
        expect(controller.element).toBeNull()
        expect(document.body.classList.contains('fullscreen')).toBe(false)
      },
    )
  },
)
describe('directive lifecycle', () => {
  it('keeps captured API references and methods usable after directive cleanup', async () => {
    const savedApi = api
    const { enter, request, toggle, exit } = savedApi
    const node = target()
    const parent = node.parentNode
    const button = document.createElement('button')
    const callback = vi.fn()
    bindDirective(button, {
      value: { target: node, pageOnly: true, teleport: true, callback },
      modifiers: {},
    })
    button.click()
    disposeDirective(button)
    expect(callback.mock.calls).toEqual([[true], [false]])
    expect(node.parentNode).toBe(parent)
    expect(api).toBe(savedApi)
    for (const start of [enter, request, toggle]) {
      await start(node, { pageOnly: true })
      expect(savedApi.element).toBe(node)
      expect(savedApi.isFullscreen).toBe(true)
      await exit()
      expect(savedApi.element).toBeNull()
    }
  })
  it('cleans up the owning directive while allowing other bound buttons to enter again', async () => {
    const node = target()
    const parent = node.parentNode
    const first = document.createElement('button')
    const second = document.createElement('button')
    const binding = {
      value: { target: node, pageOnly: true, teleport: true },
      modifiers: {},
    }
    bindDirective(first, binding)
    bindDirective(second, binding)
    first.click()
    expect(node.parentNode!.parentNode).toBe(document.body)
    // A second directive can act as the exit control for the same session.
    second.click()
    expect(api.isFullscreen).toBe(false)
    second.click()
    disposeDirective(first)
    expect(api.isFullscreen).toBe(true)
    disposeDirective(second)
    expect(node.parentNode).toBe(parent)
    expect(node.className).toBe('existing')
    expect(api.isFullscreen).toBe(false)
    bindDirective(first, binding)
    first.click()
    expect(api.isFullscreen).toBe(true)
    disposeDirective(first)
  })
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
  it('reports missing selectors instead of fullscreening the body', async () => {
    const button = document.createElement('button'),
      error = vi.fn()
    button.addEventListener('fullscreen-error', error)
    bindDirective(button, { value: '#missing', modifiers: {} })
    button.click()
    await Promise.resolve()
    expect(error).toHaveBeenCalledOnce()
    expect(api.isFullscreen).toBe(false)
    unbindDirective(button)
  })
})
