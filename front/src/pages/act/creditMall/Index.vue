<template>
  <div class="template">
    <Back></Back>
    <img class="banner" :src="banner">
    <div class="pannel-list">
      <div class="pannel" v-for="(product,ind) in productList" :key="'product_'+ind">
        <div class="pannel-title">
          <div class="pannel-title-name">
            <img v-if="product.iconUrl" :src="product.iconUrl" />{{product.proName}}&nbsp;&nbsp; <span>当前剩余积分：{{useableCredit}}</span>

          </div>
          <!-- <div class="pannel-title-link" @click="openProduct(product)">
            产品介绍
            <img src="@/assets/template001/imgs/arrow.png" />
          </div> -->
        </div>
        <div class="pannel-content">
          <div class="pannel-item" v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2" @click="buy(standard)">
            <img class="pannel-img" :src="standard.standardImgUrl" />
            <div class="pannel-name">{{standard.standardName}}</div>
            <!-- <div class="pannel-price">¥{{standard.originalPrice}}</div> -->
            <!-- <div class="pannel-btn" @click="buy(standard)">立减{{standard.originalPrice-standard.currentPrice}}元</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserCredit } from '@/pages/share/api/api.js'
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      useableCredit: 0,
      accumulatedCredit: 0,
      spend: 0,
      banner: '//static.lianhaikeji.com/images/20180724/d8aac5540bbc4d62a37665bf830da674.png',
      productList: this.act.productList
    }
  },
  methods: {
    buy (standard) {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/buy/standard/${standard.id}`)
    },
    openProduct (product) {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/buy/product/${product.id}`)
    }
  },
  created () {
    getUserCredit(this)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.template {
  background: #eee;
  font-size: 0.28rem;
  .banner {
    width: 100%;
  }
  .pannel-list {
    padding: 0.05rem 0;
    .pannel {
      padding: 0.6rem 0.2rem 0.2rem;
      box-sizing: border-box;
      background: #fff;
      display: flex;
      flex-direction: column;
      margin-bottom: 0.1rem;
      .pannel-title {
        font-size: 0.4rem;
        margin-bottom: 0.2rem;
        .pannel-title-name {
          color: #cc1b30;
          font-size: 0.36rem;
          img {
            height: 0.4rem;
            margin-right: 0.25rem;
            vertical-align: -0.06rem;
          }
          span {
            color: #666;
            font-size: 0.28rem;
          }
        }
        .pannel-title-link {
          flex: 0 0 auto;
          color: #666;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          img {
            height: 0.16rem;
            margin-left: 0.05rem;
          }
        }
      }
      .pannel-content {
        display: flex;
        flex-wrap: wrap;
        .pannel-item {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          // border: 1px solid #eee;
          // border-right: none;
          box-sizing: border-box;
          padding: 0.2rem 0;
          /*     &:last-child {
            border-right: 1px solid #eee;
          } */
          .pannel-img {
            display: block;
            margin: 0.1rem auto;
            width: 50%;
            margin-bottom: 0;
          }
          .pannel-name {
            line-height: 0.6rem;
            text-align: center;
          }
          .pannel-price {
            line-height: 0.6rem;
            text-align: center;
            color: #d2304d;
            font-size: 0.4rem;
            margin-bottom: 0.2rem;
            text-decoration: line-through;
          }
          .pannel-btn {
            height: 0.6rem;
            line-height: 0.6rem;
            width: 2rem;
            margin: 0 auto;
            background: red;
            background: linear-gradient(#eb4f21, #cc1b30);
            color: #fff;
            border-radius: 0.3rem;
            text-align: center;
            font-size: 0.32rem;
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
