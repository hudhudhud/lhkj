<template>
  <div class="manjian">
    <div class="main">
      <div class="yule">
        <div class="yule-item" v-for="(std1,i) in act.productList[0].standardList" :key="std1+i"
          @click="createOrder(std1)">
          <img :src="std1.standardActUrl" alt="">
        </div>
      </div>
      <div class="rule">
        <div class="content" v-html="act.detail">
        </div>
      </div>
    </div>
    <div class="btnorder" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order`)"></div>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  data () {
    return {
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 557221494 : 563948543,
      act: ''
    };
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
      }
    },

    async createOrder (standard) {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.secondActId,
        standardId: standard.id,
        commodityNum: 1,
        account: this.tel ? this.tel : ''
      });
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`;
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
<style rel="stylesheet/scss" lang="scss" scoped>
.manjian {
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: #fe7910;
  padding-top: 0.001rem;
  position: relative;
  .btnorder {
    width: 1.9rem;
    height: 0.71rem;
    background: url("./imgs/btnorder.jpg") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 3.9rem;
    right: 0;
  }
  .main {
    width: 100%;
    background: url("./imgs/header.jpg") no-repeat;
    background-size: 100% auto;
    padding-top: 4.5rem;
  }
  .yule {
    width: 6.62rem;
    height: 9rem;
    background: url("./imgs/yule.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 1.5rem;
    margin: 0 auto;
    .yule-item {
      width: 5.67rem;
      height: 1.59rem;
      margin: 0.1rem auto;
      img {
        width: 100%;
      }
    }
  }
  .shengyan {
    width: 6.62rem;
    height: 7.08rem;
    background: url("./imgs/shengyan.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.5rem auto 0.3rem;
    padding-top: 1.5rem;
    .shengyan-item {
      width: 5.67rem;
      height: 1.59rem;
      margin: 0.1rem auto;
      img {
        width: 100%;
      }
    }
  }
  .rule {
    width: 7.39rem;
    height: 9.32rem;
    background: url("./imgs/rulebg.jpg") no-repeat;
    background-size: 100% 100%;
    margin: 0.3rem auto;
    padding-top: 0.001rem;
    .content {
      width: 6rem;
      height: 5rem;
      margin: 2.7rem auto;
      padding: 0 0.3rem;
      line-height: 0.45rem;
      overflow: scroll;
      color: #333333;
    }
  }
}
</style>
