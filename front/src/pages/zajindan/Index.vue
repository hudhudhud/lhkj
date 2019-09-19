<template>
  <div>
    <back></back>
    <div class="zajindan">
      <div class="bg">
        <div class="bullet-box box1">
          <div
            class="list"
            :style="{top:-bulletTop+'px'}"
          >
            <div
              class="bullet"
              v-for="(bullet,ind) in flyList"
              :key="ind"
            >
              恭喜 {{bullet.tel| hidden}}用户获得{{bullet.prizeName}} <br>
            </div>
          </div>
        </div>
        <div
          class="btnbring"
          @click="showzhangben()"
          :class="{btnliang:liang}"
        ></div>

        <div class="lettery">
          <div
            v-for="i in 3"
            :key="'lettery'+i"
            class="letteryImg"
          >
            <!-- @click="lettery(i)"
            :class="{changeimg:mask==i&&changeimg}" -->
            <!-- <div
              class="tamp"
              :class="{active:mask==i}"
            > <img
                src="./imgs/tamp.png"
                alt=""
              > </div> -->
            <jindan
              :index="i"
              :payload="payload"
              @action="lettery(i)"
            ></jindan>

          </div>
        </div>
        <div
          class="btnpay"
          @click="buyChance"
        ></div>
        <div class="chance">剩余{{chancesNum}}次机会</div>
        <div class="btn-group">
          <div class="btn"> <img
              src="./imgs/rulebtn.png"
              alt=""
              @click="PopupFlag=true"
            > </div>
          <div
            class="btn"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=${secondActId}`)"
          > <img
              src="./imgs/prizebtn1.png"
              alt=""
            > </div>
        </div>
        <div class="bullet-message">
          <div class="act-num">目前参与人数：{{actnum}}</div>
          <div
            class="act-time"
            v-if="timeStatus.isInTime"
          >活动剩余时间:
            <span
              class="time-item"
              v-for="(item, ind) in timeStatus.timeText"
              :key="ind"
            >
              {{item.time}}{{item.unit}}
            </span>
          </div>
          <div
            class="act-time"
            v-if="!timeStatus.isInTime && !timeStatus.timeover"
          >活动尚未开始
          </div>
          <div
            class="act-time"
            v-if="timeStatus.timeover"
          >活动已经结束
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="PopupFlag"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="header"> <img
          src="./imgs/ruleheader.png"
          alt=""
        > </div>
      <div class="ruledetail">
        <div
          class="content"
          v-html="act.detail"
        >
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="showprize"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="header"> <img
          src="./imgs/prizeheader.png"
          alt=""
        ></div>
      <div class="ruledetail">
        <div class="prizename">
          <img
            v-if="prize&&prize.standardImgUrl"
            :src="prize.standardImgUrl"
            alt=""
          >
        </div>
        <div class="eggdestory"> <img
            src="./imgs/eggdestory2.png"
            alt=""
          > </div>
        <p>点击“我的”-"我的奖品"查看并充值</p>
        <div class="prizetip">
          本活动每个客户支付的1分钱将全部捐赠给
          淳安慈善基金会，谢谢您的参与！
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="openMsg"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="header"> <img
          src="./imgs/openheader.jpg"
          alt=""
        ></div>
      <div class="ruledetail">
        <div class="sorryname">
          <img
            v-if="prize&&prize.standardImgUrl"
            :src="prize.standardImgUrl"
            alt=""
          >
        </div>
        <div class="sorryimg">
          <img
            src="./imgs/sorry1.jpg"
            alt=""
          >
        </div>
        <div class="prizetip">
          本活动每个客户支付的1分钱将全部捐赠给
          淳安慈善基金会，谢谢您的参与！
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="openZhangben"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="header"> <img
          src="./imgs/langheader1.jpg"
          alt=""
        ></div>
      <div class="ruledetail">
        <div class="message">
          手机银行首页-账户管理-手动添加卡/账户，即可实现“他行卡查询”功能。手机银行，您的贴身账户管家！
        </div>
        <div class="zhangbenimg">
        </div>
      </div>

    </mt-popup>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
import jindan from '@/components/jindan';
import bgImg2 from './imgs/egg.png';
import bgImg1 from './imgs/eggdestory.jpg';
import tamp from './imgs/tamp.png';
import moment from 'moment';
export default {
  data () {
    return {
      liang: false,
      openZhangben: false,
      showprize: false,
      PopupFlag: false,
      timer: null,
      bulletList: [],
      bulletTop: 0,
      bulletFlag: false,
      flyList: [],
      openMsg: false,
      prize: null,
      payUrl: payUrl,
      currentPage: 1,
      payChances: 0,
      chances: 0,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 559204556 : 553154414,
      act: null,
      bulletList2: [],
      startTime: '',
      endTime: '',
      timeStatus: {},
      actnum: 0,
      payload: {
        bgImg1: bgImg1,
        bgImg2: bgImg2,
        transformFlag: false,
        tamp: tamp,
        index: -1,
        changeImg: false
      }
    };
  },
  components: { jindan },
  computed: {
    chancesNum () {
      return this.payChances > 0 ? this.payChances : this.chances;
    }
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
        this.startTime = rs.payload.startTime;
        this.endTime = rs.payload.endTime;
        this._ind = this.calcTime();
        let productlist = rs.payload.productList;
        if (!productlist || productlist.length === 0) {
        } else {
          this.bulletList2 = [];
          productlist.forEach(item => {
            if (item.proType == 8) {
            } else {
              this.bulletList2.push(item);
            }
          });
        }
      }
    },
    showzhangben () {
      this.openZhangben = true;
      this.liang = true;
    },
    getSecondTimeFomate (a) {
      var d = parseInt(a / 3600 / 24);
      if (d.toString().length == 1) {
        d = '0' + d;
      }
      var h = parseInt((a / 3600) % 24);
      if (h.toString().length == 1) {
        h = '0' + h;
      }
      var m = parseInt((a / 60) % 60);
      if (m.toString().length == 1) {
        m = '0' + m;
      }
      var s = parseInt(a % 60);
      // var s = (a - 3600 * h - 60 * m)
      if (s.toString().length == 1) {
        s = '0' + s;
      }
      return [
        { time: d, unit: '天' },
        { time: h, unit: '时' },
        { time: m, unit: '分' },
        { time: s, unit: '秒' }
      ];
    },
    calcTime () {
      let timeStatus = {};
      let now = Date.now();
      let startTime = moment(this.startTime).valueOf();
      let endTime = moment(this.endTime).valueOf();
      timeStatus.timeover = false;
      if (now < startTime) {
        timeStatus.isInTime = false;
        timeStatus.time = startTime - now;
        timeStatus.startTime = false;
      } else if (now > startTime && now < endTime) {
        timeStatus.isInTime = true;
        timeStatus.time = endTime - now;
        timeStatus.startTime = startTime;
      } else if (now > endTime) {
        timeStatus.timeover = true;
      }
      timeStatus.timeText = this.getSecondTimeFomate(timeStatus.time / 1000);
      this.timeStatus = timeStatus;
      this._ind = setTimeout(this.calcTime, 1000);
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
    async loadtotalPerson () {
      let rs = await this.$post('api/activity/actrecord/searchActivityAttend', {
        actId: this.act.actId,
        begdate: '2019-05-01 00:00:00'
      });
      if (rs.status === 200) {
        this.actnum = rs.payload;
      } else {
        Toast(rs.error);
      }
      setTimeout(this.loadtotalPerson, 2500);
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
            }/merchant/zajindan/prizeDetail/${this.act.actId}`
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
        let key2 = this.bulletList2.length * Math.random();
        let bullet2 = this.bulletList2[parseInt(key2)];
        let fly = {
          name: bullet.rechargeAccount,
          prizeName: bullet.proStandardName,
          tel: bullet.tel,
          standprizeName: bullet2.prizeName,
          num: bullet2.prizeTotal - bullet2.usedTotal
        };
        this.flyList.push(fly);
        if (this.flyList.length > 10) {
          // this.flyList.shift();
          // this.bulletTop = 0;
        }
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
      }
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
        this.payload.index = i;
        // this.mask = i;
        setTimeout(() => {
          this.payload.changeImg = true;
        }, 1500);
        setTimeout(() => {
          this.payload.changeImg = true;
          if (this.prize.proType == 8) {
            this.openMsg = true;
          } else {
            this.showprize = true;
          }
        }, 3000);
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
        MessageBox({
          message: '请在完成支付后，点击左上角返回活动页面。',
          confirmButtonText: '去支付'
        }).then(action => {
          if (action == 'confirm') {
            let successUrl = `${window.location.protocol}//${
              window.location.host
            }/${this.$store.state.merchantAppid}/merchant/zajindan/index`;
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
  async created () {
    await this.loadAct(this.secondActId);
    this.loadRecord();
    this.addChance();
    this.loadtotalPerson();
    await this.loadOrder();
    this.startBullet();
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>
<style scoped lang="scss">
.zajindan {
  width: 100%;
  min-height: 100vh;
  background: rgb(253, 229, 112);
  overflow-x: hidden;
  padding-bottom: 0.2rem;
  .bg {
    min-height: 12.06rem;
    width: 100%;
    background: url("./imgs/bg.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 0.01rem;
    .bullet-box {
      position: relative;
      overflow: hidden;
      width: 5rem;
      text-align: center;
      margin: 0.28rem auto 0;
      background: url(./imgs/bulletbg.png) no-repeat;
      background-size: 100% 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.26rem;
      color: #fff;
      .list {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        transition: all 5s;
        transition-timing-function: linear;
        & .bullet-fly {
          bottom: 100%;
        }
      }
    }
    .btnbring {
      width: 3.37rem;
      height: 0.87rem;
      background: url("./imgs/btnan1.jpg");
      background-size: 100% 100%;
      margin: 0.3rem auto 0;
    }
    .btnliang {
      background: url("./imgs/btnliang1.jpg");
      background-size: 100% 100%;
      height: 1.27rem;
      width: 3.81rem;
    }

    .box1 {
      margin-top: 5rem;
    }
    .bullet-message {
      width: 6.3rem;
      height: 0.94rem;
      margin: 0.2rem auto;
      background: url("./imgs/messagebg.png") no-repeat;
      background-size: 100% 100%;
      color: red;
      font-size: 0.26rem;
      div {
        width: 100%;
        text-align: center;
        height: 0.47rem;
        line-height: 0.47rem;
      }
    }
    .lettery {
      width: 100%;
      display: flex;
      justify-content: space-around;
      height: 2.77rem;
      margin-top: 0.6rem;
      position: relative;
      .letteryImg {
        width: 2.09rem;
        height: 2.77rem;
        // background: url("./imgs/egg.png") no-repeat;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
    }
    .btnpay {
      width: 4.24rem;
      height: 0.95rem;
      background: url("./imgs/btnpay.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.1rem auto 0;
    }
    .chance {
      width: 100%;
      text-align: center;
      color: #b6640e;
      font-size: 0.26rem;
      margin-top: 0.2rem;
    }
    .btn-group {
      width: 100%;
      height: 0.74rem;
      display: flex;
      justify-content: space-around;
      .btn {
        width: 2.4rem;
        height: 0.74rem;
        img {
          width: 100%;
        }
      }
    }
  }
}
.ruledetail {
  width: 5.8rem;
  height: 7.6rem;
  background: url("./imgs/rulebg.png") no-repeat;
  background-size: 100% 100%;
  padding: 2rem 0.3rem 0.2rem;
  color: #fff;
  font-size: 0.26rem;
  line-height: 0.36rem;
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
  .zhangbenimg {
    width: 2.53rem;
    height: 2.69rem;
    background: url("./imgs/zhangben1.jpg") no-repeat;
    background-size: 100% 100%;
    margin: 0.3rem auto;
  }
  .content {
    overflow-y: scroll;
    height: 5rem;
  }
  .prizename {
    width: 2.84rem;
    height: 0.42rem;
    margin: 0rem auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .sorryname {
    width: 1.83rem;
    height: 0.51rem;
    margin: 0rem auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .sorryimg {
    width: 3.04rem;
    height: 3.39rem;
    margin: 0.1rem auto;
    img {
      width: 100%;
    }
  }
  .eggdestory {
    width: 4.52rem;
    height: 3.36rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .prizetip {
    width: 5.2rem;
    height: 1.12rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0.1rem;
    font-size: 0.24rem;
    padding: 0.1rem 0.2rem;
    color: #fff;
    text-align: center;
  }
  p {
    width: 100%;
    text-align: center;
    font-size: 0.26rem;
    color: #fff;
  }
}

.header {
  position: absolute;
  width: 5.11rem;
  height: 2.62rem;
  top: -0.9rem;
  left: 0;
  right: 0;
  margin: auto;
  margin-left: -0.02rem;
  img {
    width: 100%;
  }
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
  // position: fixed;
  opacity: 1;
}
</style>
