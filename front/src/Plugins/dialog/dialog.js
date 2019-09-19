import Vue from 'vue'
import Main from './dialog.vue'
let DialogConstructor = Vue.extend(Main)
let instance
const Dialog = function (options) {
  instance = new DialogConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  let isNode = document.querySelector('.dialog')
  if (!isNode) {
    document.body.appendChild(instance.vm.$el)
  } else {
    document.body.removeChild(isNode)
    document.body.appendChild(instance.vm.$el)
  }
}
Vue.prototype.$dialog = Dialog
export default Dialog
