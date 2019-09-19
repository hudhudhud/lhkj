<template>
  <div class="lottery">
    <div class="banner">
      <img :src="templateConfig.banner" alt="">
    </div>
    <div class="gif-wapper">
      <img src="./img/welcome.gif" alt="">
    </div>
    <div class="bg-wrap">

      <div class="box-bg">
        <HemiGrid :act="act" :template-config="templateConfig" @open-message="openMessage"></HemiGrid>
        <MessageModal v-model="payloadModal" :act="act"></MessageModal>
      </div>
      <div class="detail" v-if="act.detail">
        <div>幸运抽奖版块活动说明</div>
        <p v-html="act.detail"></p>
      </div>
    </div>
    <p style="height: 0.2rem;background: #eff0f1;margin-top:0.4rem;"></p>
    <LinkPlate :couponGroup="templateConfig.couponGroup"></LinkPlate>

  </div>
</template>

<script>

import HemiGrid from './HemiGridICBC'
import MessageModal from '@/components/lotteryModal/MessageModal'
import LinkPlate from './LinkPlate'
import jssdk from '@/lib/jssdk'
import {Indicator} from 'mint-ui'

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiGrid, MessageModal, LinkPlate
  },
  data () {
    return {
      merchantId: this.$store.state.merchantId,
      templateConfig: JSON.parse(this.act.templateConfig),
      payloadModal: {}
    }
  },
  mounted () {
    Indicator.open()
    this.$store.commit('setIsReady', false)
    jssdk.jssdk.init('', this.merchantId, '6', (val) => {
      this.$jssdk.call('disableShare')
      Indicator.close()
    })
  },
  methods: {
    openMessage (payload) {
      this.payloadModal = payload
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.lottery {
  background: #fff;
  .banner {
    height: 3rem;
    img {
      width: 100%;
    }
  }
  .gif-wapper {
    height: 2.34rem;
    font-size: 0;
    text-align: center;
    margin-top: 0.26rem;
    img {
      position: relative;
      right: 0.02rem;
      width: 100%;
      margin-top: -0.26rem;
    }
  }
  .bg-wrap {
    width: 7rem;
    margin: 0 auto;
    background: url(./img/lottery-bg.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 0.45rem;
    .detail {
      width: 6.44rem;
      margin: 0 auto;
      color: #fff;
      margin-top: 0.3rem;
      padding-bottom: 0.2rem;
      div {
        font-size: 0.28rem;
        text-align: center;
        padding-bottom: 0.1rem;
      }
      p {
        font-size: 0.24rem;
        line-height: 0.4rem;
      }
    }
  }
}
</style>
