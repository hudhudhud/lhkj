<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="mid" prop="mid">
        <el-input v-model="form.mid" :disabled="!!mod"></el-input>
      </el-form-item>
      <el-form-item label="level" prop="level">
        <el-input v-model="form.level" :disabled="!!mod"></el-input>
      </el-form-item>
      <el-form-item label="模块名称" prop="mname">
        <el-input v-model="form.mname"></el-input>
      </el-form-item>
      <el-form-item label="API路由" prop="path">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="前端路由" prop="router">
        <el-input v-model="form.router"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    mod: {
      require: true,
      type: Object
    }
  },
  data () {
    // 如果有参数传入,则使用参数,否则使用默认值
    let form = null
    if (this.mod) {
      form = {
        mid: this.mod.mid,
        level: this.mod.level,
        mname: this.mod.mname,
        path: this.mod.path,
        router: this.mod.router
      }
    } else {
      form = {
        mid: "",
        mname: "",
        path: "",
        router: ""
      }
    }
    return {
      submiting: false,
      form: form
    }
  },
  methods: {
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },
    async doSubmit () {
      this.submiting = true
      this.form.roleList = this.roleList
      let rs = await this.$post("module/save", this.form)
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
    close () {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
