<template>
    <LayoutForm>
        <el-form :model="form" :rules="rules" ref="form" label-width="180px">
            <el-form-item label="模版名" prop="authName">
                <el-input v-model="form.authName"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="调试模式">
                <el-switch v-model="form.isDebug" inactive-text="关闭" active-text="开启" active-value="1" inactive-value="0">
                </el-switch>
            </el-form-item>
            <el-form-item label="解密密钥文件" v-if="customInfoDecodeFileBase64List.length==0">
                <UploadFileButton v-model="customInfoDecodeFileBase64List" action="file/upload" :max="1"></UploadFileButton>
            </el-form-item>
            <el-form-item label="解密密钥文件base64" v-else>
                <el-input v-model="customInfoDecodeFileBase64List[0].url" :disabled="true"></el-input>
                <el-button @click="delCustomInfoDecodeFileBase64" v-if="!submiting">重置证书</el-button>
            </el-form-item>
            <el-form-item label="解密密钥文件密钥" prop="customInfoDecodeFileBase64Secret">
                <el-input v-model="form.customInfoDecodeFileBase64Secret"></el-input>
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
      customInfoDecodeFileBase64List: [],
      form: {
        loginType: "3",
        isDebug: "0"
      },
      rules: {
        authName: [
          { required: true, message: "请输入模版名", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        customInfoDecodeFileBase64Secret: [
          { required: true, message: "请输入解密密钥文件密钥", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
    }
  },
  methods: {
    delCustomInfoDecodeFileBase64 () {
      this.customInfoDecodeFileBase64List = []
      this.form.customInfoDecodeFileBase64 = ""
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
      if (this.customInfoDecodeFileBase64List.length == 0) {
        this.$message.error("请上传解密密钥文件")
        this.submiting = false
        return false
      }
      this.form.customInfoDecodeFileBase64 = this.customInfoDecodeFileBase64List[0].url
      let rs = await this.$post("loginConfig/saveBocAuth", this.form)
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
        loginType: "3"
      })
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.customInfoDecodeFileBase64List.push({url: rs.payload.customInfoDecodeFileBase64})
          this.form = {
            id: rs.payload.id,
            authName: rs.payload.authName,
            remark: rs.payload.remark,
            isDebug: rs.payload.isDebug + "",
            customInfoDecodeFileBase64Secret: rs.payload.customInfoDecodeFileBase64Secret,
            customInfoDecodeFileBase64: rs.payload.customInfoDecodeFileBase64
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
