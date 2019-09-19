<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
#app,
body,
html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  font-family: "Avenir", PingFang SC, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@font-face {
  font-family: "iconfont"; /* project id 633729 */
  src: url("//at.alicdn.com/t/font_633729_rmn0vjxh0r0h33di.eot");
  src: url("//at.alicdn.com/t/font_633729_rmn0vjxh0r0h33di.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_633729_rmn0vjxh0r0h33di.woff") format("woff"),
    url("//at.alicdn.com/t/font_633729_rmn0vjxh0r0h33di.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_633729_rmn0vjxh0r0h33di.svg#iconfont")
      format("svg");
}
.iconfont {
  font-family: "iconfont";
  font-style: normal;
}
</style>
