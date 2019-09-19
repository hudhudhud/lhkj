<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  data () {
    return {
      toTop: true
    }
  },
  name: 'App',
  created () {
    // 解决微信浏览器键盘弹回后页面被顶上去问题
    document.addEventListener('focusout', () => {
      setTimeout(() => {
        if (this.toTop) {
          document.body.scrollTop = 0;
        }
      }, 100)
    })
    document.addEventListener('focusin', () => {
      this.toTop = false
      setTimeout(() => {
        this.toTop = true
      }, 200)
    })
  }
}
</script>
