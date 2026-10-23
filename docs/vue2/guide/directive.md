# Vue 2 指令

点击绑定的元素即可切换目标区域的全屏状态，无需维护模型状态。

::: tip 触发器与全屏目标
**指令绑定的元素是点击触发器，`target` 指定的才是全屏目标。** 不指定目标时，默认控制 `document.body`。
:::

## 演练场 {#playground}

[演练场](/vue2/playground?example=directive)

<Vue2Demo kind="directive" />

```fullscreen-example
directive vue2 zh
```

## 绑定值与修饰符 {#reference}

```vue
<!-- 不传参数：控制 document.body -->
<button v-fullscreen>整个页面全屏</button>

<!-- 按钮是触发器，#report 区域才是全屏目标 -->
<button v-fullscreen="'#report'">报表全屏</button>
<section id="report">
  报表内容
  <button v-fullscreen="'#report'">退出全屏</button>
</section>

<!-- 对象：目标与配置 -->
<button v-fullscreen="{ target: '#report', pageOnly: true, teleport: true }">
  网页全屏
</button>
```

`target` 还支持 HTML 元素、Vue ref、组件实例（使用 `$el`）和 getter，进入全屏时解析当前目标。直接传入的字符串按 CSS 选择器处理，id 应写成 `'#report'`。

无法解析目标时触发 `fullscreen-error`。直接传入 `null` 与省略 `target` 相同。

### 修饰符

`.pageOnly` 和 `.teleport` 对应同名配置。对象中的显式选项优先于修饰符。例如 `.pageOnly="{ pageOnly: false }"` 最终使用原生模式。

对象还支持 `fullscreenClass` 与 `callback(isFullscreen)`。指令使用共享 API，所以 `fullscreen.exit()` 可以退出由指令开启的全屏。

## 配置项 {#options}

```ts
interface DirectiveOptions extends ApiOptions {
  target?: FullscreenTarget
}
```

| 选项              | 类型                              | 默认值          | 说明                                    |
| ----------------- | --------------------------------- | --------------- | --------------------------------------- |
| `target`          | `FullscreenTarget`                | `document.body` | 目标；直接传入的字符串按 CSS 选择器解析 |
| `pageOnly`        | `boolean`                         | `false`         | 网页全屏                                |
| `teleport`        | `boolean`                         | `false`         | 移动到 body；目标是 body 时自动关闭     |
| `fullscreenClass` | `string`                          | `'fullscreen'`  | 激活时添加，退出时恢复                  |
| `callback`        | `(isFullscreen: boolean) => void` | 无              | 状态变化回调                            |

## 回调 {#callbacks}

通过 `callback` 接收实际的全屏状态变化。

```js
const options = {
  callback(isFullscreen) {
    console.log(isFullscreen)
  },
}
```

## 错误事件 {#events}

指令通过原生冒泡事件 `fullscreen-error` 报告失败，错误对象在 `event.detail`。

```js
button.addEventListener('fullscreen-error', (event) => {
  console.error(event.detail)
})
```

如果按钮在全屏目标外面，原生全屏时可能看不到它。请在目标内部提供退出按钮，或让用户使用 Esc。
