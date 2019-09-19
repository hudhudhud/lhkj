<template>
  <div
    class="seckill"
    :class="{active:PopupFlag || Popuptip || custPopOpen || Popupcode || Popuptip2}"
  >
    <back></back>
    <div
      v-if="templateConfig.banner"
      class="banner"
      :class="{active:PopupFlag || Popuptip || custPopOpen || Popupcode ||Popuptip2}"
    >
      <img
        class="banner-img"
        :src="templateConfig.banner"
      >
    </div>
    <div
      class="seckill-container"
      :class="{active:PopupFlag || Popuptip || custPopOpen || Popupcode || Popuptip2}"
    >
      <div
        class="rule"
        @click="PopupFlag=true"
      ></div>
      <div
        class="liucheng"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/longkaCode/rule`)"
      ></div>
      <div
        class="share"
        v-if="inWX=='app'"
        @click="ccbShare"
      >分享</div>
      <template v-if="timeStatus">
        <TimerMap
          :act="act"
          @open-message="openMessage"
        ></TimerMap>
      </template>
      <div class="tip">每个客户每月限享2次优惠</div>
      <div class="tarbar">
        <div
          class="tarbar-item"
          v-for="(item,i) in list"
          :key="i"
        ><a :href="`#${item.pronum}`">{{item.proname}}</a> </div>
      </div>
      <div class="tip tipbak">微信绑定建设银行信用卡支付，享5折购买优惠。</div>
      <div class="tip tipbak1">*非建行信用卡支付不享受5折优惠，支付成功后系统将不会退还，请确认购买商品及支付方式后再进行操作。</div>
      <div class="seckill-wrapper">
        <div
          class="linkPlate"
          v-for="(product,ind) in act.productList"
          :key="'pro_'+ind"
          :id="list[ind].pronum"
        >
          <div class="plate-title">{{list2[ind]}}</div>
          <div class="plate-std">
            <div
              class="plate-item"
              v-for="(std, ind2) in product.standardList"
              :key="'std_'+ind2"
            >
              <div class="plate-info">
                <div class="item-img">
                  <img :src="std.standardImgUrl">
                </div>
                <div class="item-detail">
                  <div class="proName">
                    {{std.standardName}}
                  </div>
                  <div class="light">折后价：<span> {{std.originalPrice}} 元</span></div>
                  <div class="store">剩余:{{std.surplusStock || 0}}件</div>
                </div>
                <div class="item-btn">
                  <div class="btn"><span
                      v-if="inWX=='WX'"
                      @click="onTime?loadOrder(std):actBegintip=true"
                    >立即抢购</span> <span
                      v-if="inWX=='app'"
                      @click="Popupcode = true;"
                    >参与活动</span> </div>
                  <div
                    class="usetips"
                    @click="showUseTips(std)"
                  >
                    <span>商品说明</span>
                    <img
                      src="./imgs/arrow.png"
                      alt=""
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
    <mt-popup
      v-model="PopupFlag"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="ruledetail">
        <h1>活动规则</h1>
        <div
          class="content"
          v-html="act.detail"
        >
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="Popupcode"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="code">
        <div
          class="btnsure"
          @click="$router.push(`/${$store.state.merchantAppid}/merchant/longkaCode/index`)"
        ></div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="Popuptip2"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="tip2">
        <div class="tipfont"><img
            src="./imgs/tipfont.png"
            alt=""
          ></div>
        <div
          class="btnknow"
          @click="Popuptip2=false"
        ><img
            src="./imgs/btnknow.png"
            alt=""
          ></div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="actBegintip"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="actBegintip">
        <div class="acttip">第一期活动已结束，<br>敬请期待第二期活动！！</div>
        <div
          class="btnknow"
          @click="actBegintip=false"
        ><img
            src="./imgs/btnknow.png"
            alt=""
          ></div>
      </div>
    </mt-popup>
    <div
      class="Popuptip"
      v-if="Popuptip"
    >
      <div class="tipdetail">
        <div class="tiptop"><img
            src="./imgs/tiptop.png"
            alt=""
          ></div>
        <div class="tippic1"><img
            src="./imgs/tip1.jpg"
            alt=""
          ></div>
        <template>
          <div
            class="tippic2"
            v-if="showyouku"
          ><img
              src="./imgs/tipyouku.jpg"
              alt=""
            ></div>
          <div
            class="tippic2"
            v-else
          ><img
              src="./imgs/tip2.png"
              alt=""
            ></div>
        </template>
        <div class="tippic4"><img
            src="./imgs/tip4.jpg"
            alt=""
          ></div>
        <div class="tippic3"><img
            src="./imgs/tip3.png"
            alt=""
          ></div>
        <div class="tip-group">
          <div @click="Popuptip=false,showyouku=false"></div>
          <div @click="gotoPay()"></div>
        </div>
      </div>
    </div>

    <custDialog
      ref="custDialog"
      :secondTitle="currentName"
    >
      <div
        class="dialog-content"
        v-html="currentTips"
      ></div>
    </custDialog>
  </div>
