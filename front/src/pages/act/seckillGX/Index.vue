<template>
  <div class="seckill">
    <back></back>
    <div class="seckill-container">

      <div class="seckill-wrapper">
        <div
          class="linkPlate"
          v-for="(product,ind) in act.productList"
          :key="'pro_'+ind"
        >
          <div
            class="plate-item"
            v-for="(std, ind1) in product.standardList"
            :key="'std_'+std.id"
          >
            <div
              class="plate-time"
              v-if="ind1== 0 && timeStatusMap[std.id]"
            >
              <div
                class="seckill-title"
                v-if="timeStatusMap[std.id].isInTime"
              >活动剩余时间:
                <div
                  class="time-item"
                  v-for="(item, ind) in timeStatusMap[std.id].timeText"
                  :key="ind"
                >
                  <div class="time-bg">{{item.time}}</div>
                  <div class="unit">{{item.unit}}</div>
                </div>
              </div>
              <div
                class="seckill-title"
                v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time>0"
              >距离抢购开始还有:
                <div
                  class="time-item"
                  v-for="(item, ind) in timeStatusMap[std.id].timeText"
                  :key="ind"
                >
                  <div v-if="ind==0"></div>

                  <div class="time-bg">{{item.time}}</div>
                  <div>{{item.unit}}</div>
                </div>
              </div>
              <div
                class="seckill-title"
                v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0"
              >活动未开始</div>
            </div>
            <div
              class="plate-info"
              @click="kill(std)"
              :style="{'backgroundImage':'url('+std.standardActUrl+')'}"
            >
              <div class="item-img">
                <!-- <img :src="std.standardImgUrl"> -->
              </div>
              <div class="item-detail">
                <div class="proName">
                  {{std.standardName}}
                  <!-- <span>(每人限购一个)</span> -->
                </div>

                <!-- <div class="proDesc">原价{{std.originalPrice}}元</div> -->
                <div class="expire">
                  <div
                    class="currentPrice"
                    v-if="timeStatusMap[std.id]"
                  >
                    <div
                      class="store"
                      v-if="!timeStatusMap[std.id].isInTime"
                    >尚未开始</div>
                    <template v-else>
                      <div
                        class="storeMap"
                        v-if="storeMap[std.id] == 0 && storeMap[std.id+'_pay']> 0"
                      >还有订单未支付,您还有抢购机会</div>
                      <div
                        class="storeMap"
                        v-else
                      >剩余张数:&nbsp;{{storeMap[std.id]}}张</div>
                      <div
                        class="btn"
                        :class="{'gray-btn': storeMap[std.id+'_pay'] == 0}"
                        v-if="storeMap[std.id] == 0 && storeMap[std.id+'_pay'] == 0"
                      >已下架</div>

                    </template>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <template v-if="running">
        <div class="running-cover"></div>
        <div class="running">正在处理中,请稍等...
          <mt-spinner type="triple-bounce"></mt-spinner>
        </div>
      </template>
    </div>
    <img
      class="bottom-img"
      src="./bottom-img.png"
      alt=""
    >
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
      thisDay: new Date().getDay() == 0 ? 7 : new Date().getDay(),
      payUrl,
      templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      noticeTimeMap: {},
      timeInterval: [],
      dateTime: [],
      dateTimeTxt: ['一', '二', '三', '四', '五', '六', '日'],
      timeStatusMap: {},
      running: false,
      seckillToken: '',
      storeMap: {}
    };
  },
  methods: {
    timestampToTime (timer) {
      let date = new Date();
      var Y = date.getFullYear() + '-';
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      return Y + M + D + '' + timer;
    },
    async getSeckillNotice () {
      let rs = await this.$post('api/get_time_config_actId', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
      } else {
        Toast(rs.error);
      }
    },
    async getSeckillToken () {
      let rs = await this.$get('/api/seckill/get_token/' + this.act.actId);
      if (rs.status == 200) {
        this.seckillToken = rs.payload.token;
      } else {
        Toast(rs.error);
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
        { time: h, unit: '' },
        { time: m, unit: '' },
        { time: s, unit: '' }
      ];
    },
    calcTime () {
      let timeStatusMap = {};
      this.act.productList.forEach(product => {
        product.standardList.forEach(standard => {
          let timeStatus = {};
          timeStatus.time = 0;
          timeStatus.isInTime = false;
          let timeList = this.timeMap[standard.id];
          if (!timeList) {
            return;
          }
          this.noticeTimeStatus(timeList, timeStatus);
          timeStatus.timeText = this.getSecondTimeFomate(
            timeStatus.time / 1000
          );
          timeStatusMap[standard.id] = timeStatus;
        });
      });
      this.timeStatusMap = timeStatusMap;
      this._ind = setTimeout(this.calcTime, 1000);
    },
    noticeTimeStatus (timeList, timeStatus) {
      let now = Date.now();
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
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/order`;
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payUrl);
      } else {
        Toast(rs.error);
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
    this.getSeckillNotice();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  padding-bottom: 2.5rem;
  background: #ffd2d0 url(./bg.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  padding-bottom: 2.5rem;
  .swipe-wrapper {
    height: 3.08rem;
    img {
      width: 100%;
    }
  }
  .seckill-container {
    padding-top: 6rem;

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
        margin: 0 0.46rem;
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
          margin-bottom: 0.1rem;
          .seckill-title {
            color: #ff6c99;
            white-space: nowrap;
            line-height: 0.6rem;
            font-size: 0.28rem;
            text-align: center;

            .time-item {
              display: inline-block;
              font-size: 0;
              font-weight: bold;
              color: #fff;
              div {
                display: inline-block;
                text-align: center;
                width: 0.24rem;
                line-height: 0.44rem;
                font-size: 0.26rem;
                height: 0.44rem;
                &.time-bg {
                  width: 0.44rem;
                  background: #ff6c99;
                }
              }
            }
          }
          .plate-info {
            display: flex;
            padding: 0.3rem 5%;
            align-items: center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin: 0 0.3rem;
            height: 2.4rem;
            .item-img {
              flex: 1;
              font-size: 0;
              max-width: 1.2rem;
              height: 1.2rem;
              margin-right: 3%;
              padding: 5px;
              // background: url(./img/icon-zdms.png) no-repeat;
              background-size: 100%;
              border-radius: 50%;
              img {
                width: 1.12rem;
                border-radius: 50%;
                margin-left: -6%;
                margin-top: -6%;
              }
            }
            .item-btn {
              .btn {
                float: right;
                background-color: #db1d34;
                color: white;
                border-radius: 4px;
                text-align: center;
                width: 1.45rem;
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
                width: 2.8rem;
                font-size: 0.28rem;
                span {
                  color: #db1d34;
                }
              }
              .proDesc {
                text-decoration: line-through;
                font-size: 0.22rem;
                line-height: 0.5rem;
              }
              .proName {
                color: #ffffff;
                font-size: 0.32rem;
                margin-top: 0.3rem;
              }
              .expire {
                display: flex;
                align-items: center;
                font-size: 0.24rem;
                color: #ffb7cd;
                .currentPrice {
                  flex: 1;
                }
              }
            }
          }
        }
      }
    }
    .act-rule {
      padding: 0.3rem 0.3rem;
      .rule-title {
        margin-bottom: 0.3rem;
        font-size: 0;
        text-align: center;
        img {
          width: 5.99rem;
        }
      }
      .detail {
        line-height: 0.4rem;
        color: rgb(17, 101, 136);
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
.bottom-img {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  z-index: 5;
}
</style>
