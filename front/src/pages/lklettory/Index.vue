<template>
  <div>
    <back></back>
    <div
      class="lettory"
      :class="{active:PopupPrize || Popupsorry}"
    >
      <div class="bg">
        <div
          class="btnprize"
          @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
        >我的奖品</div>
        <div class="chance">您还有 <span> {{chances}}</span> 次机会</div>
        <div class="lottery">
          <HemiRotate
            ref="myRotate"
            v-if="showPannel"
            :setting="setting"
            @start="begin"
            @end="rotateEnd"
            class="lottery-pannel"
          ></HemiRotate>
        </div>
        <div class="rule">
          <template v-if="act">
            <div
              class="content"
              v-html='act.detail'
            >
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
      class="dialog"
      v-if="PopupPrize && prize"
    >
      <div class="main">
        <div class="havePrize">
          <div class="prize">
            <div class="prizeimg"> <img
                :src="prize.standardImgUrl"
                alt=""
              >
            </div>
            <p class="prizeName">{{prize.prizeName}}</p>
            <div>
              <div
                class="btnsure"
                @click="PopupPrize=false,$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
              >
              </div>
              <div
                class="shuoming"
                v-html="prize.standardInstruction"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="sorryclose"
        @click="PopupPrize=false"
      ></div>
    </div>
    <mt-popup
      v-model="Popupsorry"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="sorryDialog">
        很遗憾没有中奖，感谢您的参与！
      </div>
      <div
        class="sorryclose"
        @click="Popupsorry=false"
      ></div>
    </mt-popup>
  </div>
</template>

<script>
import pannelImage from './imgs/pannel.png';
import pointerImage from './imgs/pointer.png';
import HemiRotate from './HemiRotate';
import { Toast, Popup, Indicator, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
// import MessageModal from './lotteryModal/MessageModal';

export default {
  components: {
    HemiRotate,
    [Popup.name]: Popup
    // MessageModal
  },
  data () {
    return {
      Popupsorry: false,
      PopupPrize: false,
      account: this.$store.state.cust ? this.$store.state.cust.tel : '',
      error: '',
      // templateConfig: JSON.parse(this.act.templateConfig),
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
        // names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        // icons: this.act.productList.map(item => item.standardImgUrl),
        names: null,
        icons: null,
        colors: ['#b0e3ff', '#fff'], // 大转盘奖品区块对应背景颜色
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      prize: null,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 559702585 : 559550027,
      act: null,
      payUrl: payUrl
    };
  },
  methods: {
    async loadActdetails () {
      let rs = await this.$get('api/getActDetails/' + this.secondActId);
      if (rs.status === 200) {
        this.act = rs.payload;
        this.testtel = rs.payload.productList[0].accountPattern;
        this.prizeList = this.act.productList;
        this.setting.names = [];
        this.setting.icons = [];
        this.act.productList.forEach(item => {
          this.setting.names.push(item.prizeName);
          this.setting.icons.push(item.standardImgUrl);
        });
        console.log(131313, this.setting);
        this.showPannel = true;
      }
    },
    async loadLotteryChance () {
      let rs = await this.$get('api/get_lottery_info/' + this.secondActId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
    },
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.secondActId,
        num: '1'
      });
      if (rs.status === 200) {
        MessageBox({
          message: '请在完成支付后，点击左上角返回活动页面。',
          confirmButtonText: '去支付'
        }).then(action => {
          if (action == 'confirm') {
            let prepayId = rs.payload.prepayId;
            let successUrl = `${window.location.protocol}//${
              window.location.host
            }/${this.$store.state.merchantAppid}/merchant/fujianlettory/index`;
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
    async begin () {
      MessageBox({
        message: '请确保本周内完成相关交易，否则抽奖无效',
        confirmButtonText: '去抽奖'
      }).then(action => {
        if (action == 'confirm') {
          this.start();
        }
      });
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      // if (this.chances == 0) {
      //   this.buyChance();
      //   return;
      // }
      this.loading = true;
      let rs = await this.$post('api/lottery_draw', {
        actId: this.secondActId,
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
    localStorage.setItem('lastVisitactId', this.secondActId);
    await this.loadActdetails();
    this.loadLotteryChance();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.lettory {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: #d6f2fe;
  padding-top: 0.01rem;
  padding-bottom: 0.3rem;
  .bg {
    width: 100%;
    min-height: 13.34rem;
    background: url("./imgs/bg.jpg") no-repeat;
    background-size: 100% 13.34rem;
    padding-top: 0.001rem;
    position: relative;
    padding-bottom: 0.1rem;
    .btnprize {
      position: absolute;
      width: 1.59rem;
      height: 0.55rem;
      top: 0.5rem;
      right: 0rem;
      background: rgba(58, 12, 241, 0.8);
      border-radius: 0.5rem 0 0 0.5rem;
      text-align: center;
      line-height: 0.55rem;
      font-size: 0.28rem;
      color: #fff;
      font-weight: 600;
    }
    .chance {
      width: 2.84rem;
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
    .prizeName {
      width: 100%;
      font-size: 0.34rem;
      line-height: 0.5rem;
      color: #0658c4;
      margin: 0.1rem auto;
      text-align: center;
      font-weight: 700;
    }
    .prizeimg {
      img {
        display: block;
        height: 1.2rem;
        margin: 0.3rem auto;
      }
      margin: 0 auto;
    }
  }
  .shuoming {
    width: 4.88rem;
    height: 1.5rem;
    background: url("./imgs/shuoming.jpg") no-repeat;
    background-size: 100% auto;
    font-size: 0.3rem;
    padding-top: 0.5rem;
    color: #222222;
    overflow: scroll;
  }
  .btnsure {
    width: 2.22rem;
    height: 0.84rem;
    background: url("./imgs/btnsure.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.2rem auto 0;
  }
  .ruledetail {
    width: 4.62rem;
    padding-top: 0.01rem;
    margin: 0 auto;
    p {
      font-family: SourceHanSansCN-Bold;
      font-size: 0.24rem;
      line-height: 0.5rem;
      letter-spacing: 1px;
      color: #c3242a;
      font-weight: 700;
    }
    .content {
      width: 4.62rem;
      height: 2.71rem;
      font-family: SourceHanSansCN-Regular;
      font-size: 0.22rem;
      line-height: 0.3rem;
      letter-spacing: 1px;
      color: #c3242a;
      overflow-y: scroll;
      margin: 0.1rem auto 0;
    }
  }
}
.rule {
  width: 6.96rem;
  height: 8.19rem;
  text-align: left;
  background: #fff;
  border: 0.22rem solid transparent;
  border-radius: 0.3rem;
  padding: 0.2rem;
  font-size: 0.3rem;
  line-height: 0.55rem;
  color: #0038b1;
  background: url("./imgs/rulebg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.9rem 0.3rem;
  margin: 1rem auto 0.2rem;
  .content {
    width: 100%;
    height: 100%;
    overflow: scroll;
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
  z-index: 99;
  padding-top: 0.001rem;
  .main {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
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
}
.sorryclose {
  width: 0.92rem;
  height: 1rem;
  margin: 0.5rem auto;
  background: url("./imgs/close.png");
  background-size: 100% 100%;
}
</style>
