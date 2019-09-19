<template>
  <div class="container">
    <back></back>
    <div class="activity-area">
      <div class="product-box">
        <div class="standard-box" v-for="(act, index) in actGroup" :key="act.actId">
          <div class="standard-title">{{index == 0 ? '特邀客户专享':'来聚财活跃商户专享'}}</div>
          <img :src="act.productList[0].standardList[0].standardImgUrl"
            :alt="act.productList[0].standardList[0].standardName">
          <div class="standard-price">
            ￥{{act.productList[0].standardList[0].currentPrice}}
          </div>
          <div class="buy-btn" @click="_creatOrder(act.actId, act.productList[0].standardList[0].id)">
            点击购买
          </div>
        </div>
      </div>
    </div>
    <div class="rule-box">
      <div class="rule-remark" v-html="actGroup[0].detail"></div>
      <div class="rule-decs" v-html="actGroup[1].detail"></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { getActDetail, creatOrder } from '@/lib/api';
export default {
  data () {
    return {
      isSuccess: false,
      isFail: false,
      actGroup: {}
    };
  },
  methods: {
    _creatOrder (actId, standardId) {
      if (!this.actGroup) {
        Toast('网络异常');
        return false;
      }
      let tel = null;
      if (this.$store.state.cust && this.$store.state.cust.tel) {
        tel = this.$store.state.cust.tel;
      }
      creatOrder({
        actId: actId,
        standardId: standardId,
        account: tel,
        callbackPage: `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/wenzhou_boc/huafeigou`
      });
    }
  },
  async created () {
    let actIds =
      process.env.PUBLISH_ENV == 'prod'
        ? [546496326, 562745008]
        : [562732469, 562746970]; // [10元, 50元]
    let data1 = await getActDetail(actIds[0]);
    let data2 = await getActDetail(actIds[1]);
    this.actGroup = [data1, data2];
    for (let i = 0; i < this.actGroup.length; i++) {
      if (!this.actGroup[i]) {
        Toast('网络异常');
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  min-height: 13.34rem;
  background: url(//static.lianhaikeji.com/images/20190710/62a9fbf4fce9407ab0f60d41d47d2ddc.jpg)
    no-repeat;
  background-size: 100% 13.34rem;
  position: relative;
  display: block;
  background-color: #fc9745;
  .activity-area {
    width: 100%;
    height: 4.3rem;
    display: inline-block;
    position: relative;
    margin-top: 5.18rem;
    background: url(//static.lianhaikeji.com/images/20190710/49cda646b8c14dd4a09645e593735acf.png)
      no-repeat;
    background-size: 100%;
    text-align: center;
    .product-box {
      width: 92%;
      height: 3.45rem;
      display: inline-block;
      margin-top: 0.24rem;
      box-sizing: border-box;
      padding-top: 0.7rem;
      .standard-box {
        box-sizing: border-box;
        display: inline-block;
        width: 50%;
        height: 2.7rem;
        text-align: center;
        .standard-title {
          font-size: 0.3rem;
          color: #fa955c;
          margin-bottom: 0.12rem;
        }
        > img {
          display: inline-block;
          width: 1.87rem;
          height: 1.1rem;
        }
        .standard-price {
          color: #fb9b2d;
          font-size: 0.3rem;
        }
        .buy-btn {
          width: 46.37%;
          height: 0.44rem;
          display: inline-block;
          background-color: #f88711;
          color: #fff;
          font-size: 0.2rem;
          line-height: 0.44rem;
          border-radius: 10px;
          margin-top: 0.12rem;
        }
      }
    }
  }
  .rule-box {
    box-sizing: border-box;
    display: inline-block;
    width: 92%;
    height: 4rem;
    background: url(//static.lianhaikeji.com/images/20190710/a4997f8262bd4da1b223f521b4f7300a.png)
      no-repeat;
    background-size: 100%;
    margin-left: 4%;
    font-size: 0.26rem;
    color: #fff;
    padding-left: 11.6%;
    padding-top: 1rem;
    > div {
      position: relative;
      display: inline-block;
      width: 90%;
      height: auto;
      line-height: 0.36rem;
      &::before {
        content: "";
        width: 0.06rem;
        height: 0.24rem;
        background-color: #2229f3;
        position: absolute;
        top: 0.04rem;
        left: -0.2rem;
      }
    }
    .rule-remark {
      margin-bottom: 0.36rem;
    }
  }
}
</style>
