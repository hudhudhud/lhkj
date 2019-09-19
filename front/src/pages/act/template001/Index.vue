<template>
  <div class="didi">
    <template v-if="$route.query.isQuit == 'true'">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>
    <div class="wrap">
      <div
        class="wrapper"
        v-if="act"
      >
        <div
          class="product"
          v-for="(product,ind) in act.productList"
          :key="'pro_'+ind"
        >
          <img
            class="iconUrl"
            :src="product.iconUrl"
            alt=""
          >
          <div
            class="product-item"
            v-for="std in product.standardList"
            :key="'std_'+std.id"
          >
            <div
              class="coupon"
              @click="createOrder(std,product)"
            >
              <img :src="std.standardImgUrl">
            </div>
          </div>
          <p
            v-if="ind==0"
            class="tip"
          >温馨提示：每人每月仅限购买任意一张5折优惠券</p>
        </div>
      </div>
    </div>
    <div class="rule-btn" @click='popVisible=true'>
      <img src="./imgs/rule-btn.png" alt="">
    </div>
    <div class="pop-contain" v-show='popVisible'>
      <div class="pop">
        <img src="./imgs/close.png" alt="" class="close" @click='popVisible=false'>
        <p v-html='act.detail' class="act-detail"></p>
        <img src="./imgs/iknow.png" alt="" @click='popVisible=false' class="iknow-img">
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
import OrderState from '@/lib/OrderState';
import moment from 'moment';

export default {
  data () {
    return {
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 28 : 554704923,
      secondActId2: process.env.PUBLISH_ENV == 'prod' ? 560925106 : 560931017,
      act: null,
      ...OrderState,
      canpay: false,
      prepayId: '',
      orderCode: '',
      cardpwdList: [],
      canPay: false,
      latestPayTime: null,
      latestPayTimeFormatted: '',
      payUrl: payUrl,
      popVisible: false
    };
  },
  methods: {
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
    async loadOrder (actIds) {
      Indicator.open();
      let rs = await this.$post('/api/getOrderList?', {
        actId: actIds,
        status: ''
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        let result = list.some(element => {
          if (
            element.payState == this.PAY_STATE_PAID &&
            element.fishState == this.FISH_STATE_CREATE
          ) {
            this.order = element;
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
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
        if (actId == this.secondActId) {
          let res = await this.$get('api/getActDetails/' + this.secondActId2);
          if (rs.status == 200) {
            this.act.productList.unshift(res.payload.productList[0]);
          }
        }
        console.log(this.act.productList[0].iconUrl);
      }
    },
    async createOrder (standard, product) {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: product.actId,
        standardId: standard.id,
        commodityNum: 1
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let domain = `${window.location.protocol}//${window.location.host}/`;
        let backUrl =
          domain + this.$store.state.merchantAppid + '/merchant/index/act/28';
        let successUrl =
          domain + this.$store.state.merchantAppid + '/merchant/index/order';
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(
          successUrl
        )}&backUrl=${encodeURIComponent(backUrl)}`;
        window.location.replace(payUrl);
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  created () {
    this.loadAct(this.secondActId);
  },
  mounted () {
    let actIds = this.secondActId + ',' + this.secondActId2;
    this.loadOrder(actIds);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.didi {
  width: 100vw;
  //   min-height: 100vh;
  min-height: 23.46rem;
  background: rgb(190, 217, 255) url(./imgs/bg.jpg) no-repeat;
  background-size: 100% auto;
  padding-top: 0.01rem;
  padding-top: 6.5rem;
  .wrap {
    width: 96%;
    height: 19.19rem;
    margin: 0 auto 0;
    background: url(./imgs/mbg.jpg) no-repeat;
    background-size: 100% 100%;
    padding-top: 0.01rem;
  }
  .wrapper {
    padding: 0.2rem 0.15rem;
    margin-top: 0.5rem;
    .product {
      background: transparent;
      padding-top: 0.01rem;
      margin-top: -0.5rem;
      .iconUrl {
        display: block;
        margin: -0.62rem auto 0;
        width: 3.06rem;
        height: 0.62rem;
      }
    }
    .product:nth-child(1) {
      height: 5.66rem;
    }
    .product:nth-child(2) {
      height: 5.85rem;
    }
    .product:nth-child(3) {
      height: 3.88rem;
    }
    .coupon {
      width: 6.66rem;
      height: 1.68rem;
      margin: 0.2rem auto;
      img {
        width: 100%;
      }
    }
    .tip {
      width: 100%;
      text-align: center;
      color: #d61414;
    }
  }
  .rule-btn{
    position:fixed;
    right:0;
    top:15em;
    img{
      width:1.91rem;
      height:0.66rem;
    }
  }
  .pop-contain{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.4);
    display:flex;
    .pop{
      margin:auto;
      display: flex;
      width:5.88rem;
      min-height: 6.4rem;
      background:url('./imgs/pop-bgk.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
      .close{
        position:absolute;
        right:0;
        top:-.8rem;
        width:.52rem;
        height:.52rem;
      }
      .act-detail{
        margin:auto;
        box-sizing:border-box;
        padding: .4rem;
        width: 5rem;
        height: 3rem;
        overflow: scroll;
      }
      .iknow-img{
        width:3.43rem;
        height:.78rem;
        position: absolute;
        bottom: .5rem;
        left: 50%;
        margin-left: -1.7rem;
      }
    }
  }
}
</style>
