<template>
  <div>
    <div class="container">
      <cbbHeader title="中信国旅"></cbbHeader>
      <div class="banner">
        <a><img class="banner-img" src="//static.lianhaikeji.com/images/20180921/2f8d1cca7ad94772b6f0c0cc139c189a.png"></a>
      </div>
      <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
        <div class="plate-item" v-for="std in product.standardList" :key="'std_'+std.id">
          <div class="plate-info">
            <div class="item-img">
              <img :src="std.standardImgUrl" />
            </div>
            <div class="item-detail">
              <div class="proName">{{std.standardName}}
                <!-- <span>(每人限购一个)</span> -->
              </div>
              <!-- <div class="proDesc">原价{{std.originalPrice}}元</div> -->
              <!--  <div class="expire">
                {{std.standardInstruction}}
              </div> -->
              <div class="currentPrice">
                ¥{{std.currentPrice}}
              </div>
            </div>
            <div class="item-btn">
              <div class="btn" @click="buy(std)">
                预约</div>
              <div class="detail">
                <a href="https://static.lianhaikeji.com/h5/zhongxingguolv/index.htm">查看详情&nbsp;>></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader'
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    cbbHeader
  },
  methods: {
    buy (standard) {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/index/cbbBuy001/standard/${standard.id}`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.container {
  background: #fff;
  width: 100%;
  .banner img {
    display: block;
    max-width: 100%;
  }
  .linkPlate {
    .plate-item {
      // @include border-1px(#999);
      @include border-1px(#999);
      &:nth-last-child(1) {
        &:after {
          border: none;
        }
      }
      .plate-info {
        display: flex;
        padding: 0.3rem 5%;
        align-items: center;
        .item-img {
          flex: 1;
          font-size: 0;
          max-width: 2.2rem;
          margin-right: 4%;
          padding: 5px;
          // background: url(./img/icon-zdms.png) no-repeat;
          background-size: 100%;
          img {
            width: 2.2rem;
            margin-left: -6%;
            margin-top: -6%;
          }
        }
        .item-btn {
          .btn {
            background-color: #ff7e00;
            color: white;
            border-radius: 0.1rem;
            text-align: center;
            padding: 0.12rem 0.2rem;
            line-height: 1;
          }
          .detail {
            margin-top: 0.3rem;
            font-size: 0.24rem;
            color: #3260aa;
            text-align: right;
            font-weight: bold;
          }
        }
        .item-detail {
          flex: 2;
          .proName {
            font-size: 0.3rem;
            margin-bottom: 0.8rem;
          }
          .expire {
            padding: 0.14rem 0 0.26rem;
            align-items: center;
            font-size: 0.18rem;
            color: #999;
          }
          .currentPrice {
            font-weight: bold;
            color: #c71f1f;
          }
        }
      }
    }
  }
}
</style>
