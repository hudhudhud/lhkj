<template>
  <div>
    <div class="bgeditor-type">
      <el-radio-group v-model="type" size="mini">
        <el-radio-button label="color">纯色</el-radio-button>
        <el-radio-button label="image">图片</el-radio-button>
        <el-radio-button label="else">其他</el-radio-button>
      </el-radio-group>
    </div>
    <div class="bgeditor-type">
      <el-color-picker v-model="val" v-if="type=='color'"></el-color-picker>
      <ImageUploader v-if="type=='image'" @success="uploadSuccess"></ImageUploader>
      <el-input v-model="val" v-if="type=='else'"></el-input>
    </div>
    <div class="bgeditor-type" v-if="type=='image'">
      <el-input v-model="url"></el-input>
    </div>
  </div>
</template>

<script>
import ImageUploader from "./ImageUploader"

export default {
  props: ["value", "propDef"],
  components: {ImageUploader},
  data () {
    return {
      val: this.value,
      type: "color",
      url: null
    }
  },
  watch: {
    value (val) {
      this.parseValue()
    },
    type () {
      this.generalValue()
    },
    url () {
      this.generalValue()
    },
    val () {
      this.generalValue()
    }
  },
  methods: {
    parseValue () {
      if (this.value) {
        if (this.value.indexOf("url") >= 0) {
          this.type = "image"
          this.url = this.value.replace("url(", "").replace(")", "")
        } else if (this.value.indexOf("#") == 0) {
          this.type = "color"
          this.val = this.value
        } else {
          this.type = "else"
          this.val = this.value
        }
      } else {
        this.type = "color"
        this.val = null
      }
    },
    generalValue () {
      if (this.type) {
        if (this.type == "image" && this.url) {
          this.$emit("input", `url(${this.url})`)
        } else {
          this.$emit("input", this.val)
        }
      }
    },
    uploadSuccess (res) {
      if (res.status == 200 && res.payload) {
        this.url = res.payload
      } else {
        this.$message.error("上传失败:" + res)
      }
    }
  },
  created () {
    this.parseValue()
  }
}
</script>

<style scoped>
.bgeditor-type {
  margin-bottom: 5px;
}
</style>
