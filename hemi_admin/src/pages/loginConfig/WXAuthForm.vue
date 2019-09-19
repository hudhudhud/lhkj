<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px">
      <el-form-item label="模版名" prop="authName">
        <el-input v-model="form.authName"></el-input>
      </el-form-item>
      <el-form-item label="开放平台">
        <el-select v-model="form.appId" placeholder="请选择开放平台">
          <el-option v-for="item in wechatComponentList" :key="item.appId" :label="item.name" :value="item.appId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">生成二维码</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
    <LayoutDialog class="p-w30" title="二维码信息" v-model="showCode">
      <Code :text="qrcode" :name="form.authName" @close="showCode=false" @success="close"></Code>
    </LayoutDialog>
  </LayoutForm>
</template>

<script>
import Code from "./Code"
export default {
  components: {
    Code
  },
  data () {
    // 如果有参数传入,则使用参数,否则使用默认值
    return {
      showCode: false,
      submiting: false,
      wechatComponentList: [],
      qrcode: "",
      form: {
        loginType: "1",
        appId: "",
        authName: ""
      },
      rules: {
        authName: [
          { required: true, message: "请输入模版名", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
    }
  },
  methods: {
    async getWechatComponent () {
      let rs = await this.$post("loginConfig/getWechatComponent")
      if (rs.status == "200") {
        this.wechatComponentList = rs.payload.list
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
      if (this.form.appId == "") {
        this.$message.error("请选择开放平台")
        this.submiting = false
        return false
      }
      let st = await this.$post("loginConfig/getWechatComponentAuthByAuthName", {authName: this.form.authName})
      if (st.status == "500") {
        this.submiting = false
        this.$message.error(st.error)
        return false
      }
      let rs = await this.$post("loginConfig/getQRcode", this.form)
      if (rs.status == "200") {
        this.qrcode = rs.payload
        this.showCode = true
      } else {
        this.$message.error(rs.error)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    },
    async getAuth () {
      let rs = await this.$post("loginConfig/getLoginAuthByIdAndType", {
        id: this.$route.params.id,
        loginType: "1"
      })
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.form = {
            id: rs.payload.id,
            authName: rs.payload.authName,
            mpName: rs.payload.mpName,
            appId: rs.payload.appId
          }
        }
      }
    }
  },
  created () {
    this.getWechatComponent()
    var id = this.$route.params.id
    if (id) {
      this.getAuth()
    }
  }

}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
