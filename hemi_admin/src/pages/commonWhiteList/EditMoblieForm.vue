<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
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
    bwMobile: {
      require: true,
      type: Object
    }
  },
  data () {
    let form = null
    if (this.bwMobile) {
      form = {
        id: this.bwMobile.id,
        defId: this.bwMobile.defId,
        mobile: this.bwMobile.mobile,
        type: this.bwMobile.type
      }
    } else {
      form = {
        id: "",
        mobile: "",
        defId: "",
        type: ""
      }
    }
    return {
      submiting: false,
      form: form,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
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
      console.log(this.form)
      this.submiting = true
      if (this.form.type === "" || this.form.type === null) {
        this.$message.error("未知的类型")
        this.submiting = false
        return false
      }
      let rs = await this.$post("mobileWhiteList/saveBWMoblieList", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$emit("close")
    }
  },
  activated () {
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
