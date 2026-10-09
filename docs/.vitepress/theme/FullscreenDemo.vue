<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import {
  api,
  component as Fullscreen,
  directive as vFullscreen,
} from 'vue-fullscreen'

const props = withDefaults(
  defineProps<{ kind?: 'component' | 'directive' | 'api' }>(),
  { kind: 'component' },
)
const active = ref(false)
const pageOnly = ref(false)
const teleport = ref(true)
const error = ref('')
const target = ref<HTMLElement>()
const photos = [
  { id: 'DSCF2734', width: 4896, height: 3264 },
  { id: 'DSCF3389', width: 3840, height: 2560 },
  { id: 'IMG_20241001_140036', width: 4080, height: 3060 },
  { id: 'IMG_20250726_130738', width: 4096, height: 3072 },
  { id: 'IMG_20260427_170326', width: 4096, height: 3072 },
  { id: 'P1020132', width: 3776, height: 2520 },
].map((photo, index) => ({
  ...photo,
  zh: `图片 ${index + 1}`,
  en: `Image ${index + 1}`,
}))
const selected = ref(0)
const photo = computed(() => photos[selected.value])
const photoUrl = (id: string, size: 'thumb' | 'preview' | 'full' = 'thumb') =>
  withBase(`/images/gallery/${id}-${size}.webp`)
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
        teleport: 'Move to body',
        directiveButton: 'Toggle with directive',
        enter: 'Enter fullscreen',
        exit: 'Exit fullscreen',
        previous: 'Previous image',
        next: 'Next image',
        gallery: 'Image browser',
        credit: 'Photos: personal collection',
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
        teleport: '移到 body',
        directiveButton: '点击指令按钮',
        enter: '进入全屏',
        exit: '退出全屏',
        previous: '上一张',
        next: '下一张',
        gallery: '图片浏览',
        credit: '图片：个人摄影',
        pageCaption: '网页全屏保留浏览器工具栏，按 Esc 或点击退出按钮退出。',
        nativeCaption: '原生全屏由浏览器提供，是否可用取决于浏览器支持与权限。',
        error: '无法进入全屏：',
      },
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
  else void api.request(target.value, options.value).catch(report)
}
function exit() {
  if (props.kind === 'component') active.value = false
  else void api.exit().catch(report)
}
onBeforeUnmount(() => {
  if (props.kind !== 'component' && api.element === target.value)
    void api.exit().catch(() => {})
})
</script>

<template>
  <section class="fullscreen-demo" :data-demo="kind" :aria-label="text[kind]">
    <div class="demo-controls">
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
        <button v-if="active" class="gallery-exit" @click="exit">
          {{ text.exit }}
        </button>
      </div>
      <div class="gallery-stage">
        <img
          class="gallery-image"
          :src="photoUrl(photo.id, active ? 'full' : 'preview')"
          :alt="english ? photo.en : photo.zh"
          :width="photo.width"
          :height="photo.height"
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
      <div class="gallery-thumbnails" :aria-label="text.gallery">
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
    <p class="demo-caption">
      {{ pageOnly ? text.pageCaption : text.nativeCaption }}
      <span>{{ text.credit }}</span>
    </p>
    <p v-if="error" role="alert" class="demo-error">
      {{ text.error }} {{ error }}
    </p>
  </section>
</template>
