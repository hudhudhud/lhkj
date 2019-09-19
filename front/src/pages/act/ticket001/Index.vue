<template>
  <div>
    <div class="wrap">
      <img class="banner" src="./img/ticket-bg.png" alt="">
      <div class="ticket-container">
        <div class="ticket-wrapper" v-for="(standard, ind) in standardList" :key="'standard'+ind">
          <div class="act-title-left">手机银行缴学费专享</div>
          <div class="ticket-name">
            <h1>{{standard.standardName}}</h1>
          </div>
          <div class="receive-title">
            <p>活动期内每位用户仅限领取1次</p>
          </div>
          <div class="ticket-item">
            <div class="ticket-pic"><img :src="standard.standardImgUrl" alt=""></div>
            <div class="receive-ticket">
              <p>前往畅享苏州兑换使用</p>
              <div class="receive-btn" @click="receiveTicket(standard.id)"></div>
            </div>
          </div>
          <div class="copy-cardCode">
            <div class="card-pwd" v-for="(card, ind) in cardpwdList" :key="'card'+ ind">
              <div class="cardLabel">卡密:</div>
              <div class="cardCode" :id="'cardPwd'+ ind">{{card.cardPwd}}</div>
              <div class="copy" ref="copy" data-clipboard-action="copy" :data-clipboard-target="'#cardPwd'+ ind" @click="coypTicketPwd()"></div>
              <div class="passTime">有效期至: {{card.PassTime}}</div>
            </div>
            <div class="spinner" v-if="loading">
              <mt-spinner type="triple-bounce"></mt-spinner>
            </div>
          </div>

        </div>
        <div class="rules">
          <div class="title">活动规则</div>
          <p v-html="act.detail"></p>
          <div class="btn" @click="openLink()">前往畅享苏州</div>
        </div>
      </div>
      <div class="massage" v-show="prizeInfoShow" @touchmove="touchMove($event)">
        <div class="main">
          <div class="show-ticket" v-show="showTicket">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      loading: false,
      copyBtn: null,
      clickFlag: true,
      cardpwdList: [],
      showTicket: false,
      prizeInfoShow: false,
      cardCodeShow: false,
      standardList: this.act.productList[0].standardList
    }
  },
  methods: {
    openLink () {
      window.location.replace('https://bkts.lianhaikeji.com/index.php/Ccbsz?user_id=1')
    },
    async receiveTicket (standardId) {
      if (!this.clickFlag) {
        return
      }
      if (this.loading) {
        return
      }
      this.loading = true
      let rs = await this.$post('/api/ticket_create_order', {
        standardId: standardId,
        actId: this.act.actId
      })
      if (rs.status == 200) {
        this.clickFlag = false
        this.cardpwdList = JSON.parse(rs.payload.cardPwds)
        this.$nextTick(() => {
          this.copyBtn = new this.Clipboard(this.$refs.copy[0])
        })
      } else {
        this.clickFlag = true
        Toast(rs.error)
      }
      this.loading = false
    },
    coypTicketPwd () {
      let _this = this
      let clipboard = _this.copyBtn
      clipboard.on('success', function () {
        Toast('复制成功!')
      })
      clipboard.on('error', function () {
        Toast('复制失败，请手动选择复制!')
      })
    }
  },
  created () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
  background: #0c75ce;
  .banner {
    width: 100%;
  }
  .massage {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .main {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .show-ticket {
        width: 6rem;
        height: 5rem;
        background: url(./img/modal-bg.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .ticket-container {
    position: absolute;
    top: 5.35rem;
    width: 100%;
    /*  left: 0;
    right: 0; */

    .ticket-wrapper {
      height: 5.47rem;
      border-radius: 0.28rem;
      width: 6.76rem;
      margin: 0 auto;
      .act-title-left {
        position: relative;
        top: 0.2rem;
        width: 2.8rem;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.12rem;
        font-weight: 700;
        color: #fff;
        background: url(./img/title-bg.png) no-repeat;
        background-size: 100% 100%;
      }
      .ticket-name {
        h1 {
          font-size: 0.36rem;
          color: #003c8f;
          text-align: center;
          padding-top: 0.14rem;
        }
      }
      .receive-title {
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.2rem;
        color: #666;
      }
      .ticket-item {
        height: 1.42rem;
        display: flex;
        justify-content: center;
        margin-top: 0.4rem;
        .ticket-pic {
          img {
            display: block;
            width: 2.78rem;
            height: 1.42rem;
            margin-right: 0.43rem;
          }
        }
        .receive-ticket {
          display: flex;
          padding: 0.07rem 0;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
          p {
            font-size: 0.26rem;
            color: #585a5d;
            line-height: 0.4rem;
          }
          .receive-btn {
            height: 0.5rem;
            width: 1.8rem;
            background: url("./img/receive-btn.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .cardLabel {
        line-height: 0.46rem;
      }
      .copy-cardCode {
        display: flex;
        padding-left: 0.89rem;
        padding-top: 0.36rem;
        .card-pwd {
          display: flex;
          flex-wrap: wrap;
          line-height: 0.6rem;
          .cardCode {
            min-width: 2.6rem;
            border-radius: 0.06rem;
            height: 0.46rem;
            line-height: 0.46rem;
            background: #939393;
            text-align: center;
            padding: 0 0.1rem;
          }
          .copy {
            width: 0.74rem;
            margin-left: 0.1rem;
            height: 0.45rem;
            background: url("./img/copy-btn.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .rules {
      .title {
        text-align: center;
        margin-top: 0.46rem;
        font-size: 0.36rem;
        color: #fff;
      }
      p {
        width: 6.0832rem;
        /* text-align: center; */
        margin: 0 auto;
        padding-top: 0.38rem;
        color: #fff;
        line-height: 0.4rem;
      }
      .btn {
        width: 4.5rem;
        margin: 0 auto 0.4rem;
        font-size: 0.4rem;
        color: #fff;
        height: 0.88rem;
        background: url(./img/big-btn.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 0.36rem;
        text-align: center;
        line-height: 0.84rem;
      }
    }
  }
}
</style>
