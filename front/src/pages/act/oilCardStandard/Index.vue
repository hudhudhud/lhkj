<template>
  <div>
    <cbbHeader title="油卡充值"></cbbHeader>
    <div class="buy">
      <div class="phone">
        <div class="label">充值卡号</div>
        <input type="text" v-model="account" placeholder="请输入充值卡号">
      </div>
      <div class="wrapper" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
        <div class="label">{{product.proName}}面额</div>
        <div class="product">
          <div class="product-item" v-for="(std, ind2) in product.standardList" :key="'std_'+std.id" @click="select(ind2, std, std.integralNum, product.id)" :class="{'active': ind2 == index && productId == product.id}">
            <div class="tip"></div>
            <div class="originalPrice">{{std.originalPrice}}元</div>
            <div>{{std.currentPrice}}元</div>
            <!-- <div>{{std.integralNum}}</div> -->
          </div>
        </div>
      </div>
      <div class="wrapper">
        <!-- <div class="label icon" v-show="integralNum && integralNum >= 0">实际支付积分：{{integralNum}}</div> -->
        <div class="btn" @click="createOrder">立即充值</div>
        <div class="detail">
          <div class="desc">活动说明</div>
          <div v-html="act.detail"></div>
        </div>
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
      account: '',
      intintegralNum: '',
      couponNumber: '',
      accountPattern: '',
      standard: {},
      productId: ''
    }
  },
  components: {
    cbbHeader
  },
  methods: {
    select (i, std, integralNum, productId) {
      this.index = i
      if (std) {
        Object.assign(this.standard, std)
        this.accountPattern = std.accountPattern
        this.productId = productId
        this.integralNum = integralNum
      }
    },
    async createOrder () {
      if (!this.standard.id) {
        Toast('请选择充值面值')
        return
      }
      if (!this.account) {
        Toast('请输入充值卡号')
        return
      }
      if (!new RegExp(this.accountPattern).test(this.account)) {
        Toast(this.standard.accountName + '输入有误')
        return
      }
      Indicator.open()
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.standard.id,
        commodityNum: 1,
        account: this.account,
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.buy {
  position: absolute;
  width: 100%;
  top: 0.8rem;
  bottom: 55px;
  background: #fff;
  overflow-y: scroll;
  .phone {
    width: 90%;
    margin: 0.2rem auto 0;
    line-height: 0.6rem;
    input {
      margin: 0.3rem auto;
      padding: 0 0.2rem;
      width: 100%;
      font-size: 0.3rem;
      border-bottom: 1px solid #999;
      color: #888;
      line-height: 0.8rem;
      width: 96%;
      padding: 0 2%;
    }
  }
  .wrapper {
    margin: 0 0.3rem;
    .label {
      margin: 0.6rem 0 0.3rem;
      &.icon {
        line-height: 0.4rem;
        padding-left: 0.5rem;
        background: url(./imgs/jifen.png) no-repeat left center;
        background-size: contain;
      }
    }
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    .product-item {
      flex: 1;
      position: relative;
      min-width: 2rem;
      max-width: 2rem;
      white-space: nowrap;
      line-height: 0.4rem;
      border: 1px solid #999;
      padding: 0.2rem 0;
      margin: 0.1rem;
      border-radius: 0.1rem;
      text-align: center;
      color: #666;
      .originalPrice {
        text-decoration: line-through;
        font-size: 0.22rem;
        line-height: 0.3rem;
      }
      .tip {
        position: absolute;
        top: -0.04rem;
        right: -0.02rem;
        width: 0.57rem;
        height: 0.26rem;
        background: url(./imgs/9.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .active {
      color: #fff;
      background: #09b6f2;
      border: 1px solid #09b6f2;
    }
  }
  .detail {
    margin-top: 0.5rem;
    padding-bottom: 0.3rem;
    .desc {
      font-size: 0.3rem;
      font-weight: bold;
      padding-bottom: 0.1rem;
    }
  }
  .btn {
    width: 80%;
    display: block;
    margin: 0.3rem auto;
    border-radius: 8px;
    color: white;
    text-align: center;
    height: 35px;
    line-height: 35px;
    background-color: #09b6f2;
    font-size: 18px;
  }
}
</style>
