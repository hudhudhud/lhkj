import axios from 'axios';
import config from '@/config';
import { Toast } from 'mint-ui';
import { gotoAuth } from '../router';
import store from '../store';
import Cookies from 'js-cookie';

axios.defaults.baseURL = config.apiBasePath;

axios.interceptors.request.use(
  function (config) {
    let token = store.state.token;
    let merchantId = store.state.merchantId;
    if (token) {
      config.headers.Authorization = token;
    }
    if (merchantId) {
      config.headers.merchantId = merchantId;
    } else {
      console.warn('no merchantId');
    }
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
    if (!data) {
      Toast('返回数据异常');
    }
    if (data.status === 403) {
      let tokenName = store.state.merchantAppid + '_token';
      store.commit('setToken', null);
      localStorage.removeItem(tokenName);
      sessionStorage.removeItem(tokenName);
      Cookies.remove(tokenName);
      /* todo 今天增加删除cookie */
      gotoAuth();
      return data;
    }
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
request.install = function (Vue, options) {
  Vue.prototype.$get = axios.get;
  Vue.prototype.$post = axios.post;
  Vue.prototype.$apiBasePath = config.apiBasePath;
};
request.get = axios.get;
request.post = axios.post;

export default request;
