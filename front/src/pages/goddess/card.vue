<template>
  <div class="card clearfix">
    <div class="card-box">
      <div class="card-row">
        <div
          class="card-row_item"
          @click="tryMyluck(0)"
        >
          <img
            :src="defaultImg1.front"
            :class="defaultImg1.class"
            alt=""
          >
          <p v-if="defaultImg1.class=='reward'">{{defaultImg1.coupon}}</p>
        </div>
        <div
          class="card-row_item"
          @click="tryMyluck(1)"
        >
          <img
            :src="defaultImg2.front"
            :class="defaultImg2.class"
            alt=""
          >
          <p v-if="defaultImg2.class=='reward'">{{defaultImg2.coupon}}</p>
        </div>
      </div>
      <div class="card-row">
        <div
          class="card-row_item"
          @click="tryMyluck(2)"
        >
          <img
            :src="defaultImg3.front"
            :class="defaultImg3.class"
            alt=""
          >
          <p v-if="defaultImg3.class=='reward'">{{defaultImg3.coupon}}</p>
        </div>
        <div
          class="card-row_item"
          @click="tryMyluck(3)"
        >
          <img
            :src="defaultImg4.front"
            :class="defaultImg4.class"
            alt=""
          >
          <p v-if="defaultImg4.class=='reward'">{{defaultImg4.coupon}}</p>
        </div>
      </div>
    </div>
    <div
      class="card-coupon"
      @click="createOrder"
    ></div>
    <div
      class="card-tips"
      @click="toShare"
    >
      <div class="card-tips-txt"></div>
    </div>
    <CouponDialog
      :type="type"
      title="恭喜您获得"
      ref="dialog"
      @confirm="confirm"
      @close="closeDialog"
    ></CouponDialog>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import CouponDialog from './component/dialog';
import front from './img/card/front.png';
import pity from './img/card/pity.png';
import g1 from './img/card/g1.png';
import g2 from './img/card/g2.png';
import g3 from './img/card/g3.png';
import g4 from './img/card/g4.png';
import g5 from './img/card/g5.png';
import g6 from './img/card/g6.png';
// import cash from './img/dialog/cash.png';
import { payUrl } from '@/config/';
import jssdk from '@/lib/jssdk';

