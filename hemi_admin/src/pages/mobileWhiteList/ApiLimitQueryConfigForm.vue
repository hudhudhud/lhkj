<template>
    <div class="form">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="类名" prop="className">
                <el-input v-model="form.className"></el-input>
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
    ApiConfog: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      submiting: false,
      form: {},
      rules: {
        className: [
          { required: true, message: "请输入类名", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
    }
  },
  methods: {

    async getConfig (defId) {
      let rs = await this.$post("mobileWhiteList/getApiLimitQueryConfigByDefId", {defId: defId})
      if (rs.status == 200) {
        if (rs.payload) {
          this.form = rs.payload
        } else {
          this.form = {defId: this.ApiConfog.id}
        }
      }
    },
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
      let rs = await this.$post("mobileWhiteList/saveApiLimitQueryConfig", this.form)
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
  created () {
    this.getConfig(this.ApiConfog.id)
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
