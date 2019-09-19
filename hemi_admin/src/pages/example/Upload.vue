<template>
  <LayoutForm>
    <div class="block">
      <UploadButton action="example/upload"></UploadButton>
    </div>
    <div class="block">
      <UploadImages v-model="list" action="file/uploadToOss" :max="2"></UploadImages>
      {{list}}
      <el-button @click="reset">重置</el-button>
    </div>
  </LayoutForm>
</template>

<script>
import UploadButton from "@/components/UploadButton"
import UploadImages from "@/components/UploadImages"

export default {
  components: {
    UploadButton,
    UploadImages
  },
  data () {
    return {
      list: [
        {
          url:
            "//cocostatic.lianhaikeji.com/20180518/dbe7af88-cb84-427d-b5d1-14c687dca735"
        }
      ]
    }
  },
  methods: {
    reset () {
      this.list = [
        {
          url:
            "//cocostatic.lianhaikeji.com/20180518/dbe7af88-cb84-427d-b5d1-14c687dca735"
        }
      ]
    }
  }
}
</script>

<style scoped>
.block {
  padding: 30px;
}
</style>
