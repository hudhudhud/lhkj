// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "./styles/element-extends.css"
import "nprogress/nprogress.css"
import request from "./utils/request"
import layouts from "@/components/layout"
import AuthPlugin from "@/plugins/AuthPlugin"
import HighLight from "@/directive/HighLight"
import "@/lib/DateFix"
import MailCodePlugin from "./lib/MailCodePlugin"

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: "small"
})
Vue.use(request)
Vue.use(HighLight)
Vue.use(AuthPlugin)
Vue.use(MailCodePlugin)

layouts.forEach(cpn => {
  Vue.component(cpn.name, cpn)
})

// 全局错误处理
const errorHandler = (error, vm) => {
  console.error("抛出全局异常")
  console.error(vm)
  console.error(error)
}
Vue.config.errorHandler = errorHandler
// 全局管道
// 数字转为字母，数字从1开始
Vue.filter("NumToLetter", function (i) {
  if (i >= 1 && i <= 25) {
    return String.fromCharCode(64 + i);
  } else {
    return ""
  }
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
})
