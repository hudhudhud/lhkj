<template>
  <div class="hemi-grid">
    <!-- <p class="chances">剩余抽奖机会: {{chances}}</p> -->
    <!-- <div class="box"> -->
    <div
      class="box"
      :style="{'backgroundImage': 'url(' + templateConfig.pannel+')', }"
    >
      <!-- <div class="border-light"> -->
      <div
        class="border-light"
        :style="{'backgroundImage': 'url('+ borderLightSrc+')'}"
      >
        <template v-if="act.actId==558318870 || act.actId==559786685">
          <div
            v-for="(imgLi, index) in prizeList"
            :key="'imgLi'+index"
            ref="pice"
            :id="imgLi.standardId"
            :class="{'activeHN': index == arrNum[lottery.index]} "
            :style="{'backgroundImage':'url('+imgLi.bgSrc+')','width': '2.1rem','height': '2.1rem'}"
          >
            <img
              :src="imgLi.standardImgUrl"
              v-if="imgLi.standardImgUrl"
            />
            <div :class="imgLi.defineStyle">{{imgLi.prizeName}}</div>
          </div>
        </template>
        <template v-else>
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
            <div :class="imgLi.defineStyle">{{imgLi.prizeName}}</div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/lib/eventBus';
import { Toast, Indicator } from 'mint-ui';
import { payUrl } from '@/config/';

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
      lightTimer: null,
      timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
      actualPrice: '',
      prepayId: '',
      payUrl: payUrl,
      prizePayload: {},
      lightFlag: true,
      clickFlag: true,
      chances: 0,
      prizeList: [],
      arrNum: [0, 1, 2, 5, 8, 7, 6, 3] // 定义转动的顺序
    };
  },
  computed: {
    borderLightSrc: function () {
      if (this.lightFlag) {
        return this.templateConfig.borderLight1;
      }
      return this.templateConfig.borderLight2;
    }
  },
  methods: {
    start () {
      clearInterval(this.lottery.timer);
      this.lottery.timer = setInterval(
        () => {
          if (this.lottery.index === '') {
            this.lottery.index = 0;
          } else if (this.lottery.index === 7) {
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
        // this.$set(item, 'bgSrc', noSelect)
        this.$set(item, 'bgSrc', this.templateConfig.prizeBackground);
      });
      this.act.productList.splice(4, 0, ' ');
      console.log(this.act.productList);
      this.prizeList = this.act.productList;
      this.$nextTick(() => {
        this.$refs.pice[4].style.backgroundImage =
          'url(' + this.templateConfig.button + ')';
        // this.$refs.pice[4].style.backgroundImage = 'url(' + lotteryBtn + ')'
        this.$refs.pice[4].onclick = () => {
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
        };
      });
    },
    payForChance () {
      let successUrl = `${window.location.protocol}//${window.location.host}/${
        this.$store.state.merchantAppid
      }/merchant/index/act/${this.act.actId}`;
      Toast('订单已生成...正在跳转支付');
      let payUrl = `${this.payUrl}${
        this.prepayId
      }?redirectUrl=${encodeURIComponent(successUrl)}`;
      window.location.href = payUrl;
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
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.act.actId,
        num: '1'
      });
      if (rs.status === 200) {
        this.prepayId = rs.payload.prepayId;
        rs.payload.keyward = 'showBuyChance';
        this.$emit('open-message', rs.payload);
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async lotteryDraw () {
      let rs = await this.$post('api/lottery_draw', {
        actId: this.act.actId
      });
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
  padding-top: 0.1rem;
  margin: 0 auto;
  height: 7.2rem;
  background-size: 100% 100%;
  .border-light {
    padding-top: 0.45rem;
    padding-left: 0.5rem;
    background-size: 100% 100%;
    div {
      float: left;
      width: 100%;
      height: 1.6rem;
      margin-right: 0.1rem;
      margin-bottom: 0.15rem;
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
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      div {
        line-height: 1rem;
        text-align: center;
        padding-top: 1.08rem;
      }
    }
  }
}

.activeHN {
  background-image: url(./img/isSelectHN.png) !important;
}
</style>
