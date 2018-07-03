import './styles/normalize.css'
import './styles/test.css'
import './styles/global.scss'
import chain from './utils/chain'
import Storage from './utils/Storage'

window.storage = new Storage()

window.chain = chain
