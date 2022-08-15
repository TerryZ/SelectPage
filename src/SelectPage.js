import { optionMerge } from './options'
import { getLanguage } from './helper'
import { initializeElements, elementsSetup } from './elements'

class SelectPage {
  constructor (options) {
    this.options = optionMerge(options)
    this.language = getLanguage(options.language)
    this.elements = initializeElements(options)
    elementsSetup(this.elements)
  }
}

export default SelectPage
