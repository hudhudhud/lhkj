<template>
  <div class="seckill">
    <cbbHeader
      v-if="!templateConfig.removeTitle"
      :title="templateConfig.title || '半价秒杀'"
      :bg-color="templateConfig.headerBackground"
    ></cbbHeader>
    <div
      v-if="templateConfig.banner"
      class="banner"
    >
      <img
        class="banner-img"
        :src="templateConfig.banner"
      >
    </div>

    <div class="seckill-container">
      <div class="seckill-wrapper">
        <div
          class="linkPlate"
          v-for="(product,ind) in act.productList"
          :key="'pro_'+ind"
        >
          <div
            class="plate-item"
            v-for="(std, ind2) in product.standardList"
            :key="'std_'+std.id"
          >
            <template v-if="ind2 == 0">

              <div
                class="plate-time"
                v-if="timeStatusMap[std.id]"
              >
                <div class="date">每周三、每周五上午十点</div>
                <div
                  class="seckill-title"
                  v-if="timeStatusMap[std.id].isInTime"
                >活动剩余时间
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
                <div
                  class="seckill-title"
                  v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0"
                >活动未开始</div>
              </div>
            </template>
            <div class="plate-info">
              <div class="item-img">
                <img :src="std.standardImgUrl">
              </div>
              <div class="item-detail">
                <div class="proName">
                  {{std.standardName}}
                  <!-- <span>(每人限购一个)</span> -->
                </div>
                <!-- <div class="proDesc">原价{{std.originalPrice}}元</div> -->
                <div class="light">秒杀价</div>

                <div class="expire">
                  <div class="currentPrice light">
                    ￥<span class="light ">{{std.currentPrice}}</span>
                    <span class="originalPrice">￥{{std.originalPrice}}</span>
                    <!-- <b>{{std.currentPrice}}</b> 元 -->
                  </div>
                </div>
              </div>
              <div
                class="item-btn"
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
                  >剩余{{storeMap[std.id]}}件</div>
                  <div
                    class="btn"
                    :class="{'gray-btn': storeMap[std.id+'_pay'] == 0}"
                    v-if="storeMap[std.id] == 0 && storeMap[std.id+'_pay'] == 0"
                  >已下架</div>
                  <div
                    class="btn"
                    v-else
                    @click="kill(std)"
                  >去秒杀</div>
                </template>
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
      <div class="act-rule">
        <div
          class="detail"
          v-html="act.detail||暂无说明"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, Spinner } from 'mint-ui';
import { payUrl } from '@/config/';
import cbbHeader from '@/components/cbbHeader';
export default {
  components: {
    [Spinner.name]: Spinner,
    cbbHeader
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
  background: #fff;

  .swipe-wrapper {
    height: 3.08rem;
    img {
      width: 100%;
    }
  }
  .seckill-container {
    width: 100%;
    padding-top: 4.2rem;
    background: rgb(70, 66, 255) url(./imgs/bg.jpg) no-repeat;
    background-size: 100% auto;
    padding-bottom: 0.3rem;
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
          padding: 0 0.2rem 0.22rem;
          text-align: center;
          .date {
            color: #fff;
            font-size: 0.32rem;
          }
          .seckill-title {
            padding-left: 0.2rem;
            white-space: nowrap;
            line-height: 0.6rem;
            font-size: 0.28rem;
            color: #fff;
            .time-item {
              display: inline-block;
              font-size: 0;
              div {
                display: inline-block;
                text-align: center;
                width: 0.44rem;
                height: 0.4rem;
                line-height: 0.44rem;
                font-size: 0.26rem;
                &.time-bg {
                  color: #333;
                  background: #fff;
                }
              }
            }
          }
          .plate-info {
            display: flex;
            padding: 0.3rem 1% 0.2rem;
            border-radius: 0.1rem;
            background: #fff;
            align-items: center;
            .item-img {
              flex: 1;
              font-size: 0;
              max-width: 2.5rem;
              margin-right: 5%;
              background-size: 100%;
              border-radius: 50%;
              img {
                width: 2.5rem;
                margin-top: -6%;
              }
            }
            .item-btn {
              padding-top: 0.5rem;
              white-space: nowrap;
              .btn {
                float: right;
                background-color: rgb(255, 107, 49);
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
              height: 1.6rem;
              text-align: left;
              .light {
                color: rgb(255, 107, 49);
              }
              .proName {
                color: #333;
                margin-bottom: 0.5rem;
                font-size: 0.32rem;
                white-space: nowrap;
                span {
                  color: #db1d34;
                }
              }
              .proDesc {
                text-decoration: line-through;
                font-size: 0.22rem;
                line-height: 0.5rem;
              }
              .expire {
                display: flex;
                align-items: center;
                font-size: 0.24rem;
                .currentPrice {
                  flex: 1;
                  .light {
                    font-weight: bold;
                    font-size: 0.36rem;
                  }
                  .originalPrice {
                    color: #333;
                    font-size: 0.28rem;
                    text-decoration: line-through;
                    line-height: 0.3rem;
                  }
                }
              }
            }
          }
        }
      }
    }
    .act-rule {
      padding: 1.2rem 0.3rem 0 0.3rem;
      width: 6.96rem;
      margin: 0.3rem auto 0;
      height: 4.5rem;
      overflow-y: scroll;
      background: url(./imgs/rule-bg.png) no-repeat;
      background-size: 100% 100%;
      color: #fff;
      .rule-title {
        font-size: 0.32rem;
        padding: 0.2rem 0.3rem;
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
.gray-btn {
  filter: grayscale(100%);
}
</style>
