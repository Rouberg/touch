import isArray from 'src/utils/isArray'

describe('#utils/isArray', () => {
  test('isArray([]) === true', () => {
    expect(isArray([])).toBeTruthy()
  })

  test('isArray() === false', () => {
    expect(isArray()).toBeFalsy()
  })

  test('isArray(Number) === false', () => {
    expect(isArray(1)).toBeFalsy()
    expect(isArray(0)).toBeFalsy()
  })

  test('isArray(String) === false', () => {
    expect(isArray('')).toBeFalsy()
    expect(isArray('jest')).toBeFalsy()
  })

  test('isArray(Object) === false', () => {
    expect(isArray({})).toBeFalsy()
    expect(isArray(console)).toBeFalsy()
  })

  test('isArray(RegExp) === false', () => {
    expect(isArray(/jest/)).toBeFalsy()
  })

  test('isArray(null) === false', () => {
    expect(isArray(null)).toBeFalsy()
  })

  test('isArray(/abc/) === false', () => {
    expect(isArray(/abc/)).toBeFalsy()
  })

  test('isArray(function) === false', () => {
    expect(isArray(jest.fn())).toBeFalsy()
    expect(isArray(console.log)).toBeFalsy()
  })
})
