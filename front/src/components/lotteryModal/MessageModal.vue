<template>
  <div>
    <div
      class="massage"
      v-show="prizeInfoShow"
    >
      <div
        class="close"
        @click="closeOrOpen('prizeInfoShow', 'showRules', 'closeFlag', false)"
        v-if="closeFlag"
      >
        <img
          src="./lottery/close.png"
          alt=""
        >
      </div>
      <!-- 购买机会 -->
      <div
        class="buyChance msgBox"
        v-if="buyChanceShow"
      >
        <p>是否花费
          <i>¥{{payload.actualPrice}}
          </i>购买一次抽奖机会</p>
        <button @click="payForChance">立即购买</button>

      </div>
      <!-- 抽中奖品 -->
      <img
        src="./lottery/circleLight.png"
        class="circleLight"
        v-if="havePrizeShow"
        alt=""
      >
      <div
        class="havePrize"
        v-if="havePrizeShow"
      >
        <div
          class="top-bar"
          v-if="payload.proType!=8"
        >
          中奖啦
        </div>
        <div
          class="top-bar"
          v-else
        >
          感谢参与
        </div>
        <div class="oneBar">
          <img src="./lottery/yellowCycle.png" />
        </div>
        <!-- 荣耀10= 499 & nova2s == 500 & 10元话费 == 502 || 512 -->
        <p v-if="payload.proType!=8 && payload.id == 499 ">恭喜您获得华为手机荣耀10一部，<br />我行工作人员将在活动结束后 72 小时内与您取得联系，<br />如有疑问详见活动规则。</p>
        <p v-else-if="payload.proType!=8 && payload.id == 500">恭喜您获得华为nova2S手机一部，<br />我行工作人员将在活动结束后 72 小时内与您取得联系，<br />如有疑问详见活动规则。</p>
        <p v-else-if="payload.proType!=8 && payload.id == 502 || payload.id == 512">恭喜您获得10元话费，<br />活动结束后将在72小时内充进您当前手机号，<br />如有疑问详见活动规则。</p>
        <p v-else-if="payload.proType!=8">恭喜您抽中{{payload.prizeName}}</p>

        <div
          v-if="payload.proType==11"
          class="info"
        >红包已发送，请退出页面领取</div>
        <div
          v-if="payload.proType==10 && act.actId== 554706131"
          class="info"
        >{{payload.standardInstruction}}
        </div>
        <div
          v-else-if="payload.proType!=8 && act.actId== 554706131"
          class="info"
        >请到【中奖记录】中查看奖品详情</div>
        <div
          v-else-if="payload.proType!=8 && act.actId==559786685"
          class="info"
        >请到【中奖记录】中查看奖品详情</div>
        <div
          v-else-if="payload.proType!=8"
          class="info"
        >请到'我-我的奖品'查看奖品详情</div>
        <div class="proImg">
          <img
            :class="{'imgMargin': payload.proType==8}"
            :src="payload.standardImgUrl"
            alt=""
          >
        </div>
        <div
          class="inputphone"
          v-if="payload.proType==10 && act.actId== 554706131"
        > <input
            type="text"
            placeholder="请输入北京移动手机号"
            v-model="tel"
          >
        </div>
        <div
          class="btn"
          @click="lotterySure"
        >
          <a>确定</a>
        </div>
      </div>
      <!-- 规则 -->
      <div
        class="letteryRules"
        v-if="showRules"
      >

        <h1>活动规则</h1>
        <p
          class="articl"
          v-html="payload.detail"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/lib/eventBus';
