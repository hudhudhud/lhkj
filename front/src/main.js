// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import request from './lib/Request';
import href from './lib/href';
import setMetaTitle from './lib/setMetaTitle';
import jssdk from './lib/jssdk/index';
import FastClick from 'fastclick';
import 'promise-polyfill/src/polyfill';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import 'nprogress/nprogress.css';
import '@/styles/index.scss'; // global css
import MintUI, { InfiniteScroll, DatetimePicker } from 'mint-ui';
import 'mint-ui/lib/style.css';
import act from './pages/act/';
import actArea from './pages/actArea/actArea';
import merchant from './pages/merchant/';
import flexiable from '@/lib/flexiable';
import { Dialog } from './Plugins/index';
import * as filters from './lib/filters'; // global filters
import clipboard from 'clipboard';
import Back from '@/components/Back';
import ActLink from '@/components/ActLink';
import querystring from 'querystring';

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component('Back', Back);
Vue.component('ActLink', ActLink);
Vue.prototype.Clipboard = clipboard;
Vue.use(Dialog);
Vue.use(flexiable);
Vue.use(InfiniteScroll);
Vue.use(MintUI);
Vue.use(request);
Vue.use(href);
Vue.use(setMetaTitle);
Vue.use(jssdk);
Vue.use(act);
Vue.use(actArea);
Vue.use(merchant);
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
// 修复IOS11可能出现的点击失灵现象 - 即去掉Fastclick
/* eslint-disable no-mixed-operators */
var isIos = navigator.userAgent
  .toLowerCase()
  .match(/cpu iphone os (.*?) like mac os/);
if (!isIos || (isIos[1] && isIos[1].split('_')[0] < 11)) {
  FastClick.attach(document.body);
}

const errorHandler = (error, vm) => {
  console.log('vue global error:' + error);
};
Vue.config.errorHandler = errorHandler;

let search = window.location.search;
if (search && search.indexOf('?') == 0) {
  search = search.substring(1);
}
let qs = querystring.parse(search);
if (qs && qs.user_id) {
  sessionStorage.setItem('userId', qs.user_id);
}

window.onerror = function (msg, url, line, col, error) {
  // 直接将错误打印到控制台
  console.log('error', arguments);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
