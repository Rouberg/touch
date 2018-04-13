import isSymbol from 'src/utils/isSymbol'
import {testData} from '../typeTestData'

describe('#utils/isSymbol', () => {
  testData.forEach(item => {
    const expected = item.type === 'symbol'
    test(`isSymbol(${item.name}) === ${expected}`, () => {
      expect(isSymbol(item.value)).toBe(expected)
    })
  })
})
