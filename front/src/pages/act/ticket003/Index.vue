<template>
  <div>
    <div class="wrap" v-if="act">
      <div class="ticket-container">
        <div class="ticket-wrapper" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
          <div class="ticket-wrapper-content" v-for="(std , ind2) in product.standardList" :key="'std_'+ind2">
            <div class="coupon" :style="{ background: 'url(' + std.standardImgUrl + ') no-repeat center center/75% 100%'}">
            </div>
            <div class="toBePaid" v-if="!cardpwdList.length" @click="createOrder(std.id)">
            </div>
            <div class="familyCodeArea">
              券码区：
              <span v-if="cardpwdList.length"> {{cardpwdList[0].cardPwd}}</span>
              <span v-else>（支付后显示）</span>
            </div>
            <div class="promptText">
              * 鲜丰券码需在门店支付时展示使用
            </div>
            <div class="rule">
              <div class="content">
                活动时间：2019年5月27日-2019年7月7日<br>
                活动地区：杭州市<br>
                活动规则：<br>
                1.用户通过活动专属二维码或链接参与活动，可获得支付0.1元换购鲜丰水果抵用券资格。<br>
                2.融e联新用户（通过本次活动首次注册融e联的用户），支付0.1元可换购面值15元的鲜丰水果抵用券；融e联老用户，支付0.1元可换购面值10元的鲜丰水果抵用券。<br>
                3.在此页面完成验证的用户，需按照活动页面引导，前往融e联app支付0.1元，即可获取抵用券券码。<br>
                4.抵用券有效期至2019年7月31日，有效期内用户可在杭州市内任意一家鲜丰水果门店使用，只需在结账时向收银员展示券码即可；如超过有效期没有使用，视为用户自动放弃抵用券使用权利，0.1元换购费用将不予退回。<br>
                5.每位用户最多可换购一张抵用券，活动补贴金额45万元，先到先得<br>
                6.如在抵用券换购及使用过程中遇到任何问题，请咨询鲜丰水果门店店员，或拨打客服电话：4009626962。

              </div>
            </div>
            <div class="bottom">
              融e联记账本功能已上线，关联信使自动记账，随手选择分类，记录收支更方便。
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="shoupop" class="mypop" popup-transition="popup-fade">
      <div class="ruledetail">
        <div class="content2" v-if="showfruite">
          <span>您来晚啦，福利已发放完毕。<br>欢迎您下载使用融e联app，随时随地获取金融生活信息服务。全新记账本功能已上线，关联信使自动记账，记录收支更方便。如有疑问，请拨打客服热线4009626962</span>
        </div>
        <div class="content" v-if="showperson">
          <span>欢迎参与0.1元购鲜丰活动，您还未获取领券资格哦！请前往附近的鲜丰水果门店了解活动详情获取领券资格（活动仅限杭州地区）。如有疑问，请拨打客服热线4009626962</span>
        </div>
        <div class="know" @click="goback()"></div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Toast, Indicator, MessageBox, Popup } from 'mint-ui';
import { payUrl } from '@/config/';
import jssdk from '@/lib/jssdk';
import moment from 'moment';
import OrderState from '@/lib/OrderState';

