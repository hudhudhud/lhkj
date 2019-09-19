<template>
  <div class="seckill">
    <div class="banner">
      <img class="banner-img" src="./img/seckill-banner.jpg">
    </div>
    <div class="seckill-container">
      <div class="title">活动专区</div>
      <div class="seckill-wrapper">
        <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
          <div class="plate-item" v-for="std in product.standardList" :key="'std_'+std.id">
            <div class="plate-time" v-if="timeStatusMap[std.id]">
              <div class="seckill-title" v-if="timeStatusMap[std.id].isInTime">活动剩余时间
                <div
                  class="time-item"
                  v-for="(item, ind) in timeStatusMap[std.id].timeText"
                  :key="ind"
                >
                  <div class="time-bg">{{item.time}}</div>
                  <div>{{item.unit}}</div>
                </div>
              </div>
              <div
                class="seckill-title"
                v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time>0"
              >距离抢购开始还有
                <div
                  class="time-item"
                  v-for="(item, ind) in timeStatusMap[std.id].timeText"
                  :key="ind"
                >
                  <div class="time-bg">{{item.time}}</div>
                  <div>{{item.unit}}</div>
                </div>
              </div>
              <!-- <div class="seckill-title" v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0">活动已结束</div> -->
              <div
                class="seckill-title"
                v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0"
              >活动未开始</div>
            </div>
            <div class="plate-info">
              <div class="item-img">
                <img :src="std.standardImgUrl">
              </div>
              <div class="item-detail">
                <div class="proName">
                  {{std.standardName}}
                  <span>(每人限购一个)</span>
                </div>
                <div class="proDesc">原价{{std.originalPrice}}元</div>
                <div class="expire">
                  <div class="currentPrice">
                    <b>{{std.currentPrice}}</b> 元
                  </div>
                  <div class="item-btn" v-if="timeStatusMap[std.id]">
                    <div class="store" v-if="!timeStatusMap[std.id].isInTime">尚未开始</div>
                    <template v-else>
                      <div
                        class="storeMap"
                        v-if="storeMap[std.id] == 0 && storeMap[std.id+'_pay']> 0"
                      >还有订单未支付,您还有抢购机会</div>
                      <div class="storeMap" v-else>剩余{{storeMap[std.id]}}件</div>
                      <div
                        class="btn"
                        :class="{'gray-btn': storeMap[std.id+'_pay'] == 0}"
                        v-if="storeMap[std.id] == 0 && storeMap[std.id+'_pay'] == 0"
                      >已下架</div>
                      <div class="btn" v-else @click="kill(std)">立即抢购</div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ad">
        <a :href="templateConfig.bannerUrl">
          <img class="banner-img" :src="templateConfig.banner" alt>
        </a>
      </div>
    </div>
    <template v-if="running">
      <div class="running-cover"></div>
      <div class="running">正在处理中,请稍等...
        <mt-spinner type="triple-bounce"></mt-spinner>
      </div>
    </template>
  </div>
</template>

