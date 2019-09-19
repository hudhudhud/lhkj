<template>
  <!--员工页-->
  <div>
    <div class="main">
      <div class="rules" @click="rulesShow = true">活动规则
        <!-- <img src="./imgs/rules.png" alt> -->
      </div>
      <div class="main-head">

        <img src="./imgs/infoboard.png" alt>
        <!-- lobby入口111 -->
        <div class="lobby_entry">
          <img src="./imgs/intoLobby.png" alt @click="getLobbyJwt">
        </div>
        <div class="touxiang">
          <!-- <img src="./imgs/staffpic.png" alt> -->
          <img :src="headImgUrl" alt>
        </div>
        <div class="qrcodepic" @click="gotoqrcode">
          <img class="left" src="./imgs/left.png" alt>
          <img class="code" src="./imgs/qrcode.png" alt>
        </div>
        <div class="signpic" @click="gotoSign">
          <img class="code" src="./imgs/sign.png" alt>
          <img class="right" src="./imgs/right.png" alt>
        </div>
        <div class="main-info">
          <div class="level">
            <p>{{nickname}}</p>
          </div>
          <div class="info">
            <div class="info-item" @click="getCount">
              <div class="num">{{count}}</div>
              <div class="info-title">邀请人数</div>
            </div>
            <div class="info-item" @click="getCount">
              <div class="num">{{applicationCount}}</div>
              <div class="info-title">办卡人数</div>
            </div>
            <div class="info-item" v-if="rank > 0">
              <div class="num">{{rank}}</div>
              <div class="info-title">个人排名</div>
            </div>
            <div class="info-item" v-else>
              <div class="no-ranking">暂无排名</div>
              <div class="info-title">个人排名</div>
            </div>
          </div>
        </div>
        <div class="recommend">
          <div class="carhandle-item" @click="gotocarget">我要办卡
          </div>
          <div class="recommend-item" @click="gotoqrcode">我要推荐
          </div>
        </div>
      </div>
      <div class="main-tab">
        <div class="tab-item">
          <a
            :href="`${protocol}//${host}/${$store.state.merchantAppid}/merchant/lego/a4c7c910c189427cb06269b1006c8b51?buy=0`">
            <img class="top-pic" src="./imgs/mall.png" alt>
            <img class="top-bottom" src="./imgs/mallword.png" alt>
          </a>
        </div>
        <div class="tab-item" @click="gotoranklist">
          <img class="top-pic" src="./imgs/ranking.png" alt>
          <img class="top-bottom" src="./imgs/rankingword.png" alt>
        </div>
        <div class="tab-item">
          <a
            href="https://mp.weixin.qq.com/mp/homepage?__biz=MjM5NjQyNjc2MA==&hid=12&sn=c7343009f76dfb8798b79e204c6808fc">
            <img class="top-pic" src="./imgs/car.png" alt>
            <img class="top-bottom" src="./imgs/carword.png" alt>
          </a>
        </div>
      </div>
      <div class="swipe-wrapper">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <a href="https://mp.weixin.qq.com/s/fo4YUwGbDM1QIplVO4xHGw">
              <img src="./imgs/banner1.png" alt>
            </a>
          </mt-swipe-item>
          <mt-swipe-item>
            <a href="https://mp.weixin.qq.com/s/foxpfW8WHR4tBuaGZCCGzA">
              <img src="./imgs/banner2.jpg" alt>
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="product">
        <div class="product-item">
          <a
            href="https://mp.weixin.qq.com/mp/homepage?__biz=MjM5NjQyNjc2MA==&hid=5&sn=97eed6e9dc1bc9deaae7c24b50f93f58&scene=18">
            <img src="./imgs/mbz.png" alt>
          </a>
        </div>
        <div class="product-item" @click="gotocardtip">
          <img src="./imgs/product1.png" alt>
        </div>
      </div>
      <div class="product">
        <a
          href="https://mp.weixin.qq.com/mp/homepage?__biz=MjM5NjQyNjc2MA==&hid=20&sn=74f7f0a3c3363a7f30300c96d5fa80d0&scene=18">
          <img src="./imgs/product3.png" alt="">
        </a>
      </div>
      <div class="feedback" @click="goFeedback"></div>
    </div>
    <div class="mask" v-show="rulesShow" @click="rulesShow = false">
      <div class="bg">
        <h3>积分获取规则</h3>
        <p>
          1、
          <span>注册积分:</span>新用户完成合伙人平台注册，即可获赠50积分；
        </p>
        <p>
          2、
          <span>分享积分:</span>用户分享个人二维码至微信平台或好友，有好友注册则分享者即可获得积分，首次获赠50积分，后续每次有好友在平台注册即可获得5积分，累计最高获得分享积分300分；
        </p>
        <p>
          3、
          <span>推荐积分:</span>每推荐一名新用户成功办卡，推荐人即可获赠500积分；
        </p>
        <p>
          4、
          <span>签到积分:</span>用户签到获积分，连续签到一天获赠1积分，连续签到两天获赠2积分，以此类推，签到每日最多可获7积分，断签后需重新从第一天开始签到；
        </p>
        <p>
          5、
          <span>游戏积分:</span>后期将上线玩游戏赢积分、积分超值兑等活动模块，敬请期待；
        </p>
        <h3>积分使用规则</h3>
        <p>
          积分可用于积分商城礼品兑换，
          <span>1积分等值于0.1元面值礼品</span>，每人次在活动期间可兑换积分累积
          <span>不超过3000积分</span>，我行将在积分到期前提醒客户。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import jssdk from '@/lib/jssdk';
