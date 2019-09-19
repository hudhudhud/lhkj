<template>
  <transition name="fade">
    <div
      class="dialog"
      @touchmove="onTouchStart"
      v-if="openMsg"
    >
      <div class="join">

        <div class="close">
          <img
            src="../imgs/close2.png"
            alt
            @click="close"
          >
        </div>
        <div
          class="sure"
          @click="close"
        ></div>
        <div class="wrapper">
          <div class="rule">
            您与奖品之间就差那么一点点！您支付的1分钱将捐献至“深圳市教育基金会”，感谢您的爱心捐赠！请继续关注中国银行其它精彩活动吧~
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'openMsg',
  props: {
    openMsg: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    close () {
      this.$emit('close-msg');
    },
    onTouchStart (e) {
      e.preventDefault();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .join {
    position: relative;
    top: 1.2rem;
    margin: 0 auto;
    width: 6.48rem;
    height: 7.3rem;
    background: url(../imgs/noprize.jpg) no-repeat;
    background-size: 100% 100%;
    .wrapper {
      color: #fff;
      padding-top: 3.8rem;
      .rule {
        font-size: 0.32rem;
        line-height: 0.4rem;
        text-align: center;
        color: #f94670;
        padding-left: 0.4rem;
        padding: 0.4rem;
      }
    }
    .close {
      position: absolute;
      right: -0.3rem;
      top: -0.3rem;
      width: 0.92rem;
      height: 0.92rem;
      font-size: 0;
      img {
        width: 100%;
      }
    }
    .sure {
      height: 0.86rem;
      width: 5.05rem;
      position: absolute;
      bottom: 0.5rem;
      left: 0;
      right: 0;
      margin: auto;
      background: url(../imgs/sure.jpg) no-repeat;
      background-size: 100% 100%;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
