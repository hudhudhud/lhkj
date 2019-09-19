<template>
  <div class="main">
    <div class="hdgz-btn" @click="showHdgz=true"></div>
    <div class="banner"></div>
    <div class="body">
      <div v-for="(item, index) in list" class="item" :key="index">
        <div class="index">{{index + 1}}</div>
        <div class="img"></div>
        <div class="name">{{item.name}}</div>
        <div v-if="item.isdrawed == 1" class="ylq">已领取</div>
        <div v-else class="lqjf" :class="item.isOkDraw == 0 ? 'lqjf_hui' : ''" @click="lqjf(item)"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="btn" @click="$router.push('khewm')"></div>
    </div>
    <div class="hdgz" v-if="showHdgz">
      <div class="tanc">
        <div class="close-btn" @click="showHdgz=false"></div>
        <div class="title">活动规则</div>
        <p>
          活动期间（2019年7月1日至2019年11月30日），客户可在此平台推荐分享二维码给好友，邀请加入组团有礼活动，
          若被推荐客户成功首次签约我行“浙里贷”－公积金贷，合同金额在10000元（不含）以上且合同到期日在2020年1月1日以后，
          推荐人可于签约次日获赠50000积分，积分可在本平台积分商城兑换好礼。同时被推荐人将获赠30元话费奖励于次月发放。
          若被推荐客户在15天内未成功签约，将在推荐列表中移除，推荐人需重新推荐后生效。详情请咨询瑞丰银行各大网点，咨询电话4008896383
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      list: [],
      showHdgz: false
    }
  },
  methods: {
    async lqjf (item) {
      if (item.isOkDraw == 0) {
        Toast('很抱歉，您的好友暂未满足活动要求！')
      } else {
        let rs = await this.$post('/borf/drawIntegral', {friendCusId: item.customId});
        if (rs.status == 200) {
          Toast('领取成功！');
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
      }
      this.loadList()
    },
    async loadList () {
      let rs = await this.$post('/borf/get/commendInfoList');
      if (rs.status == 200) {
        this.list = rs.payload
        if (this.list.length == 0) {
          this.$router.replace('khewm')
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
    }
  },
  async created () {
    await this.loadList()
  }
}
</script>

<style scoped>
  .main {
    background: url("./imgs/ztyl_bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .hdgz-btn {
    background: url("./imgs/hdgz.png") no-repeat;
    background-size: 100% 100%;
    width: 2.05rem;
    height: 0.79rem;
    margin: 0.5rem 0 0 auto;
  }
  .banner {
    background: url("./imgs/ztyl_banner.png") no-repeat;
    background-size: 100% 100%;
    width: 3.83rem;
    height: 1.01rem;
    margin: 0.1rem auto 0.5rem auto;
  }
  .bottom {
    background: url("./imgs/ztyl_bg_botm.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 2.82rem;
    bottom: 0;
    position: absolute;
  }
  .btn {
    background: url("./imgs/tjhy_btn.png") no-repeat;
    background-size: 100% 100%;
    width: 6.2rem;
    height: 0.88rem;
    margin: 0 auto;
    margin-top: 1.3rem;
  }
  .body {
    margin: 0 0.3rem;
    padding: 0.64rem;
    background: white;
    border-radius: 0.1rem;
    height: calc(100% - 4.5rem);
    overflow:auto;
  }
  .item {
    margin-bottom: 0.6rem;
    height: 0.78rem;
  }
  .img {
    background: url("./imgs/head_logo.png") no-repeat;
    background-size: 100% 100%;
    width: 0.44rem;
    height: 0.42rem;
    margin-right: 0.3rem;
    margin-top: 0.15rem;
    float: left;
  }
  .index {
    font-size: 0.34rem;
    line-height: 0.78rem;
    color: #3a6fe5;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 0.15rem;
    width: 0.58rem;
    text-align: left;
  }
  .name {
    font-size: 0.34rem;
    line-height: 0.78rem;
    color: #333333;
    text-align: left;
    float: left;
    max-width: 1.9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .lqjf {
    background: url("./imgs/lqjf.png") no-repeat;
    background-size: 100% 100%;
    width: 2.2rem;
    height: 0.78rem;
    float: right;
  }
  .lqjf_hui {
    background: url("./imgs/lqjf_hui.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .ylq {
    font-size: 0.34rem;
    line-height: 0.78rem;
    color: #999999;
    float: right;
  }
  .hdgz {
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
  }
  .tanc {
    background: url("./imgs/tanchuang.jpg") no-repeat;
    background-size: 100% 100%;
    width: 5.67rem;
    height: 7.69rem;
    margin: 1rem auto 0 auto;
    z-index: 3;
    position: relative;
  }
  .tanc p {
    color: #666666;
    margin: 2.4rem 0.4rem 0 0.4rem;
    position: absolute;
    text-align: justify;
    font-size: 0.28rem;
    line-height: 0.38rem;
  }
  .close-btn {
    background: url("./imgs/close_btn.jpg") no-repeat;
    background-size: 100% 100%;
    width: 0.5rem;
    height: 0.5rem;
    z-index: 4;
    float: right;
    margin: 0.2rem;
  }
  .title {
    margin-top: 0.7rem;
    color: white;
    font-size: 0.5rem;
    font-weight: bolder;
    width: 5.67rem;
    text-align: center;
    position: absolute;
  }
</style>
