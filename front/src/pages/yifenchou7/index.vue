<template>
  <div :class="{active:showprize || Popupsorry}">
    <div class="yifenchou5">
      <back></back>
      <div
        class="btnprize"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
      ></div>
      <div
        class="btnrule"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/yifenchou6/rule?actId=${secondActId}`)"
      ></div>
      <div class="main">
        <div class="bullet">
          <template v-if="act">
            <bullet
              :act="act"
              :theme='colorfont'
            ></bullet>
          </template>
        </div>
        <div class="lettory">
          <div
            class="lettory-item"
            v-for="(item,i) in picList"
            :key="i"
            @click="lettory(i)"
          >
            <img
              :src="item"
              alt=""
            >
          </div>
        </div>
        <div
          class="btnpay"
          @click="BuyChance"
        ><img
            src="./imgs/btnpay.png"
            alt=""
          ></div>

        <div class="chances">
          剩余<span>{{chances+CBchances}}</span>次抽奖机会
        </div>
      </div>
      <template v-if="prize">
        <div
          class="showprize"
          v-show="showprize"
        >
          <div class="prize">
            <div class="cover"></div>
            <img
              src="./imgs/close.png"
              alt=""
              class="close"
              @click="showprize = false"
            >
            <img
              :src="prize.standardImgUrl"
              class="imgprize"
              alt=""
            >
            <p class="title">{{prize.prizeName}}</p>
            <p class="more">请到 浙里有礼-我的-我的订单 兑换使用</p>
            <div
              class="pay"
              v-if='prize.is_buy==1'
              @click="createOrder()"
            ><img
                src="./imgs/pay.png"
                alt=""
              ></div>
            <div class="methods">
              <h5>兑换方法：</h5>
              <div
                class="detail"
                v-html="prize.standardInstruction"
              >
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="Popupsorry"
      class="showprize"
    >
      <div class="sorryDialog">
        <div class="content">
          <div class="headertop"></div>
          <div class="sorryImg"><img
              :src="prize.standardImgUrl"
              alt=""
            ></div>
          <div class="tips">
            <span>温馨提示：</span> <br>
            您可在生活频道首页—话费充值，满50元即可随机立减，最高立减20元。每月可享一次。
          </div>
        </div>
      </div>
      <div
        class="sorryclose"
        @click="Popupsorry=false"
      ><img
          src="./imgs/close.png"
          alt=""
        ></div>
    </div>
  </div>
</template>
<script>
import { Toast, MessageBox, Popup, Indicator } from 'mint-ui';
import { payUrl } from '@/config/';
import bullet from './components/bullet';
import bing1 from './imgs/bing1.png';
import bing2 from './imgs/bing2.png';
import bing3 from './imgs/bing3.png';
import bing4 from './imgs/bing4.png';
import {
  loadChance,
  loadBuyChance,
  getActDetail,
  lotteryDraw,
  buyChance
} from '@/lib/api';
export default {
  data () {
    return {
      colorfont: '#333',
      Popupsorry: false,
      payUrl: payUrl,
      showprize: false,
      chances: 0,
      prize: '',
      num: null,
      act: '',
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 564637888 : 560999668,
      picList: [bing1, bing2, bing3, bing4],
      CBchances: 0,
      prepayId: ''
    };
  },
  components: {
    [Popup.name]: Popup,
    bullet
  },
  methods: {
    async BuyChance () {
      if (this.chances > 0) {
        Toast('请砸冰块抽奖！');
        return;
      }
      buyChance(this.secondActId, rs => {
        let prepayId = rs.payload.prepayId;
        MessageBox({
          message: '请在完成支付后，点击左上角返回活动页面。',
          confirmButtonText: '去支付'
        }).then(action => {
          if (action == 'confirm') {
            let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/yifenchou7/index?actId=${this.secondActId}`;
            Toast('订单已生成...正在跳转支付');
            let payUrl = `${
              this.payUrl
            }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
            window.location.href = payUrl;
          }
        });
      });
    },
    async createOrder () {
      let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/prize`;
      Toast('订单已生成...正在跳转支付');
      let payPath = `${payUrl}${this.prepayId}?redirectUrl=${encodeURIComponent(
        successUrl
      )}`;
      window.location.replace(payPath);
    },
    async lettory (i) {
      if (this.chances < 1) {
        this.BuyChance();
        return;
      }
      lotteryDraw(this.secondActId, rs => {
        this.prize = rs.payload;
        this.chances--;
        if (this.prize.proType == 8) {
          this.Popupsorry = true;
        } else {
          this.showprize = true;
          if (this.prize.is_buy == 1 && this.prize.orderCode) {
            this.re_buy();
          }
        }
      });
    },
    async re_buy () {
      Indicator.open();
      let rs = await this.$post('api/re_buy', {
        orderCode: this.prize.orderCode
      });
      if (rs.status === 200) {
        this.prepayId = rs.payload.prepayId;
      }
      Indicator.close();
    }
  },

  async created () {
    loadChance(this.secondActId, rs => {
      this.chances = parseInt(rs.payload.chances);
    });
    loadBuyChance(this.secondActId, rs => {
      this.CBchances = parseInt(JSON.parse(rs.payload).num);
    });
    this.act = await getActDetail(this.secondActId);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yifenchou5 {
  width: 100%;
  min-height: 15.5rem;
  position: relative;
  background: #a1cdec url("./imgs/bg.jpg") no-repeat;
  background-size: 100% auto;
  padding-top: 0.001rem;
  .btnrule {
    position: absolute;
    width: 1.7rem;
    height: 0.7rem;
    top: 1.8rem;
    right: 0;
    background: url("./imgs/rulebtn.png") no-repeat;
    background-size: 100% 100%;
  }
  .btnprize {
    position: absolute;
    width: 1.7rem;
    height: 0.7rem;
    top: 0.8rem;
    right: 0;
    background: url("./imgs/btnprize.png") no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 100%;
    margin: 6rem auto 0;
    padding-top: 0.001rem;
    position: relative;
    padding-bottom: 0.1rem;
    .bullet {
      width: 5.68rem;
      height: 0.74rem;
      background: url("./imgs/bulletbg.png") no-repeat;
      background-size: 100% 100%;
      margin: 0rem auto 0;
    }
    // .act-tip {
    //   width: 4.77rem;
    //   height: 0.38rem;
    //   margin: 0.5rem auto 0;
    //   img {
    //     width: 100%;
    //   }
    // }
    .lettory {
      width: 80%;
      height: 5rem;
      display: flex;
      justify-content: space-around;
      position: relative;
      margin: 0.3rem auto 0;
      flex-wrap: wrap;
      .lettory-item {
        width: 50%;
        height: 1.91rem;
        text-align: center;
        margin-top: 0.5rem;
        animation: scale 2s linear infinite;
        img {
          width: 1.81rem;
        }
      }
    }
    .btnpay {
      width: 3.78rem;
      height: 1.57rem;
      margin: 0.2rem auto 0.2rem;
      img {
        width: 100%;
      }
    }
    .chances {
      width: 100%;
      font-size: 0.28rem;
      text-align: center;
      color: #112d57;
      font-weight: 600;
      span {
        font-size: 0.36rem;
        padding: 0 0.2rem;
        display: inline-block;
      }
    }
  }
}
.sorryDialog {
  width: 6.93rem;
  height: 5.6rem;
  background: url("./imgs/tankuang.png") no-repeat 0rem 0;
  background-size: 100% 100%;
  margin: 2.3rem auto 0;
  .content {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    .headertop {
      height: 0.38rem;
      width: 1.69rem;
      background: url("./imgs/thanks.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.3rem auto;
    }
    .sorryImg {
      width: 2.37rem;
      height: 0.96rem;
      margin: 0.1rem auto;
      img {
        width: 100%;
      }
    }
    .tips {
      span {
        font-size: 0.3rem;
        color: #f85c2c;
        font-weight: 600;
        display: inline-block;
        margin-bottom: 0.3rem;
      }
      color: #333;
      font-size: 0.28rem;
      width: 4.5rem;
      margin: 0.5rem auto;
      line-height: 0.4rem;
      text-align: justify;
    }
  }
}
.sorryclose {
  width: 0.53rem;
  height: 0.52rem;
  margin: 0.4rem auto;
  img {
    width: 100%;
  }
}
.mypop {
  background: transparent;
}
.showprize {
  position: fixed;
  width: 100%;
  top: 0rem;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.7);
  overflow-y: auto;
  z-index: 200;
  .prize {
    position: relative;
    height: 8.6rem;
    width: 5.62rem;
    position: relative;
    margin: 2rem auto 0;
    background: url("./imgs/tankuang.png") no-repeat 0rem 0;
    background-size: 100% 100%;
    border-top: 0.01rem solid transparent;
    .cover {
      width: 2.08rem;
      height: 0.41rem;
      background: url("./imgs/conslts.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.8rem auto 0;
    }
    .close {
      position: absolute;
      top: -0.5rem;
      right: -0.4rem;
      height: 0.52rem;
      width: 0.53rem;
    }
    .imgprize {
      width: 2.2rem;
      display: block;
      margin: 0.2rem auto 0.1rem;
      left: 0;
      right: 0;
    }
    .btn {
      height: 0.83rem;
      width: 3.24rem;
      margin: 0.15rem auto 0;
      background: url("./imgs/btnbg.jpg") no-repeat;
      background-size: 100% 100%;
      line-height: 0.75rem;
      text-align: center;
      font-size: 0.3rem;
      color: #fff;
      font-weight: 600;
    }
    .title {
      font-size: 0.28rem;
      color: #333;
      width: 100%;
      text-align: center;
    }
    .more {
      width: 5rem;
      margin: 0.25rem auto;
      text-align: center;
      font-family: SourceHanSansCN-Medium;
      font-size: 0.24rem;
      letter-spacing: 0px;
      color: #1691e8;
    }
    .pay {
      width: 3.14rem;
      height: 0.74rem;
      margin: 0.2rem auto;
      img {
        width: 100%;
      }
    }
    .methods {
      width: 4.6rem;
      height: 2.5rem;
      margin: 0.1rem auto;
      line-height: 0.4rem;
      h5 {
        font-size: 0.24rem;
        color: #1691e8;
        margin-bottom: 0.1rem;
      }
      .detail {
        width: 4.6rem;
        height: 1.7rem;
        font-size: 0.24rem;
        color: #666666;
        overflow: scroll;
        text-align: justify;
      }
    }
  }
}
@keyframes myMove1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes myMove2 {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes scale {
  0% {
    transform: scale(1) rotate(0deg);
  }
  30% {
    transform: rotate(3deg);
  }
  50% {
    transform: scale(0.9) rotate(0deg);
  }
  70% {
    transform: rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
// @keyframes scale {
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(0.8);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
.active {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
