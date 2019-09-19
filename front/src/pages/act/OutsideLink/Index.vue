<template>
  <div></div>
</template>

<script>
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
      if (config.url) {
        window.location.replace(config.url)
      }
    }
  }
}
</script>
