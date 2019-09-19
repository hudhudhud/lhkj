<template>
  <div
    class="result"
    :class="figure"
  >
    <div class="result-saying">
      <img
        :src="saying"
        alt=""
      >
    </div>
    <div
      class="result-action"
      @click="getCard"
    ></div>
    <ResultDialog
      :type="type"
      title="恭喜您获得"
      ref="dialog"
      @confirm="confirm"
    ></ResultDialog>
  </div>
</template>

<script>
import q1 from './img/result/q1.png';
import q2 from './img/result/q2.png';
import q3 from './img/result/q3.png';
import q4 from './img/result/q4.png';
import q5 from './img/result/q5.png';
import q6 from './img/result/q6.png';
import q7 from './img/result/q7.png';
import ResultDialog from './component/dialog';
// import g1 from './img/card/g1.png';
import { Indicator, Toast } from 'mint-ui';
export default {
  name: 'result',
  components: {
    ResultDialog
  },
  data () {
    return {
      figurePrefix: 'f',
      figure: '',
      type: true,
      no: '',
      saying: '',
      sayArr: [q1, q2, q3, q4, q5, q6, q7],
      actId: process.env.PUBLISH_ENV == 'prod' ? '551876916' : 551753187,
      chances: 0,
      prize: {
        standardImgUrl: ''
      }
    };
  },
  methods: {
    async loadAct () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
      Indicator.close();
    },
    async lettery () {
      if (this.chances < 1) {
        Toast('您已领取过该津贴哦');
        setTimeout(() => {
          this.$router.push(
            `/${this.$store.state.merchantAppid}/merchant/goddess/feature?no=${
              this.no
            }`
          );
        });
        return false;
      }
      Indicator.open();
      let rs = await this.$post('api/lottery_draw', {
        actId: this.actId
      });
      if (rs.status === 200) {
        this.chances--;
        this.prize = rs.payload;
        this.$refs.dialog.setCoupon('http:' + this.prize.standardImgUrl);
        this.$refs.dialog.setPrice(this.prize.prizeName);
        this.$refs.dialog.setUseTips([
          '1.您的奖品已放入”我的津贴“可到首页查看。',
          '2.可用于中国建设银行手机银行-悦享生活-惠聚广东-约惠广州商城消费抵扣。'
        ]);
        this.$refs.dialog.open();
        this.bindPrizeToUser();
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    getCard () {
      this.lettery();
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
    confirm () {
      this.$refs.dialog.close();
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/feature?no=${
          this.no
        }`
      );
    }
  },
  mounted () {
    let no = this.$route.query.no || '1';
    this.no = no;
    this.loadAct();
    // f1 - f7
    this.figure = this.figurePrefix + no;
    this.saying = this.sayArr[no - 1];
  }
};
</script>

<style scoped lang="scss">
.result {
  position: relative;
  width: 100%;
  height: 13.34rem;
  background-image: url("./img/result/result_back.jpg");
  background-size: 100% 100%;
  &.f1 {
    background-image: url("./img/result/1.png");
  }
  &.f2 {
    background-image: url("./img/result/2.png");
  }
  &.f3 {
    background-image: url("./img/result/3.png");
  }
  &.f4 {
    background-image: url("./img/result/4.png");
  }
  &.f5 {
    background-image: url("./img/result/5.png");
  }
  &.f6 {
    background-image: url("./img/result/6.png");
  }
  &.f7 {
    background-image: url("./img/result/7.png");
  }
  &-saying {
    position: absolute;
    top: 10.82rem;
    left: 50%;
    transform: translateX(-50%);
    height: 0.27rem;
    img {
      height: 0.27rem;
    }
  }
  &-action {
    position: absolute;
    top: 11.65rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3.56rem;
    height: 0.72rem;
    background-image: url("./img/result/getjintie.png");
    background-size: 100% 100%;
  }
}
</style>
