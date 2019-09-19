<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import jssdk from '@/lib/jssdk'
export default {
  props: ['setting'],
  created () {
    if (this.setting.disabledShare) {
      Indicator.open()
      this.$store.commit('setIsReady', false)
      jssdk.jssdk.init('', this.$store.state.merchantId, '6', (val) => {
        this.$jssdk.call('disableShare')
        Indicator.close()
      })
    }
  },
  watch: {
    '$store.state.isReady': function (val) {
      if (val) {
        this.$jssdk.call('disableShare')
      }
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;
}
</style>
