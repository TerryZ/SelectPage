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

  const append = document.createElement('div')
  append.className = css.append
  append.innerHTML = `
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M7,10L12,15L17,10H7Z"></path>
  </svg>
  `
  const clear = document.createElement('div')
  clear.className = css.clear
  clear.title = language.clear
  clear.style.display = 'inline-flex'
  clear.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  `

  const dropdown = document.createElement('div')
  dropdown.className = css.dropdown

  const header = document.createElement('div')
  header.className = css.header

  const results = document.createElement('div')
  results.className = css.results

  const page = document.createElement('div')
  page.className = css.page

  return {
    input,
    container,
    hidden,
    append,
    clear,
    dropdown,
    header,
    results,
    page
  }
}

export function setupElements (elements) {
  const {
    input,
    container,
    hidden,
    append,
    clear
  } = elements

  // container wrap the input element
  input.parentNode.insertBefore(container, input)
  append.prepend(clear)

  container.append(input)
  container.append(append)
  container.append(hidden)
}
