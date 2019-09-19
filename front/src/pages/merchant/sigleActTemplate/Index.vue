<template>
  <router-view></router-view>
</template>
<script>
export default {
  data () {
    return {
      actId: this.$store.state.merchantConfig.actId
    };
  },
  created () {
    let bjflsActId = sessionStorage.getItem('bjflsActId');
    if (this.$store.state.merchantId == 1 && bjflsActId) {
      this.$router.replace(`index/act/${bjflsActId}`);
    } else {
      this.$router.replace(`index/act/${this.actId}`);
    }
  }
};
</script>
