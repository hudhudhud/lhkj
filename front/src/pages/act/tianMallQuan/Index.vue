<template>
  <div class="position-wrapper">
    <back></back>
    <!-- <div class="position-wrapper" @touchmove="touchMove($event)"> -->
    <div class="header"></div>
    <div class="boc-login">
      <div class="bg">
        <img src="./imgs/IMG_BG_2@2x.png" alt="">
      </div>
      <div class="login-form">
        <input type="text" v-model="username" placeholder="请输入客户号" />
        <div class="info">{{error}}</div>
        <div class="wrapper">
          <div class="btn" @click="referClientNumber">
          </div>
          <!--  <div class="chance">
            <div></div>
            <span>剩余<b>11</b>次</span>
            <div></div>
          </div> -->
        </div>
      </div>
      <div class="dialog" v-if="openDialog">
        <div class="main">
          <input type="text" v-model="account" id="">
          <div class="comfirm" @click="recharge">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      openDialog: false,
      username: '',
      error: '',
      orderCode: '',
      account: ''
    }
  },
  methods: {
    async referClientNumber () {
      if (!this.username) {
        Toast('请输入客户号')
        return
      }
      Indicator.open()

      let rs = await this.$post('api/access/actverify', {
        actId: this.act.actId,
        accessCode: this.username
      })
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/getResult', {})
      if (rs.status == 200) {
        this.error = ''
        this.createOrder()
      } else {
        this.error = rs.error
      }
      Indicator.close()
    },
    async createOrder () {
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.act.productList[0].standardList[0].id,
        commodityNum: 1
      })
      if (rs.status === 200) {
        this.orderCode = rs.payload.orderCode
        this.openDialog = true
      } else {
        Toast(rs.error)
      }
    },
    touchMove (e) {
      e.preventDefault()// 禁止滚动
      e.stopPropagation()
    },
    async recharge () {
      // 检查账号格式
      if (!this.account) {
        Toast('请输入您的淘宝会员名')
        return
      }
      let rs = await this.$post('api/order/draw', {
        orderCode: this.orderCode,
        account: this.account
      })
      if (rs.status == 200) {
        Toast('已提交充值')
        this.openDialog = false
      } else {
        Toast(rs.error)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.boc-login {
  position: relative;
  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: 100% auto;
  }
  .bg img {
    display: block;
    border: none;
    width: 100%;
  }
  .login-form {
    position: absolute;
    top: 7.3rem;
    width: 5.72rem;
    left: 50%;
    margin-left: -2.86rem;
    .info {
      color: rgb(242, 26, 26);
      font-size: 0.26rem;
      text-align: center;
    }
    .wrapper {
      width: 4.68rem;
      margin: 0 auto;
      .btn {
        width: 4.68rem;
        height: 1.14rem;
        border-radius: 0.1rem;
        margin: 0.58rem auto 0.28rem;
        background: url(./imgs/BTN_PURCHASE@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      .chance {
        display: flex;
        align-items: center;
        line-height: 0.3rem;
        flex-wrap: nowrap;
        div {
          width: 1.52rem;
          border-bottom: 1px solid;
        }
        span {
          padding: 0 0.2rem;
          font-size: 0.26rem;
          white-space: nowrap;
          b {
            color: rgb(242, 26, 26);
            padding: 0 0.08rem;
          }
        }
      }
    }

    input {
      width: 100%;
      line-height: 0.85rem;
      padding: 0 0.2rem;
      border-radius: 0.1rem;
      font-size: 0.28rem;
      color: #fff;
      margin: 0 auto 0.26rem;
      color: #333;
      background: url(./imgs/IP_NUMBER.png) no-repeat;
      background-size: 100% 100%;
    }
    .rule {
      width: 1.6rem;
      line-height: 0.56rem;
      color: #b50029;
      border: 1px solid #b50029;
      background: #fff;
      text-align: center;
      font-size: 0.3rem;
      border-radius: 0.12rem;
      margin: 0 auto;
    }
  }
  .dialog {
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
      width: 6.03rem;
      position: absolute;
      height: 4.76rem;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      background: url(./imgs/IMG_POP_BG@2x.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.28rem;
      line-height: 0.4rem;
      box-sizing: border-box;
      input {
        width: 4.76rem;
        height: 0.74rem;
        line-height: 0.74rem;
        padding-left: 0.2rem;
        font-size: 0.28rem;
        margin: 2rem 0 0 0.48rem;
        background: url(./imgs/IP_POP_NAME@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      .comfirm {
        width: 3.88rem;
        height: 0.96rem;
        margin: 0.58rem auto 0;
        background: url(./imgs/BTN_POP_SUB@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
