import {persist} from '../plugin/storage'
const ADD_SEARCH_LOG = 'ADD_SEARCH_LOG'
const CLEAR_SEARCH_LOG = 'CLEAR_SEARCH_LOG'

export default {
  state: {
    @persist(ADD_SEARCH_LOG, CLEAR_SEARCH_LOG)
    keywords: []
  },
  getters: {
    keywords (state) {
      return [...state.keywords].reverse().sort((a, b) => a.count > b.count).map(it => it.keyword)
    }
  },
  mutations: {
    [ADD_SEARCH_LOG] (state, {keyword}) {
      const {keywords} = state
      const cache = keywords.findIndex(it => it.keyword === keyword)
      if (cache > -1) {
        keywords[cache].count += 1
      } else {
        keywords.push({keyword, count: 1})
      }
      state.keywords = keywords
    },
    [CLEAR_SEARCH_LOG] (state) {
      state.keywords = []
    }
  }
}
