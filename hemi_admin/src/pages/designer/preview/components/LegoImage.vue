<template>
  <img class="lego-image-img" :src="src||'//lianhai-static.oss-cn-hangzhou.aliyuncs.com/lib%2Fimgs%2Fdefault.jpg'" />
</template>

<script>
export default {
  props: ["setting", "slotData"],
  computed: {
    src () {
      return (this.setting.isSlot && this.slotData) ? (this.slotData[this.setting.slotKey]) : (this.setting.src)
    }
  }
}
</script>
