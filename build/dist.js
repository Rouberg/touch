const path = require('path')
const root = path.resolve(__dirname, '../')
const hqApp = path.resolve(root, '../../')

const moduleName = path.basename(root)
const moduleDictionary = path.basename(path.resolve(root, '..'))

// 位置定义
module.exports = {
  hqApp, // 主项目根目录
  root, // 当前项目根目录
  src: root + '/src',
  moduleName, //模块名
  moduleDictionary, // 模块目录
  get target () { // 问题件(当前模块)的要打包到的位置
    return path.resolve(this.hqApp, 'dist', this.moduleDictionary, this.moduleName)
  }
}
