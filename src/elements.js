import { query } from './helper'

export function initializeElements (options, language) {
  const elements = {}

  elements.input = query()

  return elements
}
