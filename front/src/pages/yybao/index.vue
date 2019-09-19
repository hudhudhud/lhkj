<template>
  <div class="yybao">
    <back></back>
    <div
      class="bg"
      v-if="act"
    >
      <div
        class="pocket"
        v-for="(product,ind) in act.productList"
        :key="'pro_'+ind"
      >
        <div
          class="mian"
          v-for="(std,index) in product.standardList"
          :key="'std_'+std.id"
        >
          <div class="coupon">
            <img
              src="./imgs/yuan.jpg"
              alt=""
            >
            <p class="name">{{std.standardName

              }}</p>
            <p class="num">30</p>
            <p class="price">售价:￥<span>{{std.currentPrice.toFixed(2)}}</span></p>
          </div>
          <p> 剩余：{{std.surplusStock

            }}张</p>
          <div class="btn">
            <img
              src="./imgs/btn.jpg"
              alt=""
            >
            <div @click="handlePay(index)">立即支付</div>
          </div>
        </div>
      </div>
      <div
        class="query"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=${secondActId}`)"
      >领取记录查询<span>>></span>
      </div>
      <div class="rule">
        <div class="rule-header">
        </div>
        <div
          class="content"
          v-html="act.detail||'暂无说明'"
        >
        </div>
        <img
          src="./imgs/shine.jpg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  data () {
    return {
      tel: null,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 551083218 : 550830912,
      act: null
    };
  },
  watch: {
    order (val) {
      if (val) {
        this.openDialog = true;
      }
    }
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + this.secondActId);
      if (rs.status === 200) {
        this.act = rs.payload;
      }
    },
    async handlePay (index) {
      var std = this.act ? this.act.productList[0].standardList[index] : null;
      this.createOrder(std);
    },
    async createOrder (standard) {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.secondActId,
        standardId: standard.id,
        commodityNum: 1
      });
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          let successUrl = `${window.location.protocol}//${
            window.location.host
          }/${this.$store.state.merchantAppid}/merchant/paysuccess/${
            rs.payload.orderCode
          }`;
          Toast('订单已生成...正在跳转支付');
          let payPath = `${payUrl}${
            rs.payload.prepayId
          }?redirectUrl=${encodeURIComponent(successUrl)}`;
          window.location.replace(payPath);
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
    }
  },
  async created () {
    await this.loadAct(this.secondActId);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yybao {
  width: 100%;
  min-height: 100%;
  height: 100%;
  position: absolute;
  background: #ffd39b;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  overflow-y: auto;
  .bg {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("./imgs/bg.jpg") no-repeat;
    background-size: 100% 100%;
    margin: 0;
    padding: 0;
    .pocket {
      position: absolute;
      top: 4.24rem;
      width: 6.56rem;
      display: flex;
      justify-content: space-between;
      height: 3.6rem;
      left: 0;
      right: 0;
      margin: auto;
      .mian {
        width: 2.08rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        .coupon {
          position: relative;
          height: 2.46rem;
          width: 2.08rem;
          background: url("./imgs/huafeng.jpg") no-repeat;
          background-size: 100% 100%;
          img {
            position: absolute;
            height: 0.24rem;
            width: 0.24rem;
            top: 0.54rem;
            right: 0.45rem;
          }
          p {
            display: block;
            position: absolute;
            text-align: center;
            z-index: 50;
            right: 0;
            left: 0;
            margin-left: auto;
            margin-right: auto;
          }
          p.name {
            top: 0.15rem;
            font-size: 0.22rem;
            color: rgb(253, 62, 22);
            font-family: PingFang-SC-Bold;
          }
          p.num {
            bottom: 0.8rem;
            font-size: 0.8rem;
            color: rgb(253, 62, 22);
            font-family: HelveticaNeueLTPro-Md;
          }
          p.price {
            bottom: 0.15rem;
            font-size: 0.22rem;
            color: white;
            font-family: MicrosoftYaHei;
            span {
              font-size: 0.25rem;
              font-family: PingFang-SC-Bold;
            }
          }
        }
        p {
          margin: 0.14rem auto;
          font-size: 0.22rem;
          color: white;
          font-family: PingFang-SC-Bold;
        }
        .btn {
          height: 0.6rem;
          width: 2.06rem;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
          div {
            position: absolute;
            z-index: 10;
            height: 100%;
            width: 100%;
            line-height: 0.6rem;
            text-align: center;
            font-size: 0.28rem;
            color: rgb(192, 36, 36);
            font-family: PingFang-SC-Bold;
          }
        }
      }
    }
    .query {
      position: absolute;
      width: 2.4rem;
      height: 0.4rem;
      top: 8.6rem;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 0.3rem;
      color: white;
      font-family: PingFang-SC-Bold;
      border-bottom: 0.06rem solid rgb(199, 58, 68);
      border-radius: 0.03rem;
      padding-left: 0.1rem;
      span {
        position: relative;
        padding-left: 0.12rem;
        width: 0.22rem;
        height: 0.22rem;
        display: inline-block;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .rule {
      position: absolute;
      height: 3.74rem;
      width: 6.88rem;
      bottom: 1rem;
      top: 9.5rem;
      left: 0;
      right: 0;
      margin: 0.48rem auto 1rem;
      background: rgba(186, 29, 52, 0.8);
      border-radius: 0.12rem;
      .rule-header {
        position: absolute;
        z-index: 50;
        left: 0;
        right: 0;
        margin: auto;
        top: -0.38rem;
        height: 0.78rem;
        width: 2.66rem;
        background: url("./imgs/act.jpg") no-repeat;
        background-size: 100% 100%;
      }
      .content {
        position: absolute;
        margin: 0.4rem auto 0.3rem;
        left: 0;
        right: 0;
        width: 90%;
        height: 80%;
        font-size: 0.26rem;
        color: rgb(255, 242, 204);
        text-align: left;
        line-height: 0.4rem;
        font-family: PingFang-SC-Medium;
        overflow-y: scroll;
      }
      img {
        position: absolute;
        z-index: 100;
        left: 0;
        top: -0.5rem;
      }
    }
  }
}
</style>
