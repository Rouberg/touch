import Emitter from './Emitter'
import bin from './bin'
import {decorate} from './decorate'
import equals from 'src/utils/equals'
import clone from 'src/utils/clone'

const INIT = Symbol('INIT')
const emitter = new Emitter()
const initValues = []

const findModuleName = function (state, target) {
  return Object.keys(state).find(name => equals(state[name], target))
}

const persistDecorator = function (target, property, descriptor, mutations) {
  emitter.on(INIT, function ({store}) {
    initValues[property] = clone(target[property])
    const storeValue = bin.getItem(property)
    if (storeValue) {
      const moduleName = findModuleName(store.state, target)
      if (moduleName) {
      }
      store.replaceState({...store.state, [moduleName]: {...target, [property]: storeValue}})
    }
  })

  mutations.forEach(mutation => {
    emitter.on(mutation, () => {
      const initValue = initValues[property]
      const value = target[property]
      if (equals(initValue, value)) {
        bin.removeItem(property)
      } else {
        bin.setItem(property, target[property])
      }
    })
  })
}

export const persist = function (...args) {
  return decorate(persistDecorator, args)
}

const storagePlugin = function (store) {
  store.strict = false
  emitter.emit(INIT, {store})
  store.subscribe(mutation => emitter.emit(mutation.type))
}
export default storagePlugin
