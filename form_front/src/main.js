import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Flexiable from "./libs/Flexiable";
import Request from "./libs/Request";
import "mint-ui/lib/style.css";
import MintUI, { DatetimePicker } from "mint-ui";
import Back from "@/components/common/back";

import InputLabel from "@/components/base/label";
import "nprogress/nprogress.css";

import "@/styles/common.css"; // global css
Vue.component("Back", Back);
Vue.component(DatetimePicker.name, DatetimePicker);

Vue.config.productionTip = false;

//需要调试时打开，部分机型vconsole会报错导致页面空白
// import Vconsole from 'vconsole'
// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_CURRENTMODE);
// if(process.env.VUE_APP_CURRENTMODE=='test'){
//   new Vconsole()
// }

Vue.use(Flexiable);
Vue.use(Request);
Vue.use("InputLabel", InputLabel);
Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
