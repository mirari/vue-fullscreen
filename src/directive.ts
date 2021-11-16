import type { Directive, DirectiveBinding, VNode } from 'vue'
import api from './api'
import { assign } from './util'

const directive: Directive = (el, binding, vnode) => {
  const onClick = () => {
    let currentTarget
    const currentOptions = {
      teleport: binding.modifiers.teleport,
      pageOnly: binding.modifiers.pageOnly,
    }
    if (binding.value) {
      if (typeof binding.value === 'string') {
        currentTarget = binding.value
      }
      else {
        const { target, ...options } = binding.value
        currentTarget = target
        assign(currentOptions, options)
      }
    }
    if (typeof currentTarget === 'string') {
      currentTarget = document.querySelector(currentTarget)
    }
    api.toggle(currentTarget, currentOptions)
  }
  if (el._onClickFullScreen) {
    el.removeEventListener('click', el._onClickFullScreen)
  }
  el.addEventListener('click', onClick)
  el._onClickFullScreen = onClick
}

export default directive
