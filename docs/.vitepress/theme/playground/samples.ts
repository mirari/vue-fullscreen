export type Example = 'component' | 'directive' | 'api'

export function sample(kind: Example, vue2: boolean, english: boolean) {
  const text = english
    ? {
        enter:
          kind === 'directive' ? 'Toggle with directive' : 'Enter fullscreen',
        exit: 'Exit fullscreen',
        details: 'Preview image',
        image: 'Landscape',
        hidden:
          'The popup is open under body, but is outside the native fullscreen element.',
      }
    : {
        enter: kind === 'directive' ? '点击指令按钮' : '进入全屏',
        exit: '退出全屏',
        details: '预览图片',
        image: '风景图片',
        hidden: '弹窗已在 body 下打开，但不属于当前原生全屏元素。',
      }
  const id = vue2 ? 'target' : `demo-${kind}`
  const script = vue2
    ? `<script>
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(VueFullscreen)
Vue.use(VueViewer)

export default {
  data: () => ({ active: false, pageOnly: false, teleport: true, showDetails: false, error: '' }),
  computed: {
    options() {
      return {
        target: '#${id}', pageOnly: this.pageOnly, teleport: this.teleport,
        fullscreenClass: 'demo-fullscreen', callback: this.changed,
      }
    },
  },
  methods: {
    changed(isFullscreen) {
      this.active = isFullscreen
      if (!isFullscreen) this.$refs.preview.hide()
    },
    report(error) { this.active = false; this.showDetails = false; this.error = error.message },
    ${
      kind === 'api'
        ? `enter() { return this.$fullscreen.request('${id}', this.options).catch(this.report) },
    exit() { return this.$fullscreen.exit().catch(this.report) },
    `
        : ''
    }previewImage() { this.showDetails ? this.$refs.preview.hide() : this.$refs.preview.show() },
  },
  beforeDestroy() {
    if (this.$fullscreen.element === this.$refs.target)
      void this.$fullscreen.exit().catch(() => {})
  },
}
</script>`
    : `<script setup>
import { ${kind === 'directive' ? 'computed, ' : ''}${kind === 'api' ? 'watch, ' : ''}ref } from 'vue'
import { ${kind === 'component' ? 'Fullscreen' : kind === 'directive' ? 'vFullscreen' : 'useFullscreen'} } from 'vue-fullscreen'
import { Viewer } from 'v-viewer'
import 'viewerjs/dist/viewer.css'

const pageOnly = ref(false)
const teleport = ref(true)
const showDetails = ref(false)
const preview = ref()
function previewImage() { showDetails.value ? preview.value.hide() : preview.value.show() }
const error = ref('')
${
  kind === 'api'
    ? `const target = ref()
const { isFullscreen: active, enter, exit } = useFullscreen(target, {
  pageOnly, teleport, fullscreenClass: 'demo-fullscreen',
})`
    : 'const active = ref(false)'
}
${
  kind === 'directive'
    ? `const options = computed(() => ({
  target: '#${id}', pageOnly: pageOnly.value, teleport: teleport.value,
  fullscreenClass: 'demo-fullscreen', callback: changed,
}))
`
    : ''
}function changed(isFullscreen) {
  ${kind !== 'api' ? 'active.value = isFullscreen\n  ' : ''}if (!isFullscreen) preview.value?.hide()
}
function report(reason) { ${kind === 'api' ? '' : 'active.value = false; '}showDetails.value = false; error.value = reason.message }
${kind === 'api' ? 'watch(active, changed)\n' : ''}
</script>`
  const enter =
    kind === 'component'
      ? '@click="active = true"'
      : kind === 'directive'
        ? 'v-fullscreen="options"'
        : `@click="${vue2 ? 'enter' : 'enter().catch(report)'}"`
  const exit =
    kind === 'component'
      ? '@click="active = false"'
      : kind === 'directive'
        ? 'v-fullscreen="options"'
        : `@click="${vue2 ? 'exit' : 'exit().catch(report)'}"`
  const tag =
    kind === 'component' ? (vue2 ? 'fullscreen' : 'Fullscreen') : 'section'
  const props =
    kind === 'component'
      ? 'v-model="active" :page-only="pageOnly" :teleport="teleport" :exit-on-click-wrapper="false" fullscreen-class="demo-fullscreen" @change="changed" @error="report"'
      : ''
  return `${script}

<template>
  <div class="lab">
    <header class="options">
      <label class="page-only-control"><input v-model="pageOnly" type="checkbox" :disabled="active"> pageOnly</label>
      <label><input v-model="teleport" type="checkbox" :disabled="active"> teleport</label>
      <button id="enter" :disabled="active" ${enter} ${kind === 'directive' ? '@fullscreen-error="report($event.detail)"' : ''}>${text.enter}</button>
    </header>
    <div class="surface-placeholder">
      <${tag} id="${id}" ref="target" class="surface" ${props}>
        <${vue2 ? 'viewer' : 'Viewer'} ref="preview" class="image-preview" :z-index="10001" :toolbar="false" :title="false" :transition="false" :focus="false" :fullscreen="false" @show="showDetails = true" @hidden="showDetails = false">
          <button class="image-trigger" aria-label="${text.details}" :aria-expanded="showDetails ? 'true' : 'false'" @click.stop="previewImage">
            <img class="gallery-image demo-picture" src="https://picsum.photos/id/10/1280/720" alt="${text.image}" width="1280" height="720">
          </button>
        </${vue2 ? 'viewer' : 'Viewer'}>
        <button v-if="active" id="exit" class="exit" ${exit} ${kind === 'directive' ? '@fullscreen-error="report($event.detail)"' : ''}>${text.exit}</button>
        <p v-if="active && showDetails && !pageOnly && !teleport" role="status">${text.hidden}</p>
      </${tag}>
    </div>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
${sampleStyles}
</style>
`
}

