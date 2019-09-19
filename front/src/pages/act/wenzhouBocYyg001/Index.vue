<template>
  <div>
    <cbbHeader
      title="一元购10元话费
"
      :bgColor="'#F6253A'"
    ></cbbHeader>
    <div class="position-wrapper">
      <div class="header"></div>
      <div class="boc-login">
        <div class="bg">
          <img
            src="./imgs/bg.jpg"
            alt
          >
        </div>
        <div class="content">
          <div
            class="wrapper"
            v-for="(product,ind) in act.productList"
            :key="'pro_'+ind"
          >
            <div class="product">
              <div
                class="product-item"
                v-for="(std) in product.standardList"
                :key="'std_'+std.id"
              >
                <img
                  src="./imgs/huafei.png"
                  alt
                >
                <div class="currentPrice">
                  售价：￥
                  <b>{{std.currentPrice.toFixed(2)}}</b>
                </div>
                <div
                  class="btn"
                  @click="createOrder(std.id)"
                ></div>
              </div>
            </div>
          </div>
          <div class="rule">
            <img
              src="./imgs/rule.png"
              alt
            >
            <div
              class="txt"
              v-html="act.detail||'暂无说明'"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <drawOrder
      :orderInfo="order"
      @draw-order="drawOrder"
      @dialog-flag="dialogFlag"
      v-if="openDialog"
    ></drawOrder>
  </div>
</template>

<script>
import { payUrl } from '@/config/';
import OrderState from '@/lib/OrderState';
import cbbHeader from '@/components/cbbHeader';
import drawOrder from './drawOrder';
import moment from 'moment';

import { Toast, Indicator, MessageBox } from 'mint-ui';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      order: null,
      openDialog: false,
      standard: this.act.productList[0].standardList[0],
      payUrl: payUrl,
      orderCode: '',
      cardpwdList: [],
      canPay: false,
      latestPayTime: null,
      latestPayTimeFormatted: '',
      ...OrderState
    };
  },
  components: {
    drawOrder,
    cbbHeader
  },
  watch: {
    order (val) {
      if (val) {
        this.openDialog = true;
      }
    }
  },
  methods: {
    dialogFlag (val) {
      this.openDialog = val;
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
    async createOrder (standardId) {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: standardId,
        commodityNum: 1
      });
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          /*  let successUrl = `${window.location.protocol}//${
            window.location.host
          }/${this.$store.state.merchantAppid}/merchant/index/act/${
            this.act.actId
          }`; */

          MessageBox({
            message: '请在完成支付后，点击左上角返回活动页面。',
            confirmButtonText: '去支付'
          }).then(action => {
            if (action == 'confirm') {
              let successUrl = window.location.href;
              let payPath = `${payUrl}${
                rs.payload.prepayId
              }?redirectUrl=${encodeURIComponent(successUrl)}`;
              window.location.replace(payPath);
            }
          });
        } else {
          Toast('下单成功');
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${
              this.$store.state.merchantAppid
            }/merchant/index/order`
          );
        }
      } else {
        Toast('订单生成失败:' + rs.error);
      }
      Indicator.close();
    },
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
                cancelButtonText: '重新购买',
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
    async drawOrder (account) {
      // 检查账号格式
      if (this.order.proType == 1) {
        console.log(account);
        if (!account) {
          Toast('请输入手机号');
          return;
        }
        if (this.standard.accountPattern) {
          if (!new RegExp(this.standard.accountPattern).test(account)) {
            Toast('请输入正确的手机号');
            return;
          }
        }
      }
      Indicator.open();
      let rs = await this.$post('api/order/draw', {
        orderCode: this.order.orderCode,
        account: account
      });
      if (rs.status == 200) {
        if (this.order.proType == 1) {
          Toast('已提交充值');
          this.order.fishState = '1';
        } else if (this.order.proType == 2) {
          this.cardpwdList = JSON.parse(rs.payload.cardPwds);
        }
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  created () {
    this.loadOrder();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.boc-login {
  .bg img {
    display: block;
    border: none;
    width: 100%;
  }
  .content {
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    width: 6rem;
    .wrapper {
      .product {
        .product-item {
          font-size: 0.3rem;
          text-align: center;
          color: #fff;
          .currentPrice {
            padding: 0.1rem 0 0.3rem;
          }
          b {
            font-size: 0.4rem;
            font-weight: normal;
          }
          img {
            display: block;
            margin: 0 auto;
            width: 50%;
          }
          .btn {
            width: 3.2rem;
            height: 0.82rem;
            margin: 0 auto 0.54rem;
            background: url(./imgs/buy.png) no-repeat;
            background-size: 100% auto;
          }
        }
      }
    }
    .rule {
      img {
        width: 2.67rem;
        display: block;
        margin: 0 auto 0.5rem;
      }
      .txt {
        font-size: 0.28rem;
        line-height: 0.36rem;
        color: #fff;
      }
    }
  }
}
</style>
