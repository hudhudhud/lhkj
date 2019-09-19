<template>
  <div class="onyuanpay">
    <back></back>
    <div class="oypay-header">
      <img
        src="./imgs/header.png"
        alt=""
      >
    </div>
    <div class="oypay-body">
      <img
        src="./imgs/quan.png"
        alt=""
      >
    </div>
    <div
      class="btnbuy"
      @click="handelePay"
    >
      <img
        src="./imgs/btnbuy.png"
        alt=""
      >
    </div>
    <div class="rule">
      <img
        src="./imgs/rule.png"
        alt=""
      >
      <div
        class="content"
        v-html="secondActList.detail"
      >
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  data () {
    return {
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 553161597 : 553081404,
      secondActList: null
    };
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.secondActList = rs.payload;
      }
    },
    async handelePay () {
      var std = this.secondActList
        ? this.secondActList.productList[0].standardList[0]
        : null;
      this.createOrder(std);
    },
    async createOrder (standard) {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.secondActId,
        standardId: standard.id,
        commodityNum: 1
      });
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          let successUrl = `${window.location.protocol}//${
            window.location.host
          }/${this.$store.state.merchantAppid}/merchant/paysuccess/${
            rs.payload.orderCode
          }`;
          Toast('订单已生成...正在跳转支付');
          let payPath = `${payUrl}${
            rs.payload.prepayId
          }?redirectUrl=${encodeURIComponent(successUrl)}`;
          window.location.replace(payPath);
        } else {
          Toast('支付成功');
        }
      } else {
        Toast('支付失败:' + rs.error);
      }
      Indicator.close();
    }
  },
  created () {
    this.loadAct(this.secondActId);
  }
};
</script>
<style lang="scss" scoped>
.onyuanpay {
  width: 100%;
  min-height: 100vh;
  background: rgb(247, 187, 14);
  padding-bottom: 0.5rem;
  .oypay-header {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .oypay-body {
    width: 6.78rem;
    height: 4.1rem;
    margin: -0.7rem auto 0;
    img {
      width: 100%;
    }
  }
  .btnbuy {
    width: 2.95rem;
    height: 0.8rem;
    margin: 0.32rem auto 0.7rem;
    img {
      width: 100%;
    }
  }
  .rule {
    width: 6.71rem;
    height: 4.42rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    margin: 0.1rem auto 0;

    img {
      width: 6.71rem;
      height: 0.99rem;
      display: inline-block;
      margin: -0.5rem auto 0;
    }
    .content {
      padding: 0rem 0.3rem 0.2rem;
      overflow-y: scroll;
      height: 3.5rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.28rem;
      line-height: 0.54rem;
      color: #444444;
    }
  }
}
</style>
