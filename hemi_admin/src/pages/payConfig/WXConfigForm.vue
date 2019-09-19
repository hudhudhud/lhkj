<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="模版名" prop="configName">
        <el-input v-model="form.configName"></el-input>
      </el-form-item>
      <el-form-item label="商户公众号(appid)" prop="appId">
        <el-input v-model="form.appId"></el-input>
      </el-form-item>
      <el-form-item label="微信端商户号" prop="merId">
        <el-input v-model="form.merId"></el-input>
      </el-form-item>
      <el-form-item label="商户平台密钥" prop="privateKey">
        <el-input v-model="form.privateKey"></el-input>
      </el-form-item>
      <el-form-item label="支付回调地址" prop="notifyUrl">
        <el-input v-model="form.notifyUrl"></el-input>
      </el-form-item>
      <el-form-item label="SSL安全证书" v-if="pkcs12P12List.length==0">
        <UploadFileButton v-model="pkcs12P12List" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="证书base64" v-else>
        <el-input v-model="pkcs12P12List[0].url" clearable :disabled="true"></el-input>
        <el-button @click="delPkcs12P12" v-if="!submiting">重置证书</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
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
    // 如果有参数传入,则使用参数,否则使用默认值
    return {
      submiting: false,
      pkcs12P12List: [],
      form: {
        id: "", // 模版ID
        payType: "2", // 支付类型
        appId: "",
        merId: "",
        privateKey: "",
        notifyUrl: "",
        pkcs12P12: "",
        configName: ""
      },
      rules: {
        configName: [
          { required: true, message: "请输入模版名", trigger: "blur" }
        ],
        merId: [
          { required: true, message: "请输入微信端商户号", trigger: "blur" }
        ],
        appId: [
          { required: true, message: "请输入appId", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        privateKey: [
          { required: true, message: "请输入商户平台密钥", trigger: "blur" }
        ],
        notifyUrl: [{
          required: true, message: "请输入回调地址", trigger: blur
        }]
      }
    }
  },
  methods: {
    delPkcs12P12 () {
      this.pkcs12P12List = []
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
      if (this.pkcs12P12List.length != 1) {
        this.$message.error("请上传SSL安全证书")
        this.submiting = false
        return false
      }
      this.form.pkcs12P12 = this.pkcs12P12List[0].url
      let rs = await this.$post("payConfig/saveWXPayConfig", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
      } else {
        this.$message.error(rs.error)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    },
    async getConfig (id) {
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {id: id, payType: "2"})
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.pkcs12P12List.push({url: rs.payload.pkcs12P12})
          this.form = {
            id: this.$route.params.id,
            appId: rs.payload.appId,
            merId: rs.payload.merId,
            privateKey: rs.payload.privateKey,
            notifyUrl: rs.payload.notifyUrl,
            pkcs12P12: rs.payload.pkcs12P12,
            configName: rs.payload.configName
          }
        }
      }
    }
  },
  created () {
    var id = this.$route.params.id
    if (id) {
      this.getConfig(id)
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
