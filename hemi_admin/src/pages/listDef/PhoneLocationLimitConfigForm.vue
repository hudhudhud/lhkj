<template>
  <LayoutForm>
    <el-form label-width="100px">
      <el-form-item label="限制模版">
        <template>
          <el-transfer v-model="form.limitDefIdList" filterable target-order="push" :titles="['可选','已选']" :props="{key:'id',label:'defName'}" :data="ListDefList"></el-transfer>
        </template>
      </el-form-item>
      <el-form-item label="报错信息">
        <el-input v-model="form.errReturnMsg"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>
<script>

export default {
  data () {
    return {
      loading: false,
      ListDefList: [],
      form: {
        id: "",
        limitDefIdList: [],
        errReturnMsg: ""
      }
    }
  },
  methods: {
    async getMerchant () {
      var rs = await this.$post("listDef/getCustomMerchantBySessionData")
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "Custom库内未找到该商户"
        })
        return false
      }
      this.form.errReturnMsg = rs.payload.errReturnMsg
    },
    async getDetails () {
      var rs = await this.$post("listDef/getLimitDefDetaiulsBySessionData")
      this.form.limitDefIdList = rs.payload.limitDefIdList
      this.form.id = rs.payload.id
    },
    async getListDef () {
      var rs = await this.$post("listDef/getPrivateAndPublicListDef")
      this.ListDefList = rs.payload
      this.getDetails()
    },
    async onSubmit () {
      this.loading = true
      if (this.form.errReturnMsg == "" || this.form.errReturnMsg == null) {
        this.$message({
          type: "error",
          message: "请输入报错信息"
        })
        this.loading = false
        return false
      }
      let rs = await this.$post("merchant/updateMerchantLimitDefIdsById", this.form)
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "保存成功"
        })
        this.back()
      } else {
        this.$message.error(rs.message)
      }
      this.loading = false
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getListDef()
    this.getMerchant()
  }

}
</script>
<style>
</style>
