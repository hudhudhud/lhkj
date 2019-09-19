<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      pageKey: this.$store.state.merchantConfig.pageKey,
      url: this.$store.state.merchantConfig.url
    };
  },
  created () {
    if (this.pageKey) {
      /*    if (this.$store.state.merchantId == 167) {
        // 广西八桂
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/lego/${this.pageKey}`
        );
        return;
      } */
      window.location.href =
        window.location.protocol +
        '//' +
        window.location.host +
        '/' +
        this.$store.state.merchantAppid +
        '/merchant/lego/' +
        this.pageKey;
    } else {
      window.location.href = this.url;
    }
    // window.location.reload();
  }
};
</script>

<style scoped>
</style>
