<template>
  <div>
    <div class="bg">
      <img
        src="./imgs/bg.jpg"
        alt
      >
    </div>
    <div class="main">
      <div class="point">
        <img
          src="./imgs/BTN_CLIK.png"
          @click="doLettery"
        >
      </div>
      <div class="rule-content">
        <div class="rule">
          <img
            src="./imgs/rule.jpg"
            alt
          >
        </div>
        <div
          class="txt"
          v-html="act.detail||'暂无说明'"
        >
          <!-- <span>1</span>.参与用户：首次登陆员工E家福利社的用户。
          <br>
          <span>2</span>
          .活动礼品：
          <br>惊喜大礼包：40元猫眼电影券1张 或 爱奇艺会员月卡1张。
          <br>惊喜彩蛋：iPhone XS max 64G一台（中奖率0.05%）
          <br>
          <span>3</span>.彩蛋形式：用户领取完惊喜大礼包后，页面自动弹出惊喜彩蛋，用户点击惊喜彩蛋，用户点击拆开彩蛋即获得奖励。中奖用户将从所有首次登录的用户名单中选取。
          <br>
          <span>4</span>.领取有效期：一个月
          <br>
          <span>5</span>.领取方式：惊喜大礼包获得奖励用户可在“我的订单”中查看并提取卡密，到相应APP中兑换；惊喜彩蛋奖励请与客服联系领取奖励。
          <br>
          <span>6</span>.惊喜彩蛋的发放：客服核实确实为中奖用户后，登记用户姓名、手机号、身份证号及邮寄地址，通过邮寄方式发放奖励。
          <br>-->
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        class="dialog"
        v-if="openDialog"
      >
        <div class="join">
          <div class="close">
            <img
              src="./imgs/BTN_BACK.png"
              @click="openDialog = false"
              alt
            >
          </div>
          <div class="wrapper">
            <div class="result">
              <img
                :src="prizeFirst.standardImgUrl||'//static.lianhaikeji.com/lib/imgs/default.jpg'"
                alt
              >
            </div>
            <div class="message"></div>
            <div
              class="btn"
              @click="receive"
            ></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        class="dialogCD"
        v-if="cadanDialog"
      >
        <div class="join">
          <div class="close">
            <img
              src="./imgs/BTN_BACK.png"
              alt
              @click="cadanDialog = false"
            >
          </div>
          <div class="wrapper">
            <div class="result egg">
              <img
                src="./imgs/jindan.png"
                alt
              >
            </div>
            <div
              class="message egg"
              v-html="msg"
            >{{msg}}</div>
            <div
              class="btn open"
              @click="open"
            ></div>
            <div class="chance">
              <div></div>
              <span>活动规则</span>
              <div></div>
            </div>
            <div class="rule">1.领取彩蛋奖励后，用户可到“我的订单”中查看。
              <br>2.领取彩蛋奖励请与客服联系。
              <br>3.客服电话：4009626962
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        class="dialogCD"
        v-if="prizeDialog"
      >
        <div class="join">
          <div class="close">
            <img
              src="./imgs/BTN_BACK.png"
              alt
              @click="prizeDialog = false"
            >
          </div>
          <div class="wrapper">
            <div class="result">
              <img
                :src="prizeCD.standardImgUrl||'//static.lianhaikeji.com/lib/imgs/default.jpg'"
                alt
              >
            </div>
            <div class="prizeName">{{prizeCD.prizeName}}</div>
            <div
              class="message"
              v-html="msg"
            >{{msg}}</div>
            <div
              class="btn"
              @click="closePrize"
            ></div>
            <div class="chance">
              <div></div>
              <span>活动规则</span>
              <div></div>
            </div>
            <div class="rule">1.领取彩蛋奖励后，用户可到“我的订单”中查看。
              <br>2.领取彩蛋奖励请与客服联系。
              <br>3.客服电话：4009626962
            </div>
          </div>
        </div>
      </div>
    </transition>
    <MessageModal
      v-model="payloadModal"
      @pay-for-chance="payForChance"
      :act="{noBus: true}"
    ></MessageModal>
  </div>
</template>

