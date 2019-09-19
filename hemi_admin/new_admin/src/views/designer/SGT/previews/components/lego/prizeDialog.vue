<template>
  <transition name="fade" v-if="PopupFlag">

    <div class="dialog">
      <div class="main">
        <div class="container">
          <img :src="setting.prizeDialogBg" alt="" class="banner">
          <div class="ruleCont">
            <img :src="setting.prizeImg" alt="">
            <p>商品名称</p>
          </div>
          <!-- <img :src="setting.btn" alt="" class="btn" @click="createOrder(setting)"> -->
        </div>
        <img class="close" @click="closeDialog" :src="setting.ruleDialogClose" alt="">
      </div>
    </div>
  </transition>
</template>
<script>

export default {
  name: 'ActDialog',
  props: {
    setting: {
      type: Object,
      require: true
    },
    PopupFlag: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    }
  },


};
</script>
<style lang="scss" scoped>
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.myPopup {
  background: transparent;
  text-align: center;
}
.close {
  position: relative;
  top: 0.6rem;
  display: block;
  margin: 0 auto;
  z-index: 19939316;
  width: 30px;
}
.container {
  width: 295px;
  .banner {
    display: block;
    width: 100%;
  }
  .ruleCont {
    position: absolute;
    top: 236px;
    width: 100%;
    padding: 20px;
    h1 {
      text-align: center;
      font-size: 16px;
      font-weight: normal;
      color: #ff7e2f;
    }
    img {
      display: block;
      margin: 0 auto;
      width: 44px;
    }
    p {
      color: #333;
      line-height: 38px;
      text-align: center;
    }
  }
  .btn {
    position: relative;
    bottom: 1.2rem;
    display: block;
    margin: 0 auto;
    width: 4.6rem;
  }
  .content {
    font-size: 0.28rem;
    color: rgb(59, 23, 0);
    line-height: 0.45rem;
    height: 3.5rem;
    overflow: scroll;
    span {
      color: rgb(240, 11, 0);
    }
  }
}
</style>
