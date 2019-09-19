<template>
  <div class="out-box" :style="{'background-color': templateConfig.pageColor}">
    <back></back>
    <div class="container"
      :style="{'background-image': 'url('+templateConfig.pageBg+')','height':templateConfig.ctxHeight}">
      <div class="activity-box" v-for="product in products" :key="product.id"
        :style="{'margin-top': templateConfig.proBoxTop}">
        <img class="product-img" :src="product.homeImgUrl">
        <div class="progress-bar">
          <div :style="{'width':percentage  +'%'}">
            <span>已抢{{ percentage || '--'}}%</span>
          </div>
        </div>
        <img class="buy-btn" :src="templateConfig.buyBtn" @click="_creatOrder(act.actId,product.standardList[0].id)">
      </div>
      <div class="container-bottom">
        <img class="rule-img" :src="templateConfig.ruleImg" @click="showRule">
        <img class="order-img" :src="templateConfig.orderImg" @click="toOrder">
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
  computed: {
    products () {
      return this.act.productList;
    },
    percentage () {
      let standard = this.act.productList[0].standardList[0];
      return (standard.usedTotal / standard.limitTotal) * 100;
    }
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
    position: relative;
    width: 100%;
    height: auto;
    overflow-y: auto;
    background-repeat: no-repeat;
    background-size: 100%;
    .activity-box {
      position: relative;
      width: 100%;
      img {
        max-width: 100%;
      }
      .progress-bar {
        position: absolute;
        width: 4.8rem;
        bottom: 2.5rem;
        border: 2px solid #feb000;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 0.12rem;
        overflow: hidden;
      }
      .progress-bar div {
        display: block;
        position: relative;
        background: #feb000; /* 进度条背景颜色 */
        height: 0.24rem; /* 高度 */
        line-height: 0.24rem;
        span {
          position: absolute;
          font-size: 0.2rem;
          color: #ec001d;
          top: 0.02rem;
          left: 0.7rem;
        }
      }
      .buy-btn {
        position: absolute;
        height: 0.7rem;
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .container-bottom {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        height: 0.76rem;
      }
    }
  }
}
</style>
