<template>
  <div class="seckill">

    <div class="seckill-container">
      <div class="seckill-wrapper" v-if="act">
        <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
          <div class="plate-item" v-for="std in product.standardList" :key="'std_'+std.id">
            <div class="plate-time" v-if="timeStatusMap[std.id]">
              <!-- <div class="seckill-title" v-if="timeStatusMap[std.id].isInTime">活动剩余时间 -->
              <div class="seckill-title" v-if="timeStatusMap[std.id].isInTime">
                <i></i>
                距结束
                <div class="time-item" v-for="(item, ind) in timeStatusMap[std.id].timeText" :key="ind">
                  <div class="time-bg">{{item.time}}</div>
                  <div v-if="item.unit">{{item.unit}}</div>
                </div>
              </div>
              <div class="seckill-title" v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time>0">
                <i></i>
                距开抢
                <div class="time-item" v-for="(item, ind) in timeStatusMap[std.id].timeText" :key="ind">
                  <div class="time-bg">{{item.time}}</div>
                  <div v-if="item.unit">{{item.unit}}</div>
                </div>
              </div>
              <!-- <div class="seckill-title" v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0">活动已结束</div> -->
              <div class="seckill-title" v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0">活动未开始</div>
            </div>
            <div class="plate-info" @click="open">

              <div class="item-detail">
                <!-- <div class="proName">{{std.standardName}}
                </div> -->
                <!-- <div class="proDesc">原价{{std.originalPrice}}元</div> -->
                <div class="item-img">
                  <img :src="std.standardImgUrl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="kill-date" v-if="setting.actId == 131">周一、周五限时开抢</div>
        <div class="kill-date" v-else>周一至周五开抢</div>
        <!--   <marquee  behavior=alternate style="color:#333">
          <div class="kill-date">周一至周五开抢</div>
        </marquee> -->
      </div>

    </div>
    <template v-if="running">
      <div class="running-cover"></div>
      <div class="running">
        正在处理中,请稍等...
        <mt-spinner type="triple-bounce"></mt-spinner>
      </div>
    </template>
  </div>
</template>

<script>
import { Indicator, Toast, Spinner } from 'mint-ui'
import { payUrl } from '@/config/'

