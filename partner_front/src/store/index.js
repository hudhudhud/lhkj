import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null, // 登录令牌
    merchantId: null, // 商户号
    merchantAppid: null,
    cust: null, // 客户信息
    hemiToken: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setHemiToken (state, token) {
      state.hemiToken = token
    },
    setMerchantId (state, merchantId) {
      state.merchantId = merchantId
    },
    setMerchantAppid (state, merchantAppid) {
      state.merchantAppid = merchantAppid
    },
    setCust (state, cust) {
      state.cust = cust
    },
    setIsReady (state, isReady) {
      state.isReady = isReady
    },
    setCurrentTab (state, currentTab) {
      state.currentTab = currentTab
    }
  }
})

export default store
