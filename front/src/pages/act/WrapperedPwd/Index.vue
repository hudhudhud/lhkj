<template>
  <div class="wrappered">
    <div class="wrappered-tips" v-show="false">
      <p class="wrappered-tips-title">温馨提示：</p>
      <p>花加包月套餐×4束</p>
      <p>有效期：2019年12月06日前有效</p>
    </div>
    <div class="wrappered-title"></div>
    <div class="wrappered-content">
      <p>您的兑换码为</p>
      <div class="code" v-if="pwd">
        <span id="pwdTxt">{{pwd}}</span>
        <a class="code-action copy"
              ref="copy"
              data-clipboard-action="copy"
              data-clipboard-target="#pwdTxt"
              @click="copy($event)">
          复制</a>
      </div>
      <div class="code">
        {{msg}}
      </div>
      <div class="wrappered-content-action" v-if="pwd" @click="toExchange"></div>
    </div>
    <div class="wrappered-rule">
      <h3>温馨提示：</h3>
      <p v-html="act.detail"></p>
      <!--<p>1．“花加”包月花束套餐为“MINIPLUS”套餐：每月共4束，默认隔周配送。鲜花为季节性商品，由“花加”花艺师设计搭配，无法指定品种；</p>-->
      <!--<p>2．套餐有效期为2019年12月6日，请在此日期前兑换；</p>-->
      <!--<p>3．套餐相关服务由“FIOWERPLUS花加”提供，有关套餐详情以“FIOWERPLUS花加”对外公告为准。</p>-->
      <!--<p>4．兑换过程中如有疑问，请拨打咨询电话：400-9626962 （周一至周六9:00-22:00）</p>-->
    </div>
    <!--<div v-if="pwd" class="pwd">-->
    <!--<div v-if="cardNo">卡号:<br>{{cardNo}}</div>-->
    <!--<div v-if="pwd">卡密:<br>{{pwd}}</div>-->
    <!--</div>-->
    <!--<div v-if="msg">msg:{{msg}}</div>-->
  </div>
</template>

<script>
import {Indicator} from 'mint-ui'

export default {
  props: {
    setting: {
      require: true
    },
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      code: '',
      msg: '',
      cardNo: '',
      pwd: ''
    }
  },
  methods: {
    async checkCode () {
      Indicator.open()
      let rs = await this.$post('api/create/link_coupon_order', {
        couponNumber: this.code
      })
      if (rs.status == 200) {
        let payload = rs.payload
        let cardPwds = JSON.parse(payload.cardPwds)
        if (cardPwds.length == 1) {
          if (cardPwds[0].cardPwd.indexOf('http') == 0) {
            window.location.replace(cardPwds[0].cardPwd)
          } else {
            this.pwd = cardPwds[0].cardPwd
            this.cardNo = cardPwds[0].cardNo
          }
        } else {
          this.msg = '暂不支持多张卡密'
        }
      } else {
        this.msg = rs.error
      }
      Indicator.close()
    },
    toExchange () {
      window.location.href = 'http://t.flowerplus.cn/dh'
    },
    copy (e) {
      let clipboard = new this.Clipboard(e.target);
      clipboard.on('success', () => {
        this.$toast('复制成功!');
      });
      clipboard.on('error', () => {
        this.$toast('复制失败，请手动选择复制!');
      });
    }
  },
  created () {
    if (this.$route.query.sn) {
      this.code = this.$route.query.sn
      this.checkCode()
    } else {
      this.msg = '无效链接'
    }
  }
}
</script>

<style scoped lang="scss">
  .wrappered {
    position: relative;
    overflow: hidden;
    background: #fff;
    width: 100%;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 3.49rem;
      height: 2.84rem;
      display: block;
      background-image: url("./img/flower_top.png");
      background-size: 100% 100%;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 3.04rem;
      height: 2.76rem;
      display: block;
      background-image: url("./img/flower_bottom.png");
      background-size: 100% 100%;
    }

    &-tips {
      margin-top: 1.38rem;
      margin-left: 0.6rem;

      p {
        font-size: 0.26rem;
        color: #6d6d6d;
        line-height: 1.2;
      }

      &-title {
        font-size: 0.28rem;
        color: #000;
        margin-bottom: 0.15rem;
      }
    }

    &-title {
      width: 5.11rem;
      height: 0.61rem;
      margin: 2rem auto 0.65rem;
      background-image: url('./img/flower_title.png');
      background-size: 100% 100%;
    }

    &-content {
      width: 5.72rem;
      height: 5.72rem;
      margin: 0 auto;
      text-align: center;
      border: 0.01rem solid #b55752;
      p {
        color: #000;
        font-size: 0.48rem;
        margin-top: 0.89rem;
      }

      .code {
        margin-top: 0.7rem;
        font-size: 0.48rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;

        &-action {
          font-size: 0.28rem;
          color: #fff;
          background: #e6abad;
          margin-left: 0.3rem;
          display: inline-block;
          padding: 0.1rem 0.2rem;
          border-radius: 0.2rem 0.2rem;
        }
      }

      &-action {
        width: 3.36rem;
        height: 0.85rem;
        background-image: url('./img/action.png');
        background-size: 100% 100%;
        margin: 1.05rem auto;
      }
    }

    &-rule{
      width: 5.72rem;
      margin: 0.3rem auto 0.7rem;
      padding-bottom: 2rem;
      h3{
        margin-bottom: 0.3rem;
      }
      p{
        line-height: 1.2;
        font-size: 0.28rem;
        color: #222;
        text-align: justify;
      }
    }
  }

  .pwd {
    margin: 1rem;
    padding: 0.3rem;
    background: #fff;
    line-height: 0.5rem;
    text-align: left;
  }

  @media screen and (min-height: 812px) {
    .wrappered-content {
      margin: 1.5rem auto 0;
    }
  }
</style>
