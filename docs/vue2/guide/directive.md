# Vue 2 指令

在 `directives` 中局部注册指令，点击按钮即可切换目标元素的全屏状态。

```vue
<template>
  <div>
    <button
      v-fullscreen.pageOnly.teleport="{ target: '#report' }"
      @fullscreen-error="error = $event.detail.message"
    >
      切换全屏
    </button>
    <section id="report">内容区域</section>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { directive } from 'vue-fullscreen'
export default {
  directives: { fullscreen: directive },
  data: () => ({ error: '' }),
}
</script>
```

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
