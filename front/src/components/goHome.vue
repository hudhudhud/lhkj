<template>
  <!-- <div> -->
  <div>
    <div
      class="header"
      :style="{backgroundColor: bgColor || '#09b6f2'}"
    >
      <a
        class="btn btn-left"
        href="javascript:"
        @click="goBack"
      >
        <i class="icon icon-right"></i>
      </a>
      {{title}}
      <!-- <div v-if="openShare" class="share" style="position:absolute;right:1.4rem; top:0;" @click="cbbShare"> 分享</div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: 'goHome',
  props: ['title', 'bgColor'],
  data () {
    return {};
  },
  methods: {
    goBack () {
      this.$router.replace(`/${this.$store.state.merchantAppid}/merchant/`);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 0.3rem;
  font-weight: 700;
  line-height: 0.8rem;
  height: 0.8rem;
  color: #fff;
  .btn {
    position: absolute;
    height: 0.4rem;
    line-height: 0.4rem;
    top: 0.2rem;
    color: #fff;
    left: 0.2rem;
    i {
      height: 0.4rem;
      width: 0.4rem;
      display: block;
      background: url(./img/icon-right.png) no-repeat;
      background-size: 100%;
    }
  }
}
</style>
