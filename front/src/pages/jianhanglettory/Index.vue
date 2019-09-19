<template>
  <div :class="{active:PopupPrize || showlimit || showrule}">
    <template v-if="$route.query.isQuit == 'true'">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>
    <div class="lettory">
      <div class="bg">
        <!-- <div class="acttime">活动时间：2019年7月4日</div> -->
        <div class="lottery">
          <HemiRotate
            ref="myRotate"
            v-if="showPannel"
            :setting="setting"
            @start="start"
            @end="rotateEnd"
            class="lottery-pannel"
          ></HemiRotate>
        </div>
        <!-- <div class="chances">
          剩余 <span>{{chances}}</span> 次抽奖机会
        </div> -->
        <div
          class="btnprize"
          @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
        ><img
            src="./imgs/myprize.png"
            alt=""
          ></div>
        <div
          class="btnrule"
          @click="showrule=true"
        ><img
            src="./imgs/btnrule.jpg"
            alt=""
          ></div>
        <!-- <div class="btn-group">
          <div
            class="btnrule"
            @click="showrule=true"
          ><img
              src="./imgs/btnrule.png"
              alt=""
            ></div>
          <div
            class="btnprize"

          ><img
              src="./imgs/btnprize1.png"
              alt=""
            ></div>
        </div> -->
      </div>
    </div>
    <template v-if="PopupPrize && prize">
      <div class="dialog">
        <div class="main">
          <div class="havePrize">
            <div class="prize">
              <div class="prizeimg"> <img
                  :src="prize.standardImgUrl"
                  alt=""
                >
              </div>
              <div class="prizeName"><span>恭喜您获得</span><br> {{prize.prizeName}}</div>
              <div
                class="btnknow"
                @click="showtip=true,PopupPrize=false"
              >
                <img
                  src="./imgs/btnknow1.png"
                  alt=""
                >
              </div>
            </div>
          </div>
          <div
            class="btnclose"
            @click="PopupPrize=false"
          ><img
              src="./imgs/close1.png"
              alt=""
            ></div>
        </div>
      </div>
    </template>
    <!-- <template v-if="prize">
      <transition name="fade">
        <mt-popup
          v-model="showlimit"
          class="mypop"
          popup-transition="popup-fade"
        >
          <div class="sorrylimit">
            <div class="limit-img">
              <img
                src="./imgs/sorryImg.png"
                alt=""
              >
            </div>
            <div
              class="btnknow"
              @click="showlimit=false"
            >
              <img
                src="./imgs/btnknow1.png"
                alt=""
              >
            </div>
          </div>
        </mt-popup>
      </transition>
    </template> -->
    <transition name="fade">
      <mt-popup
        v-model="showrule"
        class="mypop"
        popup-transition="popup-fade"
      >
        <div class="rule">
          <div
            class="rule-content"
            v-html="act.detail"
          >
          </div>
          <div
            class="close"
            @click="showrule=false"
          >
            <img
              src="./imgs/btnclose.jpg"
              alt=""
            >
          </div>
        </div>
      </mt-popup>
    </transition>
    <transition name="fade">
      <mt-popup
        v-model="showtip"
        class="mypop"
        popup-transition="popup-fade"
      >
        <div class="poptip">
          <div class="tiptitle">恭喜您获得锦鲤号</div>
          <div
            class="popnum"
            v-if="prize"
          >{{prize.orderCode | substr}}</div>
          <p>请截图保存</p>
          <div
            class="btnknow"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
          >
            <img
              src="./imgs/btnknow1.png"
              alt=""
            >
          </div>
          <div
            class="close"
            @click="showtip=false"
          >
            <img
              src="./imgs/btnclose.jpg"
              alt=""
            >
          </div>
        </div>
      </mt-popup>
    </transition>
  </div>
</template>

