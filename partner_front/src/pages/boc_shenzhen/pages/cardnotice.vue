<template>
  <div class="card">
    <myheader title='用卡小知识' ></myheader>
    <div class="main-content">
      <div class="button first" @click="gotonoticway(1)"></div>
      <div class="button second" @click="gotonoticway(2)"></div>
      <div class="button third" @click="gotonoticway(3)"></div>
      <div class="button fourth" @click="gotonoticway(4)"></div>
    </div>
  </div>
</template>

<script>
import myheader from './components/myheader'
export default {
  components: {
    myheader
  },
  methods: {
    gotonoticway (page) {
      this.$router.push({
        name: 'cardn',
        params: {
          page: page
        }
      }); // 用卡注意页面
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  .card-header {
    font-family: "simhei";
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    background-color: red;
    .card-out {
      position: absolute;
      top: 0.4rem;
      right: 0.3rem;
      height: 0.3rem;
      width: 0.3rem;
    }
  }
  .main-content {
    position: relative;
    width: 100%;
    height: 12.81rem;
    background: url("./imgs/cardbg.jpg") no-repeat;
    background-size: 100% 100%;
    .button {
      position: absolute;
      width: 1.84rem;
      height: 0.75rem;
      &.first {
        background: url("./imgs/button1.png") no-repeat;
        background-size: 100% 100%;
        top: 3.9rem;
        left: 0.86rem;
      }
      &.second {
        background: url("./imgs/button2.png") no-repeat;
        background-size: 100% 100%;
        top: 5.84rem;
        left: 2.07rem;
      }
      &.third {
        background: url("./imgs/button3.png") no-repeat;
        background-size: 100% 100%;
        top: 8.35rem;
        left: 0.35rem;
      }
      &.fourth {
        background: url("./imgs/button4.png") no-repeat;
        background-size: 100% 100%;
        top: 10.7rem;
        left: 1.5rem;
      }
    }
  }
}
</style>
