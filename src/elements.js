import { query } from './helper'
import { css } from './constants'

export function generateElements (options, language) {
  const { element } = options

  let input

  if (typeof element === 'string') {
    input = query(element)
  }
  if (element instanceof window.HTMLInputElement) {
    input = element
  }
  input.classList.add(css.input)
  input.autocomplete = 'off'
  if (options.selectOnly) {
    input.readOnly = true
  }

  const container = document.createElement('div')
  container.className = css.container

  // if (elem.combo_input.prop('disabled')) {
  //   if (p.multiple) elem.container.addClass(css.disabled)
  //   else elem.combo_input.addClass(css.input_off)
  // }
  const hidden = document.createElement('input')
  hidden.type = 'hidden'

  return {
    input,
    container,
    hidden
  }
}

export function setupElements (elements) {
  const { input, container, hidden } = elements
  input.parentNode.insertBefore(container, input)
  container.append(input)
  container.append(hidden)
}
