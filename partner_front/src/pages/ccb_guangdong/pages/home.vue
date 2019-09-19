<template>
  <div class="page">
    <div class="top-tips">
      <p>微信绑定广东建行卡支付<span>0.01元</span>抽奖<br>百分百中奖</p>
    </div>
    <div class="rotate">
      <HemiRotate ref="myRotate" @start="start" :setting="setting" v-if="showPannel" @end="rotateEnd"></HemiRotate>
      <div class=" btns">
        <div class="btn left" @click="bindPopupTips">
          <img src="./imgs/btns-left.png" alt="">
        </div>
        <div class="btn" @click="linkPrize">
          <img src="./imgs/btns-right.png" alt="">
        </div>
      </div>
      <div class="rotate-tips">您还有<span>{{chances+record}}</span>次抽奖机会</div>
    </div>
    <div class="progress-warp">
      <div class="name">邀请人数</div>
      <div class="progress-box">
        <img src="./imgs/progress-img.png" alt="">
        <div class="progress" ref="progress"></div>
        <div class='progress-icons'>
          <div v-for="(item,index) in progressList" :key="index" class="icon" :class="inviteCount >= item? 'ac':''"
            @click="bindExchangeAward(item)">
            {{item}}
            <img src="./imgs/progress-num-icon.png" alt="">
          </div>
        </div>
      </div>
      <div class="info">已邀人数：{{inviteCount}} 人</div>
    </div>
    <div class="invitation">
      <div class="btn invitation-title" @click="linkRanking">
        邀请人数（人）：{{inviteNum}}
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in inviteList" :key="index">
          <div class="pic">
            <img :src="item.img" alt="">
          </div>
          <div class="text">
            <div class="name">{{item.nickname}}</div>
            <div class="tips">{被邀请}</div>
            <div class="time">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="btn ranking" @click="linkRanking">
      <img src="./imgs/ranking-icon.png" alt="">
    </div> -->
    <!-- <div class="table">
      <div class="title">中奖记录</div>
      <div class="th">
        <div class="item">奖品名称</div>
        <div class="item">中奖时间</div>
        <div class="item">有效时间</div>
        <div class="item">奖品状态</div>
      </div>
      <div class="th" v-for="(item, index) in randomDatas" :key="index">
        <div class="item">{{item.name}}</div>
        <div class="item">{{item.startTime}}</div>
        <div class="item">{{item.endTime}}</div>
        <div class="item">{{item.state}}</div>
      </div>
    </div> -->
    <div class="popup-warp" v-if="popupTips">
      <dir class="popup-inner">
        <img class="title" src="./imgs/popup-title.png" alt="">
        <p>1、活动仅限广东省建设银行卡未绑定微信快捷支付客户参加，同一手机号，同一微信号，同一银行卡号，皆视为同一用户。<br>2、首次成功推荐好友参与活动可再获得一次抽奖机会（好友参与抽奖活动，成功绑定建行卡支付后才算成功推荐）。累计成功推荐5个好友可直接获得5元话费，累计成功推荐10个好友可直接获得10元话费，累计成功15次可直接获得15元话费，累计成功推荐20个好友可直接获得20元话费，4个奖励若领取任意一个，则扣除相应成功推荐好友数，重新累计到达要求数量后可再领取其他奖励。<br>3、活动期间，用户使用非建设银行卡支付则订单失败，支付金额将原路退回。<br>4、活动期间如出现作弊行为（如批量注册、恶意购买、虚假交易等），平台将自动取消本次活动订单，并有权取消您后续参与活动的权利，必要时追究法律责任。<br>5、如有疑问，请致电平台客服400-9626-962咨询，工作时间9:30-20：00。（部分国家法定节假日除外）<br>6、本活动最终解释权归中国建设银行广东省分行所有。</p>
        <div class="btn" @click="bindPopupTips">
          <img src="./imgs/popup-button.png" alt="">
        </div>
      </dir>
    </div>
    <div class="winning-popup" v-if="Popuprize">
      <dir class="popup-inner">
        <img class="title" src="./imgs/winning-popup-title.png" alt="">
        <div class="name">{{currentPrize.prizeName}}</div>
        <img class="pic" :src="currentPrize.standardImgUrl" alt="">
        <img class="btn" @click="Popuprize=false" src="./imgs/winning-popup-btn.png" alt="">
      </dir>
    </div>
  </div>
