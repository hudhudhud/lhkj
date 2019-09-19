<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" style="margin-top:15px;">
      <el-form-item label="商户ID:" prop="id" style="display:none">
        <el-input style="width: 20%;" v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:" prop="name">
        <el-input style="width: 40%;" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="认证方式:" prop="authid">
        <el-select v-model="form.authid" placeholder="请选择" @change="findPayTypeByAuthType">
          <el-option v-for="auth in authTypeList" :key="auth.authType" :label="auth.name" :value="auth.authType">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式:" prop="paytypeid">
        <el-select v-model="form.paytypeid" placeholder="请选择">
          <el-option v-for="payTypeZ in payTypeListFindByAuthId" :key="payTypeZ.payType" :label="payTypeZ.payTypeName" :value="payTypeZ.payType">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用ID:" prop="appId" v-if="form.isAdd==false">
        <el-input style="width: 40%;" v-model="form.appId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商户秘钥:" prop="appSecret" v-if="form.isAdd==false">
        <el-input style="width: 60%;" v-model="form.appSecret" :disabled="true"></el-input>
        <el-button @click="getUUID" :loading="submiting">重置商户密钥</el-button>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="登录授权模式:" prop="oauthModel">
        <el-select v-model="form.oauthModel" placeholder="请选择">
          <el-option v-for="model in oauthModelList" :key="model.modelCode" :label="model.modelName" :value="model.modelCode">
          </el-option>
        </el-select>
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
      form: {
        id: null,
        name: "",
        status: "1",
        paytypeid: null,
        appId: null,
        appSecret: null,
        host: null,
        https: [],
        keyPassword: null,
        salesmanId: null,
        isAdd: true,
        sms: null,
        authid: null,
        oauthModel: null
      },
      mid: null,
      payTypeList: [],
      authTypeList: [],
      saleManList: [],
      oauthModelList: [],
      payTypeListFindByAuthId: [],
      rules: {
        name: [
          { required: true, message: "请输入商户名称", trigger: "blur" },
          {
            min: 2,
            max: 35,
            message: "长度在 2 到 35 个字符",
            trigger: "change"
          }
        ],
        paytypeid: [
          { required: true, message: "请选择支付类型", trigger: "blur" }
        ],
        authid: [
          { required: true, message: "请选择认证方式", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    async getUUID () {
      this.submiting = true
      let rs = await this.$post("merchant/getUUID")

      if (rs.status == "200") {
        this.form.appSecret = rs.payload
        this.$message({
          message: "获取成功,点击保存后重置",
          type: "success"
        })
      } else {
        this.$message({
          message: "获取失败",
          type: "error"
        })
      }
      this.submiting = false
    },
    async findPayTypeByAuthType (authId) {
      this.submiting = true
      let rs = await this.$post("merchant/showPayTypeByAuthType/" + authId)
      if (rs.status == "200") {
        this.payTypeListFindByAuthId = rs.payload
        this.form.paytypeid = null
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    handleRemove (file, https) {
      this.form.https.splice(0)
    },
    handleExceed (files, https) {
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + https.length} 个文件`)
    },
    uploadSuccess (response, file, fileList) {
      this.form.https.push(response)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
      let rs = await this.$post("merchant/save", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async loadPayType () {
      this.submiting = true
      let rs = await this.$post("merchant/showPayType")

      if (rs.status == "200") {
        this.payTypeList = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async loadAuthType () {
      this.submiting = true
      let rs = await this.$post("merchant/getAuthType")
      if (rs.status == "200") {
        // rs.payload.forEach(authType => {
        //   authType.checked = !!authType.authid
        // })
        this.authTypeList = rs.payload.list
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async loadSaleMan () {
      this.submiting = true
      let rs = await this.$post("merchant/showSaleMan")
      if (rs.status == "200") {
        rs.payload.forEach(salMan => {
          salMan.checked = (salMan.id == this.form.salesmanId)
        })
        this.saleManList = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async loadMerchant (mid) {
      this.submiting = true
      let rs = await this.$post("merchant/showOne", {merchantId: mid})
      if (rs.status == "200") {
        this.form.id = rs.payload.merchant.id
        this.form.name = rs.payload.merchant.name
        this.form.appId = rs.payload.merchant.appId
        this.form.paytypeid = Number(rs.payload.merchant.payType)
        this.form.status = rs.payload.merchant.status
        this.form.authid = rs.payload.merchant.authType + ""
        this.form.appSecret = rs.payload.merchant.appSecret
        this.form.keyPassword = rs.payload.merchant.keyPassword
        this.form.salesmanId = rs.payload.merchant.salesmanId
        this.form.host = rs.payload.merchant.host
        this.form.sms = rs.payload.merchant.sms
        this.payTypeListFindByAuthId = rs.payload.authPayConnections
        this.form.oauthModel = rs.payload.customMerchant.oauthModel
      }
      this.submiting = false
    },
    close () {
      this.$router.push({
        path: "/merchant"
      })
    },
    async loadOauthModel () {
      this.oauthModelList = [
        {modelCode: 0, modelName: "默认"},
        {modelCode: 1, modelName: "localStorage"},
        {modelCode: 2, modelName: "localStorage & code"}
      ];
    }
  },
  created () {
    let mid = this.$route.params.mid
    this.form.isAdd = !mid
    if (mid) {
      this.loadMerchant(mid)
    }
    // this.loadPayType()
    this.loadAuthType()
    // this.loadSaleMan()
    this.loadOauthModel()
  }
}
</script>

<style scoped>
</style>
