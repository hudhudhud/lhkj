import wechat from './wechat'
import boc from './boc'
import store from '../../store'
import historyBack from './historyBack'
let envMap = {
  '0': historyBack,
  '5': historyBack,
  '1': wechat,
  '3': boc
}
let isReady = false
let env = null

const jssdk = {
  init (apiUrl, merchantId, authType, callback) {
    if (!env) {
      env = envMap[authType]
      if (!env) {
        console.warn('no jssdk support')
        return
      }
    }

    env.init(apiUrl, merchantId, authType, val => {
      if (authType == 3 || authType == 5 || authType == 0) { // boc
        store.state.showBack = true
      }
      isReady = true
      store.commit('setIsReady', true)
      callback && callback(val)
    })
  },
  call (method, options) {
    if (!env) {
      console.warn('no jssdk support')
      alert('no jssdk support')

      return
    }
    if (!isReady) {
      options.onError && options.onError('jssdk尚未初始化')
      alert('jssdk尚未初始化')
      return
    }
    if (!env[method]) {
      options.onError && options.onError('当前环境不支持该能力:' + method)
      alert('当前环境不支持该能力')
      return
    }
    env[method](options)
  }
}

export default {
  install (Vue) {
    Vue.prototype.$jssdk = jssdk
  },
  jssdk
}