export default {
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      merchantId: this.$store.state.merchantId,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 554689192 : 554197253, // 10元
      payUrl: payUrl,
      order: null,
      orderCode: '',
      canPay: false,
      cardpwdList: [],
      latestPayTime: null,
      latestPayTimeFormatted: '',
      ...OrderState,
      shoupop: false,
      act: null,
      showfruite: false,
      showperson: false
    };
  },
  methods: {
    goback () {
      window.history.go(-1);
      this.shoupop = false;
    },
    async createOrder (standardId) {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.secondActId,
        standardId: standardId,
        commodityNum: 1
      });
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          // let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`;
          let successUrl = `${window.location.protocol}//${
            window.location.host
          }/${this.$store.state.merchantAppid}/merchant/index/act/${
            this.secondActId
          }`;
          let payPath = `${payUrl}${
            rs.payload.prepayId
          }?redirectUrl=${encodeURIComponent(successUrl)}`;
          window.location.replace(payPath);
        } else {
          Toast('下单成功');
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${
              this.$store.state.merchantAppid
            }/merchant/index/order`
          );
        }
      } else if (rs.status == 500) {
        this.shoupop = true;
        this.showfruite = true;
      } else {
        Toast('订单生成失败:' + rs.error);
      }
      Indicator.close();
    },
    async loadOrder () {
      Indicator.open();
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.secondActId,
        status: ''
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        list.some((element, index) => {
          if (element.payState == this.PAY_STATE_PAID) {
            this.order = element;
            this.drawOrder();
            return true;
          }
          if (element.payState == this.PAY_STATE_CREATE) {
            // 如果是未支付且 订单未取消,计算剩余时间
            if (
              element.orderState == this.ORDER_STATE_CREATE &&
              element.payState == this.PAY_STATE_CREATE
            ) {
              let expireTime = element.expireTime;
              this.latestPayTime = moment(expireTime).valueOf();
              this.calcPayTime();
            }
            if (this.canPay) {
              MessageBox({
                message: '您有未完成订单，是否进入?',
                title: '提示',
                showCancelButton: true,
                cancelButtonText: '重新购买',
                confirmButtonText: '进入'
              }).then(action => {
                if (action == 'confirm') {
                  this.$router.push(
                    `/${this.$store.state.merchantAppid}/merchant/paysuccess/${
                      rs.payload.orderCode
                    }`
                  );
                }
              });
            }
            return true;
          }
        });
      }
      Indicator.close();
    },
    calcPayTime () {
      let d = (this.latestPayTime - new Date().getTime()) / 1000;
      let hour = parseInt(d / 3600);
      let minute = parseInt(parseInt(d % 3600) / 60);
      let second = parseInt(d % 60);
      this.latestPayTimeFormatted = `${hour}小时${minute}分${second}秒`;
      console.log(this.latestPayTimeFormatted);
      if (d > 0) {
        this.canPay = true;
        // this._expireInd = setTimeout(this.calcPayTime, 1000);
      } else {
        this.canPay = false;
      }
    },
    async checkPerson () {
      let rs = await this.$post('/api/icbce/getUserStatus');
      if (rs.status == 200) {
        if (rs.payload == 1) {
          this.secondActId = '554689192'; // 旧用户 10元
          this.loadAct(this.secondActId);
        } else if (rs.payload == 0) {
          this.secondActId = '554689413'; // 新用户 15元
          this.loadAct(this.secondActId);
        }
      } else if (rs.status == 501) {
        this.shoupop = true;
        this.showperson = true;
      } else {
        Toast(rs.error);
      }
    },
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
      }
    },
    async drawOrder () {
      // 检查账号格式
      Indicator.open();
      let rs = await this.$post('api/order/draw', {
        orderCode: this.order.orderCode,
        account: ''
      });
      if (rs.status == 200) {
        this.cardpwdList = JSON.parse(rs.payload.cardPwds);
        if (this.cardpwdList[0].cardPwd.indexOf('http') == 0) {
          window.location.href = this.cardpwdList[0].cardPwd;
        }
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  mounted () {
    Indicator.open();
    this.$store.commit('setIsReady', false);
    jssdk.jssdk.init('', this.merchantId, '6', val => {
      this.$jssdk.call('disableShare');
      Indicator.close();
    });
  },
  async created () {
    await this.checkPerson();
    this.loadOrder();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
  width: 100vw;
  min-height: 100vh;
  background: url(./imgs/bg.jpg) no-repeat;
  background-size: 100% 100%;
  padding-top: 4.35rem;
  overflow: auto;
  .ticket-container {
    width: 100%;
    .ticket-wrapper,
    .ticket-wrapper-content {
      width: 6.2rem;
      margin: 0 auto;
      /*background: url(./imgs/modal-bg.png) no-repeat;*/
      background-size: 100% 100%;
      & > .telphone {
        width: 100%;
        height: 1rem;
        /*text-indent: 1rem;*/
        display: flex;
        /*justify-content: center;*/
        align-items: center;
        background: url(./imgs/telphone.png) no-repeat left top/100% 100%;
        margin-bottom: 0.4rem;
        font-size: 0.36rem;
        color: #ad5d32;
        .label {
          width: 45%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        input {
          width: calc(100% - 45%);
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #ad5d32;
        }
      }
      & > .coupon {
        width: 100%;
        height: 1.8rem;
        /*background: url(./imgs/coupon.png) no-repeat center top/75% 100%;*/
        margin-bottom: 0.2rem;
      }
      & > .toBePaid {
        width: 6.01rem;
        height: 0.92rem;
        /*background: url(./imgs/telphone.png) no-repeat left top/100% 100%;*/
        background: url("./imgs/paybtn.jpg") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 0.4rem;
      }
      & > .familyCodeArea {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(./imgs/familyCodeArea.png) no-repeat left top/100% 100%;
        margin-bottom: 0.4rem;
        color: #c8713c;
        font-size: 0.34rem;
      }
      & > .promptText {
        color: #c8713c;
      }
    }
    .rules {
      .title {
        width: 3.07rem;
        height: 0.93rem;
        margin: 0.4rem auto 0.2rem;
        background: url(./imgs/rule.png) no-repeat;
        background-size: 100% 100%;
      }
      p {
        padding: 0.2rem;
        background: url(./imgs/gray-bg.png);
        background-repeat: repeat-y;
        margin: 0 0.2rem;
        line-height: 0.4rem;
      }
    }
  }
}
.mypop {
  background: transparent;
  top: 45%;
}
.ruledetail {
  width: 6.54rem;
  height: 5.07rem;
  background: url("./imgs/rulebg.png") no-repeat;
  background-size: 100% 100%;
  padding: 1.5rem 0.3rem 0.1rem;
  text-align: justify;
  .content {
    font-size: 0.3rem;
    color: rgb(181, 93, 43);
    line-height: 0.55rem;
    height: 2rem;
    overflow: scroll;
    text-indent: 0.3rem;
  }
  .content2 {
    font-size: 0.3rem;
    color: rgb(181, 93, 43);
    // line-height: 1.8rem;
    height: 3rem;
    overflow: auto;
    text-align: center;
    line-height: 0.55rem;
  }
  .know {
    width: 3.2rem;
    height: 0.88rem;
    background: url("./imgs/btnknow.png") no-repeat;
    background-size: 100% 100%;
    margin: 0rem auto;
  }
}
.rule {
  width: 6.54rem;
  margin: 0 auto;
  background: url(./imgs/rulebg.jpg) no-repeat;
  background-size: 100% 100%;
  padding: 1.2rem 0.4rem 0.2rem;
  min-height: 7.37rem;
  line-height: 0.5rem;
  .content {
    height: 5.4rem;
    width: 100%;
    overflow: scroll;
  }
}
.bottom {
  width: 6.3rem;
  height: 2.5rem;
  text-align: center;
  color: #5c981b;
  margin: 0.3rem auto 0;
  line-height: 0.5rem;
}
</style>
