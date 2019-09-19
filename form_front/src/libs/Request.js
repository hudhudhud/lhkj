import axios from 'axios';
import config from '@/config';

axios.defaults.baseURL = config.apiBasePath;

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log('request error:' + error);
    return Promise.resolve({
      status: 500,
      error: '请求失败,请检查网络:' + error
    });
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    let data = response.data;
    if (data) {
      return data;
    }
    return response;
  },
  function (error) {
    console.log('response error:' + error);
    return Promise.resolve({
      status: 500,
      error: '返回数据处理失败:' + error
    });
  }
);

let request = {};
request.install = function (Vue) {
  Vue.prototype.$get = axios.get;
  Vue.prototype.$post = axios.post;
};
request.get = axios.get;
request.post = axios.post;

export default request;
