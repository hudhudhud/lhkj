<template>
  <div>
    <cbbHeader title="约惠八桂"></cbbHeader>
    <div class="container">
      <img
        src="./imgs/rulesbanner.jpg"
        alt
      >
      <img
        src="./imgs/footer1.png"
        alt
        class="imgs1"
      >
      <div class="showrules">
        <div class="rulesli">
          <div class="containerbox">
            <img
              src="./imgs/activerules.png"
              alt
            >
            <p class="title">活动时间：</p>
            <p class="title_list">2019年5月28日至6月7日</p>
            <p class="title">活动对象：</p>
            <p class="title_list">广西建行手机银行客户</p>
            <p class="title">活动流程：</p>
            <p class="title_list">1、点击" 开始测试 "开始端午答题活动,测试结束后点击" 抢购端午好礼 ",即可进行优惠券购买。</p>
            <p class="title_list">2、点击"购买粽子",可直接进行优惠券购买。</p>
            <p class="title_list">3、活动期间,每天前30个客户可以30元的价格购买到价值68元的粽子礼盒劵,30个名额使用之后，
              客户则可以60元的优惠价格购买蒂丽雪斯68元端午粽子劵,或以78元购买88元端午粽子劵"。</p>
            <p class="title_list">4、每位客户可以多次优惠购买粽子劵,最多只有一次30元的购买机会,之后每次购买需支付60 / 78元。</p>
            <p class="title_list">5、卡劵兑换码以及兑换店铺地址在"我的订单"中查看即可,客户端前往蒂丽雪斯店面兑换粽子礼盒。</p>
            <p class="title_list">6、本次活动的蒂丽雪斯粽子兑换有效期为2019年6月8日,请购买到粽子劵的客户在有效期前至线下店铺兑换。</p>
            <!-- <p class="title_list">1、点击" 开始测试 "开始端午答题活动,测试结束后点</p>
            <p class="title_list">击" 抢购端午好礼 ",即可进行优惠券购买。</p>
            <p class="title_list">2、点击"购买粽子",可直接进行优惠券购买。</p>
            <p class="title_list">3、活动期间,每天前30个客户可以30元的价格购买</p>
            <p class="title_list">到价值68元的粽子礼盒劵,30个名额使用之后，客户</p>
            <p class="title_list">则可以60元的优惠价格购买蒂丽雪斯68元端午粽子劵,</p>
            <p class="title_list">或以78元购买88元端午粽子劵"。</p>
            <p class="title_list">4、每位客户可以多次优惠购买粽子劵,最多只有一次</p>
            <p class="title_list">30元的购买机会,之后每次购买需支付60 / 78元。</p>
            <p class="title_list">5、卡劵兑换码以及兑换店铺地址在"我的订单"中查看即</p>
            <p class="title_list">可,客户需前往蒂丽雪斯店面兑换粽子礼盒。</p>
            <p class="title_list">6、本次活动的蒂丽雪斯粽子兑换劵有效期为2019年6</p>
            <p class="title_list">月8日,请购买到粽子劵的客户在有效期前至线下店铺</p>
            <p class="title_list">兑换。</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shanRong from './shanRong.json';
import cbbHeader from '@/components/cbbHeader';
export default {
  data () {
    return {
      currentTab: 'all',
      shanRong: shanRong,
      list: shanRong['all']
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    rulelist () {}
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.container {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  top: 0.8rem;
  bottom: 55px;
  font-size: 0;
  // padding-top: 0.3rem;
  .imgs1 {
    position: absolute;
    left: 0;
    bottom: -1rem;
    z-index: 3;
    vertical-align: bottom;
  }
  img {
    width: 100%;
  }
  .rule {
    position: absolute;
    top: 0.44rem;
    right: 0;
    width: 1.88rem;
    height: 0.7rem;
    z-index: 97;
    img {
      width: 100%;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    // background: url(./imgs/footer1.png) repeat-y;
    img {
      width: 100%;
    }
  }
  .showrules {
    position: absolute;
    top: 0.2rem;
    left: 0;
    width: 100%;
    // height: 97.5%;
    padding: 0.5rem 0.3rem 0.5rem 0.3rem;
    z-index: 90;
    // overflow-y: auto;
    .rulesli {
      width: 100%;
      background: #ffffff;
      // height: 100%;
      padding: 0.3rem;
      overflow-y: auto;
      .containerbox {
        width: 100%;
        background: #ffffff;
        // height: 100%;
        border: 2px dashed #008836;
        padding-top: 0.45rem;
        text-align: center;
        img {
          width: 50%;
        }
        .title {
          width: 100%;
          font-size: 16px;
          text-align: left;
          font-weight: bold;
          padding-left: 0.12rem;
          color: #0c6913;
          margin-bottom: 0.12rem;
          padding-right: 0.01rem;
        }
        .title_list {
          width: 100%;
          font-size: 0.26rem;
          text-align: left;
          padding-left: 0.12rem;
          color: #0c6913;
          margin-bottom: 0.12rem;
          padding-right: 0.01rem;
        }
      }
    }
  }
}
</style>
