<template>
  <div class="out-box" :class="{'disabled-scroll': showModal}">
    <div class="container">
      <div class="page-head">
        <div class="back" @click="goBack"></div>
      </div>
      <div class="act-label">
        活动奖品
      </div>
      <div class="act-area">
        <div :style="`background-image: url(${product.homeImgUrl})`" class="product-box"
          v-for="product in actDetail.productList" :key="product.id">
          <div class="product-name" v-html="product.proName"></div>
          <div class="buy-btn" @click="_createOrder(product)"></div>
        </div>
      </div>
      <div class="btn-bar">
        <div class="rule-btn" @click="showModal = true;"></div>
        <div class="welfare-btn" @click="goOrder"></div>
      </div>
    </div>
    <mt-popup v-model="showModal" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="popup-main" :class="{'pay-main': paySuccess}">
        <template v-if="paySuccess">
          <div class="main-label convert-label"></div>
          <img class="standard-img" :src="drawInfo.img" />
          <div class="pro-name">{{drawInfo.name}}</div>
          <div class="card-pwd">兑换码：{{drawInfo.code}}</div>
          <div class="close-btn" @click="goConvert">立即兑换</div>
        </template>
        <template v-else>
          <div class="main-label rule-label"></div>
          <div class="rule-desc" v-html="actDetail.detail"></div>
          <div class="close-btn" @click="showModal = false;">我知道了</div>
        </template>
      </div>
      <div class="close-popup" @click="showModal = false;paySuccess = false;"></div>
    </mt-popup>
  </div>
