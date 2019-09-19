<template>
  <img class="lego-image-img" :src="src" />
</template>

<script>
export default {
  props: ['setting', 'slotData'],
  computed: {
    src () {
      return (this.setting.isSlot && this.slotData) ? (this.slotData[this.setting.slotKey]) : (this.setting.src)
    }
  }
}
</script>

<style scoped>
.lego-image-img {
  display: inline-block;
}
</style>