import config from '../config';
export default {
  data () {
    return {
      lobbyJwt: null,
      applicationCount: '',
      count: '',
      host: window.location.host,
      protocol: window.location.protocol,
      rank: '',
      ranklist: [],
      rulesShow: false,
      headImgUrl: '',
      nickname: '',
      custType: '',
      merchantId: config.merchantId
    };
  },
  methods: {
    async getLobbyJwt () {
      let rs = await this.$get('/new_partner/getJwtFromLobby/522e9eaa');
      if (rs.status == 200) {
        this.lobbyJwt = rs.payload;
        sessionStorage.setItem('522e9eaa_token', this.lobbyJwt);
        window.location.href = `//${window.location.host}/ttyl/522e9eaa/home`;
      } else {
        Toast(rs.error);
      }
    },
    goJFSC () {
      Toast('员工不可以进行积分兑换哦！');
    },
    goFeedback () {
      this.$router.push('feedback'); // 去用户反馈页
    },
    gotocarget () {
      this.$router.push('carget'); // 去办卡
    },
    async getinfo () {
      let rs = await this.$post('/binding/count');
      if (rs.status == 200) {
        this.applicationCount = rs.payload.applicationCount;
        this.count = rs.payload.count;
      } else {
        Toast(rs.error);
      }
    },
    async getrank () {
      let rs = await this.$post('/binding/staffRank');
      if (rs.status == 200) {
        this.rank = rs.payload;
      } else {
        Toast(rs.error);
      }
    },
    async gotoranklist () {
      this.$router.push({
        name: 'rankinglist',
        params: {
          key: 1
        }
      });
    },
    gotoSign () {
      this.$router.push('staffsign'); //
    },
    async gotocardtip () {
      this.$router.push('cardnotice'); // 登陆换路由
    },
    async gotoqrcode () {
      window.location.href = `//${window.location.host}/partner/shzh/share/${this.$store.state.cust.id}?set=1`;
    },
    getCount () {
      this.$router.push('carinfo'); // 去办卡页面
    },
    // 获取头像
    getheadImgUrl () {
      this.headImgUrl = this.$store.state.cust.headImgUrl;
      this.nickname = this.$store.state.cust.nickname;
    },
    async getCustType () {
      let rs = await this.$post('/custom/get/customType');
      console.log('角色', rs.payload);
      if (rs.payload == 2) {
        window.location.replace(
          `${window.location.protocol}//${window.location.host}/partner/shzh/hometwo`
        );
      }
    }
  },
  async created () {
    Indicator.open();
    await this.getCustType();
    await this.getinfo();
    await this.getheadImgUrl();
    await this.getrank();
    this.$store.commit('setIsReady', false);
    let link = window.location.href;
    if (link.indexOf('code=') > 0) {
      link = link.replace(/code=[^=]*/g, '');
    }
    this.shareConfig = {
      title: '中国银行上海市分行青春合伙人', // 分享标题
      desc: '加入青春计划，成就最强合伙人！', // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `https://static.lianhaikeji.com/images/20190114/f6b071e305cf4f9d8c47782b22302235.jpeg` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
    });
    Indicator.close();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.feedback {
  width: 5.23rem;
  height: 1.66rem;
  margin: 0.44rem auto 0 auto;
  background: url("./imgs/feedback_btn.png") no-repeat;
  background-size: 100% 100%;
}
.main {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  background: #eff0f1;
  overflow-y: auto;
  background: url("./imgs/bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.92rem 0 1.44rem 0;
  .rules {
    position: absolute;
    top: 0.6rem;
    right: 0;
    width: 1.84rem;
    height: 0.68rem;
    background-color: #fff;
    text-align: center;
    line-height: 0.68rem;
    border-radius: 20rem 0 0 20rem;
    font-family: "simhei";
    color: #3db7e0;
    font-weight: bold;
    // img {
    //   width: 100%;
    // }
  }
  .main-head {
    position: relative;
    width: 7.36rem;
    height: 6.6rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
    .lobby_entry {
      position: absolute;
      top: 0rem;
      left: 0rem;
      width: 1.84rem;
      height: 1.84rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .touxiang {
      position: absolute;
      top: 0.2rem;
      left: 2.3rem;
      width: 2.84rem;
      height: 2.84rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .qrcodepic {
      position: absolute;
      top: 1.9rem;
      left: 0.7rem;
      width: 1.5rem;
      height: 0.71rem;
      .code {
        width: 1rem;
      }
      .left {
        width: 0.15rem;
        margin-right: 0.16rem;
        vertical-align: 0.25rem;
      }
    }
    .signpic {
      position: absolute;
      top: 1.9rem;
      right: 0.5rem;
      width: 1.5rem;
      height: 0.71rem;
      padding-top: 0.2rem;
      .code {
        width: 0.67rem;
      }
      .right {
        width: 0.15rem;
        margin-left: 0.16rem;
        vertical-align: top;
      }
    }
    .main-info {
      position: absolute;
      bottom: 0.9rem;
      left: 0rem;
      width: 100%;
      height: 2.6rem;
      display: flex;
      flex-direction: column;
      padding: 0.4rem 0.99rem 0.54rem 0.99rem;
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .nonum {
            color: rgb(120, 198, 126);
            font-size: 0.3rem;
            margin: 0 0 0.55rem 0;
          }
          .num {
            color: rgb(120, 198, 126);
            font-size: 0.54rem;
            margin-bottom: 0.28rem;
            text-align: center;
            font-family: "HelveticaNeueLTStd-Md";
          }
          .no-ranking {
            color: rgb(120, 198, 126);
            font-size: 0.34rem;
            margin-bottom: 0.48rem;
            font-family: "simhei";
          }
          .info-title {
            color: rgb(123, 198, 126);
            font-size: 0.26rem;
            font-family: "simhei";
          }
        }
      }
      .level {
        margin-bottom: 0.1rem;
        text-align: center;
        font-size: 0.26rem;
        color: rgb(120, 198, 126);
        font-family: "simhei";
      }
    }
    .recommend {
      position: absolute;
      left: 0.35rem;
      bottom: 0.3rem;
      width: 6.9rem;
      height: 0.94rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      .recommend-item {
        width: 2.5rem;
        height: 0.69rem;
        background: url("./imgs/recommend.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.69rem;
        font-family: "youyuan";
        color: #fff;
        font-size: 0.32rem;
      }
      .carhandle-item {
        width: 2.5rem;
        height: 0.69rem;
        background: url("./imgs/carhandle.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.69rem;
        font-family: "youyuan";
        color: #fff;
        font-size: 0.32rem;
      }
    }
  }
  .main-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0.2rem 0.2rem 0 0.2rem;
    border-bottom: 1px solid white;
    padding-bottom: 0.34rem;
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 1.14rem;
      height: 1.44rem;
      .top-pic {
        display: block;
        margin: 0 auto 0.2rem;
        width: 0.96rem;
      }
      .top-bottom {
        width: 1.14rem;
      }
      .cartop-bottom {
        width: 0.84rem;
      }
    }
  }
  .swipe-wrapper {
    width: 6.9rem;
    height: 2.5rem;
    margin: 0.2rem auto 0.34rem;
    img {
      width: 100%;
    }
  }
  .product {
    display: flex;
    width: 6.9rem;
    height: 2rem;
    margin: 0 auto;
    margin-bottom: 0.36rem;
    > a {
      display: block;
      > img {
        width: 100%;
      }
    }
    .product-item {
      width: 3.46rem;
      height: 2rem;
      img {
        width: 100%;
      }
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.96rem;
    background-color: #fff;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 0.96rem;
      img {
        width: 0.42rem;
        vertical-align: bottom;
        margin-right: 0.3rem;
      }
      span {
        font-size: 0.3rem;
        color: rgb(51, 51, 51);
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        right: 50%;
        top: 50%;
        width: 1px; /*no*/
        height: 0.6rem;
        background: #e8e8e8;
        transform: translateY(-50%);
      }
      &:last-child:after {
        display: none;
      }
    }
  }
}
.mask {
  font-family: "simhei";
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  overflow-y: scroll;
  .bg {
    width: 6.78rem;
    height: 11.18rem;
    background: url("./imgs/popup.png") no-repeat;
    background-size: 100% 100%;
    margin: 1.8rem auto;
    padding: 0.3rem 0.7rem 0 0.5rem;
    h3 {
      text-align: center;
      margin-bottom: 0.44rem;
      color: rgb(128, 175, 100);
      margin-top: 0.42rem;
    }
    p {
      color: rgb(51, 51, 51);
      line-height: 0.4rem;
    }
    span {
      color: rgb(128, 175, 100);
    }
  }
}
.mqj {
  position: absolute;
  z-index: 520;
  top: 0.3rem;
  left: 0.3rem;
  width: 2.24rem;
  height: 2.07rem;
  background: url("./imgs/520.png") no-repeat;
  background-size: 100% 100%;
}
</style>
