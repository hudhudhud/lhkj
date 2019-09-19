<template>
  <div style="text-align: center; height: 100%; background: #ffffff;">
    <div class="banner1">
      <div class="touxiang"><img :src="headImgUrl"/></div>
      <div class="uname">
        <div class="uname-1">账户昵称</div>
        <div class="uname-2">{{nickname}}</div>
      </div>
      <div class="jfdhmx">
        <a :href="`${protocol}//${host}/${$store.state.merchantAppid}/merchant/index/credit`">积分兑换明细
        </a>
      </div>
    </div>
    <div class="banner2">
      <div class="banner2-1">
        <p class="banner2-p1">累计积分</p>
        <p class="banner2-p2">{{accumulatedCredit}}</p>
      </div>
      <div class="banner2-2">
        <p class="banner2-p1">剩余积分</p>
        <p class="banner2-p2">{{useableCredit}}</p>
      </div>
      <div class="jfsc">
        <a :href="`${protocol}//${host}/${$store.state.merchantAppid}/merchant`">积分商城 ></a>
      </div>
    </div>
    <div class="banner3" style="margin-top: 0.6rem">
      <p>浙里贷</p>
      <img src="./imgs/khrk.png" style="margin-right: 0.18rem" @click="$router.push('khrk')"/>
      <img src="./imgs/khjlrk.png" @click="$router.push('khjl/khjlHome')"/>
    </div>
    <div class="banner3">
      <p>预约办理ETC</p>
      <img src="./imgs/etcrk.jpg" @click="$router.push('ETC')"/>
    </div>
    <div class="banner3">
      <p>一键申办信用卡</p>
      <img src="./imgs/xyksqrk.png" @click="mes"/>
    </div>
    <div class="alert" v-if="showAlert">
      <div class="box">
        <p>{{alertMes}}</p>
        <div class="close-btn" @click="showAlert=false">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      showAlert: false,
      alertMes: '',
      host: window.location.host,
      protocol: window.location.protocol,
      headImgUrl: '',
      nickname: '',
      merchantId: config.merchantId,
      useableCredit: '0',
      accumulatedCredit: '0'
    };
  },
  methods: {
    // 查询用户是否已绑定
    async checkBind () {
      let shareCus = sessionStorage.getItem('share')
      // 判断是是否是扫码进来的
      if (!shareCus) {
        return;
      }
      // 查询当前用户信息 获取已绑定信息
      let rs = await this.$post('/borf/get/info');
      if (rs.status == 200) {
        if (!rs.payload) {
          return;
        }
        let kh = rs.payload.commendCustId // 已绑定客户id
        let yg = rs.payload.partnerCustId // 已绑定员工id
        if (kh) {
          // 如果已绑定客户，且当前扫的码不是已绑定的客户，则提示
          if (shareCus != kh) {
            this.alertMes = '尊敬的客户，您已加入好友推荐，请直接前往丰收互联申请！'
            this.showAlert = true
          }
        } else if (yg) {
          // 如果已绑定客户经理，且当前扫的码不是已绑定的客户经理，则提示
          if (shareCus != yg) {
            this.alertMes = '尊敬的客户，您已加入客户经理推荐，请直接前往丰收互联申请！'
            this.showAlert = true
          }
        }
      } else {
        var error = rs.error;
        var message = rs.message;
        var msg = '';
        if (error && !message) {
          msg += error;
        }
        if (message) {
          msg += message;
        }
        Toast(msg);
      }
    },
    // 剩余积分
    async getTotalCredit () {
      let rs = await this.$post('/user_credit/get');
      if (rs.status == 200) {
        this.useableCredit = rs.payload.useableCredit;
        this.accumulatedCredit = rs.payload.accumulatedCredit;
      } else {
        let error = rs.error;
        let message = rs.message;
        let msg = '';
        if (error && !message) {
          msg += error;
        }
        if (message) {
          msg += message;
        }
        Toast(msg);
      }
    },
    getheadImgUrl () {
      this.headImgUrl = this.$store.state.cust.headImgUrl;
      this.nickname = this.$store.state.cust.nickname;
    },
    mes () {
      Toast('活动暂未开放，敬请期待！');
    }
  },
  async created () {
    await this.getheadImgUrl();
    await this.getTotalCredit();
    await this.checkBind();
  }
}
</script>

