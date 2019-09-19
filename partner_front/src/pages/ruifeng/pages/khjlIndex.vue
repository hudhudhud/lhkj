<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    // 检查本地缓存中的登录状态
    checkLogin () {
      let merchantId = this.$store.state.merchantId
      let khjl = this.$route.path.indexOf('khjl/kh');
      if (khjl >= 0) {
        let json = sessionStorage.getItem('partner_' + merchantId + '_cust');
        if (!json) {
          json = localStorage.getItem('partner_' + merchantId + '_cust');
        }
        if (json) {
          let cust = JSON.parse(json);
          let customType = cust.customType;
          if (customType == '1') {
            return;
          }
        }
        window.location.replace(`${window.location.protocol}//${window.location.host}/partner/rfyh/khjlrk`);
      }
    }
  },
  created () {
    this.checkLogin();
  }
};
</script>