export const sampleStyles = `
.lab { --sample-bg: #f6f6f7; --sample-surface: #fff; --sample-text: #3c3c43; --sample-border: #c2c2c4; --sample-accent: #5b51d8; --sample-button-text: #fff; box-sizing: border-box; font: 14px/1.7 system-ui, sans-serif; color: var(--sample-text); }
.dark .lab { --sample-bg: #1b1b1f; --sample-surface: #202127; --sample-text: #dfdfe5; --sample-border: #67676c; --sample-accent: #aaa2ff; --sample-button-text: #202127; }
.lab { padding: 16px; background: var(--sample-bg); }
button, input { font: inherit; }
button { padding: 8px 16px; border: 1px solid var(--sample-accent); border-radius: 6px; background: var(--sample-accent); color: var(--sample-button-text); cursor: pointer; }
button:hover { filter: brightness(.94); }
button:disabled { opacity: .5; cursor: default; }
button:focus-visible, input:focus-visible { outline: 2px solid var(--sample-accent); outline-offset: 3px; }
input { accent-color: var(--sample-accent); }
.options { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; padding-bottom: 16px; }
.options label { display: flex; gap: 6px; align-items: center; }
.options button { width: 100%; padding: 12px 16px; font-size: 16px; }
.surface-placeholder { height: 300px; }
.surface { position: relative; height: 300px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; padding: 10px; background: var(--sample-surface); border: 1px solid var(--sample-border); border-radius: 8px; }
.surface.demo-fullscreen { z-index: 10000; min-height: 100vh; height: 100vh; border-radius: 0; padding: 20px 24px 72px; }
.image-preview { flex: 1; min-height: 0; width: 100%; }
.image-trigger { display: block; width: 100%; height: 100%; padding: 0; border: 0; border-radius: 0; background: transparent; cursor: zoom-in; }
.image-trigger:hover { background: transparent; filter: none; }
.gallery-image { position: static; display: block; width: 100%; height: 100%; object-fit: contain; }
.exit { position: absolute; top: 16px; right: 16px; }
.surface p[role="status"] { position: absolute; bottom: 68px; margin: 0; padding: 6px 12px; background: var(--sample-surface); font-size: 12px; }
`
