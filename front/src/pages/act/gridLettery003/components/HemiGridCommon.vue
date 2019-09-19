<template>
  <div class="hemi-grid">
    <!-- <p class="chances">剩余抽奖机会: {{chances}}</p> -->
    <!-- <div class="box"> -->
    <div
      class="box"
      :style="{'backgroundImage': 'url(' + templateConfig.pannel+')'}"
    >
      <!-- <div class="border-light"> -->
      <div
        class="border-light"
        :style="{'backgroundImage': 'url('+ borderLightSrc+')'}"
      >
        <div
          v-for="(imgLi, index) in prizeList"
          :key="'imgLi'+index"
          ref="pice"
          :id="imgLi.standardId"
          :class="{ 'active': index == arrNum[lottery.index]} "
          :style="{'backgroundImage':'url('+imgLi.bgSrc+')'}"
        >
          <img
            :src="imgLi.standardImgUrl"
            v-if="imgLi.standardImgUrl"
          />
          <div :class="imgLi.defineStyle">{{imgLi.prizeName}}</div>
        </div>
      </div>
    </div>
    <div class="btnchances">您共有{{Paychances}}次抽奖机会</div>

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
      arrNum: [0, 1, 2, 5, 8, 7, 6, 3], // 定义转动的顺序,
      Paychances: 0
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
    async getactChances () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async getPaychances () {
      Indicator.open();
      let rs = await this.$post('api/activity/custom/search/record', {
        actId: this.act.actId
      });
      if (rs.status === 200) {
        this.Paychances = JSON.parse(rs.payload).num;
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
    this.getactChances();
    this.getPaychances();
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
  width: 6.94rem;
  height: 6.9rem;
  padding-left: 0.11rem;
  padding-top: 0.1rem;
  margin: 0 auto;
  background-size: 100% 100%;
  .border-light {
    width: 6.94rem;
    height: 6.9rem;
    padding-top: 0.3rem;
    padding-left: 0.4rem;
    background-size: 100% 100%;
    div {
      float: left;
      width: 1.94rem;
      height: 1.98rem;
      margin-right: 0.05rem;
      margin-bottom: 0.05rem;
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      font-size: 0.24rem;
      color: #138844;
      box-sizing: border-box;
      img {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      div {
        line-height: 0.35rem;
        text-align: center;
        padding-top: 1.3rem;
        &.lh5 {
          line-height: 0.28rem;
        }
      }
    }
  }
}
.btnchances {
  width: 4.11rem;
  height: 0.75rem;
  background: url("../img/btnchance.png") no-repeat;
  background-size: 100% 100%;
  margin: 0.2rem auto;
  font-size: 0.34rem;
  color: #008742;
  text-align: center;
  line-height: 0.7rem;
  font-weight: 500;
}
.active {
  background-image: url(../img/is-selected.png) !important;
}
</style>
