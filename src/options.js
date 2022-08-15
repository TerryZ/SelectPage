import defaults from './defaults'
import { AND, OR } from './constants'
import { parseOrder } from './helper'

export function optionMerge (options) {
  const option = Object.assign({}, defaults, options)
  // use showField by default
  option.searchField = option.searchField || option.showField

  option.andOr = option.andOr.toUpperCase()
  if (option.andOr !== AND && option.andOr !== OR) {
    option.andOr = AND
  }

  // support multiple field set
  // const arr = ['searchField']
  // for (let i = 0; i < arr.length; i++) {
  //   option[arr[i]] = this.strToArray(option[arr[i]])
  // }

  // set multiple order field
  // example: [['id ASC'], ['name DESC']]
  if (option.orderBy !== false) {
    option.orderBy = parseOrder(option.orderBy, option.showField)
  }
  // close auto fill result and auto select first in
  // multiple mode and select item not close list
  if (option.multiple && !option.selectToCloseList) {
    option.autoFillResult = false
    option.autoSelectFirst = false
  }
  // show all item when pagination bar close, limited 200
  if (!option.pagination) {
    option.pageSize = 200
  }
  if (typeof option.listSize !== 'number' || option.listSize < 0) {
    option.listSize = 10
  }

  return option
}
