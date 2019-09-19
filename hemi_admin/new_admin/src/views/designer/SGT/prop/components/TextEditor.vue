<template>
  <el-input v-model="val"></el-input>
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
