<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    async getCustInfo () {
      // 获取当前登录用户信息
      let cust = this.$store.state.cust;
      console.log('验证', cust);
      // 如果没有绑定身份或者身份信息里没有手机号,跳转到绑定页
      let share = this.$route.path.indexOf('share');
      if (share < 0) {
        // 不是分享进来的
        if (cust) {
          if (!cust.tel) {
            this.$router.push('/partner/shzh/login');
          }
        } else {
          this.$router.push('/partner/shzh/login');
        }
      }
    }
  },
  created () {
    this.getCustInfo();
  }
};
</script>
