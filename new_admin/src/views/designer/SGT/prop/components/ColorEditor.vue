<template>
  <el-color-picker v-model="val"></el-color-picker>
</template>

<script>
export default {
  props: ["value", "propDef"],
  data () {
    return {
      val: this.value
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.val = val
    }
  }
}
</script>
