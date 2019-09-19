<template>
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      actId: '55'
    }
  },
  created () {
    this.$router.replace(`index/act/${this.actId}`)
  }
}
</script>

<style scoped>
</style>
