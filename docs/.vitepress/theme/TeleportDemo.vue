<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { component as Fullscreen } from 'vue-fullscreen'
const { lang } = useData()
const en = computed(() => lang.value.startsWith('en'))
const active = ref(false)
const pageOnly = ref(true)
const teleport = ref(false)
const popup = ref(false)
const error = ref('')
watch(active, () => {
  popup.value = false
})
</script>

<template>
  <section class="teleport-demo" data-demo="teleport">
    <div class="demo-controls">
      <label
        ><input v-model="pageOnly" type="checkbox" :disabled="active" />{{
          en ? 'Page-only fullscreen' : '仅网页全屏'
        }}</label
      >
      <label
        ><input
          v-model="teleport"
          type="checkbox"
          :disabled="active"
        />teleport</label
      >
      <button class="demo-button" :disabled="active" @click="active = true">
        {{ en ? 'Enter fullscreen' : '进入全屏' }}
      </button>
    </div>
    <div class="teleport-parent">
      <Fullscreen
        id="teleport-target"
        v-model="active"
        :page-only="pageOnly"
        :teleport="teleport"
        :exit-on-click-wrapper="false"
        class="teleport-surface"
        fullscreen-class="teleport-active"
        @error="error = $event.message"
      >
        <p>
          {{
            en
              ? 'This panel starts inside a transformed container.'
              : '这个面板原本位于带 transform 的父容器内。'
          }}
        </p>
        <p v-if="active">
          {{
            en
              ? 'Compare its size, then try opening the popup.'
              : '观察面板是否铺满页面，再尝试打开弹窗。'
          }}
        </p>
        <button class="demo-button" @click="popup = !popup">
          {{ en ? 'Toggle body popup' : '切换 body 弹窗' }}
        </button>
        <button v-if="active" class="demo-button" @click="active = false">
          {{ en ? 'Exit fullscreen' : '退出全屏' }}
        </button>
      </Fullscreen>
    </div>
    <Teleport to="body">
      <aside
        v-if="popup"
        class="teleport-popup"
        role="dialog"
        :aria-label="en ? 'Body popup' : 'Body 弹窗'"
      >
        <p>
          {{
            en
              ? 'This popup is mounted directly under body.'
              : '这个弹窗直接挂载在 body 下。'
          }}
        </p>
        <button class="demo-button" @click="popup = false">
          {{ en ? 'Close popup' : '关闭弹窗' }}
        </button>
      </aside>
    </Teleport>
    <p v-if="error" role="alert">{{ error }}</p>
  </section>
</template>

<style>
.teleport-demo {
  margin: 24px 0;
}
.teleport-parent {
  transform: translateZ(0);
  overflow: hidden;
  height: 260px;
  border: 2px dashed #64748b;
}
.teleport-surface {
  box-sizing: border-box;
  padding: 20px;
  background: #eff6ff;
  color: #172554;
}
.teleport-active {
  z-index: 1000;
  overflow: auto;
}
.teleport-popup {
  position: fixed;
  bottom: 24px;
  right: 24px;
  max-width: min(360px, calc(100vw - 48px));
  padding: 20px;
  border: 2px solid #2563eb;
  border-radius: 8px;
  background: white;
  color: #172554;
  z-index: 1001;
  box-shadow: 0 4px 20px #0003;
}
</style>
