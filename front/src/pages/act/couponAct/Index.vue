<template>
  <div class="seckill">
    <cbbHeader :title="templateConfig.title || '卡券特卖'" :bg-color="templateConfig.headerBackground"></cbbHeader>
    <div class="banner">
      <a>
        <img class="banner-img" :src="templateConfig.banner">
      </a>
    </div>
    <div class="seckill-container">
      <div class="seckill-wrapper" v-for="(act, actIndex) in actGroup" :key="'act'+actIndex">
        <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'product_'+ind">
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
                <div class="proName">{{standard.standardName}}</div>
                <div class="proDesc">原价{{standard.originalPrice}}元</div>
                <div class="expire"></div>
              </div>
              <div class="item-price">
                <b>￥{{standard.currentPrice}}</b>
              </div>
              <div class="item-btn">
                <div class="btn" @click="buy(standard)">抢购</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="seckill-wrapper">
        <div class="linkPlate" v-if="act.actId==98">
          <div class="plate-item">
            <div class="plate-info">
              <div class="item-img">
                <img
                  src="//static.lianhaikeji.com/images/20180927/1bf1a84f6a374471a899c578e5546e3f.png"
                >
              </div>
              <div class="item-detail">
                <div class="proName">100元油卡充值</div>
                <div class="proDesc">原价100元</div>
              </div>
              <div class="item-price">
                <b>￥1</b>
              </div>
              <div class="item-btn">
                <div
                  class="btn"
                  @click="$router.push(`/${$store.state.merchantAppid}/merchant/cardwin/1101`)"
                >抢购</div>
              </div>
            </div>
          </div>
          <div class="plate-item">
            <div class="plate-info">
              <div class="item-img">
                <img
                  src="//static.lianhaikeji.com/images/20180927/1bf1a84f6a374471a899c578e5546e3f.png"
                >
              </div>
              <div class="item-detail">
                <div class="proName">200元油卡充值</div>
                <div class="proDesc">原价200元</div>
              </div>
              <div class="item-price">
                <b>￥1</b>
              </div>
              <div class="item-btn">
                <div
                  class="btn"
                  @click="$router.push(`/${$store.state.merchantAppid}/merchant/cardwin/1103`)"
                >抢购</div>
              </div>
            </div>
          </div>
        </div>
        <div class="linkPlate" v-if="act.actId==187">
          <div class="plate-item">
            <div class="plate-info">
              <div class="item-img">
                <img
                  src="//static.lianhaikeji.com/images/20180927/1bf1a84f6a374471a899c578e5546e3f.png"
                >
              </div>
              <div class="item-detail">
                <div class="proName">100元油卡充值</div>
                <div class="proDesc">原价100元</div>
              </div>
              <div class="item-price">
                <b>￥1</b>
              </div>
              <div class="item-btn">
                <div
                  class="btn"
                  @click="$router.push(`/${$store.state.merchantAppid}/merchant/cardwin/1104`)"
                >抢购</div>
              </div>
            </div>
          </div>
        </div>
        <div class="linkPlate" v-if="act.actId==198">
          <div class="plate-item">
            <div class="plate-info">
              <div class="item-img">
                <img
                  src="//static.lianhaikeji.com/images/20180927/1bf1a84f6a374471a899c578e5546e3f.png"
                >
              </div>
              <div class="item-detail">
                <div class="proName">200元油卡充值</div>
                <div class="proDesc">原价200元</div>
              </div>
              <div class="item-price">
                <b>￥1</b>
              </div>
              <div class="item-btn">
                <div
                  class="btn"
                  @click="$router.push(`/${$store.state.merchantAppid}/merchant/cardwin/1105`)"
                >抢购</div>
              </div>
            </div>
          </div>
        </div>
        <div class="linkPlate" v-if="act.actId==547690734">
          <div class="plate-item">
            <div class="plate-info">
              <div class="item-img">
                <img
                  src="//static.lianhaikeji.com/images/20180927/1bf1a84f6a374471a899c578e5546e3f.png"
                >
              </div>
              <div class="item-detail">
                <div class="proName">100元油卡充值</div>
                <div class="proDesc">原价100元</div>
              </div>
              <div class="item-price">
                <b>￥1</b>
              </div>
              <div class="item-btn">
                <div
                  class="btn"
                  @click="$router.push(`/${$store.state.merchantAppid}/merchant/cardwin/1106`)"
                >抢购</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      actGroup: [],
      storeMap: {}
    };
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.actGroup.push(rs.payload);
      } else {
      }
      return true;
    },
    buy (standard) {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${standard.id}`
      );
    }
  },
  beforeDestroy () {},
  created () {
    let i = 0;
    let arr = this.templateConfig.actArr;
    for (; i < arr.length;) {
      if (this.loadAct(arr[i].actId)) {
        i++;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  .seckill-container {
    width: 100%;
    padding-bottom: 55px;
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
      .linkPlate {
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
              max-width: 1.2rem;
              height: 1.2rem;
              margin-right: 3%;
              padding: 0.1rem;
              background: url(./img/icon-zdms.png) no-repeat;
              background-size: 100% 100%;
              border-radius: 50%;
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
                background-color: #db1d34;
                color: white;
                border-radius: 8px;
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
                color: #ffa8a8;
                text-decoration: line-through;
                font-size: 0.22rem;
                line-height: 0.7rem;
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
