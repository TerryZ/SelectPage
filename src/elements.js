import { query, create } from './helper'
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

  // if (elem.combo_input.prop('disabled')) {
  //   if (p.multiple) elem.container.addClass(css.disabled)
  //   else elem.combo_input.addClass(css.input_off)
  // }
  const hidden = create('input')
  hidden.type = 'hidden'

  const append = create('div', css.append)
  append.innerHTML = `
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M7,10L12,15L17,10H7Z"></path>
  </svg>
  `
  const clear = create('div', css.clear)
  clear.title = language.clear
  clear.style.display = 'inline-flex'
  clear.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  `

  return {
    input,
    container: create('div', css.container),
    hidden,
    append,
    clear,
    dropdown: create('div', css.dropdown),
    header: create('div', css.header),
    search: create('div', css.search),
    results: create('div', css.results),
    page: create('div', css.page)
  }
}

export function organizeElements (elements) {
  const {
    input,
    container,
    hidden,
    append,
    clear,
    dropdown,
    header,
    search,
    results,
    page
  } = elements

  // container wrap the input element
  input.parentNode.insertBefore(container, input)
  append.prepend(clear)

  container.append(input)
  container.append(append)
  container.append(hidden)

  dropdown.append(header)
  dropdown.append(search)
  dropdown.append(results)
  dropdown.append(page)
  document.body.append(dropdown)
}

export function initializeElements (elements, options) {
  initializeInput(elements.input, options)
}

function initializeInput (el, options) {
  el.classList.add(css.input)
  el.autocomplete = 'off'
  if (options.selectOnly) {
    el.readOnly = true
  }
}