</template>

<script>
import { Toast, Spinner, Popup, Indicator } from 'mint-ui';
import { payUrl } from '@/config/';
import TimerMap from './components/TimerMap';
import custDialog from './components/dialog';
import OrderState from '@/lib/OrderState';
export default {
  components: {
    [Spinner.name]: Spinner,
    custDialog,
    TimerMap,
    [Popup.name]: Popup
  },
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      Popupcode: false,
      Popuptip: false,
      PopupFlag: false,
      custPopOpen: false,
      onTime: false,
      actBegintip: true,
      payUrl,
      templateConfig: JSON.parse(this.act.templateConfig),
      storeMap: {},
      list: [
        { proname: '5折购物', pronum: 'a01' },
        { proname: '5折餐饮', pronum: 'a02' },
        { proname: '5折影视', pronum: 'a03' }
      ],
      list2: ['欢畅购物', '餐饮盛宴', '影视娱乐'],
      prepayId: '',
      timeStatus: {},
      currentName: '',
      currentTips: '',
      inWX: '',
      showyouku: false,
      ...OrderState,
      nopay: false,
      Popuptip2: false,
      timer: ''
    };
  },
  methods: {
    async loadOrder (standard) {
      if (standard.surplusStock == 0) {
        this.Popuptip2 = true;
        return;
      }
      Indicator.open();
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.act.actId,
        status: ''
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        let result = list.some(element => {
          if (element.payState == this.PAY_STATE_PAID) {
            this.order = element;
            console.log('order', element);
            return true;
          }
          if (element.payState == this.PAY_STATE_CREATE) {
            console.log('order', this.order);
            // 如果是未支付且订单未取消,提示有未完成订单
            if (
              element.orderState == this.ORDER_STATE_CREATE &&
              element.payState == this.PAY_STATE_CREATE
            ) {
              this.nopay = true;
            } else {
            }
          }
        });
        console.log(result);
        if (!this.nopay) {
          this.kill(standard);
        } else {
          Toast('您有未支付订单，请先完成支付或取消订单！');
          this.timer = setTimeout(() => {
            window.location.replace(
              `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`
            );
          }, 2000);
        }
      }
      Indicator.close();
    },
    async kill (standard) {
      Indicator.open();
      if (this.timeStatus.isInTime) {
        let rs = await this.$post('api/createOrder/', {
          actId: this.act.actId,
          standardId: standard.id,
          commodityNum: 1
        });
        if (rs.status === 200) {
          if (rs.payload.is_pay == '1') {
            this.prepayId = rs.payload.prepayId;
            this.Popuptip = true;
            this.orderCode = rs.payload.orderCode;
            if (standard.id == '1506') {
              this.showyouku = true;
            }
          } else {
            Toast('支付成功');
          }
        } else {
          Toast('支付失败:' + rs.error);
        }
      } else {
        Toast('活动未开启！');
      }
      Indicator.close();
    },
    gotoPay () {
      if (this.prepayId) {
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`;
        Toast('订单已生成...正在跳转支付');
        let payPath = `${payUrl}${
          this.prepayId
        }?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payPath);
      }
      this.showyouku = false;
    },
    openMessage (payload) {
      this.timeStatus = payload;
    },
    showUseTips (std) {
      this.$refs.custDialog.open();
      this.custPopOpen = true;
      this.currentName = std.standardName;
      this.currentTips = std.standardInstruction;
    },
    ccbShare () {
      let url = window.location.href.replace(window.location.search, '');
      var dict = [];
      dict['scheme'] = 'ccbwebapi';
      dict['operation'] = 'webshare';
      dict['title'] = '缤纷购';
      dict['description'] = '点击参与';
      dict['url'] = encodeURIComponent(url);
      dict['imageurl'] =
        'http://static.lianhaikeji.com/images/20181229/c0b12863b615462d8fb6cf7141658a0b.jpeg';
      this.callNative(dict);
    },
    callNative (dict) {
      var para = this.makeParas(dict);
      this.executeCallIframe(
        dict['scheme'] + '://' + dict['operation'] + '?' + para
      );
    },
    executeCallIframe (url) {
      // 构造调用客户端分享功能的请求
      let iframe = null;
      if (iframe == null) {
        iframe = document.createElement('IFRAME');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      iframe.setAttribute('src', url);
    },
    makeParas (dict) {
      // 构造URL请求参数字符串
      var para = '';
      for (var key in dict) {
        if (key != 'scheme' && key != 'operation') {
          para = para + key + '=' + dict[key] + '&';
        }
      }
      para = para.substr(0, para.length - 1);
      return para;
    }
  },
  mounted () {
    if (navigator.userAgent.indexOf('MicroMessenger') > 0) {
      // 微信端
      this.inWX = 'WX';
    } else {
      // app端
      this.inWX = 'app';
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  background: #fff;
  position: relative;
  .swipe-wrapper {
    height: 3.08rem;
    img {
      width: 100%;
    }
  }
  .seckill-container {
    width: 100%;
    padding-top: 3.8rem;
    background: #4bd9be url(./imgs/bg.png) no-repeat;
    background-size: 100% auto;
    position: relative;
    .tip {
      width: 100%;
      text-align: center;
      font-size: 0.28rem;
      color: rgb(14, 116, 105);
      line-height: 0.5rem;
    }
    .tipbak1 {
      font-size: 0.22rem;
      line-height: 0.35rem;
      color: rgb(244, 52, 69);
      text-align: left;
      padding: 0 0.2rem;
    }
    .tipbak {
      width: 100%;
      text-align: center;
      line-height: 0.7rem;
      font-size: 0.32rem;
      color: rgb(249, 198, 75);
      text-shadow: 0.05rem 0.02rem 0.06rem #000;
      font-weight: 600;
    }
    .rule {
      width: 1.59rem;
      height: 0.55rem;
      background: url("./imgs/rule.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0.7rem;
      right: 0rem;
    }
    .share {
      width: 1.59rem;
      height: 0.55rem;
      line-height: 0.6rem;
      text-align: center;
      background: rgba(50, 117, 57, 0.8);
      position: absolute;
      top: 2rem;
      right: 0rem;
      color: #fff;
      border-top-left-radius: 0.3rem;
      border-bottom-left-radius: 0.3rem;
    }
    .liucheng {
      width: 1.59rem;
      height: 0.55rem;
      background: url("./imgs/liucheng.jpg") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 1.3rem;
      right: 0rem;
    }
    .tarbar {
      width: 100%;
      height: 0.73rem;
      display: flex;
      justify-content: space-around;
      margin: 0.2rem auto 0.3rem;
      &-item {
        width: 1.85rem;
        height: 0.73rem;
        background: url("./imgs/btnclick.png") no-repeat;
        background-size: 100% 100%;
        font-size: 0.32rem;
        color: #fff;
        text-align: center;
        line-height: 0.73rem;
      }
    }
    .ad {
      margin: 0 0.24rem;
    }
    .title {
      padding-top: 0.4rem;
      height: 0.87rem;
      background-size: 100% 100%;
      background-position-x: -0.04rem;
      color: #fff;
      font-size: 0.28rem;
      text-align: center;
      font-weight: 700;
    }
    .seckill-wrapper {
      .linkPlate {
        width: 7.42rem;
        height: 7.13rem;
        background: url("./imgs/itembg.jpg") no-repeat -0.07rem;
        background-size: 100% 100%;
        padding-top: 0.01rem;
        .plate-title {
          width: 100%;
          font-size: 0.38rem;
          letter-spacing: 0.04rem;
          color: #ffffff;
          font-weight: 600;
          text-align: center;
          margin: 0.3rem auto 0.6rem;
        }
        .plate-std {
          width: 6.51rem;
          height: 5.3rem;
          margin: 0rem auto;
          overflow: hidden;
          .plate-item {
            width: 6.51rem;
            height: 1.54rem;
            margin: 0.1rem auto 0.2rem;
            text-align: center;
            .plate-info {
              display: flex;
              width: 6.51rem;
              height: 1.54rem;
              border-radius: 0.1rem;
              background: url("./imgs/probg.png") no-repeat;
              background-size: 100% 100%;
              align-items: center;
              .item-img {
                flex: 1;
                font-size: 0;
                max-width: 1.2rem;
                margin-right: 5%;
                background-size: 100%;
                border-radius: 50%;
                img {
                  width: 1.2rem;
                  margin-left: 0.4rem;
                }
              }
              .item-btn {
                white-space: nowrap;
                height: 1.54rem;
                .btn {
                  width: 1.69rem;
                  height: 0.54rem;
                  background-color: #ff4956;
                  border-radius: 0.27rem;
                  font-size: 0.28rem;
                  color: #ffffff;
                  line-height: 0.54rem;
                  text-align: center;
                  margin: 0.2rem;
                }
                .usetips {
                  font-size: 0.22rem;
                  color: #9b9c9c;
                  padding-top: 0.16rem;
                  text-align: center;
                  margin: 0 auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img {
                    margin-left: 0.05rem;
                    margin-top: -0.02rem;
                    display: inline-block;
                    transform: scale(0.6);
                  }
                }
              }
              .item-detail {
                flex: 2;
                height: 1.54rem;
                text-align: left;
                margin-left: 0.4rem;
                .light {
                  font-size: 0.24rem;
                  color: #9b9c9c;
                  margin: 0.15rem;
                  span {
                    color: #f41818;
                  }
                }
                .store {
                  font-size: 0.23rem;
                  letter-spacing: 1px;
                  color: #6a6a6a;
                }
                .proName {
                  color: #222;
                  margin-top: 0.25rem;
                  margin-bottom: 0.1rem;
                  font-size: 0.28rem;
                  white-space: nowrap;
                  font-weight: 600;
                }
                .proDesc {
                  text-decoration: line-through;
                  font-size: 0.22rem;
                  line-height: 0.5rem;
                }
              }
            }
          }
        }
      }
    }
    .bottom {
      width: 100%;
      height: 1.17rem;
      background: url("./imgs/bottom.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
.active {
  height: calc(100vh - 1.1rem);
  overflow: hidden;
}
.banner-img {
  display: block;
  max-width: 100%;
}
.running-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}
.running {
  position: fixed;
  z-index: 1988;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  background: #fff;
  padding: 1rem 0.4rem;
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.5rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.gray-btn {
  filter: grayscale(100%);
}
.ruledetail {
  width: 6.32rem;
  height: 7.93rem;
  background: url("./imgs/rulebg.png") no-repeat;
  background-size: 100% 100%;
  text-align: left;
  padding-top: 0.01rem;
  h1 {
    width: 100%;
    font-size: 0.42rem;
    margin: 1.2rem auto 0.7rem;
    text-align: center;
    color: #fff;
  }
  .content {
    width: 100%;
    height: 5rem;
    padding: 0.1rem 0.4rem;
    font-size: 0.26rem;
    color: #3a3a3a;
    line-height: 0.45rem;
    margin: 0.3rem auto;
    overflow: scroll;
  }
}
.tipdetail {
  width: 6.69rem;
  height: 9rem;
  padding-top: 0.01rem;
  background: #fff;
  position: relative;
  background: url("./imgs/tipbg.png") no-repeat;
  background-size: 100% 100%;
  margin: 1rem auto;
  .tiptop {
    width: 3.73rem;
    height: 1.06rem;
    margin: -0.3rem auto 0;
    img {
      width: 100%;
    }
  }
  .tippic1 {
    width: 4.57rem;
    height: 0.74rem;
    margin: 0.1rem auto;
    img {
      width: 100%;
    }
  }
  .tippic2 {
    width: 6.27rem;
    height: 4.44rem;
    margin: 0.1rem auto;
    img {
      width: 100%;
    }
  }
  .tippic3 {
    width: 5.67rem;
    height: 0.91rem;
    margin: 0.1rem auto;
    img {
      width: 100%;
    }
  }
  .tippic4 {
    width: 5.9rem;
    height: 0.24rem;
    margin: 0.2rem auto;
    img {
      width: 100%;
    }
  }
  .tip-group {
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    height: 1rem;
    justify-content: space-around;
    background: transparent;
    div {
      width: 50%;
      height: 0.68rem;
      text-align: center;
      line-height: 0.68rem;
    }
  }
}
.mypop {
  background: transparent;
  top: 45%;
}
.Popuptip {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  padding-top: 0.001rem;
}
.code {
  width: 6.56rem;
  height: 7.67rem;
  background: url("./imgs/codebg.jpg") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  position: relative;
  .btnsure {
    width: 4.75rem;
    height: 0.96rem;
    background: url("./imgs/btnsure.jpg") no-repeat;
    background-size: 100% 100%;
    margin: 3rem auto 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.7rem;
    margin: auto;
  }
}
.tip2 {
  width: 7.5rem;
  height: 5.53rem;
  background: url("./imgs/tip2bg.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  .tipfont {
    width: 100%;
    text-align: center;
    height: 1.42rem;
    margin: 0.8rem auto 2rem;
    img {
      width: 4.59rem;
    }
  }
  .btnknow {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    img {
      width: 3.06rem;
    }
  }
}
.actBegintip {
  width: 7.45rem;
  height: 6.4rem;
  background: url("./imgs/acttipbg.png") no-repeat;
  background-size: 100% auto;
  padding-top: 1.2rem;
  position: relative;
  .acttip {
    width: 100%;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.4rem;
    color: #555454;
  }
  .btnknow {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    position: absolute;
    bottom: 0.4rem;
    img {
      width: 3.06rem;
    }
  }
}
</style>
