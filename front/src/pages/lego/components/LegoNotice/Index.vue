<template>
  <div>
    <transition name="fade">
      <!-- <div class="dialog"> -->
      <div
        class="dialog"
        @touchmove="disableScroll"
        v-if="openDialog"
      >
        <div
          class="join"
          :style="{'backgroundImage': 'url('+bg+')','background-size': '100% 100%',
 'padding-top': setting.modalcss,'height': setting.modalH}"
        >
          <div class="wrapper">
            <!--             <p>温馨提示</p>
 -->
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{setting.detail}}</div>
          </div>
          <template v-if="setting.noClose!='true'">
            <div
              class="btn"
              @click="openDialog = false"
            ></div>
          </template>
        </div>
        <!--    <div class="close">
          <img src="./imgs/close.png" alt @click="openDialog = false">
        </div>-->
      </div>
    </transition>
  </div>
</template>

<script>
import bg from './imgs/bg.png';
export default {
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      openDialog: false,
      bg: this.setting.background || bg
    };
  },
  methods: {
    disableScroll (e) {
      if (e.target) {
        e.preventDefault();
      }
    }
  },
  mounted () {
    this.openDialog = true;
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
    padding-top: 1.8rem;
    width: 5.2rem;
    height: 5.16rem;
    .wrapper {
      padding: 0 0.3rem 0;
      color: #fff;
      div {
        line-height: 0.46rem;
        font-size: 0.28rem;
        color: #fff;
      }
      p {
        padding: 0.6rem 0 0.2rem;
        text-align: center;
        font-size: 0.34rem;
        color: #3c3c3c;
      }
    }
  }
}
.btn {
  position: absolute;
  left: 50%;
  bottom: 0.3rem;
  transform: translateX(-50%);
  width: 3.41rem;
  height: 0.8rem;
  margin: 0 auto;
  background: url(./imgs/confirm.png) no-repeat;
  background-size: 100% auto;
}
.close {
  position: relative;
  top: 1.82rem;
  left: 0.44rem;
  margin: 0.98rem auto 0;
  width: 0.88rem;
  height: 0.94rem;
  border-left: 1px solid #fff;
  font-size: 0;
  img {
    position: relative;
    right: 0.44rem;
    top: 0.94rem;
    width: 100%;
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
