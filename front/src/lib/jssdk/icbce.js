/* eslint-disable no-undef */

import request from '../../lib/Request'
export default {
  init (apiUrl, merchantId, authType, callback) {
    // 融易联初始化config配置
    let config = {
      debug: '1'
    } //

    /**
     *
     *
     *
     *  rel.init({
        appid: "", // 必填，公众号的唯一标识
        timestamp:"" , // 必填，生成签名的时间戳(基于1970年1月1日0点0分0秒偏移的13位的毫秒数)
        nonceStr: "", // 必填，生成签名的随机串
        signature: "",// 必填，签名，生成签名方法可以参考JSAPI-附录1 JSAPI使用权限签名算法
        debug: "",//选填1 为调试模式，不传为关闭
      });
     *
     */

    let script = document.createElement('script')
    script.setAttribute('src', 'https://imapi.icbc.com.cn/icbc/jsrel1.0.12.js')
    script.onload = function () {
      request
        .post('api/js_config/get', {
          merchantId: merchantId,
          authType: authType,
          fullUrl: window.location.href
        })
        .then(rs => {
          if (rs.status == 200) {
            config = rs.payload
            rel.init({
              appid: config.appId, // 必填，公众号的唯一标识
              timestamp: config.timeStamp, // 必填，生成签名的时间戳(基于1970年1月1日0点0分0秒偏移的13位的毫秒数)
              nonceStr: config.nonceStr, // 必填，生成签名的随机串
              signature: config.signature // 必填，签名，生成签名方法可以参考JSAPI-附录1 JSAPI使用权限签名算法
            })
          }
        })
      rel.ready(function () {
        callback && callback()
      })
      rel.error(function (res) {
        // init信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开init的debug模式查看，也可以在返回的res参数中查看。
        // alert('' + res.errMsg + ':' + res.status)
      })
    }
    document.body.appendChild(script)
  },
  disableShare () {
    rel.shareMenuItemsCustom({
      // showMenuList根据自定义分享传递对应的参数,如果不传则不能分享
      showMenuList: '', // 分享到微博
      success: function (res) { }
    })
  },
  back () {
    if (window.history.length == 1) {
    } else {
      window.history.go(-1)
    }
  }
}
