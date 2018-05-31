import {ENV_SET} from 'src/store/mutation-types'
import {Env} from 'src/data/Enviroment'

// 当前只有一个feature： 代码是否跑在app内
export default {
  state: {
    env: void 0
  },
  getters: {
    inApp (state) {
      return Env.App === state.env
    }
  },
  mutations: {
    [ENV_SET] (state, env) {
      state.env = env
    }
  }
}