export default {
  props: {
    setting: {
      type: Object,
      require: true
    }
  },
  components: {
    [Spinner.name]: Spinner
  },
  data () {
    return {
      payUrl,
      // templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      timeStatusMap: {},
      running: false,
      seckillToken: '',
      act: null,
      storeMap: {}
    }
  },
  methods: {
    open () {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/index/act/${this.setting.actId}`)
    },
    async loadAct (actId) {
      // Indicator.open()
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + actId)
      if (rs.status === 200) {
        this.act = rs.payload
      } else {
        // this.error = rs.error
      }
      // Indicator.close()
    },
    async getSeckillToken () {
      let rs = await this.$get('/api/seckill/get_token/' + this.setting.actId)
      if (rs.status == 200) {
        this.seckillToken = rs.payload.token
      }
    },
    getSecondTimeFomate (a) {
      var h = (parseInt(a / 3600))
      if (h.toString().length == 1) {
        h = '0' + h
      }
      var m = (parseInt((a % 3600) / 60))
      if (m.toString().length == 1) {
        m = '0' + m
      }
      var s = (parseInt(a % 60))
      // var s = (a - 3600 * h - 60 * m)
      if (s.toString().length == 1) {
        s = '0' + s
      }
      return [{time: h, unit: ':'}, {time: m, unit: ':'}, {time: s, unit: ''}]
    },
    calcTime () {
      let timeStatusMap = {}
      if (this.act) {
        this.act.productList.forEach(product => {
          product.standardList.forEach(standard => {
            let timeStatus = {}
            let now = Date.now()
            timeStatus.time = 0
            timeStatus.isInTime = false
            let timeList = this.timeMap[standard.id]
            if (!timeList) {
              return
            }
            for (let i = 0; i < timeList.length; i++) {
              let actTime = timeList[i]
              let startTime = actTime.startTime
              let endTime = actTime.endTime
              if (now < startTime) {
                timeStatus.isInTime = false
                timeStatus.time = startTime - now
                timeStatus.startTime = false
                break
              }
              if (now > startTime && now < endTime) {
                timeStatus.isInTime = true
                timeStatus.time = endTime - now
                timeStatus.startTime = startTime
                break
              }
            }
            timeStatus.timeText = this.getSecondTimeFomate(timeStatus.time / 1000)
            timeStatusMap[standard.id] = timeStatus
          })
        })
      }

      this.timeStatusMap = timeStatusMap
      this._ind = setTimeout(this.calcTime, 1000)
    },
    async getSeckillTime () {
      Indicator.open()
      let rs = await this.$get('api/seckill/time/' + this.setting.actId)
      if (rs.status == 200) {
        this.timeMap = rs.payload
        this._ind = this.calcTime()
        this.getSeckStore()
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    },
    async getSeckStore () {
      let delay = 5000
      if (this._indexStore) {
        clearTimeout(this._indexStore)
      }
      let rs = await this.$post('api/seckill/store/' + this.setting.actId, this.timeStatusMap)
      if (rs.status == 200) {
        this.storeMap = rs.payload
        // console.log(this.storeMap)
      } else {
        delay = 10000
      }

      this._indexStore = setTimeout(this.getSeckStore, delay)
    },
    async kill (std) {
      this.running = true
      let rs = await this.$post('api/seckill/kill', {
        actId: this.setting.actId,
        standardId: std.id,
        token: this.seckillToken,
        proId: std.proId
      })
      if (rs.status == 405) {
        // 节流 重试
        setTimeout(() => {
          this.kill(std)
        }, 10000 * Math.random())
        return
      }
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId
        // let orderCode = rs.payload.orderCode
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`
        Toast('订单已生成...正在跳转支付')
        let payUrl = `${this.payUrl}${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`
        window.location.replace(payUrl)
      } else {
        Toast(rs.error)
      }
      this.running = false
    }
  },
  beforeDestroy () {
    if (this._ind) {
      clearTimeout(this._ind)
    }
    if (this._indexStore) {
      clearTimeout(this._indexStore)
    }
  },
  created () {
    this.getSeckillToken()
    this.getSeckillTime()
    this.loadAct(this.setting.actId)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  .seckill-container {
    width: 100%;
    .ad {
      margin: 0 0.24rem;
    }
    .title {
      padding-top: 0.4rem;
      height: 0.87rem;
      background: #333333;
      color: #333;
      font-size: 0.28rem;
      text-align: center;
      font-weight: 700;
    }
    .seckill-wrapper {
      margin: 0 0.2rem;
      .linkPlate {
        display: flex;
        flex-wrap: nowrap;
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
          flex: 1;
          .plate-time {
            position: relative;
            top: 0.44rem;
          }
          .seckill-title {
            white-space: nowrap;
            line-height: 0.4rem;
            font-size: 0.24rem;
            text-align: center;
            color: red;
            i {
              display: inline-block;
              width: 0.26rem;
              height: 0.26rem;
              background: url(./img/lock.jpg) no-repeat;
              background-size: 100% 100%;
              vertical-align: -0.04rem;
            }
            .time-item {
              display: inline-block;
              font-size: 0;
              color: #333;
              div {
                display: inline-block;
                text-align: center;
                width: 0.1rem;
                line-height: 0.3rem;
                font-size: 0.24rem;
                &.time-bg {
                  width: 0.28rem;
                  line-height: 1;
                  background-color: #333;
                  border-radius: 0.04rem;
                  color: #fff;
                }
              }
            }
          }
          .plate-info {
            /*  display: flex;
            align-items: center; */
            width: 100%;
            text-align: center;
            color: #333;
            .item-img {
              img {
                width: 2.1rem;
                height: 2.1rem;
              }
            }
            .item-detail {
              .proName {
                // font-size: 0.234\rem;
                color: #333;
                line-height: 0.6rem;
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
.kill-date {
  color: #333;
  font-size: 0.2rem;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(rgb(234, 41, 10)),
    to(rgba(246, 199, 156, 1))
  );
  -webkit-text-fill-color: transparent;
  text-align: center;
}
</style>
