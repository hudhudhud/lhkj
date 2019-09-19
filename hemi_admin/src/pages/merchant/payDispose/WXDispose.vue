<template>
  <LayoutForm>
    <el-form :model="form" ref="form" label-width="145px">
      <el-form-item label="选择微信支付模版">
        <el-select v-model="form.configId" @change="getPayConfig" placeholder="请选择">
          <el-option v-for="item in configList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版名">
        <el-input v-model="connection.configName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商户公众号(appid)" prop="appId">
        <el-input v-model="connection.appId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="微信端商户号">
        <el-input v-model="connection.merId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商户平台密钥">
        <el-input v-model="connection.privateKey" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="支付回调地址">
        <el-input v-model="connection.notifyUrl" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="证书base64">
        <el-input v-model="connection.pkcs12P12" clearable :disabled="true"></el-input>
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
      form: {
        id: "", // 配置中间表id
        configId: "", // 配置表id
        merchantId: this.$route.params.id, // 商户id
        payType: "2" // 支付类型
      },
      connection: {
        id: "",
        appId: "",
        merId: "",
        privateKey: "",
        notifyUrl: "",
        pkcs12P12: ""
      }
    }
  },
  methods: {
    async getPayConfigConnection (id) {
      // 查询模版中间表
      let rs = await this.$post("payConfig/getPayConfigConnectionById", {id: id})
      if (rs.status == "200") {
        this.form = {
          id: rs.payload.id,
          configId: rs.payload.configId,
          merchantId: this.$route.params.id, // 商户id
          payType: "2" // 支付类型
        }
        this.getPayConfig(rs.payload.configId)
      }
    },
    async getPayConfig (id) {
      // 模版详情
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {id: id, payType: "2"})
      if (rs.status == "200") {
        this.connection = {
          id: id, // 配置表ID
          configName: rs.payload.configName,
          appId: rs.payload.appId,
          merId: rs.payload.merId,
          privateKey: rs.payload.privateKey,
          notifyUrl: rs.payload.notifyUrl,
          pkcs12P12: rs.payload.pkcs12P12
        }
      }
    },
    async getWXPayConfig () {
      // 查询所有微信配置模版
      let rs = await this.$post("payConfig/query", {payType: "2"})
      if (rs.status == "200") {
        this.configList = rs.payload.list
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
      let rs = await this.$post("merchant/savePayConfigConnection", this.form)
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
    }
  },
  created () {
    this.getWXPayConfig()
    var id = this.$route.params.lid
    if (id) {
      this.form.id = id
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
