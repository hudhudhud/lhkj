//工行
<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="模版名" prop="configName">
        <el-input v-model="form.configName"></el-input>
      </el-form-item>
      <el-form-item label="商户入账账号" prop="icbcAccount">
        <el-input v-model="form.icbcAccount"></el-input>
      </el-form-item>
      <el-form-item label="工行端商户Id" prop="merId">
        <el-input v-model="form.merId"></el-input>
      </el-form-item>
      <el-form-item label="临时回调地址" prop="merurl">
        <el-input v-model="form.merurl"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="clientType">
        <el-radio-group v-model="form.clientType">
          <el-radio :label="1">工行iPhone客户端版</el-radio>
          <el-radio :label="2">工行Android客户端版</el-radio>
          <el-radio :label="21">工行移动生活版(iPhone)</el-radio>
          <el-radio :label="22">工行移动生活版(Android)</el-radio>
          <el-radio :label="0">HTML版（只支持iPhone、Android的webkit核心浏览器）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传加签证书公钥" v-if="mercerList.length==0">
        <UploadFileButton v-model="mercerList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="加签证书公钥base64" v-else>
        <el-input v-model="mercerList[0].url" :disabled="true"></el-input>
        <el-button @click="delMercer" v-if="!submiting">重置证书</el-button>
      </el-form-item>
      <el-form-item label="上传验签证书公钥" v-if="verifyPublicKeyList.length==0">
        <UploadFileButton v-model="verifyPublicKeyList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="验签证书公钥base64" v-else>
        <el-input v-model="verifyPublicKeyList[0].url" :disabled="true"></el-input>
        <el-button @click="delVerifyPublicKey" v-if="!submiting">重置证书</el-button>
      </el-form-item>
      <el-form-item label="上传签名证书私钥" v-if="privateKeyList.length==0">
        <UploadFileButton v-model="privateKeyList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="签名证书私钥" v-else>
        <el-input v-model="privateKeyList[0].url" :disabled="true"></el-input>
        <el-button @click="delPrivateKey" v-if="!submiting">重置证书</el-button>
      </el-form-item>
      <el-form-item label="证书私钥保护口令" prop="codeWord">
        <el-input v-model="form.codeWord"></el-input>
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
      privateKeyList: [],
      mercerList: [],
      verifyPublicKeyList: [],
      form: {
        id: "",
        configName: "",
        payType: "4", // 支付类型
        mercer: "", // 加签证书公钥base64
        clientType: 1, // 客户类型
        // 1：工行iPhone客户端版
        // 2：工行Android客户端版
        // 21：工行移动生活版（iPhone）
        // 22：工行移动生活版（Android）
        // 0：HTML版（只支持iPhone、Android的webkit核心浏览器）
        icbcAccount: "", // 商户入账账号
        merId: "", // 工行开户时属于我们的商户Id
        merurl: "", // 临时回调地址
        privateKey: "", // 签名证书私钥base64
        codeWord: "", // 证书私钥保护口令
        verifyPublicKey: ""// 验签公钥base64
      },
      rules: {
        configName: [
          { required: true, message: "请输入模版名", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        icbcAccount: [
          { required: true, message: "请输入商户入账账号", trigger: "blur" }
        ],
        merId: [{
          required: true, message: "请输入工行端商户Id", trigger: blur
        }],
        merurl: [{
          required: true, message: "请输入临时回调地址", trigger: blur
        }],
        codeWord: [{
          required: true, message: "请输入证书私钥保护口令", trigger: blur
        }]
      }
    }
  },
  methods: {
    delPrivateKey () {
      this.privateKeyList = []
    },
    delVerifyPublicKey () {
      this.verifyPublicKeyList = []
    },
    delMercer () {
      this.mercerList = []
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
      if (this.mercerList.length == 0) {
        this.$message.error("请上传加签证书公钥")
        this.submiting = false
        return false
      }
      if (this.privateKeyList.length == 0) {
        this.$message.error("请上传签名证书私钥")
        this.submiting = false
        return false
      }
      if (this.verifyPublicKeyList.length == 0) {
        this.$message.error("请上传验签证书公钥")
        this.submiting = false
        return false
      }
      this.form.mercer = this.mercerList[0].url
      this.form.privateKey = this.privateKeyList[0].url
      this.form.verifyPublicKey = this.verifyPublicKeyList[0].url
      let rs = await this.$post("payConfig/saveICBCPayConfig", this.form)
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
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {id: id, payType: "4"})
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.mercerList.push({url: rs.payload.mercer})
          this.privateKeyList.push({url: rs.payload.privateKey})
          this.verifyPublicKeyList.push({url: rs.payload.verifyPublicKey})
          this.form = {
            id: rs.payload.id,
            configName: rs.payload.configName,
            mercer: rs.payload.mercer, // 加签证书公钥base64
            clientType: rs.payload.clientType, // 客户类型
            icbcAccount: rs.payload.icbcAccount, // 商户入账账号
            merId: rs.payload.merId, // 工行开户时属于我们的商户Id
            merurl: rs.payload.merurl, // 临时回调地址
            privateKey: rs.payload.privateKey, // 签名证书私钥base64
            codeWord: rs.payload.codeWord, // 证书私钥保护口令
            verifyPublicKey: rs.payload.verifyPublicKey// 验签公钥base64
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