<script>
import MessageModal from '@/components/lotteryModal/MessageModal';
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    MessageModal
  },
  data () {
    return {
      actIdArr: [544685342, 544685597], // pro
      // actIdArr: [544540278, 544540742], // dev
      openDialog: false,
      prizeFirst: {},
      prizeCD: {},
      payloadModal: {},
      prepayId: '',
      chances: 0,
      payUrl: payUrl,
      firstLetterySucc: false,
      timer: null,
      msg: '少侠看你骨骼清奇~<br/>这枚super彩蛋就送你了',
      prizeDialog: false,
      cadanDialog: false
    };
  },
  methods: {
    payForChance () {
      let successUrl = `${window.location.protocol}//${window.location.host}/${
        this.$store.state.merchantAppid
      }/merchant/index/act/${this.actIdArr[0]}`;
      Toast('订单已生成...正在跳转支付');
      let payUrl = `${this.payUrl}${
        this.prepayId
      }?redirectUrl=${encodeURIComponent(successUrl)}`;
      window.location.href = payUrl;
    },
    openMessage (payload) {
      this.payloadModal = payload;
    },
    closePrize () {
      this.prizeDialog = false;
      Toast('领取成功啦');
    },
    open () {
      this.cadanDialog = false;
      this.prizeDialog = true;
    },
    receive () {
      this.openDialog = false;
      if (this.prizeCD.proType && this.prizeCD.proType != 8) {
        this.cadanDialog = true;
      }
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/order`
      );
    },
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.actIdArr[0],
        num: '1'
      });
      if (rs.status === 200) {
        this.prepayId = rs.payload.prepayId;
        rs.payload.keyward = 'showBuyChance';
        this.openMessage(rs.payload);
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async addChance (actId) {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + actId);
      if (rs.status === 200) {
        if (actId == this.actIdArr[0]) {
          this.chances = rs.payload.chances;
        }
      }
      Indicator.close();
    },
    async doLettery () {
      if (this.chances < 1) {
        this.buyChance();
        return;
      }
      await this.lettery(this.actIdArr[0], this.prizeFirst);
      if (this.firstLetterySucc) {
        await this.lettery(this.actIdArr[1], this.prizeCD);
        this.openDialog = true;
      }
    },
    async lettery (actId, prize) {
      Indicator.open();
      let rs = await this.$post('api/lottery_draw', {
        actId: actId
      });
      if (rs.status === 200) {
        Object.assign(prize, rs.payload);
        this.firstLetterySucc = true;
      } else {
        if (actId == this.actIdArr[0]) {
          Toast(rs.error);
        }
        this.firstLetterySucc = false;
      }
      Indicator.close();
    }
  },
  created () {
    for (var i in this.actIdArr) {
      this.addChance(this.actIdArr[i]);
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.bg {
  text-align: center;
  font-size: 0;
}
.bg img {
  width: 100%;
}
.main {
  position: absolute;
  top: 5.2rem;
  width: 100%;
  text-align: center;
  font-size: 0;
  padding-bottom: 1.2rem;
  background: url(./imgs/zhuangshi.png) no-repeat 0 bottom;
  background-size: 3.13rem auto;
  .rule {
    position: relative;
    top: -0.33rem;
    width: 3.38rem;
    margin: 0 auto;
  }
  .rule img {
    width: 3.38rem;
  }
  .point img {
    width: 1.01rem;
    position: relative;
    animation: jump 1s infinite;
  }
  .rule-content {
    text-align: left;
    font-size: 0.26rem;
    color: rgb(244, 225, 167);
    margin: 2rem 0.3rem 0;
    border: 1px solid rgb(255, 235, 143);
    .txt {
      position: relative;
      padding: 0 0.2rem 0.4rem 0.2rem;
      line-height: 0.4rem;
      span {
        position: absolute;
        left: 0.2rem;
      }
    }
  }
}
@keyframes jump {
  0% {
    bottom: 0;
  }
  100% {
    bottom: 10px;
  }
}

.dialog,
.dialogCD {
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
.join {
  .btn {
    width: 2.96rem;
    height: 0.98rem;
    line-height: 0.8rem;
    margin: 0.2rem auto 0;
    font-size: 0.32rem;
    border-radius: 0.4rem;
    background: url(./imgs/receive.png) no-repeat;
    background-size: 100% 100%;
    &.open {
      background: url(./imgs/BTN_OPEN.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .close {
    text-align: right;
    img {
      margin: 0.2rem;
      width: 0.24rem;
    }
  }
}
.dialogCD {
  .join {
    position: relative;
    top: 1rem;
    margin: 0 auto;
    width: 5.28rem;
    height: 8.69rem;
    background: url(./imgs/caidan-bg.png) no-repeat;
    background-size: 100% auto;
    .wrapper {
      text-align: center;
      color: #fff;
    }
    .result {
      width: 3.95rem;
      margin: 0 auto;
      padding-bottom: 0.8rem;
      background: url(./imgs/bottom-circle1.png) no-repeat center bottom;
      background-size: 100% auto;
      img {
        width: 1.7rem;
      }
      &.egg {
        background: transparent;
        padding: 0;
        img {
          margin-top: -0.6rem;
          width: 3.55rem;
        }
      }
    }
    .prizeName {
      margin-top: -0.4rem;
      line-height: 0.48rem;
      font-weight: bold;
      font-size: 0.28rem;
    }
    .message {
      margin-top: 0.3rem;
      line-height: 0.4rem;
      &.egg {
        margin-top: -0.3rem;
      }
    }
  }
  .rule {
    text-align: left;
    padding: 0 0.6rem;
    line-height: 0.4rem;
    color: #fff;
  }
}
.dialog {
  .join {
    position: relative;
    top: 2.2rem;
    margin: 0 auto;
    width: 5.28rem;
    height: 5.7rem;
    background: url(./imgs/bg-small.png) no-repeat;
    background-size: 100% auto;
    .wrapper {
      text-align: center;
      color: #fff;
    }
    .btn {
      margin: 0 auto;
    }
    .result {
      width: 3.95rem;
      margin: 0 auto;
      padding-bottom: 0.6rem;
      background: url(./imgs/bottom-circle.png) no-repeat center bottom;
      background-size: 100% auto;
      img {
        margin-top: 0.6rem;
        width: 1.97rem;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.chance {
  @include flex(row, nowrap, center, center);
  line-height: 0.3rem;
  padding: 0.28rem 0;
  color: #fff;
  div {
    width: 1.32rem;
    border-bottom: 1px solid #fff;
  }
  span {
    padding: 0 0.2rem;
    font-size: 0.3rem;
    white-space: nowrap;
  }
}
</style>
