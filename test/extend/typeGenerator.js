import clone from 'src/utils/clone'

const TABLE = Symbol('TABLE')

const table = [
  {
    name: 'zero',
    value: [ +0, -0 ],
    is: 'number'
  },
  {
    name: 'NaN',
    value: NaN,
    is: 'number'
  },
  {
    name: 'Infinity',
    value: Infinity,
    is: 'number'
  },
  {
    name: 'null',
    value: null
  },
  {
    name: "''",
    value: '',
    is: 'string'
  },
  {
    name: 'true',
    value: true
  },
  {
    name: 'false',
    value: false
  },
  {
    name: 'function',
    value: [
      () => [], // arrow function
      function () {}, // empty function
      console.log, // BOM method
      alert // BOM function
    ]
  },
  {
    name: 'regExp',
    value: [/./, new RegExp('.')]
  },
  {
    name: 'symbol',
    value: [
      Symbol(null),
      Symbol(void 0),
      Symbol(''),
      Symbol('test')
    ],
    impl: 'string'
  },
  {
    name: 'number',
    value: [-1, 1, 2]
  },
  {
    name: 'string',
    value: 'Hello Jest'
  },
  {
    name: 'object',
    value: [{}, Object.create(null), Object.create(Object.prototype), Object.create({})]
  }
]

Object.freeze(table)

const nameHashedTable = table.reduce((pub, item) => {
  const {name} = item
  if (pub[name]) {
    console.error(`repeat name ${name}`)
  } else {
    pub[name] = item
  }
  return pub
}, {})

Object.freeze(nameHashedTable)

class TypeGenerator {
  constructor (...types) {
    this.list = types.reduce((pub, type) => {
      const item = this[TABLE][type]
      if (item) {
        pub.push(item)
      } else {
        console.error(`unfind item named '${type}'`)
      }
      return pub
    }, [])
  }
  all () {
    this.list = clone(table)
    return this
  }
  only () {
    return this
  }
  without (...types) {
    let list = this.list
    this.list = list

    types.reduce((pub, type) => {
      const item = this[TABLE][type]
      if (item) {
        pub.push(item)
      } else {
        console.error(`cannot resolve item named '${type}'`)
      }
      return pub
    }, [])
    return this
  }
  test () {
    // for(let item of this.list) { do something}
  }
  static list = []
  static [TABLE] = nameHashedTable
}

// generator.all().test(({name, value}) => {

/**
 * 期望的调用方式
 * generator.falseOnly(datumType.number).test(({name, value}) => {
 *  test(`isXXX(${name}) equals ${value.valueOf()}`, () => {
 *    expect(isXXX(name)).equals(value)
 *  })
 * })
 * 或者
 * generator.falseOnly('number').test(...)
 * generator.trueOnly('date').test(...)
 */

export default new TypeGenerator()
