<template>
  <div>
    <slot :slot-data="custom" v-if="custom"></slot>
  </div>
</template>

<script>
import {Indicator, Toast} from 'mint-ui'

export default {
  props: {
    setting: {
      type: Object
    }
  },
  data () {
    return {
      slotData: {
      }
    }
  },
  computed: {
    custom () {
      let cust = this.$store.state.cust
      let tel = cust.tel + ''
      if (tel && tel.length == 11) {
        cust.telSafe = tel.substr(0, 3) + '****' + tel.substr(7, 4)
      }
      cust.headImgUrl = cust.headImgUrl || '//static.lianhaikeji.com/lib%2Fimgs%2Fdefault-head.png'
      return cust
    }
  },
  methods: {
    async loadCustom () {
      Indicator.open()
      let rs = await this.$get('api/get_mine_info')
      if (rs.status === 200) {
        rs.payload.headImgUrl = rs.payload.headImgUrl || '//static.lianhaikeji.com/lib%2Fimgs%2Fdefault-head.png'
        this.$store.commit('setCust', rs.payload)
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    }
  },
  created () {
    if (!this.custom) {
      this.loadCustom()
    }
  }
}
</script>

<style scoped>
</style>
