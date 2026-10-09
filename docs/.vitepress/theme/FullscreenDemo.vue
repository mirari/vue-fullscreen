<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
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
const label = computed(
  () => ({ component: '组件', directive: '指令', api: 'API' })[props.kind],
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
  <section
    class="fullscreen-demo"
    :data-demo="kind"
    :aria-label="`${label}交互示例`"
  >
    <div class="demo-toolbar">
      <span class="demo-eyebrow">LIVE · {{ label }}</span>
      <span class="demo-state" role="status">{{
        active ? '全屏中' : '未全屏'
      }}</span>
    </div>
    <div class="demo-controls">
      <label
        ><input v-model="pageOnly" type="checkbox" :disabled="active" />
        仅网页全屏</label
      >
      <label
        ><input v-model="teleport" type="checkbox" :disabled="active" /> 移到
        body</label
      >
      <button
        v-if="kind === 'directive'"
        v-fullscreen="options"
        class="demo-button"
        :disabled="active"
        @fullscreen-error="report($event.detail)"
      >
        点击指令按钮
      </button>
      <button v-else class="demo-button" :disabled="active" @click="enter">
        进入全屏
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
        <span class="demo-eyebrow">YOUR CONTENT, MORE SPACE</span>
        <h3>让内容占满视野。</h3>
        <p>试试全屏查看报表、图片或工作面板。</p>
        <div class="demo-bars" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </div>
        <button v-if="active" class="demo-button demo-exit" @click="exit">
          退出全屏
        </button>
        <span v-else class="demo-hint">点击上方按钮体验</span>
      </div>
    </component>
    <p class="demo-caption">
      {{
        pageOnly
          ? '网页全屏：保留浏览器工具栏，按 Esc 或点击按钮退出。'
          : '原生全屏：请求隐藏浏览器工具栏，受浏览器权限与设备支持限制。'
      }}
    </p>
    <p v-if="error" role="alert" class="demo-error">
      无法进入全屏：{{ error }}
    </p>
  </section>
</template>
