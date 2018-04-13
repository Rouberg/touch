import clone from 'src/utils/clone'
import {testData as testSourceData} from '../typeTestData'
const testData = testSourceData.filter(item => !item.name.includes('Array.prototype'))

describe('#utils/clone', () => {
  it(`Jest's RegExp equal is trustworthy: /abc/ equals /abc/`, () => {
    expect(/abc/).toEqual(/abc/)
  })
  it(`Jest's Array equal is trustworthy: [] equals []`, () => {
    expect([]).toEqual([])
  })
  it(`Jest's Object equal is trustworthy: {} equals {}`, () => {
    expect({}).toEqual({})
  })
  testData.forEach(item => {
    it(`clone(${item.name}) equals ${item.name}`, () => {
      expect(clone(item.value)).toEqual(item.value)
    })
  })
  testData.forEach((item, k) => {
    testData.forEach((another, j) => {
      if (k !== j && !(item.equals && item.equals.includes(another.groupId)) && !(another.equals && another.equals.includes(item.groupId))) {
        it(`clone(${item.name}) not equal ${another.name}`, () => {
          expect(clone(item.value)).not.toEqual(another.value)
        })
      }
    })
  })
})
