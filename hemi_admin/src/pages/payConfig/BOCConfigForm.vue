<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="模版名" prop="configName">
        <el-input v-model="form.configName"></el-input>
      </el-form-item>
      <el-form-item label="中行商户号" prop="bocMerchantId">
        <el-input v-model="form.bocMerchantId"></el-input>
      </el-form-item>
      <el-form-item label="回调URL" prop="orderUrl">
        <el-input v-model="form.orderUrl"></el-input>
      </el-form-item>
      <el-form-item label="中行商户名称" prop="bocMerchantName">
        <el-input v-model="form.bocMerchantName"></el-input>
      </el-form-item>
      <el-form-item label="中行商户地区" prop="bocMerchantZone">
        <el-input v-model="form.bocMerchantZone"></el-input>
      </el-form-item>
      <el-form-item label="中行商户类型" prop="bocMerchantClass">
        <el-input v-model="form.bocMerchantClass"></el-input>
      </el-form-item>
      <el-form-item label="上传签名证书" v-if="signPFXList.length==0">
        <UploadFileButton v-model="signPFXList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="签名证书base64" v-else>
        <el-input v-model="signPFXList[0].url" :disabled="true"></el-input>
        <el-button @click="delSignPFX" v-if="!submiting">重置证书</el-button>
      </el-form-item>
      <el-form-item label="签名证书密钥" prop="signPFXBase64Password">
        <el-input v-model="form.signPFXBase64Password"></el-input>
      </el-form-item>
      <el-form-item label="*.CER证书" v-if="verifySignCerList.length==0">
        <UploadFileButton v-model="verifySignCerList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="*.CER证书证书base64" v-else>
        <el-input v-model="verifySignCerList[0].url" :disabled="true"></el-input>
        <el-button @click="delVerifySignCer" v-if="!submiting">重置证书</el-button>
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
      signPFXList: [],
      verifySignCerList: [],
      form: {
        configName: "",
        id: "",
        payType: "3", // 支付类型
        // merchantId: this.$route.params.id, // 商户id
        bocMerchantId: "", // 中行商户号
        orderUrl: "", // 回调URL
        bocMerchantName: "", // 中行商户名称
        bocMerchantZone: "", // 中行商户地区
        bocMerchantClass: "", // 中行商户类型
        signPFXBase64: "", // 签名证书bease64
        signPFXBase64Password: "", // 签名证书密钥
        verifySignCerBase64: "", //* .CER证书
        remark: ""// 备注
      },
      rules: {
        configName: [
          { required: true, message: "请输入模版名", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        bocMerchantId: [
          { required: true, message: "请输入中行商户号", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        orderUrl: [
          { required: true, message: "请输入回调URL", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        bocMerchantName: [
          { required: true, message: "请输入中行商户名称", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        bocMerchantZone: [
          { required: true, message: "请输入中行商户地区", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        bocMerchantClass: [
          { required: true, message: "请输入1~4字符的中行商户类型", trigger: "blur" },
          {
            min: 1,
            max: 4,
            trigger: "change"
          }
        ],
        signPFXBase64Password: [
          { required: true, message: "请输入签名证书密钥", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    delVerifySignCer () {
      this.verifySignCerList = []
    },
    delSignPFX () {
      this.signPFXList = []
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
      if (this.signPFXList.length == 0) {
        this.$message.error("请上传签名证书")
        this.submiting = false
        return false
      }
      if (this.verifySignCerList.length == 0) {
        this.$message.error("请上传*.CER证书")
        this.submiting = false
        return false
      }
      this.form.signPFXBase64 = this.signPFXList[0].url
      this.form.verifySignCerBase64 = this.verifySignCerList[0].url
      let rs = await this.$post("payConfig/saveBOCPayConfig", this.form)
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
        payType: "3"
      })
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.signPFXList.push({url: rs.payload.signPFXBase64})
          this.verifySignCerList.push({url: rs.payload.verifySignCerBase64})
          this.form = {
            id: rs.payload.id,
            configName: rs.payload.configName,
            bocMerchantId: rs.payload.bocMerchantId, // 中行商户号
            orderUrl: rs.payload.orderUrl, // 回调URL
            bocMerchantName: rs.payload.bocMerchantName, // 中行商户名称
            bocMerchantZone: rs.payload.bocMerchantZone, // 中行商户地区
            bocMerchantClass: rs.payload.bocMerchantClass, // 中行商户类型
            signPFXBase64: rs.payload.signPFXBase64, // 签名证书bease64
            signPFXBase64Password: rs.payload.signPFXBase64Password, // 签名证书密钥
            verifySignCerBase64: rs.payload.verifySignCerBase64, //* .CER证书
            remark: rs.payload.remark// 备注
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
