<template>
  <div>
    <div>
      <a
        @click="goBack"
        href="javascript:"
        ref="backLeft"
        id="back-left"
        data-fixed="fixed"
      ><img
          src="./imgs/left.png"
          alt=""
        ></a>
    </div>
    <div class="bg">
      <div class="bg-header"></div>
      <div class="bg-center">
        <div class="huaweiImg"></div>
        <div class="bullet-box">
          <span><img src="./imgs/notice.png" alt=""></span>
          <div class="list" :style="{top:-bulletTop+'px'}">
            <div class="bullet" v-for="(bullet,ind) in flyList" :key="ind">
              恭喜**获得{{bullet.prizeName}}

            </div>
          </div>
        </div>

        <div class="btn-group">
          <div class="btn" @click="$router.push(`/${$store.state.merchantAppid}/merchant/shenzhenBOC/rule`)">
            活动规则
          </div>
          <div class="btn" @click="myPrize">
            我的奖品
          </div>
        </div>

        <p class="choose">请选择下方套娃抽奖</p>
      </div>
      <div class="bg-main">

        <div class="lettery">
          <div v-for="i in 3" :key="'lettery'+i" :class="'lettery'+i" class="fudai">
            <img @click="lettery" src="./imgs/taowa.png" alt="" class="active1">
          </div>
        </div>

        <div class="chance">您有{{chancesNum}}次机会
        </div>
        <div class="lettery-btn" @click="buyChance">
        </div>
      </div>

    </div>
    <!-- 恭喜:{{bullet.name | formatPhone}}获得{{bullet.prizeName}} -->
    <prize-log :openDialog="prizeShow" :prize="prize" @close-dialog="prizeShow=false" @post-name="postName"></prize-log>
    <!-- <rule-log
      :openRule="openRule"
      :rule="act.detail"
      @close-rule="openRule=false"
    ></rule-log> -->
    <open-Msg :openMsg="openMsg" @close-msg="openMsg=false"></open-Msg>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