<style scoped>
  .banner1 {
    width: 100%;
    height: 2.75rem;
    background: url("./imgs/index_banner_1.png") no-repeat;
    background-size:cover;
  }
  .touxiang {
    padding: 0.04rem;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 1.3rem;
    background: rgba(255,255,255,0.3);
    margin: 0.4rem 0.3rem 0 0.5rem;
    float: left;
  }
  .touxiang img {
    opacity: 1;
    width: 1.22rem;
    height: 1.22rem;
    border-radius: 1.22rem;
  }
  .uname {
    margin-top: 0.6rem;
    float: left;
    text-align: center;
  }
  .uname-1 {
    color: #ffffff;
    font-weight: bolder;
    font-size: 0.34rem;
  }
  .uname-2 {
    margin-top: 0.18rem;
    width: auto;
    color: #ffffff;
    font-size: 0.26rem;
    font-weight: bold;
    background: #f86c49;
    border-radius: 0.5rem;
    padding: 0.1rem 0.2rem 0.09rem 0.2rem;
    text-align: center;
  }
  .jfdhmx {
    float: right;
    color: #ffffff;
    font-size: 0.26rem;
    font-weight: bolder;
    background: #f86c49;
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.15rem;
    padding-left: 0.25rem;
    box-shadow: 0 0.01rem 0.1rem #666666;
    margin-top: 0.3rem;
  }
  .banner2 {
    text-align: center;
    height: 1.6rem;
    width: 90%;
    margin: -0.75rem auto 0 auto;
    background: #ffffff;
    border-radius: 0.1rem;
    box-shadow: 0 0.05rem 0.2rem rgba(220,220,220,0.5);
  }
  .banner2-1 {
    margin-top: 0.36rem;
    float: left;
    position: absolute;
    text-align: center;
    width: 45%;
    max-width: 45%;
    border-right: 0.01rem solid #dddddd;
  }
  .banner2-2 {
    margin-top: 0.36rem;
    float: right;
    text-align: center;
    width: 45%;
    max-width: 45%;
  }
  .banner2-p1 {
    color: #999999;
    font-size: 0.24rem;
  }
  .banner2-p2 {
    margin-top: 0.2rem;
    color: #222222;
    font-size: 0.38rem;
    font-weight: bolder;
  }
  .jfsc {
    margin-top: 1.4rem;
    position: absolute;
    width: 90%;
    text-align: center;
  }
  .jfsc a {
    text-align: center;
    color: #ffffff;
    font-size: 0.2rem;
    font-weight: bolder;
    background: #fb5220;
    border-radius: 0.5rem;
    padding: 0.1rem 0.2rem 0.09rem 0.2rem;
  }
  .banner3 {
    margin: 0 0.3rem;
    text-align: left;
  }
  .banner3 p {
    font-size: 0.32rem;
    color: #222222;
    margin-bottom: 0.2rem;
  }
  .banner3 img {
    height: 1.74rem;
    float: left;
    margin-bottom: 0.4rem;
  }
  .alert {
    position: fixed;
    background: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .box {
    width: 5rem;
    height: 3rem;
    margin: 3rem auto;
    background: white;
    border-radius: 0.2rem;
    color: #666666;
    font-size: 0.32rem;
    text-align: center;
    position: relative;
  }
  .box p {
    padding: 0.5rem;
  }
  .close-btn {
    position: absolute;
    bottom: 0;
    width: 5rem;
    text-align: center;
    padding: 0.25rem;
    color: #3879d9;
    font-size: 0.36rem;
    border-top: #cccccc 0.02rem solid;
  }
</style>
