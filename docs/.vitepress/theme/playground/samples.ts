export type Example = 'component' | 'directive' | 'api'

export function sample(kind: Example, vue2: boolean, english: boolean) {
  const text = english
    ? {
        title: 'Fullscreen lab',
        enter: 'Enter fullscreen',
        exit: 'Exit fullscreen',
        details: 'Details',
        image: 'Landscape',
        close: 'Close',
        popup: 'This popup is attached to document.body.',
      }
    : {
        title: '全屏实验室',
        enter: '进入全屏',
        exit: '退出全屏',
        details: '详情',
        image: '风景图片',
        close: '关闭',
        popup: '这个弹窗添加在 document.body 下。',
      }

  const script = vue2
    ? `<script>
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueFullscreen)

export default {
  data: () => ({
    active: false,
    pageOnly: false,
    teleport: true,
    showDetails: false,
  }),
  computed: {
    options() {
      return {
        target: '#target',
        pageOnly: this.pageOnly,
        teleport: this.teleport,
        callback: this.changed,
      }
    },
  },
  methods: {
    changed(isFullscreen) {
      this.active = isFullscreen
      if (!isFullscreen) this.showDetails = false
      console.log('isFullscreen:', isFullscreen)
    },
    ${
      kind === 'api'
        ? `enter() { return this.$fullscreen.request('target', this.options) },
    exit() { return this.$fullscreen.exit() },
    `
        : ''
    }details() {
      this.showDetails = !this.showDetails
      // Move the popup to body, like a UI library's append-to-body option.
      if (this.showDetails) document.body.appendChild(this.$refs.popup)
    },
  },
  beforeDestroy() {
    this.$refs.popup?.remove()
  },
}
</script>`
    : `<script setup>
import { ${kind === 'directive' ? 'computed, ' : ''}${kind === 'api' ? 'watch, ' : ''}ref } from 'vue'
import { ${kind === 'component' ? 'Fullscreen' : kind === 'directive' ? 'vFullscreen' : 'useFullscreen'} } from 'vue-fullscreen'

const pageOnly = ref(false)
const teleport = ref(true)
const showDetails = ref(false)
${
  kind === 'api'
    ? `const target = ref()
const { isFullscreen: active, enter, exit } = useFullscreen(target, {
  pageOnly,
  teleport,
})`
    : `const active = ref(false)`
}
${
  kind === 'directive'
    ? `const options = computed(() => ({
  target: '#target',
  pageOnly: pageOnly.value,
  teleport: teleport.value,
  callback: changed,
}))
`
    : ''
}function changed(isFullscreen) {
  ${kind !== 'api' ? 'active.value = isFullscreen\n  ' : ''}if (!isFullscreen) showDetails.value = false
  console.log('isFullscreen:', isFullscreen)
}
${kind === 'api' ? 'watch(active, changed)\n' : ''}
</script>`

  const enter =
    kind === 'component'
      ? '@click="active = true"'
      : kind === 'directive'
        ? 'v-fullscreen="options"'
        : '@click="enter"'
  const exit =
    kind === 'component'
      ? '@click="active = false"'
      : kind === 'directive'
        ? 'v-fullscreen="options"'
        : '@click="exit"'
  const tag =
    kind === 'component' ? (vue2 ? 'fullscreen' : 'Fullscreen') : 'section'
  const props =
    kind === 'component'
      ? 'v-model="active" :page-only="pageOnly" :teleport="teleport" @change="changed"'
      : kind === 'api' && !vue2
        ? 'ref="target"'
        : ''
  const popup = `<aside ${vue2 ? 'ref="popup"' : ''} v-show="showDetails" class="popup">
      <p>${text.popup}</p>
      <button @click="showDetails = false">${text.close}</button>
    </aside>`

  return `${script}

<template>
  <div class="lab">
    <header class="options">
      <label><input v-model="pageOnly" type="checkbox" :disabled="active"> pageOnly</label>
      <label><input v-model="teleport" type="checkbox" :disabled="active"> teleport</label>
      <span>isFullscreen: {{ active }}</span>
    </header>
    <${tag} id="target" class="surface" ${props}>
      <span class="eyebrow">VUE-FULLSCREEN / ${kind.toUpperCase()}</span>
      <h1>${text.title}</h1>
      <button class="image-trigger" aria-label="${text.details}" :aria-expanded="showDetails ? 'true' : 'false'" ${vue2 ? '@click="details"' : '@click="showDetails = !showDetails"'}>
        <img src="https://picsum.photos/id/10/1280/720" alt="${text.image}" width="1280" height="720">
      </button>
      <div class="actions">
        ${
          kind === 'directive'
            ? `<button v-fullscreen="options">{{ active ? '${text.exit}' : '${text.enter}' }}</button>`
            : `<button v-if="!active" ${enter}>${text.enter}</button>
        <button v-else ${exit}>${text.exit}</button>`
        }
      </div>
    </${tag}>
    ${vue2 ? popup : `<Teleport to="body">\n    ${popup}\n    </Teleport>`}
  </div>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; color: #e2e8f0; background: #101820; }
button, input { font: inherit; }
button { padding: 9px 16px; border: 1px solid #8194ab; border-radius: 6px; background: transparent; color: inherit; cursor: pointer; }
button:hover { background: #ffffff15; }
.options { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; font-size: 13px; }
.options span { margin-left: auto; color: #a4b5c8; }
.surface { position: relative; height: 340px; display: flex; flex-direction: column; align-items: center; padding: 16px 24px 80px; background: #172737; }
.surface.fullscreen { min-height: 100vh; }
.eyebrow { color: #8abbd5; font: 11px monospace; letter-spacing: .16em; }
h1 { margin: 8px 0 12px; font-size: clamp(20px, 3vw, 28px); font-weight: 500; }
.image-trigger { flex: 1; min-height: 0; width: 100%; padding: 0; border: 0; background: transparent; cursor: pointer; }
.image-trigger:hover { background: transparent; }
.image-trigger img { display: block; width: 100%; height: 100%; object-fit: contain; }
.image-trigger:focus-visible { outline: 2px solid #8abbd5; outline-offset: 3px; }
.actions { position: absolute; bottom: 24px; display: flex; gap: 12px; }
.popup { position: fixed; z-index: 100000; top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(320px, 85vw); padding: 24px; border: 1px solid #8194ab; border-radius: 12px; background: #243c50; box-shadow: 0 16px 60px #0008; }
.popup p { margin: 0 0 20px; line-height: 1.7; }
</style>
`
}
