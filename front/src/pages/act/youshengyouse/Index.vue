<template>
  <div class="seckill">
    <cbbHeader title="视频音乐优惠购"></cbbHeader>
    <div class="banner">
      <a>
        <img class="banner-img" src="./img/banner.jpg">
      </a>
    </div>
    <div class="seckill-container">
      <div class="seckill-wrapper" v-for="(act, actIndex) in actGroup" :key="'act'+actIndex">
        <div class="item-title">
          <img v-if="actIndex == 0" src="./img/vipCard.png" alt>
          <img v-if="actIndex == 1" src="./img/musicVip.png" alt>
        </div>
        <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'product_'+ind">
          <!--  <div class="plate-item" v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2" @click="buy(standard)">
            <img :src="standard.standardImgUrl" />

          </div>-->
          <div
            class="plate-item"
            v-for="(standard,ind2) in product.standardList"
            :key="ind+'_standard_'+ind2"
            @click="buy(standard)"
          >
            <div class="item-img">
              <img :src="standard.standardImgUrl" alt>
            </div>
            <div class="item-detail">
              <div class="proName">{{standard.standardName}}</div>
              <!-- <div class="proDesc">{{standard.standardName}}</div> -->
            </div>

            <div class="item-btn">
              <div class="item-price" v-if="actIndex == 0">
                <div class="currentPrice">
                  ¥
                  <b>{{(standard.currentPrice * 0.19).toFixed(2)}}</b>
                </div>
                <div
                  class="priceBtn"
                >已省{{(standard.originalPrice-(standard.currentPrice * 0.19)).toFixed(2)}}元</div>
              </div>
              <div class="item-price" v-if="actIndex == 1">
                <div class="currentPrice">
                  ¥
                  <b>{{standard.currentPrice * 0.5}}</b>
                </div>
                <div class="priceBtn">已省{{standard.originalPrice-(standard.currentPrice * 0.5)}}元</div>
              </div>
              <div class="receiveBtn">购买</div>
            </div>
          </div>
        </div>
      </div>
      <div class="act-rule">
        <div class="rule-title">活动规则</div>
        <div class="detail" v-html="act.detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import cbbHeader from '@/components/cbbHeader';
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
  data () {
    return {
      templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      timeStatusMap: {},
      running: false,
      storeMap: {},
      actGroup: [this.act]
    };
  },
  methods: {
    async loadAct (actId) {
      Indicator.open();
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.actGroup.push(rs.payload);
      } else {
        this.error = rs.error;
      }
      Indicator.close();
    },
    buy (standard) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/cbbBuy/standard/${
          standard.id
        }`
      );
    }
  },
  beforeDestroy () {},
  created () {
    this.loadAct('547452115');
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  background-color: rgb(245, 245, 245);
  .seckill-container {
    width: 100%;
    padding-bottom: 0.24rem;
    .ad {
      margin: 0 0.24rem;
    }
    .title {
      padding-top: 0.4rem;
      height: 0.87rem;
      background-size: 100% 100%;
      background-position-x: -0.04rem;
      color: #fff;
      font-size: 0.28rem;
      text-align: center;
      font-weight: 700;
    }
    .seckill-wrapper {
      .item-title {
        display: flex;
        height: 0.87rem;
        border-bottom: 1px solid #eee;
        img {
          width: 100%;
        }
        margin-top: 0.4rem;
      }
      .linkPlate {
        background: #fff;
        .plate-item {
          padding: 0 0.2rem;
          display: flex;
          height: 1.8rem;
          align-items: center;
          @include border-1px(#d9d9d9);
          &:nth-last-child(1) {
            &:after {
              border: none;
            }
          }
          .item-img {
            width: 1rem;
            margin-right: 0.2rem;
            img {
              width: 100%;
            }
          }
          .item-detail {
            height: 1rem;
            .proName {
              font-size: 0.28rem;
              font-weight: 400;
              color: #000;
              line-height: 0.6rem;
            }
            .proDesc {
              font-size: 0.22rem;
              color: #888;
            }
            .expire {
              font-size: 0.24rem;
              color: #888;
              line-height: 0.6rem;
            }
          }
          .item-btn {
            display: flex;
            width: 100;
            flex: 1;
            justify-content: flex-end;
            .receiveBtn {
              width: 1.2rem;
              height: 0.56rem;
              margin-left: 0.2rem;
              border-radius: 0.1rem;
              font-size: 0.28rem;
              color: #fff;
              line-height: 0.58rem;
              background: #09b6f2;
              background-size: 100% 100%;
              text-align: center;
            }
            .item-price {
              text-align: center;
              color: #fff;
              .currentPrice {
                color: #fc0b11;
                b {
                  font-size: 0.3rem;
                }
              }

              .priceBtn {
                font-size: 0.14rem;
                border-radius: 6rem;
                padding: 0.04rem 0.1rem;
                background: #dd1d34;
              }
            }
          }
        }
      }
    }
    .act-rule {
      padding: 0.3rem 0.3rem;
      .rule-title {
        font-size: 0.36rem;
        padding: 0.3rem 0;
      }
    }
  }
}
.banner-img {
  display: block;
  max-width: 100%;
}
.running-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}
.running {
  position: fixed;
  z-index: 1988;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  background: #fff;
  padding: 1rem 0.4rem;
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.5rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
