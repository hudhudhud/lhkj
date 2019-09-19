<template>
  <div>
    <div class="bgj-sign">
      <cbbHeader title="签到"></cbbHeader>
      <div class="bg">
        <img
          src="./imgs/ICON_BG.png"
          alt
        >
      </div>
      <div class="bgj-main">
        <div class="sign-bar">
          <div class="sign-detail">
            <div class="num">
              <b>{{signTimeArry[0].accumulative}}</b>
              <div>累计签到天数</div>
            </div>
            <div
              class="sign-btn"
              v-if="isSigned"
            >已签到</div>
            <div
              class="sign-btn"
              @click="sign"
              v-else
            >签到</div>
            <div class="num">
              <b>{{bgjTotal}}</b>
              <div>累计八桂金</div>
            </div>
          </div>
          <div class="sign-title">
            <div>
              每日签到可获得
              <b>1</b>个八桂金
            </div>
            <div class="green-txt">自然年内最多可获得5个八桂金</div>
          </div>
        </div>
        <div
          class="bgj-getter"
          v-for="(prize,ind) in prizeList"
          :key="'prize'+ind"
          v-if="prize.signPrize.resetPeriod!=3"
        >
          <div class="record-item">
            <img
              :src="prize.signPrize.prizeImg||'//static.lianhaikeji.com/lib/imgs/default.jpg'"
              alt
            >
            <div class="flex-left">
              <div class="orginal-act">{{prize.signPrize.prizeName}}&nbsp;X&nbsp;{{prize.signPrize.prizeNum}}</div>
              <div class="expire-date">
                <template v-if="prize.signPrize.signType==1">{{resetPeriods[prize.signPrize.resetPeriod]}}连续签到{{prize.signPrize.signTimes}}天可领取</template>
                <template v-if="prize.signPrize.signType==2">{{resetPeriods[prize.signPrize.resetPeriod]}}累计签到{{prize.signPrize.signTimes}}天可领取</template>
                <template v-if="prize.signPrize.signType==3 && prize.signPrize.signDate">在{{prize.signPrize.signDate.substr(0,10)}}签到可领取</template>
              </div>
            </div>
            <div class="flex-right">
              <div
                class="sign-item-btn"
                v-if="prize.drawState==1"
                @click="getPrize(prize)"
              >领取</div>
              <div
                class="sign-item-btn sign-item-btn-dis"
                v-if="prize.drawState==2"
              >已领取</div>
              <div
                class="sign-item-btn sign-item-btn-dis"
                v-if="prize.drawState==3"
              >未满足</div>
              <div
                class="sign-item-btn sign-item-btn-dis"
                v-if="prize.drawState==4"
              >已抢完</div>
            </div>
          </div>
          <div class="sign-counter">
            <div class="line"></div>
            <span class="txt">{{signType[prize.signPrize.signType]}}签到</span>
            <div class="sign-days">
              <div
                class="day-item"
                v-for="(item, index) in prize.numList"
                :key="'num'+index"
              >{{item}}</div>
              <span class="day">天</span>
            </div>

            <div class="line"></div>
          </div>
        </div>
        <div class="rule">
          <img
            src="./imgs/title.jpg"
            alt
          >
          <div class="txt">{{act.detail}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader';
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
      count: 0,
      list: [],
      bgjTotal: 0,
      doReceive: 0,
      isSigned: false,
      signTimeArry: {},
      accumulative: [],
      payUrl: payUrl,
      prizeList: [],
      signType: {
        '1': '连续',
        '2': '累计'
      },
      resetPeriods: {
        '0': '',
        '1': '本周',
        '2': '本月',
        '3': '每日'
      }
    };
  },
  methods: {
    async signHandler (prize) {
      await this.getPrize(prize);
      this.loadSignState();
      this.loadPrizeList();
      this.getUserPrizeCount();
    },
    async sign () {
      if (this.doReceive > 0) {
        Toast('您还有未领取的签到奖励，请先领取哦！');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/signIn/signIn', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.isSigned = true;
        Toast('签到成功');
        this.prizeList.forEach(prize => {
          if (prize.signPrize.resetPeriod == 3) {
            this.signHandler(prize);
          }
        });
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async getPrize (prize) {
      Indicator.open();
      let rs = await this.$post('api/signIn/addSignPrizeDraw', {
        actId: this.act.actId,
        signPrizeId: prize.signPrize.id
      });
      if (rs.status == 200) {
        Toast('领取成功');
        this.doReceive--;
        prize.drawState = 2;
        this.getUserPrizeCount();
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async doSign () {
      Indicator.open();
      let rs = await this.$post('api/signIn/signIn', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
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
      } else {
        Toast(rs.error);
      }
    },
    async getUserPrizeCount () {
      let rs = await this.$post('api/signIn/getUserPrizeCount', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.bgjTotal = rs.payload;
      }
    },
    async loadAct () {
      let rs = await this.$get('api/getActDetails/' + this.setting.actId);
      if (rs.status == 200) {
        this.act = rs.payload;
      } else {
        Toast(rs.error);
      }
    },
    getNumList (x) {
      let list = [];
      list.push(parseInt(x / 100));
      list.push(parseInt(x / 10) % 10);
      list.push(x % 10);
      return list;
    },
    async loadPrizeList () {
      let rs = await this.$post('api/signIn/querySignPrizeForCus', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        rs.payload.forEach(prize => {
          if (prize.signPrize.resetPeriod != 3) {
            prize['numList'] = this.getNumList(
              this.signTimeArry[prize.signPrize.resetPeriod].continuity
            );
            if (prize.drawState == 1) {
              this.doReceive += 1;
              console.log('doReceive' + this.doReceive);
            }
          }
        });

        this.prizeList = rs.payload;
      } else {
        Toast(rs.error);
      }
    }
  },
  components: {
    cbbHeader
  },
  async created () {
    Indicator.open();
    await this.loadSignState();
    this.loadPrizeList();
    this.getUserPrizeCount();
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
  font-size: 0;
  .bg {
    img {
      width: 100%;
    }
  }
  .bgj-main {
    position: absolute;
    width: 100%;
    top: 1.64rem;
    padding: 0 0.3rem;
    .sign-bar {
      div {
        margin: 0 auto;
        text-align: center;
        font-size: 0.26rem;
        color: #fff;
      }
      .sign-detail {
        @include flex(row, noWrap, center, center);
        margin-bottom: 0.7rem;
        .num {
          flex: 1;
          color: #fff;
          font-size: 0.96rem;
          div {
            margin-top: 0.1rem;
            font-size: 0.26rem;
          }
        }
        .sign-btn {
          width: 2.22rem;
          min-width: 2.22rem;
          height: 2.22rem;
          font-size: 0.44rem;
          line-height: 2.22rem;
          background: url(./imgs/ICON_QD.jpg) no-repeat;
          background-size: 100% 100%;
          &.off {
            background: url(./imgs/ICON_QD.jpg) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .sign-title {
        margin-top: 0.28rem;
        b {
          color: rgb(255, 183, 21);
          font-size: 0.3rem;
        }
        .green-txt {
          margin: 0.14rem 0 0.5rem;
          color: rgb(10, 109, 66);
        }
      }
    }
    .bgj-getter {
      background: url(./imgs/prize-bg.jpg) no-repeat;
      background-size: 100% auto;
      border-radius: 0.1rem;
      margin-top: 0.66rem;
      padding: 0 0.3rem 0.5rem;

      .record-item {
        @include flex(row, nowrap, flex-start, center);
        padding: 0.46rem 0 0.4rem;

        img {
          width: 0.96rem;
          margin-right: 0.22rem;
        }
        div {
          &.flex-left {
            flex: 1;
            @include flex(column, nowrap, flex-start, flex-start);
          }
          &.flex-right {
            color: #fff;
            font-size: 0.26rem;
            justify-content: flex-end;
            .sign-item-btn {
              width: 1.4rem;
              line-height: 0.54rem;
              background: rgb(45, 186, 125);
              border-radius: 0.3rem;
              text-align: center;
            }
            .sign-item-btn-dis {
              background: #ddd;
              color: #666;
            }
          }
          .orginal-act {
            font-size: 0.4rem;
            margin-top: 0.12rem;
          }
          .expire-date {
            margin-top: 0.16rem;
            font-size: 0.26rem;
            color: #999;
          }
        }
      }
      .sign-counter {
        @include flex(row, nowrap, flex-start, center);
        width: 86%;
        margin: 0 auto;
        line-height: 0.3rem;
        color: rgb(181, 181, 182);
        .line {
          flex: 1;
          border-bottom: 1px solid rgb(181, 181, 182);
        }
        .txt {
          padding: 0 0 0 0.2rem;
          font-size: 0.26rem;
          white-space: nowrap;
        }
        .sign-days {
          max-width: 40%;
          @include flex(row, nowrap, center, center);
          .day-item {
            width: 0.34rem;
            height: 0.44rem;
            line-height: 0.44rem;
            color: rgb(255, 130, 6);
            margin: 0 0.02rem;
            text-align: center;
            font-size: 0.34rem;
            background: rgb(255, 240, 208);
            font-family: "Franklin Gothic Medium", Arial, sans-serif;
            font-weight: bold;
            border-radius: 0.04rem;
          }
          span {
            // position: relative;
            top: 0.1rem;
            font-size: 0.22rem;
            margin: 0 0.2rem 0 0.04rem;
            color: rgb(181, 181, 182);
          }
        }
      }
    }
    .rule {
      width: 6.83rem;
      height: 2.83rem;
      background: url(./imgs/rule-bg.jpg) no-repeat;
      background-size: 100% auto;
      border-radius: 0.1rem;
      margin: 0.32rem auto 0;
      padding: 0.58rem 0.3rem 0;
      img {
        display: block;
        width: 3.86rem;
        margin: 0 auto 0.44rem;
      }
      .txt {
        color: rgb(34, 160, 103);
        font-size: 0.26rem;
        line-height: 0.36rem;
      }
    }
  }
}
</style>
