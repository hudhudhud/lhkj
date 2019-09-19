<template>
  <div class="page">
    <router-link to="newCardInfo" class="tips-btn"><img src="./imgs/tips-btn.png" alt=""></router-link>
    <div class="notice">
      <div class="inner">
        <div class="swiper-container swiper-no-swiping">
          <div class="swiper-wrapper">
            <div class="swiper-slide">江*完成办卡任务获得300金币</div>
            <div class="swiper-slide">杨**完成推荐任务获得5金币</div>
            <div class="swiper-slide">张**完成推荐任务获得5金币</div>
            <div class="swiper-slide">裘**完成推荐任务获得5金币</div>
            <div class="swiper-slide">常**完成办卡任务获得300金币</div>
            <div class="swiper-slide">于*完成推荐任务获得5金币</div>
            <div class="swiper-slide">李**完成推荐任务获得5金币</div>
            <div class="swiper-slide">曹**完成办卡任务获得300金币</div>
            <div class="swiper-slide">王**完成推荐任务获得5金币</div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-info">
      <div class="left">
        <div class="user-pic">
          <div class="pic">
            <img :src="headImgUrl" alt="">
          </div>
        </div>
        <div class="user-level">等级:<span>{{rankName}}</span></div>
      </div>
      <div class="right">
        <div class="row">
          <div class="row-title">用 户</div><span>：</span>
          <div class="row-cont">{{nickname}}</div>
        </div>
        <div class="row">
          <div class="row-title">剩余金币</div><span>：</span>
          <div class="row-cont">{{useableCredit}}</div>
        </div>
        <div class="row">
          <div class="row-title">邀请人数</div><span>：</span>
          <div class="row-cont">{{count}}</div>
        </div>
        <div class="btns">
          <router-link class="btn btn-card" to="getCard"></router-link>
          <router-link class="btn btn-tj" to="qrcode"></router-link>
        </div>
      </div>
    </div>
    <div class="tips-text">本活动仅限深圳中行信用卡客户参加</div>
    <div class="nav-icon">
      <div class="item" @click="linkQd">
        <div class="icon">
          <img src="./imgs/home-icon1.png" alt="">
        </div>
        <span>打卡签到</span>
      </div>
      <div class="item" @click="linkShop">
        <div class="icon">
          <img src="./imgs/home-icon2.png" alt="">
        </div>
        <span>金币商城</span>
      </div>
      <div class="item" @click="linkJbkc">
        <div class="icon">
          <img src="./imgs/home-icon3.png" alt="">
        </div>
        <span>金币库存</span>
      </div>
      <router-link class="item" to="partner">
        <div class="icon">
          <img src="./imgs/home-icon4.png" alt="">
        </div>
        <span>邀请明细</span>
      </router-link>
      <router-link class="item" to="ranking">
        <div class="icon">
          <img src="./imgs/home-icon5.png" alt="">
        </div>
        <span>排行榜</span>
      </router-link>
    </div>
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <router-link to="newCardInfo"><img src="./imgs/banner4.jpg" alt=""></router-link>
        </mt-swipe-item>
        <mt-swipe-item><a href="https://mp.weixin.qq.com/s/b8iY0RLYUJ1lVTInWpAIdQ"><img src="./imgs/banner1.png" alt=""></a></mt-swipe-item>
        <mt-swipe-item><a href="https://mp.weixin.qq.com/s/b_1FOkInE62nn-wiKsY50w"><img src="./imgs/banner2.png" alt=""></a></mt-swipe-item>
        <mt-swipe-item><a href="https://mp.weixin.qq.com/s/cXd3ZoiWDfrNf3l5SgqTQA"><img src="./imgs/banner3.png" alt=""></a></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="nav-sticker">
      <div class="item" @click="gotozjd">
        <img src="./imgs/zjd-pic.png" alt="">
      </div>
      <div class="item" @click="gotocardtip">
        <img src="./imgs/nav-sticker2.png" alt="">
      </div>
      <div class="item" @click="todo">
        <img src="./imgs/jqqd.png" alt="">
      </div>
    </div>
    <div class="task">
      <div class="bd">
        做任务，赚金币
        <!-- <div class="left" @click="taskClick(1)">
          <img v-show="isTask=='tab1'" src="./imgs/task-left-ac.png" alt="">
          <img v-show="isTask=='tab2'" src="./imgs/task-left.png" alt="">
        </div> -->
        <!-- <div class="right" @click="taskClick(2)">
          <img v-show="isTask=='tab2'" src="./imgs/task-right-ac.png" alt="">
          <img v-show="isTask=='tab1'" src="./imgs/task-right.png" alt="">
        </div> -->
      </div>
      <div class="hd">
        <mt-tab-container v-model="isTask" :swipeable="true">
          <mt-tab-container-item id="tab1">
            <div class="item">
              <img src="./imgs/hd-icon1.png" alt="">
              <div class="text">
                <div class="title">邀请好友加入</div>
                <div class="tips">好友注册奖励5金币</div>
              </div>
              <router-link class="btn" to="qrcode">去完成</router-link>
            </div>
            <div class="item">
              <img src="./imgs/hd-icon1.png" alt="">
              <div class="text">
                <div class="title">申办中行信用卡</div>
                <div class="tips">新客户成功办卡奖励200金币<br>每周更新数据</div>
              </div>
              <router-link class="btn" to="getCard">去完成</router-link>
            </div>
            <div class="item">
              <img src="./imgs/hd-icon2.png" alt="">
              <div class="text">
                <div class="title">推荐好友办卡</div>
                <div class="tips">新客户成功办卡奖励200金币<br>每周更新数据</div>
              </div>
              <div class="btn" @click="bindTips">去完成</div>
            </div>
            <div class="item">
              <img src="./imgs/hd-icon2.png" alt="">
              <div class="text">
                <div class="title">微信、支付宝绑卡并消费100元以上</div>
                <div class="tips">新客户完成绑卡消费奖励200金币，每月更新数据</div>
              </div>
              <router-link class="btn" to="bindCard">去完成</router-link>
            </div>
          </mt-tab-container-item>
          <!-- <mt-tab-container-item id="tab2">
            <div class="item center" v-if="invitedList.length <= 0">您还没有推荐的好友，马上去推荐赚金币吧！</div>
            <div v-else>
              <div class="item" v-for="(item, index) in invitedList" :key="index">
                <img src="./imgs/hd-icon3.png" alt="">
                <div class="text">
                  <div class="title">推荐的{{item.name}}办卡进度</div>
                  <div class="tips">
                    <span :class="item.applyCard == 'Y'?'ac':''">办卡完成</span>
                    <span :class="item.activateCard == 'Y'?'ac':''">—激活完成</span>
                    <span :class="item.bindCard == 'Y'?'ac':''">—绑卡完成</span>
                  </div>
                </div>
                <div class="btn" @click="bindTips">去提醒</div>
              </div>
            </div>
            <div class="item ac">
              <img src="./imgs/hd-icon3.png" alt="">
              <div class="text">
                <div class="title">推荐的12345678办卡进度</div>
                <div class="tips">
                  <span class="ac">办卡完成</span>
                  <span>—激活完成</span>
                  <span>—绑卡完成</span>
                </div>
              </div>
              <div class="btn">去提醒</div>
            </div>
          </mt-tab-container-item> -->
        </mt-tab-container>
      </div>
    </div>
    <div class="model" v-if="isTips" @click="tipshide">
      <img src="./imgs/home-tips.png" alt="">
    </div>
    <div class="popup" v-if="isPopup">
      <div class="inner">
        <img class="pic" src="./imgs/popup.png" />
        <router-link to="newCardInfo" class="link"></router-link>
        <img class="btn" @click="bindisPopup" src="./imgs/popup-btn.png" />
      </div>
    </div>
  </div>
