<template>
  <div>
    <headerBar
      title="返场有礼"
      :bgColor="'#439af4'"
    ></headerBar>

    <div class="fudai">
      <div class="content">
        <div class="open-fudai">
          <img
            src="./imgs/fudaibutt.png"
            @click="lettery"
            alt
          >
          <p>您还有:{{chances}}次机会</p>
        </div>
        <div class="prize-type">
          <p>五福临门奖：享受1元充值50元话费</p>
          <p>福禄双全奖：享受1元充值20元话费</p>
          <p>一路福星奖：享受1元充值10元话费</p>
        </div>
        <div
          class="rule"
          @click="rule"
        >
          <img
            src="./imgs/rule2.jpg"
            alt=""
          >
          <div class="content2">
            <img
              src="./imgs/warning.jpg"
              alt=""
            >
            <span>活动规则</span>
          </div>
        </div>
      </div>
      <prize
        v-if="prizeShow"
        :bgUrl="bgUrl"
        :prize="prize"
        @pay="pay"
        @prize-out="prizeShow = false"
      ></prize>
    </div>
    <div
      class="fudai2"
      v-show="showFudai"
    >
      <img
        class="fu"
        src="./imgs/fu.jpg"
        alt=""
      >
      <img
        class="close"
        @click="changeNum"
        src="./imgs/close.jpg"
        alt=""
      >
      <div class="contentfu">
        <h1>活动规则</h1>
        <div
          v-html="act.detail"
          class="detail"
        >
        </div>
      </div>
    </div>
    <ActLink
      :linkPayload="act"
      :showOutLink="showOutLink"
      @close="showOutLink=false"
    ></ActLink>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar';
