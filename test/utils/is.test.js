import is from 'src/utils/is'
import 'test/extend/toBeFunction'

describe('#util/it', () => {
  test('is("array") should return a function', () => {
    expect(is('array')).toBeFunction()
  })
})
