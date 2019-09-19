<template>
  <div class="buy">
    <cbbHeader title="话费充值"></cbbHeader>

    <div class="wrap">
      <div class="account">
        <input type="text" v-model="account" placeholder="请输入手机号">
      </div>
    </div>
    <div class="title">话费充值</div>
    <div class="wrapper" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
      <!-- <div class="label">{{product.proName}}面额</div> -->
      <div class="product">
        <div
          class="product-item"
          v-for="(std, ind2) in product.standardList"
          :key="'std_'+std.id"
          @click="select(ind2, std)"
          :class="{'active': ind2 == index, 'mR2': (ind2+1)%3!=0}"
        >
          <!-- <div class="tip"></div> -->
          <div class="currentPrice">{{std.currentPrice}}元</div>
          <div class="originalPrice">售价{{std.originalPrice}}元</div>
          <!-- <div>{{std.integralNum}}</div> -->
        </div>
      </div>
    </div>

    <div class="btn" @click="createOrder">立即充值</div>
    <div class="detail">
      <div class="desc">活动说明</div>
      <div v-html="act.detail"></div>
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
      index: -1,
      payUrl: payUrl,
      account: '',
      standard: null
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    select (i, std) {
      this.index = i;
      if (std) {
        this.standard = std;
      }
    },
    async createOrder () {
      if (!this.account) {
        Toast('请输入手机号');
        return;
      }
      if (!this.standard) {
        Toast('您还未选择面值');
        return;
      }

      if (!new RegExp(this.standard.accountPattern).test(this.account)) {
        Toast(this.standard.accountName + '输入有误');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.standard.id,
        commodityNum: 1,
        account: this.account
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
  mounted () {
    console.log(this.act);
  },
  created () {
    let productList = this.act.productList;
    if (productList.length == 1 && productList[0].standardList.length == 1) {
      this.select(0, productList[0].standardList[0].id);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.wrap {
  padding: 0 0.25rem;
}
.buy {
  padding-top: 0.5rem;
  background: #fff;
  .account {
    margin: 0.6rem auto 0.48rem;
    font-size: 0.55rem;
    // background: url(./imgs/write.png) no-repeat 100% center;
    input {
      width: 80%;
      border-bottom: 1px solid #ddd;
      color: #333;
    }
  }
  .chargeRange {
    color: rgb(153, 153, 153);
    font-size: 0.22rem;
    text-indent: 0.1rem;
    margin-bottom: 0.42rem;
  }
  .title {
    border-left: 0.1rem solid rgb(9, 179, 239);
    padding-left: 0.15rem;
    line-height: 0.4rem;
    font-size: 0.3rem;
    margin-bottom: 0.34rem;
    color: rgb(51, 51, 51);
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
        //text-decoration: line-through;
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
        background: url(./imgs/97.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .active {
      color: rgb(9, 182, 242);
      border: 1px solid rgb(9, 182, 242);
      .originalPrice {
        color: rgb(9, 182, 242);
      }
    }
  }

  .organizeNo {
    text-align: center;
    input {
      width: 7rem;
      height: 0.88rem;
      margin-top: 0.3rem;
      border: 1px solid rgb(9, 179, 239);
      border-radius: 0.1rem;
      color: #333;
      line-height: 0.88rem;
      padding: 0 0.2rem;
    }
  }
  .detail {
    font-size: 0.28rem;
    padding: 0 0.5rem 0.3rem;
    color: #666;
    background: #fff;
    .desc {
      text-align: center;
      font-size: 0.3rem;
      color: #333;
      padding-bottom: 0.1rem;
    }
  }
  .btn {
    width: 5.5rem;
    display: block;
    margin: 0.48rem auto 0.52rem;
    color: white;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.36rem;
    background: url(./imgs/btn-bg.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
