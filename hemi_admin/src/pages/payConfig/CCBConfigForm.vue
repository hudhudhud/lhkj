<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="模版名" prop="configName">
        <el-input v-model="form.configName"></el-input>
      </el-form-item>
      <el-form-item label="银行端商户id" prop="bankMerchantId">
        <el-input v-model="form.bankMerchantId"></el-input>
      </el-form-item>
      <el-form-item label="商户柜台代码" prop="posId">
        <el-input v-model="form.posId"></el-input>
      </el-form-item>
      <el-form-item label="分行代码" prop="branchid">
        <el-input v-model="form.branchid"></el-input>
      </el-form-item>
      <el-form-item label="公钥" prop="pub">
        <el-input v-model="form.pub"></el-input>
      </el-form-item>
      <!-- <el-form-item label="公钥" v-if="pubList.length==0">
                <UploadFileButton v-model="pubList" action="file/upload" :max="1"></UploadFileButton>
            </el-form-item>
            <el-form-item label="公钥base64" v-else>
                <el-input v-model="pubList[0].url" :disabled="true"></el-input>
            </el-form-item> -->
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
      pubList: [],
      form: {
        id: "",
        payType: this.$route.params.type == 0 ? "5" : (this.$route.params.type == 1 ? "7" : "8"), // 支付类型id
        configName: "",
        bankMerchantId: "", // 银行端商户id
        posId: "", // 商户柜台代码
        branchid: "", // 分行代码
        pub: "",
        type: this.$route.params.type
      },
      rules: {
        configName: [
          { required: true, message: "请输入模版名", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        bankMerchantId: [
          { required: true, message: "请输入银行端商户id", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        posId: [
          { required: true, message: "请输入商户柜台代码", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        branchid: [
          { required: true, message: "请输入分行代码", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        pub: [
          { required: true, message: "请输入公钥", trigger: "blur" },
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
      // if (this.pubList.length == 0) {
      //   this.$message.error("请上传公钥")
      //   this.submiting = false
      //   return false
      // }
      // this.form.pub = this.pubList[0].url
      let rs = await this.$post("payConfig/saveCCBPayConfig", this.form)
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
      let rs = await this.$post("payConfig/getMerchantPayConfigById", {
        id: id,
        payType: this.$route.params.type == 0 ? "5" : (this.$route.params.type == 1 ? "7" : (this.$route.params.type == 2 ? "8" : "9"))
      })
      if (rs.status == "200") {
        // this.pubList.push({url: rs.payload.pub})
        if (rs.payload != null) {
          this.form = {
            id: rs.payload.id,
            payType: this.$route.params.type == 0 ? "5" : (this.$route.params.type == 1 ? "7" : (this.$route.params.type == 2 ? "8" : "9")),
            configName: rs.payload.configName,
            bankMerchantId: rs.payload.bankMerchantId,
            posId: rs.payload.posId,
            pub: rs.payload.pub,
            branchid: rs.payload.branchid,
            type: this.$route.params.type
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
