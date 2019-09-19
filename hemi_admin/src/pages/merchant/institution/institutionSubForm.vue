<template>
    <LayoutForm>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="上级机构 " prop="higherInstitution ">
                <el-input v-model="form.higherInstitution " disabled></el-input>
            </el-form-item>
            <el-form-item label="地区名称" prop="localName">
                <el-input v-model="form.localName"></el-input>
            </el-form-item>
            <el-form-item label="图标上传 " prop="iconList ">
                <UploadImages v-model="iconList " action="file/upload "></UploadImages>
            </el-form-item>
            <el-form-item label="地区图片上传 " prop="localPicList ">
                <UploadImages v-model="localPicList " action="file/upload "></UploadImages>
            </el-form-item>
            <el-form-item>
                <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
                <el-button @click="close " v-if="!submiting ">取消</el-button>
            </el-form-item>
        </el-form>
    </LayoutForm>
</template>

<script>

import UploadImages from "@/components/UploadImages"

export default {
  components: {
    UploadImages
  },

  data () {
    return {
      form: {
        // : this.$route.params.institutionId,
        merchantId: this.$route.params.merchantId,
        localName: "",
        localNum: "",
        higherInstitution: this.$route.params.institutionId,
        icon: "",
        id: this.$route.params.subId,
        localPicUrl: ""
      },
      iconList: [],
      localPicList: [],
      localList: [],
      submiting: false,

      rules: {
        localName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ]
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

    async loadMerchantLocal (id) {
      this.submiting = true
      let rs = await this.$post("activity/get_merchant_local_one", {institutionId: id})
      if (rs.status == "200") {
        this.form.higherInstitution = rs.payload.higherInstitution
        this.form.localName = rs.payload.localName
        this.form.localNum = rs.payload.localNum
        this.iconList = [{url: rs.payload.icon}]
        this.localPicList = [{url: rs.payload.localPicUrl}]
      }
      this.submiting = false
    },

    async doSubmit () {
      this.submiting = true
      if (this.iconList != "") {
        if (this.iconList[0].url) {
          this.form.icon = this.iconList[0].url
        }
      }
      if (this.localPicList != "") {
        if (this.localPicList[0].url) {
          this.form.localPicUrl = this.localPicList[0].url
        }
      }
      let rs = await this.$post("activity/save_merchant_local", this.form)

      if (rs.status == "200") {
        console.info("rs===" + rs.message)
        this.$message({
          message: rs.message,
          type: "success"
        })
        this.$emit("success", this.form)
        this.$router.go(-1)
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    let id = this.$route.params.subId
    if (id) {
      this.loadMerchantLocal(id)
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
