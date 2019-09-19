// 微信公众号
<template>
  <LayoutForm>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="短信模板">
        <el-input v-model="form.smsModel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>
<script>
export default {
  data () {
    return {
      form: {
        merchantId: this.$route.params.id,
        id: this.$route.params.lid,
        authType: 2,
        smsModel: ""
      }

    }
  },
  methods: {
    async onSubmit () {
      if (this.smsModel == "" || this.smsModel == null) {
        alert("请先配置模版")
        return false
      }
      let rs = this.$post("", this.form)
      if (rs.status == "200") {
        this.$message("保存成功")
        this.back()
      } else {
        this.$message(rs.message)
      }
    },
    back () {
      this.$router.go(-1)
    }

  },
  created () {
  }

}
</script>
<style>
</style>
