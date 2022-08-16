import { optionMerge } from './options'
import { getLanguage } from './helper'
import { generateElements, setupElements } from './elements'
import './selectpage.sass'

class SelectPage {
  constructor (options) {
    this.options = optionMerge(options)
    this.language = getLanguage(options.language)
    this.elements = generateElements(options)
    setupElements(this.elements)
  }
}

export default SelectPage
