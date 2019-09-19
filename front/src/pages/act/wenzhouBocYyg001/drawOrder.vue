<template>
  <div>
    <div class="dialog">
      <!-- <div class="dialog" v-if="openDialog"> -->
      <div
        class="main"
        :class="{'modal01':order.proType =='1'}"
      >
        <div
          class="close"
          @click="closeDialog"
        >
          <img
            src="./imgs/close.png"
            alt
          >
        </div>
        <img
          :src="order.standardImgUrl"
          alt
        >
        <input
          v-if="order.proType=='1'"
          type="text"
          v-model="account"
          placeholder="请输入手机号"
        >
        <div
          v-if="order.proType=='2' && cardpwdList.length >0"
          class="cardpwd-group"
        >
          <div
            class="cardpwd-item"
            v-for="(item, ind) in cardpwdList"
            :key="'item'+ind"
          >
            <template v-if="item.cardPwd">
              <template v-if="item.cardPwd.indexOf('http')==0">点击链接使用:
                <!-- 点击链接使用 -->
                <a
                  class="link"
                  v-if="item.cardPwd.indexOf('http')==0"
                  :href="item.cardPwd"
                >{{item.cardPwd}}</a>
              </template>
              <template v-else>
                <span>{{item.cardPwd}}</span>
              </template>
              <p>券码有效期：支付之日起当月内有效</p>
            </template>
          </div>
        </div>
        <!-- 已支付 -->
        <template v-if="order.payState==PAY_STATE_PAID">
          <template v-if="order.fishState==FISH_STATE_CREATE">
            <div
              v-if="order.proType=='1'"
              class="btn"
              @click="charge"
            >立即充值</div>
            <div
              v-if="order.proType=='2'"
              class="btn"
              @click="charge"
            >立即领取</div>
          </template>
          <template v-else-if="order.fishState==FISH_STATE_CALLBACK_SUCCESS">
            <div
              v-if="order.proType=='1'"
              class="btn"
            >充值成功</div>
            <div
              v-if="order.proType=='2'"
              class="btn"
              @click="charge"
            >立即领取</div>
          </template>
          <template v-else-if="order.proType=='1'">
            <!-- <div class="btn">充值中</div> -->
            <div class="order-info">充值中,预计将于24小时内到账</div>
          </template>
          <template v-else-if="order.proType=='2'">
            <div
              class="btn"
              @click="charge"
            >立即领取</div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import OrderState from '@/lib/OrderState';
// import moment from 'moment';
// import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  props: {
    orderInfo: {
      require: true,
      type: Object
    },
    cardpwdList: {
      require: false,
      type: Array
    }
  },
  data () {
    return {
      order: this.orderInfo,
      ...OrderState,
      canPay: false,
      account: this.$store.state.cust ? this.$store.state.cust.tel : '',
      payUrl: payUrl
    };
  },
  methods: {
    closeDialog () {
      this.$emit('dialog-flag', false);
    },
    charge () {
      this.$emit('draw-order', this.account);
    }
  },
  created () {
    console.log(this.order);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .main {
    position: relative;
    width: 5.36rem;
    min-height: 5.38rem;
    top: 3.4rem;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: url(./imgs/modal.png) no-repeat;
    background-size: 100% auto;
    font-size: 0.28rem;
    line-height: 0.4rem;
    box-sizing: border-box;
    text-align: center;
    padding-top: 1.6rem;
    .cardPwd-item {
      width: 5.36rem;
      padding: 0 0.3rem;
    }
    &.modal01 {
      background: url(./imgs/modal01.png) no-repeat;
      background-size: 100% auto;
    }
    .close {
      position: absolute;
      top: -0.6rem;
      right: 0;
    }
    img {
      display: block;
      margin: 0 auto 0.3rem;
      width: 44%;
    }
    input {
      width: 80%;
      height: 0.72rem;
      padding-left: 0.22rem;
      border: 1px solid #666;
      border-radius: 0.1rem;
      line-height: 0.72rem;
    }
    .cardPwd {
      font-size: 0.28rem;
      color: orange;
      padding: 0.2rem 0 0.1rem;
    }
    .btn {
      width: 3rem;
      height: 0.64rem;
      line-height: 0.62rem;
      color: #fff;
      font-size: 0.3rem;
      margin: 0.38rem auto 0;
      background: url(./imgs/recharge.png) no-repeat;
      background-size: 100% 100%;
    }
    .order-info {
      padding-top: 0.5rem;
    }
  }
}
.cardpwd-group {
  color: orange;
  p {
    padding-top: 0.1rem;
    color: #333;
  }
}
.link {
  font-size: 0.28rem;
  color: orange;
}
</style>
