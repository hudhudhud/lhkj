<style scoped>
</style>
<template>
  <div class="buy">
    <cbbHeader title="详情"></cbbHeader>

    <div class="title">选择规格</div>
    <div class="wrapper">
      <div class="product" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
        <div class="product-item" v-for="std in product.standardList" :key="'std_'+std.id">
          <div class="face-value">{{std.standardName}}</div>
          <div class="currentPrice">售价：{{std.currentPrice}}元</div>
          <div class="stock">
            <!-- 剩余： 4份 -->
          </div>
        </div>
      </div>
    </div>
    <div class="detail" v-if="act.detail">
      <div class="title">商品介绍</div>
      <div class="article" v-html="act.detail"></div>
    </div>
    <div class="btn-wrapper">
      <div class="btn" @click="createOrder">立即领取</div>
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
      cust: this.$store.state.cust,
      couponNumber: '',
      standardId: ''
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    select (i, id) {
      this.index = i;
      if (id) {
        this.standardId = id;
      }
    },
    async createOrder () {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.act.productList[0].standardList[0].id,
        commodityNum: 1
      });
      if (rs.status === 200) {
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
        Toast('订单生成失败:' + rs.error);
      }
      Indicator.close();
    }
  },
  mounted () {
    console.log(this.act);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.buy {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 55px;
  background: #fff;
  .title {
    font-size: 0.3rem;
    color: rgb(51, 51, 51);
    text-align: center;
    margin: 0.68rem 0 0.34rem;
  }
  .wrapper {
    width: 6.4rem;
    margin: 0 auto;
    padding-top: 0.46rem;
    border: 2px solid #09b6f2;
    border-radius: 0.14rem;
  }
  .product {
    text-align: center;
    .product-item {
      .face-value {
        width: 3.7rem;
        height: 0.84rem;
        margin: 0 auto 0.46rem;
        line-height: 0.84rem;
        font-size: 0.54rem;
        color: #fff;
        background: #09b6f2;
        border-radius: 0.1rem;
      }
      .currentPrice {
        color: #09b6f2;
        font-size: 0.36rem;
        margin-bottom: 0.36rem;
      }
      .stock {
        color: #999;
        font-size: 0.22rem;
        margin-bottom: 0.56rem;
      }
    }
    .active {
      background: #fff;
      color: #09b6f2;
    }
  }

  .organizeNo input {
    margin-top: 0.3rem;
    border: none;
    border-bottom: 1px solid #999;
    color: #888;
    line-height: 30px;
    width: 96%;
    padding: 0 2%;
  }
  .btn-wrapper {
    padding: 0 1rem;
  }
  .btn {
    width: 100%;
    margin-top: 1.6rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background-image: linear-gradient(120deg, #32a3d7, #396def);
    font-size: 0.36rem;
    border-radius: 0.1rem;
    text-align: center;
    color: #fff;
  }
}
.detail {
  padding: 0 0.48rem;
  .title {
    margin-bottom: 0.3rem;
    text-align: center;
    font-size: 0.3rem;
    color: rgb(77, 77, 77);
  }
  .article {
    color: #666;
    line-height: 0.5rem;
    font-size: 0.26rem;
  }
}
</style>
