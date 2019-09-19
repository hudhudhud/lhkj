<template>
  <transition name="fade">
    <div
      class="dialog"
      @touchmove="onTouchStart"
      v-if="openRule"
    >
      <div class="join">

        <div class="close">
          <img
            src="../imgs/close.png"
            alt
            @click="close"
          >
        </div>
        <div class="wrapper">
          <div
            class="rule"
            v-html="rule"
          >

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'rule',
  props: {
    openRule: {
      type: Boolean,
      require: true
    },
    rule: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      mobile: '',
      name: ''
    };
  },
  methods: {
    close () {
      this.$emit('close-rule');
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.7rem;
    height: 8rem;
    background: url(../imgs/no-prize.png) no-repeat;
    background-size: 100% 100%;
    .wrapper {
      text-align: center;
      color: #fff;
      padding-top: 2rem;
      .rule {
        font-size: 0.3rem;
        line-height: 0.5rem;
        text-align: center;
        color: #c3242a;
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: -0.6rem;
      width: 0.5rem;
      height: 0.5rem;
      font-size: 0;
      img {
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
