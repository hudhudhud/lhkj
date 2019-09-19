<template>
  <el-upload :file-list="fileList" :disabled="loading" accept='file' :headers="headers" :on-success="onSuccess" :on-remove="handleRemove" :before-upload="beforeUpload" :with-credentials="true" :show-file-list="true" :action="apiBasePath+action">
    <el-button size="small" :loading="loading">点击上传</el-button>
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
      list: [],
      fileList: this.value || [],
      apiBasePath: config.apiBasePath,
      headers: {
        Authorization: token
      },
      loading: false
    }
  },
  methods: {
    mounted () {
    },
    // onSuccess (response, file, fileList) {
    //   this.loading = false
    //   this.$emit("success", response)
    // },
    handleRemove (file, fileList) {
      this.fileList = this.fileList.filter(item => {
        return item.url != file.url
      })
      this.$emit("input", this.fileList)
    },
    onSuccess (response, file, fileList) {
      this.fileList = this.list
      // this.$emit("input", this.indexList)
    },
    beforeUpload (file) {
      // 创建一个reader
      let reader = new FileReader()
      // 将图片2将转成 base64 格式
      reader.readAsDataURL(file)
      // 读取成功后的回调
      let bean = []
      reader.onloadend = function () {
        var ipos = reader.result.indexOf(",")
        bean.push({
          url: (reader.result.substring(ipos, reader.result.length)).substr(1)
        })
      }
      this.$emit("input", bean)
      if (this.fileList.length >= this.maxFileNum) {
        this.$message.error(`最多只能上传${this.maxFileNum}个文件`)
        return false
      }
      return true
    }
  }
}
</script>
