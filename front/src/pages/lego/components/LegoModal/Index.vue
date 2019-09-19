<template>
  <div>
    <img
      class="boat"
      src="./imgs/boat.png"
      @click="openDialog = true"
      alt
    >
    <transition name="fade">
      <!-- <div class="dialog"> -->
      <div
        class="dialog"
        v-if="openDialog"
      >
        <div class="join">
          <div class="wrapper">
            <p>活动规则</p>客户在约惠八桂平台通过签到、游戏、活动参与等不同方式获得不同颜色的八桂金，可在此商城兑换等值礼品,兑换时随机支付0.01-0.09元，请在八桂金到期之前兑换哦。
            说明：小额支付主要是为了精准识别和认证客户身份，感谢您的理解和支持！
            <div class="close">
              <img
                src="./imgs/close.png"
                alt
                @click="openDialog = false"
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openDialog: false
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.boat {
  position: absolute;
  right: 0;
  top: 3.9rem;
  z-index: 99;
  width: 1.94rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
    top: 2.8rem;
    margin: 0 auto;
    width: 5.6rem;
    height: 5.56rem;
    background: url(./imgs/bg.png) no-repeat;
    background-size: 100% 100%;
    .wrapper {
      padding: 0.7rem 0.66rem 0 0.4rem;
      color: grey;
      line-height: 0.46rem;
      p {
        padding-bottom: 0.3rem;
        font-size: 0.32rem;
        text-align: center;
      }
    }
    .close {
      position: relative;
      left: 0.44rem;
      margin: 0.98rem auto 0;
      width: 0.88rem;
      height: 0.94rem;
      // border-left: 1px solid #fff;
      font-size: 0;
      img {
        position: relative;
        right: 0.44rem;
        top: 0.94rem;
        width: 100%;
      }
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