import OrderState from '@/lib/OrderState';
import prize from './components/prize';
import first from './imgs/first.png';
import second from './imgs/second.png';
import third from './imgs/third.png';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
import moment from 'moment';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      showOutLink: false,
      showFudai: false,
      prizeShow: false,
      bgUrl: third,
      prize: null,
      payUrl: payUrl,
      order: null,
      chances: 0,
      payChances: 0,
      canPay: false,
      latestPayTime: null,
      latestPayTimeFormatted: '',
      ...OrderState
    };
  },
  components: {
    headerBar,
    prize
  },
  methods: {
    async loadOrder () {
      Indicator.open();
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.act.actId,
        status: ''
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        let result = list.some(element => {
          if (element.payState == this.PAY_STATE_PAID) {
            this.order = element;
            console.log('order', element);
            return true;
          }
          if (element.payState == this.PAY_STATE_CREATE) {
            console.log('order', this.order);
            // 如果是未支付且 订单未取消,计算剩余时间
            if (
              element.orderState == this.ORDER_STATE_CREATE &&
              element.payState == this.PAY_STATE_CREATE
            ) {
              let expireTime = element.expireTime;
              this.latestPayTime = moment(expireTime).valueOf();
              this.calcPayTime();
            }
            if (this.canPay) {
              MessageBox({
                message: '您有未完成订单，是否进入?',
                title: '提示',
                showCancelButton: true,
                cancelButtonText: '放弃',
                confirmButtonText: '进入'
              }).then(action => {
                if (action == 'confirm') {
                  this.$router.push(
                    `/${this.$store.state.merchantAppid}/merchant/paysuccess/${
                      rs.payload.orderCode
                    }`
                  );
                }
              });
            }
            return true;
          }
        });
        console.log(result);
      }
      Indicator.close();
    },
    calcPayTime () {
      let d = (this.latestPayTime - new Date().getTime()) / 1000;
      let hour = parseInt(d / 3600);
      let minute = parseInt(parseInt(d % 3600) / 60);
      let second = parseInt(d % 60);
      this.latestPayTimeFormatted = `${hour}小时${minute}分${second}秒`;
      console.log(this.latestPayTimeFormatted);
      if (d > 0) {
        this.canPay = true;
        // this._expireInd = setTimeout(this.calcPayTime, 1000);
      } else {
        this.canPay = false;
      }
    },
    async pay () {
      Indicator.open();
      let rs = await this.$post('/api/re_buy', {
        orderCode: this.prize.orderCode,
        merchantId: this.$store.state.merchantId
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/order`;
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        Toast('购买失败:' + rs.error);
      }
      Indicator.close();
    },
    async addChance () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
      Indicator.close();
    },
    async lettery () {
      if (this.chances < 1) {
        Toast('您的抽奖机会已用尽');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/lottery_draw', {
        actId: this.act.actId,
        account: this.$store.state.cust.tel
      });
      if (rs.status === 200) {
        this.chances--;
        this.prize = rs.payload;
        switch (rs.payload.originalPrice) {
          case 50:
            this.bgUrl = first;
            break;
          case 20:
            this.bgUrl = second;
            break;
          case 10:
            this.bgUrl = third;
            break;
        }
        this.prizeShow = true;
        MessageBox({
          message:
            '抽奖后请尽快支付，放弃支付视为放弃奖品，支付失败请到我的订单查找。',
          title: '温馨提示',
          confirmButtonText: '知道了'
        });
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
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

    rule () {
      this.showFudai = true;
    },
    changeNum () {
      this.showFudai = false;
    }
  },
  created () {
    this.addChance();
    this.loadOrder();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fudai {
  position: absolute;
  width: 100%;
  top: 0.8rem;
  bottom: 0;
  background: #9e151f;
  overflow-y: auto;
  .content {
    background: url("./imgs/bg.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 2.8rem;
    .time {
      margin: 0 auto;
      width: 5.76rem;
      height: 0.64rem;
      img {
        width: 100%;
      }
    }
    .open-fudai {
      margin: 5.6rem auto 0;
      width: 5.93rem;
      height: 1.04rem;
      img {
        width: 100%;
      }
      p {
        color: #fff;
        text-align: center;
        font-size: 0.24rem;
        padding-top: 0.1rem;
      }
    }
    .prize-type {
      text-align: center;
      font-size: 0.28rem;
      color: rgb(249, 213, 213);
      margin: 0.4rem auto 1.3rem;
      width: 6.46rem;
      height: 2.83rem;
      background: url("./imgs/prizebg.png") no-repeat;
      background-size: 100% 100%;
      padding-top: 0.5rem;
      p {
        margin-bottom: 0.44rem;
      }
    }
    .rule,
    .rule img,
    .rule .content2 {
      height: 0.54rem;
      width: 1.7rem;
    }
    .rule {
      position: absolute;
      top: 0.54rem;
      right: 0;
      .content2 {
        position: absolute;
        top: 0;
        left: 0;
        img,
        span {
          display: block;
          float: left;
          margin-top: 0.12rem;
          margin-left: 0.1rem;
        }
        img {
          width: 0.3rem;
          height: 0.3rem;
        }
        span {
          font-size: 0.26rem;
          color: rgb(222, 18, 30);
          margin-top: 0.14rem;
        }
      }
    }
  }
}
.fudai2 {
  position: fixed;
  width: 100%;
  top: 0rem;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  overflow-y: auto;
  z-index: 100;
  img.fu {
    height: 7.69rem;
    width: 6.78rem;
    display: block;
    margin: 0.99rem auto 0;
  }
  img.close {
    height: 0.7rem;
    width: 0.7rem;
    display: block;
    margin: 1.06rem auto 0;
  }
  div.contentfu {
    height: 7.42rem;
    width: 6.36rem;
    position: absolute;
    top: 0.99rem;
    margin: auto;
    left: 0;
    right: 0;
    color: rgb(255, 235, 230);
    text-align: center;
    h1 {
      font-size: 0.4rem;
      margin-top: 1.3rem;
      margin-bottom: 0.5rem;
    }
    .detail {
      position: absolute;
      font-size: 0.28rem;
      width: 72%;
      text-align: left;
      margin: auto;
      left: 0;
      right: 0;
      height: 4rem;
      line-height: 0.4rem;
      overflow-y: scroll;
    }
  }
}
</style>
