<template>
    <LayoutForm>
        <el-form :model="form" :rules="rules" ref="form" label-width="180px">
            <el-form-item label="建行商户ID" prop="ccbMerchantId">
                <el-input v-model="form.ccbMerchantId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="外联平台IP" prop="platformIp">
                <el-input v-model="form.platformIp"></el-input>
            </el-form-item>
            <el-form-item label="外联平台端口号" prop="platformPort">
                <el-input v-model="form.platformPort"></el-input>
            </el-form-item>
            <el-form-item label="运营商ID" prop="operatorId">
                <el-input v-model="form.operatorId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
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
    return {
      submiting: false,
      pubList: [],
      form: {
        id: "",
        ccbMerchantId: this.$route.params.ccbMerchantId,
        platformIp: "",
        platformPort: "",
        operatorId: "",
        password: ""
      },
      rules: {
        ccbMerchantId: [
          { required: true, message: "请输入建行商户ID", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        platformIp: [
          { required: true, message: "请输入外联平台IP", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        platformPort: [
          { required: true, message: "请输入外联平台端口号", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        operatorId: [
          { required: true, message: "请输入运营商ID", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }]
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
      let rs = await this.$post("payConfig/saveCcbPlatformConfig", this.form)
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
    async getCcbPlatformConfig (ccbMerchantId) {
      let rs = await this.$post("payConfig/getCcbPlatformConfigByCcbMerchantId", {ccbMerchantId: ccbMerchantId})
      if (rs.status == "200") {
        // this.pubList.push({url: rs.payload.pub})
        if (rs.payload != null) {
          this.form = {
            id: rs.payload.id,
            ccbMerchantId: this.$route.params.ccbMerchantId,
            platformIp: rs.payload.platformIp,
            platformPort: rs.payload.platformPort,
            operatorId: rs.payload.operatorId,
            password: rs.payload.password
          }
        }
      }
    }
  },
  created () {
    var ccbMerchantId = this.$route.params.ccbMerchantId
    if (ccbMerchantId) {
      this.getCcbPlatformConfig(ccbMerchantId)
    }
  }

}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
