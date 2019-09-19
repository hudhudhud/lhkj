<template>
  <el-tree :data="modules" show-checkbox accordion node-key="mid" ref="tree" @check-change="getCheckedKeys"
    highlight-current :props="defaultProps">
  </el-tree>
</template>
<script>
export default {
  name: "JsTree",
  props: ["modules", "defaultProps", "currentRoleModules"],
  data() {
    return {
      result: null
    };
  },
  watch: {
    result() {
      this.$emit("result", this.result);
    }
  },
  methods: {
    getCheckedKeys() {
      this.result = this.$refs.tree.getCheckedKeys();
    },
    setCheckedKeys(arr) {
      this.$refs.tree.setCheckedKeys(arr);
    }
  }
};
</script>