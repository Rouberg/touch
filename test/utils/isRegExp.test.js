import isRegExp from 'src/utils/isRegExp'
import {testData} from '../typeTestData'

describe('#utils/isRegExp', () => {
  testData.forEach(item => {
    const expected = item.type === 'regExp'
    test(`isRegExp(${item.name}) === ${expected}`, () => {
      expect(isRegExp(item.value)).toBe(expected)
    })
  })
})
