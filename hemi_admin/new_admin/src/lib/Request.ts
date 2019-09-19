import axios from 'axios';
import { apiBasePath } from '@/config';
// import store from '@/store'
import router from '@/routers/router';
import { Message  } from 'element-ui';
axios.defaults.baseURL = apiBasePath;
axios.defaults.headers.post['Content-Type'] = 'application/json';//不设置axios会根据传入的参数类型来自动设置，对象为json,字符串为x-www-form-urlencoded
// request拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  },
  error => {
    console.log('request error:' + error);
    return Promise.resolve({
      status: 500,
      error: '请求失败,请检查网络:' + error
    });
  }
);

// response拦截器
axios.interceptors.response.use(
  response => {
    const data = response.data;
    if (!data) {
      console.error('返回数据异常');
    }
    if (data.status === 401) {
      sessionStorage.removeItem('token');
      router.replace('/');
    }
    if(data.status!==200){
      Message({
          message: response.data.error,
          type: 'error'
      });
    }
    return response;
  },
  error => {
    console.log('response error:' + error);
    return Promise.resolve({
      status: 500,
      error
    });
  }
);

export default axios;
