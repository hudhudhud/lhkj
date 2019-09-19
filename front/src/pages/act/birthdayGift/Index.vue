<template>
  <div class="bg">
    <div class="banner">
      <a><img class="banner-img" src="./imgs/birthday-banner.png"></a>
    </div>
    <div class="group-title">
      专享生日礼
    </div>
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
            <div class="proDesc">认证生日即可领取</div>
            <div class="expire">
              <!--   <div class="currentPrice">
                    每天限量200份
                  </div> -->

            </div>
          </div>
          <div class="item-price">
            <!-- <span>￥{{standard.currentPrice}}</span> -->
            <!-- <b>￥{{standard.currentPrice}}</b> -->

          </div>
          <div class="item-btn">
            <!--       <div class="store" v-if="!timeStatusMap[std.id].isInTime">尚未开始</div>
                    <div class="storeMap" v-if="timeStatusMap[std.id].isInTime">剩余{{storeMap[std.id]}}件</div> -->
            <!-- <div class="btn" v-if="timeStatusMap[std.id].isInTime" @click="kill(std)"> -->
            <div class="btn" @click="openPicker" v-if="!hasBirthday"> 认证</div>
            <div class="btn gray-btn" v-else-if="isReceive">已领取</div>
            <div class="btn" v-else @click="receiveTicket(standard.id)"> 领取</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="group-title">
        幸运翻牌子
      </div>
      <div class="fc_cont">
        <div class="fc_wrapper" v-for="(ind) in 3" :key="'product_'+ind" @click="lotteryDraw(ind)">
          <div class="fc_inner" :class="{'fan': transformFlag && index == ind}">
            <div class="fc_front" :class="'pai'+ind"></div>
            <div class="fc_back">
              <div>恭喜您抽中</div>
              <div class="prizeName">{{prizeName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="act-rule">
      <div class="rule-title">活动规则</div>
      <div class="detail" v-html="act.detail"></div>
    </div>
    <mt-datetime-picker ref="picker" v-model="birthday" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="new Date('1968-01-01')">
    </mt-datetime-picker>
  </div>
</template>

<script>

import moment from 'moment'
import { Indicator, Toast } from 'mint-ui'
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      isReceive: false,
      prizeName: '',
      index: -1,
      timeMap: {},
      transformFlag: false,
      timeStatusMap: {},
      running: false,
      brandAct: null,
      birthday: '',
      chances: 0,
      lotteryActId: '129',
      hasBirthday: false,
      storeMap: {}
    }
  },
  methods: {
    async getReceiveState () {
      let rs = await this.$get('api/check/ticket/' + this.act.actId)
      if (rs.status == 200) {
        this.isReceive = rs.payload.isReceive
      }
    },
    async receiveTicket (standardId) {
      Indicator.open()

      let rs = await this.$post('/api/ticket_create_order', {
        standardId: standardId,
        actId: this.act.actId
      })
      if (rs.status == 200) {
        Toast('领取成功啦')
        this.isReceive = true
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    },
    async loadLotteryChance () {
      Indicator.open()
      let rs = await this.$get('api/get_lottery_info/' + this.lotteryActId)
      if (rs.status === 200) {
        this.chances = rs.payload.chances
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    },
    async loadBirthday () {
      let rs = await this.$get('api/get/customer_info')
      if (rs.status === 200) {
        if (JSON.parse(rs.payload).birthday) {
          this.hasBirthday = true
          this.loadLotteryChance()
        } else {
          this.hasBirthday = false
        }
      } else {
        Toast(rs.error)
      }
    },
    async setBirthday (birthday) {
      let rs = await this.$post('api/customer/set_birthday', {
        birthday: birthday
      })
      if (rs.status === 200) {
        Toast('认证成功啦')
        this.hasBirthday = true
        this.loadLotteryChance()
      } else {
        Toast(rs.error)
      }
    },
    async lotteryDraw (i) {
      Indicator.open()
      let rs = await this.$post('api/lottery_draw', {
        actId: this.lotteryActId
      })
      if (rs.status == 200) {
        this.prizeName = rs.payload.prizeName
        this.index = i
        this.transformFlag = true
      } else {
        Toast({
          message: rs.error,
          position: 'middle',
          duration: 1500
        })
      }
      Indicator.close()
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      this.birthday = moment(data).format('YYYY-MM-DD')
      this.setBirthday(this.birthday)
    }
  },
  beforeDestroy () {
  },
  created () {
    this.loadBirthday()
    this.getReceiveState()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.bg {
  background: #fff;
}
.banner-img {
  display: block;
  max-width: 100%;
}
.group-title {
  line-height: 0.8rem;
  font-size: 0.26rem;
  padding-left: 0.3rem;
  @include border-1px(#d9d9d9);
  background-color: #fff;
}
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
    background-color: #fff;
    margin-bottom: 0.1rem;
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
        padding: 5px;
        // background: url(./img/icon-zdms.png) no-repeat;
        background-size: 100%;
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
          background-color: orange;
          color: white;
          border-radius: 0.1rem;
          text-align: center;
          padding: 0;
          width: 1.35rem;
          line-height: 0.56rem;
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
          font-size: 0.3rem;
        }
        .proDesc {
          font-size: 0.26rem;
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
.container {
  background-color: #fff;
  .fc_cont {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0.3rem 5% 0;
    padding-bottom: 0.3rem;
    .fc_wrapper {
      width: 30%;
      height: 2.77rem;
      line-height: 0.5rem;
      font-size: 0.24rem;
      box-sizing: border-box;
      perspective: 1000px;
      margin: 0.1rem;
    }
    /* .fc_wrapper:hover .fc_inner {
      transform: rotateY(-180deg);
    } */
    .fc_inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      transform-origin: center center;
      transition: transform 0.8s;
    }
    .fc_front {
      position: absolute;
      z-index: 4;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }
    .fc_back {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform-origin: center center;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      .prizeName {
        color: #ff8c40;
      }
    }
    .fc_front {
      width: 100%;
      height: 100%;
      background: url(./imgs/pai-1.png) no-repeat;
      background-size: cover;
      border-radius: 0.1rem;
      &.pai0 {
        background: url(./imgs/pai-1.png) no-repeat;
        background-size: cover;
      }
      &.pai1 {
        background: url(./imgs/pai-2.png) no-repeat;
        background-size: cover;
      }
      &.pai2 {
        background: url(./imgs/pai-3.png) no-repeat;
        background-size: cover;
      }
    }
    .fc_back {
      padding-top: 0.3rem;
      text-align: center;
      border-radius: 0.1rem;
      background: url(./imgs/prizePai.png) no-repeat;
      background-size: cover;
    }
  }
}
.act-rule {
  padding: 0 0.3rem 0.3rem;
  .rule-title {
    font-size: 0.36rem;
    padding: 0.3rem 0;
  }
}
.fan {
  transform: rotateY(-180deg);
}
.gray-btn {
  filter: grayscale(100%);
}
</style>
