<template>
  <div class="seckill">
    <cbbHeader v-if="!templateConfig.removeTitle" :title="templateConfig.title || '卡券特卖'" :bg-color="templateConfig.headerBackground"></cbbHeader>
    <div class="banner">
      <a><img class="banner-img" :src="templateConfig.banner"></a>
    </div>
    <div class="seckill-container">
      <div class="proNameTitle">
        {{act.productList[0].proName}}
      </div>
      <div class="seckill-wrapper">

        <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'product_'+ind">
          <div class="plate-item" v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2">

            <div class="plate-info">
              <div class="item-img">
                <img :src="standard.standardImgUrl" />
              </div>
              <div class="item-detail">
                <div class="proName">{{standard.standardName}}
                  <!-- <span>(每人限购一个)</span> -->
                </div>
                <div class="proDesc">￥原价{{standard.originalPrice}}元</div>
                <div class="expire">
                  <!--   <div class="currentPrice">
                    每天限量200份
                  </div> -->

                </div>
              </div>
              <div class="item-price">
                <!-- <span>￥{{standard.currentPrice}}</span> -->
                <b>￥{{standard.currentPrice}}</b>

              </div>
              <div class="item-btn">
                <!--       <div class="store" v-if="!timeStatusMap[std.id].isInTime">尚未开始</div>
                    <div class="storeMap" v-if="timeStatusMap[std.id].isInTime">剩余{{storeMap[std.id]}}件</div> -->
                <!-- <div class="btn" v-if="timeStatusMap[std.id].isInTime" @click="kill(std)"> -->
                <div class="btn" @click="buy(standard)">
                  抢购</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="act-rule" v-if="act.detail">
        <div class="rule-title">活动规则</div>
        <div class="detail" v-html="act.detail"></div>
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
  data () {
    return {
      templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      timeStatusMap: {},
      running: false,
      storeMap: {}
    }
  },
  methods: {
    buy (standard) {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/index/cbbBuy001/standard/${standard.id}`)
    }
  },
  beforeDestroy () {
  },
  created () {
    console.log(this.templateConfig)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  background: #ebf2f7;
  .seckill-container {
    width: 100%;
    padding-bottom: 55px;
    .ad {
      margin: 0 0.24rem;
    }
    .title {
      padding-top: 0.4rem;
      height: 0.87rem;
      // background: url(./img/seckill_bg.png) no-repeat;
      background-size: 100% 100%;
      background-position-x: -0.04rem;
      color: #fff;
      font-size: 0.28rem;
      text-align: center;
      font-weight: 700;
    }
    .proNameTitle {
      font-size: 0.28rem;
      margin: 0 0.2rem;
      line-height: 1rem;
    }
    .seckill-wrapper {
      margin: 0 0.2rem;
      box-shadow: 0 0 10px #ccc;
      border-radius: 0.1rem;
      background: #fff;
      .linkPlate {
        /*  @include border-1px(#d9d9d9);
        &:nth-last-child(1) {
          &:after {
            border: none;
          }
        } */
        // padding: 0 0.24rem;
        .item-title {
          height: 1.2rem;
          display: flex;
          align-items: center;
          div {
            img {
              width: 0.4rem;
              margin-right: 0.2rem;
            }
          }
        }
        .plate-item {
          padding: 0 0.3rem;
          .seckill-title {
            padding-top: 0.25rem;
            white-space: nowrap;
            line-height: 0.6rem;
            font-size: 0.32rem;
            color: #fff;
            .time-item {
              display: inline-block;
              font-size: 0;
              div {
                display: inline-block;
                text-align: center;
                width: 0.6rem;
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.32rem;
                &.time-bg {
                  background-size: 100% 100%;
                }
              }
            }
          }
          .plate-info {
            display: flex;
            padding: 0.3rem 0;
            @include border-1px(#d9d9d9);
            &:nth-last-child(1) {
              border: none;
            }
            align-items: center;
            .item-img {
              flex: 1;
              font-size: 0;
              max-width: 1.2rem;
              height: 1.2rem;
              margin-right: 3%;
              padding: 5px;
              img {
                width: 1.12rem;
                height: 1.12rem;
                border-radius: 50%;
                margin-left: -6%;
                margin-top: -6%;
              }
            }
            .item-btn {
              width: 100;
              .btn {
                background-color: #09b6f2;
                color: white;
                border-radius: 0.1rem;
                text-align: center;
                padding: 0;
                width: 1.15rem;
                line-height: 0.46rem;
              }
              .storeMap {
                font-size: 0.24rem;
              }
              div {
                text-align: center;
              }
            }
            .item-detail {
              flex: 2;
              height: 1rem;
              line-height: 0.4rem;
              .proName {
                font-size: 0.28rem;
              }
              .proDesc {
                color: #999;
                text-decoration: line-through;
                font-size: 0.22rem;
                line-height: 1rem;
              }
              .expire {
                display: flex;
                align-items: center;
                font-size: 0.24rem;
                .currentPrice {
                  flex: 1;
                }
              }
            }
            .item-price {
              flex: 1;
              height: 1rem;
              b {
                color: #db1d34;
              }
            }
          }
        }
      }
    }
    .act-rule {
      padding: 0.3rem 0.3rem;
      .rule-title {
        font-size: 0.32rem;
        padding: 0.2rem 0;
      }
      .detail {
        line-height: 0.4rem;
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
