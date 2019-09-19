<template>
  <div class="sign">
    <div class="sign-band">
      <img class="sign-banner" :src="setting.banner">
      <img class="sign-btn" v-show="!isSigned" @click="doSign" :src="setting.btnOn">
      <img class="sign-btn" v-show="isSigned" :src="setting.btnSuccess">
      <!-- <div class="signed-days">累计签到:{{accumulative}}天</div> -->
    </div>
    <div class="sign-list">
      <div class="sign-list-title">签到奖励</div>
      <div class="sign-item" v-for="(prize,ind) in prizeList" :key="ind">
        <img
          class="sign-item-icon"
          :src="prize.signPrize.prizeImg||'//static.lianhaikeji.com/lib/imgs/default.jpg'"
        >
        <div class="sign-item-name">{{prize.signPrize.prizeName}}</div>
        <div class="sign-item-rule">
          <template v-if="prize.signPrize.signType==1">
            {{resetPeriods[prize.signPrize.resetPeriod]}}连续签到{{prize.signPrize.signTimes}}天可领取
            <p>已签到：{{signTimeArry[prize.signPrize.resetPeriod].continuity}}天</p>
          </template>
          <template v-if="prize.signPrize.signType==2">
            {{resetPeriods[prize.signPrize.resetPeriod]}}累计签到{{prize.signPrize.signTimes}}天可领取
            <p>已签到：{{signTimeArry[prize.signPrize.resetPeriod].accumulative}}天</p>
          </template>
          <template
            v-if="prize.signPrize.signType==3 && prize.signPrize.signDate"
          >在{{prize.signPrize.signDate.substr(0,10)}}签到可领取</template>
        </div>
        <div class="sign-item-btn" v-if="prize.drawState==1" @click="getPrize(prize)">可领取</div>
        <div class="sign-item-btn sign-item-btn-dis" v-if="prize.drawState==2">已领取</div>
        <div class="sign-item-btn sign-item-btn-dis" v-if="prize.drawState==3">未满足</div>
        <div class="sign-item-btn sign-item-btn-dis" v-if="prize.drawState==4">已抢完</div>
      </div>
    </div>
    <div class="sign-desc">
      <div class="sign-desc-title">活动规则:</div>
      <div class="sign-desc-detail" v-if="act" v-html="act.detail"></div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  props: ['setting', 'slotData'],
  data () {
    return {
      act: null,
      isSigned: false,
      signTimeArry: {},
      continuity: 0,
      prizeList: [],
      resetPeriods: {
        '0': '',
        '1': '本周',
        '2': '本月'
      },
      payUrl,
      valuationType: '',
      isNeedPay: ''
    };
  },
  methods: {
    async getPrize (prize) {
      Indicator.open();
      let rs = await this.$post('api/signIn/addSignPrizeDraw', {
        actId: this.setting.actId,
        signPrizeId: prize.signPrize.id
      });
      console.log('actualPrice', rs.actualPrice);
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
        actId: this.setting.actId
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
    async loadSignState () {
      let rs = await this.$post('api/signIn/getTodaySignState', {
        actId: this.act.actId
      });

      if (rs.status == 200) {
        this.isSigned = rs.payload.isSigned;
        this.signTimeArry = rs.payload.signTimeArry;
        this.continuity = rs.payload.signTimeArry.continuity;
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
        console.log('rsrsrs', this.isNeedPay);
      } else {
        Toast(rs.error);
      }
    }
  },
  async created () {
    Indicator.open();
    await this.loadAct();
    if (this.act) {
      await this.loadSignState();
      this.loadPrizeList();
    }
    Indicator.close();
  }
};
</script>

<style scoped>
.sign {
  position: relative;
}
.sign-band {
  position: relative;
}
.sign-banner {
  position: relative;
  display: block;
  width: 100%;
}
.sign-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 1.6rem;
}
.signed-days {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  line-height: 30px;
  font-size: 14px;
  color: #fff;
}
.sign-list {
  background: #fff;
}
.sign-list-title {
  position: relative;
  line-height: 1rem;
  padding: 0 0.3rem;
}
.sign-list-title:after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #e2e2e2;
  transform: scaleY(0.5, 0.5);
}
.sign-desc-title {
  padding: 0.3rem;
  font-size: 14px;
}
.sign-desc-detail {
  padding: 0 0.5rem;
  color: #666;
}
.sign-item {
  position: relative;
  height: 1.8rem;
}
.sign-item:after {
  content: " ";
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0.3rem;
  border-bottom: 1px solid #e2e2e2;
}
.sign-item:last-child:after {
  display: none;
}
.sign-item-icon {
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 50%;
}
.sign-item-btn {
  position: absolute;
  top: 50%;
  right: 0.3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-top: -0.3rem;
  padding: 0 0.3rem;
  border-radius: 0.1rem;
  font-size: 14px;
  background: #ff8038;
  color: #fff;
}
.sign-item-btn-dis {
  background: #ddd;
  color: #666;
}
.sign-item-name {
  margin: 0 2rem;
  font-size: 16px;
  color: #000;
  padding-top: 0.4rem;
  line-height: 0.4rem;
}
.sign-item-rule {
  margin: 0 2rem;
  line-height: 0.5rem;
  font-size: 14px;
  color: #666;
}
.sign-item-rule p {
  line-height: 1;
}
</style>
