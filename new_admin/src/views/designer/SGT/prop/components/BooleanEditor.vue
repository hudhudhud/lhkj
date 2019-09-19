<template>
  <el-switch v-model="val" active-color="#13ce66" inactive-color="#ff4949">
  </el-switch>
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
