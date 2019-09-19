<template>
  <UploadImages action="file/upload" v-model="list" :max="1"></UploadImages>
</template>

<script>
import UploadImages from "@/components/UploadImages"

export default {
  components: {UploadImages},
  props: ["value"],
  data () {
    return {
      list: this.value ? [{url: this.value}] : []
    }
  },
  watch: {
    value (val) {
      this.list = [{url: val}]
    },
    list (val) {
      if (val && val.length == 1) {
        this.$emit("input", val[0].url)
      } else {
        this.$emit("input", "")
      }
    }
  }
}
</script>
