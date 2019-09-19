<template>
  <div class="xiuqiu">
    <back></back>
    <div class="qiu">
      <div class="qiu-contain">
        <div
          class="qiu-item"
          @click="gotoSF('an',0)"
        ><img
            src="./imgs/an.png"
            class="bg"
            alt=""
          >
          <img
            src="./imgs/an1.png"
            class="sui sui1"
            alt=""
          >
          <img
            src="./imgs/an2.png"
            class="sui sui2"
            alt=""
          >
          <img
            src="./imgs/an4.png"
            class="sui sui3"
            alt=""
          >
          <img
            src="./imgs/an3.png"
            class="sui sui4"
            alt=""
          >
        </div>
        <div
          class="qiu-item"
          @click="gotoSF('ai',1)"
        ><img
            src="./imgs/ai.png"
            class="bg"
            alt=""
          >
          <img
            src="./imgs/ai1.png"
            class="sui sui1"
            alt=""
          >
          <img
            src="./imgs/ai2.png"
            class="sui sui2"
            alt=""
          >
          <img
            src="./imgs/ai3.png"
            class="sui sui3"
            alt=""
          >
          <img
            src="./imgs/ai4.png"
            class="sui sui4"
            alt=""
          ></div>
        <div
          class="qiu-item"
          @click="gotoSF('fu',2)"
        ><img
            src="./imgs/fu.png"
            class="bg"
            alt=""
          >
          <img
            src="./imgs/fu1.png"
            class="sui sui1"
            alt=""
          >
          <img
            src="./imgs/fu2.png"
            class=" sui sui2"
            alt=""
          >
          <img
            src="./imgs/fu3.png"
            class="sui sui3"
            alt=""
          >
          <img
            src="./imgs/fu4.png"
            class="sui sui4"
            alt=""
          >
        </div>
      </div>
      <div class="qiu-contain">
        <div
          class="qiu-item"
          @click="gotoSF('mei',3)"
        ><img
            src="./imgs/mei.png"
            class="bg"
            alt=""
          >
          <img
            src="./imgs/mei1.png"
            class="sui sui1"
            alt=""
          >
          <img
            src="./imgs/mei2.png"
            class="sui sui2"
            alt=""
          >
          <img
            src="./imgs/mei3.png"
            class="sui sui3"
            alt=""
          >
          <img
            src="./imgs/mei4.png"
            class="sui sui4"
            alt=""
          >
        </div>
        <div
          class="qiu-item"
          @click="gotoSF('lu',4)"
        ><img
            src="./imgs/lu.png"
            class="bg"
            alt=""
          >
          <img
            src="./imgs/lu1.png"
            class="sui sui1"
            alt=""
          >
          <img
            src="./imgs/lu2.png"
            class="sui sui2"
            alt=""
          >
          <img
            src="./imgs/lu4.png"
            class="sui sui3"
            alt=""
          >
          <img
            src="./imgs/lu3.png"
            class="sui sui4"
            alt=""
          >
        </div>
        <div
          class="qiu-item"
          @click="gotoSF('shou',5)"
        ><img
            src="./imgs/shou.png"
            class="bg"
            alt=""
          >
          <img
            src="./imgs/shou1.png"
            class="sui sui1"
            alt=""
          >
          <img
            src="./imgs/shou2.png"
            class="sui sui2"
            alt=""
          >
          <img
            src="./imgs/shou4.png"
            class="sui sui3"
            alt=""
          >
          <img
            src="./imgs/shou3.png"
            class="sui sui4"
            alt=""
          >
        </div>
      </div>
    </div>
    <div class="choose"></div>
    <div
      class="btnshou"
      @click="ontime ? $router.push(`/${$store.state.merchantAppid}/merchant/xiuqiu/zhufu/1?actId=${actId.chuanActId}`): showMsg()"
    ></div>
    <div
      class="btnsong"
      @click="ontime ? $router.push(`/${$store.state.merchantAppid}/merchant/xiuqiu/zhufu/2?actId=${actId.chuanActId}`): showMsg()"
    ></div>
    <div class="rulemain">
      <img
        src="./imgs/ren-rule.png"
        alt=""
        class="ren"
      >
      <div class="rule">
        <div class="title"></div>
        <div class="content">
          1、成功传递绣球后可获得2个八桂金，最
          多可获得8个八桂金，即传递超过4个人之
          后不获得八桂金，但每次传递都需做一分
          钱支付；<br>
          2、每个客户在第一次接收绣球时可获得3
          个八桂金，之后每次接收绣球不获得八桂
          金奖励；客户B收到来自客户A的祝福绣球，
          回传绣球给客户A时，客户A不得金币；<br>
          3、不能重复给同一个客户传递绣球；<br>
          4、八桂金可在约惠八桂平台兑换专区兑换。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
  data () {
    return {
      actId:
        process.env.PUBLISH_ENV == 'prod'
          ? { shouActId: '554305446', chuanActId: '554304906' }
          : { shouActId: '554277384', chuanActId: '554197756' },
      ontime: process.env.PUBLISH_ENV == 'prod',
      qiuIdList:
        process.env.PUBLISH_ENV == 'prod'
          ? [1293, 1297, 1299, 1296, 1298, 1300]
          : [971, 978, 980, 977, 979, 981], // 安 爱 福 美 禄 寿
      act: null
    };
  },
  methods: {
    showMsg () {
      Toast('活动尚未开始');
    },
    gotoSF (fuTxt, i) {
      if (this.ontime) {
        if (
          this.$route.query.custTel &&
          this.$route.query.custTel != undefined
        ) {
          this.$router.push(
            `/${
              this.$store.state.merchantAppid
            }/merchant/xiuqiu/fu/${fuTxt}?id=${this.qiuIdList[i]}&custTel=${
              this.$route.query.custTel
            }`
          );
        } else {
          this.$router.push(
            `/${
              this.$store.state.merchantAppid
            }/merchant/xiuqiu/fu/${fuTxt}?id=${this.qiuIdList[i]}`
          );
        }
      } else {
        this.showMsg();
      }
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.xiuqiu {
  width: 100%;
  height: 23rem;
  background: url("./imgs/mbg.jpg") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.01rem;
}
.qiu {
  width: 100%;
  height: 7.85rem;
  display: flex;
  justify-content: center;
  margin-top: 3.8rem;
  .qiu-contain {
    width: 1.5rem;
    height: 90%;
    margin: 0 0.6rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    &:nth-child(1) {
      margin-top: 0.1rem;
    }
    &:nth-child(2) {
      margin-top: 0.5rem;
    }
    .qiu-item {
      width: 1.5rem;
      height: 1.5rem;
      position: relative;
      img.bg {
        width: 100%;
        height: 100%;
      }
      .sui {
        animation: scale 3s linear infinite;
        transform-origin: top right;
      }
      @keyframes scale {
        0% {
          transform: rotate(0deg);
        }
        10% {
          transform: rotate(3deg);
        }
        20% {
          transform: rotate(6deg);
        }
        30% {
          transform: rotate(9deg);
        }
        40% {
          transform: rotate(6deg);
        }
        50% {
          transform: rotate(3deg);
        }
        60% {
          transform: rotate(0deg);
        }
        70% {
          transform: rotate(-3deg);
        }
        80% {
          transform: rotate(-6deg);
        }
        90% {
          transform: rotate(-9deg);
        }
        100% {
          transform: rotate(-6deg);
        }
      }
      .sui1 {
        width: 0.6rem;
        position: absolute;
        top: 0.5rem;
        left: -0.5rem;
      }
      .sui2 {
        width: 0.6rem;
        position: absolute;
        top: 1.1rem;
        left: 0.7rem;
      }
      .sui3 {
        width: 0.3rem;
        position: absolute;
        top: 0.6rem;
        left: 1.3rem;
      }
      .sui4 {
        width: 0.6rem;
        position: absolute;
        top: 1.2rem;
        left: -0.3rem;
      }
    }
  }
}
.choose {
  width: 5.02rem;
  height: 0.48rem;
  background: url("./imgs/choose.png") no-repeat;
  background-size: 100% 100%;
  margin: 0.5rem auto 0;
}
.btnshou {
  width: 4.26rem;
  height: 0.8rem;
  background: url("./imgs/btnshou.png") no-repeat;
  background-size: 100% 100%;
  margin: 0.3rem auto 0.4rem 0.5rem;
}
.btnsong {
  width: 4.26rem;
  height: 0.8rem;
  background: url("./imgs/btnsong.png") no-repeat;
  background-size: 100% 100%;
  margin: 0.2rem 0.5rem 0.2rem auto;
  position: relative;
  z-index: 100;
}
.rulemain {
  width: 5.7rem;
  height: 7.1rem;
  margin: -0.8rem auto 0.2rem;
  position: relative;
  .ren {
    width: 1.46rem;
  }
  .rule {
    width: 5.7rem;
    height: 5.68rem;
    background: url("./imgs/rule-bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 1.5rem;
    left: 0;
    right: 0;
    margin: auto;
    .title {
      width: 1.64rem;
      height: 0.32rem;
      background: url("./imgs/rule-title.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.3rem auto;
    }
    .content {
      width: 4.77rem;
      height: 3.9rem;
      font-family: SourceHanSansCN-Regular;
      font-size: 0.24rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.36rem;
      letter-spacing: 1px;
      color: #0f2a3b;
      margin: auto;
      overflow-y: scroll;
    }
  }
}
</style>
