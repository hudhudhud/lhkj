import axios from 'axios'
import config from '@/config'
import store from '@/store'
import { Toast } from 'mint-ui'
import { gotoAuth } from '@/router';

axios.defaults.baseURL = config.apiBasePath

axios.interceptors.request.use(
  function (config) {
    let token = store.state.token
    if (config.url.indexOf('front') == -1) {
      if (token) {
        config.headers.Authorization = token
        config.headers.merchantId = store.state.merchantId
      }
    }
    return config
  },
  function (error) {
    console.log('request error:' + error)
    return Promise.resolve({
      status: 500,
      error: '请求失败,请检查网络:' + error
    })
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    let data = response.data
    if (!data) {
      Toast('返回数据异常')
    }
    if (data && data.status == 403) {
      gotoAuth(store.state.merchantId, window.location.href, true)
      return
    }
    if (data) {
      return data
    }
    return response
  },
  function (error) {
    console.log('response error:' + error)
    return Promise.resolve({
      status: 500,
      error: error
    })
  }
)

let request = {}
request.install = function (Vue, options) {
  Vue.prototype.$get = axios.get
  Vue.prototype.$post = axios.post
  Vue.prototype.$apiBasePath = config.apiBasePath
}
request.get = axios.get
request.post = axios.post

export default request
