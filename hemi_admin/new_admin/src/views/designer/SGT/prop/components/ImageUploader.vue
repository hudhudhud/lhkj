<template>
  <el-upload :file-list="fileList" :disabled="loading" :headers="headers" :on-remove="handleRemove" :on-success="onSuccess"
    :before-upload="beforeUpload" :with-credentials="true" :show-file-list="false" :action="apiBasePath+action">
    <el-button size="small" type="primary" :loading="loading">更换图片</el-button>
  </el-upload>
</template>

<script>
import config from "@/config"

export default {
  props: {
    value: {
      type: Array,
      require: true
    }
  },
  data() {
    let token = sessionStorage.getItem("token")
    return {
      action: "file/upload",
      max: 1,
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
    onSuccess(response, file, fileList) {
      this.loading = false
      this.$emit("success", response)
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => {
        return item.url != file.url
      })
      this.$emit("input", this.fileList)
    },
    beforeUpload(file) {
      if (this.fileList.length >= this.maxFileNum) {
        this.$message.error(`最多只能上传${this.maxFileNum}个文件`)
        return false
      }
      return true
    }
  }
}
</script>
