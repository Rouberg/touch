export default class Storage {
  #cache = {}
  get length () {
    return Object.keys(this.#cache)
  }
  #guardArgs (args) {
    const fn = args.callee
    if (fn.length && args.length < fn.length) {
      throw new TypeError(`Failed to execute '${fn.name}' on '${this.constructor.name}': ${fn.length} arguments required, but only ${args.length} present.`)
    }
  }
  getItem (key) {
    this.#guardArgs(arguments)
    return this.#cache[key]
  }
  setItem (key, value) {
    this.#guardArgs(arguments)
    const oldValue = this.#cache[key] || null
    this.#cache[key] = value
    this.#dispatch(key, oldValue, value)
  }
  removeItem (key) {
    this.#guardArgs(arguments)
    const oldValue = this.#cache[key] || null
    delete this.#cache[key]
    this.#dispatch(key, oldValue, value)
  }
  clear () {
    this.#cache = {}
    this.#dispatch(null, null, null)
  }
  key (id) {
    this.#guardArgs(arguments)
    const keys  = Object.keys(this.#cache)
    return keys[id] || keys[0]
  }
  #dispatch (key, oldValue, newValue, url = location.href) {
    const event = document.createEvent('StorageEvent');
    event.initStorageEvent('storage', false, false, key, oldValue, newValue, url, this);
    window.dispatchEvent(event);
  }
}

