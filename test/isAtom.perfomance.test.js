import isObject from '../src/utils/isObject'
import isArray from '../src/utils/isArray'
const isAtom1 = function (it) {
  return !isArray(it) && !isObject(it)
}
const isAtom2 = function (it) {
  return it === null ||
    typeof it !== 'object' ||
    it instanceof Date ||
    it instanceof RegExp ||
    it instanceof Function ||
    it instanceof Symbol
}

const list = [1, 2, 3, 4, 5, 'a', 'b', {h: 5}, /abc/, [], [1, 2, 3], new Date()]

const a = Date.now()
for (let i = 0; i < 100000; i++) {
  list.forEach(item => {
    isAtom1(item)
  })
}
const b = Date.now()

const c = Date.now()
for (let i = 0; i < 100000; i++) {
  list.forEach(item => {
    isAtom2(item)
  })
}
const d = Date.now()

it('isAtom2 prior isAtom1', () => {
  // 算法 isAtom2 优于 算法 isAtom1
  expect(b - a).toBeGreaterThan(d - c)
})
