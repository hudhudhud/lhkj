<template>
  <div>
    <div class="bgj-sign">
      <div class="bg">
        <img src="./imgs/IMG_BG.png" alt>
      </div>
      <div class="bgj-main">
        <div class="sign-bar">
          <div class="sign-title">
            点击电池签到
            <span>7</span>次可领取奖品哦～
          </div>
          <div class="sign-activity">
            <div class="sign-count">
              <div v-for="(item,index) in  arr" :key="'num' + index">
                <div v-if="item==signedTotal+1 && !isSigned" @click="doSign" class="todayactive">
                  <span>次数</span>
                  <span>{{item}}</span>
                </div>
                <div v-else-if="item< signedTotal+1 " class="active">
                  <span>次数</span>
                  <span>{{item}}</span>
                </div>
                <div v-else>
                  <span>次数</span>
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="sign-getter" v-for="(prize,ind) in prizeList" :key="'prize'+ind">
              <div class="sign-linten">
                <img
                  :src="prize.signPrize.prizeImg||'//static.lianhaikeji.com/lib/imgs/default.jpg'"
                >
              </div>
              <div class="sign-fm" v-html="prize.signPrize.prizeName"></div>
              <div class="sign-receive" v-if="prize.drawState==1" @click="getPrize(prize)">领取</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==2">已领取</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==3">未满足</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==4">已抢完</div>
            </div>
          </div>
          <div class="rules">
            <img src="./imgs/IMG_HDGZ.png" alt>
          </div>
          <div class="main" v-html="act.detail||'暂无说明'"></div>
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
        return this.signTimeArry[this.prizeList[0].signPrize.resetPeriod]
          .accumulative;
      }
    }
  },
  methods: {
    async doSign () {
      Indicator.open();
      let rs = await this.$post('api/signIn/signIn', {
        actId: this.act.actId
      });
      console.log('rsrs', rs);
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
        this.continuity = rs.payload.signTimeArry.continuity;
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
    top: 3.56rem;
    padding: 0 0.28rem;
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
        margin-top: 0.28rem;
        height: 4.32rem;
        background: url("./imgs/IMG_CD.png") no-repeat;
        background-size: 100% 100%;
        .sign-count {
          position: absolute;
          top: 0.19rem;
          left: 0.7rem;
          height: 1.52rem;
          width: 5.52rem;
          display: flex;
          flex-direction: row-reverse;
          div {
            flex: 1;
            margin: 0 0.05rem;
            div {
              width: 100%;
              height: 1.52rem;
              color: #fff;
              background: url("./imgs/BTN_PURPLE_N.png") no-repeat;
              background-size: 100% 100%;
              span {
                padding-top: 0.25rem;
                font-size: 0.24rem;
                display: block;
                text-align: center;
              }
              &.active {
                background: url("./imgs/BTN_orange_H.png") no-repeat;
                background-size: 100% 100%;
              }
              &.todayactive {
                animation: myfirst 2s infinite;
                background: url("./imgs/BTN_YELLOW_H.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
        .sign-getter {
          position: absolute;
          top: 2.82rem;
          left: 0.74rem;
          width: 5.4rem;
          // height: 1.04rem;
          @include flex(row, nowrap, flex-start, center);
          .sign-linten {
            img {
              width: 1.04rem;
            }
          }
          .sign-fm {
            flex: 1;
            padding: 0 0.3rem;
            font-size: 0.28rem;
            line-height: 0.34rem;
            color: rgb(51, 51, 51);
            span {
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
      .rules {
        margin-top: 0.88rem;
        text-align: center;
        img {
          width: 1.96rem;
        }
      }
      .main {
        padding: 0.3rem;
        text-align: left;
        font-size: 0.28rem;
        color: #fff;
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
