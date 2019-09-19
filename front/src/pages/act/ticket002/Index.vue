<template>
  <div>
    <div class="wrap">
      <img class="banner" src="./imgs/ticket-bg.png" alt="">
      <img class="brand" src="./imgs/brand.png" alt="">
      <div class="ticket-container">
        <div class="ticket-wrapper">
          <div class="btn" @click="createOrder"></div>
        </div>
        <div class="rules">
          <div class="title"></div>
          <p v-html="act.detail"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import jssdk from '@/lib/jssdk'

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      merchantId: this.$store.state.merchantId,
      loading: false,
      standardList: this.act.productList[0].standardList
    }
  },
  methods: {
    async createOrder () {
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.standardList[0].id,
        commodityNum: 1 })
      if (rs.status === 200) {
        this.$router.push(`/${this.$store.state.merchantAppid}/merchant/index/order`)
      } else {
        Toast(rs.error)
      }
    }
  },
  mounted () {
    Indicator.open()
    this.$store.commit('setIsReady', false)
    jssdk.jssdk.init('', this.merchantId, '6', (val) => {
      this.$jssdk.call('disableShare')
      Indicator.close()
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
  background: #fff;
  .banner {
    width: 100%;
  }
  .brand {
    position: absolute;
    top: 1rem;
    width: 80%;
    left: 50%;
    transform: translate(-50%);
  }
  .ticket-container {
    position: absolute;
    top: 5.35rem;
    width: 100%;
    .btn {
      position: relative;
      top: 4.2rem;
      width: 2.55rem;
      height: 0.73rem;
      margin: 0 auto;
      background: url(./imgs/receive-btn.png) no-repeat;
      background-size: 100% 100%;
    }
    .ticket-wrapper {
      height: 5.47rem;
      width: 6.76rem;
      margin: 0 auto;
      background: url(./imgs/modal-bg.png) no-repeat;
      background-size: 100% 100%;
    }
    .rules {
      .title {
        width: 3.07rem;
        height: 0.93rem;
        margin: 0.4rem auto 0.2rem;
        background: url(./imgs/rule.png) no-repeat;
        background-size: 100% 100%;
      }
      p {
        padding: 0.2rem;
        background: url(./imgs/gray-bg.png);
        background-repeat: repeat-y;
        margin: 0 0.2rem;
        line-height: 0.4rem;
      }
    }
  }
}
</style>
