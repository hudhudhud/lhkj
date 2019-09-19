<template>
  <div class="buy" v-if="cust">
    <cbbHeader title="话费充值"></cbbHeader>
    <div class="phone">
      {{cust.tel}}
    </div>
    <div class="wrapper" style="margin: 0 0.3rem;">
      <div style="line-height: 1.4rem;font-size: 0.32rem;">话费充值</div>
      <div class="product" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
        <div class="product-item" v-for="(std, ind2) in product.standardList" :key="'std_'+std.id" @click="select(ind2, std.id)" :class="{'active': ind2 == index}">
          <div>{{std.standardName}}</div>
          <div>售价:{{std.currentPrice}}</div>
        </div>

      </div>
      <div class="organizeNo">
        <input v-model="couponNumber" placeholder="优惠码（必填）">
      </div>
      <div class="btn" @click="createOrder">立即充值</div>
      <div class="detail">
        <div class="desc">活动说明</div>
        <div v-html="act.detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import { payUrl } from '@/config/'

import cbbHeader from '@/components/cbbHeader'

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      index: -1,
      payUrl: payUrl,
      cust: this.$store.state.cust,
      couponNumber: '',
      standardId: ''
    }
  },
  components: {
    cbbHeader
  },
  methods: {
    select (i, id) {
      this.index = i
      if (id) {
        this.standardId = id
      }
    },
    async createOrder () {
      if (!this.standardId || !this.couponNumber) {
        return
      }
      Indicator.open()
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.standardId,
        commodityNum: 1,
        account: this.cust.tel,
        couponNumber: this.couponNumber
      })
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          let successUrl = `${window.location.protocol}//${window.location.host}/${
            this.$store.state.merchantAppid
          }/merchant/paysuccess/${rs.payload.orderCode}`
          Toast('订单已生成...正在跳转支付')
          let payPath = `${payUrl}${rs.payload.prepayId}?redirectUrl=${encodeURIComponent(successUrl
          )}`
          window.location.replace(payPath)
        } else {
          Toast('下单成功')
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${
              this.$store.state.merchantAppid
            }/merchant/index/order`
          )
        }
      } else {
        Toast('订单生成失败:' + rs.error)
      }
      Indicator.close()
    }
  },
  mounted () {
    console.log(this.act)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.buy {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  .phone {
    width: 90%;
    margin: 0.4rem auto 0;
    line-height: 0.6rem;
    font-size: 0.4rem;
    background: url(./imgs/tel-user.png) no-repeat 100% center;
    background-size: contain;
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    .product-item {
      flex: 1;
      min-width: 2rem;
      max-width: 2rem;
      white-space: nowrap;
      line-height: 0.4rem;
      border: 1px solid #ccc;
      padding: 0.2rem 0;
      margin: 0.1rem;
      border-radius: 0.1rem;
      text-align: center;
      color: #ccc;
    }
    .active {
      color: #ffa24b;
      border: 1px solid #ffa24b;
    }
  }

  .organizeNo input {
    margin-top: 0.3rem;
    border: none;
    border-bottom: 1px solid #999;
    color: #888;
    line-height: 30px;
    width: 96%;
    padding: 0 2%;
  }
  .detail {
    .desc {
      font-size: 0.3rem;
      font-weight: bold;
      padding-bottom: 0.1rem;
    }
  }
  .btn {
    width: 80%;
    display: block;
    margin: 20px auto;
    margin-top: 40px;
    border-radius: 8px;
    color: white;
    text-align: center;
    height: 35px;
    line-height: 35px;
    background-color: #ffa24b;
    font-size: 18px;
  }
}
</style>
