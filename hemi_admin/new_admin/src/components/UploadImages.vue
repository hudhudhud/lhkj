<template>
  <el-upload :action="apiBasePath+action" :headers="headers" :with-credentials="true" :on-success="onSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :file-list="fileList" list-type="picture-card">
    <i class="el-icon-plus"></i>
    <div slot="tip" style="font-size:14px;color:#999;line-height:30px;">只能上传jpg/png文件，且不超过10M</div>
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
      apiBasePath: config.apiBasePath,
      fileList: this.value || [],
      headers: {
        Authorization: token
      }
    }
  },
  watch: {
    value (val) {
      this.fileList = val
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.fileList = this.fileList.filter(item => {
        return item.url != file.url
      })
      this.$emit("input", this.fileList)
    },
    handlePreview (file) {
      window.open(file.url)
    },
    beforeAvatarUpload (file) {
      if (this.fileList.length >= this.maxFileNum) {
        this.$message.error(`最多只能上传${this.maxFileNum}张图片`)
        return false
      }

      const isJPG = file.type === "image/jpeg" || file.type === "image/png"
      const isLt1M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!")
        return false
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!")
        return false
      }
      return true
    },
    onSuccess (response, file, fileList) {
      if (response.status == "200") {
        this.fileList.push({
          url: response.payload
        })
        this.$emit("input", this.fileList)
      } else {
        this.$message.error(response.msg)
      }
    }
  }
}
</script>
