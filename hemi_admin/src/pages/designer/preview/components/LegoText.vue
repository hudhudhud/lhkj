<template>
  <span class="text">
    <template v-if="setting.isSlot && slotData">
      {{slotData[setting.slotKey]}}
    </template>
    <template v-else>
      {{setting.text}}
    </template>
  </span>
</template>

<script>
export default {
  props: ["setting", "slotData"],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
</style>
