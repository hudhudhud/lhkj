<template>
  <div class="index-wrapper" v-if="cust">
    <div class="index-top">
      <div class="user-msg">
        <div class="user-avatar">
          <div
            class="star"
            v-if='userState && userState!=1'
          ></div>
          <img
            class="user-avatar-img"
            :src="cust.headImgUrl || avatarImg"
            alt=""
          >
        </div>
        <div class="user-infomation">
          <p class="user-tel">{{cust.tel}}</p>
          <img
            class="user-avatar-state"
            src="./imgs/active.png"
            alt=""
            v-if='userState==3'
          >
          <img
            class="user-avatar-state"
            src="./imgs/noAcitive.png"
            alt=""
            v-if='userState!=3'
          >
        </div>
      </div>
      <div class="user-points-section">
        <div class="user-points-inner">
          <div class="user-points-item">
            <p class="user-points-ititle">累计积分</p>
            <p class="user-points-idig">{{accumulatedCredit}}</p>
          </div>
          <div class="user-points-item">
            <p class="user-points-ititle">已兑换积分</p>
            <p class="user-points-idig">{{spend}}</p>
          </div>
          <div class="user-points-item">
            <p class="user-points-ititle">剩余积分</p>
            <p class="user-points-idig">{{useableCredit}}</p>
          </div>
        </div>
      </div>
      <div
        class="qrocde-part"
        @click="$href(`/myQrcode/${$store.state.cust.tel}`, $route.params.customId)"
      >
        <i class="qrcode-img"></i>
        <span class="qrcode-text">我的二维码</span>
      </div>
      <div
        class="qrocde-part"
        style="top: 1.4rem;"
        @click="goCbb"
      >
        <span class="qrcode-text">进入手机银行</span>
      </div>
      <div
        v-if="showUpload"
        class="qrocde-part"
        style="top: 2.1rem;"
        @click="$router.push('uploadCode')"
      >
        <span class="qrcode-text">上传活动二维码</span>
      </div>
    </div>
    <div class="index-data-statistics">
      <div class="index-data-item">
        <p class="index-data-detail">
          <i class="people-icon invite-people"></i>邀请人数</p>
        <p class="index-data-num">{{totalNum}}</p>
      </div>
      <div class="index-data-item">
        <p class="index-data-detail">
          <i class="people-icon success-people"></i>成功人数</p>
        <p class="index-data-num">{{successNum}}</p>
      </div>
    </div>
    <div class="banner">
      <a href="http://h5.yscase.com/unionpay/?user_id=8F64D6D8A6D6992C2ECE23BD375C7C3E&remark1=&CCBTIMESTAMP=1555397125513&CCBSIGN=2bc689eb3a6524e5d5d3376c988d3dc246985a7515825bd741cb658bf346e40e6a2231b6888fbdf08a48960fcb961bf976a614720d34c472b63e4d14ac0b29fbcf77726577bcff8a01123aaf7cd74df5fd03afcb69e2897a13f8f7f3eac07acf076c34a9d6ebe7a8afa167bf6703c7a20a25c66e79c2db904919c562ad831c97?">
        <div
          class="jinru"
          style="top: 6.1rem; right: 0.64rem;"
        ></div>
      </a>
      <a href="https://mobile.ccb.com/e_report/MerchantDiscount/activity/activity_d.html?intent=1&DcCp_Avy_ID=YHHD2019052000479">
        <div
          class="jinru"
          style="top: 7.4rem; right: 0.64rem;"
        ></div>
      </a>
      <div
        class="jinru"
        style="top: 8.7rem; right: 0.64rem;"
      ></div>
      <a href="https://mobile.ccb.com/e_report/MerchantDiscount/activity/activity_d.html?intent=1&DcCp_Avy_ID=YHHD2019041200300">
        <div class="xydzp"></div>
      </a>
      <div></div>
    </div>

    <div class="more">
      <div
        class="more-but"
        @click="showBut = !showBut"
      >
        更多功能
      </div>
    </div>

    <div
      class="index-nav"
      v-if="showBut"
    >
      <div class="index-nav-item">
        <a
          class="index-nav-lnk"
          href="javascript: void(0)"
          @click="$href('/pointsDetails', $route.params.customId)"
        >
          <img
            class="index-nav-img"
            src="./imgs/nav-points-details.png"
          > 积分明细
        </a>
      </div>
      <div class="index-nav-item">
        <a
          class="index-nav-lnk"
          href="javascript: void(0)"
          @click="$href('/recommendedDetails', $route.params.customId)"
        >
          <img
            class="index-nav-img"
            src="./imgs/nav-recommend-details.png"
          > 推荐明细
        </a>
      </div>
      <div class="index-nav-item">
        <a
          class="index-nav-lnk"
          href="javascript: void(0)"
          @click="$href('/rule', $route.params.customId)"
        >
          <img
            class="index-nav-img"
            src="./imgs/nav-activity-rule.png"
          > 活动规则
        </a>
      </div>
      <div class="index-nav-item">
        <a
          class="index-nav-lnk"
          href="javascript: void(0)"
          @click="$href('/index/act/55')"
        >
          <img
            class="index-nav-img"
            src="./imgs/nav-points-mall.png"
          > 积分商城
        </a>
      </div>
      <div v-if="type == 1 || type == 2" @click="$router.push('refereeList')" class="wht">
        进入微后台
      </div>
      <a href="http://hemi.lianhaikeji.com/ttyl/9dd0ad15/login" style="width: 100%">
        <div v-if="type == 1 ||type == 4" class="wht">
          厅堂入口
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { getUserCredit } from './api/api.js';
import avatarImg from './imgs/aa-test-avatar.jpg';
export default {
  data () {
    return {
      showBut: false,
      avatarImg: avatarImg,
      useableCredit: 0,
      accumulatedCredit: 0,
      spend: 0,
      successNum: 0,
      totalNum: 0,
      showUpload: false,
      userInfo: null,
      type: '',
      userState: '',
      userStateList: [
        {
          1: '未签约',
          2: '已签约未活跃',
          3: '未签约已活跃'
        }
      ],
      userType: [
        {
          1: '大堂经理',
          2: '外拓人员',
          3: '商户'
        }
      ]
    };
  },
  methods: {
    goCbb () {
      window.location.href =
        'http://a.app.qq.com/o/simple.jsp?pkgname=com.chinamworld.main';
    },
    async getRefereeChildren () {
      let rs = await this.$post('api/referee/getRefereeChildren', {
        customId: this.cust.id
      });
      if (rs.status == 200) {
        this.successNum = rs.payload.successNum;
        this.totalNum = rs.payload.totalNum;
      } else {
        // Toast(rs.error)
      }
    },
    async getRefereeInfo () {
      let rs = await this.$get('api/referee/getRefereeInfo/' + this.cust.id);
      if (rs.status == 200) {
        sessionStorage.setItem('referee_wdh', rs.payload.organCode)
        this.userInfo = rs.payload;
        this.type = rs.payload.type;
        this.userState = rs.payload.state;
        if (this.type == 1 || this.type == 2 || this.type == 3) {
          this.showUpload = true;
        }
      } else {
        // 不是推手 则跳进注册页
        window.location.replace(window.location.href.replace('/index', '/acEntrance'))
      }
    }
  },
  computed: {
    cust () {
      return this.$store.state.cust ? this.$store.state.cust : ''
    }
  },
  watch: {
    cust (val) {
      if (val.id) {
        this.getRefereeChildren()
        this.getRefereeInfo()
      }
    }
  },
  created () {
    getUserCredit(this);
    if (this.cust.id) {
      this.getRefereeChildren()
      this.getRefereeInfo()
    }
  }
};
</script>

