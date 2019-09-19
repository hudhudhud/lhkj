<template>
  <el-upload :file-list="fileList" :disabled="loading" :headers="headers" :on-remove="handleRemove" :on-success="onSuccess" :before-upload="beforeUpload" :with-credentials="true" :show-file-list="true" :action="apiBasePath+action">
    <el-button size="small" type="primary" :loading="loading">点击上传</el-button>
  </el-upload>
</template>

<script>
import config from "@/config"

export default {
  props: {
    value: {
      type: Array,
      require: true
    },
    action: {
      type: String,
      require: true
    },
    max: {
      type: Number,
      require: false
    }
  },
  data () {
    let token = sessionStorage.getItem("token")
    return {
      maxFileNum: this.max || 10,
      fileList: this.value || [],
      apiBasePath: config.apiBasePath,
      headers: {
        Authorization: token
      },
      loading: false
    }
  },
  methods: {
    onSuccess (response, file, fileList) {
      this.loading = false
      this.$emit("success", response)
    },
    // onSuccess (response, file, fileList) {
    //   if (response.status == "200" && response.payload != null) {
    //     console.log("response:" + response)
    //     this.fileList.push({
    //       url: response.payload
    //     })
    //     this.$emit("input", this.fileList)
    //   } else {
    //     this.$message.error(response.msg)
    //   }
    //   // this.loading = false
    //   this.$emit("success", response)
    // },
    handleRemove (file, fileList) {
      this.fileList = this.fileList.filter(item => {
        return item.url != file.url
      })
      this.$emit("input", this.fileList)
    },

    beforeUpload (file) {
      this.loading = true
      if (this.fileList.length >= this.maxFileNum) {
        this.$message.error(`最多只能上传${this.maxFileNum}个文件`)
        return false
      }
      return true
    }
  }
}
</script>
