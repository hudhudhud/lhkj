<template>
  <div>
    <template v-if="$route.query.isQuit == 'true'">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>
    <div class="zajindan">
      <div class="bg">
        <div class="sign"></div>
        <div class="acttime">
          <!-- <p class="timefont">活动时间:</p>
          <p class="time">2019.4.27-2019.4.28</p> -->
          活动时间:2019.4.27-2019.4.28

        </div>
        <div class="btn-group">
          <div class="btn"> <img
              src="./imgs/btnrule.png"
              alt=""
              @click="PopupFlag=true"
            > </div>
          <div
            class="btn"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=${secondActId}`)"
          > <img
              src="./imgs/btnprize.png"
              alt=""
            > </div>
        </div>
        <template v-if="act">
          <bullet :act="act"></bullet>
        </template>
        <div class="lettery">
          <div
            v-for="i in 3"
            :key="'lettery'+i"
            class="letteryImg"
            :class="{letterymove:i==2}"
          >
            <jindan
              :index="i"
              :payload="payload"
              @action="lettery(i)"
              :class="{letterysize:i!==2}"
            ></jindan>

          </div>
        </div>
        <div class="bottom"></div>
        <div class="chance">剩余{{chances}}次机会</div>
        <div
          class="btnpay"
          @click="buyChance"
        ></div>
        <div class="proList">
        </div>
      </div>
    </div>
    <mt-popup
      v-model="PopupFlag"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div
        class="ruledetail"
        v-if="act"
      >
        <h1>活动规则</h1>
        <div
          class="content"
          v-html="act.detail"
        >
        </div>
      </div>
    </mt-popup>
    <template v-if="prize">
      <mt-popup
        v-model="showprize"
        class="mypop"
        popup-transition="popup-fade"
      >
        <div class="ruledetail">
          <h1>恭喜中奖</h1>
          <div class="prizename">
            恭喜您获得{{prize.prizeName}}
          </div>
          <div class="prizeImg">
            <img
              :src="prize.standardImgUrl"
              alt=""
            >
          </div>
          <div
            class="tel"
            v-if="prize.proType==1"
          >
            <input
              type="text"
              placeholder="请输入您的手机号"
              v-model="tel"
            >
          </div>
          <div class="btnlingqu">
            <span
              v-if="prize.proType==1"
              @click="drawOrder()"
            >立即充值</span>
            <span
              v-else-if="prize.is_buy==0"
              @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order`)"
            > 确认领取 </span>
            <span
              v-else-if='prize.is_buy==1'
              @click="createOrder()"
            >立即购买</span>
          </div>
        </div>
      </mt-popup>
    </template>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