import prizeLog from './components/prizeLog';
// import ruleLog from './components/rule';
import openMsg from './components/noPrize';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      timer: null,
      bulletList: [],
      bulletTop: 0,
      bulletFlag: false,
      flyList: [],
      prizeShow: false,
      openRule: false,
      openMsg: false,
      prize: null,
      noMore: false,
      payUrl: payUrl,
      currentPage: 1,
      payChances: 0,
      chances: 0
    };
  },
  computed: {
    chancesNum () {
      return this.payChances > 0 ? this.payChances : this.chances;
    }
  },
  components: { prizeLog, openMsg },
  methods: {
    goBack () {
      this.$jssdk.call('back', true);
    },
    async postName (name) {
      if (this.prize.proType != 2) {
        this.prizeShow = false;
        return;
      }
      if (!name) {
        Toast('请输入您的姓名');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/activity/act/actPredate/save/table', {
        actId: this.act.actId,
        orderCode: this.prize.orderCode,
        name: name
      });
      if (rs.status === 200) {
        Toast('保存成功');
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async myPrize () {
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.act.actId,
        status: 2
      });
      if (rs.status === 200) {
        if (rs.payload.list.length < 1) {
          Toast('您还没有抽到过奖品哦');
        } else {
          this.$router.push(
            `/${
              this.$store.state.merchantAppid
            }/merchant/shenzhenBOC/prizeDetail/${this.act.actId}`
          );
        }
      } else {
        Toast(rs.error);
      }
    },
    async addChance () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
      Indicator.close();
    },
    startBullet () {
      if (this.bulletList.length) {
        let key = this.bulletList.length * Math.random();
        let bullet = this.bulletList[parseInt(key)];
        let fly = {
          name: bullet.rechargeAccount,
          prizeName: bullet.proStandardName
        };
        this.flyList.push(fly);
      }
      this.bulletTop += 25;
      this.timer = setTimeout(this.startBullet, 2500);
    },
    async loadOrder () {
      let rs = await this.$post('/api/getAllOrderList?', {
        actId: this.act.actId,
        status: 2
      });
      if (rs.status === 200) {
        let list = rs.payload.list;
        if (!list || list.length === 0) {
          this.noMore = true;
        } else {
          this.bulletList = [];
          list.forEach(item => {
            this.bulletList.push(item);
          });
        }
        this.startBullet();
      }
    },
    async lettery () {
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
        if (this.prize.proType == 8) {
          this.openMsg = true;
        } else {
          this.prizeShow = true;
        }
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async buyChance () {
      if (this.chances > 0) {
        Toast('请点击套娃抽奖');
        return;
      }
      if (this.payChances < 1) {
        Toast('您的参与机会已用尽');
        return;
      }
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.act.actId,
        num: '1'
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/act/${
          this.act.actId
        }`;
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

    async loadRecord () {
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$post('api/activity/custom/search/record', {
        actId: this.act.actId
      });
      if (rs.status === 200) {
        this.payChances = JSON.parse(rs.payload).num;
      }
    }
  },
  created () {
    this.loadRecord();
    this.addChance();
    this.loadOrder();
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>
<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url("./imgs/bg-bottom.jpg") repeat-y;
  background-size: 100% auto;
  overflow-y: auto;
  .bg-header {
    width: 100%;
    height: 2.2rem;
    background: url("./imgs/bg-header.png") no-repeat;
    background-size: 100% 100%;
  }
  .bg-center {
    width: 100%;
    height: 6.74rem;
    background: url("./imgs/bg-center.png") no-repeat;
    background-size: 100% 100%;
    overflow: auto;
    .huaweiImg {
      position: relative;
      width: 3.36rem;
      height: 3.08rem;
      background: url("./imgs/huaweiIndex.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.1rem auto 0;
    }
    .btn-group {
      height: 0.85rem;
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 0.3rem;
      .btn {
        height: 0.85rem;
        width: 2.75rem;
        background: url("./imgs/btn-index.png") no-repeat;
        background-size: 100% 100%;
        line-height: 0.85rem;
        text-align: center;
        font-size: 0.36rem;
      }
    }
    .bullet-box {
      // position: relative;
      position: relative;
      top: 0.2rem;
      overflow: hidden;
      width: 3rem;
      text-align: center;
      margin: 0 auto;
      // background: url(./imgs/bullte-bg.png) no-repeat;
      background-size: 100% 100%;
      // border-radius: 0.3rem;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: left;
      padding-left: 0.2rem;
      font-size: 0.26rem;
      // opacity: 0.3;
      img {
        width: 0.24rem;
      }
      span {
        color: #f48e0e;
      }
      .list {
        position: absolute;
        top: 0;
        left: 0.6rem;
        transition: all 5s;
        transition-timing-function: linear;
        & .bullet-fly {
          bottom: 100%;
        }
      }
    }
    .choose {
      width: 100%;
      text-align: center;
      color: #c90030;
      font-size: 0.28rem;
      margin-top: 0.5rem;
    }
  }
  .bg-main {
    width: 100%;
    .lettery {
      width: 100%;
      justify-content: space-around;
      display: flex;
      height: 3.28rem;
      position: relative;
      z-index: 50;
      margin-top: -0.7rem;
      div {
        height: 3.28rem;
        width: 1.9rem;
        text-align: center;
      }
      img {
        width: 100%;
        max-width: 1.9rem;
      }
      img.active1 {
        animation: tada 5s linear infinite;
      }
    }
    @keyframes tada {
      0% {
        transform: scale(1);
      }
      10%,
      20% {
        transform: scale(0.9) rotate(-3deg);
      }
      30%,
      50%,
      70%,
      90% {
        transform: rotate(3deg);
      }
      40%,
      60%,
      80% {
        transform: rotate(-3deg);
      }
      100% {
        transform: rotate(0);
      }
    }
    .chance {
      width: 100%;
      text-align: center;
      font-size: 0.28rem;
      color: #c90030;
    }
    .lettery-btn {
      position: relative;
      width: 5.28rem;
      height: 1.18rem;
      background: url("./imgs/index-buy.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.2rem auto 0.5rem;
    }
  }
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
  // position: fixed;
  opacity: 1;
}
</style>
