# 指令：给按钮添加全屏操作

无需维护模型状态，点击绑定的按钮即可切换指定区域。

<ClientOnly><FullscreenDemo kind="directive" /></ClientOnly>

## 局部使用

```vue
<script setup>
import { directive as vFullscreen } from 'vue-fullscreen'
import { ref } from 'vue'

const error = ref('')
</script>

<template>
  <button
    v-fullscreen.pageOnly.teleport="{ target: '#report' }"
    @fullscreen-error="error = $event.detail.message"
  >
    切换报表全屏
  </button>
  <section id="report">
    <h2>报表</h2>
    <p>按 Esc 退出，或在实际业务中加入退出按钮。</p>
  </section>
  <p v-if="error" role="alert">{{ error }}</p>
</template>
```

Vue 2 可以在 `directives: { fullscreen: directive }` 中注册；使用全局插件时，两个 Vue 版本都可直接使用 `v-fullscreen`。

## 三种绑定形式

```vue
<!-- 不传参数：控制 document.body -->
<button v-fullscreen>整个页面全屏</button>

<!-- 字符串：CSS 选择器 -->
<button v-fullscreen="'#report'">报表全屏</button>

<!-- 对象：目标与配置 -->
<button v-fullscreen="{ target: '#report', pageOnly: true, teleport: true }">
  网页全屏
</button>
```

`target` 也可以是已经存在的 HTML 元素。选择器在点击时解析；未匹配到元素会派发错误事件，不会静默把 body 全屏。

## 修饰符与选项

`.pageOnly` 和 `.teleport` 对应同名配置。对象中的显式选项优先于修饰符。例如 `.pageOnly="{ pageOnly: false }"` 最终使用原生模式。

对象还支持 `fullscreenClass` 与 `callback(active)`。指令使用共享 API，所以 `api.exit()` 可以退出由指令开启的全屏。

## 捕获失败

指令通过原生冒泡事件 `fullscreen-error` 报告失败，错误对象在 `event.detail`。它不是组件的 `error` 事件。

```js
button.addEventListener('fullscreen-error', (event) => {
  console.error(event.detail)
})
```

如果按钮在全屏目标外面，原生全屏时可能看不到它。请在目标内部提供退出按钮，或让用户使用 Esc。