export default {
  name: 'card',
  components: {
    CouponDialog
  },
  data () {
    return {
      type: true,
      prize: null,
      receiveAct: null,
      letteryActId: process.env.PUBLISH_ENV == 'prod' ? '551948250' : 551753855,
      receiveActId: process.env.PUBLISH_ENV == 'prod' ? '551949928' : 551754381,
      chances: 0,
      payUrl: payUrl,
      defaultImg1: {
        front: front,
        pity: pity,
        reward: '',
        opened: false,
        class: '',
        coupon: ''
      },
      defaultImg2: {
        front: front,
        pity: pity,
        reward: '',
        opened: false,
        class: '',
        coupon: ''
      },
      defaultImg3: {
        front: front,
        pity: pity,
        reward: '',
        opened: false,
        class: '',
        coupon: ''
      },
      defaultImg4: {
        front: front,
        pity: pity,
        reward: '',
        opened: false,
        class: '',
        coupon: ''
      },
      reward: [g1, g2, g3, g4, g5, g6],
      pity: pity,
      enoughBuyCount: 0
    };
  },
  mounted () {
    // 初始化四张卡片
    this.defaultImg1.reward = this.reward[this.getRandomIndex()];
    this.defaultImg2.reward = this.reward[this.getRandomIndex()];
    this.defaultImg3.reward = this.reward[this.getRandomIndex()];
    this.defaultImg4.reward = this.reward[this.getRandomIndex()];
    let link = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/goddess/index`;
    this.shareConfig = {
      title: '38缤纷女神节，建行邀您站C位', // 分享标题
      desc: '建行广州分行，让你众星捧月做女神，颜值担当 舍你其谁 快来测一测吧', // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `${window.location.protocol}//static.lianhaikeji.com/images/20190308/c5ba62dd8409456bbfde6fdc9da85228.jpg` // 分享图标
    }
    jssdk.jssdk.init('', this.merchantId, '1', (val) => {
      this.$jssdk.call('share', this.shareConfig)
      // Indicator.close()
    });
  },
  methods: {
    getRandomIndex () {
      return Math.floor(Math.random() * 6); // 0-5
    },
    toShare () {
      let no = this.$route.query.no || '1';
      this.$toast('快去分享给好友吧！');
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/feature?no=${no}`
      );
    },
    async createOrder () {
      Indicator.open();
      let rs = await this.$post('api/create/coupon/order/', {
        actId: this.receiveActId,
        standardId: this.receiveAct
          ? this.receiveAct.productList[0].standardList[0].id
          : null,
        commodityNum: 1
      });
      if (rs.status === 200) {
        let standard = this.receiveAct.productList[0].standardList[0];
        this.$refs.dialog.setCoupon(standard.standardImgUrl);
        this.$refs.dialog.setCash(true);
        this.$refs.dialog.setPrice(standard.standardName);
        this.$refs.dialog.open();
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async getLotteryInfo () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.letteryActId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
        if (this.chances > 0) {
          this.$toast('请继续翻牌抽奖！');
        }
      }
      Indicator.close();
    },
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.letteryActId,
        num: '1'
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/goddess/card`;
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async lettery () {
      Indicator.open();
      let rs = await this.$post('api/lottery_draw', {
        actId: this.letteryActId
      });
      if (rs.status === 200) {
        this.chances--;
        this.prize = rs.payload;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async tryMyluck (index) {
      if (this.chances < 1) {
        this.buyChance();
        return;
      }
      let targetObj = {
        0: this.defaultImg1,
        1: this.defaultImg2,
        2: this.defaultImg3,
        3: this.defaultImg4
      };
      if (targetObj[index].opened) {
        return this.$toast('您已经翻过了');
      }
      await this.lettery();
      // 谢谢惠顾
      if (this.prize.proType == '8') {
        // 卡牌使用本地资源
        targetObj[index].front = pity;
      } else {
        // 抽奖后，绑定奖品和用户
        this.bindPrizeToUser();
        targetObj[index].front = this.prize.standardImgUrl;
        targetObj[index].class = 'reward';
        targetObj[index].coupon = this.prize.prizeName;
      }
      this.$refs.dialog.setCoupon(this.prize.standardImgUrl);
      this.$refs.dialog.setCash(false);
      this.$refs.dialog.setPrice(this.prize.prizeName);
      this.$refs.dialog.open();
      targetObj[index].opened = true;
    },
    async bindPrizeToUser () {
      Indicator.open();
      let rs = await this.$post('api/user/draw/bind', {
        orderCode: this.prize.orderCode
      });
      if (rs.status === 200) {
        console.log('奖品用户绑定成功');
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    // 获取剩余可购买次数
    async getEnoughBuy () {
      Indicator.open();
      let rs = await this.$post('api/activity/custom/search/record', {
        actId: this.letteryActId
      });
      if (rs.status === 200) {
        this.enoughBuyCount = JSON.parse(rs.payload).num;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    confirm (cash) {
      // 通用代金券领取后跳转活动分享
      if (cash) {
        let no = this.$route.query.no || '1';
        this.$toast('快去分享给好友吧！');
        this.$router.push(
          `/${
            this.$store.state.merchantAppid
          }/merchant/goddess/feature?no=${no}`
        );
      } else {
        // 特定代金券领取后关闭弹出框
        this.$refs.dialog.close();
        setTimeout(() => {
          // 抽奖后，提示用户还有几次购买抽奖机会
          this.$toast(`您还有${this.enoughBuyCount}次购买抽奖机会`);
        }, 500);
        // this.$router.push(
        //   `/${this.$store.state.merchantAppid}/merchant/goddess/reward`
        // );
      }
    },
    closeDialog (cash) {
      // 通用代金券领取后跳转活动分享
      if (cash) {
        let no = this.$route.query.no || '1';
        this.$toast('快去分享给好友吧！');
        this.$router.push(
          `/${
            this.$store.state.merchantAppid
          }/merchant/goddess/feature?no=${no}`
        );
      }
    },
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.receiveAct = rs.payload;
      }
    }
  },
  created () {
    this.getLotteryInfo();
    this.loadAct(this.receiveActId);
    this.getEnoughBuy();
  }
};
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 13.34rem;
  background-image: url("./img/card_back.jpg");
  background-size: 100% 100%;
  overflow: hidden;
  &-box {
    margin: 3.1rem 1.02rem 0;
  }
  &-row {
    display: flex;
    align-items: center;
    margin-bottom: 0.35rem;
    &_item {
      width: 2.5rem;
      height: 3.64rem;
      border: 0.03rem solid #000;
      background-color: #f9d3ec;
      box-shadow: 0 0.05rem 0.08rem 0 rgba(150, 150, 150, 0.17);
      img {
        width: 100%;
        &.reward {
          transform: scale(0.7);
        }
      }
      p {
        text-align: center;
      }
      &:first-child {
        margin-right: 0.45rem;
      }
    }
  }
  &-coupon {
    width: 5.95rem;
    height: 1.7rem;
    background-image: url("./img/coupon.png");
    background-size: 100% 100%;
    margin: 0 auto;
  }
  &-tips {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 0.77rem;
    background-color: rgba(80, 0, 97, 0.63);
    display: flex;
    align-items: center;
    justify-content: center;
    &-txt {
      width: 5.61rem;
      height: 0.37rem;
      background-size: 100% 100%;
      background-image: url("./img/card/footer_txt.png");
    }
  }
}
</style>
