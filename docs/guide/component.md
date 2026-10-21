# 组件

把内容放进组件，用 `v-model` 控制。用户按 Esc 退出时，绑定的状态会自动变回 `false`。

<ClientOnly><FullscreenDemo /></ClientOnly>

## 局部使用

在使用的组件中导入 `Fullscreen`。下方 `<script setup>` 写法要求 Vue 3.2+；Vue 3.0/3.1 可在 `components` 中注册 `Fullscreen`，并在普通 `setup()` 中返回状态。

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

const active = ref(false)
const error = ref('')
function handleError(errorValue) {
  active.value = false
  error.value = errorValue.message
}
</script>

<template>
  <button @click="active = true">进入全屏</button>
  <Fullscreen
    v-model="active"
    page-only
    teleport
    :exit-on-click-wrapper="false"
    @error="handleError"
  >
    <h2>内容区域</h2>
    <button @click="active = false">退出全屏</button>
  </Fullscreen>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

## 状态与事件

模型使用 `modelValue` / `update:modelValue`。模板里的 `v-model` 自动处理这些差异。

- `change(active)`：全屏状态已发生变化，可以在这里同步其他 UI。
- `error(error)`：由模型或点击触发的请求失败；展示错误或允许重试。
- `update:fullscreen`：兼容旧的 `fullscreen` 属性，推荐新代码使用 `v-model`。

请求失败时，请根据需要把外部模型恢复为 `false`，以便下一次点击重新触发变化。程序直接调用组件方法时，使用 `try/catch` 处理返回的 Promise。

## 用 ref 调用方法

```vue
<script setup>
import { ref } from 'vue'
import { Fullscreen } from 'vue-fullscreen'

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

## 切换页面内容时保持全屏

把全屏容器放在会被替换的内容之外。切换标签页如此，使用 Vue Router 时也一样：让 `<router-view>` 位于稳定的全屏容器内部。

```vue
<Fullscreen v-model="active" teleport :exit-on-click-wrapper="false">
  <nav>
    <router-link to="/chart">图表</router-link>
    <router-link to="/table">表格</router-link>
  </nav>
  <router-view />
  <button @click="active = false">退出全屏</button>
</Fullscreen>
```

这段模板放在持久存在的应用布局中，像前面的示例一样导入 `Fullscreen`、声明 `active`，并配置路由。SPA 路由只替换内部视图，全屏容器需要保持挂载。如果每个路由页面各自创建全屏组件，切换时销毁组件就会退出全屏。跳转到另一个文档或刷新页面不能保留全屏。