</template>

<script>
import HemiRotate from './HemiRotate';
import request from '../config/Request';
import config from '../config/index';
import { MessageBox } from 'mint-ui';
import jssdk from '@/lib/jssdk';

import pannelImage from './imgs/lunpan.png';
import pointerImage from './imgs/pointer.png';

export default {
  data () {
    return {
      Popuprize: false,
      popupTips: false,
      progressList: [5, 10, 20],
      prize: null,
      inviteCount: 0,
      merchantId: config.merchantId,
      chances: 0,
      signActId: config.signActId,
      loading: false,
      rotating: false,
      act: null,
      record: 0,
      showPannel: false,
      randomDatas: [],
      inviteList: [],
      inviteNum: 0,
      setting: {
        pannelImage: pannelImage,
        pointerImage: pointerImage,
        // names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        // icons: this.act.productList.map(item => item.standardImgUrl),
        names: null,
        icons: null,
        colors: ['#8fb8fa', '#fff', '#8fb8fa', '#fff', '#8fb8fa', '#fff'], // 大转盘奖品区块对应背景颜色
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      prizeList: null
    };
  },
  components: {
    HemiRotate
  },
  methods: {
    share () {
      let link =
        `${window.location.protocol}//${
          window.location.host
        }/partner/gdjh/home?share=` + this.$store.state.cust.id;
      this.shareConfig = {
        title: '深圳中行信用卡合伙人', // 分享标题
        desc: '玩转合伙人，大奖随心领', // 分享描述
        link: link, // 分享，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `https://static.lianhaikeji.com/images/20190711/ab2e3535c8cb4d978e44446681e94d78.png` // 分享图标
      };
      jssdk.jssdk.init('', this.merchantId, '1', val => {
        this.$jssdk.call('share', this.shareConfig);
      });
    },
    bindPopupTips () {
      this.popupTips = !this.popupTips;
    },
    linkPrize () {
      let link = `${window.location.protocol}//${window.location.host}/${
        config.merchantAppid
      }/merchant/index/order`;
      window.location.href = link;
    },
    // 领奖
    async bindExchangeAward (e) {
      this.$indicator.open('领取中');
      let rs = await this.$post('/gdjh/custom/exchangeAward', {
        num: e
      });
      this.$indicator.close();
      this.$toast(rs.message);
      if (rs.status == 200) {
        this.getInviteCount();
      }
    },
    // 转盘列表
    async loadLotteryChance () {
      let rs = await request.get('api/get_lottery_info/' + this.signActId);
      if (rs.status === 200) {
        this.chances = parseInt(rs.payload.chances);
      }
    },
    // 获取邀请人
    async getInviteCount () {
      let rs = await this.$get('/gdjh/custom/getInviteCount');
      this.inviteCount = rs.payload;
      this.$refs.progress.style.width = (100 / 25) * this.inviteCount + '%';
    },
    // async test() {
    //   let rs = await this.$post("/gdjh/custom/addAwardChance");
    //   if (rs.status === 200) {
    //     this.chances++;
    //   }
    //   console.log(rs);
    // },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      if (this.chances == 0) {
        this.buyChance();
        // this.test();
        return;
      }
      this.loading = true;
      let rs = await request.post('api/lottery_draw', {
        actId: this.signActId
      });
      if (rs.status === 200) {
        this.chances--;
        this.prize = rs.payload;
        setTimeout(() => {
          this.Popuprize = true;
        }, 2000);
        let standardId = rs.payload.standardId;
        // this. = rs.payload.orderCode;
        this.prizeList.forEach((item, ind) => {
          if (item.standardId === standardId) {
            this.currentPrize = item;
            this.rotating = true;
            this.$refs.myRotate.rotate(ind);
          }
        });
      } else {
        this.$toast(rs.error);
      }
      this.loading = false;
    },
    linkRanking () {
      this.$router.push('ranking');
    },
    rotateEnd () {
      this.rotating = false;
    },
    randomData (arr, num) {
      // 新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
      let tempArray = [];
      for (var index in arr) {
        tempArray.push(arr[index]);
      }
      // 取出的数值项,保存在此数组
      let returnArray = [];
      for (var i = 0; i < num; i++) {
        // 判断如果数组还有可以取出的元素,以防下标越界
        if (tempArray.length > 0) {
          // 在数组中产生一个随机索引
          var arrIndex = Math.floor(Math.random() * tempArray.length);
          // 将此随机索引的对应的数组元素值复制出来
          returnArray[i] = tempArray[arrIndex];
          // 然后删掉此索引的数组元素,这时候tempArray变为新的数组
          tempArray.splice(arrIndex, 1);
        } else {
          // 数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
          break;
        }
      }
      this.randomDatas = returnArray;
    },
    async buyChance () {
      this.$indicator.open();
      let rs = await request.post('api/buy_lottery', {
        actId: this.signActId,
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
            }${window.location.pathname}`;
            this.$toast('订单已生成...正在跳转支付');
            let payUrl = `${
              config.payUrl
            }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
            window.location.href = payUrl;
          }
        });
      } else {
        this.$toast(rs.error);
      }
      this.$indicator.close();
    },
    async loadActdetails () {
      let rs = await request.get('api/getActDetails/' + this.signActId);
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
    async getRecord () {
      let rs = await request.post('api/activity/custom/search/record/', {
        actId: this.signActId
      });
      let obj = JSON.parse(rs.payload);
      this.record = parseInt(obj.num);
    },
    async getListInvite () {
      let rs = await this.$get('/gdjh/custom/listInvite');
      this.inviteNum = rs.payload.length;
      for (var i = 0; i < 2; i++) {
        this.inviteList.push(rs.payload[i]);
      }
    }
  },
  mounted () {
    this.share();
    this.getInviteCount();
    this.loadLotteryChance();
    this.loadActdetails();
    this.getRecord();
    this.getListInvite();
    this.randomData(config.arr, 5);
  }
};
</script>

