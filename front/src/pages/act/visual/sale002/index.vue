<template>
  <div class="out-box" :style="{'background-color': templateConfig.pageColor}">
    <back></back>
    <div class="container">
      <img class="rule-img" :src="templateConfig.ruleImg" @click="showRule">
      <img class="banner-img" :src="templateConfig.banner">
      <div class="product-box"
        :style="{'background-color': templateConfig.proBoxColor, 'border-color': templateConfig.proBoxBorder}">
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
              <span class="item-desc" @click="viewDetail(standard.standardActUrl)">商品详情 >></span>
              <img class="buy-btn" :src="templateConfig.buyBtn" @click="_creatOrder(act.actId,standard.id)" />
            </div>
          </div>
        </div>
      </div>
      <div class="page-bottom">
        <img :src="templateConfig.orderImg" @click="toOrder()">
        <img :src="templateConfig.afterSale" @click="viewDetail(act.actIcon)">
      </div>
    </div>
    <ruleDialog ref="ruleDialog" :templateConfig="templateConfig"></ruleDialog>
    <transition name="fade">
      <div class="mask" v-show="showMore" :class="{'isOpacity': unLoad}">
        <span class="mask-close" @click="close">关闭</span>
        <img :src="currentStandard" @load="loaded">
      </div>
    </transition>
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
      showMore: false,
      unLoad: true, // 图片未加载完成
      templateConfig: JSON.parse(this.act.templateConfig),
      currentStandard: ''
    };
  },
  methods: {
    showRule () {
      this.$refs.ruleDialog.setDetail(this.act.detail);
      this.$refs.ruleDialog.open();
    },
    _creatOrder (actId, standardId) {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/creditBuy/standard/${standardId}/${actId}?btnText=${encodeURIComponent(
          '立即购买'
        )}`
      );
    },
    toOrder () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/order?actId=${this.act.actId}`
      );
    },
    viewDetail (url) {
      this.unLoad = false;
      if (url) {
        this.$indicator.open();
        this.unLoad = true;
        this.currentStandard = url;
        this.showMore = true;
      } else {
        this.$toast('暂无商品详情！');
      }
    },
    loaded (data) {
      this.$indicator.close();
      this.unLoad = false;
    },
    close () {
      this.showMore = false;
      this.currentStandard = '';
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
    .rule-img {
      height: 0.86rem;
      position: absolute;
      right: 0;
      top: 2.92rem;
    }
    .banner-img {
      display: block;
      width: 100%;
    }
    .product-box {
      box-sizing: border-box;
      margin: 0 0.2rem;
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
            align-items: flex-end;
            padding-bottom: 0.08rem;
            .item-desc {
              color: #f8748a;
              font-size: 0.24rem;
            }
            .buy-btn {
              height: 0.54rem;
            }
          }
        }
      }
    }
    .page-bottom {
      box-sizing: border-box;
      width: 100%;
      padding: 0.32rem 0.54rem 0.4rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      a {
        height: 0.9rem;
      }
      img {
        height: 0.9rem;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.5);
    .mask-close {
      position: fixed;
      top: 0;
      right: 0;
      display: block;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0.2rem;
      color: #fff;
      font-size: 0.3rem;
    }
    img {
      width: 100%;
    }
  }
  .isOpacity {
    opacity: 0;
  }
}
</style>
