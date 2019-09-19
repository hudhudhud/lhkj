import { init as zhInit, onBack as zhOnBack } from './zhongHangBack'

const backHandlers = {
  // 普通返回
  auth_0: {
    init () {
      console.log('启用返回')
    },
    onBack () {
      window.history.go(-1)
    }
  },
  /* auth_1: {
    init () {
      console.log('微信开放平台登录')
    },
    onBack () {
      window.history.go(-1)
    }
  }, */
  auth_3: {
    init: zhInit,
    onBack: zhOnBack
  }
}

export default function (Vue, state, merchant) {
  let authType = merchant.authType || 0
  let handler = backHandlers['auth_' + authType]
  console.log('auth_' + authType)
  if (handler) {
    state.showBack = true
    handler.init()
    Vue.prototype.$back = handler.onBack
  } else {
    state.showBack = false
  }
}
