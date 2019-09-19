<template>
  <div class="buy">
    <cbbHeader title="话费充值"></cbbHeader>

    <div class="wrap">
      <div class="phone">
        <input type="text" v-model="phone" placeholder="请输入手机号">
      </div>
      <div class="chargeRange">移动、联通、电信通用</div>
    </div>
    <div class="title">话费充值</div>
    <div class="product" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
      <div class="product-item" v-for="(std, ind2) in product.standardList" :key="'std_'+std.id" @click="select(ind2, std.id)" :class="{'active': ind2 == index}">
        <div class="currentPrice">¥{{std.currentPrice}}元</div>
        <div>{{std.standardName}}</div>
      </div>
    </div>
    <div class="title">优惠码</div>
    <div class="organizeNo">
      <input v-model="couponNumber" placeholder="请输入优惠码">
    </div>
    <div class="btn" @click="createOrder">立即充值</div>
    <div class="detail">
      <div class="desc">活动说明</div>
      <div v-html="act.detail"></div>
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
      phone: this.$store.state.cust.tel,
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
      if (!this.phone) {
        Toast('请输入手机号')
        return
      }
      if (!this.standardId) {
        Toast('您还未选择面值')
        return
      }
      if (!this.couponNumber) {
        Toast('请输入优惠码')
        return
      }
      let phoneReg = /^1[3456789]\d{9}$/
      if (!phoneReg.test(this.phone)) {
        Toast('手机号输入有误')
        return
      }
      Indicator.open()
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.standardId,
        commodityNum: 1,
        account: this.phone,
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
  },
  created () {
    let productList = this.act.productList
    if (productList.length == 1 && productList[0].standardList.length == 1) {
      this.select(0, productList[0].standardList[0].id)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
  padding: 0 0.25rem;
}
.buy {
  padding-top: 0.5rem;
  background: #fff;
  .phone {
    margin: 0.6rem auto 0.18rem;
    font-size: 0.55rem;
    background: url(./imgs/write.png) no-repeat 100% center;
    background-size: auto 70%;
    input {
      width: 80%;
      border-bottom: 1px solid #ddd;
      color: #333;
    }
  }
  .chargeRange {
    color: rgb(153, 153, 153);
    font-size: 0.22rem;
    text-indent: 0.1rem;
    margin-bottom: 0.42rem;
  }
  .title {
    border-left: 0.1rem solid rgb(9, 179, 239);
    padding-left: 0.15rem;
    line-height: 0.4rem;
    font-size: 0.3rem;
    margin-bottom: 0.34rem;
    color: rgb(51, 51, 51);
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.46rem;
    .product-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 2.18rem;
      max-width: 2rem;
      white-space: nowrap;
      height: 1.34rem;
      border: 1px solid rgb(9, 179, 239);
      padding: 0.2rem 0;
      margin-left: 0.25rem;
      margin-bottom: 0.25rem;
      border-radius: 0.1rem;
      color: rgb(9, 179, 239);
      font-size: 0.28rem;
      .currentPrice {
        font-size: 0.44rem;
        margin-bottom: 0.18rem;
      }
    }
    .active {
      color: #fff;
      background: #09b6f2;
      border: 1px solid #09b6f2;
    }
  }

  .organizeNo {
    text-align: center;
    input {
      width: 7rem;
      height: 0.88rem;
      margin-top: 0.3rem;
      border: 1px solid rgb(9, 179, 239);
      border-radius: 0.1rem;
      color: #333;
      line-height: 0.88rem;
      padding: 0 0.2rem;
    }
  }
  .detail {
    font-size: 0.28rem;
    padding: 0 0.5rem 0.3rem;
    color: #666;
    background: #fff;
    .desc {
      text-align: center;
      font-size: 0.3rem;
      color: #333;
      padding-bottom: 0.1rem;
    }
  }
  .btn {
    width: 5.5rem;
    display: block;
    margin: 0.48rem auto 0.52rem;
    color: white;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.36rem;
    background: url(./imgs/btn-bg.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
