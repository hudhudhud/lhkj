<template>
  <div>
    <back></back>
    <div class="zajindan">
      <div class="bg">
        <div :class="{'bullet-box':true,'box1':true,'hidden':!flyList||!flyList.length}" >
          <div
            v-if='flyList.length'
            class="list"
            :style="{top:-bulletTop+'px'}"
          >
            <div
              class="bullet"
              v-for="(bullet,ind) in flyList"
              :key="ind"
            >{{bullet}}<br></div>
          </div>
        </div>
         <div class="chance">您还有<span class='num'>{{chancesNum}}</span>次机会</div>
        <div class="lettery">
          <div class="lettery-bottom"></div>
          <div
            v-for="i in 3"
            :key="'lettery'+i"
            class="letteryImg"
          >
            <jindan
              :index="i"
              :payload="payload"
              @action="lettery(i)"
            ></jindan>

          </div>
        </div>
        <p class='tip'>请点击上方其中一颗金蛋开启幸运</p>
        <div class="btn-group">
          <div class="btn"> <img
              src="./imgs/rulebtn.png"
              alt=""
              @click="PopupFlag=true"
            > </div>
          <div
            class="btn"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/orderSzzhzjd?actId=${secondActId}`)"
          > <img
              src="./imgs/prizebtn1.png"
              alt=""
            > </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="PopupFlag"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="ruledetail">
        <p class="title">活动规则</p>
        <div
          class="content"
          v-html="act.detail"
        >
        </div>
        <div class="close" @click="PopupFlag=false"></div>
      </div>
    </mt-popup>

    <mt-popup
        v-model="showprize"
        class="mypop"
        popup-transition="popup-fade"
        :closeOnClickModal='false'
        >
        <div class="ruledetail">
            <div class="content zj">
                <div class="header">
                    <img  src="./imgs/zj.png" alt="">
                </div>
                <div class="pro-show" >
                    <p class="pro-name">{{prize?prize.prizeName:''}}</p>
                    <img
                        v-if="prize&&prize.standardImgUrl"
                        :src="prize.standardImgUrl"
                        alt=""
                    >
                </div>
                <p class="tip">点击"获奖历史"查看并进行兑换</p>
                <div class="prizetip go-address" v-if='prize&&prize.proType==9' @click="$router.push(`/${$store.state.merchantAppid}/merchant/address/list?targetPath=szzhzjd?actId=${secondActId}&orderCode=${prize.orderCode}&proName=${prize.prizeName}`)"></div>
                <div class="prizetip" v-else @click='goOrder'></div>
            </div>
        </div>
    </mt-popup>

    <mt-popup
        v-model="openMsg"
        class="mypop"
        popup-transition="popup-fade"
        >
        <div class="ruledetail">
            <div class="content xxcy">
                <img  src="./imgs/xxcy.png" alt=""  class="top">
                 <img
                        v-if="prize&&prize.standardImgUrl"
                        :src="prize.standardImgUrl"
                        alt=""
                        class="thanks"
                    >
                <img src="./imgs/thanks.png" alt="" class="thanks" v-else>
                <div class="prizetip" @click="openMsg=false"></div>
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
import bgImg1 from './imgs/eggOpen.png';
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
      bulletList: [
        '恭喜155*****342用户获得Ipad mini5 wifi(64金)',
        '恭喜156*****565用户获得SoundSport MF耳机',
        '恭喜153*****355用户获得888金币',
        '恭喜152*****424用户获得腾讯视频年卡',
        '恭喜155*****336用户获得Ipad mini5 wifi(64金)',
        '恭喜153*****376用户获得888金币'
      ],
      bulletTop: 0,
      bulletFlag: false,
      flyList: [],
      openMsg: false,
      prize: null,
      payUrl: payUrl,
      currentPage: 1,
      payChances: 0,
      chances: 0,
      secondActId: '', // process.env.PUBLISH_ENV == 'prod' ? 559204556 : 553154414,
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
    goOrder () {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/orderSzzhzjd?` + window.document.location.search)
    },
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
        this.startTime = rs.payload.startTime;
        this.endTime = rs.payload.endTime;
        // this._ind = this.calcTime();
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
      let key = this.bulletList.length * Math.random();
      let bullet = this.bulletList[parseInt(key)];
      // if (this.bulletList.length) {
      //   let key = this.bulletList.length * Math.random();
      //   let bullet = this.bulletList[parseInt(key)];
      //   let key2 = this.bulletList2.length * Math.random();
      //   let bullet2 = this.bulletList2[parseInt(key2)];
      //   let fly = {
      //     name: bullet.rechargeAccount,
      //     prizeName: bullet.proStandardName,
      //     tel: bullet.tel,
      //     standprizeName: bullet2.prizeName,
      //     num: bullet2.prizeTotal - bullet2.usedTotal
      //   };
      //   fly.tel = fly.tel
      //     ? fly.tel.replace(/([\d]{3})([\d]{5})([\d]{3})/, '$1*****$3')
      //     : '**';
      this.flyList.push(bullet);
      //   if (this.flyList.length > 10) {
      //     // this.flyList.shift();
      //     // this.bulletTop = 0;
      //   }
      // }
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
    this.secondActId = this.$route.query.actId
    await this.loadAct(this.secondActId);
    this.loadRecord();
    this.addChance();
    // this.loadtotalPerson();
    // await this.loadOrder();
    this.startBullet();
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>
<style scoped lang="scss">
*{xbackground-color:rgba(0,0,0,0.1)}
.zajindan {
  width: 100%;
  min-height: 13.34rem;
  position:absolute;
  top:0;
  bottom:0;
  background: #3b0072;
  overflow-x: hidden;
  xpadding-bottom: 0.2rem;
  .bg {
    height:100%;
    width: 100%;
    background: url("./imgs/bg.png") no-repeat;
    background-size: 100% auto;
    padding-top: 0.01rem;
    .bullet-box {
      &.hidden{
        visibility:hidden;
      }
      position: relative;
      overflow: hidden;
      width: 4.68rem;
      height: 0.54rem;
      line-height: 0.54rem;
      border-radius: .1rem;
      xtext-align: center;
      margin:auto;
      margin-top: 0.22rem;
      background-color:#b599c5;
      font-size: 0.26rem;
      color: #6a4E19;
      .bullet{
        padding-left:.28rem;
      }
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
    // .btnbring {
    //   width: 3.37rem;
    //   height: 0.87rem;
    //   background: url("./imgs/btnan1.jpg");
    //   background-size: 100% 100%;
    //   margin: 0.3rem auto 0;
    // }
    // .btnliang {
    //   background: url("./imgs/btnliang1.jpg");
    //   background-size: 100% 100%;
    //   height: 1.27rem;
    //   width: 3.81rem;
    // }

    .box1 {
      margin-top: 4.68rem;
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
      position:relative;
      width: 100%;
      display: flex;
      justify-content: space-around;
      height: 4.16rem;
      margin-top: 0.5rem;
      position: relative;
      .letteryImg {
        .tamp{
          z-index:88;
        }
        width: 2.18rem;
        height: 2.40rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position:absolute;
        xz-index:1;
        &:nth-child(2),&:nth-child(4){
            transform: scale(.8)
        }
        &:nth-child(2){
            left:.5rem;
        }
        &:nth-child(4){
            right:.5rem;
        }
      }
      .lettery-bottom{
          position:absolute;
          bottom: -.4rem;
          width:6.78rem;
          height:2.59rem;
          background:url('./imgs/egg-bottom.png') no-repeat;
          background-size: cover;
          z-index:0;
      }
    }
    // .btnpay {
    //   width: 4.24rem;
    //   height: 0.95rem;
    //   background: url("./imgs/btnpay.png") no-repeat;
    //   background-size: 100% 100%;
    //   margin: 0.1rem auto 0;
    // }
    .chance {
      width: 100%;
      text-align: center;
      color: #b6640e;
      font-size: 0.3rem;
      margin-top: 0.1rem;
      font-style:italic;
      color:#fff;
      .num{
          font-size:.58rem;
          color:#e3030A;
      }
    }
    .tip{
        margin-top:.6rem;
        text-align:center;
        font-size:.26rem;
        color:#fff;
    }
    .btn-group {
      margin-top:.4rem;
      width: 100%;
      height: 0.74rem;
      display: flex;
      justify-content: space-around;
      .btn {
        width: 2.92rem;
        height: 1.06rem;
        img {
          width: 100%;
        }
      }
    }
  }
}
.ruledetail {
  width: 7.15rem;
  height: 7.1rem;
  background: url("./imgs/rulebg.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 0.26rem;
  line-height: 0.36rem;
  position: relative;
  .message {
    // width: 5.2rem;
    // height: 2rem;
    background: rgba(255, 255, 255, 0.1);
    text-indent: 0.3rem;
    font-size: 0.25rem;
    color: #222;
    padding: 0.2rem;
    line-height: 0.5rem;
    margin-top: 0.2rem;
    overflow-y:scroll;
  }
  // .zhangbenimg {
  //   width: 2.53rem;
  //   height: 2.69rem;
  //   background: url("./imgs/zhangben1.jpg") no-repeat;
  //   background-size: 100% 100%;
  //   margin: 0.3rem auto;
  // }
  .title{
    font-size:.4rem;
    color:red;
    text-align: center;
    padding-top:1rem;
    font-weight: bold;
  }
  .content {
    position:absolute;
    left:50%;
    transform: translateX(-48%);
    xtop:2rem;
    overflow-y: scroll;
    width: 5rem;
    height: 4.5rem;
    font-size: 0.25rem;
    line-height: 0.4rem;
    margin-top: 0.2rem;
    color:#222;
    &.zj{
        height: 5rem;
        overflow-y: hidden;
        top:1rem;
        .pro-show{
            top:2rem;
            text-align: center;
            .pro-name{
                font-size:.28rem;
                text-align: center;
                color:#000;
                font-weight: normal;
                padding-top:.8rem;
            }
            img{
                max-width:4rem;
                height:1.1rem;
                margin-top:.5rem;
            }
        }
        .tip{
            font-size:.25rem;
            color:#000;
            position:absolute;
            bottom: 1.1rem;
        }
    }
    &.xxcy{
        height: 5rem;
        overflow-y: hidden;
        top:1rem;
        text-align: center;
        .top{
            display: block;
            width:1.6rem;
            height:.69rem;
            margin:auto;
        }
        .thanks{
          display: block;
          max-width:4rem;
          height:2rem;
          margin:auto;
          margin-top:.3rem;
        }
    }
  }
  .close{
      position:absolute;
      bottom:-1rem;
      left:50%;
      transform: translateX(-48%);
      background:url(./imgs/close.png) no-repeat;
      background-size: 100% 100%;
      width:.72rem;
      height: .72rem;
  }
//   .prizename {
//     width: 2.84rem;
//     height: 0.42rem;
//     margin: 0rem auto;
//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }
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
  // .eggdestory {
  //   width: 4.52rem;
  //   height: 3.36rem;
  //   margin: 0 auto;
  //   img {
  //     width: 100%;
  //   }
  // }
  .prizetip {
    position:absolute;
    width: 2.78rem;
    height: .84rem;
    background:url(./imgs/ikonw.png) no-repeat;
    background-size:100% 100%;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
    &.go-address{
      background:url(./imgs/go-address.png) no-repeat;
      background-size:100% 100%;
    }
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
  width: 3.23rem;
  height: .69rem;
  img{
      width:100%;
  }
  xtop: 1rem;
  left: 0;
  right: 0;
  margin: auto;
  z-index:28;
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
.pop-bak{
    background:url('./imgs/rulebg.png') no-repeat;
    width:7.15rem;
    height:7.1rem;
    background-size: 100% 100%;
    margin:auto;
    .head-img{
      width:3.23rem;
      height:.29rem;

    }
}
</style>
