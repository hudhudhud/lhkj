//中行
<template>
  <LayoutForm>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="短信模板">
        <el-input v-model="form.smsModel"></el-input>
      </el-form-item>
      <el-form-item label="上传证书" v-if="form.str.length==0">
        <UploadFileButton v-model="form.str" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="密钥" v-else>
        <el-input v-model="form.str[0].url" :disabled="true"></el-input>
      </el-form-item>
      <!-- <el-form-item label="密钥">
        <el-input v-model="form.key"></el-input>
      </el-form-item> -->
      <el-form-item label="密钥文件密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>
<script>
import UploadFileButton from "@/components/UploadFileButton"
export default {
  components: {
    UploadFileButton
  },
  data () {
    return {
      form: {
        merchantId: this.$route.params.id,
        id: this.$route.params.lid,
        authType: 3,
        smsModel: "",
        pwd: "",
        key: "",
        str: [],
        remark: ""
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.smsModel == "" || this.smsModel == null) {
        alert("请先配置模版")
        return false
      }
      let rs = this.$post("merchant/bOCLoginDispose", {
        merchantId: this.form.merchantId,
        id: this.form.id,
        authType: this.form.authType,
        smsModel: this.smsModel,
        pwd: this.form.pwd,
        key: this.form.str[0].url
      })
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
