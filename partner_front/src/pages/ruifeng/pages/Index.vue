<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    // 检查本地缓存中的登录状态
    checkShareCust () {
      let share = window.location.href.indexOf('share');
      if (share > 0) {
        let custid = window.location.href.substr(share + 6);
        if (custid.indexOf('&') > 0) {
          custid = custid.substr(0, custid.indexOf('&'))
        }
        // 判断是否是扫自己的码进入
        let self = this.$store.state.cust.id
        if (self == custid) {
          // 如果是扫自己的码进入 则不设置分享人custid
          return;
        }
        sessionStorage.setItem('share', custid);
      }
    }
  },
  created () {
    this.checkShareCust();
  }
};
</script>
