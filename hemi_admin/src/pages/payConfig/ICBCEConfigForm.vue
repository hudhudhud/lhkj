<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="模版名" prop="configName">
        <el-input v-model="form.configName"></el-input>
      </el-form-item>
      <el-form-item label="appid" prop="appid">
        <el-input v-model="form.appid"></el-input>
      </el-form-item>
      <el-form-item label="支付配置的商户号" prop="merId">
        <el-input v-model="form.merId"></el-input>
      </el-form-item>
      <el-form-item label="公钥" v-if="pubKeyList.length==0">
        <UploadFileButton v-model="pubKeyList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="公钥base64" v-else>
        <el-input v-model="pubKeyList[0].url" :disabled="true"></el-input>
        <el-button @click="delPubKey" v-if="!submiting">重置证书</el-button>
      </el-form-item>
      <el-form-item label="私钥" v-if="priKeyList.length==0">
        <UploadFileButton v-model="priKeyList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="私钥base64" v-else>
        <el-input v-model="priKeyList[0].url" :disabled="true"></el-input>
        <el-button @click="delPriKey" v-if="!submiting">重置证书</el-button>
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
      pubKeyList: [],
      priKeyList: [],
      form: {
        id: "",
        configName: "",
        payType: "6", // 支付类型id
        appid: "",
        priKeyBase64: "", // 私钥base64
        pubKeyBase64: "", // 公钥base64
        merId: ""// 支付配置的商户号
      },
      rules: {
        appid: [
          { required: true, message: "请输入appid", trigger: "blur" }
        ],
        configName: [
          { required: true, message: "请输入模版名", trigger: "blur" }
        ],
        merId: [
          { required: true, message: "请输入支付配置的商户号", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    delPubKey () {
      this.pubKeyList = []
      this.form.pubKeyBase64 = ""
    },
    delPriKey () {
      this.priKeyList = []
      this.form.priKeyBase64 = ""
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
      if (this.pubKeyList.length == 0) {
        this.$message.error("请上传公钥")
        this.submiting = false
        return false
      }
      if (this.priKeyList.length == 0) {
        this.$message.error("请上传私钥")
        this.submiting = false
        return false
      }
      this.form.pubKeyBase64 = this.pubKeyList[0].url
      this.form.priKeyBase64 = this.priKeyList[0].url
      let rs = await this.$post("payConfig/saveICBCEPayConfig", this.form)
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
    async getConfig () {
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {
        id: this.$route.params.id,
        payType: "6"
      })
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.priKeyList.push({url: rs.payload.priKeyBase64})
          this.pubKeyList.push({url: rs.payload.pubKeyBase64})
          this.form = {
            id: rs.payload.id,
            configName: rs.payload.configName,
            payType: "6",
            appid: rs.payload.appid,
            priKeyBase64: rs.payload.priKeyBase64, // 私钥base64
            pubKeyBase64: rs.payload.pubKeyBase64, // 公钥base64
            merId: rs.payload.merId// 支付配置的商户号
          }
        }
      }
    }
  },
  created () {
    var id = this.$route.params.id
    if (id) {
      this.getConfig()
    }
  }

}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
