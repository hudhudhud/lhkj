export function ccbShare (dict, cb) {
  let executeCallIframe = function (url) {
    // 构造调用客户端分享功能的请求
    let iframe = null
    if (iframe == null) {
      iframe = document.createElement('IFRAME')
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
    }
    iframe.setAttribute('src', url)
  }
  let makeParas = dict => {
    // 构造URL请求参数字符串
    var para = ''
    for (var key in dict) {
      if (key != 'scheme' && key != 'operation') {
        para = para + key + '=' + dict[key] + '&'
      }
    }
    para = para.substr(0, para.length - 1)
    return para
  }
  let callNative = () => {
    var para = makeParas(dict)
    executeCallIframe(dict['scheme'] + '://' + dict['operation'] + '?' + para)
    cb && cb()
  }
  callNative(dict, cb)
}