import jindan from './components/jindan';
import bgImg1 from './imgs/egg1.png';
import bgImg2 from './imgs/egg.png';
import bgImg3 from './imgs/egg2.png';
import tamp from './imgs/tamp.png';
import bullet from './components/bullet';
// import moment from 'moment';
export default {
  data () {
    return {
      tel: this.$store.state.cust ? this.$store.state.cust.tel : '',
      showprize: false,
      PopupFlag: false,
      // openMsg: false,
      prize: null,
      payUrl: payUrl,
      currentPage: 1,
      chances: 0,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 555558573 : 555485804,
      act: null,
      payload: {
        bgImg: [bgImg1, bgImg2, bgImg3],
        transformFlag: false,
        tamp: tamp,
        index: -1,
        changeImg: false
      },
      prepayId: ''
    };
  },
  components: { jindan, bullet },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
      }
    },
    async createOrder () {
      let successUrl = `${window.location.protocol}//${window.location.host}/${
        this.$store.state.merchantAppid
      }/merchant/index/order`;
      Toast('订单已生成...正在跳转支付');
      let payPath = `${payUrl}${this.prepayId}?redirectUrl=${encodeURIComponent(
        successUrl
      )}`;
      window.location.replace(payPath);
    },
    async addChance () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
      Indicator.close();
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
    },
    async lettery (i) {
      this.payload.changeImg = false;
      if (this.chances < 1) {
        this.buyChance();
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/lottery_draw', {
        actId: this.act.actId
      });
      if (rs.status === 200) {
        this.chances--;
        this.prize = rs.payload;
        if (this.prize.is_buy == 1 && this.prize.orderCode) {
          this.re_buy();
        }
        this.payload.index = i;
        // this.mask = i;
        // setTimeout(() => {
        //   this.payload.changeImg = false;
        // }, 1500);
        setTimeout(() => {
          this.payload.changeImg = true;
          this.showprize = true;
        }, 1500);
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async drawOrder () {
      // 检查账号格式
      if (!this.tel) {
        Toast('请输入手机号');
        return;
      }
      if (!new RegExp(/^1[3456789]\d{9}$/).test(this.tel)) {
        Toast('您输入的手机号有误');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/order/draw', {
        orderCode: this.prize.orderCode,
        account: this.tel
      });
      if (rs.status == 200) {
        Toast('已提交充值');
        this.showprize = false;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async buyChance () {
      if (this.chances > 0) {
        Toast('请砸金蛋抽奖');
        return;
      }
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.act.actId,
        num: '1'
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        MessageBox({
          message: '请在完成支付后，点击左上角返回活动页面。',
          title: '重要提示',
          confirmButtonText: '去支付'
        }).then(action => {
          if (action == 'confirm') {
            let successUrl = `${window.location.protocol}//${
              window.location.host
            }/${this.$store.state.merchantAppid}/merchant/ahzajindan/index`;
            let payUrl = `${
              this.payUrl
            }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
            window.location.href = payUrl;
          }
        });
        Toast('订单已生成...正在跳转支付');
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  async created () {
    await this.loadAct(this.secondActId);
    this.addChance();
    localStorage.setItem('lastVisitactId', this.secondActId);
  }
};
</script>
<style scoped lang="scss">
.zajindan {
  width: 100%;
  min-height: 100vh;
  background: #fed682;
  overflow-x: hidden;
  padding-bottom: 0.2rem;
  .bg {
    min-height: 12.06rem;
    width: 100%;
    background: url("./imgs/bg.jpg") no-repeat;
    background-size: 100% auto;
    padding-top: 2.88rem;
    position: relative;
    .sign {
      position: absolute;
      width: 1.96rem;
      height: 1.64rem;
      background: url("./imgs/sign.jpg") no-repeat;
      background-size: 100% 100%;
      margin-top: -1.3rem;
      left: 0.5rem;
    }
    .acttime {
      width: 4.79rem;
      height: 0.57rem;
      background: url("./imgs/timebg.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.2rem auto;
      color: #fff;
      font-size: 0.28rem;
      text-align: center;
      line-height: 0.57rem;
      // p {
      //   float: left;
      // }

      // .time {
      //   height: 0.86rem;
      //   width: 3rem;
      //   line-height: 0.43rem;
      //   font-weight: 700;
      // }
      // .timefont {
      //   height: 0.86rem;
      //   line-height: 0.86rem;
      //   text-align: center;
      //   width: 1.6rem;
      //   font-weight: 700;
      // }
    }
    .lettery {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      height: 2.77rem;
      /* position: absolute; */
      position: relative;
      /* top: 5rem; */
      z-index: 50;
      .letteryImg {
        width: 2.09rem;
        height: 2.77rem;
        // background: url("./imgs/egg.png") no-repeat;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin-top: 0.3rem;
      }
      .letterymove {
        margin-top: 0.5rem;
      }
      .letterysize {
        transform: scale(0.8);
      }
    }
    .bottom {
      position: relative;
      width: 6.92rem;
      height: 2.59rem;
      background: url("./imgs/bottom.png") no-repeat;
      background-size: 100% 100%;
      margin: -0.3rem auto 0;
    }
    .btnpay {
      width: 4.24rem;
      height: 0.95rem;
      background: url("./imgs/btnpay1.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.1rem auto 0;
    }
    .chance {
      width: 100%;
      text-align: center;
      color: #b6640e;
      font-size: 0.34rem;
      margin: 0.2rem auto;
    }
    .btn-group {
      width: 100%;
      height: 0.73rem;
      display: flex;
      justify-content: space-around;
      margin-top: 0.3rem;
      .btn {
        width: 2.6rem;
        height: 0.73rem;
        img {
          width: 100%;
        }
      }
    }
    .proList {
      width: 6.9rem;
      height: 11.3rem;
      background: url("./imgs/prizelist.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.3rem auto;
    }
  }
}
.ruledetail {
  width: 6.01rem;
  height: 9.76rem;
  background: url("./imgs/tanchuangbg.png") no-repeat;
  background-size: 100% 100%;
  padding: 2.4rem 0.4rem 0.2rem 0.5rem;
  h1 {
    font-size: 0.4rem;
    color: #cf930b;
    width: 100%;
    text-align: center;
  }
  .prizename {
    width: 100%;
    font-family: SourceHanSansCN-Medium;
    font-size: 0.4rem;
    color: #cf930b;
    text-align: center;
    font-weight: 600;
    margin: 0.8rem auto 0.4rem;
  }
  .message {
    width: 5.2rem;
    height: 2rem;
    background: rgba(255, 255, 255, 0.1);
    text-indent: 0.3rem;
    font-size: 0.24rem;
    color: #fff;
    padding: 0.2rem;
    line-height: 0.5rem;
    border-radius: 0.2rem;
    margin-top: -0.2rem;
  }
  .content {
    overflow-y: scroll;
    height: 5.5rem;
    margin-top: 0.5rem;
    font-size: 0.26rem;
    line-height: 0.4rem;
    color: #893218;
  }
  .prizeImg {
    width: 3.29rem;
    height: 1.8rem;
    margin: 0rem auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tel {
    width: 4.2rem;
    height: 0.84rem;
    margin: 0.2rem auto 0;
    input {
      width: 4.2rem;
      height: 0.84rem;
      background-color: #ffffff;
      border-radius: 0.42rem;
      border: solid 1px #f0ee77;
      color: #555555;
      font-size: 0.34rem;
      line-height: 0.84rem;
      padding-left: 0.3rem;
    }
  }
  .btnlingqu {
    width: 4.2rem;
    height: 0.84rem;
    line-height: 0.84rem;
    background: url("./imgs/prizebtn.jpg") no-repeat;
    background-size: 100% auto;
    margin: 0.5rem auto 0;
    text-align: center;
    font-size: 0.34rem;
    color: #fff;
  }
  // .sorryname {
  //   width: 1.83rem;
  //   height: 0.51rem;
  //   margin: 0.8rem auto 0.5rem;
  //   img {
  //     width: 100%;
  //     height: 100%;
  //   }
  // }
  // .sorryimg {
  //   width: 3.04rem;
  //   height: 3.39rem;
  //   margin: 0.1rem auto;
  //   img {
  //     width: 100%;
  //   }
  // }
}
.mypop {
  background: transparent;
  padding-top: 0.01rem;
}
#back-left {
  position: fixed;
  top: 0.4rem;
  left: 0.2rem;
  font-size: 0;
  display: inline-block;
  z-index: 99;
  opacity: 0;
  transition: all ease-in 0.2s;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 0.1rem;
  img {
    width: 0.54rem;
    height: 0.54rem;
  }
}

#back-left[data-fixed="fixed"] {
  opacity: 1;
}
</style>
