import { optionMerge } from './options'
import { getLanguage } from './helper'
import { generateElements, setupElements } from './elements'
import './selectpage.sass'

class SelectPage {
  constructor (options) {
    this.options = optionMerge(options)
    const language = getLanguage(options.language)
    this.elements = generateElements(options, language)
    setupElements(this.elements)

    this.language = language
  }
}

export default SelectPage
