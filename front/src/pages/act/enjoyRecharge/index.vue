<template>
  <div class="recharge bg100" :style="{'background-image': 'url('+ backImage+')'}">
    <div class="recharge-atom bg100" :style="{'background-image': 'url('+ backAtom +')'}"></div>
    <div class="recharge-title bg100" :style="{'background-image':'url('+ title+')'}"></div>
    <div class="recharge-box">
      <div class="recharge-coupon" v-for="(item,index) in proList" :key="index" @click="createOrder(item.standardList[0])">
        <img :src="item.iconUrl" alt="">
      </div>
    </div>
    <div class="recharge-rule">
      <p class="recharge-rule-title">活动规则</p>
      <div class="recharge-rule-content" v-html="ruleDetail"></div>
    </div>
  </div>
</template>

<script>
import {Indicator} from 'mint-ui';
import {payUrl} from '@/config/'
export default {
  name: 'enjoyRecharge',
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      title: '',
      backImage: '',
      backAtom: '',
      proList: [],
      ruleDetail: '',
      payUrl: payUrl
    }
  },
  created () {
  },
  mounted () {
    let temlateConfig = null;
    let protocol = window.location.protocol;
    if (this.act.templateConfig) {
      temlateConfig = JSON.parse(this.act.templateConfig);
      // 背景图片
      this.backImage = `${protocol}${temlateConfig.backImage}`;
      // 标题图片
      this.title = `${protocol}${temlateConfig.title}`;
      // 背景上元素图
      this.backAtom = `${protocol}${temlateConfig.backAtom}`;
    }
    this.proList = this.act.productList;
    this.ruleDetail = this.act.detail;
  },
  methods: {
    async createOrder (standard) {
      Indicator.open();
      let rs = await this.$post('api/createOrder', {
        actId: this.act.actId,
        standardId: standard.id,
        commodityNum: 1
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/act/${this.act.actId}`;
        this.$toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        this.$toast(rs.error);
      }
      Indicator.close();
    }
  }
}
</script>

<style scoped lang="scss">
  .recharge {
    position: relative;
    width: 100%;
    height: 14.34rem;
    padding-bottom: 0.6rem;
    &-atom{
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 13.34rem;
    }
    &-title{
      position: absolute;
      z-index: 2;
      top: 0.88rem;
      left: 50%;
      transform: translateX(-50%);
      width: 6.66rem;
      height: 2.85rem;
    }
    &-box{
      position: absolute;
      z-index: 2;
      top: 4rem;
      left: 50%;
      transform: translateX(-50%);
      width: 6.57rem;
      height: 2.77rem;
    }
    &-coupon{
      margin-bottom: 0.25rem;
      img{
        width: 100%;
      }
    }
    &-rule{
      position: absolute;
      z-index: 2;
      top: 10.25rem;
      left: 50%;
      width: 6.9rem;
      transform: translateX(-50%);
      background: #e9f1ff;
      border-radius: 0.12rem;
      padding: 0.37rem 0.24rem;
      &-title{
        font-size: 0.36rem;
        color: #333;
        text-align: center;
      }
      &-content{
        margin-top: 0.2rem;
        /*max-height: 1.5rem;*/
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
  .bg100{
    background-size: 100% 100%;
  }
</style>
