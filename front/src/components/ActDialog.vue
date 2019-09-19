<template>
  <transition
    name="fade"
    v-if="PopupFlag"
  >

    <div class="dialog">
      <div class="main">
        <div class="container">
          <img
            :src="setting.banner"
            alt=""
            class="banner"
          >
          <img
            :src="setting.btn"
            alt=""
            class="btn"
            @click="createOrder(setting)"
          >
        </div>
        <img
          class="close"
          @click="closeDialog"
          src="./img/dialog-close.png"
          alt=""
        >
      </div>
    </div>
  </transition>
</template>
<script>
import { Popup } from 'mint-ui';
import { createOrder } from '@/pages/buy/buy';

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
    closeDialog () {
      this.$emit('close-dialog');
    }
  },
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      createOrder: createOrder
    };
  }
};
</script>
<style lang="scss" scoped>
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
  top: -0.4rem;
  display: block;
  margin: 0 auto;
  z-index: 19939316;
  width: 0.56rem;
}
.container {
  width: 5.9rem;
  .banner {
    display: block;
    width: 100%;
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