<style lang="scss">
@keyframes acScale {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}
.page {
  min-height: 100vh;
  background: url(./imgs/home-bg.jpg) no-repeat center top #958eef;
  background-size: 100%;
  padding-top: 3.07rem;
  padding-bottom: 0.4rem;
  .top-tips {
    width: 6.83rem;
    height: 1.22rem;
    background: url(./imgs/top-tips-bg.png) no-repeat center;
    background-size: 100%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 0.21rem;
    p {
      color: #fff;
      line-height: 0.4rem;
      padding-top: 0.1rem;
      font-size: 0.28rem;
      span {
        font-size: 0.36rem;
        font-family: "hzgb";
        color: #63f8ff;
        font-weight: bold;
      }
    }
  }
  .rotate {
    position: relative;
    padding-top: 0.1rem;
    .btns {
      z-index: 90;
      position: absolute;
      top: 0rem;
      display: flex;
      justify-content: space-between;
      width: 100%;
      img {
        width: 1.68rem;
      }
    }
    .rotate-tips {
      font-size: 0.26rem;
      color: #fff;
      text-align: center;
      margin-top: 0.26rem;
      span {
        font-size: 0.26rem;
        color: #fbcb42;
        padding: 0 0.1rem;
      }
    }
  }
  .progress-warp {
    width: 7.05rem;
    height: 1.35rem;
    background: url(./imgs/progress-bg.png) no-repeat center;
    background-size: 100%;
    margin: 0 auto;
    margin-top: 0.2rem;
    padding: 0 0.24rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    .name {
      font-size: 0.24rem;
      color: #5f48e7;
      background: url(./imgs/progress-icon.png) no-repeat left center;
      background-size: 0.25rem;
      padding-left: 0.34rem;
    }
    .progress-box {
      padding-top: 0.16rem;
      position: relative;
      height: 0.5rem;
      .progress {
        position: absolute;
        top: 0.16rem;
        height: 0.09rem;
        left: 0.1rem;
        width: 0;
        transition: all 0.3s;
        background-image: linear-gradient(#00fff0, #00fff0),
          linear-gradient(#ff4092, #ff4092);
        background-blend-mode: normal, normal;
        box-shadow: 0px 0.05rem 0.07rem 0px rgba(4, 0, 0, 0.23);
        border: solid 0.02rem #c471ff;
        border-radius: 0.09rem;
      }
      img {
        width: 100%;
      }
      .progress-icons {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        width: 100%;
        .icon {
          position: absolute;
          top: -0.26rem;
          display: flex;
          flex-direction: column;
          font-size: 0.24rem;
          color: #5f48e7;
          text-align: center;
          font-weight: bold;
          &.ac {
            img {
              animation: acScale 2s infinite;
            }
          }
          &:nth-child(1) {
            left: 19%;
          }
          &:nth-child(2) {
            left: 39%;
          }
          &:nth-child(3) {
            left: 79%;
          }
          img {
            width: 0.39rem;
          }
        }
      }
    }
    .info {
      font-size: 0.24rem;
      color: #5f48e7;
      background: url(./imgs/progress-icon.png) no-repeat left center;
      background-size: 0.25rem;
      padding-left: 0.34rem;
    }
  }

  .ranking {
    width: 2.72rem;
    height: 0.81rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    img {
      width: 100%;
    }
  }
  .table {
    width: 7.17rem;
    margin: 0 auto;
    border: 0.03rem solid #fff;
    border-radius: 0.06rem;
    margin-top: 0.46rem;
    .title {
      height: 0.64rem;
      line-height: 0.64rem;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
      border-bottom: 0.02rem solid #fff;
    }
    .th {
      height: 0.66rem;
      line-height: 0.66rem;
      display: flex;
      .item {
        font-size: 0.28rem;
        color: #fff;
        width: 25%;
        text-align: center;
      }
    }
  }
  .popup-warp {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.4);
    .popup-inner {
      width: 6.95rem;
      height: 9.94rem;
      background: url(./imgs/popup-bg.png) no-repeat center;
      background-size: 100%;
      position: absolute;
      left: 0;
      right: 0.2rem;
      top: 0;
      bottom: 0;
      margin: auto;
      padding-left: 0.4rem;
      .title {
        width: 1.6rem;
        margin: 0 auto;
        display: block;
        margin-top: 1.6rem;
      }
      p {
        height: 6rem;
        overflow: auto;
        font-size: 0.26rem;
        color: #222;
        line-height: 0.4rem;
        margin: 0 0.5rem;
        margin-top: 0.2rem;
      }
      .btn {
        margin: 0 auto;
        margin-top: 0.2rem;
        width: 2.78rem;
        img {
          width: 100%;
        }
      }
    }
  }
  .winning-popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .popup-inner {
    padding-left: 0.3rem;
    position: absolute;
    top: 0;
    bottom: 1rem;
    left: 0;
    right: 0.2rem;
    margin: auto;
    width: 6.95rem;
    height: 5.79rem;
    background: url(./imgs/winning-popup.png) no-repeat center;
    background-size: 100%;
    .title {
      width: 3.05rem;
      display: block;
      margin: 0 auto;
      margin-top: 1.5rem;
    }
    .name {
      font-size: 0.4rem;
      color: #f93636;
      text-align: center;
      font-weight: bold;
      margin-top: 0.3rem;
    }
    .pic {
      width: 0.9rem;
      margin-top: 0.3rem;
      margin: 0 auto;
      display: block;
    }
    .btn {
      width: 2.78rem;
      display: block;
      margin: 0 auto;
      margin-top: 0.2rem;
    }
  }
  .invitation {
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    &-title {
      font-size: 0.24rem;
      height: 0.44rem;
      line-height: 0.44rem;
      color: #333;
      padding: 0 0.23rem;
      background-color: #fff;
      box-shadow: 0px 0.03rem 0.07rem 0px rgba(111, 21, 137, 0.35);
      border-radius: 0.05rem;
      margin-left: 0.24rem;
      margin-top: 0.4rem;
      display: inline-block;
    }
    .list {
      width: 6.5rem;
      margin: 0 auto;
      margin-top: 0.24rem;
      .item {
        height: 1.31rem;
        margin-bottom: 0.3rem;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 0px 0.08rem 0.01rem 0rem rgba(111, 21, 137, 0.21);
        border-radius: 0.1rem;
        box-sizing: border-box;
        padding: 0 0.2rem;
        .pic {
          width: 1.01rem;
          height: 1.01rem;
          border-radius: 50%;
          overflow: hidden;
          background-color: red;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          margin-left: 0.33rem;
          .name {
            font-size: 0.28rem;
            color: #333;
          }
          .tips {
            font-size: 0.24rem;
            color: #333;
            margin: 0.04rem 0 0.06rem;
          }
          .time {
            font-size: 0.22rem;
            color: #aaaaaa;
          }
        }
      }
    }
  }
}
</style>
