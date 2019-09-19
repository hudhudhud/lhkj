import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    higherBank: "",
    customId: "",
    storeList: [],
    code: null
  },
  mutations: {
    setCustomId(state, customId) {
      state.customId = customId;
    }
  },
  actions: {}
});
