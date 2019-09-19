<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" style="margin-top:15px;">
      <el-form-item label="签名:" prop="sign">
        <el-input v-model="form.sign"></el-input>
      </el-form-item>
      <el-form-item label="发送类型">
        <el-switch v-model="uploadType" active-color="#13ce66" inactive-color="#ff4949" active-text="批量发送" inactive-text="单条发送">
        </el-switch>
      </el-form-item>
      <el-form-item label="内容是否一致" v-if="uploadType">
        <el-switch v-model="uploadMsgType" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="短信内容" v-if="uploadMsgType" prop="sign">
        <el-input v-model="form.msg"></el-input>
      </el-form-item>
      <el-form-item label="批量发送" v-if="uploadType">
        <UploadButton ref="uploadused" v-if="uploadMsgType" :action="'sms/uploadTelAndMsg/'+form.sign+'/'+form.msg" @success="success"></UploadButton>
        <UploadButton ref="uploadused" v-else :action=" 'sms/uploadTelAndMsg/'+form.sign" @success="success"></UploadButton>
      </el-form-item>
      <el-form-item label="号码" prop="tel" v-if="!uploadType">
        <el-input v-model="form.tel "></el-input>
      </el-form-item>
      <el-form-item v-if="!uploadType">
        <el-button type="primary" @click="validForm" :loading="submiting">点击发送</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
import UploadButton from "@/components/UploadButton"
export default {
  components: {
    UploadButton
  },
  data () {
    return {
      uploadMsgType: true,
      uploadType: true,
      uploadused: false,
      submiting: false,
      form: {
        sign: "【】"
      },
      rules: {
        sign: [
          { required: true, message: "请输入签名", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入号码", trigger: "blur" }
        ],
        msg: [
          { required: true, message: "请输入短信内容", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    success (rs) {
      this.uploadused = true
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "发送完成"
        })
        if (rs.payload.length > 0) {
          this.$notify({
            title: "未发送短信",
            message: rs.payload,
            duration: 0
          })
        }
      } else {
        this.$message.error("导入失败")
      }
    },
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.sendSms()
        } else {
          return false
        }
      })
    },
    async sendSms () {
      this.submiting = true
      let rs = await this.$post("sms/sendSms", this.form)
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "发送成功"
        })
      } else {
        this.$message({
          type: "error",
          message: rs.message
        })
      }
      this.submiting = false
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
