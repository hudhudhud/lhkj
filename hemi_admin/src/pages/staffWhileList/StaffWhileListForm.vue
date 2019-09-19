<template>
    <div class="form">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="员工号" prop="ehr">
                <el-input v-model="form.ehr"></el-input>
            </el-form-item>
            <el-form-item label="号码" prop="mobile">
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
    merchant: {
      require: true,
      type: Object
    }
  },
  data () {
    let form = null
    if (this.merchant) {
      form = {
        id: this.merchant.id,
        ehr: this.merchant.ehr,
        mobile: this.merchant.mobile,
        status: this.merchant.status
      }
    } else {
      form = {}
    }
    return {
      submiting: false,
      form: form,
      rules: {
        ehr: [
          { required: true, message: "请输入员工号", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        mobile: [
          { required: true, message: "请输入号码", trigger: "change" },
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
      this.submiting = true
      let rs = await this.$post("staffWhileList/save", this.form)
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
