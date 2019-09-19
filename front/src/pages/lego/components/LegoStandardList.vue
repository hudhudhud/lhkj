<template>
  <div v-if="slotData&&slotData.standardList">
    <template v-for="std in slotData.standardList">
      <slot :slot-data="std" :slot-key="slotData.id+'_stditem_'+std.id"></slot>
    </template>
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
    'setting.proId': function (val) {
      if (val) {
        this.loadProduct(val)
      } else {
        this.slotData = null
      }
    }
  },
  methods: {
    async loadProduct (proId) {
      let rs = await this.$get('api/lego/getProDetails/' + proId)
      if (rs.status == 200) {
        this.slotData = rs.payload
      } else {
        this.slotData = null
      }
    }
  },
  created () {
    if (this.setting.proId) {
      this.loadProduct(this.setting.proId)
    }
  }
}
</script>

<style scoped>
</style>
