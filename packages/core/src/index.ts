import screenfull from 'screenfull'
export { screenfull }

export interface ApiOptions {
  callback?: (isFullscreen: boolean) => void
  fullscreenClass?: string
  teleport?: boolean
  pageOnly?: boolean
}
export interface InstallationOptions {
  name?: string
}
type FullscreenTargetValue =
  Element | string | { readonly $el: Element } | null | undefined
export type FullscreenTarget =
  | FullscreenTargetValue
  | { readonly value: FullscreenTargetValue }
  | (() => FullscreenTargetValue)

function resolveTarget(target: FullscreenTarget): HTMLElement {
  let node: FullscreenTargetValue
  if (target == null) node = document.body
  else if (typeof target === 'function') node = target()
  else if (
    typeof target === 'object' &&
    !(target instanceof Element) &&
    !('$el' in target) &&
    'value' in target
  )
    node = target.value
  else node = target
  if (typeof node === 'string') {
    const id = node.charAt(0) === '#' ? node.slice(1) : node
    let found: Element | null = document.getElementById(id)
    if (!found) {
      try {
        found = document.querySelector(node)
      } catch {
        // Invalid selectors still report the same unresolved-target error.
      }
    }
    if (!found) throw new Error(`Fullscreen target not found: ${node}`)
    node = found
  }
  if (node && !(node instanceof Element) && typeof node === 'object')
    node = node.$el
  if (!(node instanceof HTMLElement))
    throw new TypeError('Fullscreen target must resolve to an HTML element')
  return node
}
export interface VueFullscreenApi {
  readonly options: Required<Omit<ApiOptions, 'callback'>> &
    Pick<ApiOptions, 'callback'>
  readonly element: Element | null
  readonly isFullscreen: boolean
  readonly isSupported: boolean
  /** @deprecated Use isSupported. */
  readonly isEnabled: boolean
  toggle(
    target?: FullscreenTarget,
    options?: ApiOptions,
    force?: boolean,
  ): Promise<void>
  enter(target?: FullscreenTarget, options?: ApiOptions): Promise<void>
  /** @deprecated Use enter. */
  request(target?: FullscreenTarget, options?: ApiOptions): Promise<void>
  exit(): Promise<void>
}
export interface FullscreenController extends VueFullscreenApi {
  dispose(): void
}

/** Each component owns its controller; the public API uses a shared singleton. */
export function createFullscreen(): FullscreenController {
  let element: HTMLElement | null = null
  let isFullscreen = false
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
    if (isFullscreen === value) return
    isFullscreen = value
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
    if (event.key === 'Escape' || event.key === 'Esc')
      void controller.exit().catch(() => {})
  }
  const controller: FullscreenController = {
    get options() {
      return options
    },
    get element() {
      return element
    },
    get isFullscreen() {
      return isFullscreen
    },
    get isSupported() {
      return screenfull.isEnabled
    },
    get isEnabled() {
      return this.isSupported
    },
    toggle(target, config, force) {
      return (force ?? !isFullscreen) ? this.enter(target, config) : this.exit()
    },
    request(target, config = {}) {
      return controller.enter(target, config)
    },
    enter(target, config = {}) {
      if (disposed)
        return Promise.reject(
          new Error('Fullscreen controller has been disposed'),
        )
      if (pending) return pending
      if (isFullscreen) return Promise.resolve()
      if (typeof document === 'undefined')
        return Promise.reject(new Error('Fullscreen requires a browser'))
      let node: HTMLElement
      try {
        node = resolveTarget(target)
      } catch (error) {
        return Promise.reject(error)
      }
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
        added.forEach((name) => node.classList.remove(name))
        if (options.pageOnly || options.teleport) {
          for (const [key, value, priority] of styles) {
            if (value) node.style.setProperty(key, value, priority)
            else node.style.removeProperty(key)
          }
        }
        if (marker?.parentNode) {
          if (node.parentNode) marker.parentNode.replaceChild(node, marker)
          else marker.parentNode.removeChild(marker)
        }
      }
      element = node
      added.forEach((name) => node.classList.add(name))
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
        node.parentNode.insertBefore(marker, node)
        document.body.appendChild(node)
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
      if (!isFullscreen) return
      if (options.pageOnly) {
        cleanup()
        notify(false)
      } else {
        await screenfull.exit()
        if (isFullscreen) {
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
      isFullscreen = false
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
export let api = createFullscreen()

export const componentProps = {
  fullscreen: { type: Boolean, default: false },
  exitOnClickWrapper: { type: Boolean, default: true },
  fullscreenClass: { type: String, default: 'fullscreen' },
  pageOnly: { type: Boolean, default: false },
  teleport: { type: Boolean, default: false },
}
export interface DirectiveOptions extends ApiOptions {
  target?: FullscreenTarget
}
export interface FullscreenBinding {
  value?: string | DirectiveOptions
  modifiers: Record<string, boolean | undefined>
}
const clicks = new WeakMap<HTMLElement, EventListener>()
let directiveOwner: HTMLElement | null = null
export function unbindDirective(el: HTMLElement) {
  const listener = clicks.get(el)
  if (listener) el.removeEventListener('click', listener)
  clicks.delete(el)
}
export function disposeDirective(el: HTMLElement) {
  unbindDirective(el)
  if (directiveOwner === el) {
    directiveOwner = null
    api.dispose()
    api = createFullscreen()
  }
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
      const controller = api
      if (!controller.element) directiveOwner = el
      void controller
        .toggle(target, {
          teleport: !!binding.modifiers.teleport,
          pageOnly: !!binding.modifiers.pageOnly,
          ...options,
          callback: (isFullscreen) => {
            if (!isFullscreen && api === controller) directiveOwner = null
            options.callback?.(isFullscreen)
          },
        })
        .catch((error) => {
          if (api === controller && !controller.element) directiveOwner = null
          report(error)
        })
    } catch (error) {
      report(error)
    }
  }
  const report = (error: unknown) => {
    // IE 11 exposes CustomEvent but does not support calling its constructor.
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent('fullscreen-error', true, false, error)
    el.dispatchEvent(event)
  }
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
  readonly isSupported: boolean
  /** @deprecated Use isSupported. */
  readonly isEnabled: boolean
  enter(): Promise<void>
  /** @deprecated Use enter. */
  request(): Promise<void>
  exit(): Promise<void>
  toggle(force?: boolean): Promise<void>
}
