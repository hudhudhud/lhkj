<template>
  <div class="jilinRecharge" v-if="act">
    <div class="tab">
        <div class="nav" ref="mycolor">
          <div
            class="nav-item"
            v-for="(item, index) in act.productList"
            :key="'nav'+index"
            :class="{'nav-item-active':currentTab==index}"
            @click="currentTab=index"
          >{{item.proName}}</div>
        </div>
      </div>
      <div class="phone">
        <input
          type="text"
          v-model="account"
          :placeholder="'请输入'+act.productList[currentTab].standardList[0].accountName"
        >
        <div class="btn" @click="createOrder">确定</div>
      </div>
      <div
        class="wrapper"
        v-for="(product,ind) in act.productList"
        :key="'pro_'+ind"
      >
        <div
          class="product"
          v-if="ind==currentTab"
        >
          <div
            class="product-item"
            v-for="(std, ind2) in product.standardList"
            :key="'std_'+std.id"
            @click="select(ind2, std, std.integralNum, product.id)"
            :class="{'active': ind2 == index && productId == product.id, 'mR2': (ind2+1)%3!=0}"
          >
            <div class="currentPrice">{{std.originalPrice}}元</div>
            <div class="originalPrice">售价:{{std.currentPrice}}元</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { gotoAuth } from '@/router/index';
import { Indicator, Toast } from 'mint-ui';
import { getActDetailNew } from '@/lib/api';
import { payUrl } from '@/config/';
export default {
  props: {
    setting: {}
  },
  data () {
    return {
      currentTab: this.$route.query.index || 0,
      // templateConfig: JSON.parse(this.act.templateConfig),
      index: -1,
      payUrl: payUrl,
      account: '',
      intintegralNum: '',
      couponNumber: '',
      standard: {},
      productId: '',
      act: null
    };
  },
  methods: {
    getActDetail () {
      getActDetailNew(this.setting.actid, res => {
        this.act = res.payload;
      })
    },
    select (i, std, integralNum, productId) {
      this.index = i;
      if (std) {
        Object.assign(this.standard, std);
        this.productId = productId;
        this.integralNum = integralNum;
      }
    },
    async createOrder () {
      let token = this.$store.state.token;
      if (!token) {
        gotoAuth();
        return;
      }
      if (!this.standard.id) {
        Toast('请选择充值面值');
        return;
      }
      if (!this.account) {
        Toast('请输入' + this.standard.accountName);
        return;
      }
      if (!new RegExp(this.act.productList[this.currentTab].standardList[0].accountPattern).test(this.account)) {
        Toast(this.standard.accountName + '输入有误');
        return;
      }
      this.gotoPay();
    },
    async gotoPay () {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.standard.id,
        commodityNum: 1,
        account: this.account,
        couponNumber: this.couponNumber
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
  created () {
    this.getActDetail()
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
.jilinRecharge{
  width: 100%;
  background: #fff;
  .nav {
    height: 0.64rem;
    display: flex;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    .nav-item {
      width: 1.7rem;
      height: 0.64rem;
      text-align: center;
      color: #222222;
      font-size: 0.3rem;
      line-height: 0.64rem;
      flex-shrink: 0;
    }
    .nav-item-active {
      background: #0763e7;
      color: #ffffff;
      border-radius: 0.4rem;
    }
  }
  .phone {
    width: 6.84rem;
    margin: 0.3rem auto 0.3rem;
    line-height: 0.6rem;
    text-align: center;
    overflow: hidden;
    input {
      height: 0.88rem;
      line-height: 0.88rem;
      width: 5.34rem;
      margin: 0 auto;
      padding-left: 0.3rem;
      font-size: 0.32rem;
      border: 1px solid #ccc;
      border-radius: 0.1rem 0 0 0.1rem;
      border-right: 0;
      color: #333;
      float: left;
    }
    .btn{
      width: 1.5rem;
      height: 0.88rem;
      background: #0763e7;
      color: #fff;
      text-align: center;
      line-height: 0.88rem;
      float: left;
      border-radius: 0 0.1rem 0.1rem 0;
    }
  }
  .wrapper {
    width: 6.84rem;
    margin: 0 auto;
    // padding-right: 0.14rem;
  }
  .product {
    @include flex(row, wrap, flex-start, center);
    width: 100%;
    font-size: 0.32rem;
    .product-item {
      position: relative;
      @include flex(column, wrap, center, center);
      min-width: 2.14rem;
      max-width: 2.14rem;
      white-space: nowrap;
      border: 1px solid #999;
      margin: 0.1rem 0;
      border-radius: 0.1rem;
      text-align: center;
      color: #666;
      height: 1.16rem;
      &.mR2 {
        margin-right: 0.2rem;
      }
      .currentPrice {
        margin-bottom: 0.1rem;
      }
      .originalPrice {
        // text-decoration: line-through;
        font-size: 0.22rem;
        line-height: 0.3rem;
        color: #666;
      }
      .tip {
        position: absolute;
        top: -0.06rem;
        left: -0.02rem;
        width: 0.64rem;
        height: 0.29rem;
        background: url(./imgs/93.png) no-repeat;
        background-size: 100% 100%;
        &.jpg93 {
          background: url(./imgs/93.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .active {
      color: #0763e7;
      border: 1px solid #0763e7;
      .originalPrice {
        color: #0763e7;
      }
    }
  }
}
</style>
