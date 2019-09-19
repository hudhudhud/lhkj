let isDeviceReady = false

export function init () {
  window.terminal = (function () {
    var u = navigator.userAgent // app = navigator.appVersion;
    return {
      // 浏览器版本信息
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') > -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') > -1,
      weixin:
        (u.indexOf('MicroMessenger') > -1 &&
          u
            .replace(/.*(MicroMessenger\/[^\s]*).*/, '$1')
            .replace('MicroMessenger/', '')) ||
        false,
      appVersion:
        u.indexOf('bocapp(') > -1
          ? u.match(/bocapp\(\S+\)/)[0].slice(7, -1)
          : '3.0.0'
    }
  })()

  /**
   * 引入cordova
   */
  var script = document.createElement('script')
  // var pth = './' // 本地调试
  // var pth = 'https://218.244.235.187/BocMerchant/' // 测试环境
  var pth = 'https://ebsnew.boc.cn/bocphone/BocMerchant/' // 生产环境
  // var pth = "https://22.188.135.115/BocMerchant/" // T1功能测试地址
  if (window.terminal.iPhone) {
    script.src = pth + 'paylib/ios.js'
  } else if (window.terminal.android) {
    script.src = pth + 'paylib/android.js'
  } else {
    alert('无法识别终端类型')
  }
  document.getElementsByTagName('head')[0].appendChild(script)

  document.addEventListener('deviceready', function () {
    isDeviceReady = true
  })
}

export function onBack () {
  if (window.history.length == 1) {
    if (isDeviceReady) {
      window.c_plugins.merchantBridge.goToNative(
        function () { },
        function (err) {
          alert(err.message || err || '网络错误，请检查网络连接')
        },
        { page: '0' }
      )
    }
  } else {
    window.history.go(-1)
  }
}
