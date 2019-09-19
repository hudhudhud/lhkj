<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item>
        <el-tree :data="form.data" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange">
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    // 如果有参数传入,则使用参数,否则使用默认值
    let form = null
    form = {
      data: []
    }
    return {
      submiting: false,
      form: form
    }
  },
  methods: {
    async doSubmit () {
      this.submiting = true
      let rs = await this.$post("white/save", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    handleCheckChange (data, checked, indeterminate) {
      if (data.level === 0) {

      }
      console.log(data, checked, indeterminate)
    },
    handleNodeClick (data) {
      console.log(2)
    },
    async loadNode (node, resolve) {
      var hasChild
      var data
      if (node.level === 1) {
        hasChild = true
      }
      this.submiting = true
      let rs = await this.$post("white/search_province", {province: node.label})
      if (rs.status == "200") {
        this.data = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
      setTimeout(() => {
        if (hasChild) {
          data = this.data
        } else {
          data = []
        }
        resolve(data)
      }, 500)
    },
    async loadProvince (province) {
      this.submiting = true
      let rs = await this.$post("white/search_province", {province: province})
      if (rs.status == "200") {
        this.form.data = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$emit("close")
    }
  },
  created () {
    this.loadProvince()
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
