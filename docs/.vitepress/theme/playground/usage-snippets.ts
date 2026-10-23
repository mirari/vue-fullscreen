import type { Example } from './samples'

export function usageSnippet(kind: Example, vue2: boolean, english: boolean) {
  const enter = english ? 'Enter fullscreen' : '进入全屏'
  const exit = english ? 'Exit fullscreen' : '退出全屏'
  const content = english ? 'Your fullscreen content' : '需要全屏的内容'
  const options = `target: '#panel',
    pageOnly: false,
    teleport: true,
    callback: (isFullscreen) => { ${vue2 ? 'this.active' : 'active.value'} = isFullscreen },`
  const vue3Scripts = {
    component: `import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const active = ref(false)`,
    directive: `import { ref } from 'vue'
import { vFullscreen } from 'vue-fullscreen'

const active = ref(false)
const options = {
    ${options}
}`,
    api: `import { ref } from 'vue'
import { useFullscreen } from 'vue-fullscreen'

const target = ref()
const { isFullscreen: active, enter, exit } = useFullscreen(target, {
  pageOnly: false,
  teleport: true,
})`,
  }
  const vue2Scripts = {
    component: `import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueFullscreen)

export default {
  data: () => ({ active: false }),
  methods: {
    report(error) { this.active = false; console.error(error) },
  },
}`,
    directive: `import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueFullscreen)

export default {
  data() {
    return {
      active: false,
      options: {
        ${options}
      },
    }
  },
  methods: {
    report(error) { this.active = false; console.error(error) },
  },
}`,
    api: `import { fullscreen } from 'vue-fullscreen'

export default {
  data: () => ({ active: false }),
  methods: {
    enter() {
      fullscreen.request(this.$refs.target, {
        pageOnly: false,
        teleport: true,
        callback: (isFullscreen) => { this.active = isFullscreen },
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
      ? '@click="active = true"'
      : kind === 'directive'
        ? 'v-fullscreen="options" @fullscreen-error="report($event.detail)"'
        : `@click="${vue2 ? 'enter' : 'enter().catch(report)'}"`
  const exitAction =
    kind === 'component'
      ? '@click="active = false"'
      : kind === 'directive'
        ? 'v-fullscreen="options" @fullscreen-error="report($event.detail)"'
        : `@click="${vue2 ? 'exit' : 'exit().catch(report)'}"`
  const tag =
    kind === 'component' ? (vue2 ? 'fullscreen' : 'Fullscreen') : 'section'
  const attributes =
    kind === 'component'
      ? 'v-model="active" :page-only="false" :teleport="true" @error="report"'
      : kind === 'directive'
        ? 'id="panel"'
        : 'ref="target"'

  return `<script${vue2 ? '' : ' setup'}>
${
  vue2
    ? vue2Scripts[kind]
    : `${vue3Scripts[kind]}

function report(error) { ${kind === 'api' ? '' : 'active.value = false; '}console.error(error) }`
}
</script>

<template>
  <div>
    <button :disabled="active" ${enterAction}>${enter}</button>
    <${tag} ${attributes}>
      <!-- ${content} -->
      <button v-if="active" ${exitAction}>${exit}</button>
    </${tag}>
  </div>
</template>
`
}
