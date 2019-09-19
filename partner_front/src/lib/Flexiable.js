export default {
  install () {
    var calc = () => {
      var deviceWidth = document.documentElement.clientWidth
      if (deviceWidth > 500) deviceWidth = 500
      document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
      document.documentElement.setAttribute('dpr', window.devicePixelRatio)
    }
    window.addEventListener('resize', calc)
    calc()
  }
}
