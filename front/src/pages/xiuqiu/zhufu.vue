<template>
  <div>
    <div class="zhufu">
      <back></back>
      <div
        class="shou item"
        v-for="(item, ind) in list"
        :key="ind+'shou'"
      >
        <div
          class="header"
          v-if="type==1"
        >
          来自{{item.custName}}的祝福绣球
          <div
            class="btn-songzhufu"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/xiuqiu/index?custTel=${item.custTel}`)"
          ></div>
        </div>
        <div
          class="header"
          v-else-if="type==2"
        >
          我传给{{item.targetTel}}的祝福绣球
        </div>
        <div class="fuimg">
          <img
            :src="item.imageUrl"
            alt=""
          >
        </div>

        <img
          v-if="type==1 && item.status ==1"
          class="receiveBGJ"
          @click="createOrder(item.id)"
          src="./imgs/receiveBGJ.png"
          alt=""
        >
        <img
          v-else-if="type==2 && item.status==0"
          class="receiveBGJ"
          @click="turns(item.orderCode)"
          src="./imgs/just-pay.png"
        >
        <div class="fufont">
          <img
            :src="item.txtUrl"
            alt=""
          >
        </div>
      </div>
      <div class="noMore">没有更多了</div>

      <div class="bottom"></div>
    </div>
    <mt-popup
      v-model="PopupFlag"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="ruledetail">
        <div class="content"> 第一次收到祝福绣球可得3个<br />八桂金哦，八桂金已成功领取，<br />在平台主页点击“我的八桂金”<br />即可查看。
        </div>
        <img
          class="know"
          src="./imgs/know.png"
          alt=""
          @click="PopupFlag= false"
        >
      </div>
    </mt-popup>
  </div>
</template>
<script>
// import { Api } from '../../api';
import { Toast, Indicator } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  data () {
    return {
      payUrl: payUrl,
      type: this.$route.params.type,
      actIdShou: process.env.PUBLISH_ENV == 'prod' ? '554305446' : '554277384',
      standardId: process.env.PUBLISH_ENV == 'prod' ? '1295' : '976',
      PopupFlag: false,
      noMore: false,
      currentPage: 1,
      count: 0,
      errorMsg: '',
      timer: null,
      list: []
    };
  },
  methods: {
    async turns (orderCode) {
      if (this.count > 6) {
        Toast(this.errorMsg);
        clearTimeout(this.timer);
        Indicator.close();
        return;
      }
      Indicator.open();
      this.count++;
      let rs = await this.$post('api/order/check/status', {
        orderCode: orderCode
      });
      if (rs.status == 200) {
        const { prepayId } = rs.payload;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/xiuqiu/songfuover`;
        Toast('订单已生成...正在跳转支付');
        let payPath = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payPath);
      } else {
        this.errorMsg = rs.error;
        this.timer = setTimeout(() => {
          this.turns(orderCode);
        }, 2000);
      }
    },
    async createOrder (ballRecordId) {
      let rs = await this.$post('api/activity/newCreateOrder', {
        actId: this.actIdShou,
        standardId: this.standardId,
        ballOrderVO: {
          ballRecordId: ballRecordId
        },
        commodityNum: 1
      });
      if (rs.status === 200) {
        // Toast('已成功收福');
        this.PopupFlag = true;
      } else {
        Toast(rs.error);
      }
    },
    async laodRecord () {
      let currentType = null;
      if (this.type == 2) {
        currentType = true;
      } else if (this.type == 1) {
        currentType = false;
      }
      let rs = await this.$post('api/activity/ball/record/list', {
        actId: this.$route.query.actId,
        pageSize: 100,
        currentPage: this.currentPage,
        type: currentType // true->送福  false->收福
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        if (list.length < 1) {
          this.noMore = true;
        }
        list.forEach(element => {
          let urls = element.imageUrl;
          if (urls) {
            element.imageUrl = urls.split(',')[0];
            element.txtUrl = urls.split(',')[1];
          }
          this.list.push(element);
        });
      }
    }
  },
  created () {
    this.laodRecord();
  }
};
</script>
<style    rel="stylesheet/scss" lang="scss" scoped>
.zhufu {
  width: 100%;
  min-height: 100vh;
  background: url("./imgs/ibg.jpg") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  position: relative;
}
.item {
  width: 6.5rem;
  height: 5.57rem;
  background: url("./imgs/fukuang.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto 0.4rem;
  padding-top: 0.01rem;
}
.header {
  width: 100%;
  height: 0.46rem;
  margin: 0.54rem auto 0.2rem;
  font-size: 0.28rem;
  color: #143245;
  padding-left: 0.5rem;
  position: relative;
  .btn-songzhufu {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.5rem;
    margin: auto;
    width: 1.8rem;
    height: 0.46rem;
    background: url("./imgs/btnsongfu.png") no-repeat;
    background-size: 100% 100%;
  }
}
.fuimg {
  width: 3rem;
  margin: 0.1rem auto;
  img {
    margin: 0 auto;
    display: block;
    width: 100%;
  }
}
.fufont {
  width: 100%;
  text-align: center;
  img {
    display: inline-block;
    height: 0.32rem;
  }
}
.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.58rem;
  background: url("./imgs/bottom.png") no-repeat;
  background-size: 100% 100%;
}

.noMore {
  font-size: 0.26rem;
  color: rgb(184, 187, 191);
  text-align: center;
  line-height: 1.2rem;
}
.mypop {
  background: transparent !important;
}
.ruledetail {
  position: relative;
  right: 0.35rem;
  width: 5.8rem;
  height: 6rem;
  padding-top: 1.2rem;
  padding-left: 0.7rem;
  background: url(./imgs/msg-bg.png) no-repeat;
  background-size: 100% 100%;
  line-height: 0.48rem;
}
.content {
  width: 4.2rem;
  margin: 0 auto 0 0.5rem;
  padding-left: 0.2rem;
}
.know {
  display: block;
  margin: 1.8rem auto 0;
  width: 3.87rem;
}
.receiveBGJ {
  display: block;
  width: 2.97rem;
  margin: 0 auto;
}
</style>
