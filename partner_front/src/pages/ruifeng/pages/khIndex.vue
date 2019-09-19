<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    // 检查本地缓存中的登录状态
    checkLogin () {
      let khrk = this.$route.path.indexOf('khrk/kh');
      if (khrk >= 0) {
        let hasInfo = localStorage.getItem('hasInfo')
        if (hasInfo) {
          return;
        }
        window.location.replace(`${window.location.protocol}//${window.location.host}/partner/rfyh/khrk`);
      }
    }
  },
  created () {
    this.checkLogin();
  }
};
</script>

<style scoped>

</style>
