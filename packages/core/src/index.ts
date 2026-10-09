import screenfull from 'screenfull'
export { screenfull }

export interface ApiOptions {
  callback?: (fullscreen: boolean) => void
  fullscreenClass?: string
  teleport?: boolean
  pageOnly?: boolean
}
export interface InstallationOptions {
  name?: string
}
export interface VueFullscreenApi {
  readonly options: Required<Omit<ApiOptions, 'callback'>> &
    Pick<ApiOptions, 'callback'>
  readonly element: Element | null
  readonly isFullscreen: boolean
  readonly isEnabled: boolean
  toggle(
    target?: Element | null,
    options?: ApiOptions,
    force?: boolean,
  ): Promise<void>
  request(target?: Element | null, options?: ApiOptions): Promise<void>
  exit(): Promise<void>
}
export interface FullscreenController extends VueFullscreenApi {
  dispose(): void
}

/** Each component owns its controller; the public API uses a shared singleton. */
export function createFullscreen(): FullscreenController {
  let element: HTMLElement | null = null
  let active = false
  let pending: Promise<void> | null = null
  let disposed = false
  let restore: (() => void) | undefined
  let options: VueFullscreenApi['options'] = {
    fullscreenClass: 'fullscreen',
    teleport: false,
    pageOnly: false,
  }
  let nativeTarget: Element | null = null
  const notify = (value: boolean) => {
    if (active === value) return
    active = value
    options.callback?.(value)
  }
  const cleanup = () => {
    if (typeof document !== 'undefined')
      document.removeEventListener('keyup', onKey)
    if (screenfull.isEnabled) screenfull.off('change', onChange)
    restore?.()
    restore = undefined
    element = null
    nativeTarget = null
  }
  const onChange = () => {
    if (screenfull.element === nativeTarget && screenfull.isFullscreen)
      notify(true)
    else {
      cleanup()
      notify(false)
    }
  }
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') void controller.exit().catch(() => {})
  }
  const controller: FullscreenController = {
    get options() {
      return options
    },
    get element() {
      return element
    },
    get isFullscreen() {
      return active
    },
    get isEnabled() {
      return screenfull.isEnabled
    },
    toggle(target, config, force) {
      return (force ?? !active) ? this.request(target, config) : this.exit()
    },
    request(target, config = {}) {
      if (disposed)
        return Promise.reject(
          new Error('Fullscreen controller has been disposed'),
        )
      if (pending) return pending
      if (active) return Promise.resolve()
      if (typeof document === 'undefined')
        return Promise.reject(new Error('Fullscreen requires a browser'))
      const node = target ?? document.body
      if (!(node instanceof HTMLElement))
        return Promise.reject(
          new TypeError('Fullscreen target must be an HTML element'),
        )
      options = {
        fullscreenClass: 'fullscreen',
        teleport: false,
        pageOnly: false,
        ...config,
      }
      options.pageOnly ||= !screenfull.isEnabled
      options.teleport &&= node !== document.body
      const classes = options.fullscreenClass.split(/\s+/).filter(Boolean)
      const added = classes.filter((name) => !node.classList.contains(name))
      const properties = ['position', 'left', 'top', 'width', 'height'] as const
      const styles = properties.map(
        (key) =>
          [
            key,
            node.style.getPropertyValue(key),
            node.style.getPropertyPriority(key),
          ] as const,
      )
      let marker: Comment | undefined
      restore = () => {
        node.classList.remove(...added)
        if (options.pageOnly || options.teleport) {
          for (const [key, value, priority] of styles) {
            if (value) node.style.setProperty(key, value, priority)
            else node.style.removeProperty(key)
          }
        }
        if (marker?.parentNode) {
          if (node.parentNode) marker.replaceWith(node)
          else marker.remove()
        }
      }
      element = node
      node.classList.add(...added)
      if (options.pageOnly || options.teleport) {
        Object.assign(node.style, {
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
        })
      }
      if (options.teleport && node.parentNode) {
        marker = document.createComment('fullscreen')
        node.before(marker)
        document.body.append(node)
      }
      if (options.pageOnly) {
        document.addEventListener('keyup', onKey)
        notify(true)
        return Promise.resolve()
      }
      nativeTarget = options.teleport ? document.body : node
      screenfull.on('change', onChange)
      // Call request synchronously, preserving the browser's user activation.
      try {
        pending = screenfull
          .request(nativeTarget)
          .then(() => {
            if (disposed) {
              if (screenfull.element === nativeTarget) return screenfull.exit()
              return
            }
            if (element) onChange()
          })
          .catch((error) => {
            cleanup()
            notify(false)
            throw error
          })
          .finally(() => {
            pending = null
          })
        return pending
      } catch (error) {
        cleanup()
        return Promise.reject(error)
      }
    },
    async exit() {
      if (pending) await pending
      if (!active) return
      if (options.pageOnly) {
        cleanup()
        notify(false)
      } else {
        await screenfull.exit()
        if (active) {
          cleanup()
          notify(false)
        }
      }
    },
    dispose() {
      disposed = true
      const owned = nativeTarget
      const request = pending
      // Restore DOM synchronously before Vue removes its nodes.
      cleanup()
      active = false
      if (screenfull.isEnabled) {
        const exitOwned = () => {
          if (owned && screenfull.element === owned) return screenfull.exit()
        }
        if (request) void request.then(exitOwned, () => {}).catch(() => {})
        else void Promise.resolve(exitOwned()).catch(() => {})
      }
    },
  }
  return controller
}
export const api = createFullscreen()

export const componentProps = {
  fullscreen: { type: Boolean, default: false },
  exitOnClickWrapper: { type: Boolean, default: true },
  fullscreenClass: { type: String, default: 'fullscreen' },
  pageOnly: { type: Boolean, default: false },
  teleport: { type: Boolean, default: false },
}
export interface DirectiveOptions extends ApiOptions {
  target?: string | Element | null
}
export interface FullscreenBinding {
  value?: string | DirectiveOptions
  modifiers: Record<string, boolean | undefined>
}
const clicks = new WeakMap<HTMLElement, EventListener>()
export function unbindDirective(el: HTMLElement) {
  const listener = clicks.get(el)
  if (listener) el.removeEventListener('click', listener)
  clicks.delete(el)
}
export function bindDirective(el: HTMLElement, binding: FullscreenBinding) {
  unbindDirective(el)
  const listener = () => {
    try {
      const config =
        typeof binding.value === 'string'
          ? { target: binding.value }
          : (binding.value ?? {})
      const { target, ...options } = config
      const node =
        typeof target === 'string' ? document.querySelector(target) : target
      if (typeof target === 'string' && !node)
        throw new Error(`Fullscreen target not found: ${target}`)
      void api
        .toggle(node, {
          teleport: !!binding.modifiers.teleport,
          pageOnly: !!binding.modifiers.pageOnly,
          ...options,
        })
        .catch(report)
    } catch (error) {
      report(error)
    }
  }
  const report = (error: unknown) =>
    el.dispatchEvent(
      new CustomEvent('fullscreen-error', { detail: error, bubbles: true }),
    )
  clicks.set(el, listener)
  el.addEventListener('click', listener)
}

export interface FullscreenProps {
  fullscreen?: boolean
  exitOnClickWrapper?: boolean
  fullscreenClass?: string
  pageOnly?: boolean
  teleport?: boolean
}
export interface FullscreenInstance {
  readonly isFullscreen: boolean
  readonly isEnabled: boolean
  request(): Promise<void>
  exit(): Promise<void>
  toggle(value?: boolean): Promise<void>
}
