<template>
  <LayoutForm>
    <el-form :model="form" ref="form" label-width="180px">
      <el-form-item label="选择建行支付模版">
        <el-select v-model="connection.configId" @change="getConfig" placeholder="请选择">
          <el-option v-for="item in configList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版名">
        <el-input v-model="form.configName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="银行商户id">
        <el-input v-model="form.bankMerchantId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商户柜台代码">
        <el-input v-model="form.posId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="分行代码">
        <el-input v-model="form.branchid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公钥base64">
        <el-input v-model="form.pub" :disabled="true"></el-input>
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
        payType: "5" // 支付类
      },
      form: {
        id: "",
        configName: "",
        payType: "5", // 支付类型id
        bankMerchantId: "", // 银行商户id
        posId: "", // 商户柜台代码
        branchid: "", // 分行代码
        pub: ""
      }
    }
  },
  methods: {
    async getCCBPayConfig () {
      let rs = await this.$post("payConfig/query", {payType: "5"})
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
          payType: "5" // 支付类型
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
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {id: id, payType: "5"})
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.form = {
            id: rs.payload.id,
            payType: "5",
            configName: rs.payload.configName,
            bankMerchantId: rs.payload.bankMerchantId,
            posId: rs.payload.posId,
            pub: rs.payload.pub,
            branchid: rs.payload.branchid
          }
        }
      }
    }
  },
  created () {
    this.getCCBPayConfig()
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
