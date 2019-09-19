import axios from "axios"
import config from "@/config"
import router from "@/router"
import { Message } from "element-ui"

axios.defaults.baseURL = config.apiBasePath
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  function (config) {
    let token = sessionStorage.getItem("token")
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    console.log("request error:" + error)
    return Promise.resolve({
      code: "-1",
      msg: "请求失败,请检查网络:" + error
    })
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    let data = response.data
    if (!data) {
      alert("返回数据异常")
      router.replace("/login")
    }
    if (data.status === 401) {
      alert("登录超时,请重启登录")
      router.replace("/login")
    }
    if (data.status != 200 && data.status != 300) {
      Message({
        showClose: true,
        message: data.error,
        type: "error"
      })
    }
    if (data) {
      return data
    }
    return response
  },
  function (error) {
    console.log("response error:" + error)
    return Promise.resolve({
      status: 500,
      error: "请求失败,请检查网络:" + error
    })
  }
)

let request = {}
request.install = function (Vue, options) {
  Vue.prototype.$get = axios.get
  Vue.prototype.$post = axios.post
}

export default request

export const Request = {
  get: axios.get,
  post: axios.post
};