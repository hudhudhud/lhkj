<template>
  <div>
    <template v-if="$route.query.isQuit == 'true'">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>
    <div class="seckill">
      <div class="banner">
        <a>
          <img
            class="banner-img"
            :src="templateConfig.banner"
          >
        </a>

      </div>
      <div
        class="rule-btn"
        @click="PopupFlag=true"
      >
      </div>

      <div class="chances">
        剩余<span>{{chances}}</span>次购买机会
      </div>
      <div class="seckill-container">
        <div class="seckill-wrapper">
          <div
            class="linkPlate"
            v-for="(product,ind) in act.productList"
            :key="'product_'+ind"
          >
            <div
              class="plate-item"
              v-for="(standard,ind2) in product.standardList"
              :key="ind+'_standard_'+ind2"
            >
              <div class="plate-info">
                <div class="item-img">
                  <img :src="standard.standardImgUrl">
                </div>
                <div class="item-detail">
                  <div class="proName">
                    {{standard.standardName}}
                    <!-- <span>(每人限购一个)</span> -->
                  </div>
                  <div class="item-price">
                    <!-- <span>￥{{standard.currentPrice}}</span> -->
                    <span>￥</span>{{standard.currentPrice}}
                  </div>
                  <div class="proDesc">￥{{standard.originalPrice}}元</div>
                  <div class="expire">
                    <!--   <div class="currentPrice">
                    每天限量200份
                  </div>-->
                  </div>
                </div>
                <div class="item-btn">
                  <div
                    class="surplusStock"
                    v-if="standard.surplusStock>=1000"
                  ><span>剩余(份):</span> 1000+</div>
                  <div
                    class="surplusStock"
                    v-else-if="standard.surplusStock<1000&&standard.surplusStock>=100"
                  ><span>剩余(份):</span> {{standard.surplusStock|priceselected}}+</div>
                  <div
                    class="surplusStock"
                    v-else-if="standard.surplusStock<50"
                  ><span>剩余(份):</span> 库存紧张</div>
                  <div
                    class="surplusStock"
                    v-else-if="standard.surplusStock<=100&&standard.surplusStock>=50"
                  ><span>剩余(份):</span> 50+</div>
                  <div
                    class="btn"
                    @click="buy(standard)"
                  > 去抢购</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="PopupFlag"
      @click="popRule"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="ruledetail">
        <div
          class="content"
          v-html="act.detail"
        >
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import headerBar from '@/components/headerBar';
import { Popup } from 'mint-ui';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    headerBar,
    [Popup.name]: Popup
  },
  data () {
    return {
      PopupFlag: false,
      chances: 0,
      templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      timeStatusMap: {},
      running: false,
      storeMap: {}
    };
  },
  methods: {
    popRule () {},
    async loadRecord () {
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$post('api/activity/custom/search/record', {
        actId: this.act.actId
      });
      if (rs.status === 200) {
        this.chances = JSON.parse(rs.payload).num;
      }
    },
    buy (standard) {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${standard.id}`
      );
    }
  },
  created () {
    this.loadRecord();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  background: #fff;
  .rule-btn {
    position: absolute;
    width: 1.73rem;
    height: 0.48rem;
    background: url("./imgs/rule.png") no-repeat;
    background-size: 100% 100%;
    top: 0.5rem;
    right: 0;
  }
  .chances {
    width: 3.5rem;
    height: 0.6rem;
    line-height: 0.6rem;
    margin: 0.4rem auto 0;
    border-radius: 0.3rem;
    background: rgb(255, 246, 232);
    color: rgb(34, 34, 34);
    font-size: 0.28rem;
    text-align: center;
    span {
      display: inline-block;
      padding: 0 0.04rem;
      color: rgb(243, 67, 91);
      font-size: 0.32rem;
    }
  }
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
    .seckill-wrapper {
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
          border-bottom: 1px dashed #939393;
          &:nth-last-child(1) {
            border: none;
          }
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
            padding: 0.3rem 5%;
            align-items: center;
            .item-img {
              flex: 1;
              font-size: 0;
              max-width: 1.84rem;
              height: 1.56rem;
              margin-right: 3%;
              padding: 0.1rem;
              //   background: url(./img/icon-zdms.png) no-repeat;
              background-size: 100% 100%;
              border-radius: 50%;
              img {
                width: 1.84rem;
                height: 1.56rem;
                border-radius: 50%;
                margin-left: -6%;
                margin-top: -6%;
              }
            }
            .item-btn {
              width: 1.8rem;
              .surplusStock {
                font-size: 0.28rem;
                margin: 0.1rem 0 0.06rem;
                color: rgb(243, 67, 91);
                white-space: nowrap;
                span {
                  color: rgb(176, 182, 191);
                  font-size: 0.22rem;
                }
              }
              .btn {
                margin: 0 auto;
                background-color: rgb(243, 67, 91);
                color: white;
                border-radius: 6px;
                text-align: center;
                padding: 0;
                width: 1.6rem;
                height: 0.58rem;
                line-height: 0.58rem;
                font-size: 0.28rem;
                font-weight: bold;
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
                color: rgb(198, 202, 200);
                text-decoration: line-through;
                font-size: 0.22rem;
                line-height: 0.3rem;
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
              // flex: 1;
              // height: 1rem;
              color: #db1d34;
              font-size: 0.48rem;
              padding-top: 0.2rem;
              span {
                font-size: 0.36rem;
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
.ruledetail {
  width: 6.39rem;
  height: 5.7rem;
  background: url("./imgs/rulebg.jpg") no-repeat 0.3rem;
  background-size: 100% 100%;
  padding: 1.9rem 0.5rem 0.4rem 0.6rem;
  text-align: left;
  .content {
    font-size: 0.28rem;
    color: rgb(59, 23, 0);
    line-height: 0.45rem;
    height: 3.5rem;
    overflow: scroll;
    span {
      color: rgb(240, 11, 0);
    }
  }
}
.mypop {
  background: transparent;
  top: 37%;
}
</style>
