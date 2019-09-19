<template>
  <el-upload :file-list="fileList" :disabled="loading" :headers="headers" :on-remove="handleRemove" :on-success="onSuccess" :before-upload="beforeUpload" :with-credentials="true" :show-file-list="false" :action="apiBasePath+action">
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
    },
    uploading: {
      type: Boolean,
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
      loading: false,
      beloading: this.uploading
    }
  },
  methods: {
    onSuccess (response, file, fileList) {
      console.log(response)
      this.$emit("success", response)
    },
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
    },
    childAction (val) {
      if (val) {
        this.loading = true
      } else {
        this.loading = false
      }
    }
  },
  mounted () {
    this.$on("loading", (val) => {
      this.childAction(val)
    })
  }
}
</script>
