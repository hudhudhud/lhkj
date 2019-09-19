<template>
  <el-select v-model="val" placeholder="请选择">
    <el-option v-for="item in propDef.options" :key="'opt_'+item" :label="item" :value="item">
    </el-option>
  </el-select>
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
