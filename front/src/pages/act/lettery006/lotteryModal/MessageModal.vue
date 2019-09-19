<template>
  <div>
    <div
      class="massage"
      v-show="prizeInfoShow"
      @click="closePrize"
    >
      <!-- 抽中奖品 -->
      <div
        class="havePrize current-prize-dialog prize"
        v-if="havePrizeShow"
      >
        <img
          class="close"
          src="./imgs/close.png"
          alt
          @click="closeOrOpen('prizeInfoShow', 'showPrize',false);
"
        >
        <!-- 抽奖结果 -->
        <div class="modal-main">
          <div
            class="gratulation"
            style="padding-top: 1.1rem;"
          >
            恭喜您获得{{payload.prizeName}}
            <span v-if="payload.proType == 10">手机一台</span>
          </div>
          <!--  <div
            v-if="payload.proType == 10"
            class="infoText"
            style="fontSize:0.24rem"
          >两个工作日内会有客服人员跟您联系安排邮寄奖品，<br />请确认领奖手机号是否正确。</div>
          <div
            class="infoText"
            v-else
          >请使用微信绑定广东建行<br />
          储蓄卡/信用卡后支付<span>0.01元</span>领取奖品</div>-->
        </div>
        <div class="btn-wrap">
          <div
            class="btn"
            @click="reBuy('youhui10')"
          ></div>
          <div
            class="btn second"
            @click="reBuy('youhui3')"
          ></div>
        </div>
      </div>
      <!--支付后抽中奖品 -->
      <div
        class="havePrize current-prize-dialog"
        v-if="payPrizeShow"
      >
        <img
          class="close"
          src="./imgs/close.png"
          alt
          @click="closeOrOpen('prizeInfoShow', 'payPrizeShow', false);
"
        >
        <!-- 抽奖结果 -->
        <div class="modal-main">
          <div class="gratulation">
            恭喜您获得{{payload.proStandardName}}
            <span v-if="payload.proType == 10">手机一台</span>
          </div>

          <div
            class="infoText"
            v-if="payload.proType == 10"
            style="fontSize:0.24rem"
          >
            两个工作日内会有客服人员跟您联系安排邮寄奖品，
            <br>请确认领奖手机号是否正确。
          </div>
          <div
            class="infoText"
            v-else
          >请到“我的奖品”查看并充值</div>
          <img
            class="share"
            @click="showShareGuide=true"
            src="./imgs/share.png"
            alt
          >
        </div>
        <div class="five">推荐好友可获得1次机会哦~</div>
      </div>
    </div>
    <!-- share guide -->
    <mt-popup
      style="background:transparent"
      v-model="showShareGuide"
      class="mypop"
      position="top"
      :closeOnClickModal="false"
      popup-transition="popup-fade"
    >
      <img
        style="width:3.8rem;margin-top: 0.5rem;margin-left:3rem"
        src="./imgs/guide.png"
        alt
      >
    </mt-popup>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import bus from '@/lib/eventBus';
