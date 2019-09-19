<template>
  <!-- <div> -->
  <div>
    <div class="header" :style="{backgroundColor: bgColor || '#09b6f2'}">
      <a class="btn btn-left" href="javascript:">
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
  name: 'cbbHeader',
  props: ['title', 'bgColor'],
  data() {
    return {};
  },

};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 40px;
  height: 40px;
  color: #fff;
  .btn {
    position: absolute;
    height: 20px;
    line-height: 20px;
    top: 10px;
    color: #fff;
    left: 10px;
    i {
      height: 20px;
      width: 20px;
      display: block;
      background: url(./img/icon-right.png) no-repeat;
      background-size: 100%;
    }
  }
}
</style>
