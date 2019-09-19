export default {
  // deviceready: false,
  init (apiUrl, merchantId, authType, callback) {
    callback && callback()
  },
  back () {
    window.history.go(-1)
  }
}
