<template>
  <div class="action" v-if="val">
    <div class="action-row action-row-radio">
      <el-select v-model="val.type">
        <el-option value="none" label="无"></el-option>
        <el-option value="back" label="返回"></el-option>
        <el-option value="msg" label="提示"></el-option>
        <el-option value="act" label="活动"></el-option>
        <el-option value="page" label="页面"></el-option>
        <el-option value="module" label="模块"></el-option>
        <el-option value="url" label="外链"></el-option>
        <el-option value="emit" label="组件事件"></el-option>
      </el-select>
    </div>
    <div class="action-row" v-if="val.type&&val.type!='none'&&val.type!='msg'&&val.type!='call'">
      跳转时替换当前页
      <el-switch v-model="val.isReplace" active-color="#13ce66" inactive-color="#ff4949">
      </el-switch>
    </div>
    <div class="action-row">
      <el-input v-model="val.action" v-if="val.type!='none'"></el-input>
    </div>
  </div>
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
      this.val = val || this.propDef.default
    }
  },
  created () {
    if (!this.val) {
      this.val = this.propDef.default
    }
  }
}
</script>

<style scoped>
.action-row {
  margin-bottom: 5px;
}
.action-row:last-child {
  margin-bottom: 0;
}
.action-row-radio .el-radio-group .el-radio {
  margin-left: 0;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
