<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress'
import {
  fullscreen,
  Fullscreen,
  vFullscreen,
  useFullscreen,
} from 'vue-fullscreen'

const props = withDefaults(
  defineProps<{
    kind?: 'component' | 'directive' | 'api'
    simple?: boolean
    compareTeleport?: boolean
  }>(),
  { kind: 'component', simple: false, compareTeleport: false },
)
const active = ref(false)
const pageOnly = ref(false)
const teleport = ref(!props.compareTeleport)
const popup = ref(false)
watch(active, (value) => {
  if (!value) popup.value = false
})
const error = ref('')
const target = ref<HTMLElement>()
const controls = useFullscreen(target, {
  pageOnly,
  teleport,
  fullscreenClass: 'demo-fullscreen',
})
watch(controls.isFullscreen, (value) => {
  if (props.kind === 'api') active.value = value
})
// Use the original demo's image service with stable IDs across sizes.
const photos = Array.from({ length: 6 }, (_, index) => ({
  id: 10 + index,
  zh: `图片 ${index + 1}`,
  en: `Image ${index + 1}`,
}))
const selected = ref(0)
const photo = computed(() => photos[selected.value])
const photoSizes = { thumb: '128/72', preview: '640/360', full: '1280/720' }
const photoUrl = (id: number, size: 'thumb' | 'preview' | 'full' = 'thumb') =>
  `https://picsum.photos/id/${id}/${photoSizes[size]}`
