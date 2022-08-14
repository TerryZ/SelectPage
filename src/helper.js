import { ASC } from './constants'
import languages, { CN } from './language'

/**
 * Set order field
 *
 * parse ['id asc', 'date desc', 'name asc']
 * to [['id', 'asc'], ['date', 'desc'], ['name', 'asc']]
 *
 * @param {string[]} orders
 * @param {string} field - default sort field
 * @return {string[]}
 */
export function parseOrder (orders, field) {
  if (!orders || !Array.isArray(orders)) {
    return [[field, ASC]]
  }

  return orders.map(val => {
    const fieldSort = val.trim().split(' ')
    // ['id'] === ['id asc']
    return fieldSort.length === 2 ? fieldSort : [fieldSort[0], ASC]
  })
}

export function getLanguage (language = CN) {
  return languages[language]
}

export function query (selectors) {
  return document.querySelector(selectors)
}

export function queryAll (selectors) {
  return document.querySelectorAll(selectors)
}
