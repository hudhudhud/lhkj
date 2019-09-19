import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { UserModule } from '@/store/modules/user'
import { apiBasePath,tokenName } from '@/config'
import router from '@/routers/router'

axios.defaults.baseURL = apiBasePath


// Request interceptors
axios.interceptors.request.use(
  config => {
    const token = UserModule.token? getToken() : ''
    if (token) {
      config.headers.Authorization = token
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  error => {
    console.log('request error:' + error)
    return Promise.resolve({
      state: 500,
      error: '请求失败,请检查网络:' + error
    })
  }

)

// Response interceptors
axios.interceptors.response.use(
  response => {
    const data = response.data
    if (!data) {
      console.error('返回数据异常')
    }
    if (data.state === 401) {
      sessionStorage.removeItem(tokenName)
      router.replace('/')
    }
    return response
  },
  error => {
    console.log('response error:' + error)
    return Promise.resolve({
      state: 500,
      error
    })
  }
)


export default axios




