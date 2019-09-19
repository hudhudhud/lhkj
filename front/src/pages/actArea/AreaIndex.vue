<template>
  <component :is="tpl" v-if="tpl"></component>
</template>

<script>
export default {
  data () {
    return {
      tpl: this.$route.params.tpl
    }
  }
}
</script>

<style scoped>
</style>
