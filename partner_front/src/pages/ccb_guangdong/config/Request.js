import axios from 'axios'
// import { Toast } from 'mint-ui'
import store from '@/store'
// import { gotoAuth } from '@/router';

let basePath = process.env.NODE_ENV === 'development'
  ? `//hemitest.lianhaikeji.com/front/`
  : `//${window.location.host}/front/`
function get (url, hm) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${basePath}${url}`,
      method: 'get',
      headers: {
        Authorization: store.state.hemiToken,
        merchantId: store.state.merchantId
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

let request = {
  get: get,
  post: post,
  basePath: basePath
}
export default request
function post (url, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${basePath}${url}`,
      method: 'post',
      headers: {
        Authorization: store.state.hemiToken,
        merchantId: store.state.merchantId
      },
      data: data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
