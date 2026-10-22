<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
const props = defineProps<{
  comparison?: 'pageOnly' | 'teleport'
  kind?: 'component' | 'directive' | 'api'
}>()
const { lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const pageOnly = ref(false)
const source = computed(() =>
  withBase(
    `/vue2-demo/?lang=${english.value ? 'en' : 'zh'}${pageOnly.value ? '&pageOnly' : ''}${props.comparison ? `&compare=${props.comparison}` : ''}${props.kind ? `&kind=${props.kind}` : ''}`,
  ),
)
</script>

<template>
  <div class="vue2-demo" :data-comparison="comparison" :data-demo="kind">
    <label v-if="comparison !== 'teleport'"
      ><input v-model="pageOnly" type="checkbox" /> pageOnly</label
    >
    <p>
      <span v-if="comparison !== 'teleport'">{{
        english
          ? 'Page-only mode fills the embedded frame. Open the example separately to fill the browser viewport.'
          : '网页全屏只覆盖下方嵌入区域。独立打开示例后，可以体验覆盖整个网页的效果。'
      }}</span>
      <a :href="source" target="_blank" rel="noopener">{{
        english ? 'Open example separately' : '独立打开示例'
      }}</a>
    </p>
    <iframe
      :key="source"
      :src="source"
      :title="english ? 'Vue 2 fullscreen example' : 'Vue 2 全屏示例'"
      allow="fullscreen"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.vue2-demo {
  margin: 24px 0;
}
label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
iframe {
  width: 100%;
  height: 540px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: white;
}
</style>
