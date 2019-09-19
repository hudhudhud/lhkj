<template>
  <div>
    <back></back>
    <div class="wrapper" :class="{active:PopupPrize || Popupsorry}">
      <div class="bg">
        <div class="prize-btn" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"></div>
        <!-- <div class="chance">您还有 <span> {{chances+CBchances}}</span> 次机会</div> -->
        <div class="holder"></div>
        <div class="lottery">
          <rotate ref="myRotate" v-if="showPannel" :setting="setting" @start="start" @end="rotateEnd"
            class="lottery-pannel"></rotate>
        </div>
        <div class="rule">
          <div class="rule-label"></div>
          <template v-if="act">
            <div class="content" v-html='act.detail'>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="dialog" v-if="PopupPrize && prize">
      <div class="main">
        <div class="havePrize">
          <div class="prize">
            <div class="prizeimg"> <img :src="prize.standardImgUrl" alt="">
            </div>
            <p class="prizeName">{{prize.prizeName}}</p>
            <div>
              <div class="btnsure"
                @click="PopupPrize=false,$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sorryclose" @click="PopupPrize=false"></div>
    </div>
    <mt-popup v-model="Popupsorry" class="mypop" popup-transition="popup-fade">

      <div class="sorryDialog">
        <img src="./imgs/sorry.jpg" alt="">
        谢谢参与
      </div>
      <div class="sorryclose" @click="Popupsorry=false"></div>
    </mt-popup>
  </div>
</template>

