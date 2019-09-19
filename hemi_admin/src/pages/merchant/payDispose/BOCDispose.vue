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
      <el-form-item label="中行商户号">
        <el-input v-model="form.bocMerchantId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="回调URL">
        <el-input v-model="form.orderUrl" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="中行商户名称">
        <el-input v-model="form.bocMerchantName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="中行商户地区">
        <el-input v-model="form.bocMerchantZone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="中行商户类型">
        <el-input v-model="form.bocMerchantClass" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="签名证书base64">
        <el-input v-model="form.signPFXBase64" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="签名证书密钥">
        <el-input v-model="form.signPFXBase64Password" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="*.CER证书证书base64">
        <el-input v-model="form.verifySignCerBase64" :disabled="true"></el-input>
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
      submiting: false,
      configList: [],
      connection: {
        id: "", // 配置中间表id
        configId: "", // 配置表id
        merchantId: this.$route.params.id, // 商户id
        payType: "3" // 支付类
      },
      form: {
        id: "",
        configName: "",
        merchantId: this.$route.params.id, // 商户id
        bocMerchantId: "", // 中行商户号
        orderUrl: "", // 回调URL
        bocMerchantName: "", // 中行商户名称
        bocMerchantZone: "", // 中行商户地区
        bocMerchantClass: "", // 中行商户类型
        signPFXBase64: "", // 签名证书bease64
        signPFXBase64Password: "", // 签名证书密钥
        verifySignCerBase64: "", //* .CER证书
        remark: ""// 备注
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
    async getBOCPayConfig () {
      let rs = await this.$post("payConfig/query", {payType: "3"})
      if (rs.status == "200") {
        this.configList = rs.payload.list
      }
    },
    async getPayConfigConnection (id) {
      // 查询模版中间表
      let rs = await this.$post("payConfig/getPayConfigConnectionById", {id: id})
      if (rs.status == "200") {
        this.connection = {
          id: rs.payload.id,
          configId: rs.payload.configId,
          merchantId: this.$route.params.id, // 商户id
          payType: "3" // 支付类型
        }
        this.getPayConfig(rs.payload.configId)
      }
    },
    async getPayConfig (id) {
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {id: id, payType: "3"})
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.form = {
            id: rs.payload.id,
            configName: rs.payload.configName,
            merchantId: this.$route.params.id,
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
    this.getBOCPayConfig()
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
