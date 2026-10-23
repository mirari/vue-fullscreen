import type { Example } from './samples'

export function usageSnippet(kind: Example, vue2: boolean, english: boolean) {
  const enter = english ? 'Enter fullscreen' : '进入全屏'
  const exit = english ? 'Exit fullscreen' : '退出全屏'
  const content = english ? 'Your fullscreen content' : '需要全屏的内容'
  const options = `target: '#panel',
    pageOnly: false,
    teleport: true,
    callback: (value) => { ${vue2 ? 'this.isFullscreen' : 'isFullscreen.value'} = value },`
  const vue3Scripts = {
    component: `import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const isFullscreen = ref(false)`,
    directive: `import { ref } from 'vue'
import { vFullscreen } from 'vue-fullscreen'

const isFullscreen = ref(false)
const options = {
    ${options}
}`,
    api: `import { ref } from 'vue'
import { useFullscreen } from 'vue-fullscreen'

const target = ref()
const { isFullscreen, enter, exit } = useFullscreen(target, {
  pageOnly: false,
  teleport: true,
})`,
  }
  const vue2Scripts = {
    component: `import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueFullscreen)

export default {
  data: () => ({ isFullscreen: false }),
  methods: {
    report(error) { this.isFullscreen = false; console.error(error) },
  },
}`,
    directive: `import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueFullscreen)

export default {
  data() {
    return {
      isFullscreen: false,
      options: {
        ${options}
      },
    }
  },
  methods: {
    report(error) { this.isFullscreen = false; console.error(error) },
  },
}`,
    api: `import { fullscreen } from 'vue-fullscreen'

export default {
  data: () => ({ isFullscreen: false }),
  methods: {
    enter() {
      fullscreen.enter(this.$refs.target, {
        pageOnly: false,
        teleport: true,
        callback: (isFullscreen) => { this.isFullscreen = isFullscreen },
      }).catch(console.error)
    },
    exit() {
      fullscreen.exit().catch(console.error)
    },
  },
  beforeDestroy() {
    if (fullscreen.element === this.$refs.target)
      void fullscreen.exit().catch(console.error)
  },
}`,
  }
  const enterAction =
    kind === 'component'
      ? '@click="isFullscreen = true"'
      : kind === 'directive'
        ? 'v-fullscreen="options" @fullscreen-error="report($event.detail)"'
        : `@click="${vue2 ? 'enter' : 'enter().catch(report)'}"`
  const exitAction =
    kind === 'component'
      ? '@click="isFullscreen = false"'
      : kind === 'directive'
        ? 'v-fullscreen="options" @fullscreen-error="report($event.detail)"'
        : `@click="${vue2 ? 'exit' : 'exit().catch(report)'}"`
  const tag =
    kind === 'component' ? (vue2 ? 'fullscreen' : 'Fullscreen') : 'section'
  const attributes =
    kind === 'component'
      ? 'v-model="isFullscreen" :page-only="false" :teleport="true" @error="report"'
      : kind === 'directive'
        ? 'id="panel"'
        : 'ref="target"'

  return `<script${vue2 ? '' : ' setup'}>
${
  vue2
    ? vue2Scripts[kind]
    : `${vue3Scripts[kind]}

function report(error) { ${kind === 'api' ? '' : 'isFullscreen.value = false; '}console.error(error) }`
}
</script>

<template>
  <div>
    <button :disabled="isFullscreen" ${enterAction}>${enter}</button>
    <${tag} ${attributes}>
      <button v-if="isFullscreen" ${exitAction}>${exit}</button>
      <!-- ${content} -->
    </${tag}>
  </div>
</template>
`
}