import { payUrl } from '@/config/';

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
      console.log(val.keyward);
      this.payload = val;
      switch (val.keyward) {
        case 'showPrize':
          this.closeOrOpen('prizeInfoShow', 'havePrizeShow', true); // 弹出已中奖
          break;
        case 'showShareGuide':
          this.closeOrOpen('prizeInfoShow', 'showShareGuide', true); // 弹出已中奖
          break;
        case 'payPrizeShow':
          this.closeOrOpen('prizeInfoShow', 'payPrizeShow', true); // 弹出已中奖
          break;
        case 'showRules':
          this.closeOrOpen('prizeInfoShow', 'showRules', 'closeFlag', true);
          break;
        case 'showBuyChance':
          this.closeOrOpen('prizeInfoShow', 'buyChanceShow', 'closeFlag', true);
          break;
        case 'showCommitPhoneNum':
          this.closeOrOpen(
            'prizeInfoShow',
            'showCommitPhoneNum',
            'closeFlag',
            true
          );
          break;
      }
    }
  },
  data () {
    return {
      tel: this.$store.state.cust ? this.$store.state.cust.tel : '',
      payload: {},
      prizeInfoShow: false,
      buyChanceShow: false,
      havePrizeShow: false,
      showShareGuide: false,
      payPrizeShow: false,
      showCommitPhoneNum: false,
      showRules: false,
      payUrl: payUrl,

      closeFlag: false
    };
  },
  methods: {
    closePrize () {
      if (this.payPrizeShow) {
        this.closeOrOpen('prizeInfoShow', 'payPrizeShow', false);
      }
    },
    async reBuy (youhuiCode) {
      this.$indicator.open();
      let rs = await this.$post('/api/re_buy', {
        preferenceProduct: youhuiCode,
        orderCode: this.payload.orderCode,
        merchantId: this.$store.state.merchantId
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/order`;
        this.$toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        this.$toast('购买失败:' + rs.error);
      }
      this.$indicator.close();
    },
    payForChance () {
      bus.$emit('pay-for-chance');
    },
    lotterySure () {
      // this.$emit('charge')
      this.closeOrOpen('prizeInfoShow', 'havePrizeShow', false);
    },
    closeOrOpen () {
      // 消息开关
      const args = Array.from(arguments);
      var boolean = args.pop();
      var vm = this;
      args.forEach(function (item) {
        vm[item] = boolean;
      });
    },
    async commitCustomTel () {
      if (!this.tel) {
        Toast('请输入您的手机号');
      } else {
        let phoneReg = /^1[3456789]\d{9}$/;
        if (phoneReg.test(this.tel)) {
          let rs = await this.$post('api/check/act_limit', {
            account: this.tel,
            actId: this.act.actId
          });
          if (rs.status == 200) {
            // this.$emit('setAccount', this.tel)
            this.$emit('setAccount', this.tel);
            this.closeOrOpen('prizeInfoShow', 'showCommitPhoneNum', false);
          } else {
            Toast(rs.error);
          }
        } else {
          Toast('请输入正确的手机号');
        }
      }
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

  .close {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    top: -0.1rem;
    right: -0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .letteryRules {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
  }
  .havePrize {
    width: 6.95rem;
    height: 5.37rem;
    padding-bottom: 0.4rem;
    border-radius: 0.1rem;
    position: absolute;
    top: 0;
    left: -0.4rem;
    bottom: 0;
    right: 0;
    margin: auto;
    padding-left: 0.4rem;
    text-align: center;
    background: url(./imgs/prize-bg.png) no-repeat;
    background-size: 100% 100%;
    .gratulation {
      color: #b50029;
      font-size: 0.4rem;
      padding-top: 1.6rem;
      line-height: 0.6rem;
    }
    .infoText {
      line-height: 0.5rem;
      color: #333;
      span {
        color: rgb(249, 54, 53);
      }
    }
    .share {
      display: block;
      width: 5.54rem;
      margin: 0 auto;
    }
    .info {
      padding-top: 0.3rem;
      font-size: 0.24rem;
      color: #666;
    }
    .phone {
      width: 3.6rem;
      margin: 0.3rem auto 0;
      color: #b50029;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.56rem;
      border-radius: 0.4rem;
      border: 2px solid #b50029;
    }
    p {
      color: #5f3b34;
      padding-top: 0.3rem;
      font-size: 0.32rem;
      font-weight: bold;
      color: #b50029;
    }
    .five {
      position: absolute;
      text-align: center;
      bottom: 0.6rem;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 0.28rem;
    }
    .btn-wrap {
      display: flex;
      justify-content: center;
      margin: 8.2rem auto 0;
    }
    .btn {
      width: 2.8rem;
      height: 0.8rem;
      background: url("./imgs/btn2.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      a {
        font-size: 0.3rem;
        color: #fff;
        line-height: 0.76rem;
        text-align: center;
        font-weight: 600;
      }
    }
    .second {
      background: url("./imgs/btn1.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 0.2rem;
    }
  }
  .prize {
    width: 7.2rem;
    height: 11.5rem;
    background: url(./imgs/prize-new.png) no-repeat;
    background-size: 100% 100%;
  }
}
.current-prize-dialog,
.receive-success-dialog {
  .gratulation-pic {
    width: 6.02rem;
    height: 2.57rem;
    margin-top: -2.1rem;
  }
  .prizePic {
    /*   width: 3.86rem;
        height: 1.96rem;
        margin-bottom: 0.2rem; */
    max-width: 3.8rem;
    margin: 0.4rem 0;
  }
}
</style>
