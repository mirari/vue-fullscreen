<template>
  <div>
    <label class="checkbox">
      <input
        v-model="pageOnly"
        type="checkbox"
        name="button"
      > pageOnly
    </label>
    <label class="checkbox">
      <input
        v-model="teleport"
        type="checkbox"
        name="button"
      > teleport
    </label>
    <fullscreen v-model="fullscreen" :teleport="teleport" :page-only="pageOnly">
      <div class="fullscreen-wrapper">
        <button type="button" class="button" @click="toggle">
          {{ fullscreen ? 'exit fullscreen' : 'request fullscreen' }}
        </button>
        <img v-show="!fullscreen" :src="'//picsum.photos/640/360?random=1'">
        <img v-show="fullscreen" :src="'//picsum.photos/1280/720?random=1'">
      </div>
    </fullscreen>
  </div>
</template>

<script>
import { component } from '../../../src'

export default {
  name: 'ComponentExample',
  components: {
    fullscreen: component,
  },
  data() {
    return {
      fullscreen: false,
      teleport: true,
      pageOnly: false,
    }
  },
  methods: {
    toggle() {
      this.fullscreen = !this.fullscreen
    },
  },
}
</script>

<style lang="scss" scoped>
.fullscreen-wrapper {
  width: 100%;
  height: 100%;
  background: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .button {
    margin-bottom: 20px;
  }
}
</style>
