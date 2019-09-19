<template>
  <div class="bg">
    <template v-if="!isQuit || isQuit == undefined">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>
    <div style="padding-top: 4.42rem">
      <div
        class="btn"
        @click="goOutDetail"
      ></div>
    </div>
    <div class="order">
      <div @click="$router.push(`/${$store.state.merchantAppid}/merchant/train/order?actId=${act.actId}`)">查看订单</div>
    </div>
    <div class="tel">
      客服电话：4009626962
    </div>
  </div>
</template>
<script>
import { Indicator, MessageBox } from 'mint-ui';
import queryString from 'querystring';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  computed: {
    isQuit () {
      return this.$route.query.isQuit;
    }
  },
  data () {
    return {
      checkActId: process.env.PUBLISH_ENV == 'prod' ? 554263274 : 554264185
    };
  },
  methods: {
    async validUser (actId) {
      Indicator.open();
      let rs = await this.$post('api/act/limit', {
        actId: actId
      });
      if (rs != undefined) {
        return rs;
      }
    },
    async goOutDetail () {
      let response = await this.validUser(this.checkActId);
      if (response != undefined) {
        Indicator.close();
      }
      if (response.status == 6001) {
        MessageBox({
          message: response.error,
          title: '温馨提示',
          showCancelButton: false,
          confirmButtonText: '确定'
        });
        return;
      }
      let rs = await this.$get(
        `api/order/ticket/chose/mark?actId=${this.act.actId}`
      );
      if (rs.status == 200) {
        let url =
          window.location.protocol +
          '//' +
          window.location.host +
          '/' +
          this.$store.state.merchantAppid +
          '/merchant/train/orderDetails?actId=' +
          this.act.actId;
        Object.assign(rs.payload, { redirectUrl: url });
        delete rs.payload.orderId;
        let querystring = queryString.stringify(rs.payload);
        window.location.href =
          window.location.protocol +
          '//' +
          window.location.host +
          '/conductor/train/index.html?' +
          querystring;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.bg {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: url(./imgs/bg.png) no-repeat;
  background-size: 100% 100%;
}
.btn {
  position: relative;
  left: 0.24rem;
  width: 2.65rem;
  height: 1.16rem;
  text-align: center;
  margin: 0 auto;
  background: url(./imgs/btn.png) no-repeat;
  background-size: 100% 100%;
}
.order {
  width: 1.5rem;
  position: relative;
  margin: 0.74rem auto;
  text-align: center;
  font-size: 0.3rem;
  color: #416b3d;
  padding-right: 0.1rem;
  div {
    padding-top: 0.02rem;
  }
  &:after {
    @include arrow(0.2rem, 0.2rem, 0rem, #416b3d, -45deg);
  }
}
.tel {
  text-align: center;
  margin-top: 2.88rem;
  color: #416b3d;
  font-size: 0.3rem;
}
</style>
