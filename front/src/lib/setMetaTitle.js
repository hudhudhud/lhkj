function setMetaTitle (title) {
  document.title = title
  // let mobile = navigator.userAgent.toLowerCase()
  // if (/iphone|ipad|ipod/.test(mobile)) {
  //   let iframe = document.createElement('iframe')
  //   iframe.style.display = 'none'
  //   // 替换成站标favicon路径或者任意存在的较小的图片即可
  //   iframe.setAttribute('src', 'https://static.lianhaikeji.com/images/20180824/86df6da7dd784305b2b278fc6ebdaf87.png')
  //   let iframeCallback = function () {
  //     setTimeout(function () {
  //       iframe.removeEventListener('load', iframeCallback)
  //       document.body.removeChild(iframe)
  //     }, 0)
  //   }
  //   iframe.addEventListener('load', iframeCallback)
  //   document.body.appendChild(iframe)
  // }
}

setMetaTitle.install = function (Vue, options) {
  Vue.prototype.setMetaTitle = setMetaTitle
}

export default setMetaTitle