<script>
import pannelImage from './imgs/pannel.png';
import pointerImage from './imgs/pointer.png';
import rotate from './rotate';
import { Toast, Popup, Indicator, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  components: {
    rotate,
    [Popup.name]: Popup
  },
  data () {
    return {
      Popupsorry: false,
      PopupPrize: false,
      account: this.$store.state.cust ? this.$store.state.cust.tel : '',
      error: '',
      showPannel: false,
      loading: false,
      rotating: false,
      chances: 0,
      noMore: '',
      prizeList: null,
      currentPrize: null,
      orderCode: '',
      currentPage: 1,
      setting: {
        pannelImage: pannelImage,
        pointerImage: pointerImage,
        names: null,
        icons: null,
        colors: ['#b0e3ff', '#fff'], // 大转盘奖品区块对应背景颜色
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      prize: null,
      act: null,
      payUrl: payUrl,
      CBchances: 0
    };
  },
  computed: {
    actId () {
      return this.$route.query.actId;
    }
  },
  methods: {
    async loadActdetails () {
      let rs = await this.$get('api/getActDetails/' + this.actId);
      if (rs.status === 200) {
        this.act = rs.payload;
        this.prizeList = this.act.productList;
        this.setting.names = [];
        this.setting.icons = [];
        this.act.productList.forEach(item => {
          this.setting.names.push(item.prizeName);
          this.setting.icons.push(item.standardImgUrl);
        });
        this.showPannel = true;
      }
    },
    async loadLotteryChance () {
      let rs = await this.$get('api/get_lottery_info/' + this.actId);
      if (rs.status === 200) {
        this.chances = parseInt(rs.payload.chances);
      }
    },
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.actId,
        num: '1'
      });
      if (rs.status === 200) {
        MessageBox({
          message: '请在完成支付后，点击左上角返回活动页面。',
          confirmButtonText: '去支付'
        }).then(action => {
          if (action == 'confirm') {
            let prepayId = rs.payload.prepayId;
            let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/anhui_boc/rotateLottery?actId=${this.actId}`;
            Toast('订单已生成...正在跳转支付');
            let payUrl = `${
              this.payUrl
            }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
            window.location.href = payUrl;
          }
        });
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    rotateEnd () {
      if (this.prize.proType == 8) {
        this.Popupsorry = true;
      } else {
        this.PopupPrize = true;
      }
      this.rotating = false;
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      if (this.chances == 0) {
        this.buyChance();
        return;
      }
      this.loading = true;
      let rs = await this.$post('api/lottery_draw', {
        actId: this.actId,
        account: this.account
      });
      if (rs.status === 200) {
        this.chances--;
        this.prize = rs.payload;
        console.log(this.prize);
        let standardId = rs.payload.standardId;
        this.orderCode = rs.payload.orderCode;
        this.prizeList.forEach((item, ind) => {
          if (item.standardId === standardId) {
            this.currentPrize = item;
            this.rotating = true;
            this.$refs.myRotate.rotate(ind);
          }
        });
      } else {
        Toast(rs.error);
      }
      this.loading = false;
    }
  },
  async created () {
    localStorage.setItem('lastVisitactId', this.actId);
    await this.loadActdetails();
    this.loadLotteryChance();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: #d6f2fe;
  padding-top: 0.01rem;
  padding-bottom: 0.3rem;
  .bg {
    width: 100%;
    min-height: 12.33rem;
    background: url("./imgs/bg.jpg") no-repeat;
    background-size: 100% 12.33rem;
    position: relative;
    .prize-btn {
      position: absolute;
      width: 1.83rem;
      height: 0.77rem;
      top: 3.9rem;
      right: 0rem;
      background: url("./imgs/prize-btn.png") no-repeat;
      background-size: 100% 100%;
      z-index: 10;
    }
    .chance {
      width: 3.84rem;
      height: 0.68rem;
      background-color: #ffffff;
      border-radius: 0.34rem;
      margin: 4rem auto 0.2rem;
      font-size: 0.32rem;
      color: #0038b1;
      line-height: 0.68rem;
      font-weight: 600;
      text-align: center;
      span {
        font-size: 0.36rem;
        color: #ef4971;
        padding: 0 0.05rem;
      }
    }
  }
}
.holder {
  width: 100%;
  height: 4.1rem;
}
.lottery {
  margin: 0.1rem auto 0;
  z-index: 80;
  min-height: 7rem;
}
.btn-group {
  height: 0.86rem;
  width: 6.8rem;
  margin: 0.3rem auto 0;
  display: flex;
  justify-content: space-between;
  div {
    width: 2.7rem;
    height: 0.86rem;
    img {
      width: 100%;
    }
  }
}
.mypop {
  background: transparent;
  padding-top: 0.01rem;
}
.havePrize {
  width: 6.74rem;
  height: 7.08rem;
  text-align: left;
  background: #fff;
  border: 0.22rem solid transparent;
  border-radius: 0.3rem;
  padding: 0.2rem;
  font-size: 0.24rem;
  line-height: 0.36rem;
  color: #333333;
  overflow: scroll;
  background: url("./imgs/prizebg.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  .prize {
    width: 90%;
    height: 4.6rem;
    margin: 1.3rem auto 0;
    .prizeimg {
      margin: 1.5rem auto 0;
      img {
        display: block;
        height: 1.8rem;
        margin: 0 auto;
      }
    }
    .prizeName {
      width: 100%;
      font-size: 0.55rem;
      line-height: 0.5rem;
      color: #0658c4;
      margin: 0.4rem auto;
      text-align: center;
      font-weight: 700;
    }
  }
  .btnsure {
    width: 2.22rem;
    height: 0.84rem;
    background: url("./imgs/btnsure.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.2rem auto 0;
  }
}
.rule {
  position: relative;
  width: 6.96rem;
  min-height: 4.19rem;
  text-align: left;
  background: #9fcbfe;
  border-radius: 0.3rem;
  font-size: 0.3rem;
  line-height: 0.55rem;
  color: #0038b1;
  background-size: 100% auto;
  padding: 0.9rem 0.3rem 0.3rem;
  margin: 1rem auto 0.2rem;
  .rule-label {
    position: absolute;
    top: -0.3rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2.22rem;
    height: 0.84rem;
    background: url("./imgs/rule.png") no-repeat;
    background-size: 100%;
    background-position: center;
  }
}
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  padding-top: 0.001rem;
  .main {
    margin: 2rem auto 0;
  }
}
.active {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.sorryDialog {
  width: 6.74rem;
  height: 5.42rem;
  background: url("./imgs/sorrybg.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 2rem 1rem;
  color: #0658c4;
  font-size: 0.5rem;
  text-align: center;
  font-weight: 600;
  line-height: 0.7rem;
  img {
    margin: 0 auto 0.3rem;
    width: 1.3rem;
    display: block;
  }
}
.sorryclose {
  width: 0.92rem;
  height: 1rem;
  margin: 0.5rem auto;
  background: url("./imgs/close.png");
  background-size: 100% 100%;
}
</style>
