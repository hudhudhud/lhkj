<template>
  <div>
    <div
      class="order"
      v-if="ticket"
    >
      <div class="order-jianjie">
        <div class="order-checi">
          <span>{{ticket.trainNo}}</span>
          <span>{{ticket.fromStation}}&nbsp;<em></em>&nbsp;{{ticket.toStation}}</span>
        </div>
        <div
          class="order-detail"
          @click="goOutDetail"
        >查看详情
        </div>
      </div>
      <div class="order-li">
        <span>订单号：{{ticket.pticketNo}}</span>
      </div>
      <div class="order-li">
        <span>发车时间：{{ticket.drawTime}}&nbsp;开</span>
      </div>
      <div class="order-li">
        <span>总张数：{{order.ticketDetails.length}}&nbsp;&nbsp;{{ticket.clientName}}</span>
      </div>

    </div>
  </div>
</template>
<script>
import queryString from 'querystring';
import { Toast } from 'mint-ui';

export default {
  name: 'OrderItem',
  props: {
    order: {
      type: Object,
      required: true
    },
    actId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      ticket: this.order ? this.order.ticketDetails[0] : null
    };
  },
  methods: {
    async goOutDetail () {
      let rs = await this.$get(
        `api/order/ticket/chose/mark?actId=${this.actId}&orderCode=${
          this.ticket.orderCode
        }`
      );
      if (rs.status == 200) {
        let url = `${window.location.protocol}//${window.location.host}/${
          this.$store.state.merchantAppid
        }/merchant/train/orderDetails?actId=${this.actId}`;
        Object.assign(rs.payload, { redirectUrl: url });
        let querystring = queryString.stringify(rs.payload);
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }/conductor/train/order.html?${querystring}`;
      } else {
        Toast(rs.error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.order {
  &-jianjie {
    position: relative;
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: right;
    padding: 0 0.3rem;
    background: #fff;
  }

  &-checi {
    position: absolute;
    left: 0.2rem;
    z-index: 1;
    font-size: 0.32rem;
    color: #333;
    padding-left: 0.4rem;
    background: url(../imgs/Train.png) no-repeat 0 center;
    background-size: 0.32rem 0.32rem;
    em {
      display: inline-block;
      width: 0.3rem;
      border-top: 1px solid #333;
      vertical-align: 0.1rem;
    }
  }
  &-detail {
    position: relative;
    display: inline-block;
    text-align: right;
    color: #999;
    font-size: 0.28rem;
    padding-right: 0.2rem;
    &:after {
      @include arrow(0.16rem, 0.16rem, 0, #999, -45deg);
    }
  }
  &-li {
    background: #fbf9f9;
    padding: 0.3rem 0.56rem 0;
    color: #999;
    &:last-child {
      padding-bottom: 0.3rem;
      margin-bottom: 0.2rem;
    }
  }
}
</style>
