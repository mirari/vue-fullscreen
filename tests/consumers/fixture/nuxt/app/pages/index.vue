<script setup>
import { onMounted, ref } from 'vue'
import { Fullscreen, vFullscreen, useFullscreen } from 'vue-fullscreen'
const active = ref(false)
const ready = ref(false)
const error = ref('')
const target = ref()
const directiveActive = ref(false)
const pageOnly = ref(true)
const {
  enter,
  exit,
  isFullscreen: apiActive,
} = useFullscreen(target, { pageOnly, teleport: true })
onMounted(() => {
  pageOnly.value = !location.search.includes('native')
  ready.value = true
})
const options = () => ({
  pageOnly: pageOnly.value,
  teleport: true,
  callback: (isFullscreen) => {
    directiveActive.value = isFullscreen
  },
})
</script>

<template>
  <main>
    <h1>Published package consumer</h1>
    <p id="ready">{{ ready ? 'ready' : 'server-rendered' }}</p>
    <button id="enter" @click="active = true">Enter</button>
    <Fullscreen
      id="target"
      v-model="active"
      :page-only="pageOnly"
      teleport
      @error="error = $event.message"
    >
      <p>Server rendered fullscreen content</p>
      <button id="exit" @click="active = false">Exit</button>
    </Fullscreen>
    <output id="state">{{ active }}</output>
    <button id="api" @click="enter().catch((e) => (error = e.message))">
      API
    </button>
    <button
      id="directive"
      v-fullscreen="{ target: '#api-target', ...options() }"
    >
      Directive
    </button>
    <section id="api-target" ref="target">
      <button
        v-if="directiveActive"
        id="api-exit"
        v-fullscreen="{ target: '#api-target', ...options() }"
      >
        Exit directive
      </button>
      <button
        v-else
        id="api-exit"
        @click="exit().catch((e) => (error = e.message))"
      >
        Exit API
      </button>
    </section>
    <output id="api-state">{{ apiActive || directiveActive }}</output>
    <p role="alert">{{ error }}</p>
  </main>
</template>

<style>
.fullscreen {
  background: white;
  color: black;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}
</style>
