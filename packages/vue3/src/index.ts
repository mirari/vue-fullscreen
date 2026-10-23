import {
  defineComponent,
  h,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  mergeProps,
  computed,
  readonly,
  unref,
  getCurrentInstance,
} from 'vue'
import type { Directive, DefineComponent, Ref, ComputedRef } from 'vue'
import {
  createFullscreen,
  componentProps,
  bindDirective,
  disposeDirective,
} from '../../core/src/index'
import type {
  DirectiveOptions,
  FullscreenProps,
  FullscreenInstance,
  FullscreenTarget,
} from '../../core/src/index'
export { screenfull } from '../../core/src/index'
export type {
  ApiOptions,
  FullscreenTarget,
  DirectiveOptions,
} from '../../core/src/index'

const implementation = defineComponent({
  name: 'Fullscreen',
  inheritAttrs: false,
  props: { ...componentProps, modelValue: { type: Boolean, default: false } },
  emits: ['change', 'update:modelValue', 'update:fullscreen', 'error'],
  setup(props, { emit }) {
    const wrapper = ref<HTMLElement>()
    const isFullscreen = ref(false)
    const controller = createFullscreen()
    const changed = (value: boolean) => {
      isFullscreen.value = value
      emit('change', value)
      emit('update:modelValue', value)
      emit('update:fullscreen', value)
    }
    const enter = () =>
      controller.enter(wrapper.value, {
        pageOnly: props.pageOnly,
        teleport: props.teleport,
        fullscreenClass: props.fullscreenClass,
        callback: changed,
      })
    const exit = () => controller.exit()
    const toggle = (force?: boolean) =>
      (force ?? !controller.isFullscreen) ? enter() : exit()
    const update = (value: boolean) => {
      void toggle(value).catch((error) => emit('error', error))
    }
    watch(() => props.modelValue, update)
    watch(() => props.fullscreen, update)
    onMounted(() => {
      if (props.modelValue || props.fullscreen) update(true)
    })
    onBeforeUnmount(() => controller.dispose())
    return {
      wrapper,
      enter,
      request: enter,
      exit,
      toggle,
      isFullscreen,
      isSupported: controller.isSupported,
      isEnabled: controller.isSupported,
      shadeClick: (event: MouseEvent) => {
        if (props.exitOnClickWrapper && event.target === wrapper.value)
          update(false)
      },
    }
  },
  render() {
    return h(
      'div',
      mergeProps(this.$attrs, {
        ref: 'wrapper',
        class: { [this.fullscreenClass]: this.isFullscreen },
        onClick: this.shadeClick,
      }),
      this.$slots.default?.(),
    )
  },
})
export interface Vue3FullscreenProps extends FullscreenProps {
  modelValue?: boolean
  onChange?: (value: boolean) => void
  onError?: (error: unknown) => void
  'onUpdate:modelValue'?: (value: boolean) => void
  'onUpdate:fullscreen'?: (value: boolean) => void
}
// Keep declarations compatible with supported Vue 3 releases, rather than leaking
// the build-time Vue version's internal DefineComponent generic parameters.
export const Fullscreen = implementation as unknown as DefineComponent<
  Vue3FullscreenProps,
  FullscreenInstance
>
export const vFullscreen: Directive<
  HTMLElement,
  string | DirectiveOptions | undefined
> = {
  mounted: bindDirective,
  updated: bindDirective,
  beforeUnmount: disposeDirective,
}
/** @deprecated Import Fullscreen instead. */
export const component = Fullscreen
/** @deprecated Import vFullscreen instead. */
export const directive = vFullscreen

export type FullscreenValue<T> = T | Ref<T> | (() => T)
export type UseFullscreenTarget = FullscreenTarget
export interface UseFullscreenOptions {
  pageOnly?: FullscreenValue<boolean>
  teleport?: FullscreenValue<boolean>
  fullscreenClass?: FullscreenValue<string>
}
export interface UseFullscreenReturn {
  isFullscreen: Readonly<Ref<boolean>>
  /** Native Fullscreen API availability; page-only mode also works when false. */
  isSupported: ComputedRef<boolean>
  enter(): Promise<void>
  exit(): Promise<void>
  toggle(): Promise<void>
}
const resolveValue = <T>(value: FullscreenValue<T>): T =>
  typeof value === 'function' ? (value as () => T)() : unref(value)

export function useFullscreen(
  target?: UseFullscreenTarget,
  options: UseFullscreenOptions = {},
): UseFullscreenReturn {
  const controller = createFullscreen()
  const isFullscreen = ref(false)
  const enter = () =>
    controller.enter(target, {
      pageOnly: resolveValue(options.pageOnly ?? false),
      teleport: resolveValue(options.teleport ?? false),
      fullscreenClass: resolveValue(options.fullscreenClass ?? 'fullscreen'),
      callback: (value) => {
        isFullscreen.value = value
      },
    })
  if (getCurrentInstance()) {
    onBeforeUnmount(() => {
      controller.dispose()
      isFullscreen.value = false
    })
  }
  return {
    isFullscreen: readonly(isFullscreen),
    isSupported: computed(() => controller.isSupported),
    enter,
    exit: () => controller.exit(),
    toggle: () => (controller.isFullscreen ? controller.exit() : enter()),
  }
}