</template>
<script>
import jssdk from '@/lib/jssdk';
import config from '../config/index';
import Swiper from 'swiper';
export default {
  data () {
    return {
      merchantId: config.merchantId,
      isPopup: false,
      mySwiper: null,
      isTask: 'tab1',
      isTips: false,
      headImgUrl: null, // 用户头像
      nickname: null, // 用户姓名
      useableCredit: 0, // 用户积分
      count: 0, // 邀请人数
      invitedList: [],
      rankName: '',
      rankList: [
        '纯真小学生',
        '青春中学生',
        '睿智高中生',
        '科研大学生',
        '智慧研究生'
      ]
    };
  },
  methods: {
    taskClick (e) {
      this.isTask = 'tab' + e;
    },
    tipshide () {
      this.isTips = false;
    },
    bindisPopup () {
      this.isPopup = false;
    },
    // 剩余积分
    async getTotalCredit () {
      let rs = await this.$post('/user_credit/get', {
        customId: this.$store.state.cust.id
      });
      if (rs.status == 200) {
        this.useableCredit = rs.payload.useableCredit || 0;
        let accumulatedCredit = rs.payload.accumulatedCredit || 0;
        let i = parseInt(accumulatedCredit / 1000);
        i = i >= this.rankList.length ? this.rankList.length - 1 : i;
        this.rankName = this.rankList[i];
      } else {
        this.$toast(rs.error);
      }
    },
    // 获取头像
    getheadImgUrl () {
      this.headImgUrl = this.$store.state.cust.headImgUrl;
      this.nickname = this.$store.state.cust.nickname;
    },
    async getinfo () {
      let rs = await this.$post('/new_partner/countBoundUser', {});
      if (rs.status == 200) {
        this.count = rs.payload.count;
      } else {
        this.$toast(rs.error);
      }
    },
    linkQd () {
      window.location.href =
        window.location.origin +
        `/${this.$store.state.merchantAppid}/merchant/index/act/${
          config.signActId
        }`;
    },
    linkShop () {
      window.location.href =
        window.location.origin +
        `/${this.$store.state.merchantAppid}/merchant/`;
    },
    linkJbkc () {
      window.location.href =
        window.location.origin +
        `/${this.$store.state.merchantAppid}/merchant/bocsz/credit`;
    },
    bindTips () {
      this.isTips = true;
    },
    async gotocardtip () {
      this.$router.push('carKnowledge'); // 去用卡小知识
    },
    gotozjd () {
      window.location.href =
        window.location.origin +
        `/${
          this.$store.state.merchantAppid
        }/merchant/homeSzzhzjd?actId=563353803`;
    },
    todo () {
      this.$toast('敬请期待');
    },
    async loadData () {
      let rs = await this.$post('/new_partner/listBoundUser', {
        apply_card: '',
        activate_card: '',
        bind_card: ''
      });
      if (rs.status == 200) {
        this.invitedList = rs.payload;
      } else {
        this.$toast(rs.error);
      }
    }
  },
  mounted () {
    this.mySwiper = new Swiper('.swiper-container', {
      autoplay: true, // 可选选项，自动滑动
      direction: 'vertical',
      loop: true
    });
  },
  created () {
    this.getTotalCredit();
    this.getheadImgUrl();
    this.getinfo();
    this.loadData();
    let link =
      `${window.location.protocol}//${
        window.location.host
      }/partner/szzh/home?share=` + this.$store.state.cust.id;
    this.shareConfig = {
      title: '深圳中行信用卡合伙人', // 分享标题
      desc: '玩转合伙人，大奖随心领', // 分享描述
      link: link, // 分享，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `https://static.lianhaikeji.com/images/20190711/ab2e3535c8cb4d978e44446681e94d78.png` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
    });
    let isPopup = sessionStorage.getItem('isPopup');
    if (isPopup == null) {
      this.isPopup = true;
      sessionStorage.setItem('isPopup', '0');
    } else {
      this.isPopup = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #b7ecfe url(./imgs/home-bg.jpg) no-repeat center top;
  background-size: 100%;
  padding-top: 2.52rem;
  box-sizing: border-box;
  padding-bottom: 0.1rem;
  .tips-btn {
    position: absolute;
    top: 0.2rem;
    right: 0;
    img {
      width: 1.61rem;
    }
  }
  .tips-text {
    text-align: center;
    padding-top: 0.2rem;
  }
  .popup {
    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      width: 6.2rem;
      position: relative;
      .link {
        display: block;
        position: absolute;
        bottom: 0.7rem;
        left: 0;
        right: 0;
        margin: auto;
        background: url(./imgs/popup-link.png) no-repeat center;
        width: 3rem;
        height: 0.69rem;
        background-size: 100%;
      }
      .pic {
        width: 100%;
      }
      .btn {
        position: absolute;
        right: -0.31rem;
        top: -0.31rem;
        width: 0.62rem;
        height: 0.62rem;
      }
    }
  }
  .notice {
    overflow: hidden;
    height: 0.7rem;
    width: 5.8rem;
    background: url(./imgs/home-notice-bg.png) no-repeat center top;
    background-size: 100%;
    margin: 0 auto;
    line-height: 0.7rem;
    .inner {
      padding-left: 1rem;
      font-size: 0.28rem;
      color: #333;
    }
    .swiper-container {
      height: 0.7rem;
    }
  }
  .user-info {
    margin-top: 0.1rem;
    height: 3.68rem;
    width: 7.13rem;
    background: url(./imgs/home-header.png) no-repeat center top;
    background-size: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 0.9rem;
    padding-left: 0.3rem;
    display: flex;
    .left {
      width: 1.76rem;
      text-align: center;
      .user-pic {
        width: 1.75rem;
        height: 1.75rem;
        background: url(./imgs/home-user-pic.png) no-repeat center top;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .pic {
          width: 1.52rem;
          height: 1.52rem;
          background-color: #333;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .user-level {
        margin-left: -0.1rem;
        margin-top: 0.3rem;
        font-size: 0.26rem;
        color: #72c3e1;
        span {
          font-size: 0.24rem;
          color: #f24c52;
        }
      }
    }
    .right {
      margin-top: 0.05rem;
      margin-left: 0.15rem;
      .row {
        margin-bottom: 0.2rem;
        display: flex;
        height: 0.4rem;
        align-items: center;
        span {
          font-size: 0.28rem;
          color: #72c3e1;
        }
        .row-title {
          font-size: 0.28rem;
          color: #72c3e1;
          width: 1.3rem;
          text-align-last: justify;
          text-align: justify;
        }
        .row-cont {
          font-size: 0.4rem;
          color: #2fbef3;
        }
      }
      .btns {
        display: flex;
        margin-top: 0.2rem;
        .btn {
          width: 2.01rem;
          height: 0.69rem;
          background-size: 100% !important;
        }
        .btn-card {
          margin-right: 0.2rem;
          background: url(./imgs/home-header-card.png) no-repeat center;
        }
        .btn-tj {
          background: url(./imgs/home-header-tj.png) no-repeat center;
        }
      }
    }
  }
  .nav-icon {
    display: flex;
    justify-content: space-between;
    width: 7rem;
    height: 1.45rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    .item {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 0.98rem;
        img {
          width: 100%;
        }
      }
      span {
        margin-top: 0.1rem;
        font-size: 0.26rem;
        color: #222;
      }
    }
  }
  .banner {
    width: 7.11rem;
    height: 2.54rem;
    margin: auto;
    margin-top: 0.5rem;
    img {
      width: 100%;
    }
  }
  .nav-sticker {
    width: 6.94rem;
    margin: 0 auto;
    margin-top: 0.4rem;
    height: 2.64rem;
    display: flex;
    justify-content: space-between;
    .item {
      width: 2.2rem;
      img {
        width: 100%;
        float: left;
      }
    }
  }
  .task {
    margin: 0 auto;
    margin-top: 0.5rem;
    .bd {
      width: 4.2rem;
      margin: 0 auto;
      height: 0.72rem;
      line-height: 0.72rem;
      text-align: center;
      // display: flex;
      background-color: #f19091;
      box-shadow: 0px 0.04rem 0px 0px rgba(193, 63, 64, 0.91);
      border-radius: 0.34rem;
      border: solid 1px #f19091;
      font-size: 0.3rem;
      color: #ffffff;
      font-weight: bold;
      img {
        height: 0.72rem;
        float: left;
      }
    }
    .hd {
      margin-top: 0.34rem;
      .item {
        margin: 0 auto;
        margin-bottom: 0.2rem;
        width: 7.1rem;
        background-color: rgba(255, 255, 255, 0.69);
        box-shadow: 0px 0.04rem 0px 0px rgba(44, 140, 255, 0.4);
        border-radius: 20px;
        // background: url(./imgs/task-hd-item-bg.png) no-repeat center;
        background-size: 100%;
        box-sizing: border-box;
        padding: 0.3rem 0.2rem 0.34rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.center {
          justify-content: center;
        }
        &.ac {
          .btn {
            background-color: #a6a6a6;
          }
        }
        img {
          width: 1rem;
          height: 1.04rem;
        }
        .text {
          margin-left: 0.14rem;
          width: 3.8rem;
          .title {
            margin-bottom: 0.2rem;
            font-size: 0.32rem;
            color: #333;
          }
          .tips {
            font-size: 0.26rem;
            color: #333;
            span {
              color: #999;
              &.ac {
                color: #333;
              }
            }
          }
        }
        .btn {
          width: 1.7rem;
          height: 0.58rem;
          line-height: 0.58rem;
          background-color: #e22319;
          border-radius: 0.29rem;
          font-size: 0.3rem;
          color: #fdfeff;
          text-align: center;
        }
      }
    }
  }
  .model {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    img {
      width: 2.96rem;
      height: 1.6rem;
      float: right;
      margin-right: 0.16rem;
      margin-top: 0.16rem;
    }
  }
}
</style>
