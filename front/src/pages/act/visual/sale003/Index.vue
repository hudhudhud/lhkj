<template>
  <div class="out-box" :style="{'background-color': templateConfig.pageColor}">
    <back></back>
    <div class="container" :style="{'background-image': 'url('+templateConfig.pageBg+')'}">
      <img class="rule-img" :src="templateConfig.ruleImg" @click="showRule">
      <img class="order-img" :src="templateConfig.orderImg" @click="toOrder">
      <div class="product-box"
        :style="{'background-color': templateConfig.proBoxColor, 'border-color': templateConfig.proBoxBorder,'margin-top':templateConfig.proBoxTop}">
        <img class="product-title" :src="templateConfig.proTitle">
        <div class="product-list">
          <div class="product-item" v-for="standard in act.productList[0].standardList" :key="standard.id">
            <div class="item-img">
              <img :src="standard.standardImgUrl">
            </div>
            <div class="item-mid">
              <span class="item-name">{{standard.standardName}}</span>
              <span class="item-originalPrice">原价：{{standard.originalPrice}}</span>
              <span class="item-currentPrice">现价：<label>&yen;{{standard.currentPrice}}</label></span>
            </div>
            <div class="item-right">
              <img class="buy-btn" :src="templateConfig.buyBtn" @click="_creatOrder(act.actId,standard.id)" />
              <span class="item-store">剩余：{{standard.surplusStock}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ruleDialog ref="ruleDialog" :templateConfig="templateConfig"></ruleDialog>
  </div>
</template>

<script>
import ruleDialog from './components/ruleDialog';
export default {
  components: {
    ruleDialog
  },
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      templateConfig: JSON.parse(this.act.templateConfig)
    };
  },
  methods: {
    showRule () {
      this.$refs.ruleDialog.setDetail(this.act.detail);
      this.$refs.ruleDialog.open();
    },
    _creatOrder (actId, standardId) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/cbbBuy001/standard/${standardId}`
      );
    },
    toOrder () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/order?actId=${this.act.actId}`
      );
    }
  }
};
</script>

<style scoped lang="scss">
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  .container {
    width: 100%;
    height: auto;
    overflow-y: auto;
    background-repeat: no-repeat;
    background-size: 100%;
    .rule-img {
      height: 0.86rem;
      position: absolute;
      right: 0;
      top: 0.46rem;
    }
    .order-img {
      height: 0.86rem;
      position: absolute;
      right: 0;
      top: 1.44rem;
    }
    .product-box {
      box-sizing: border-box;
      margin: 0 0.2rem 1rem;
      padding: 0.26rem 0.22rem 0 0.32rem;
      border-radius: 10px;
      border: 1px solid #ee647c;
      background-color: #fff;
      .product-title {
        height: 0.4rem;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.38rem;
      }
      .product-list {
        width: 100%;
        margin-top: 0.32rem;
        .product-item {
          width: 100%;
          margin-bottom: 0.4rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          .item-img {
            display: inline-block;
            width: 1.58rem;
            height: 1.58rem;
            img {
              display: block;
              width: 100%;
            }
          }
          .item-mid,
          .item-right {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 0.2rem;
          }
          .item-mid {
            max-width: 2.8rem;
            .item-name {
              font-size: 0.3rem;
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .item-originalPrice {
              font-size: 0.26rem;
              text-decoration: line-through;
            }
            .item-currentPrice {
              font-size: 0.26rem;
              label {
                color: #f20017;
                font-size: 0.5rem;
              }
            }
          }
          .item-right {
            min-width: 1.76rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 0.2rem;
            .buy-btn {
              height: 0.7rem;
            }
            .item-store {
              color: #4e4fcb;
              display: inline-block;
              font-size: 0.26rem;
              margin-left: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>
