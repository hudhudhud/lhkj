<template>
  <div>
    <slot :slot-data="slotData"></slot>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object
    }
  },
  data () {
    return {
      slotData: {
        customId: "123",
        nickname: "LegoDesign",
        merchantId: "merchantId12345",
        tel: "1999999999",
        telSafe: "19****9999",
        headImgUrl: "//static.lianhaikeji.com/lib%2Fimgs%2Fdefault-head.png",
        registryTime: "2018-08-10 00:00:00"
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
