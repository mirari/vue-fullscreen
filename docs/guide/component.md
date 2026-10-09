# 组件：让全屏跟随状态

把内容放进组件，用 `v-model` 控制。用户按 Esc 退出时，绑定的状态会自动变回 `false`。

<ClientOnly><FullscreenDemo /></ClientOnly>

## 局部使用

无需安装全局插件。Vue 3 可以直接导入组件；Vue 2 在 `components` 中注册。下方 `<script setup>` 写法要求 Vue 3.2+；Vue 3.0/3.1 可以沿用快速上手页的 Options API 写法。

::: code-group

```vue [Vue 3]
<script setup>
import { ref } from 'vue'
import { component as Fullscreen } from 'vue-fullscreen'

const active = ref(false)
const error = ref('')
</script>

<template>
  <button @click="active = true">进入全屏</button>
  <Fullscreen
    v-model="active"
    page-only
    teleport
    :exit-on-click-wrapper="false"
    @error="error = $event.message"
  >
    <h2>内容区域</h2>
    <button @click="active = false">退出全屏</button>
  </Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

```vue [Vue 2]
<template>
  <div>
    <button @click="active = true">进入全屏</button>
    <Fullscreen
      v-model="active"
      page-only
      teleport
      @error="error = $event.message"
    >
      <h2>内容区域</h2>
      <button @click="active = false">退出全屏</button>
    </Fullscreen>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { component as Fullscreen } from 'vue-fullscreen'

export default {
  components: { Fullscreen },
  data: () => ({ active: false, error: '' }),
}
</script>
```

:::

## 状态与事件

Vue 3 使用 `modelValue` / `update:modelValue`，Vue 2 使用 `value` / `input`。模板里的 `v-model` 自动处理这些差异。

- `change(active)`：全屏状态已发生变化，可以在这里同步其他 UI。
- `error(error)`：由模型或点击触发的请求失败；展示错误或允许重试。
- `update:fullscreen`：兼容旧的 `fullscreen` 属性，推荐新代码使用 `v-model`。

请求失败时，请根据需要把外部模型恢复为 `false`，以便下一次点击重新触发变化。程序直接调用组件方法时，使用 `try/catch` 处理返回的 Promise。

## 用 ref 调用方法

```vue
<script setup>
import { ref } from 'vue'
import { component as Fullscreen } from 'vue-fullscreen'

const panel = ref()
const error = ref('')
async function enter() {
  try {
    await panel.value.request()
  } catch (reason) {
    error.value = reason.message
  }
}
</script>

<template>
  <button @click="enter">进入全屏</button>
  <Fullscreen ref="panel" page-only>内容</Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

完整的属性、事件和方法列表见[组件参考](/reference/api#组件)。
