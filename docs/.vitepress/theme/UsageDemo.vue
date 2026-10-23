<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import type { Example } from './playground/samples'

const props = defineProps<{ kind: Example }>()
const { lang } = useData()
const host = ref<HTMLElement>()
const error = ref('')
const ready = ref(false)
let disposed = false
let unmount: (() => void) | undefined
onMounted(async () => {
  try {
    const { mount } = await import(
      /* @vite-ignore */ withBase('/playground/vue3/demos.js')
    )
    if (disposed) return
    const hash = location.hash
    let anchor: HTMLElement | null = null
    try {
      anchor = document.getElementById(decodeURIComponent(hash.slice(1)))
    } catch {
      /* Invalid fragments have no target. */
    }
    const top = anchor?.getBoundingClientRect().top
    const scroll = window.scrollY
    unmount = mount(host.value, props.kind, lang.value.startsWith('en'))
    ready.value = true
    await nextTick()
    if (
      !disposed &&
      anchor?.isConnected &&
      top !== undefined &&
      top >= 0 &&
      top < innerHeight &&
      hash === location.hash &&
      scroll === window.scrollY
    )
      window.scrollBy(0, anchor.getBoundingClientRect().top - top)
  } catch (reason) {
    if (!disposed) error.value = String(reason)
  }
})
onBeforeUnmount(() => {
  disposed = true
  unmount?.()
})
</script>

<template>
  <div class="usage-demo vp-raw" :data-demo="kind">
    <p v-if="error" role="alert">{{ error }}</p>
    <p v-else-if="!ready" role="status">
      {{ lang.startsWith('en') ? 'Loading example…' : '正在加载示例…' }}
    </p>
    <div ref="host"></div>
  </div>
</template>

<style scoped>
.usage-demo {
  min-height: 380px;
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.usage-demo > p {
  padding: 24px;
}
</style>
