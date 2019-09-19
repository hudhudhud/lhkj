<template>
  <div class="out-box">
    <back></back>
    <div class="my-booking" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=${actId}`)">
      我的预定</div>
    <div class="container">
      <div class="page-title">
        中国银行手机银行运动主题日
      </div>
      <div class="img-box"></div>
      <div class="act-tip">
        7月11日——9月30日<br />
        8:00-10:00，10:00-12:00(每周六)<br />
        两小时运动预定
      </div>
      <div class="btn-bar">
        <div class="rule-btn" @click="isRule = true;"></div>
        <div class="booking" @click="openBooking"></div>
      </div>
    </div>
    <transition name="fade">
      <div class="dialog-mask" v-if="isRule">
        <div class="main">
          <div class="rule-title">活动规则</div>
          <div class="close-btn" @click="isRule = false;"></div>
          <div class="act-desc">
            <div class="desc-item" v-for="str in desc" :key="str.title">
              <label>{{str.title}}</label>
              <span>{{str.content}}</span>
            </div>
            <div class="desc-item act-rule">
              <label>活动说明：</label>
              <span v-html="actDetail.detail"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-mask" v-if="isBooking">
        <div class="main booking-main">
          <div class="rule-title">
            订单填写
            <span>可预约:{{surplusStock?surplusStock:0}}</span>
          </div>
          <div class="close-btn" @click="isBooking = false;"></div>
          <div class="booking-form">
            <!-- 姓名 -->
            <div class="input-box">
              <input class="real-input" type="text" v-model="form.name" placeholder="请输入你的姓名">
            </div>
            <!-- 手机 -->
            <div class="input-box">
              <input class="real-input" type="text" v-model="form.mobile" placeholder="请输入你的手机号">
            </div>
            <!-- 时间 -->
            <div class="input-box">
              <!-- <input class="real-input" type="text" v-model="form.drawTime" placeholder="请选择你预定的时间"> -->
              <select class="real-input select" v-model="form.drawTime">
                <option value="">请选择你预定的时间</option>
                <option v-for="_date in opts" :key="_date" :value="_date">{{_date}}</option>
              </select>
            </div>
            <!-- 确认提交 -->
            <div class="submit-btn" @click="pay"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui';
import { getActDetailNew } from '@/lib/api';
import { gotoAuth } from '@/router/index';
import { payUrl } from '@/config/';
export default {
  data () {
    return {
      actId: null,
      isRule: false,
      isBooking: false,
      actDetail: {},
      surplusStock: null, // 库存
      opts: [],
      desc: [
        { title: '活动时间：', content: '7月11日至9月30日' },
        {
          title: '场所使用时间：',
          content: '每周六上午8:00-10:00，10:00-12:00；'
        },
        { title: '场所预定时间：', content: '周日至周五中午12:00' },
        {
          title: '场所地点：',
          content:
            '安徽省合肥市体育中心网球场（合肥市屯溪路196号金种子体育馆西边）'
        }
      ],
      orderCode: null,
      form: {
        name: '',
        mobile: this.tel,
        drawTime: ''
      },
      timer: null,
      errorMsg: '',
      count: 0
    };
  },
  computed: {
    tel () {
      return this.$store.state.cust ? this.$store.state.cust.tel : null;
    }
  },
  methods: {
    // 立即预定
    openBooking () {
      let token = this.$store.state.token;
      if (!token) {
        gotoAuth();
        return false;
      }
      this.form.name = '';
      this.form.drawTime = '';
      this.form.mobile = this.tel;
      this.orderCode = null;
      this.isBooking = true;
    },
    pay () {
      if (this.form.name && this.form.mobile && this.form.drawTime) {
        Indicator.open();
        this.$post('api/activity/newCreateOrder', {
          actId: this.actId,
          standardId: this.actDetail.productList[0].standardList[0].id,
          commodityNum: 1
        })
          .then(result => {
            if (result.status == 200) {
              this.orderCode = result.payload.orderCode;
              this.turns();
            } else {
              Indicator.close();
              Toast(result.error);
              this.getSurplusStock();
            }
          })
          .catch(err => {
            Indicator.open();
            Toast(err);
          });
      } else {
        Toast('请完善信息!');
      }
    },
    payDirect (payload, callbackPage) {
      const { prepayId, orderCode } = payload;
      let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${orderCode}`;
      Toast('订单已生成...正在跳转支付');
      let payPath = `${payUrl}${prepayId}?redirectUrl=${encodeURIComponent(
        callbackPage || successUrl
      )}`;
      // window.location.href = payPath;
      window.location.replace(payPath);
    },
    async turns () {
      if (this.count > 10) {
        Indicator.close();
        Toast(this.errorMsg);
        clearTimeout(this.timer);
        return;
      }
      this.count++;
      let checkRs = await this.$post('api/order/check/status', {
        orderCode: this.orderCode
      });
      if (checkRs.status == 200) {
        let callbackPage = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order?actId=${this.actId}`;
        let data = {
          ...this.form,
          orderCode: this.orderCode,
          actId: this.actId
        };
        this.$post('api/activity/act/actPredate/save/table', data).then(
          saveRs => {
            Indicator.close();
            if (saveRs.status == 200) {
              if (checkRs.payload.is_pay == '1') {
                if (navigator.userAgent.indexOf('boc') > -1) {
                  MessageBox({
                    message: '请在完成支付后，点击左上角返回活动页面。',
                    confirmButtonText: '去支付'
                  }).then(action => {
                    if (action == 'confirm') {
                      this.payDirect(checkRs.payload, callbackPage);
                    }
                  });
                } else {
                  this.payDirect(checkRs.payload, callbackPage);
                }
              }
            } else {
              Toast(saveRs.error);
            }
          }
        );
      } else {
        this.errorMsg = checkRs.error;
        this.timer = setTimeout(() => {
          this.turns();
        }, 2000);
      }
    },
    getSurplusStock () {
      getActDetailNew(this.actId, rs => {
        this.surplusStock =
          rs.payload.productList[0].standardList[0].surplusStock;
      });
    }
  },
  created () {
    this.actId = process.env.PUBLISH_ENV == 'prod' ? 562775001 : 562751799;
    getActDetailNew(this.actId, rs => {
      this.actDetail = rs.payload;
      this.opts = rs.payload.remarks.split('#');
      this.surplusStock = this.actDetail.productList[0].standardList[0].surplusStock;
      localStorage.setItem('lastVisitactId', this.actId);
    });
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #3e6a4a;
  .my-booking {
    position: fixed;
    top: 1.5rem;
    right: 0;
    padding: 0.1rem;
    background: #fff;
    font-size: 0.26rem;
    border-radius: 10px 0 0 10px;
    z-index: 2;
  }
}
.container {
  position: relative;
  width: 100%;
  min-height: 13.34rem;
  background: url(//static.lianhaikeji.com/images/20190710/492e09b09e484664bbe34d4c4551677d.png)
    no-repeat;
  background-size: 100% 12.06rem;
  background-position: 0 1.28rem;
  .page-title {
    width: 100%;
    height: 1.28rem;
    text-align: center;
    font-size: 0.3rem;
    color: #323232;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 0.68rem;
  }
  .img-box {
    width: 81.33%;
    height: 2.7rem;
    display: inline-block;
    margin-top: 6.28rem;
    margin-left: 9.06%;
    background: url(//static.lianhaikeji.com/images/20190710/0a66340e3d3d4a7d9acd3ce97230172c.jpg)
      no-repeat;
    background-size: 100%;
  }
  .act-tip {
    width: 82.13%;
    height: 1.4rem;
    display: inline-block;
    text-align: center;
    line-height: 0.42rem;
    font-size: 0.32rem;
    color: #fff;
    margin-top: 0.2rem;
    margin-left: 8.9%;
  }
  .btn-bar {
    width: 82.13%;
    height: 0.9rem;
    margin-left: 8.9%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 2.7rem;
      height: 0.85rem;
      // display: inline-block;
    }
    .rule-btn {
      background: url(//static.lianhaikeji.com/images/20190710/44089d90ab17444793d0f438a23c7386.png)
        no-repeat;
      background-size: 100%;
    }
    .booking {
      background: url(//static.lianhaikeji.com/images/20190710/42f1aa286fa641ae9b0e711633be3f33.png)
        no-repeat;
      background-size: 100%;
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
    height: 10.75rem;
    background: #fff;
    border-radius: 0.4rem;
    .rule-title {
      color: #457351;
      font-size: 0.36rem;
      text-align: center;
      width: 100%;
      height: 1.24rem;
      line-height: 1.24rem;
      > span {
        color: #333;
        font-size: 0.24rem;
      }
    }
    .close-btn {
      width: 0.58rem;
      height: 0.58rem;
      position: absolute;
      top: 0.2rem;
      right: 0.26rem;
      background: url(//static.lianhaikeji.com/images/20190710/c3e39f21e82a426c919471e5f1806a1c.png)
        no-repeat;
      background-size: 100%;
    }
    .act-desc {
      box-sizing: border-box;
      padding-left: 0.4rem;
      padding-right: 0.58rem;
      .desc-item {
        min-height: 0.75rem;
        margin-bottom: 0.2rem;
        label {
          display: block;
          font-size: 0.32rem;
          color: #0b0b0b;
        }
        span {
          font-size: 0.26rem;
          color: #404040;
          line-height: 0.4rem;
        }
      }
      // .act-rule {
      //   span {
      //     line-height: 0.4rem;
      //   }
      // }
    }
  }
  .booking-main {
    height: 6.9rem;
    .booking-form {
      width: 5.7rem;
      height: 5.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 0.45rem;
      .input-box {
        box-sizing: border-box;
        width: 100%;
        height: 0.98rem;
        padding: 0 0.45rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
        line-height: 0.98rem;
        > .real-input {
          outline: none;
          height: 100%;
          font-size: 0.28rem;
          color: #333;
          width: 100%;
          background: transparent;
          &::placeholder {
            color: #bdbdbd;
          }
        }
        .select {
          border: none;
          appearance: none;
          /*清除select默认样式*/
          background: url(//static.lianhaikeji.com/images/20190710/9e6d505160404995bd11b35850d54f11.png)
            no-repeat right;
          /*注：上一步清除样式后，select中的三角符号也会被清除，所以需要自己添加下三角*/
          background-size: 0.3rem;
          background-position-x: 96%;
        }
      }
      .submit-btn {
        width: 100%;
        height: 1.2rem;
        border-radius: 0.5rem;
        background: url(//static.lianhaikeji.com/images/20190710/2bfac5760f6a4d8ca7b4a9be9db8e3af.png)
          no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
