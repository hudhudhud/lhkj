import store from '../store'

function href (path, str) {
  let location = window.location.href
  if (str) {
    window.location.href = location.split(str)[0] + str + path
  } else {
    window.location.href = `/${store.state.merchantAppid}/merchant` + path
  }
}

href.install = function (Vue, options) {
  Vue.prototype.$href = href
}

export default href
