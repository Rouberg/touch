import clone from 'src/utils/clone'
let cache = {}
const localStorageAvailable = !! window.localStorage

const cacheStore = {
  getItem (key) {
    return key ? clone(cache[key]) : void 0
  },
  setItem (key, value) {
    cache[key] = clone(value)
  },
  clear () {
    cache = {}
  }
}

const webStore = {
  getItem (key) {
    const serializedValue = localStorage.getItem(key)
    return serializedValue ? JSON.parse(serializedValue) : void 0
  },
  setItem (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  clear () {
    localStorage.clear()
  }
}

const bin = localStorageAvailable ? webStore : cacheStore
Object.freeze(bin)
export default bin
