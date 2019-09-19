<template>
  <div class="pop_box">
    <div class="mask"></div>
    <div class="dialog">
      <div class="cont">
        <img
          class="img"
          src="./imgs/pop.png"
        >
        <div
          class="info"
          v-if="prize.proType == 8"
        >
          <h1 class="title">谢谢参与</h1>
          <img
            class="arrow"
            src="./imgs/down-arr.png"
          >
          <p class="text">很遗憾，感谢您的参与!</p>
          <img
            class="confirm"
            @click="hidePop"
            src="./imgs/confirm.png"
          >
        </div>
        <div
          class="info"
          v-else
        >
          <h1 class="title">恭喜您</h1>
          <img
            class="arrow"
            src="./imgs/down-arr.png"
          >
          <p class="text">获得{{ prize.prizeName }}</p>
          <img
            class="confirm"
            @click="hidePop"
            src="./imgs/confirm.png"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prize: {
      type: Object,
      value: null
    }
  },
  model: {},
  methods: {
    hidePop: function () {
      this.$emit('onHide');
    }
  }
};
</script>

<style scoped lang="scss">
.pop_box {
  .mask {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .dialog {
    position: fixed;
    display: table;
    z-index: 110;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    .cont {
      position: relative;
      .img {
        width: 7rem;
        height: 5.4rem;
        top: 0;
        left: 0;
      }
      .info {
        width: 6rem;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        text-align: center;
        margin-left: 0.75rem;
        margin-top: 1.2rem;
        .title {
          color: red;
          margin-bottom: 0.1rem;
        }
        .text {
          padding: 0.2rem;
          height: 1.2rem;
          overflow: hidden;
          font-size: 0.26rem;
        }
        .arrow {
          width: 0.26rem;
          height: 0.16rem;
        }
        .confirm {
          width: 2.7rem;
          height: 0.84rem;
        }
      }
    }
  }
}
</style>
