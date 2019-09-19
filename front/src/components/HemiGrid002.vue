<template>
  <div class="hemi-grid">

    <div
      class="box"
      :style="{'backgroundImage': 'url(' + templateConfig.pannel+')', }"
    >
      <div class="border-light">
        <div
          v-for="(imgLi, index) in prizeList"
          :key="'imgLi'+index"
          ref="pice"
          :id="imgLi.standardId"
          :class="{'active': index == arrNum[lottery.index]} "
          :style="{'backgroundImage':'url('+imgLi.bgSrc+')'}"
        >
          <img
            :src="imgLi.standardImgUrl"
            v-if="imgLi.standardImgUrl"
          />
          <div :class="imgLi.defineStyle">{{imgLi.prizeName}}
            <p class="total">剩余：{{imgLi.prizeTotal-imgLi.usedTotal}}份 </p>

          </div>
        </div>

      </div>
    </div>

    <div
      v-if="chances>0"
      @click="lettery"
      class="pay active"
    >
      <img
        src="./img/lettery-img.png"
        width="100%"
        alt=""
      >
    </div>
    <div
      v-else
      @click="lettery"
      class="pay"
    >
      <img
        src="./img/lettery-pay.png"
        width="100%"
        alt=""
      >
    </div>
    <BuyChance
      v-model="showBuyChance"
      ref="BuyChance"
      :payload="chancePayload"
    ></BuyChance>

  </div>
</template>

<script>
import bus from '@/lib/eventBus';
import { buyChance } from '@/lib/api';
import { Toast, Indicator } from 'mint-ui';
import { payUrl } from '@/config/';
import BuyChance from '@/components/BuyChance';

export default {
  name: 'HemiGrid',
  props: {
    templateConfig: {
      require: true,
      type: Object
    },
    act: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      lottery: {
        index: '',
        timer: null,
        prizeStandardId: '',
        ring: 4
      },
      chancePayload: null,
      lightTimer: null,
      showBuyChance: false,
      timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
      actualPrice: '',
      payUrl: payUrl,
      prizePayload: {},
      lightFlag: true,
      clickFlag: true,
      chances: 0,
      prizeList: [],
      arrNum: [0, 1, 2, 5, 8, 7, 6, 3, 4] // 定义转动的顺序
    };
  },
  computed: {
    tel () {
      return this.$store.state.cust ? this.$store.state.cust.tel : null;
    }
  },
  components: {
    BuyChance
  },
  methods: {
    lettery () {
      // this.buyChance();

      // 绑定抽奖按钮事件
      if (this.chances > 0) {
        // 判断剩余抽奖次数
        if (this.clickFlag) {
          this.clickFlag = false; // 不能点击
          // this.timer1 = setInterval(this.move, 100) // 开始转
          this.start();
          this.lotteryDraw(); // 获取结果
        }
      } else {
        // 没有抽奖机会了
        this.buyChance();
      }
    },
    start () {
      clearInterval(this.lottery.timer);
      this.lottery.timer = setInterval(
        () => {
          if (this.lottery.index === '') {
            this.lottery.index = 0;
          } else if (this.lottery.index === 8) {
            this.lottery.index = 0;
            if (this.lottery.ring > 0) {
              this.lottery.ring--;
              this.start();
            } else {
              this.lottery.prizeStandardId = this.prizePayload.standardId;
            }
            console.log('ring:' + this.lottery.ring);
            console.log('time' + Math.abs(100 * ((this.lottery.ring - 2) / 2)));
          } else {
            this.lottery.index++;
          }
          if (this.lottery.prizeStandardId) {
            if (
              this.$refs.pice[this.arrNum[this.lottery.index]].id ==
              this.lottery.prizeStandardId
            ) {
              clearInterval(this.lottery.timer); // stop
              this.prizePayload.keyward = 'showPrize';
              this.clickFlag = true;
              this.chances--;
              setTimeout(() => {
                this.$emit('open-message', this.prizePayload);
                this.lottery.index = '';
              }, 1000);

              this.lottery.ring = 4;
              this.lottery.prizeStandardId = '';
              this.timeFlag = 0;
            }
          }
          this.timeFlag += 100;
          console.log('timeFlag:' + this.timeFlag);
          if (this.timeFlag >= 10000 && !this.prizeName) {
            // 抽奖回调超时
            clearInterval(this.lottery.timer);
            this.timeFlag = 0;
            Toast({
              message: '当前抽奖人数过多，稍后再来',
              position: 'middle',
              duration: 1500
            });
            this.clickFlag = true; // 能点击
          }
        },
        Math.abs(100 * ((this.lottery.ring - 2) / 2)) == 0
          ? 50
          : Math.abs(200 * ((this.lottery.ring - 2) / 2))
      );
    },
    renderPrize () {
      this.act.productList.forEach(item => {
        if (item.prizeName.length > 7) {
          this.$set(item, 'defineStyle', 'lh5');
        }
        this.$set(item, 'bgSrc', this.templateConfig.prizeBackground);
      });
      this.prizeList = this.act.productList;
    },
    buyChance () {
      let self = this;
      let actId = self.act.actId;
      buyChance(actId, rs => {
        rs.payload['actId'] = actId + '';
        self.chancePayload = rs.payload;
        self.showBuyChance = true;
      });
    },
    async loadAct () {
      if (!this.$store.state.token && this.$store.state.merchantId == 191) {
        return;
      }
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async lotteryDraw () {
      let rs;
      if (this.tel) {
        rs = await this.$post('api/lottery_draw', {
          actId: this.act.actId,
          account: this.tel
        });
      } else {
        rs = await this.$post('api/lottery_draw', {
          actId: this.act.actId
        });
      }
      if (rs.status == 200) {
        this.prizePayload = rs.payload;
        console.log(this.prizePayload);
      } else {
        Toast({
          message: rs.error,
          position: 'middle',
          duration: 1500
        });
        this.clickFlag = false; // 不能点击
        clearInterval(this.lottery.timer);
      }
    }
  },
  created () {
    this.renderPrize();
    this.loadAct();
  },
  updated () {},
  mounted () {
    bus.$on('pay-for-chance', () => {
      this.payForChance();
    });
    this.lightTimer = setInterval(() => {
      this.lightFlag = !this.lightFlag;
    }, 100);
  },
  beforeDestroy () {
    clearInterval(this.lightTimer);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  width: 7.09rem;
  height: 7.56rem;
  padding-left: 0.66rem;
  padding-top: 0.82rem;
  margin: 0 auto;
  background-size: 100% 100%;
  .border-light {
    div {
      float: left;
      width: 1.86rem;
      height: 1.93rem;
      margin-right: 0.1rem;
      margin-bottom: 0.1rem;
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      font-size: 0.22rem;
      color: #802520;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:nth-child(7),
      &:nth-child(8),
      &:nth-child(9) {
        margin-bottom: 0;
      }
      box-sizing: border-box;
      img {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      div {
        line-height: 0.36rem;
        text-align: center;
        padding-top: 1.08rem;
        &.lh5 {
          line-height: 0.28rem;
        }
      }
      .total {
        color: #e57627;
        font-size: 0.2rem;
      }
    }
  }
}
.active {
  background-image: url(./img/is-selected.png) !important;
}
.activeHN {
  background-image: url(./img/isSelectHN.png) !important;
}
.pay {
  width: 4.58rem;
  margin: 0.2rem auto;
  font-size: 0;
}
.active {
  animation: scale 2s infinite linear;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
