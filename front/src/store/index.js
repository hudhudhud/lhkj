import Vue from 'vue';
import Vuex from 'vuex';
import jssdk from '@/lib/jssdk';
import config from '@/config';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '',
    merchantAppid: null,
    merchantId: null,
    actId: '',
    code: null,
    cust: null,
    currentBranchBankId: '',
    merchantConfig: null,
    platformConfig: null,
    merchantTplName: '',
    tabbarShow: true,
    showBack: false,
    payload: null,
    authType: null,
    payType: null,
    isReady: false,
    legoPageCache: {},
    ShowPop: false
  },
  mutations: {
    setToken (state, token) {
      if (!token || token == 'null' || token == 'undefined') {
        return;
      }
      state.token = token;
    },
    clearToken (state) {
      state.token = null;
    },
    setIsReady (state, isReady) {
      state.isReady = isReady;
    },
    setMerchant (state, payload) {
      state.payload = payload;
      if (payload.merchantConfig) {
        state.merchantConfig = JSON.parse(payload.merchantConfig);
      }
      if (payload.platformConfig) {
        state.platformConfig = JSON.parse(payload.platformConfig);
      }
      state.merchantTplName = payload.templateName;
      state.merchantAppid = payload.appId;
      state.authType = payload.authType;
      state.payType = payload.payType;
      jssdk.jssdk.init(
        config.apiBasePath + 'getJSSDKConfig/' + state.merchantId,
        state.merchantId,
        payload.authType
      );
    },
    setCurrentBranchBankId (state, id) {
      state.currentBranchBankId = id;
    },
    setCust (state, cust) {
      state.cust = cust;
    },
    setTabbarShow (state, tabbarShow) {
      state.tabbarShow = tabbarShow;
    },
    setMerchantId (state, merchantId) {
      state.merchantId = merchantId;
    },
    setLegoPageCache (state, { pageKey, config }) {
      state.legoPageCache[pageKey] = config;
    },
    setShowPop (state, ShowPop) {
      state.ShowPop = ShowPop;
    },
    setstoreNum (state, storeNum) {
      state.storeNum = storeNum;
    }
  },
  actions: {
    setShowPop ({ commit }, info) {
      commit('setShowPop', info);
    },
    setstoreNum ({ commit }, info) {
      commit('setstoreNum', info);
    }
  },
  getters: {
    getShowPop (state) {
      return state.ShowPop;
    },
    getstoreNum (state) {
      return state.storeNum;
    }
  }
});

export default store;
