<template>
    <LayoutForm>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="部门名称" prop="departmentName">
                <el-input v-model="form.departmentName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
                <el-button @click="close " v-if="!submiting ">取消</el-button>
            </el-form-item>

        </el-form>
    </LayoutForm>
</template>

<script>

export default {

  data () {
    return {
      form: {
        merchantId: this.$route.params.merchantId,
        departmentName: "",
        id: this.$route.params.id
      },
      submiting: false,

      rules: {

        departmentName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
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

    async loadActDepartment (id) {
      this.submiting = true
      let rs = await this.$post("act_department/get_department_one", {id: id})
      if (rs.status == "200") {
        this.form.departmentName = rs.payload.departmentName
      }
      this.submiting = false
    },

    async doSubmit () {
      this.submiting = true

      let rs = await this.$post("act_department/save_department", this.form)
      if (rs.status == "200") {
        console.info("rs===" + rs.message)
        this.$message({
          message: rs.message,
          type: "success"
        })
        this.$emit("success", this.form)
        this.$router.go(-1)
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    let id = this.$route.params.id
    if (id) {
      this.loadActDepartment(id)
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
