/**
 * 需要注意的是，浏览器环境有个native的URL类
 */
'use strict'

import {isObject} from './isObject'
import {clone} from 'antools/util/clone'

//  URL中的查询参数的处理对象
class Search {
  constructor (s) {
    this.data = this.parse(s)
  }
  parse (s) {
    if (isObject(s)) {
      return {...s}
    }
    return String(s).split('&').reduce((pub, it) => {
      let [key, value] = it.split('=')
      if (value && value.length) {
        value = decodeURIComponent(value)
      }
      if (key !== '') {
        pub[key] = value
      }
      return pub
    }, {})
  }
  toString () {
    let {data} = this
    let s = Object.keys(data).map(key => `${key}=${data[key] || ''}`).join('&')
    return s.length > 0 ? '?' + s : ''
  }
  valueOf () {
    return this.data
  }
  isEmpty () {
    return Object.keys(this.data).length === 0
  }
  has (key) {
    return key && Object.keys(this.data).indexOf(key) > -1
  }
  set (key, value) {
    if (isObject(key)) {
      this.data = key
    }
    if (typeof key === 'string' && key !== '' && value !== void 0) {
      this.data[key] = value || ''
    }
    return this
  }
  remove (key) {
    if (this.has(key)) {
      delete this.data[key]
    } else {
      this.data = {}
    }
    return this
  }
}

//  URL对象，通过一个字符串表示的URL地址初始化一个URL对象，然后就可以通过当前对象提供的API去操纵URL
export default class URL {
  constructor (s) {
    if (!URL.reg.test(s)) {
      throw new Error('invalid url:' + s)
    }
    let arr = URL.reg.exec(s)
    this.protocol = arr[1] || ''
    this.slash = arr[2] || ''
    this.hostname = arr[3] || ''
    this.port = arr[4] || ''
    this.host = this.port ? (this.hostname + ':' + this.port) : this.hostname
    this.pathname = arr[5] || ''
    this.search = new Search(arr[6] || '')
    this.hash = arr[7] || ''
  }
  toString () {
    let arr = []
    if (this.protocol !== '') {
      arr.push(this.protocol)
    }
    if (this.slash !== '') {
      arr.push(':' + this.slash)
    }
    if (this.hostname !== '') {
      arr.push(this.hostname)
    }
    if (this.port !== '') {
      arr.push(':' + this.port)
    }
    if (this.pathname !== '') {
      arr.push(this.pathname)
    }
    if (!this.search.isEmpty()) {
      arr.push(this.search.toString())
    }
    if (this.hash !== '') {
      arr.push('#' + (this.hash.startsWith('#') ? this.hash.slice(1) : this.hash))
    }
    return arr.join('')
  }
  hasKey (key) {
    return this.search.has(key)
  }
  getKey (key) {
    return this.search.data[key]
  }
  setKey (key, value) {
    this.search.set(key, value)
    return this
  }
  removeKey (key) {
    this.search.remove(key)
    return this
  }
  keys () {
    return clone(this.search.data)
  }
  /**
   * 将当前URL对象的值反射到浏览器的地址栏中
   * （当然，这也是设计初衷之一）
   * @param replace {Boolean} 刷新地址栏时，是否对history对象中的当前项进行替换，默认不替换
   * 即使用history.pushState向history中添加一项
   */
  invoke ({replace}) {
    if (location.host !== this.host) {
      location.href = this.toString()
      return
    }
    if (History !== void 0 && history && history.pushState) {
      history[replace ? 'replaceState' : 'pushState'](history.state, document.title, this.pathname + this.search.toString() + this.hash)
    } else {
      location.href = this.toString()
    }
  }

  /**
   * 判断一个字符串(或者一个对象)是否是一个合法的链接
   * 如果是一个对象，则先调用它的toString()方法得出一个字符中后再作判断
   * 这是一个静态方法，可以直接调用，而不必初始化一个URL对象
   * @param it {object} | {string}
   * @returns {boolean}
   */
  static isURL (it) {
    return URL.reg.test(isObject(it) ? it.toString() : it) && it != null && it !== ''
  }
  static reg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:(\/[^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
}

export let isURL = URL.isURL
