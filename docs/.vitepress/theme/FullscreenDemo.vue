<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useData } from 'vitepress'
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
const pageOnly = ref(true)
const teleport = ref(true)
const error = ref('')
const target = ref<HTMLElement>()
const { lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const text = computed(() =>
  english.value
    ? {
        component: 'Component example',
        directive: 'Directive example',
        api: 'API example',
        active: 'Fullscreen',
        inactive: 'Not fullscreen',
        pageOnly: 'Page-only fullscreen',
        teleport: 'Move to body',
        directiveButton: 'Toggle with directive',
        enter: 'Enter fullscreen',
        exit: 'Exit fullscreen',
        title: 'Example content',
        description:
          'This area can contain a chart, an image or other page content.',
        hint: 'Use the button above to enter fullscreen.',
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
        active: '全屏中',
        inactive: '未全屏',
        pageOnly: '仅网页全屏',
        teleport: '移到 body',
        directiveButton: '点击指令按钮',
        enter: '进入全屏',
        exit: '退出全屏',
        title: '示例内容',
        description: '这个区域可以放置图表、图片或其他页面内容。',
        hint: '点击上方按钮进入全屏。',
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
    <div class="demo-toolbar">
      <span class="demo-eyebrow">{{ text[kind] }}</span>
      <span class="demo-state" role="status">{{
        active ? text.active : text.inactive
      }}</span>
    </div>
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
      :page-only="pageOnly"
      :teleport="teleport"
      :exit-on-click-wrapper="false"
      fullscreen-class="demo-fullscreen"
      @error="report"
    >
      <div class="demo-card">
        <h3>{{ text.title }}</h3>
        <p>{{ text.description }}</p>
        <div class="demo-bars" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </div>
        <button v-if="active" class="demo-button demo-exit" @click="exit">
          {{ text.exit }}
        </button>
        <span v-else class="demo-hint">{{ text.hint }}</span>
      </div>
    </component>
    <p class="demo-caption">
      {{ pageOnly ? text.pageCaption : text.nativeCaption }}
    </p>
    <p v-if="error" role="alert" class="demo-error">
      {{ text.error }} {{ error }}
    </p>
  </section>
</template>
