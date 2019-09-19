<template>
  <router-view></router-view>
</template>
<script>
export default {
  data () {
    return {
      actId: localStorage.getItem('lastVisitactId') || this.$store.state.merchantConfig.defaultAct
    }
  },
  created () {
    this.$router.replace(`index/act/${this.actId}`)
  }
}
</script>
