expect.extend({
  toBeFunction (received, argument) {
    const pass = typeof received === 'function'
    return {
      message: () => `expected ${received} ${pass ? '' : 'not '}to be function`,
      pass
    }
  }
})

describe('#jest extend toBeFunction', () => {
  test('arrow function should validate by "toBeFunction"', () => {
    const invoke = () => []
    expect(invoke).toBeFunction()
  })

  test('general function should validate by "toBeFunction"', () => {
    const invoke = function () {}
    expect(invoke).toBeFunction()
  })
})
