import api from './api'
import {extend} from './utils'

const directive = (el, binding) => {
  const onClick = () => {
    let currentTarget
    let currentOptions = {
      teleport: binding.modifiers.teleport,
      pageOnly: binding.modifiers.pageOnly
    }
    if (binding.value) {
      if (typeof binding.value === 'string') {
        currentTarget = binding.value
      } else {
        let { target, ...options } = binding.value
        currentTarget = target
        currentOptions = extend(currentOptions, options)
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
