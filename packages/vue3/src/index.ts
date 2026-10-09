import {
  defineComponent,
  h,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  mergeProps,
} from 'vue'
import type { App, Directive, DefineComponent } from 'vue'
import {
  api,
  createFullscreen,
  componentProps,
  bindDirective,
  unbindDirective,
} from '../../core/src/index'
import type {
  InstallationOptions,
  VueFullscreenApi,
  DirectiveOptions,
  FullscreenProps,
  FullscreenInstance,
} from '../../core/src/index'
export { api, screenfull } from '../../core/src/index'
export type {
  ApiOptions,
  VueFullscreenApi,
  InstallationOptions,
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
    const request = () =>
      controller.request(wrapper.value, {
        pageOnly: props.pageOnly,
        teleport: props.teleport,
        fullscreenClass: props.fullscreenClass,
        callback: changed,
      })
    const exit = () => controller.exit()
    const toggle = (value?: boolean) =>
      (value ?? !controller.isFullscreen) ? request() : exit()
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
      request,
      exit,
      toggle,
      isFullscreen,
      isEnabled: controller.isEnabled,
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
export const component = implementation as unknown as DefineComponent<
  Vue3FullscreenProps,
  FullscreenInstance
>
export const directive: Directive<
  HTMLElement,
  string | DirectiveOptions | undefined
> = {
  mounted: bindDirective,
  updated: bindDirective,
  beforeUnmount: unbindDirective,
}
export default {
  install(app: App, { name = 'fullscreen' }: InstallationOptions = {}) {
    app.config.globalProperties[`$${name}`] = api
    app.component(name, component)
    app.directive(name, directive)
  },
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $fullscreen: VueFullscreenApi
  }
}
