<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { Fullscreen, vFullscreen, useFullscreen } from 'vue-fullscreen'
import { Viewer } from 'v-viewer'
import 'viewerjs/dist/viewer.css'

const props = withDefaults(
  defineProps<{
    kind?: 'component' | 'directive' | 'api'
    simple?: boolean
    comparePageOnly?: boolean
    compareTeleport?: boolean
  }>(),
  {
    kind: 'component',
    simple: false,
    comparePageOnly: false,
    compareTeleport: false,
  },
)
const demoId = computed(() =>
  props.comparePageOnly ? 'demo-page-only' : `demo-${props.kind}`,
)
const active = ref(false)
const pageOnly = ref(false)
const teleport = ref(!props.compareTeleport && !props.comparePageOnly)
const popup = ref(false)
const preview = ref<InstanceType<typeof Viewer>>()
const showDetails = computed(() => props.compareTeleport)
let readingPosition: { left: number; top: number } | undefined
function rememberReadingPosition() {
  if (!active.value && !readingPosition)
    readingPosition = { left: window.scrollX, top: window.scrollY }
}
watch(active, (value) => {
  if (showDetails.value && !value) preview.value?.hide()
})
function previewImage(index: number) {
  if (popup.value && selected.value === index) preview.value?.hide()
  else {
    selected.value = index
    preview.value?.view(index)
  }
}
async function fullscreenChanged(value: boolean) {
  await nextTick()
  // Page fullscreen changes the inline viewer's container without resizing the window.
  if (!showDetails.value) window.dispatchEvent(new Event('resize'))
  if (value) return
  // This documentation page scrolls the window. Keep the library independent
  // of the host application's choice of scroll container.
  if (readingPosition) {
    window.scrollTo({ ...readingPosition, behavior: 'instant' })
    readingPosition = undefined
  }
}
const error = ref('')
const target = ref<HTMLElement>()
const controls = useFullscreen(target, {
  pageOnly,
  teleport,
  fullscreenClass: 'demo-fullscreen',
})
watch(controls.isFullscreen, (value) => {
  if (props.kind === 'api') {
    active.value = value
    void fullscreenChanged(value)
  }
})
// Use the original demo's image service with stable IDs across sizes.
const photos = Array.from({ length: 6 }, (_, index) => ({
  id: 10 + index,
  zh: `图片 ${index + 1}`,
  en: `Image ${index + 1}`,
}))
const selected = ref(0)
const photoSizes = { thumb: '128/72', preview: '640/360', full: '1280/720' }
const photoUrl = (id: number, size: 'thumb' | 'preview' | 'full' = 'thumb') =>
  `https://picsum.photos/id/${id}/${photoSizes[size]}`
