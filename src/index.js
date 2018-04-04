import isFunction from 'util'

export const test = function (value) {
  if (isFunction(value)) return true
  return false
}
