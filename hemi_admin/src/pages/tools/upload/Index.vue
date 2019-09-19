<template>
    <div>
        图片上传
        <UploadImages v-model="list" action="file/upload"></UploadImages>
        <div>
            {{list}}
        </div>
    </div>
</template>

<script>
import UploadImages from "@/components/UploadImages"

export default {
  components: {
    UploadImages
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
