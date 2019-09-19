<template>
  <LayoutForm>
    <el-form :model="form" ref="form" label-width="180px">
      <el-form-item label="选择融E联支付模版">
        <el-select v-model="connection.configId" @change="getConfig" placeholder="请选择">
          <el-option v-for="item in configList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版名">
        <el-input v-model="form.configName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="appid">
        <el-input v-model="form.appid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="支付配置的商户号">
        <el-input v-model="form.merId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公钥base64">
        <el-input v-model="form.pubKeyBase64" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="私钥base64">
        <el-input v-model="form.priKeyBase64" :disabled="true"></el-input>
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
        payType: "6" // 支付类
      },
      form: {
        id: "",
        configName: "",
        payType: "6", // 支付类型id
        appid: "",
        priKeyBase64: "", // 私钥base64
        pubKeyBase64: "", // 公钥base64
        merId: ""// 支付配置的商户号
      }
    }
  },
  methods: {
    async getICBCEPayConfig () {
      let rs = await this.$post("payConfig/query", {payType: "6"})
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
          payType: "6" // 支付类型
        }
        this.getConfig(rs.payload.configId)
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
    async getConfig (id) {
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {id: id, payType: "6"})
      if (rs.status == "200") {
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
  },
  created () {
    this.getICBCEPayConfig()
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
