<template>
  <div>
    <cbbHeader :title="act.actName"></cbbHeader>
    <div class="buy">

      <div
        class="wrapper"
        v-for="(product,ind) in act.productList"
        :key="'pro_'+ind"
      >
        <div class="label">{{product.proName}}面额</div>
        <div class="product">
          <div
            class="product-item"
            v-for="(std, ind2) in product.standardList"
            :key="'std_'+std.id"
            @click="select(ind2, std, std.integralNum, product.id)"
            :class="{'active': ind2 == index && productId == product.id}"
          >
            <div>{{std.standardName}}</div>
            <div class="originalPrice">{{std.originalPrice}}元</div>

            <!-- <div>{{std.integralNum}}</div> -->
          </div>
        </div>
      </div>
      <div class="phone">
        <div class="label">充值账号</div>
        <input
          type="text"
          v-model="tel"
          placeholder=""
          readonly
        >
      </div>
      <div class="phone">
        <div class="label">兑换码</div>
        <input
          type="text"
          v-model="couponNumber"
          placeholder="请输入兑换码"
        >
      </div>
      <div class="wrapper">
        <!-- <div class="label icon" v-show="integralNum && integralNum >= 0">实际支付积分：{{integralNum}}</div> -->
        <div
          class="btn"
          @click="createOrder"
        >立即充值</div>
        <div class="detail">
          <div class="desc">活动说明</div>
          <div v-html="act.detail"></div>
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
      timer: null,
      count: 0,
      index: -1,
      errorMsg: '',
      payUrl: payUrl,
      intintegralNum: '',
      couponNumber: '',
      accountPattern: '',
      orderCode: '',
      standard: {},
      productId: ''
    };
  },
  computed: {
    tel () {
      return this.$store.state.cust ? this.$store.state.cust.tel : null;
    }
  },
  components: {
    cbbHeader
  },
  methods: {
    select (i, std, integralNum, productId) {
      this.index = i;
      if (std) {
        Object.assign(this.standard, std);
        this.accountPattern = std.accountPattern;
        this.productId = productId;
        this.integralNum = integralNum;
      }
    },
    async createOrder () {
      if (!this.standard.id) {
        Toast('您还没有选择要充值的积分面额哦');
        return;
      }

      if (!this.couponNumber) {
        Toast('请输入兑换码');
        return;
      }

      Indicator.open();
      let rs = await this.$post('api/activity/newCreateOrder', {
        actId: this.act.actId,
        standardId: this.standard.id,
        commodityNum: 1,
        couponNumber: this.couponNumber
      });
      if (rs.status === 200) {
        this.orderCode = rs.payload.orderCode;
        this.turns();
      } else {
        Toast(rs.error);
        Indicator.close();
      }
    },
    async turns () {
      if (this.count > 10) {
        Toast(this.errorMsg);
        clearTimeout(this.timer);
        return;
      }
      this.count++;
      console.log('clu:' + this.count);
      let rs = await this.$post('api/order/check/status', {
        orderCode: this.orderCode
      });
      if (rs.status == 200) {
        Indicator.close();
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/index/credit`
        );
      } else {
        this.errorMsg = rs.error;
        this.timer = setTimeout(() => {
          this.turns();
        }, 2000);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.buy {
  position: absolute;
  width: 100%;
  top: 0.8rem;
  bottom: 55px;
  background: #fff;
  overflow-y: scroll;
  .phone {
    width: 90%;
    margin: 0.2rem auto 0;
    line-height: 0.6rem;
    input {
      margin: 0rem auto;
      padding: 0 0.2rem;
      width: 100%;
      font-size: 0.3rem;
      border-bottom: 1px solid #999;
      color: #888;
      line-height: 0.8rem;
      width: 96%;
      padding: 0 2%;
    }
  }
  .wrapper {
    margin: 0 0.3rem;
    .label {
      margin: 0.6rem 0 0.3rem;
      &.icon {
        line-height: 0.4rem;
        padding-left: 0.5rem;
        // background: url(./imgs/jifen.png) no-repeat left center;
        background-size: contain;
      }
    }
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    .product-item {
      flex: 1;
      position: relative;
      min-width: 2rem;
      max-width: 2rem;
      white-space: nowrap;
      line-height: 0.4rem;
      border: 1px solid #999;
      padding: 0.2rem 0;
      margin: 0.1rem;
      border-radius: 0.1rem;
      text-align: center;
      color: #666;
      .originalPrice {
        text-decoration: line-through;
        font-size: 0.22rem;
        line-height: 0.3rem;
      }
    }
    .active {
      color: #fff;
      background: #09b6f2;
      border: 1px solid #09b6f2;
    }
  }
  .detail {
    margin-top: 0.5rem;
    padding-bottom: 0.3rem;
    .desc {
      font-size: 0.3rem;
      font-weight: bold;
      padding-bottom: 0.1rem;
    }
  }
  .btn {
    width: 80%;
    display: block;
    margin: 0.6rem auto;
    border-radius: 8px;
    color: white;
    text-align: center;
    height: 35px;
    line-height: 35px;
    background-color: #09b6f2;
    font-size: 18px;
  }
}
</style>
