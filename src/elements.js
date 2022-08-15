import { query } from './helper'
import { css } from './constants'

export function initializeElements (options, language) {
  const { element } = options
  const elements = {}

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

  elements.input = input
  elements.container = container

  return elements
}

export function elementsSetup (elements) {
  const { input, container } = elements
  input.parentNode.insertBefore(container, input)
  container.append(input)
}
