<template>
  <div class="success">
    <div class="info">订单号:{{orderCode}}</div>
    <div class="loading" v-if="loading">正在确认订单...</div>
    <div class="msg" v-if="msg">{{msg}}</div>
    <div class="paid" v-if="order.payState=='2'">支付成功</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderCode: this.$route.params.orderCode,
      loading: false,
      order: null,
      msg: '',
      times: 0
    }
  },
  methods: {
    async checkOrderStatus () {
      this.times++
      this.loading = true
      let rs = await this.$get('api/order/' + this.orderCode)
      if (rs.status == 200) {
        this.order = rs.payload
        if (this.order.payState == '0' && this.times < 10) {
          setTimeout(this.checkOrderStatus, 5000)
        } else {
          setTimeout(() => {
            this.$router.replace(`/${this.$store.state.merchantAppid}/merchant/index/order`)
          }, 1000)
        }
      } else {
        this.msg = rs.error
      }
      this.loading = false
    }
  },
  created () {
    this.$router.replace(`/${this.$store.state.merchantAppid}/merchant/index/order`)
  }
}
</script>

<style scoped>
.success {
  position: relative;
}
.info {
  line-height: 100px;
  text-align: center;
  font-size: 0.4rem;
}
.loading {
  font-size: 0.2rem;
  line-height: 1rem;
  text-align: center;
}
.msg {
  font-size: 0.2rem;
  line-height: 1rem;
  text-align: center;
}
.paid {
  font-size: 0.4rem;
  line-height: 1rem;
  text-align: center;
}
</style>