<script>
import { Indicator, Toast, Spinner } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  components: {
    [Spinner.name]: Spinner
  },
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      payUrl,
      templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      timeStatusMap: {},
      running: false,
      seckillToken: '',
      storeMap: {}
    };
  },
  methods: {
    async getSeckillToken () {
      let rs = await this.$get('/api/seckill/get_token/' + this.act.actId);
      if (rs.status == 200) {
        this.seckillToken = rs.payload.token;
      }
    },
    getSecondTimeFomate (a) {
      var h = parseInt(a / 3600);
      if (h.toString().length == 1) {
        h = '0' + h;
      }
      var m = parseInt((a % 3600) / 60);
      if (m.toString().length == 1) {
        m = '0' + m;
      }
      var s = parseInt(a % 60);
      // var s = (a - 3600 * h - 60 * m)
      if (s.toString().length == 1) {
        s = '0' + s;
      }
      return [
        { time: h, unit: '时' },
        { time: m, unit: '分' },
        { time: s, unit: '秒' }
      ];
    },
    calcTime () {
      let timeStatusMap = {};
      this.act.productList.forEach(product => {
        product.standardList.forEach(standard => {
          let timeStatus = {};
          let now = Date.now();
          timeStatus.time = 0;
          timeStatus.isInTime = false;
          let timeList = this.timeMap[standard.id];
          if (!timeList) {
            return;
          }
          for (let i = 0; i < timeList.length; i++) {
            let actTime = timeList[i];
            let startTime = actTime.startTime;
            let endTime = actTime.endTime;
            if (now < startTime) {
              timeStatus.isInTime = false;
              timeStatus.time = startTime - now;
              timeStatus.startTime = false;
              break;
            }
            if (now > startTime && now < endTime) {
              timeStatus.isInTime = true;
              timeStatus.time = endTime - now;
              timeStatus.startTime = startTime;
              break;
            }
          }
          timeStatus.timeText = this.getSecondTimeFomate(
            timeStatus.time / 1000
          );
          timeStatusMap[standard.id] = timeStatus;
        });
      });
      this.timeStatusMap = timeStatusMap;
      this._ind = setTimeout(this.calcTime, 1000);
    },
    async getSeckillTime () {
      Indicator.open();
      let rs = await this.$get('api/seckill/time/' + this.act.actId);
      if (rs.status == 200) {
        this.timeMap = rs.payload;
        this._ind = this.calcTime();
        this.getSeckStore();
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async getSeckStore () {
      let delay = 5000;
      if (this._indexStore) {
        clearTimeout(this._indexStore);
      }
      let rs = await this.$post(
        'api/seckill/store/' + this.act.actId,
        this.timeStatusMap
      );
      if (rs.status == 200) {
        this.storeMap = rs.payload;
        console.log(this.storeMap);
      } else {
        delay = 10000;
      }

      this._indexStore = setTimeout(this.getSeckStore, delay);
    },
    async kill (std) {
      this.running = true;
      let rs = await this.$post('api/seckill/kill', {
        actId: this.act.actId,
        standardId: std.id,
        token: this.seckillToken,
        proId: std.proId
      });
      if (rs.status == 405) {
        // 节流 重试
        setTimeout(() => {
          this.kill(std);
        }, 10000 * Math.random());
        return;
      }
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        // let orderCode = rs.payload.orderCode
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/order`;
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payUrl);
      } else {
        if (rs.payload && rs.payload.is_buy == '1') {
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${
              this.$store.state.merchantAppid
            }/merchant/index/order`
          );
        } else {
          Toast(rs.error);
        }
      }
      this.running = false;
    }
  },
  beforeDestroy () {
    if (this._ind) {
      clearTimeout(this._ind);
    }
    if (this._indexStore) {
      clearTimeout(this._indexStore);
    }
  },
  created () {
    this.getSeckillToken();
    this.getSeckillTime();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  background: #250647;
  .seckill-container {
    width: 100%;
    padding-bottom: 0.24rem;
    .ad {
      margin: 0 0.24rem;
    }
    .title {
      padding-top: 0.4rem;
      height: 0.87rem;
      background: url(./img/seckill_bg.png) no-repeat;
      background-size: 100% 100%;
      background-position-x: -0.04rem;
      color: #fff;
      font-size: 0.28rem;
      text-align: center;
      font-weight: 700;
    }
    .seckill-wrapper {
      margin: 0 0.24rem;
      background: #4b48d7;
      .linkPlate {
        @include border-1px(#d9d9d9);
        &:nth-last-child(1) {
          &:after {
            border: none;
          }
        }
        padding: 0 0.24rem;
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
          @include border-1px(#d9d9d9);
          &:nth-last-child(1) {
            &:after {
              border: none;
            }
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
                  background: url(./img/time-bg.png) no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
          .plate-info {
            display: flex;
            align-items: center;
            .item-img {
              flex: 1;
              font-size: 0;
              padding-bottom: 0.2rem;
              img {
                width: 2.8rem;
                margin-right: 0.3rem;
              }
            }
            .item-detail {
              flex: 2;
              .proName {
                font-size: 0.32rem;
                color: #fff;
              }
              .proDesc {
                text-decoration: line-through;
                color: #ffa8a8;
                font-size: 0.28rem;
                line-height: 0.5rem;
              }
              .expire {
                display: flex;
                align-items: center;
                font-size: 0.24rem;
                color: #fff;
                .currentPrice {
                  flex: 1;
                  b {
                    font-size: 0.58rem;
                    color: #ffe67a;
                  }
                }
                .item-btn {
                  flex: 1;
                  width: 100;
                  color: #fff;
                  align-items: center;
                  .btn {
                    width: 1.9rem;
                    height: 0.72rem;
                    font-size: 0.28rem;
                    background: url(./img/seckill-btn.png) no-repeat;
                    background-size: 100% 100%;
                    line-height: 0.72rem;
                  }
                  .storeMap {
                    font-size: 0.24rem;
                  }
                  div {
                    text-align: center;
                  }
                }
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
.gray-btn {
  filter: grayscale(100%);
}
</style>
