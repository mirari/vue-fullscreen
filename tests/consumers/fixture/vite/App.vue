<script setup>
import { onMounted, ref } from 'vue'
import { api } from 'vue-fullscreen'
const active = ref(false)
const ready = ref(false)
const error = ref('')
const target = ref()
const apiActive = ref(false)
const pageOnly = ref(true)
onMounted(() => {
  pageOnly.value = !location.search.includes('native')
  ready.value = true
})
const options = () => ({
  pageOnly: pageOnly.value,
  teleport: true,
  callback: (value) => {
    apiActive.value = value
  },
})
</script>

<template>
  <main>
    <h1>Published package consumer</h1>
    <p id="ready">{{ ready ? 'ready' : 'server-rendered' }}</p>
    <button id="enter" @click="active = true">Enter</button>
    <fullscreen
      id="target"
      v-model="active"
      :page-only="pageOnly"
      teleport
      @error="error = $event.message"
    >
      <p>Server rendered fullscreen content</p>
      <button id="exit" @click="active = false">Exit</button>
    </fullscreen>
    <output id="state">{{ active }}</output>
    <button
      id="api"
      @click="api.request(target, options()).catch((e) => (error = e.message))"
    >
      API
    </button>
    <button
      id="directive"
      v-fullscreen="{ target: '#api-target', ...options() }"
    >
      Directive
    </button>
    <section id="api-target" ref="target">
      <button id="api-exit" @click="api.exit()">Exit API</button>
    </section>
    <output id="api-state">{{ apiActive }}</output>
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
