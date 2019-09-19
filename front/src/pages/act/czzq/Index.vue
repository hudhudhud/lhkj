<template>
  <div>
    <cbbHeader :title="templateConfig.title" :bgColor="templateConfig.color?templateConfig.color:'#f6253a'"></cbbHeader>
    <div class="buy">
      <div class="tab">
        <div class="nav" ref="mycolor">
          <div class="nav-item" v-for="(item, index) in act.productList" :key="'nav'+index"
            :class="{'nav-item-active':currentTab==index}" @click="currentTab=index">{{item.proName}}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="phone">
        <input type="text" v-model="account"
          :placeholder="'请输入'+act.productList[currentTab].standardList[0].accountName">
      </div>
      <div class="wrapper" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
        <div class="product" v-if="ind==currentTab">
          <div class="product-item" v-for="(std, ind2) in product.standardList" :key="'std_'+std.id"
            @click="select(ind2, std, std.integralNum, product.id)"
            :class="{'active': ind2 == index && productId == product.id, 'mR2': (ind2+1)%3!=0}">
            <div class="currentPrice">{{std.currentPrice}}元</div>
            <div class="currentPrice"> {{std.integralNum}}积分</div>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <!-- <div class="label icon" v-show="integralNum && integralNum >= 0">实际支付积分：{{integralNum}}</div> -->
        <div class="btn" @click="createOrder"
          :style="{'background-color':templateConfig.color?templateConfig.color:'#f6253a'}">确认</div>
        <div class="detail">
          <div class="desc">活动说明</div>
          <div v-html="act.detail||'活动说明'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
import cbbHeader from '@/components/cbbHeader';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      currentTab: this.$route.query.index || 0,
      templateConfig: JSON.parse(this.act.templateConfig),
      index: -1,
      payUrl: payUrl,
      account: '',
      intintegralNum: '',
      couponNumber: '',
      standard: {},
      productId: '',
      showStatus:
        process.env.PUBLISH_ENV == 'prod'
          ? this.$store.state.merchantId
          : this.$store.state.merchantId
    };
  },
  components: {
    cbbHeader
  },
  computed: {
    accountPattern () {
      return this.act.productList[this.currentTab].standardList[0]
        .accountPattern;
    }
  },
  methods: {
    select (i, std, integralNum, productId) {
      this.index = i;
      if (std) {
        Object.assign(this.standard, std);
        this.productId = productId;
        this.integralNum = integralNum;
      }
    },
    async createOrder () {
      console.log(this.standard);
      if (!this.standard.id) {
        Toast('请选择充值面值');
        return;
      }
      if (!this.account) {
        Toast('请输入' + this.standard.accountName);
        return;
      }
      if (!new RegExp(this.accountPattern).test(this.account)) {
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
          let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`;
          Toast('订单已生成...正在跳转支付');
          let payPath = `${payUrl}${
            rs.payload.prepayId
          }?redirectUrl=${encodeURIComponent(successUrl)}`;
          window.location.replace(payPath);
        } else {
          Toast('下单成功');
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`
          );
        }
      } else {
        Toast('订单生成失败:' + rs.error);
      }
      Indicator.close();
    }
  },
  mounted () {
    if (this.templateConfig.color) {
      this.$refs.mycolor.style.setProperty(
        '--bcColor',
        this.templateConfig.color
      );
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.buy {
  position: absolute;
  width: 100%;
  top: 0.8rem;
  bottom: 55px;
  background: #fff;
  overflow-y: scroll;
  .nav {
    @include flex(row, nowrap, flex-start, flex-start);
    height: 0.76rem;
    line-height: 0.76rem;
    color: rgb(66, 65, 65);
    font-size: 0.3rem;
    text-align: center;
    --bcColor: rgb(55, 148, 255);
    .nav-item {
      flex: 1;
      position: relative;
    }
    .nav-item-active {
      color: var(--bcColor);
      &:after {
        @include after-border(var(--bcColor), 2px, 1.4rem);
      }
    }
  }
  .line {
    height: 0.1rem;
    background: #f1f1f1;
  }
  .phone {
    width: 6.84rem;
    margin: 0.46rem auto 0.3rem;
    line-height: 0.6rem;
    text-align: center;
    padding-bottom: 0.3rem;
    @include border-1px(#d9d9d9);
    input {
      height: 0.88rem;
      line-height: 0.88rem;
      width: 6.84rem;
      margin: 0 auto;
      padding-left: 0.3rem;
      font-size: 0.32rem;
      border: 1px solid #ccc;
      border-radius: 0.1rem;
      color: #333;
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
    }
    .active {
      color: rgb(55, 148, 255);
      border: 1px solid rgb(55, 148, 255);
      .originalPrice {
        color: rgb(55, 148, 255);
      }
    }
  }
  .detail {
    margin-top: 0.5rem;
    padding: 0 0.3rem 0.3rem;
    color: #333;
    div {
      line-height: 0.36rem;
    }
    .desc {
      font-size: 0.34rem;
      padding-bottom: 0.1rem;
    }
  }
  .btn {
    width: 70%;
    display: block;
    margin: 0.56rem auto;
    border-radius: 8px;
    color: white;
    text-align: center;
    height: 0.78rem;
    line-height: 0.78rem;
    font-size: 18px;
  }
}
</style>
