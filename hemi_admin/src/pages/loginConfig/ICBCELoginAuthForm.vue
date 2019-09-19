<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="模版名" prop="authName">
        <el-input v-model="form.authName"></el-input>
      </el-form-item>
      <el-form-item label="访问令牌" prop="accessToken">
        <el-input v-model="form.accessToken"></el-input>
      </el-form-item>
      <el-form-item label="appid" prop="appid">
        <el-input v-model="form.appid"></el-input>
      </el-form-item>
      <el-form-item label="平台公钥" prop="platformPubKey">
        <el-input v-model="form.platformPubKey"></el-input>
      </el-form-item>
      <el-form-item label="范围" prop="scope">
        <el-input v-model="form.scope"></el-input>
      </el-form-item>
      <el-form-item label="会话密钥" prop="sessionKey">
        <el-input v-model="form.sessionKey"></el-input>
      </el-form-item>
      <el-form-item label="公钥证书" v-if="pubKeyBase64List.length==0">
        <UploadFileButton v-model="pubKeyBase64List" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="公钥证书base64" v-else>
        <el-input v-model="pubKeyBase64List[0].url" :disabled="true"></el-input>
        <el-button @click="delpubKeyBase64" v-if="!submiting">重置证书</el-button>
      </el-form-item>
      <el-form-item label="私钥证书" v-if="priKeyBase64List.length==0">
        <UploadFileButton v-model="priKeyBase64List" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="私钥证书base64" v-else>
        <el-input v-model="priKeyBase64List[0].url" :disabled="true"></el-input>
        <el-button @click="delpriKeyBase64" v-if="!submiting">重置证书</el-button>
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
      priKeyBase64List: [],
      pubKeyBase64List: [],
      form: {
        loginType: "6"
      },
      rules: {
        authName: [
          { required: true, message: "请输入模版名", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        accessToken: [
          { required: true, message: "请输入accessToken", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        appid: [
          { required: true, message: "请输入appid", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        platformPubKey: [
          { required: true, message: "请输入platformPubKey", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        scope: [
          { required: true, message: "请输入scope", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        sessionKey: [
          { required: true, message: "请输入sessionKey", trigger: "blur" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
    }
  },
  methods: {
    delpriKeyBase64 () {
      this.priKeyBase64List = []
      this.form.priKeyBase64 = ""
    },
    delpubKeyBase64 () {
      this.pubKeyBase64List = []
      this.form.pubKeyBase64 = ""
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
      if (this.priKeyBase64List.length == 0) {
        this.$message.error("请上传私钥证书")
        this.submiting = false
        return false
      }
      if (this.pubKeyBase64List.length == 0) {
        this.$message.error("请上传公钥证书")
        this.submiting = false
        return false
      }
      this.form.priKeyBase64 = this.priKeyBase64List[0].url
      this.form.pubKeyBase64 = this.pubKeyBase64List[0].url
      let rs = await this.$post("loginConfig/saveIcbceAuth", this.form)
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
        loginType: "6"
      })
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.priKeyBase64List.push({url: rs.payload.priKeyBase64})
          this.pubKeyBase64List.push({url: rs.payload.pubKeyBase64})
          this.form = {
            id: rs.payload.id,
            accessToken: rs.payload.accessToken,
            appid: rs.payload.appid,
            authName: rs.payload.authName,
            platformPubKey: rs.payload.platformPubKey,
            priKeyBase64: rs.payload.priKeyBase64,
            pubKeyBase64: rs.payload.pubKeyBase64,
            scope: rs.payload.scope,
            sessionKey: rs.payload.sessionKey
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
