import Vue from 'vue'
import { Viewer } from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import { fullscreen, Fullscreen, vFullscreen } from '../src/index'
import './style.css'
const syncTheme = (dark: boolean) => {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}
try {
  syncTheme(parent.document.documentElement.classList.contains('dark'))
} catch {
  syncTheme(matchMedia('(prefers-color-scheme: dark)').matches)
}
addEventListener('message', (event) => {
  if (
    event.source === parent &&
    event.origin === location.origin &&
    event.data?.source === 'fullscreen-docs-theme' &&
    typeof event.data.dark === 'boolean'
  )
    syncTheme(event.data.dark)
})
const options = new URLSearchParams(location.search)
const pageOnly = options.has('pageOnly')
const comparison = options.get('compare')
const kind = options.get('kind')
const zh = options.get('lang') === 'zh'
const text = zh
  ? {
      title: 'Vue 2 全屏示例',
      help: '组件与 API 示例。按 Esc 退出。',
      pageHelp: '切换 pageOnly 后进入全屏，对比浏览器工具栏是否保留。',
      teleportHelp: '进入全屏后点击图片，对比 body 弹窗是否可见。',
      pageStatus: 'pageOnly: true · 保留浏览器工具栏',
      nativeStatus: 'pageOnly: false · 浏览器隐藏工具栏',
      enter: '进入组件全屏',
      content: '全屏内容',
      details: '预览图片',
      image: '图片',
      hiddenPopup:
        '弹窗已挂载到 body，但在当前原生全屏元素之外。退出并开启 teleport 后再试。',
      exit: '退出全屏',
      toggle: '切换 API 全屏',
      api: 'API 内容',
    }
  : {
      title: 'Vue 2 Fullscreen',
      help: 'Component and API examples. Use Escape to exit.',
      pageHelp:
        'Toggle pageOnly and enter fullscreen to compare browser toolbar visibility.',
      teleportHelp:
        'Enter fullscreen and click the image to compare body popup visibility.',
      pageStatus: 'pageOnly: true · the browser toolbar stays visible',
      nativeStatus: 'pageOnly: false · the browser hides its toolbar',
      enter: 'Enter component fullscreen',
      content: 'Fullscreen content',
      details: 'Preview image',
      image: 'Image',
      hiddenPopup:
        'The popup is mounted under body, outside the current native fullscreen element. Exit and enable teleport to see it.',
      exit: 'Exit',
      toggle: 'Toggle API fullscreen',
      api: 'API content',
    }
document.documentElement.lang = zh ? 'zh-CN' : 'en'

