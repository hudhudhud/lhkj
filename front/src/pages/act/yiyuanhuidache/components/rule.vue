<template>
  <div class="mask">
    <div class="bg">
      <div class="main">
        <div class="title">
          <img
            src="../imgs/ruletitle.png"
            alt
          >
        </div>
        <div class="content">
          <div v-html="detail"></div>
        </div>
      </div>
      <div
        class="out"
        @click="close"
      >
        <img
          src="../imgs/out.png"
          alt
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['gorulesShow', 'detail'],
  methods: {
    close () {
      this.$emit('close-rule');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.mask {
  width: 100%;
  min-height: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  overflow-y: hidden;
  .bg {
    position: relative;
    width: 6.18rem;
    height: 6.97rem;
    background: url("../imgs/rulewindow.png") no-repeat;
    background-size: 100% 100%;
    margin: 2.3rem 0.65rem;
    padding: 1.6rem 1.3rem 0 0.5rem;
    .main {
      width: 5rem;
      height: 7.4rem;
      overflow: auto;
      .title {
        margin-bottom: 0.4rem;
        img {
          width: 5.33rem;
        }
      }
      .content {
        font-size: 0.28rem;
        color: #d42829;
        line-height: 0.5rem;
      }
    }
    .out {
      position: absolute;
      top: 0.6rem;
      right: -0.3rem;
      width: 0.74rem;
      height: 0.74rem;
      img {
        width: 0.74rem;
      }
    }
  }
}
</style>
