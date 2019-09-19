<template>
  <div>
    <div class="bgeditor-type">
      <div class="preview">
        <img :src="val||'//static.lianhaikeji.com/lib/imgs/default.jpg'" alt="" height="100%">
        <input v-if="val" v-model="val" />
      </div>

      <ImageUploader @success="uploadSuccess"></ImageUploader>
    </div>

  </div>
</template>

<script>
import ImageUploader from "./ImageUploader"

export default {
  props: ["value", "propDef"],
  components: { ImageUploader },
  data() {
    return {
      val: this.value
    }
  },
  watch: {
    value(val) {
      this.val = val
    },
    val(val) {
      this.$emit("input", val)
    }
  },
  methods: {
    uploadSuccess(res) {
      if (res.status == 200 && res.payload) {
        this.val = res.payload
      } else {
        this.$message.error("上传失败:" + res)
      }
    }
  }
}
</script>

<style scoped>
.bgeditor-type {
  margin-bottom: 5px;
}
.preview {
  position: relative;
  width: 220px;
  height: 169px;
  line-height: 130px;
  margin: 10px auto;
  padding: 0px 20px;
  border: 2px dashed #fff;
  text-align: center;
}
.preview img {
  display: inline-block;
  margin: 0 auto;
  max-width: 95%;
  vertical-align: middle;
  height: 36%;
}
.preview input {
  position: absolute;
  bottom: 5px;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
}
</style>
