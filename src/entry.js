import isArray from './utils/isArray'
import './styles/normalize.css'
import './styles/test.css'
import './styles/global.scss'
import DataTypes from './test'
window.DataTypes = DataTypes
console.log(DataTypes.Date)
console.log(isArray([]))
