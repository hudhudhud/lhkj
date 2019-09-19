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
      slotData: null
    }
  },
  watch: {
    "setting.standardId": function (val) {
      if (val) {
        this.loadProduct(val)
      } else {
        this.slotData = null
      }
    }
  },
  methods: {
    async loadProduct (standardId) {
      let rs = await this.$get("lego/getStandard/" + standardId)
      if (rs.status == 200) {
        this.slotData = rs.payload
      } else {
        this.slotData = null
      }
    }
  },
  created () {
    if (this.setting.standardId) {
      this.loadProduct(this.setting.standardId)
    }
  }
}
</script>

<style scoped>
</style>
