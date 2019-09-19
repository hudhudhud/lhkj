<template>
    <LayoutForm>
        <el-form :model="form" :rules="rules" ref="form" label-width="180px">
            <el-form-item label="模版名" prop="authName">
                <el-input v-model="form.authName"></el-input>
            </el-form-item>
            <el-form-item label="证书" v-if="customDecodeCerBase64List.length==0">
                <UploadFileButton v-model="customDecodeCerBase64List" action="file/upload" :max="1"></UploadFileButton>
            </el-form-item>
            <el-form-item label="证书base64" v-else>
                <el-input v-model="customDecodeCerBase64List[0].url" :disabled="true"></el-input>
                <el-button @click="delCustomDecodeCerBase64" v-if="!submiting">重置证书</el-button>
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
    // 如果有参数传入,则使用参数,否则使用默认值
    return {
      submiting: false,
      customDecodeCerBase64List: [],
      form: {
        loginType: "4"
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
    delCustomDecodeCerBase64 () {
      this.customDecodeCerBase64List = []
      this.form.customDecodeCerBase64 = ""
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
      if (this.customDecodeCerBase64List.length == 0) {
        this.$message.error("请上传证书")
        this.submiting = false
        return false
      }
      this.form.customDecodeCerBase64 = this.customDecodeCerBase64List[0].url
      let rs = await this.$post("loginConfig/saveIcbcAuth", this.form)
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
    async getAuth () {
      let rs = await this.$post("loginConfig/getLoginAuthByIdAndType", {
        id: this.$route.params.id,
        loginType: "4"
      })
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.customDecodeCerBase64List.push({url: rs.payload.customDecodeCerBase64})
          this.form = {
            id: rs.payload.id,
            authName: rs.payload.authName,
            customDecodeCerBase64: rs.payload.customDecodeCerBase64
          }
        }
      }
    }
  },
  created () {
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
