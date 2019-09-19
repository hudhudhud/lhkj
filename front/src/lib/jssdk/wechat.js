import request from '../../lib/Request';
/* eslint-disable no-undef */

export default {
  init (apiUrl, merchantId, authType, callback) {
    // 请求微信config配置
    let config = {}; //
    let initWxSDK = function () {
      request
        .post('/api/wechat/js_config/get', {
          merchantId: merchantId,
          fullUrl: encodeURIComponent(window.location.href)
        })
        .then(rs => {
          if (rs.status == 200) {
            config = rs.payload;
            wx.config({
              debug: false,
              appId: config.appId, // 必填，公众号的唯一标识
              timestamp: config.timeStamp, // 必填，生成签名的时间戳(基于1970年1月1日0点0分0秒偏移的13位的毫秒数)
              nonceStr: config.nonceStr, // 必填，生成签名的随机串
              signature: config.signature, // 必填，签名，生成签名方法可以参考JSAPI-附录1 JSAPI使用权限签名算法
              jsApiList: [
                'checkJsApi',
                'onMenuShareAppMessage',
                'onMenuShareTimeline'
              ] // 必填，需要使用的JS接口列表
            });
          }
        });
      wx.ready(
        function (e) {
          callback && callback();
        },
        function (res) {
          alert(res);
        }
      );
      wx.error(function (e) {
        callback && callback();
      });
    };
    let script = document.createElement('script');
    script.setAttribute('src', '//res.wx.qq.com/open/js/jweixin-1.4.0.js');
    script.onload = initWxSDK;
    document.body.appendChild(script);
  },
  share (config) {
    wx.onMenuShareAppMessage(config);
    wx.onMenuShareTimeline(config);
  },
  closeWindow () {
    wx.closeWindow();
  },
  ETCnavigateTo () {
    wx.miniProgram.navigateTo({ url: '/pages/webView/order' });
  },
  disableShare () {
    wx.hideAllNonBaseMenuItem();
  },
  back () {
    if (window.history.length == 1) {
      wx.closeWindow();
    } else {
      window.history.go(-1);
    }
  }
};
