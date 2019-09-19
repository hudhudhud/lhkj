<template>
    <div class="form">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="短信模版" prop="smsModel">
                <el-input v-model="form.smsModel"></el-input>
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
    form = {
      id: this.merchant.id,
      smsModel: this.merchant.smsModel
    }
    return {
      submiting: false,
      form: form,
      rules: {
        smsModel: [
          { required: true, message: "请输入短信模版", trigger: "change" },
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
      let rs = await this.$post("merchant/updateCustomMerchantSmsModel", this.form)
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
