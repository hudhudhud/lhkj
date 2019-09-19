import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    modules: null,
    merchant: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setModules (state, modules) {
      state.modules = modules
    },
    setMerchant (state, merchant) {
      state.merchant = merchant
    }
  }
})

export default store