<script>
import pannelImage from './imgs/pannel.png';
import pointerImage from './imgs/pointer.png';
import HemiRotate from './HemiRotate';
import { Toast, Popup, Indicator } from 'mint-ui';
import { payUrl } from '@/config/';
import jssdk from '@/lib/jssdk';
// import bullet from './components/bullet';
export default {
  components: {
    HemiRotate,
    [Popup.name]: Popup
    // bullet
  },
  data () {
    return {
      showtip: false,
      PopupPrize: false,
      account: this.$store.state.cust ? this.$store.state.cust.tel : '',
      error: '',
      showPannel: false,
      merchantId: this.$store.state.merchantId,
      loading: false,
      rotating: false,
      chances: 0,
      prizeList: null,
      currentPrize: null,
      showlimit: false,
      setting: {
        pannelImage: pannelImage,
        pointerImage: pointerImage,
        // names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        // icons: this.act.productList.map(item => item.standardImgUrl),
        names: null,
        icons: null,
        colors: ['#febe04', '#fff'], // 大转盘奖品区块对应背景颜色
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      prize: null,
      secondActId: this.$route.query.actId
        ? this.$route.query.actId
        : 562655375,
      act: null,
      payUrl: payUrl,
      showpaytip: false,
      colorfont: '#1a1a1a',
      showrule: false,
      institutionNum: this.$route.query.institutionNum
        ? this.$route.query.institutionNum
        : ''
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
        this.showPannel = true;
      }
    },
    async loadLotteryChance () {
      let rs = await this.$get('api/get_lottery_info/' + this.secondActId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
    },
    async pushorderMsg () {
      let rs = await this.$post('api/activity/actBindingInstitution/save', {
        actId: this.secondActId,
        merchantId: this.merchantId,
        orderCode: this.orderCode,
        institutionNum: this.institutionNum
      });
      if (rs.status === 200) {
        console.log(rs.payload);
      }
    },
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.act.actId,
        num: '1'
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        this.orderCode = rs.payload.orderCode;
        if (this.institutionNum) {
          this.pushorderMsg();
        }
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/jianhanglettory/index?actId=${this.secondActId}`;
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
        Toast('订单已生成...正在跳转支付');
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    rotateEnd () {
      if (this.prize.proType == 8) {
        this.showlimit = true;
      } else {
        this.PopupPrize = true;
      }
      this.rotating = false;
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      if (this.chances < 1) {
        this.buyChance();
        return;
      }
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
        this.prizeList.forEach((item, ind) => {
          if (item.standardId === standardId) {
            this.currentPrize = item;
            this.rotating = true;
            this.$refs.myRotate.rotate(ind);
          }
        });
      } else {
        Toast('您的抽奖机会已用完！');
      }
      this.loading = false;
    }
  },
  async created () {
    await this.loadActdetails();
    this.loadLotteryChance();
    localStorage.setItem('lastVisitactId', this.secondActId);
  },
  mounted () {
    let link = window.location.href;
    this.shareConfig = {
      title: '建行绑卡遇见锦鲤', // 分享标题
      desc: '100%中奖，幸运锦鲤独享华为P30,油卡话费现金红包好礼享不停。', // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `${window.location.protocol}//static.lianhaikeji.com/images/20190719/ce6e5beb39a54807b06ff678f824aafc.png` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
      // Indicator.close()
    });
    this.loadDynamicScript();
    let ownerId = this.$route.query.ownerId;
    if (ownerId) {
      this.getInvitedPerson();
      this.bindUsers(ownerId);
    }
    // this.animateClass.push('fadeIn');
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.lettory {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: #fff3c2;
  padding-bottom: 0.1rem;
  .bg {
    width: 100%;
    min-height: 100vh;
    background: #fff3c2 url("./imgs/bg.jpg") no-repeat;
    background-size: 100% auto;
    padding-top: 5.4rem;
    position: relative;
    padding-bottom: 0.5rem;
    .btnprize,
    .btnrule {
      position: absolute;
      top: 0.35rem;
      right: 0;
      width: 1.47rem;
      height: 0.64rem;
      img {
        width: 100%;
      }
    }
    .btnrule {
      top: 1.2rem;
    }
  }
}
.lottery {
  margin: 0.3rem auto 0;
  z-index: 80;
  min-height: 7rem;
}
.chances {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  line-height: 0.68rem;
  // background: url(./imgs/btnchance.png) no-repeat;
  // background-size: 100% 100%;
  font-weight: 700;
  position: relative;
  font-size: 0.32rem;
  color: #fff;
  span {
    font-size: 0.4rem;
    color: #fff;
  }
}
.btn-group {
  width: 100%;
  height: 1.06rem;
  display: flex;
  justify-content: space-around;
  margin: 0.5rem auto;
  div {
    width: 2.93rem;
    height: 1.06rem;
    img {
      width: 100%;
    }
  }
}
.lettorytip {
  width: 90%;
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.4rem;
  color: #ffffff;
  margin: 0 auto;
}
.havePrize {
  width: 6.38rem;
  height: 6.22rem;
  background: url("./imgs/prizebg.png") no-repeat 0.05rem;
  background-size: 100% auto;
  padding-top: 2.36rem;
  .prize {
    width: 100%;
    margin: 0rem auto 0;
    .prizeName {
      width: 100%;
      font-family: PingFang-SC-Bold;
      font-size: 0.28rem;
      color: #333;
      text-align: center;
      margin: 0rem auto 0rem;
      font-weight: 700;
      line-height: 0.5rem;
      span {
        color: #fe3f36;
      }
    }
    .prizeimg {
      width: 1.6rem;
      margin: 0rem auto 0.36rem;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
.btnclose {
  width: 0.72rem;
  height: 0.72rem;
  margin: 0.5rem auto 0;
  img {
    width: 100%;
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
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.mypop {
  background: transparent;
}
.sorrylimit {
  width: 5.96rem;
  height: 7.43rem;
  background: url("./imgs/sorrybg.png") no-repeat 0.05rem;
  background-size: 100% auto;
  padding-top: 2.5rem;
  .limit-img {
    width: 1.43rem;
    height: 1.45rem;
    margin: 1rem auto 0.5rem;
    img {
      width: 100%;
    }
  }
}
.btnknow {
  width: 3rem;
  height: 0.74rem;
  margin: 0.32rem auto;
  img {
    width: 100%;
  }
}
.active {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.rule {
  width: 7.13rem;
  height: 10.46rem;
  background: url(./imgs/rulebg.jpg) no-repeat;
  background-size: 100% auto;
  padding-top: 1.5rem;
  position: relative;
  .rule-content {
    width: 5.8rem;
    height: 7.75rem;
    overflow: scroll;
    font-size: 0.24rem;
    color: #333;
    margin: 0.7rem auto 0;
    line-height: 0.45rem;
  }
}
.close {
  width: 0.58rem;
  height: 0.58rem;
  position: absolute;
  top: 1rem;
  right: 0.55rem;
  img {
    width: 100%;
  }
}
.poptip {
  width: 6.38rem;
  height: 6.22rem;
  background: url("./imgs/popbg.png") no-repeat;
  background-size: 100% auto;
  padding-top: 2.24rem;
  position: relative;
  p {
    width: 100%;
    text-align: center;
    color: #fe3f3d;
    font-weight: 600;
  }
  .tiptitle {
    width: 100%;
    text-align: center;
    font-size: 0.36rem;
    color: #fe3f3d;
    margin: 0.36rem auto;
  }
  .popnum {
    width: 4.52rem;
    height: 0.98rem;
    left: 0.98rem;
    text-align: center;
    font-size: 0.36rem;
    color: #333;
    background: url("./imgs/numbg.png") no-repeat;
    background-size: 100% 100%;
    line-height: 0.98rem;
    margin: 0.35rem auto 0.2rem;
  }
}
</style>
