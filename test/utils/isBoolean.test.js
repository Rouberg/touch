import isBoolean from 'src/utils/isBoolean'

describe('#utils/isBoolean', () => {
  const list = [
    {
      value: 0,
      expect: false
    },
    {
      value: -0,
      name: '-0',
      expect: false
    },
    {
      value: 1,
      expect: false
    },
    {
      value: null,
      expect: false
    },
    {
      value: void 0,
      name: '',
      expect: false
    },
    {
      value: true,
      expect: true
    },
    {
      value: false,
      expect: true
    },
    {
      value: [],
      name: '[]',
      expect: false
    },
    {
      value: [1, 2, 3],
      name: '[1, 2, 3]',
      expect: false
    },
    {
      value: {},
      name: '{}',
      expect: false
    },
    {
      value: /abc/,
      expect: false
    },
    {
      value: '',
      name: "''",
      expect: false
    },
    {
      value: 'abc',
      name: "'abc'",
      expect: false
    },
    {
      value: Symbol(0),
      name: 'Symbol(0)',
      expect: false
    },
    {
      value: () => [],
      name: '() => []',
      expect: false
    },
    {
      value: function () {},
      name: 'function () {}',
      expect: false
    },
    {
      value: console.log,
      name: 'console.log',
      expect: false
    },
    {
      value: alert,
      name: 'alert',
      expect: false
    }
  ]

  Object.keys(list).forEach(key => {
    const item = list[key]
    test(`isBoolean(${item.name === void 0 ? item.value : item.name}) === ${item.expect}`, () => {
      expect(isBoolean(item.value)).toBe(item.expect)
    })
  })
})
