import { optionMerge } from './options'
import { getLanguage } from './helper'
import { generateElements, organizeElements, initializeElements } from './elements'
import './selectpage.sass'

class SelectPage {
  constructor (options) {
    this.options = optionMerge(options)
    const language = getLanguage(this.options.language)
    this.elements = generateElements(this.options, language)
    organizeElements(this.elements)
    initializeElements(this.elements, this.options)

    this.language = language
  }
}

export default SelectPage
