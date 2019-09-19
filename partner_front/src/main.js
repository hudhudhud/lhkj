// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import request from './lib/Request'
import jssdk from './lib/jssdk/index'
import FastClick from 'fastclick'
import 'promise-polyfill/src/polyfill'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'nprogress/nprogress.css'
import '@/styles/index.scss' // global css
import MintUI, { InfiniteScroll, DatetimePicker } from 'mint-ui'
import 'mint-ui/lib/style.css'
import flexiable from '@/lib/Flexiable'
import '@/pages/boc_shanghai/pages/common/fonts.scss'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.use(flexiable)
Vue.use(InfiniteScroll)
Vue.use(MintUI)
Vue.use(request)
Vue.use(jssdk)

Vue.config.productionTip = false
// 修复IOS11可能出现的点击失灵现象 - 即去掉Fastclick
/* eslint-disable no-mixed-operators */
var isIos = navigator.userAgent
  .toLowerCase()
  .match(/cpu iphone os (.*?) like mac os/)
if (!isIos || (isIos[1] && isIos[1].split('_')[0] < 11)) {
  FastClick.attach(document.body)
}

const errorHandler = (error, vm) => {
  console.log('vue global error:' + error)
}
Vue.config.errorHandler = errorHandler

window.onerror = function (msg, url, line, col, error) {
  // 直接将错误打印到控制台
  console.log('error', arguments)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
