//工行融E联
<template>
  <LayoutForm>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="短信模板">
        <el-input v-model="form.smsModel"></el-input>
      </el-form-item>
      <el-form-item label="appid">
        <el-input v-model="form.appid"></el-input>
      </el-form-item>
      <el-form-item label="scope">
        <el-input v-model="form.scope"></el-input>
      </el-form-item>
      <el-form-item label="accessToken" v-if="accessTokenList.length==0">
        <UploadFileButton v-model="accessTokenList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="accessToken" v-else>
        <el-input v-model="accessTokenList[0].url" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="accessToken" v-if="priKeyBase64List.length==0">
        <UploadFileButton v-model="priKeyBase64List" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="accessToken" v-else>
        <el-input v-model="priKeyBase64List[0].url" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="pubKeyBase64" v-if="pubKeyBase64List.length==0">
        <UploadFileButton v-model="pubKeyBase64List" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="accessToken" v-else>
        <el-input v-model="pubKeyBase64List[0].url" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="platformPubKey" v-if="platformPubKeyList.length==0">
        <UploadFileButton v-model="platformPubKeyList" action="file/upload" :max="1"></UploadFileButton>
      </el-form-item>
      <el-form-item label="accessToken" v-else>
        <el-input v-model="platformPubKeyList[0].url" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
        <el-button @click="back">取消</el-button>
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
      loading: false,
      accessTokenList: [],
      priKeyBase64List: [],
      pubKeyBase64List: [],
      platformPubKeyList: [],
      form: {
        merchantId: this.$route.params.id,
        id: this.$route.params.lid,
        authType: 5,
        smsModel: "",
        accessToken: "", // base64
        sessionKey: "",
        appid: "",
        priKeyBase64: "", // base64
        pubKeyBase64: "", // base64
        platformPubKey: "", // base64
        scope: ""
      }

    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      if (this.smsModel == "" || this.smsModel == null) {
        this.$message("请先配置模版")
        this.loading = false
        return false
      }
      // accessTokenList: [],
      // priKeyBase64List: [],
      // pubKeyBase64List: [],
      // platformPubKeyList: [],
      if (this.accessTokenList.length == 0) {
        this.$message("请先上传accessToken")
        this.loading = false
        return false
      }
      if (this.priKeyBase64List.length == 0) {
        this.$message("请先上传私钥")
        this.loading = false
        return false
      }
      if (this.pubKeyBase64List.length == 0) {
        this.$message("请先上传公钥")
        this.loading = false
        return false
      }
      if (this.platformPubKeyList.length == 0) {
        this.$message("请先上传平台公钥")
        this.loading = false
        return false
      }
      this.form.accessToken = this.accessTokenList[0].url
      this.form.priKeyBase64 = this.priKeyBase64List[0].url
      this.form.pubKeyBase64 = this.pubKeyBase64List[0].url
      this.form.platformPubKey = this.platformPubKeyList[0].url
      let rs = this.$post("merchant/rYLLoginDispose", this.form)
      if (rs.status == "200") {
        this.$message("保存成功")
        this.back()
      } else {
        this.$message(rs.message)
      }
      this.loading = false
    },
    back () {
      this.$router.go(-1)
    }

  },
  created () {
  }

}
</script>
<style>
</style>