<style scoped>
.index-wrapper {
  position: relative;
  padding-bottom: 0.4rem;
  overflow-y: auto;
  background: #eeeeee;
}

.index-top {
  position: relative;
  width: 100%;
  height: 4.2rem;
  background: #3690e3;
  background-image: -webkit-linear-gradient(315deg, #32b2d7, #396def);
  background-image: -o-linear-gradient(315deg, #32b2d7, #396def);
  background-image: linear-gradient(135deg, #32b2d7, #396def);
}

.user-msg {
  padding-left: 0.4rem;
  padding-top: 0.7rem;
  display: flex;
  align-items: center;
}

.user-avatar {
  position: relative;
}

.star {
  background: url("./imgs/star.jpg") no-repeat;
  background-size: 100% 100%;
  width: 0.32rem;
  height: 0.32rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.user-avatar-state {
  display: block;
  width: 1.2rem;
  height: 0.5rem;
  margin-top: 0.5rem;
}

.user-avatar-img {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.05rem solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  box-shadow: 0 0 0.16rem rgba(0, 0, 0, 0.4);
}

.user-infomation {
  position: relative;
  margin-left: 0.2rem;
  color: #fff;
}

.user-infomation .user-name {
  margin-bottom: 0.1rem;
  font-size: 0.36rem;
}

.user-infomation .user-tel {
  font-size: 0.32rem;
  font-weight: bolder;
}

.user-points-section {
  margin-top: 0.8rem;
  position: relative;
}

.user-points-inner {
  display: flex;
  justify-content: space-between;
}

.user-points-item {
  position: relative;
  flex: 1;
  text-align: center;
}

.user-points-item:after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  width: 1px;
  /*no*/
  height: 0.6rem;
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%);
}

.user-points-item:last-child:after {
  display: none;
}

.user-points-ititle {
  font-size: 0.3rem;
  color: rgba(255, 255, 255, 0.8);
}

.user-points-idig {
  margin-top: 0.08rem;
  font-size: 0.4rem;
  color: #fff;
}

.index-data-statistics {
  position: relative;
  margin: 0.15rem 0;
  padding: 0.2rem 0.24rem 0.1rem 0.24rem;
  display: flex;
  background: #fff;
}

.index-data-item {
  position: relative;
  flex: 1;
  text-align: center;
}

.index-data-item:after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  width: 1px;
  /*no*/
  height: 0.6rem;
  background: #e8e8e8;
  transform: translateY(-50%);
}

.index-data-item:last-child:after {
  display: none;
}

.index-data-detail {
  font-size: 0.32rem;
  color: #3599e0;
}

.people-icon {
  display: inline-block;
  vertical-align: text-top;
  margin-right: 0.1rem;
}

.invite-people {
  width: 0.4rem;
  height: 0.36rem;
  background: url(./imgs/invite-people.png) no-repeat left center;
  background-size: 100% 100%;
}

.success-people {
  width: 0.56rem;
  height: 0.36rem;
  background: url(./imgs/success-people.png) no-repeat left center;
  background-size: 100% 100%;
}

.index-data-num {
  margin-top: 0.04rem;
  font-size: 0.44rem;
  color: #666;
}

.banner {
  width: 100%;
  height: 11.08rem;
  position: relative;
  background: url("./imgs/index_banner.jpg") no-repeat;
  background-size: 100% 100%;
}

.jinru {
  background: url("./imgs/jinru.png") no-repeat;
  background-size: 100% 100%;
  width: 1rem;
  height: 0.5rem;
  position: absolute;
}

.xydzp {
  background: url("./imgs/xydzp.png") no-repeat;
  background-size: 100% 100%;
  width: 2.3rem;
  height: 0.76rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 4.5rem;
}

.index-nav {
  margin-top: 0.2rem;
  display: flex;
  flex-flow: row wrap;
  background-color: #fff;
}

.index-nav-item {
  padding: 0.36rem 0;
  flex: 0 0 50%;
  border-bottom: 1px solid #f2f4f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.index-nav-item:nth-child(odd) {
  border-left: 0;
}

.index-nav-lnk {
  font-size: 0.3rem;
  color: #040404;
  text-align: center;
}

.index-nav-img {
  display: inline-block;
  width: 22%;
  max-width: 0.64rem;
  vertical-align: middle;
  margin-right: 0.04rem;
}

.qrcode-img {
  margin-left: -0.2rem;
}

.qrocde-part {
  text-align: center;
  width: 2.3rem;
  position: absolute;
  top: 0.63rem;
  right: 0;
  padding-left: 0.15rem;
  line-height: 0.58rem;
  color: #3687e6;
  background: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.qrocde-part i {
  position: relative;
  top: 0.1rem;
  display: inline-block;
  width: 0.44rem;
  height: 0.44rem;
  background: url(./imgs/mine-qrcode-icon.png) no-repeat;
  background-size: 100% 100%;
}

.more {
  width: 100%;
  height: 0.66rem;
  margin: 0.3rem 0;
}

.more-but {
  font-size: 0.28rem;
  color: #666666;
  text-align: center;
  line-height: 0.66rem;
  height: 0.66rem;
  width: 2.56rem;
  border: 0.02rem #dadada solid;
  background: white;
  border-radius: 0.33rem;
  margin: 0 auto;
}

.wht {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.3rem;
  color: #333333;
  border-bottom: 1px solid #f2f4f5;
}
</style>
