<template>
  <div>
    <div class="bg"></div>
    <div class="main">
      <div class="hdgz" @click="rulesShow = true"></div>
      <div class="main-info">
        <div class="touxiang">
          <img :src="headImgUrl" alt>
        </div>
        <div class="info">
          <div class="info-item" @click="$router.push('bindList')">
            <div class="num">{{count}}</div>
            <div class="info-title">邀请人数</div>
          </div>
          <div class="info-item" @click="$router.push('bindList')">
            <div class="num">{{applicationCount}}</div>
            <div class="info-title">办卡人数</div>
          </div>
          <div class="info-item">
            <div class="num">{{useableCredit}}</div>
            <div class="info-title">剩余积分</div>
          </div>
        </div>
      </div>
      <div class="button-list">
        <div class="button-item" @click="wybk">
          <img src="./imgs/wybk.png" />
          <p>我要办卡</p>
        </div>
        <div class="button-item" @click="$router.push('ewm')">
          <img src="./imgs/wytj.png" />
          <p>我要推荐</p>
        </div>
        <div class="button-item" @click="jfsc">
          <img src="./imgs/jfsc.png" />
          <p>积分商城</p>
        </div>
        <div class="button-item" @click="$router.push('ranking')">
          <img src="./imgs/wdpm.png" />
          <p>我的排名</p>
        </div>
        <div class="button-item" @click="kqy">
          <img src="./imgs/kqy.png" />
          <p>卡权益</p>
        </div>
      </div>
      <div class="banner">
        <img src="./imgs/jkBanner.png" />
      </div>
    </div>
    <div class="mask" v-show="rulesShow" @click="rulesShow = false">
      <div class="bg">
        <h3>活动规则</h3>
        <div class="body">
          <p>
            <span>活动时间:</span>即日起至2019年9月30日。
          </p>
          <p>
            <span>活动对象:</span>限苏州地区客户（苏州建行员工不可参加）。
          </p>
          <p>
            <span>参与方式:</span>点击“我要推荐”，生成您的活动专属二维码，保存并发送二维码给好友即可参加活动。
          </p>
          <p>
            <span>积分奖励:</span><br>
            1.好友通过扫描您专属二维码，申请成为龙卡信用卡新增客户（仅限之前未持有过我行信用卡客户），
            并在核卡后一个月内完成首刷（金额不限），每新增一个达标客户您可获50积分！<br>
            2.单月推荐达标客户数≥3户，可获得额外奖励100积分；单月推荐达标客户数≥5户，可获得额外奖励200积分。<br>
            3.活动奖励按月发放，每个客户每月最多可获得2000积分 ；
          </p>
          <p>
            <span>其他说明:</span><br>
            1.如用户存在或有涉嫌违法违规行为的，中国建设银行苏州分行将撤销您活动参与资格，
            并有权回收您已经获得的积分（包括积分及已兑换的商城商品）等通过该活动获得的利益。<br>
            2.本活动规则由中国建设银行苏州分行负责制定、修改与解释。其他未尽事宜，最终解释权归中国建设银行苏州分行所有。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      rulesShow: false,
      count: 0,
      applicationCount: 0,
      useableCredit: 0,
      headImgUrl: '',
      nickname: ''
    };
  },
  methods: {
    jfsc () {
      window.location.href =
        window.location.origin +
        `/${this.$store.state.merchantAppid}/merchant/`;
    },
    kqy () {
      window.location.href =
        'http://m.ccb.com/cn/creditcard/mobilev3/cards/product_list.html?Rcmd_insID=W00000001 ';
    },
    wybk () {
      window.location.href = `//${
        window.location.host
      }/platform/ccb_sz/index.html#/card`;
    },
    // 剩余积分
    async getTotalCredit () {
      let rs = await this.$post('/user_credit/get', {
        customId: this.$store.state.cust.id
      });
      if (rs.status == 200) {
        this.useableCredit = rs.payload.useableCredit
          ? rs.payload.useableCredit
          : 0;
      } else {
        Toast(rs.error);
      }
    },
    // 获取头像
    getheadImgUrl () {
      if (
        this.$store.state.cust.headImgUrl == null ||
        this.$store.state.cust.headImgUrl == ''
      ) {
        this.headImgUrl = '//static.lianhaikeji.com/lib/imgs/default-head.png';
      } else {
        this.headImgUrl = this.$store.state.cust.headImgUrl;
      }

      this.nickname = this.$store.state.cust.nickname;
    },
    async getinfo () {
      let rs = await this.$post('/new_partner/countBoundUser', {});
      if (rs.status == 200) {
        this.count = rs.payload.count;
      } else {
        Toast(rs.error);
      }
      let rs2 = await this.$post('/new_partner/countBoundUser', {
        apply_card: 'Y'
      });
      if (rs2.status == 200) {
        this.applicationCount = rs2.payload.count;
      } else {
        Toast(rs2.error);
      }
    }
  },
  created () {
    this.getheadImgUrl();
    this.getTotalCredit();
    this.getinfo();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  position: absolute;
  min-height: 100%;
  height: 100%;
  width: 100%;
  padding-bottom: 0.3rem;
  background: url("./imgs/home_bg.png") no-repeat;
  background-size: 100% 100%;
}

.hdgz {
  position: absolute;
  top: 0.52rem;
  right: 0;
  width: 1.91rem;
  height: 0.8rem;
  background: url("./imgs/hdgz.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}

.main-info {
  position: relative;
  margin: 0.72rem auto 0 auto;
  width: 7.14rem;
  height: 5.85rem;
  background: url("./imgs/info_bg.jpg") no-repeat;
  background-size: 100% 100%;
}

.touxiang {
  margin: 0 auto;
  padding: 0.2rem;
  width: 3.25rem;
  height: 3.25rem;
  img {
    width: 100%;
    border-radius: 50%;
  }
}

.info {
  margin: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.num {
  color: rgb(120, 198, 126);
  font-size: 0.54rem;
  line-height: 0.54rem;
  margin-bottom: 0.3rem;
  text-align: center;
  font-family: "Impact";
}

.no-ranking {
  color: rgb(120, 198, 126);
  font-size: 0.34rem;
  line-height: 0.54rem;
  margin-bottom: 0.3rem;
  font-family: "PingFang SC";
}

.info-title {
  color: rgb(123, 198, 126);
  font-size: 0.26rem;
  font-family: "PingFang SC";
}

.button-list {
  margin: 0.5rem 0.42rem 0 0.42rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-item {
  text-align: center;
  img {
    width: 0.86rem;
    height: 0.86rem;
    margin-bottom: 0.28rem;
  }
  p {
    color: white;
    font-family: "PingFang SC";
    font-size: 0.26rem;
  }
}

.banner {
  margin-top: 0.44rem;
  width: 100%;
  text-align: center;
  img {
    width: 6.9rem;
  }
}

.banner2 {
  margin-top: 0.44rem;
  width: 100%;
  padding: 0 0.35rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 3.36rem;
    height: 1.9rem;
  }
}

.bg {
  background: #a3d49a;
  width: 100%;
  height: 100%;
  position: fixed;
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
    margin: 1rem auto;
    position: relative;
    padding: 0.3rem 0.7rem 0 0.5rem;
    h3 {
      text-align: center;
      margin-bottom: 0.44rem;
      color: rgb(128, 175, 100);
      margin-top: 0.42rem;
    }
    .body {
      height: 9rem;
      overflow-y: scroll;
      p {
        color: rgb(51, 51, 51);
        line-height: 0.4rem;
      }
      span {
        color: rgb(128, 175, 100);
      }
    }
  }
}
</style>
