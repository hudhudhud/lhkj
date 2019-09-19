<template>
  <div>
    <back></back>
    <div class="bgj-sign">
      <div class="bg">
        <img src="./imgs/IMG_BG.jpg" alt>
      </div>
      <div class="bgj-main">
        <div class="sign-bar">
          <div class="sign-title">
            <!-- 早日晋升银行大亨<br />
            每日签到送<span>5</span>枚CC币，每年最多可获得500枚CC币 -->
          </div>
          <div class="sign-activity">
            <div class="sign-count">
              <div v-for="(item,index) in  arr" :key="'num' + index">
                <div v-if="item==signedTotal+1 && !isSigned" @click="doSign" class="todayactive">
                  <span>次数</span>
                  <span>{{item}}</span>
                  <span class="span-bot">未签到</span>
                </div>
                <div v-else-if="item< signedTotal+1 " class="active">
                  <span>次数</span>
                  <span>{{item}}</span>
                  <span class="span-bot">已签到</span>
                </div>
                <div v-else>
                  <span>次数</span>
                  <span>{{item}}</span>
                  <span class="span-bot">未开始</span>
                </div>
              </div>
            </div>
            <!-- <div class="sign-getter" v-for="(prize,ind) in prizeList" :key="'prize'+ind">
              <div class="sign-linten">
                <img src="./imgs/ICON_CCB.png" alt="">
              </div>
              <div class="sign-fm">
                连续签到七日
                <span>10枚CC币</span>
              </div>
              <div class="sign-receive" @click="getPrize(prize)">领取</div>
            </div> -->
            <div class="sign-getter" v-for="(prize,ind) in prizeList" :key=ind v-if="prize.signPrize.signTimes == 7">
              <div class="sign-linten">
                <img :src="prize.signPrize.prizeImg||'//static.lianhaikeji.com/lib/imgs/default.jpg'">
              </div>
              <div class="sign-fm" v-html="prize.signPrize.prizeName"></div>
              <div class="sign-receive" v-if="prize.drawState==1" @click="getPrize(prize)">领取</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==2">已领取</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==3">未满足</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==4">已抢完</div>
            </div>
          </div>
          <div class="rules-warp">
            <div class="rules" @click="showObj">
              <img src="./imgs/IMG_HDGZ.png" alt>
            </div>
            <div class="main" v-html="act.detail||'暂无说明'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      allclick: false,
      arr: [1, 2, 3, 4, 5, 6, 7],
      count: 0,
      day: 3,
      isSigned: false,
      signTimeArry: {},
      accumulative: [],
      continuity: 0,
      payUrl: payUrl,
      prizeList: [],
      resetPeriods: {
        '0': '',
        '1': '本周',
        '2': '本月',
        '3': '每日'
      },
      valuationType: '',
      isNeedPay: ''
    };
  },
  computed: {
    signedTotal () {
      if (this.prizeList.length > 0) {
        let continuity = this.signTimeArry['4'].continuity % 7;
        return this.isSigned && continuity == 0 ? 7 : continuity;
      }
    }
  },
  methods: {
    async doSign () {
      Indicator.open();
      let rs = await this.$post('api/signIn/signIn', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        if (this.valuationType) {
          MessageBox.confirm(
            `是否花费${rs.payload.actualPrice}元购买一次签到机会?`
          ).then(action => {
            let successUrl = window.location.href;
            Toast('订单已生成...正在跳转支付');
            let payPath = `${payUrl}${
              rs.payload.prepayId
            }?redirectUrl=${encodeURIComponent(successUrl)}`;
            window.location.replace(payPath);
          });
        } else {
          this.isSigned = true;
          this.prizeList.forEach(item => {
            if (item.signPrize.signTimes == 1) {
              this.getPrize(item);
            }
          });
          Toast('签到成功');
          this.loadSignState();
          this.loadPrizeList();
        }
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async sign () {
      Indicator.open();
      let rs = await this.$post('api/signIn/signIn', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.isSigned = true;
        Toast('签到成功');
        this.loadSignState();
        this.loadPrizeList();
      } else {
        Toast(rs.error);
      }
      Indicator.close();
      this.day = this.day + 1;
    },
    async getPrize (prize) {
      Indicator.open();
      let rs = await this.$post('api/signIn/addSignPrizeDraw', {
        actId: this.act.actId,
        signPrizeId: prize.signPrize.id
      });
      if (rs.status == 200) {
        if (this.isNeedPay == 0) {
          Toast('领取成功');
          prize.drawState = 2;
        } else if (this.isNeedPay == 1) {
          MessageBox.confirm(
            `是否花费${rs.payload.actualPrice}元购买奖品?`
          ).then(action => {
            let successUrl = window.location.href;
            Toast('订单已生成...正在跳转支付');
            let payPath = `${payUrl}${
              rs.payload.prepayId
            }?redirectUrl=${encodeURIComponent(successUrl)}`;
            window.location.replace(payPath);
          });
        }
        // Toast('领取成功');
        // prize.drawState = 2;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async loadSignState () {
      let rs = await this.$post('api/signIn/getTodaySignState', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.isSigned = rs.payload.isSigned;
        this.signTimeArry = rs.payload.signTimeArry;
        // this.getNumList(1)
        // this.continuity = rs.payload.signTimeArry.continuity;
      } else {
        Toast(rs.error);
      }
    },
    async loadAct () {
      let rs = await this.$get('api/getActDetails/' + this.setting.actId);
      if (rs.status == 200) {
        this.act = rs.payload;
        this.valuationType = rs.payload.valuationType;
      } else {
        Toast(rs.error);
      }
    },
    async loadPrizeList () {
      let rs = await this.$post('api/signIn/querySignPrizeForCus', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.prizeList = rs.payload;
        this.isNeedPay = rs.payload[0].signPrize.isNeedPay;
      } else {
        Toast(rs.error);
      }
    },
    showObj () {
      console.log(this.prizeList);
    }
  },
  watch: {
    day: function (newday) {
      if (newday == 7) {
        this.allclick = true;
      }
    }
  },

  async created () {
    Indicator.open();
    this.valuationType = this.act.valuationType;
    await this.loadSignState();
    this.loadPrizeList();
    Indicator.close();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.bgj-sign {
  position: absolute;
  width: 100%;
  height: 100%;
  .bg {
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .bgj-main {
    position: absolute;
    width: 100%;
    top: 3.36rem;
    // padding: 0 0.28rem;
    .sign-bar {
      .sign-title {
        margin: 0 auto;
        text-align: center;
        font-size: 0.24rem;
        color: #fff;
        span {
          color: #fbda30;
          font-size: 0.28rem;
          font-weight: bold;
        }
      }
      .sign-activity {
        position: relative;
        margin: 0 auto;
        margin-top: 0.22rem;
        width: 7.4rem;
        height: 4.14rem;
        background: url("./imgs/IMG_QD.png") no-repeat;
        background-size: 100% 100%;
        .sign-count {
          position: absolute;
          top: 0.34rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          height: 1.5rem;
          width: 6.35rem;
          display: flex;
          // flex-direction: row-reverse;
          > div {
            flex: 1;
            margin: 0 0.07rem;
            div {
              width: 100%;
              height: 1.5rem;
              color: #fff;
              background: url("./imgs/BTN_orange_H.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              span {
                padding-top: 0.25rem;
                font-size: 0.24rem;
                display: block;
                text-align: center;
              }
              .span-bot {
                position: absolute;
                width: 100%;
                bottom: 0;
                display: block;
                line-height: 0.4rem;
                color: rgb(135, 102, 254);
                // padding-top: .2rem;
                font-size: 0.22rem;
              }
              &.active {
                background: url("./imgs/BTN_PURPLE_N.png") no-repeat;
                background-size: 100% 100%;
              }
              &.todayactive {
                animation: myfirst 2s infinite;
                background: url("./imgs/BTN_PURPLE_N.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
        .sign-getter {
          position: absolute;
          top: 2.74rem;
          left: 0.74rem;
          width: 5.4rem;
          // height: 1.04rem;
          @include flex(row, nowrap, flex-start, center);
          .sign-linten {
            img {
              width: 0.84rem;
            }
          }
          .sign-fm {
            flex: 1;
            padding: 0 0.3rem;
            font-size: 0.32rem;
            // line-height: 0.34rem;
            color: rgb(51, 51, 51);
            span {
              padding-top: 0.1rem;
              color: rgb(235, 72, 0);
              font-size: 0.28rem;
              display: block;
            }
          }
          .sign-receive {
            width: 1.4rem;
            height: 0.52rem;
            background: url(./imgs/LQ_BTNON.png) no-repeat;
            background-size: 100% 100%;
            color: #fff;
            text-align: center;
            line-height: 0.52rem;
            font-size: 0.28rem;
            &.sign-item-btn-dis {
              background: url(./imgs/LQ_BTNOFF.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .rules-warp {
        width: 6.95rem;
        margin: 0 auto;
        margin-top: 0.58rem;
        background: url(./imgs/IMG_BG_QDG.png) no-repeat;
        background-size: 100% 100%;
        padding-bottom: 0.3rem;
      }
      .rules {
        padding-top: 0.26rem;
        text-align: center;
        img {
          width: 1.96rem;
        }
      }
      .main {
        width: 6.54rem;
        margin: 0 auto;
        margin-top: 0.18rem;
        padding: 0.3rem;
        text-align: left;
        font-size: 0.28rem;
        color: rgb(28, 112, 221);
        background-color: rgb(249, 244, 255);
        border-radius: 0.1rem;
        line-height: 0.46rem;
      }
    }
  }
}
@keyframes myfirst {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
