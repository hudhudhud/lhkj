<template>
  <LayoutForm>
    <el-form :model="form" ref="form" label-width="180px">
      <el-form-item label="选择中行支付模版">
        <el-select v-model="connection.configId" @change="getPayConfig" placeholder="请选择">
          <el-option v-for="item in configList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版名">
        <el-input v-model="form.configName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商户入账账号">
        <el-input v-model="form.icbcAccount" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="工行开户时属于我们的商户Id">
        <el-input v-model="form.merId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="临时回调地址">
        <el-input v-model="form.merurl" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-radio-group v-model="form.clientType">
          <el-radio :label="1" v-if="form.clientType=='1'">工行iPhone客户端版</el-radio>
          <el-radio :label="2" v-if="form.clientType=='2'">工行Android客户端版</el-radio>
          <el-radio :label="21" v-if="form.clientType=='21'">工行移动生活版(iPhone)</el-radio>
          <el-radio :label="22" v-if="form.clientType=='22'">工行移动生活版(Android)</el-radio>
          <el-radio :label="0" v-if="form.clientType=='0'">HTML版（只支持iPhone、Android的webkit核心浏览器）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="加签证书公钥base64">
        <el-input v-model="form.mercer" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="验签证书公钥base64">
        <el-input v-model="form.verifyPublicKey" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="签名证书私钥">
        <el-input v-model="form.privateKey" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="证书私钥保护口令">
        <el-input v-model="form.codeWord" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
export default {
  data () {
    // 如果有参数传入,则使用参数,否则使用默认值
    return {
      configList: [],
      submiting: false,
      connection: {
        id: "",
        configId: "",
        merchantId: this.$route.params.id, // 商户id
        payType: "4" // 支付类型
      },
      form: {
        id: "",
        configName: "",
        mercer: "", // 加签证书公钥base64
        clientType: "", // 客户类型
        icbcAccount: "", // 商户入账账号
        merId: "", // 工行开户时属于我们的商户Id
        merurl: "", // 临时回调地址
        privateKey: "", // 签名证书私钥base64
        codeWord: "", // 证书私钥保护口令
        verifyPublicKey: ""// 验签公钥base64
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
      let rs = await this.$post("merchant/savePayConfigConnection", this.connection)
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
    async getPayConfigConnection (id) {
      // 查询模版中间表
      let rs = await this.$post("payConfig/getPayConfigConnectionById", {id: id})
      if (rs.status == "200") {
        this.connection = {
          id: rs.payload.id,
          configId: rs.payload.configId,
          merchantId: this.$route.params.id, // 商户id
          payType: "4" // 支付类型
        }
        this.getPayConfig(rs.payload.configId)
      }
    },
    async getICBCPayConfig () {
      let rs = await this.$post("payConfig/query", {payType: "4"})
      if (rs.status == "200") {
        this.configList = rs.payload.list
      }
    },
    async getPayConfig (id) {
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {id: id, payType: "4"})
      if (rs.status == "200") {
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
  },
  created () {
    this.getICBCPayConfig()
    var id = this.$route.params.lid
    if (id) {
      this.connection.id = id
      // 查看模版中间表详情
      this.getPayConfigConnection(id)
    }
  }

}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
