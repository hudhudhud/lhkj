<template>
  <div class="out-box" :style="{'background-color': templateConfig.pageColor}">
    <back></back>
    <img class="bg-img" :src="templateConfig.background" alt="background">
    <div class="page">
      <div class="page-time" v-if="list.length" :style="{'background-image': 'url('+templateConfig.timeBg+')'}">
        <template v-if="timeStatusMap[list[0].id]">
          <p class="list-extra" v-if="timeStatusMap[list[0].id].isInTime">
            限时秒杀：<span v-for="(t, i) in timeStatusMap[list[0].id].timeText"
              :key="i"><label>{{t.time}}</label>{{t.unit}}</span>
          </p>
          <p class="list-extra" v-if="!timeStatusMap[list[0].id].isInTime && timeStatusMap[list[0].id].time>0">
            距活动开始<span v-for="(t, i) in timeStatusMap[list[0].id].timeText"
              :key="i"><label>{{t.time}}</label>{{t.unit}}</span>
          </p>
          <p class="list-extra" v-if="!timeStatusMap[list[0].id].isInTime && timeStatusMap[list[0].id].time==0">
            活动未开始
          </p>
        </template>
      </div>
      <div class="standard-list">
        <template v-for="standard in list">
          <div class="standard-item" :key="standard.id"
            :style="{'background-image': 'url('+standard.standardImgUrl+')'}">
            <div class="standard-content">
              <div class="standard-name">{{standard.standardName}}</div>
              <div class="standard-price">秒杀价:&yen;{{standard.currentPrice}}</div>
              <div class="standard-limit">库存:{{storeMap[standard.id] || standard.limitPerTime}}</div>
            </div>
            <div class="standard-action" :class="{'disabled':disabled}" @click="kill(standard)">
              {{templateConfig.btnText}}</div>
          </div>
        </template>
      </div>
      <div class="page-rule">
        <div class="rule-label" :style="{'background-image': 'url('+templateConfig.ruleTitle+')'}"></div>
        <div class="rule-content" v-html="act.detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { payUrl } from '@/config/';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      templateConfig: JSON.parse(this.act.templateConfig),
      payUrl: payUrl,
      seckillToken: '',
      timeMap: {},
      timeStatusMap: {},
      storeMap: {}, // 实时库存
      totalStore: {}, // 总库存
      list: []
    };
  },
  async mounted () {
    this.list = this.act.productList[0].standardList;
    await this.getSeckillToken();
    await this.getSeckillTime();
  },
  methods: {
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
        { time: h, unit: ' : ' },
        { time: m, unit: ' : ' },
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
    async getSeckillToken () {
      let rs = await this.$get('/api/seckill/get_token/' + this.act.actId);
      if (rs.status == 200) {
        this.seckillToken = rs.payload.token;
      } else {
        this.$toast(rs.error);
      }
    },
    async getSeckillTime () {
      this.$indicator.open();
      let rs = await this.$get('api/seckill/time/' + this.act.actId);
      if (rs.status == 200) {
        this.timeMap = rs.payload;
        this._ind = this.calcTime();
        this.getSeckStore();
      } else {
        this.$toast(rs.error);
      }
      this.$indicator.close();
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
      if (this.disabled) {
        return;
      }
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
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`;
        this.$toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payUrl);
      } else if (rs.status === 500 && rs.payload) {
        if ('is_buy' in rs.payload && rs.payload.is_buy == 1) {
          this.$router.push(
            `/${this.$store.state.merchantAppid}/merchant/index/order?actId=${this.act.actId}`
          );
        } else {
          this.$toast(rs.error);
        }
      } else {
        this.$toast(rs.error);
      }
    }
  },
  computed: {
    disabled () {
      let disabled =
        (!this.timeStatusMap[this.list[0].id].isInTime &&
          this.timeStatusMap[this.list[0].id].time > 0) ||
        (!this.timeStatusMap[this.list[0].id].isInTime &&
          this.timeStatusMap[this.list[0].id].time == 0);
      return disabled;
    }
  },
  destroyed () {
    clearTimeout(this._indexStore);
  }
};
</script>

<style scoped lang="scss">
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  .bg-img {
    position: absolute;
    top: 0;
    max-width: 100%;
  }
}
.page {
  position: absolute;
  width: 100%;
  &-time {
    text-align: center;
    color: #fff;
    background-image: url("./img/time-bg.png");
    width: 3.6rem;
    height: 0.8rem;
    line-height: 0.96rem;
    margin: 4.9rem auto 0;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    padding-left: 0.3rem;
    p {
      font-size: 0.22rem;
      label {
        display: inline-block;
        background-color: #fff;
        color: red;
        line-height: 0.3rem;
        padding: 0 0.04rem;
        border-radius: 2px;
      }
    }
  }

  .standard-list {
    width: 5.56rem;
    margin: 0 auto;
    .standard-item {
      position: relative;
      width: 100%;
      height: 2rem;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      margin-top: 0.2rem;
      .standard-content {
        box-sizing: border-box;
        height: 100%;
        margin-left: 1.5rem;
        color: #f8f8f8;
        padding: 0.4rem 0.14rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .standard-name {
          font-size: 0.3rem;
        }
        .standard-price {
          font-size: 0.28rem;
        }
        .standard-limit {
          font-size: 0.24rem;
        }
      }
      .standard-action {
        position: absolute;
        width: 1.3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        color: #ff5b26;
        font-size: 0.24rem;
        background-color: #fff;
        border-radius: 0.08rem;
        right: 0.26rem;
        top: 0.75rem;
        &.disabled {
          background: #d9d9d9;
          color: #fafafa;
        }
      }
    }
  }
  &-rule {
    position: relative;
    width: 6.9rem;
    min-height: 4rem;
    border-radius: 10px;
    margin: 0.5rem auto 1.1rem;
    background-color: rgba(255, 255, 255, 0.86);
    padding: 0.8rem 0.3rem 0.3rem;
    .rule-label {
      position: absolute;
      top: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 3.08rem;
      height: 0.7rem;
      background-image: url("./img/rule-label.png");
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .rule-content {
      font-size: 0.26rem;
      line-height: 0.36rem;
    }
  }
}
</style>
