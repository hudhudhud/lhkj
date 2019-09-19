<template>
  <div
    class="coupon"
    v-if="coupon"
  >
    <div
      class="coupon-left"
      :style="{'max-width': config.imgWidth}"
    >
      <div class="coupon-img">
        <img
          :src="coupon.standardImgUrl"
          width="100%"
        >
      </div>
    </div>
    <div class="coupon-center">
      <div class="coupon-name">{{coupon.standardName}}</div>
      <div class="coupon-store">剩余数量：&nbsp;{{coupon.surplusStock}}</div>
    </div>
    <div class="coupon-right">
      <div
        class="coupon-price"
        :style="{'color': config.theme,'width': config.btnWidth}"
      > ￥<b>{{coupon.currentPrice}}</b></div>
      <div
        class="coupon-buy"
        :style="{'max-width': config.btnWidth}"
      >
        <img
          width="100%"
          :src="config.bgBtn"
          alt=""
          @click="action"
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DrawCoupon',
  props: {
    coupon: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  methods: {
    action () {
      this.$emit('action');
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.coupon {
  @include flex(row, noWrap, flex-start, center);
  margin-bottom: 0.36rem;
  white-space: nowrap;
  &-left,
  &-center,
  &-right {
    flex: 1;
    height: 1.56rem;
  }
  &-price {
    text-align: center;
  }
  &-center {
    color: #333;
    margin-left: 0.2rem;
  }
  &-name {
    font-size: 0.3rem;
    padding: 0.2rem 0 0.3rem;
  }
  &-store {
    font-size: 0.26rem;
  }
  &-right {
    @include flex(column, noWrap, center, flex-end);
    font-size: 0.34rem;
    b {
      font-size: 0.6rem;
    }
    div {
      color: #fff;
    }
  }
}
</style>