new Vue({
  directives: { fullscreen: vFullscreen },
  data: {
    active: false,
    error: '',
    teleport: !comparison,
    popup: false,
  },
  watch: {
    active(value: boolean) {
      if (comparison !== 'pageOnly' && !value)
        (this.$refs.preview as InstanceType<typeof Viewer>)?.hide()
    },
  },
  methods: {
    changed(isFullscreen: boolean) {
      this.active = isFullscreen
    },
    report(error: Error) {
      this.error = error.message
    },
    previewImage() {
      const preview = this.$refs.preview as InstanceType<typeof Viewer>
      if (this.popup) preview.hide()
      else preview.show()
    },
    enter() {
      if (kind === 'api')
        void fullscreen
          .request('target', {
            pageOnly,
            teleport: this.teleport,
            callback: this.changed,
          })
          .catch(this.report)
      else this.active = true
    },
    exit() {
      if (kind === 'api' || kind === 'directive')
        void fullscreen.exit().catch(this.report)
      else this.active = false
    },
  },
  render(h) {
    const picture = h('img', {
      class: 'demo-picture',
      attrs: {
        src: 'https://picsum.photos/id/10/1280/720',
        alt: text.image,
        width: 1280,
        height: 720,
      },
    })
    return h('main', [
      h('h1', text.title),
      h(
        'p',
        comparison === 'pageOnly'
          ? text.pageHelp
          : comparison === 'teleport'
            ? text.teleportHelp
            : text.help,
      ),
      comparison === 'pageOnly'
        ? null
        : h('label', [
            h('input', {
              attrs: {
                type: 'checkbox',
                id: 'teleport',
                disabled: this.active,
              },
              domProps: { checked: this.teleport },
              on: {
                change: (event: Event) => {
                  this.teleport = (event.target as HTMLInputElement).checked
                },
              },
            }),
            'teleport',
          ]),
      comparison || kind
        ? h('p', [
            h(
              'code',
              comparison === 'pageOnly'
                ? `{ pageOnly: ${pageOnly} }`
                : comparison === 'teleport'
                  ? `{ teleport: ${this.teleport} }`
                  : `{ pageOnly: ${pageOnly}, teleport: ${this.teleport} }`,
            ),
          ])
        : null,
      h(
        'button',
        {
          attrs: { id: 'enter' },
          directives:
            kind === 'directive'
              ? [
                  {
                    name: 'fullscreen',
                    value: {
                      target: '#target',
                      pageOnly,
                      teleport: this.teleport,
                      callback: this.changed,
                    },
                  },
                ]
              : [],
          on: {
            ...(kind === 'directive' ? {} : { click: this.enter }),
            'fullscreen-error': (event: CustomEvent<Error>) =>
              this.report(event.detail),
          },
        },
        kind === 'directive'
          ? zh
            ? '点击指令按钮'
            : 'Toggle with directive'
          : kind === 'api'
            ? zh
              ? '进入全屏'
              : 'Enter fullscreen'
            : text.enter,
      ),
      h(
        kind === 'directive' || kind === 'api' ? 'section' : Fullscreen,
        {
          attrs: { id: 'target', class: 'demo-target' },
          props: { value: this.active, pageOnly, teleport: this.teleport },
          on: {
            change: () => {
              if (comparison === 'pageOnly')
                this.$nextTick(() => window.dispatchEvent(new Event('resize')))
            },
            input: (v: boolean) => {
              this.active = v
              if (!v) this.popup = false
            },
            error: (e: Error) => {
              this.error = e.message
            },
          },
        },
        [
          h('div', { class: 'picture-topbar' }, [
            h('p', text.content),
            h(
              'button',
              {
                attrs: { id: 'exit' },
                on: { click: this.exit },
              },
              text.exit,
            ),
          ]),
          comparison === 'pageOnly' && this.active
            ? h(
                'p',
                { attrs: { role: 'status' } },
                pageOnly ? text.pageStatus : text.nativeStatus,
              )
            : null,
          comparison === 'pageOnly'
            ? h('div', { class: 'inline-gallery-stage' }, [
                h(
                  Viewer,
                  {
                    ref: 'preview',
                    class: 'inline-gallery-sources',
                    props: {
                      inline: true,
                      toolbar: false,
                      title: false,
                      button: false,
                      transition: false,
                      focus: false,
                      fullscreen: false,
                      url: 'data-source',
                    },
                  },
                  Array.from({ length: 6 }, (_, index) =>
                    h('img', {
                      attrs: {
                        src: `https://picsum.photos/id/${10 + index}/128/72`,
                        'data-source': `https://picsum.photos/id/${10 + index}/1280/720`,
                        alt: `${text.image} ${index + 1}`,
                      },
                    }),
                  ),
                ),
              ])
            : h(
                Viewer,
                {
                  ref: 'preview',
                  props: {
                    zIndex: 10001,
                    toolbar: false,
                    title: false,
                    transition: false,
                    focus: false,
                    fullscreen: false,
                  },
                  on: {
                    show: () => {
                      this.popup = true
                    },
                    hidden: () => {
                      this.popup = false
                    },
                  },
                },
                [
                  h(
                    'button',
                    {
                      class: 'image-trigger',
                      attrs: {
                        id: 'popup',
                        type: 'button',
                        'aria-label': text.details,
                        'aria-expanded': String(this.popup),
                      },
                      on: {
                        click: (event: Event) => {
                          event.stopPropagation()
                          this.previewImage()
                        },
                      },
                    },
                    [picture],
                  ),
                ],
              ),
          this.active && this.popup && !this.teleport && !pageOnly
            ? h('p', { attrs: { role: 'status' } }, text.hiddenPopup)
            : null,
        ],
      ),
      comparison || kind
        ? null
        : h(
            'button',
            {
              attrs: { id: 'api' },
              on: {
                click: () =>
                  fullscreen
                    .toggle(document.querySelector('#api-target'), {
                      pageOnly,
                      teleport: true,
                    })
                    .catch((e) => {
                      this.error = e.message
                    }),
              },
            },
            text.toggle,
          ),
      comparison || kind
        ? null
        : h('section', { attrs: { id: 'api-target' } }, text.api),
      h('output', { attrs: { id: 'state' } }, String(this.active)),
      h('p', { attrs: { role: 'alert' } }, this.error),
    ])
  },
}).$mount('#app')
