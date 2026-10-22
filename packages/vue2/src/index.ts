import Vue from 'vue'
import type { Vue as VueInstance } from 'vue/types/vue.js'
import type {
  ComponentOptions,
  DirectiveOptions as VueDirectiveOptions,
} from 'vue/types/options.js'
import {
  api,
  createFullscreen,
  componentProps,
  bindDirective,
  unbindDirective,
} from '../../core/src/index'
import type {
  FullscreenController,
  InstallationOptions,
  VueFullscreenApi,
  FullscreenInstance,
  FullscreenProps,
} from '../../core/src/index'
export { api as fullscreen, api, screenfull } from '../../core/src/index'
export type {
  ApiOptions,
  FullscreenTarget,
  VueFullscreenApi,
  InstallationOptions,
  DirectiveOptions,
} from '../../core/src/index'
const controllers = new WeakMap<Vue, FullscreenController>()

const implementation = Vue.extend({
  name: 'Fullscreen',
  inheritAttrs: false,
  props: { ...componentProps, value: { type: Boolean, default: false } },
  data() {
    return { isFullscreen: false, isEnabled: false }
  },
  computed: {
    support(): boolean {
      return this.isEnabled
    },
  },
  created() {
    const controller = createFullscreen()
    controllers.set(this, controller)
    this.isEnabled = controller.isEnabled
  },
  mounted() {
    if (this.value || this.fullscreen) this.update(true)
  },
  beforeDestroy() {
    controllers.get(this)?.dispose()
    controllers.delete(this)
  },
  watch: {
    value(value: boolean) {
      this.update(value)
    },
    fullscreen(value: boolean) {
      this.update(value)
    },
  },
  methods: {
    request(): Promise<void> {
      return controllers.get(this)!.request(this.$el, {
        pageOnly: this.pageOnly,
        teleport: this.teleport,
        fullscreenClass: this.fullscreenClass,
        callback: (isFullscreen) => {
          this.isFullscreen = isFullscreen
          this.$emit('change', isFullscreen)
          this.$emit('input', isFullscreen)
          this.$emit('update:fullscreen', isFullscreen)
        },
      })
    },
    exit(): Promise<void> {
      return controllers.get(this)!.exit()
    },
    toggle(value?: boolean): Promise<void> {
      return (value ?? !this.isFullscreen) ? this.request() : this.exit()
    },
    update(value: boolean) {
      void this.toggle(value).catch((error) => this.$emit('error', error))
    },
    enter(): Promise<void> {
      return this.request()
    },
    getState(): boolean {
      return this.isFullscreen
    },
  },
  render(h) {
    return h(
      'div',
      {
        attrs: this.$attrs,
        class: { [this.fullscreenClass]: this.isFullscreen },
        on: {
          ...this.$listeners,
          click: (event: MouseEvent) => {
            this.$emit('click', event)
            if (this.exitOnClickWrapper && event.target === this.$el)
              this.update(false)
          },
        },
      },
      this.$slots.default,
    )
  },
})
export type Vue2FullscreenInstance = VueInstance &
  FullscreenInstance & {
    readonly support: boolean
    enter(): Promise<void>
    getState(): boolean
  }
// Vue 2.4 predates VueConstructor; retain its static API and type our instance.
export const Fullscreen = implementation as Pick<
  typeof VueInstance,
  keyof typeof VueInstance
> & {
  new (
    options?: ComponentOptions<VueInstance>,
  ): Vue2FullscreenInstance & FullscreenProps & { value?: boolean }
}
export const vFullscreen: VueDirectiveOptions = {
  inserted: bindDirective,
  update: bindDirective,
  unbind: unbindDirective,
}
/** @deprecated Import Fullscreen instead. */
export const component: typeof Fullscreen = Fullscreen
/** @deprecated Import vFullscreen instead. */
export const directive = vFullscreen
export default {
  install(
    ctor: typeof VueInstance,
    { name = 'fullscreen' }: InstallationOptions = {},
  ) {
    ctor.prototype[`$${name}`] = api
    ctor.component(name, Fullscreen)
    ctor.directive(name, vFullscreen)
  },
}
declare module 'vue/types/vue.js' {
  interface Vue {
    $fullscreen: VueFullscreenApi
  }
}
