<template>
  <div class="container">
    <back></back>
    <div class="activity-area">
      <!-- 抢购 -->
      <div class="act-box panic-buy">
        <div class="click-btn" @click="createPhone()"></div>
      </div>
      <!-- 领取 -->
      <div class="act-box receive">
        <div class="click-btn" @click="createIntegral()"></div>
      </div>
    </div>
    <div class="tip">
      抢购完成后,别忘了您的福利,点击领取八桂金哦
    </div>
    <div class="rule-box">
      <div class="act-time">
        <div class="rule-label">
          活动时间：
        </div>
        <div class="rule-content">
          即日起至2019年12月31日
        </div>
      </div>
      <div class="act-user">
        <div class="rule-label">
          活动对象：
        </div>
        <div class="rule-content">
          广西区内微信首次绑定建行卡（储蓄卡或信用卡）的客户
        </div>
      </div>
      <div class="rule-content">
        <div class="rule-label">
          活动说明：
        </div>
        <div class="rule-content" v-html="ruleDecs"></div>
      </div>
    </div>
    <!-- 弹窗 -->
    <transition name="fade">
      <!-- 成功弹窗 -->
      <div class="dialog-mask" v-if="isSuccess">
        <div class="main success-dialog">
          <div class="close-btn" @click="isSuccess = false;"></div>
        </div>
      </div>
      <!-- 失败弹窗 -->
      <div class="dialog-mask" v-if="isFail">
        <div class="main fail-dialog">
          <div class="close-btn" @click="isFail = false;"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { getActDetail, creatOrder, newCreatOrder } from '@/lib/api';
export default {
  data () {
    return {
      isSuccess: false,
      isFail: false,
      actGroup: [],
      ruleDecs: ''
    };
  },
  methods: {
    createPhone () {
      let data = this.actGroup[0];
      if (!data) {
        Toast('网络异常');
        return false;
      }
      let tel = null;
      if (this.$store.state.cust && this.$store.state.cust.tel) {
        tel = this.$store.state.cust.tel;
      }
      creatOrder({
        actId: data.actId,
        standardId: data.productList[0].standardList[0].id,
        account: tel,
        callbackPage: `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/bagui/wx_bind_card`
      });
    },
    createIntegral () {
      let data = this.actGroup[1];
      if (!data) {
        Toast('网络异常');
        return false;
      }
      newCreatOrder(
        {
          actId: data.actId,
          standardId: data.productList[0].standardList[0].id,
          account: null
        },
        rs => {
          if (rs.status == 200) {
            this.isSuccess = true;
          } else {
            this.isFail = true;
          }
        }
      );
    }
  },
  async created () {
    let actIds =
      process.env.PUBLISH_ENV == 'prod'
        ? [562572548, 562581191]
        : [562325611, 562325768]; // [话费，积分]
    let data1 = await getActDetail(actIds[0]);
    let data2 = await getActDetail(actIds[1]);
    this.actGroup = [data1, data2];
    for (let i = 0; i < this.actGroup.length; i++) {
      if (!this.actGroup[i]) {
        Toast('网络异常');
      }
    }
    this.ruleDecs = data1.detail;
    // console.log();
  },
  mounted () {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  height: 20.94rem;
  background: url(//static.lianhaikeji.com/images/20190709/4cdc5567dc81443ea213cb60276f9c63.jpg)
    center center / 100% 100% no-repeat;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  display: block;
  .activity-area {
    height: 3.4rem;
    overflow-x: hidden;
    position: absolute;
    display: flex;
    width: 5.8rem;
    top: 5.58rem;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    justify-content: space-between;
    .act-box {
      height: 3.38rem;
      overflow-x: hidden;
      width: 2.82rem;
    }
    .click-btn {
      height: 0.58rem;
      overflow-x: hidden;
      width: 2.28rem;
      display: inline-block;
      position: absolute;
      bottom: 0.44rem;
    }
    .panic-buy {
      background: url(//static.lianhaikeji.com/images/20190705/48c438d0c29c42478ffc4f49c5a62ea0.png)
        center center / 100% 100% no-repeat;
      .click-btn {
        background: url(http://static.lianhaikeji.com/images/20190705/73b1663cd3ef4815ac5acfcf1f70255d.png)
          center center / 100% 100% no-repeat;
        left: 0.26rem;
      }
    }
    .receive {
      background: url(//static.lianhaikeji.com/images/20190705/277cc36a35b54f1b85df03afb35a531b.png)
        center center / 100% 100% no-repeat;
      .click-btn {
        background: url(//static.lianhaikeji.com/images/20190705/d8bd9f9640da4bbd992eea1afe724acd.png)
          center center / 100% 100% no-repeat;
        right: 0.26rem;
      }
    }
  }
  .tip {
    position: absolute;
    font-size: 0.26rem;
    top: 9.1rem;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    width: 5.8rem;
    color: #d34c09;
  }
  .rule-box {
    display: inline-block;
    width: 88%;
    height: 10rem;
    position: absolute;
    top: 10.5rem;
    left: 6%;
    color: #278a81;
    font-size: 0.26rem;
    box-sizing: border-box;
    padding-top: 1.32rem;
    overflow-y: hidden;
    > div {
      display: inline-block;
      width: 90.9%;
      line-height: 0.3rem;
      margin-left: 4.5%;
      margin-bottom: 0.36rem;
      .rule-label {
        font-weight: bold;
        font-size: 0.28rem;
        margin-bottom: 2px;
      }
    }
  }
  .dialog-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    .main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6.6rem;
      .close-btn {
        width: 2.6rem;
        height: 0.88rem;
        position: absolute;
        bottom: 0.68rem;
        left: 2rem;
      }
    }
    .success-dialog {
      height: 8.84rem;
      background: url(//static.lianhaikeji.com/images/20190705/73de63f0ba7d496e9505290dc0704c60.png)
        center center / 100% 100% no-repeat;
    }
    .fail-dialog {
      height: 7.46rem;
      background: url(//static.lianhaikeji.com/images/20190705/3fe475c8f7954efebc7340eed61bc231.png)
        center center / 100% 100% no-repeat;
      .close-btn {
        bottom: 0.88rem;
      }
    }
  }
}
</style>
