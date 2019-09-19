<template>
  <div>
    <!-- <cbbHeader title="绑卡返现"></cbbHeader> -->
    <div class="container">
      <div class="bg">
        <img src="./imgs/IMG_BG.png" alt="">
      </div>
      <div class="position">
        <div class="main">
          <div class="phoneNum">
            <span class="lable">手机号码</span>
            <span class="number">{{account}}</span>
          </div>
          <div class="huafei tag">
            话费充值
          </div>
          <div class="wrapper">
            <div class="title">
              选择面额
            </div>
            <div class="product" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
              <div class="product-item" v-for="(std, ind2) in product.standardList" :key="'std_'+std.id" @click="select(ind2, std.id)" :class="{'active': ind2 == index}">
                <div class="currentPrice">¥{{std.currentPrice}}元</div>
                <div>{{std.standardName}}</div>
              </div>
            </div>
          </div>

          <div class="tag">
            优惠码
          </div>
          <div class="ipt">
            <input type="text" v-model="couponNumber" placeholder="请输入优惠码">
          </div>
          <div class="btn" @click="doCharge">立即充值</div>
        </div>
        <div class="rule">
          <div class="title">
            活动规则
          </div>
          <div class="article" v-html="act.detail||'暂无说明'">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader'
import { Indicator, Toast } from 'mint-ui'
import { payUrl } from '@/config/'
import jssdk from '@/lib/jssdk'

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      index: -1,
      payUrl: payUrl,
      couponNumber: '',
      account: this.$store.state.cust.tel,
      merchantId: this.$store.state.merchantId,
      standardId: ''
    }
  },
  components: {
    cbbHeader
  },
  methods: {
    select (i, id) {
      this.index = i
      if (id) {
        this.standardId = id
      }
    },
    async doCharge () {
      if (!this.standardId) {
        Toast('请选择充值面额')
        return
      }
      if (!this.couponNumber) {
        Toast('请输入优惠码')
        return
      }
      Indicator.open()
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.standardId,
        commodityNum: 1,
        account: this.account,
        couponNumber: this.couponNumber
      })
      if (rs.status === 200) {
        Toast('充值成功')
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    }
  },
  mounted () {
    Indicator.open()
    this.$store.commit('setIsReady', false)
    jssdk.jssdk.init('', this.merchantId, '6', (val) => {
      this.$jssdk.call('disableShare')
      Indicator.close()
    })
  },
  watch: {
    '$store.state.isReady': function (val) {
      if (val) {
        this.$jssdk.call('disableShare')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: relative;
  .bg {
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .position {
    position: absolute;
    top: 4.68rem;
    left: 50%;
    transform: translateX(-50%);
    width: 92%;
  }
  .main {
    background: #fff;
    border-radius: 0.3rem;
    padding-bottom: 0.48rem;
    .phoneNum {
      position: relative;
      bottom: 0.7rem;
      width: 5.57rem;
      height: 1.49rem;
      line-height: 1.49rem;
      margin: 0 auto;
      background: url(./imgs/IMG_BG_SJHM.png) no-repeat;
      background-size: 100% auto;
      .lable {
        display: inline-block;
        height: 0.4rem;
        line-height: 0.4rem;
        vertical-align: 0.03rem;
        border-right: 1px solid #fff;
        color: rgb(251, 251, 230);
        font-size: 0.3rem;
        padding-right: 0.24rem;
        margin: 0 0 0 0.46rem;
      }
      .number {
        margin-left: 0.3rem;
        color: rgb(225, 238, 94);
        font-size: 0.36rem;
      }
    }
    .tag {
      width: 1.85rem;
      padding-left: 0.2rem;
      height: 0.62rem;
      margin-bottom: 0.18rem;
      line-height: 0.62rem;
      color: #fff;
      background: url(./imgs/IMG_TAB_BG.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.32rem;
    }
    .wrapper {
      margin: 0 0.44rem;
      .title {
        color: #666;
        font-size: 0.32rem;
        line-height: 0.9rem;
      }
      .product {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0.52rem;
        .product-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          // justify-content: center;
          /* min-width: 2.18rem;
          max-width: 2.4rem; */
          white-space: nowrap;
          height: 1.34rem;
          border: 1px solid rgb(156, 89, 185);
          padding: 0.2rem 0;
          margin-left: 0.25rem;
          margin-bottom: 0.25rem;
          border-radius: 0.1rem;
          color: rgb(156, 89, 185);
          font-size: 0.28rem;
          &:first-child {
            margin-left: 0;
          }
          .currentPrice {
            font-size: 0.44rem;
            margin-bottom: 0.14rem;
          }
        }
        .active {
          color: #fff;
          background: rgb(191, 55, 160);
          border: 1px solid rgb(191, 55, 160);
        }
      }
    }
    .huafei {
      margin-top: -0.4rem;
    }
    .ipt {
      text-align: center;
      margin-bottom: 0.52rem;
      input {
        width: 84%;
        padding-left: 0.2rem;
        height: 0.86rem;
        line-height: 0.86rem;
        color: #333;
        font-size: 0.28rem;
        border: 1px solid rgb(156, 89, 185);
        border-radius: 0.1rem;
      }
      ::-webkit-input-placeholder {
        color: rbg(202, 213, 223);
      }
    }
    .btn {
      width: 6.01rem;
      height: 1.04rem;
      margin: 0 auto;
      text-align: center;
      color: #fff;
      line-height: 1.04rem;
      background: url(./imgs/BTN_LJCZ.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.36rem;
    }
  }
}
.rule {
  .title {
    width: 2.25rem;
    height: 0.7rem;
    line-height: 0.7rem;
    color: #fff;
    text-align: center;
    margin: 0.68rem auto 0.44rem;
    font-size: 0.36rem;
    background: url(./imgs/IMG_BG_HDGZ.png) no-repeat;
    background-size: 100% 100%;
  }
  .article {
    // padding: 0 0.1rem;
    color: #fff;
    font-size: 0.3rem;
    line-height: 0.5rem;
  }
}
</style>
