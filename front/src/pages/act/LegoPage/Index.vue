<template>
  <div></div>
</template>

<script>
import queryString from 'querystring'

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  created () {
    if (this.act && this.act.templateConfig) {
      let config = JSON.parse(this.act.templateConfig)
      let queryStr = queryString.stringify(this.$route.query)
      if (queryStr) {
        queryStr = '?' + queryStr
      }
      this.$router.replace(`/${this.$store.state.merchantAppid}/merchant/lego/${config.pageKey}${queryStr}`)
    }
  }
}
</script>