function movePhoto(offset: number) {
  selected.value = (selected.value + offset + photos.length) % photos.length
}
const { lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const text = computed(() =>
  english.value
    ? {
        component: 'Component example',
        directive: 'Directive example',
        api: 'API example',
        pageOnly: 'Page-only fullscreen',
        teleport: 'teleport',
        directiveButton: 'Toggle with directive',
        enter: 'Enter fullscreen',
        exit: 'Exit fullscreen',
        previous: 'Previous image',
        next: 'Next image',
        gallery: 'Image browser',
        popup: 'Details',
        popupTitle: 'Image details',
        popupContent:
          'This popup is mounted under body, like a dialog from a UI library.',
        closePopup: 'Close popup',
        moved: 'Native fullscreen element: body',
        stayed: 'Native fullscreen element: image panel',
        pageStatus: 'Page-only fullscreen · body popups remain visible',
        hiddenPopup:
          'The popup is open under body, but is outside the native fullscreen element. Exit and enable “teleport” to see it.',
        pageComparison:
          'Page-only mode displays the body popup with either setting. Turn it off to compare popup visibility in native fullscreen.',
        nativeWithout:
          'The image panel fills the screen, but the body popup is outside this fullscreen element and cannot appear.',
        nativeWith:
          'The image panel fills the screen. Body is the fullscreen element, so its popup can appear too.',
        pageCaption:
          'Page-only mode keeps the browser toolbar visible. Press Esc or use the exit button to leave.',
        nativeCaption:
          'Native mode requests browser fullscreen. Availability depends on the browser and its permissions.',
        error: 'Fullscreen request failed:',
      }
    : {
        component: '组件示例',
        directive: '指令示例',
        api: 'API 示例',
        pageOnly: '仅网页全屏',
        teleport: 'teleport',
        directiveButton: '点击指令按钮',
        enter: '进入全屏',
        exit: '退出全屏',
        previous: '上一张',
        next: '下一张',
        gallery: '图片浏览',
        popup: '详情',
        popupTitle: '图片详情',
        popupContent: '这个弹窗挂载在 body 下，模拟 UI 组件库的对话框。',
        closePopup: '关闭弹窗',
        moved: '原生全屏元素：body',
        stayed: '原生全屏元素：图片区域',
        pageStatus: '网页全屏 · body 弹窗均可见',
        hiddenPopup:
          '弹窗已在 body 下打开，但不属于当前原生全屏元素。退出并勾选「teleport」后再试。',
        pageComparison:
          '网页全屏下，无论是否移动，body 弹窗都能显示。请关闭「仅网页全屏」，对比原生全屏下的弹窗可见性。',
        nativeWithout:
          '图片区域会铺满屏幕，但 body 弹窗位于全屏元素之外，无法显示。',
        nativeWith:
          '图片区域同样铺满屏幕；此时 body 是全屏元素，其下的弹窗也能显示。',
        pageCaption: '网页全屏保留浏览器工具栏，按 Esc 或点击退出按钮退出。',
        nativeCaption: '原生全屏由浏览器提供，是否可用取决于浏览器支持与权限。',
        error: '无法进入全屏：',
      },
)
const comparisonCaption = computed(() =>
  pageOnly.value
    ? text.value.pageComparison
    : teleport.value
      ? text.value.nativeWith
      : text.value.nativeWithout,
)
const options = computed(() => ({
  target: `#demo-${props.kind}`,
  pageOnly: pageOnly.value,
  teleport: teleport.value,
  fullscreenClass: 'demo-fullscreen',
  callback: (value: boolean) => {
    active.value = value
  },
}))
function report(value: unknown) {
  active.value = false
  error.value = value instanceof Error ? value.message : String(value)
}
function enter() {
  error.value = ''
  if (props.kind === 'component') active.value = true
  else void controls.enter().catch(report)
}
function exit() {
  if (props.kind === 'component') active.value = false
  else if (props.kind === 'api') void controls.exit().catch(report)
  else void fullscreen.exit().catch(report)
}
onBeforeUnmount(() => {
  if (props.kind === 'directive' && fullscreen.element === target.value)
    void fullscreen.exit().catch(() => {})
})
</script>

<template>
  <section class="fullscreen-demo" :data-demo="kind" :aria-label="text[kind]">
    <div v-if="!simple" class="demo-controls">
      <label
        ><input v-model="pageOnly" type="checkbox" :disabled="active" />
        {{ text.pageOnly }}</label
      >
      <label
        ><input v-model="teleport" type="checkbox" :disabled="active" />
        {{ text.teleport }}</label
      >
      <button
        v-if="kind === 'directive'"
        v-fullscreen="options"
        class="demo-button"
        :disabled="active"
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
      :id="`demo-${kind}`"
      ref="target"
      v-model="active"
      class="demo-surface"
      tabindex="0"
      :aria-label="text.gallery"
      @keydown.left.prevent="movePhoto(-1)"
      @keydown.right.prevent="movePhoto(1)"
      :page-only="pageOnly"
      :teleport="teleport"
      :exit-on-click-wrapper="false"
      fullscreen-class="demo-fullscreen"
      @error="report"
    >
      <div class="gallery-topbar">
        <span>{{ english ? photo.en : photo.zh }}</span>
        <span class="gallery-count" aria-live="polite"
          >{{ selected + 1 }} / {{ photos.length }}</span
        >
        <button
          v-if="compareTeleport"
          class="gallery-exit"
          :aria-expanded="popup"
          @click="popup = !popup"
        >
          {{ text.popup }}
        </button>
        <button v-if="simple && !active" class="gallery-exit" @click="enter">
          {{ text.enter }}
        </button>
        <button v-if="active" class="gallery-exit" @click="exit">
          {{ text.exit }}
        </button>
      </div>
      <div
        v-if="compareTeleport && active"
        class="demo-comparison-status"
        aria-live="polite"
      >
        <span>{{
          pageOnly ? text.pageStatus : teleport ? text.moved : text.stayed
        }}</span>
        <p>{{ comparisonCaption }}</p>
        <p v-if="popup && !pageOnly && !teleport" role="status">
          {{ text.hiddenPopup }}
        </p>
      </div>
      <div class="gallery-stage">
        <img
          class="gallery-image"
          :src="photoUrl(photo.id, active ? 'full' : 'preview')"
          :alt="english ? photo.en : photo.zh"
          width="1280"
          height="720"
          decoding="async"
        />
        <button
          class="gallery-arrow gallery-previous"
          :aria-label="text.previous"
          @click="movePhoto(-1)"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          class="gallery-arrow gallery-next"
          :aria-label="text.next"
          @click="movePhoto(1)"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <div
        v-show="active"
        class="gallery-thumbnails"
        :aria-label="text.gallery"
      >
        <button
          v-for="(item, index) in photos"
          :key="item.id"
          :aria-label="english ? item.en : item.zh"
          :aria-pressed="selected === index"
          @click="selected = index"
        >
          <img
            :src="photoUrl(item.id)"
            alt=""
            width="64"
            height="40"
            loading="lazy"
          />
        </button>
      </div>
    </component>
    <Teleport to="body">
      <aside
        v-if="compareTeleport && popup"
        class="demo-body-popup"
        role="dialog"
        :aria-label="text.popupTitle"
      >
        <span class="demo-popup-location">body</span>
        <h2>{{ text.popupTitle }}</h2>
        <p>
          {{ english ? photo.en : photo.zh }} · {{ selected + 1 }} /
          {{ photos.length }}
        </p>
        <p>{{ text.popupContent }}</p>
        <button class="demo-button" @click="popup = false">
          {{ text.closePopup }}
        </button>
      </aside>
    </Teleport>
    <p v-if="!simple && !compareTeleport" class="demo-caption">
      {{ pageOnly ? text.pageCaption : text.nativeCaption }}
    </p>
    <p v-if="error" role="alert" class="demo-error">
      {{ text.error }} {{ error }}
    </p>
  </section>
</template>