function movePhoto(offset: number, event: KeyboardEvent) {
  if (showDetails.value) return
  event.preventDefault()
  event.stopPropagation()
  if (offset < 0) preview.value?.prev(true)
  else preview.value?.next(true)
}
const { lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const text = computed(() =>
  english.value
    ? {
        component: 'Component example',
        directive: 'Directive example',
        api: 'API example',
        pageOnly: 'pageOnly',
        teleport: 'teleport',
        directiveButton: 'Toggle with directive',
        enter: 'Enter fullscreen',
        exit: 'Exit fullscreen',
        gallery: 'Image browser',
        popup: 'Preview image',
        hiddenPopup:
          'The popup is open under body, but is outside the native fullscreen element. Exit and enable “teleport” to see it.',
        error: 'Fullscreen request failed:',
      }
    : {
        component: '组件示例',
        directive: '指令示例',
        api: 'API 示例',
        pageOnly: 'pageOnly',
        teleport: 'teleport',
        directiveButton: '点击指令按钮',
        enter: '进入全屏',
        exit: '退出全屏',
        gallery: '图片浏览',
        popup: '预览图片',
        hiddenPopup:
          '弹窗已在 body 下打开，但不属于当前原生全屏元素。退出并勾选「teleport」后再试。',
        error: '无法进入全屏：',
      },
)
const options = computed(() => ({
  target: `#${demoId.value}`,
  pageOnly: pageOnly.value,
  teleport: teleport.value,
  fullscreenClass: 'demo-fullscreen',
  callback: (isFullscreen: boolean) => {
    active.value = isFullscreen
    void fullscreenChanged(isFullscreen)
  },
}))
function report(value: unknown) {
  active.value = false
  void fullscreenChanged(false)
  error.value = value instanceof Error ? value.message : String(value)
}
function enter() {
  rememberReadingPosition()
  error.value = ''
  if (props.kind === 'component') active.value = true
  else void controls.enter().catch(report)
}
function exit() {
  if (props.kind === 'component') active.value = false
  else if (props.kind === 'api') void controls.exit().catch(report)
}
onBeforeUnmount(() => {
  readingPosition = undefined
})
</script>

<template>
  <section
    class="fullscreen-demo vp-raw"
    :class="{ 'fullscreen-demo-home': simple }"
    :data-demo="comparePageOnly ? 'page-only' : kind"
    :data-comparison="
      comparePageOnly ? 'pageOnly' : compareTeleport ? 'teleport' : undefined
    "
    :aria-label="
      comparePageOnly ? 'pageOnly' : compareTeleport ? 'teleport' : text[kind]
    "
  >
    <div v-if="!simple" class="demo-controls">
      <label v-if="!compareTeleport"
        ><input v-model="pageOnly" type="checkbox" :disabled="active" />
        {{ comparePageOnly ? 'pageOnly' : text.pageOnly }}</label
      >
      <label v-if="!comparePageOnly"
        ><input v-model="teleport" type="checkbox" :disabled="active" />
        {{ text.teleport }}</label
      >
      <button
        v-if="kind === 'directive'"
        v-fullscreen="options"
        class="demo-button"
        :disabled="active"
        @click.capture="rememberReadingPosition"
        @fullscreen-error="report($event.detail)"
      >
        {{ text.directiveButton }}
      </button>
      <button v-else class="demo-button" :disabled="active" @click="enter">
        {{ text.enter }}
      </button>
    </div>
    <component
      :is="kind === 'component' ? Fullscreen : 'div'"
      :id="demoId"
      ref="target"
      v-model="active"
      class="demo-surface"
      tabindex="0"
      :aria-label="text.gallery"
      @keydown.left="movePhoto(-1, $event)"
      @keydown.right="movePhoto(1, $event)"
      :page-only="pageOnly"
      :teleport="teleport"
      :exit-on-click-wrapper="false"
      fullscreen-class="demo-fullscreen"
      @error="report"
      @change="fullscreenChanged"
    >
      <div v-if="simple || active" class="gallery-topbar">
        <button
          v-if="simple && !active"
          class="demo-button gallery-fullscreen-action"
          @click="enter"
        >
          {{ text.enter }}
        </button>
        <button
          v-if="active && kind === 'directive'"
          v-fullscreen="options"
          class="demo-button gallery-fullscreen-action"
          @fullscreen-error="report($event.detail)"
        >
          {{ text.exit }}
        </button>
        <button
          v-else-if="active"
          class="demo-button gallery-fullscreen-action"
          @click="exit"
        >
          {{ text.exit }}
        </button>
      </div>
      <div
        v-if="showDetails && active && popup && !pageOnly && !teleport"
        class="demo-comparison-status"
        aria-live="polite"
      >
        <p role="status">
          {{ text.hiddenPopup }}
        </p>
      </div>
      <div class="gallery-stage" :class="{ 'gallery-stage-grid': showDetails }">
        <Viewer
          v-if="showDetails"
          ref="preview"
          class="gallery-grid"
          :z-index="10001"
          :toolbar="false"
          :title="false"
          :transition="false"
          :focus="false"
          :fullscreen="false"
          url="data-source"
          @show="popup = true"
          @hidden="popup = false"
        >
          <button
            v-for="(item, index) in photos"
            :key="item.id"
            type="button"
            class="gallery-image-trigger"
            :aria-label="`${text.popup} ${index + 1}`"
            :aria-expanded="popup && selected === index"
            @click.stop="previewImage(index)"
          >
            <img
              class="gallery-image"
              :src="photoUrl(item.id, 'preview')"
              :data-source="photoUrl(item.id, 'full')"
              :alt="english ? item.en : item.zh"
              width="1280"
              height="720"
              decoding="async"
            />
          </button>
        </Viewer>
        <Viewer
          v-else
          ref="preview"
          class="inline-gallery-sources"
          inline
          :button="false"
          :toolbar="false"
          :title="false"
          :transition="false"
          :focus="false"
          :fullscreen="false"
          url="data-source"
        >
          <img
            v-for="item in photos"
            :key="item.id"
            :src="photoUrl(item.id)"
            :data-source="photoUrl(item.id, 'full')"
            :alt="english ? item.en : item.zh"
            width="1280"
            height="720"
          />
        </Viewer>
      </div>
    </component>
    <p v-if="error" role="alert" class="demo-error">
      {{ text.error }} {{ error }}
    </p>
  </section>
</template>
