<template>
  <div>
    <div class="bgj-sign">
      <div class="bg">
        <img src="./imgs/IMG_BG.jpg" />
      </div>
      <div class="bgj-main">
        <div class="sign-bar">
          <div class="doSign-btn" @click="doSign">
            <img v-show="!isSigned" src="./imgs/doSign-btn.png" alt />
            <img v-show="isSigned" src="./imgs/doSign-btn-no.png" alt />
          </div>
          <div class="sign-title">
            <!-- 每天签到送<span>5</span>个金币<br />
            每年最多可获得<span>500</span>枚金币-->
          </div>
          <div class="sign-activity">
            <div class="sign-count">
              <div v-for="(item,index) in  arr" :key="'num' + index">
                <div v-if=" signed.indexOf(String(item.day)) >= 0 " class="active">
                  <span>{{item.day}}</span>
                  <span class="span-bot">{{toDay==item.day?"今天":item.textDay}}</span>
                </div>
                <div v-else>
                  <span>{{item.day}}</span>
                  <span class="span-bot">{{toDay==item.day?"今天":item.textDay}}</span>
                </div>
              </div>
            </div>
            <div class="sign-getter" v-for="(prize,ind) in prizeList" :key="ind" v-if="prize.signPrize.signTimes==7">
              <div class="text">
                连续签到7日
                <span>可另外获得2个金币</span>
              </div>
              <!-- <div class="sign-linten">
                <img :src="prize.signPrize.prizeImg||'//static.lianhaikeji.com/lib/imgs/default.jpg'">
              </div>-->
              <!-- <div class="sign-fm" v-html="prize.signPrize.prizeName"></div> -->
              <div class="sign-receive" v-if="prize.drawState==1" @click="getPrize(prize)">领取</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==2">已领取</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==3">未满足</div>
              <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==4">已抢完</div>
            </div>
            <div class="rules-warp">
              <div class="rules" @click="showObj">
                <img src="./imgs/IMG_HDGZ.png" alt />
              </div>
              <div class="main" v-html="act.detail||'暂无说明'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import moment from 'moment';
import { payUrl } from '@/config/';
import getTimes from './js/times';

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
      arr: [],
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
      signed: [],
      isNeedPay: '',
      toDay: '' // 当前时间
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
        actId: this.act.actId,
        starDate: moment(getTimes.thsiWeekFirstDay).format('YYYY-MM-DD')
      });
      if (rs.status == 200) {
        this.isSigned = rs.payload.isSigned;
        this.signTimeArry = rs.payload.signTimeArry;
        rs.payload.signDateArry.forEach(item => {
          this.signed.push(item.substring(8, 10));
        });
        console.log(this.signed.indexOf(this.arr[0].day + ''));
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
    },
    generateTimes () {
      var week = getTimes.init().getWeekType();
      var date = new Date();
      this.toDay = date.getDate();
      week.forEach((item, index) => {
        var textDay;
        switch (index) {
          case 0:
            textDay = '周一';
            break;
          case 1:
            textDay = '周二';
            break;
          case 2:
            textDay = '周三';
            break;
          case 3:
            textDay = '周四';
            break;
          case 4:
            textDay = '周五';
            break;
          case 5:
            textDay = '周六';
            break;
          case 6:
            textDay = '周日';
            break;
        }
        this.arr.push({
          day: item,
          textDay: textDay
        });
      });
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
    this.generateTimes();
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
    top: 2.5rem;
    // padding: 0 0.28rem;
    .sign-bar {
      .doSign-btn {
        width: 2.34rem;
        height: 2.34rem;
        margin: 0 auto;
        margin-bottom: 0.2rem;
        img {
          width: 100%;
        }
      }
      .sign-title {
        margin: 0 auto;
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.36rem;
        color: #fff;
        span {
          color: #ffc459;
          font-size: 0.28rem;
          padding: 0 0.05rem;
        }
      }
      .sign-activity {
        position: relative;
        margin: 0 auto;
        margin-top: 0.22rem;
        width: 7.44rem;
        height: 10.36rem;
        background: url("./imgs/IMG_QD.png") no-repeat;
        background-size: 100% 100%;
        .sign-count {
          position: absolute;
          top: 0.54rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          height: 0.96rem;
          width: 6.35rem;
          display: flex;
          margin-top: 0.3rem;
          // flex-direction: row-reverse;
          > div {
            flex: 1;
            margin: 0 0.07rem;
            div {
              width: 100%;
              height: 0.96rem;
              color: #fff;
              background: url("./imgs/BTN_orange_H.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              span {
                padding-top: 0.15rem;
                font-weight: bold;
                font-size: 0.32rem;
                display: block;
                text-align: center;
              }
              .span-bot {
                position: absolute;
                font-weight: normal;
                width: 100%;
                bottom: 0;
                display: block;
                line-height: 0.4rem;
                color: #999999;
                // padding-top: .2rem;
                font-size: 0.22rem;
              }
              &.active {
                background: url("./imgs/BTN_PURPLE_N.png") no-repeat;
                background-size: 100% 100%;
              }
            }
            &.todayactive {
              .span-bot {
                color: #ff487c;
              }
            }
          }
        }
        .sign-getter {
          background: url(./imgs/continuity-bg.png) no-repeat center;
          background-size: 100%;
          position: absolute;
          top: 2.3rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 6.55rem;
          height: 1.59rem;
          @include flex(row, nowrap, space-between, center);
          .text {
            margin-left: 1.5rem;
            font-size: 0.3rem;
            color: #fff;
            span {
              margin-top: 0.1rem;
              display: block;
              font-size: 0.26rem;
            }
          }
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
            margin-right: 0.43rem;
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
        position: absolute;
        top: 4.7rem;
        left: 0;
        right: 0;
        width: 6.54rem;
        margin: 0 auto;
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
