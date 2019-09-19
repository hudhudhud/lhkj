<template>
  <div>
    <transition name="fade">
      <div class="dialog" v-show="openDialog">
        <div class="join">
          <div class="btn" @click="direct"></div>
          <div class="close">
            <img src="./img/close.png" alt @click="openDialog = false">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      openDialog: true
    };
  },
  methods: {
    direct () {
      switch (this.setting.target) {
        case 'actId':
          this.$router.push(
            `/${this.$store.state.merchantAppid}/merchant/index/act/${
              this.setting.actId
            }`
          );
          break;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
    top: 2.6rem;
    margin: 0 auto;
    width: 6.08rem;
    height: 6.76rem;
    background: url(./img/join.png) no-repeat;
    background-size: 100% auto;
    .btn {
      position: relative;
      top: 5.3rem;
      width: 3.16rem;
      height: 1.1rem;
      margin: 0 auto;
      background: url(./img/join-btn.png) no-repeat;
      background-size: 100% auto;
    }
    .close {
      position: relative;
      top: 5.8rem;
      width: 0.98rem;
      margin: 0 auto;
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
