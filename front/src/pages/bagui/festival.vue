<template>
  <div>
    <cbbHeader title="约惠八桂"></cbbHeader>
    <div class="container">

      <div class="rule">
        <img
          src="./imgs/rules.png"
          alt
          @click="rulelist3"
        >
      </div>
      <div class="centerfoot">
        <img
          src="./imgs/duanwubg2.png"
          alt=""
        >
        <img src="./imgs/datibg2.png">
        <div class="centerfoot1">
          <div class="left">
            <img
              src="./imgs/left.png"
              alt
              @click="rulelist1"
            >
          </div>
          <div class="right">
            <img
              src="./imgs/right.png"
              alt
              @click="rulelist2"
            >
          </div>
        </div>

        <!-- <img src="./imgs/footer1.png"> -->
      </div>
    </div>
  </div>
</template>

<script>
import shanRong from './shanRong.json';
import cbbHeader from '@/components/cbbHeader';
export default {
  data () {
    return {
      currentTab: 'all',
      shanRong: shanRong,
      list: shanRong['all'],
      clientHeight: 0
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    close () {},
    qinggou () {},
    rulelist1 () {
      window.location.href = `${window.location.protocol}//${
        window.location.host
      }/${this.$store.state.merchantAppid}/merchant/bagui/answer`;
    },
    rulelist2 () {
      window.location.href = `${window.location.protocol}//${
        window.location.host
      }/${this.$store.state.merchantAppid}/merchant/bagui/activevity`;
    },
    rulelist3 () {
      window.location.href = `${window.location.protocol}//${
        window.location.host
      }/${this.$store.state.merchantAppid}/merchant/bagui/festival_rule`;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.container {
  width: 100%;
  height: 100%;
  // min-height: 100vh;
  overflow: hidden;
  background: #f4fafa;
  // margin-bottom: 0.5rem;
  img {
    width: 100%;
    vertical-align: bottom;
    z-index: 100;
  }

  .imgs1 {
    position: absolute;
    left: 0;
    bottom: 0rem;
    z-index: 3;
    vertical-align: bottom;
  }
  .rule {
    position: absolute;
    top: 0.94rem;
    right: 0;
    width: 1.88rem;
    height: 0.7rem;
    z-index: 97;
    img {
      width: 100%;
    }
  }
  .footer {
    position: absolute;
    bottom: -0.12rem;
    right: 0;
    width: 100%;
    // height:3rem;
    // background:red;
    // background: url(./imgs/footer.png) repeat-y;
    img {
      width: 7.5rem;
      z-index: 99;
    }
  }
  .centerfoot {
    position: absolute;
    top: 0rem;
    right: 0;
    width: 100%;
    background: url(./imgs/footer.png) no-repeat center bottom;
    // background-position: 0rem 6.7rem;
    background-size: 100% auto;
    padding-top: 0.8rem;
    padding-bottom: 2rem;
    z-index: 3;
    .centerfoot1 {
      width: 100%;
      display: flex;
      padding: 0.5rem 0.6rem 0rem 0.6rem;
      .left {
        flex: 1;
        width: 2rem;
        margin-right: 0.3rem;
        z-index: 98;
        img {
          width: 80%;
        }
      }
      .right {
        flex: 1;
        width: 2rem;
        z-index: 98;
        text-align: right;
        img {
          width: 80%;
        }
      }
    }
  }
}
</style>
