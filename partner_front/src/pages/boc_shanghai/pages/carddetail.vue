<template>
  <div class="carddetail">
    <div class="carddetail-header">
      <div>行用卡详情</div>
    </div>
    <div class="cardinfo">
      <div class="cardpic">
        <img src="./imgs/jiaodacard.png" v-if="cardType==2" alt>
        <img src="./imgs/huadongcard.png" v-else-if="cardType==1" alt>
      </div>
      <div class="cardname">上海交大学认同卡</div>
    </div>
    <div class="explain">
      <div class="title">申请说明</div>
      <div
        class="content"
        v-if="cardType==2"
      >上海交大信用卡暂时不支持线上申请，请携带身份证、毕业证书/学生证、财力证明等文件前往中国银行上海分行任意网点办理。</div>
      <div
        class="content"
        v-else-if="cardType==1"
      >华东理工信用卡暂时不支持线上申请，请携带身份证、毕业证书/学生证、财力证明等文件前往中国银行上海分行任意网点办理。</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardType: ''
    };
  },
  methods: {
    getcardType () {
      this.cardType = this.$route.params.page;
    }
  },
  mounted () {
    this.getcardType();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.carddetail {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  .carddetail-header {
    font-family: "simhei";
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    background-color: red;
  }
  .cardinfo {
    background-color: #f4f8fa;
    padding: 0.36rem 0 0.42rem 0;
    .cardpic {
      width: 4.38rem;
      height: 2.75rem;
      margin: 0 auto 0.22rem;
      img {
        width: 100%;
      }
    }
    .cardname {
      text-align: center;
      font-size: 0.28rem;
      color: rgb(51, 51, 51);
    }
  }
  .explain {
    width: 100%;
    height: 0.84rem;
    border-bottom: 1px solid #ccc;
    padding: 0 0.32rem 0 0.32rem;
    line-height: 0.84rem;
    .title {
      position: relative;
      font-size: 0.32rem;
      color: rgb(247, 37, 57);
      &:after {
        content: " ";
        position: absolute;
        z-index: 2;
        bottom: 0.05rem;
        left: 0rem;
        width: 1.3rem;
        border-bottom: 0.04rem solid rgb(247, 37, 57);
      }
    }
    .content {
      line-height: 0.5rem;
    }
  }
}
</style>
