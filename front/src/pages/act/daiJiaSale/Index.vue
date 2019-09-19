<template>
  <div class="travel-gift">
    <headerBar
      :title="act.actName"
      :bgColor="'#2cb5f6'"
    ></headerBar>
    <div class="button">
      <div
        class="one-coin"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/act/${linkAct}`)"
      >1元惠打车</div>
      <div class="driving current">8.88元叫代驾</div>
    </div>
    <div class="main">
      <div class="word">
        <img
          src="./imgs/word.png"
          alt
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
              v-for="std in product.standardList"
              :key="'std_'+std.id"
            >
              <div
                class="plate-time"
                v-if="timeStatusMap[std.id]"
              >
                <div
                  class="seckill-title count-down"
                  v-if="timeStatusMap[std.id].isInTime"
                >
                  <div class="clock">倒计时</div>
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
                    class="time-item "
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
                ></div>
              </div>
              <div class="plate-info">
                <div class="ticket">
                  <img :src="std.standardImgUrl">
                </div>
                <div class="item-detail">
                  <!--    <div class="proName">
                  {{std.standardName}}
                  <span>(每人限购一个)</span>
                    <span>￥{{std.currentPrice}}</span>
                  </div> -->
                  <!-- <div class="proDesc">原价{{std.originalPrice}}元</div> -->

                </div>
                <div
                  class="item-btn"
                  v-if="timeStatusMap[std.id]"
                >
                </div>
              </div>
              <div
                class="buying"
                @click="kill(std)"
              >立即抢购</div>
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

      <div class="rule">
        <div v-html="act.detail"></div>
      </div>
    </div>

  </div>
</template>

<script>
import headerBar from '@/components/headerBar';
import { Indicator, Toast, Spinner } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  data () {
    return {
      linkAct: process.env.PUBLISH_ENV == 'prod' ? 548913513 : 548732301,
      ruleShow: false,
      payUrl,
      timeMap: {},
      timeStatusMap: {},
      running: false,
      seckillToken: '',
      storeMap: {}
    };
  },
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    [Spinner.name]: Spinner,
    headerBar
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
        { time: h, unit: ':' },
        { time: m, unit: ':' },
        { time: s, unit: '' }
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
.travel-gift {
  position: relative;
  .button {
    position: absolute;
    top: 1.2rem;
    left: 0.5rem;
    width: 6.48rem;
    height: 0.92rem;
    display: flex;
    font-size: 0.36rem;
    text-align: center;
    line-height: 0.92rem;
    color: rgb(237, 79, 67);
    .one-coin {
      width: 3.24rem;
      height: 0.92rem;
      border-left: 1px solid rgb(237, 79, 67);
      border-top: 1px solid rgb(237, 79, 67);
      border-bottom: 1px solid rgb(237, 79, 67);
      border-radius: 0.16rem 0 0 0.16rem;
      background-color: #fff;
      &.current {
        color: #fff;
        background-color: rgb(237, 79, 67);
      }
    }
    .driving {
      width: 3.24rem;
      height: 0.92rem;
      border-right: 1px solid rgb(237, 79, 67);
      border-top: 1px solid rgb(237, 79, 67);
      border-bottom: 1px solid rgb(237, 79, 67);
      border-radius: 0rem 0.16rem 0.16rem 0;
      background-color: #fff;
      &.current {
        color: #fff;
        background-color: rgb(237, 79, 67);
      }
    }
  }
  .main {
    background: url("./imgs/bg.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 3.4rem;
    .word {
      margin: 0 0 0 1.8rem;
      img {
        width: 4.15rem;
      }
    }
    .count-down {
      text-align: center;
      margin: 0.5rem;
      font-size: 0.32rem;
      color: #fff;
      .clock {
        padding-right: 0.1rem;
        font-size: 0.34rem;
        color: rgb(255, 226, 137);
      }
    }
    .ticket {
      text-align: center;
      img {
        width: 5.35rem;
      }
    }
    .buying {
      margin: 0.3rem auto 0;
      width: 5.17rem;
      height: 1.1rem;
      position: relative;
      z-index: 3;
      background: url("./imgs/buying.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 1.1rem;
      font-size: 0.4rem;
      color: #f2443c;
      font-weight: bold;
    }
    .rule {
      width: 7.5rem;
      height: 5.77rem;
      position: relative;
      top: -0.7rem;
      padding: 2.7rem 0.8rem 0 1.5rem;
      background: url("./imgs/rulebg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 0.4rem;
      font-size: 0.3rem;
      color: rgb(255, 219, 132s);
      div {
        position: absolute;
        top: 2.5rem;
        width: 6rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .lottery {
    // position: relative;
    height: 12.3rem;
    background: url("./imgs/bg1.png") no-repeat;
    background-size: 100% 100%;
    .rules {
      position: absolute;
      top: 2.4rem;
      right: 0rem;
      width: 2.1rem;
      img {
        width: 100%;
      }
    }
  }
}
.seckill-title {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 0.28rem;
  text-align: center;
  margin: 0.5rem 0 0.3rem;
  .time-item {
    display: inline-block;
    font-size: 0;
    color: #fff;
    div {
      display: inline-block;
      text-align: center;
      width: 0.4rem;
      line-height: 0.44rem;
      font-size: 0.26rem;
      &.time-bg {
        border-radius: 0.04rem;
        background-color: rgb(88, 77, 77);
      }
    }
  }
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
