<template>
  <div class="lottery">
    <div class="banner">
      <img :src="templateConfig.banner" alt>
    </div>
    <div class="gif-wapper">
      <img src="./imgs/welcome.gif" alt>
    </div>
    <div class="bg-wrap">
      <div class="box-bg">
        <HemiGrid :act="act" :template-config="templateConfig" @open-message="openMessage"></HemiGrid>
        <MessageModal v-model="payloadModal" :act="act"></MessageModal>
      </div>
      <div class="detail" v-if="act.detail">
        <div>幸运抽奖版块活动说明</div>
        <p v-html="act.detail"></p>
      </div>
    </div>
    <p style="height: 0.2rem;background: #eff0f1;margin-top:0.4rem;"></p>
    <div class="sale">
      <div class="item-title">
        <div>
          <img src="./imgs/radio.png" alt>
        </div>
        <div>特惠专区</div>
      </div>
      <div class="rule">所有商品仅有一次购买机会</div>
      <div class="standard-list" v-for="(product,ind) in actPayload" :key="'product_'+ind">
        <div
          class="standard-item"
          v-for="(standard,ind2) in product.standardList"
          :key="ind+'_standard_'+ind2"
        >
          <div class="tips"></div>
          <div class="standard-name">
            <div>
              <img :src="standard.standardImgUrl" alt>
            </div>
            <div>{{standard.standardName}}</div>
          </div>
          <div class="price">
            ￥
            <b>{{standard.currentPrice}}</b>
          </div>
          <div class="originalPrice">
            ￥
            <b>{{standard.originalPrice}}</b>
          </div>
          <div
            class="btn"
            @click="buy(standard)"
          >立减{{(standard.originalPrice-standard.currentPrice).toFixed(2)}}元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HemiGrid from '../hzghrylLottery/HemiGridICBC';
import MessageModal from '@/components/lotteryModal/MessageModal';
// import jssdk from '@/lib/jssdk'
import { Indicator } from 'mint-ui';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiGrid,
    MessageModal
  },
  data () {
    return {
      actPayload: [],
      merchantId: this.$store.state.merchantId,
      templateConfig: JSON.parse(this.act.templateConfig),
      payloadModal: {}
    };
  },
  methods: {
    buy (standard) {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${standard.id}`
      );
    },
    async loadAct (actId) {
      Indicator.open();
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.actPayload = rs.payload.productList;
      } else {
        this.error = rs.error;
      }
      Indicator.close();
    },
    openMessage (payload) {
      this.payloadModal = payload;
    }
  },
  created () {
    this.loadAct(175);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.lottery {
  background: #fff;
  .banner {
    height: 3rem;
    img {
      width: 100%;
    }
  }
  .gif-wapper {
    height: 2.34rem;
    font-size: 0;
    text-align: center;
    margin-top: 0.26rem;
    img {
      position: relative;
      right: 0.02rem;
      width: 100%;
      margin-top: -0.26rem;
    }
  }
  .bg-wrap {
    width: 7rem;
    margin: 0 auto;
    background: url(./imgs/lettery-bg.jpg) no-repeat;
    background-size: 100% 100%;
    padding-top: 0.45rem;
    .detail {
      width: 6.44rem;
      margin: 0 auto;
      color: #fff;
      margin-top: 0.3rem;
      padding-bottom: 0.2rem;
      div {
        font-size: 0.28rem;
        text-align: center;
        padding-bottom: 0.1rem;
      }
      p {
        font-size: 0.24rem;
        line-height: 0.4rem;
      }
    }
  }
}
.sale {
  .item-title {
    @include flex(row, nowrap, flex-start, center);
    @include border-1px(#d9d9d9);
    height: 1.2rem;
    padding-left: 0.2rem;
    div {
      img {
        width: 0.4rem;
        margin-right: 0.2rem;
      }
    }
  }
  .rule {
    padding-left: 6%;
    font-size: 0.24rem;
    color: #888888;
    line-height: 0.6rem;
  }
}
.standard-list {
  @include flex(row, wrap, center, center);
  .standard-item {
    position: relative;
    min-width: 42%;
    @include flex(column, nowrap, center, center);
    margin: 2% 3%;
    height: 3.26rem;
    border: 1px solid #ee6a22;
    border-radius: 0.1rem;
    .tips {
      position: absolute;
      top: -0.12rem;
      left: -0.04rem;
      width: 1.09rem;
      height: 0.41rem;
      background: url(./imgs/tips.png) no-repeat;
      background-size: 100% auto;
    }
    .standard-name {
      @include flex(row, nowrap, flex-start, center);
      margin-top: 0.2rem;
      font-size: 0.3rem;
      img {
        width: 0.44rem;
        margin-right: 0.1rem;
      }
    }
    .price {
      font-size: 0.32rem;
      color: #ee6a22;
      b {
        font-size: 0.66rem;
      }
    }
    .originalPrice {
      position: relative;
      line-height: 0.3rem;
      font-size: 0.22rem;
      color: #999999;
      font-family: "Franklin Gothic Medium", "Arial Narrow";
      &:after {
        position: absolute;
        content: "";
        width: 110%;
        height: 100%;
        left: 0;
        top: -50%;
        border-bottom: 1px solid #999;
      }
      b {
        font-size: 0.33rem;
      }
    }
    .btn {
      width: 2.1rem;
      height: 0.54rem;
      margin-top: 0.2rem;
      line-height: 0.54rem;
      text-align: center;
      background: #ee6a22;
      color: #fff;
      font-size: 0.33rem;
      border-radius: 0.4rem;
    }
  }
}
</style>