import { Toast } from 'mint-ui';
export default {
  name: 'MessageModal',
  props: {
    act: {
      require: true,
      type: Object
    },
    value: {
      require: true,
      type: Object
    }
  },
  watch: {
    value (val) {
      this.payload = val;
      switch (val.keyward) {
        case 'showPrize':
          this.closeOrOpen('prizeInfoShow', 'havePrizeShow', true); // 弹出是否中奖
          break;
        case 'showRules':
          this.closeOrOpen('prizeInfoShow', 'showRules', 'closeFlag', true);
          break;
        case 'showBuyChance':
          this.closeOrOpen('prizeInfoShow', 'buyChanceShow', 'closeFlag', true);
          break;
      }
    }
  },
  data () {
    return {
      payload: {},
      prizeInfoShow: false,
      buyChanceShow: false,
      havePrizeShow: false,
      showRules: false,
      closeFlag: false,
      tel: ''
    };
  },
  methods: {
    payForChance () {
      if (this.act && this.act.noBus) {
        this.$emit('pay-for-chance');
      } else {
        bus.$emit('pay-for-chance');
      }
    },

    async lotterySure () {
      if (this.payload.proType == 10 && this.act.actId == 554706131) {
        let phoneReg = /^1[3456789]\d{9}$/;
        if (!phoneReg.test(this.tel)) {
          Toast('手机号输入有误');
          return;
        }
        let rs = await this.$post('api/activity/act/actPredate/save/table', {
          actId: this.act.actId,
          mobile: this.tel,
          orderCode: this.payload.orderCode
        });
        if (rs.status == 200) {
          Toast(rs.message);
          this.closeOrOpen('prizeInfoShow', 'havePrizeShow', false);
        } else {
          Toast(rs.error);
        }
      } else if (this.payload.proType == 10) {
        this.$emit('order-info', this.payload);
        this.closeOrOpen('prizeInfoShow', 'havePrizeShow', false);
      } else {
        this.closeOrOpen('prizeInfoShow', 'havePrizeShow', false);
      }
    },
    closeOrOpen () {
      // 消息开关
      const args = Array.from(arguments);
      var boolean = args.pop();
      var vm = this;
      args.forEach(function (item) {
        vm[item] = boolean;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.massage {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .msgBox {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  .buyChance {
    width: 6rem;
    height: 4rem;
    text-align: center;
    background: #fff;
    border: 0.1rem solid transparent;
    background: linear-gradient(white, white) padding-box,
      repeating-linear-gradient(
          45deg,
          #ffde00 0%,
          #ffde00 4.6%,
          #3eaaff 0,
          #3eaaff 10%
        )
        0 / 6.9rem 6.9rem;
    button {
      width: 2.4rem;
      height: 0.6rem;
      color: #fff;
      border-radius: 0.3rem;
      background: #3690e3;
      background-image: -webkit-linear-gradient(315deg, #32b2d7, #396def);
      background-image: -o-linear-gradient(315deg, #32b2d7, #396def);
      background-image: linear-gradient(135deg, #32b2d7, #396def);
      border: none;
    }
    p {
      font-size: 0.3rem;
      line-height: 1.8rem;
      i {
        color: #3690e3;
      }
    }
  }
  .close {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    top: 1rem;
    right: 0.3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .letteryRules {
    width: 80%;
    height: 9rem;
    overflow: auto;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    font-size: 0.28rem;
    line-height: 0.4rem;
    padding: 0.7rem 0.4rem;
    border: 0.15rem solid transparent;
    border-radius: 0.2rem;
    box-sizing: border-box;
    background: linear-gradient(white, white) padding-box,
      repeating-linear-gradient(
          45deg,
          #ffde00 0%,
          #ffde00 4.6%,
          #3eaaff 0,
          #3eaaff 10%
        )
        0 / 6.9rem 6.9rem;
    -webkit-overflow-scrolling: touch;
    h1 {
      font-size: 0.32rem;
      text-align: center;
      line-height: 0.6rem;
    }
  }
  .circleLight {
    width: 9.22rem;
    height: 9.22rem;
    position: absolute;
    top: 0.8rem;
    left: 50%;
    margin-left: -4.61rem;
    -webkit-animation: rotate 20s infinite linear;
    animation: rotate 20s infinite linear;
    transform-origin: 50% 50%;
  }
  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .havePrize {
    width: 5.3rem;
    max-height: 9rem;
    padding-bottom: 0.5rem;
    border-radius: 0.4rem;
    position: absolute;
    top: 2.42rem;
    left: 1.1rem;
    background: #fff;
    text-align: center;
    .top-bar {
      width: 5.3rem;
      height: 1.42rem;
      border-radius: 0.4rem 0.4rem 0 0;
      background: url("./lottery/prizing.jpg") no-repeat;
      line-height: 1.42rem;
      color: #fff;
      font-size: 0.64rem;
      font-weight: bolder;
      font-family: cursive, Helvetica Neue, Helvetica, PingFang SC;
      background-position: top center;
      background-size: 100% 100%;
    }
    .oneBar {
      width: 1.18rem;
      height: 0.46rem;
      position: absolute;
      top: -0.1rem;
      right: 1.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      padding: 0 0.1rem;
      font-size: 0.3rem;
      color: #707070;
      font-weight: 600;
      margin: 0.52rem auto 0.2rem;
    }
    .info {
      padding-bottom: 0.2rem;
      font-size: 0.24rem;
      color: #666;
    }
    .proImg img {
      max-width: 2.8rem;
    }
    .inputphone {
      input {
        width: 3.7rem;
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 0.3rem;
        text-align: center;
        border: 1px solid #ccc;
      }
    }
    .btn {
      width: 3.7rem;
      height: 0.9rem;
      margin: 0.2rem auto;
      background: url("./lottery/btn.png") no-repeat;
      background-size: 100%;
      text-align: center;
      a {
        font-size: 0.36rem;
        color: #fff;
        line-height: 0.9rem;
        text-align: center;
        font-weight: 600;
      }
    }
  }
}
.imgMargin {
  margin: 0.8rem 0 0;
}
</style>
