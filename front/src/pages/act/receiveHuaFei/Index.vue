<template>
  <div class="buy">
    <cbbHeader title="约惠烟商 乐享好礼"></cbbHeader>
    <div class="banner">
      <img src="./img/banner.png" alt="">
    </div>
    <!-- <div class="phone">{{cust.tel}}</div> -->
    <div class="wrapper" style="margin: 0 0.3rem;">

      <img src="./img/brand.png" alt="" class="brand">
      <!-- <div style="line-height: 1.4rem;font-size: 0.32rem;">话费充值</div> -->
      <div class="product" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
        <div class="product-item" v-for="std in product.standardList" :key="'std_'+std.id">
          {{std.standardName}}{{std.currentPrice}}元
        </div>

      </div>
      <!--  <div class="organizeNo">
        <input v-model="couponNumber" placeholder="优惠码（选填）">
      </div> -->
      <div class="btn" @click="createOrder">立即领取</div>
      <div class="detail" v-html="act.detail">

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
      Indicator.open()
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.act.productList[0].standardList[0].id,
        commodityNum: 1
      })
      if (rs.status === 200) {
        let successUrl = `${window.location.protocol}//${window.location.host}/${
          this.$store.state.merchantAppid
        }/merchant/paysuccess/${rs.payload.orderCode}`
        Toast('订单已生成...正在跳转支付')
        let payPath = `${payUrl}${rs.payload.prepayId}?redirectUrl=${encodeURIComponent(successUrl
        )}`
        window.location.replace(payPath)
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
  .banner img {
    width: 100%;
    display: block;
  }
  .brand {
    display: block;
    margin: 0 auto;
  }
  .phone {
    padding-left: 0.3rem;
    height: 70px;
    border-bottom: 1px solid #eee;
    line-height: 70px;
    font-size: 0.36rem;
  }
  .product {
    .product-item {
      line-height: 0.7rem;
      color: #999;
      text-align: center;
    }
    .active {
      background: #fff;
      color: #09b6f2;
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
  .btn {
    width: 80%;
    display: block;
    margin: 20px auto;
    margin-top: 0.3rem;
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
