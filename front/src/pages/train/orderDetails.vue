<template>
  <!-- <div v-if="order"> -->
  <div v-if="false">
    <headerBar title="待支付" :bgColor="'#19a0f0'"></headerBar>
    <div class="order">
      <div class="order-head">
        <template v-if="canPay">
          <div class="order-state">
            待支付
          </div>
          <div class="order-time">剩余：<b>{{latestPayTimeFormatted}}
            </b>
          </div>
        </template>
      </div>
      <div class="order-list">
        <div v-for="(order, index) in list" :key="index">
          <DrawOrder :order="order"></DrawOrder>

        </div>
      </div>

    </div>
    <div class="footer">
      <div class="totalPrice">
        <span>总金额：</span>&yen;&nbsp;<b>{{(order.originalPrice-order.alreadyPayPrice).toFixed(2)}}</b></div>
      <div class="btnGroup">
        <!-- <div class="cancel">取消订单</div> -->
        <template v-if="(order.originalPrice-order.alreadyPayPrice) > 0">
          <div class="pay" :class="{'expire': !canPay && order.orderState!=ORDER_STATE_CANCEL}" @click="pay">立即支付</div>
        </template>
        <template v-else>
          <div class="pay" @click="getTicket">立即出票</div>
        </template>
      </div>
    </div>
  </div>

</template>
<script>
import headerBar from '@/components/headerBar';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import DrawOrder from './components/DrawOrder';
import { payUrl } from '@/config/';
import moment from 'moment';
import TicketOrderState from '@/lib/OrderState';

export default {
  data () {
    return {
      list: [],
      order: null,
      chooseMark: null,
      timerTimeCount: 30,
      payUrl: payUrl,
      ...TicketOrderState,
      latestPayTime: null,
      latestPayTimeFormatted: '',
      canPay: false,
      timer: null
    };
  },
  components: {
    headerBar,
    DrawOrder
  },
  methods: {
    async pay () {
      if (!this.canPay && this.order.orderState != this.ORDER_STATE_CANCEL) {
        return;
      }
      let rs = await this.$get(
        'api/order/ticket/pay/message/' + this.order.orderCode
      );
      if (rs.status == 200) {
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/train/order?actId=${
          this.$route.query.actId
        }`;
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${this.payUrl}${
          rs.payload.prepayId
        }?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        Toast(rs.error);
      }
    },
    calcPayTime () {
      let d = (this.latestPayTime - new Date().getTime()) / 1000;
      // let hour = parseInt(d / 3600);
      let minute = parseInt(parseInt(d % 3600) / 60);
      let second = parseInt(d % 60);
      this.latestPayTimeFormatted = `${minute}分${second}秒`;

      if (d > 0) {
        this.canPay = true;
        this._expireInd = setTimeout(this.calcPayTime, 1000);
      } else {
        this.canPay = false;
      }
    },
    async getTicket () {
      Indicator.open();
      let rs = await this.$get(
        'api/order/ticket/manual/ticketing/' + this.order.orderCode
      );
      if (rs.status == 200) {
        Toast('出票成功');
        setTimeout(() => {
          this.$router.push(
            `/${this.$store.state.merchantAppid}/merchant/train/order?actId=${
              this.$route.query.actId
            }`
          );
        }, 2000);
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async signOrder () {
      Indicator.open();
      let rs = await this.$get(
        `api/order/ticket/sign/order/${this.$route.query.actId}/${
          this.$route.query.orderNo
        }`
      );
      if (rs.status == 200) {
        this.order = rs.payload;
        this.list = rs.payload ? rs.payload.ticketDetails : [];
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  async created () {
    await this.signOrder();

    // 如果是未支付且 订单未取消,计算剩余时间

    let expireTime = this.order.expireTime;
    this.latestPayTime = moment(expireTime).valueOf();
    this.calcPayTime();
    if (!this.canPay && this.order.orderState != this.ORDER_STATE_CANCEL) {
      MessageBox({
        message: '该订单已过期',
        title: '温馨提示',
        showCancelButton: false,
        confirmButtonText: '我知道了'
      }).then(action => {
        if (action == 'confirm') {
          this.$router.push(
            `/${this.$store.state.merchantAppid}/merchant/train/order?actId=${
              this.$route.query.actId
            }`
          );
        }
      });
    }
    if (this.order.originalPrice - this.order.alreadyPayPrice > 0) {
      this.pay();
    } else {
      this.getTicket();
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (!this.timer) {
        let _this = this;
        this.timer = setInterval(() => {
          this.timerTimeCount -= 1;
          if (this.timerTimeCount == 0) {
            clearInterval(_this.timer);
          }
        }, 1000);
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.order {
  position: absolute;
  width: 100%;
  top: 0.8rem;
  bottom: 1rem;
  overflow-y: scroll;
  background: #fff;
  &-head {
    color: #fff;
    font-size: 0.34rem;
    padding: 0.1rem 0.3rem 1rem;
    line-height: 0.8rem;
    background: #19a0f0;
  }
  &-state {
    position: absolute;
    left: 0.3rem;
    z-index: 1;
    padding-left: 0.5rem;
    font-weight: bold;
    background: url(./imgs/wait1.png) no-repeat 0 0.18rem;
    background-size: 0.44rem 0.44rem;
  }
  &-time {
    text-align: right;
    font-size: 0.26rem;
    b {
      font-size: 0.32rem;
    }
  }
  &-list {
    position: relative;
    top: -1rem;
  }
}
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  .totalPrice {
    position: absolute;
    left: 0.3rem;
    color: #ff9a14;
    z-index: 1;
    span {
      color: #666;
      font-size: 0.26rem;
    }
    b {
      font-size: 0.34rem;
    }
  }
  .btnGroup {
    text-align: right;
    div {
      display: inline-block;
      width: 2.2rem;
      text-align: center;
      font-size: 0.3rem;
      font-weight: 500;
      &.cancel {
        color: #797878;
      }
      &.pay {
        color: #fff;
        background-color: #ff9a14;
      }
    }
  }
}
.expire {
  filter: grayscale(100%);
}
</style>
