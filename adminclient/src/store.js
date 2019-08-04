import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {}
  },
  mutations: {
    'set_Authenticated' (state, isAuthenticated) {
      if (isAuthenticated) state.isAuthenticated = isAuthenticated
      else state.isAuthenticated = false
    },
    'set_User' (state, user) {
      if (user) state.user = user
      else state.user = false
    }
  },
  actions: {
    setAuthenticated: ({ commit }, isAuthenticated) => {
      commit('set_Authenticated', isAuthenticated)
    },
    setUser: ({ commit }, user) => {
      commit('set_User', user)
    },
    clearCurrentState: ({ commit }) => {
      commit('set_Authenticated', false)
      commit('set_User', null)
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
  }
})