</template>
<script>
import { Toast, Popup } from 'mint-ui';
import { getActDetailNew, creatOrder } from '@/lib/api';
export default {
  components: { Popup },
  data () {
    return {
      actId: null, // 买券活动ID
      actId_convert: null, // 兑换活动ID
      actDetail: {},
      showModal: false,
      paySuccess: false,
      drawInfo: {
        img: '',
        code: '',
        name: '',
        standardId: null
      },
      mapOfStandardId: {
        // 两个活动规格ID关联
        // 生产
        2602: 2641,
        2604: 2643
        // 测试
        // 1761: 1800,
        // 1762: 1801
      }
    };
  },
  computed: {
    tel () {
      return this.$store.state.cust ? this.$store.state.cust.tel : null;
    }
  },
  methods: {
    goBack () {
      let backUrl = this.$route.query.defineBackUrl;
      if (this.$route.query.isQuit === 'true') {
        this.$jssdk.call('back', true);
      }
      if (backUrl && backUrl != undefined) {
        window.location.href = backUrl;
      } else {
        this.$jssdk.call('back');
      }
    },
    _createOrder (product) {
      creatOrder({
        actId: this.actId,
        standardId: product.standardList[0].id,
        account: this.tel,
        callbackPage: `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/anhui_boc/dafangjia`
      });
    },
    goConvert () {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${
          this.mapOfStandardId[this.drawInfo.standardId]
        }?couponCode=true&actId=${this.actId_convert}&couponNumber=${
          this.drawInfo.code
        }`
      );
    },
    goOrder () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/order?actId=${this.actId},${this.actId_convert}`
      );
    }
  },
  created () {
    this.actId = process.env.PUBLISH_ENV == 'prod' ? 562747275 : 562747456;
    this.actId_convert =
      process.env.PUBLISH_ENV == 'prod' ? 563265555 : 562747456;
    localStorage.setItem('lastVisitactId', this.actId);
    getActDetailNew(this.actId, rs => {
      this.actDetail = rs.payload;
      // 查询该活动是否有已支付订单
      this.$post('/api/getOrderList?', {
        actId: this.actId,
        status: 2
      }).then(orderRs => {
        if (orderRs.status == 200) {
          let orders = orderRs.payload.list;
          if (orders.length > 0) {
            let idx = null;
            rs.payload.productList.forEach((pro, index) => {
              if (pro.id == orders[0].proId) {
                idx = index;
              }
            });
            if (idx > 0) {
              // 不是第一个商品时提货
              this.$post('api/order/draw', {
                orderCode: orderRs.payload.list[0].orderCode,
                account: this.tel
              }).then(_rs => {
                if (_rs.status == 200) {
                  const cardPwds = JSON.parse(_rs.payload.cardPwds);
                  const _product = this.actDetail.productList[idx];
                  this.drawInfo.img = _product.standardList[0].standardImgUrl;
                  this.drawInfo.name = _product.standardList[0].standardName;
                  this.drawInfo.code = cardPwds[0].cardPwd;
                  this.drawInfo.standardId = _product.standardList[0].id;
                  this.paySuccess = true;
                  this.showModal = true;
                } else {
                  Toast(_rs.error);
                }
              });
            }
          }
        } else {
          Toast(orderRs.error);
        }
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.disabled-scroll {
  overflow: hidden;
}
.out-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .container {
    width: 100%;
    height: 13.38rem;
    background: url(//static.lianhaikeji.com/images/20190712/153ef33dd9c84dce83b929d233ef2132.png)
      no-repeat;
    background-position: 0 1.15rem;
    background-size: 100% 13.38rem;
    .page-head {
      width: 100%;
      height: 1.15rem;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 0.16rem;
      .back {
        position: relative;
        width: 0.8rem;
        height: 0.8rem;
        &::after {
          display: inline-block;
          content: " ";
          height: 0.3rem;
          width: 0.3rem;
          border-width: 0 0 0.02rem 0.02rem;
          border-color: #333;
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: absolute;
          bottom: 0.14rem;
          left: 0.3rem;
        }
      }
    }
    .act-label {
      display: inline-block;
      width: 47.2%;
      height: 0.58rem;
      line-height: 0.58rem;
      color: #fff;
      font-size: 0.28rem;
      font-weight: bold;
      margin: 3.92rem 26.4% 0.46rem;
      background-color: #ffb403;
      text-align: center;
      border-radius: 6px;
    }
    .act-area {
      display: flex;
      width: 89.6%;
      height: 2.98rem;
      margin: 0 5.2%;
      justify-content: space-between;
      .product-box {
        display: inline-block;
        width: 31.5%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100%;
        .product-name {
          box-sizing: border-box;
          display: inline-block;
          width: 75.4%;
          height: 1.6rem;
          border-top: 2px solid #fff;
          color: #fff;
          margin: 0.45rem 13.2% 0;
          font-size: 0.3rem;
          font-weight: bold;
          padding: 0.26rem 8.5%;
          text-align: center;
          line-height: 0.34rem;
        }
        .buy-btn {
          display: inline-block;
          width: 68.8%;
          height: 0.5rem;
          margin: 0 15.6%;
          background-repeat: no-repeat;
          background-size: 100%;
        }
        &:nth-of-type(1) {
          .product-name {
            font-size: 0.4rem;
            line-height: 0.45rem;
            padding: 0.34rem 13.5%;
          }
          .buy-btn {
            background-image: url(//static.lianhaikeji.com/images/20190715/0a6cc0956e33433bb41a397338160b2e.png);
          }
        }
        &:nth-of-type(2) {
          .buy-btn {
            background-image: url(//static.lianhaikeji.com/images/20190715/ff1290877ca445e180212d9780b4e45e.png);
          }
        }
        &:nth-of-type(3) {
          .buy-btn {
            background-image: url(//static.lianhaikeji.com/images/20190715/a83cc9156ed94d8fa6f247678ccafc4f.png);
          }
        }
      }
    }
    .btn-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 88%;
      height: 1.06rem;
      margin: 0.84rem 6%;
      > div {
        width: 45.4%;
        height: 1.06rem;
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .rule-btn {
        background-image: url(//static.lianhaikeji.com/images/20190715/cb86b69519b243ac980b916a10b2a8d2.png);
      }
      .welfare-btn {
        background-image: url(//static.lianhaikeji.com/images/20190715/2585d37e0b5445c495cb16718a8b70be.png);
      }
    }
  }
  .mint-popup {
    width: 77.33%;
    border-radius: 10px;
  }
  .popup-main {
    width: 100%;
    height: 6.8rem;
    .main-label {
      height: 0.82rem;
    }
    .convert-label {
      width: 50%;
      margin: 0.48rem 24.14% 0.3rem;
      background: url(//static.lianhaikeji.com/images/20190715/7d56aa48857046e5886ada3ebadcadfc.png)
        no-repeat;
      background-size: 100%;
    }
    .rule-label {
      width: 51.72%;
      background: url(//static.lianhaikeji.com/images/20190715/96da98ccca9f4395a1e9d723041bd854.png)
        no-repeat;
      background-size: 100%;
      margin: 0.48rem 24.14% 0.3rem;
    }
    .rule-desc {
      padding-left: 6.8%;
      padding-right: 6.2%;
      font-size: 0.28rem;
      color: #656565;
      line-height: 0.58rem;
      max-height: 4rem;
      overflow-y: auto;
    }
    .close-btn {
      position: absolute;
      width: 68.96%;
      height: 0.95rem;
      line-height: 0.95rem;
      text-align: center;
      background-color: #ffb532;
      color: #fff;
      font-size: 0.38rem;
      font-weight: bold;
      bottom: 0.48rem;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 8px;
    }
    .standard-img {
      display: inline-block;
      height: 1.56rem;
      margin: 0.52rem 0 0.48rem;
    }
    .pro-name,
    .card-pwd {
      width: 100%;
      line-height: 0.4rem;
      font-size: 0.36rem;
      color: #666;
      text-align: center;
      margin-bottom: 0.6rem;
    }
  }
  .pay-main {
    text-align: center;
  }
  .close-popup {
    width: 0.72rem;
    height: 0.73rem;
    position: absolute;
    left: 50%;
    bottom: -1rem;
    transform: translateX(-50%);
    background: url(//static.lianhaikeji.com/images/20190715/cca36b234c324700b18dfcdbfe53f438.png)
      no-repeat;
    background-size: 100%;
  }
}
</style>
