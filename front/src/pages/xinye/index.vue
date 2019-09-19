<template>
  <div
    class="xinye"
    :class="{active:showRule}"
  >
    <div class="bg">
      <div
        class="btnrule"
        @click="showRule=true"
      ><img
          src="./imgs/btnrule.png"
          alt=""
        > </div>
      <div
        class="btnapply"
        @click="goto()"
      ><img
          src="./imgs/btnapply.png"
          alt=""
        ></div>
    </div>
    <mt-popup
      v-model="showRule"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="rule">
        <div
          class="close"
          @click="showRule=false"
        ><img
            src="./imgs/close.jpg"
            alt=""
          ></div>
        <div class="header"><img
            src="./imgs/ruleheader.png"
            alt=""
          ></div>
        <div class="rule-contain">
          <div class="rule-tiptitle"><img
              src="./imgs/time.png"
              alt=""
            ></div>
          <div class="rule-detail">2019年6月1日—2019年12月31日</div>
          <div class="rule-tiptitle"><img
              src="./imgs/object.png"
              alt=""
            ></div>
          <div class="rule-detail">通过本渠道成功申请信用卡，申请人自核卡之日起在2个月内消费（含境内外刷卡交易和取现交易）一笔15元；</div>
          <div class="rule-tiptitle"><img
              src="./imgs/content.png"
              alt=""
            ></div>
          <div class="rule-detail">客户只需在好兴动APP用兴业信用卡支付“1元”，即可享受全球40个国家及地区任意一个国家或地区的签证代办服务！活动期间每位客户限享一次优惠，领馆费等其他费用需另行支付。客户完成订购后，本活动服务商“浙江中旅”（以下简称“服务商”）会在2个工作日内主动联系客户关于签证代办事宜；<img
              src="./imgs/table.png"
              class="table"
              alt=""
            > 注意：<br>
            （1）如有疑问可加QQ：3270348330或拨打电话0571-28101626咨询，服务商业务办理时间和咨询服务时间为9:00-17:30；<br>（2）本产品仅限首次核发兴业信用卡的持卡人本人且主卡客户预订；<br>（3）VISA/Master card单品牌信用卡无需在好兴动APP进行“1元签证”的购买，但客户必须主动联系服务商，可直接向服务商申请使用“1元签证”权益；<br>（4）签证代办服务目的地国家/地区若有所调整，本行将提前1个月在兴业银行信用卡官网进行公告。 </div>
          <div class="rule-tiptitle"><img
              src="./imgs/detail.png"
              alt=""
            ></div>
          <div class="rule-detail">自本活动专属办卡入口成功申请兴业信用卡并满足首刷条件的客户，从达标当日起的两个自然月内，本活动供应商将给达标客户寄送型号为联想服务都市简约双肩包B1801一个 。供应商以短信形式通知客户，寄送地址默认为账单地址，如有变更请在收到短信后的3个工作日内拨打短信中提供的供应商客服进行备注。</div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Popup } from 'mint-ui';
export default {
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      showRule: false
    };
  },
  methods: {
    goto () {
      window.location.href =
        'https://wm.cib.com.cn/html/webapp/fast-issue/home.html?id=bec7f6be678f4ff2af62216b07277925';
    }
  }
};
</script>
<style lang="scss" scoped>
.xinye {
  width: 100%;
  min-height: 100vh;
  background: url("./imgs/bgrepeat.jpg") repeat;
  background-size: 100% 0.19rem;
  overflow: auto;
  padding-bottom: 0.3rem;
  .bg {
    width: 100%;
    min-height: 13.34rem;
    background: url("./imgs/bg.jpg") no-repeat;
    background-size: 100% 13.34rem;
    padding-top: 12rem;
    position: relative;
    padding-bottom: 0.5rem;
    overflow: auto;
    .btnrule {
      position: absolute;
      top: 0.6rem;
      right: 0;
      width: 2rem;
      height: 0.85rem;
      img {
        width: 100%;
      }
    }
    .btnapply {
      width: 6.48rem;
      height: 1.18rem;
      margin: 0rem auto 0;
      img {
        width: 100%;
      }
    }
  }
}
.active {
  height: 100vh;
  overflow: hidden;
}
.mypop {
  background: transparent;
}
.rule {
  width: 6.56rem;
  height: 11rem;
  background: url("./imgs/bgrepeat.jpg") repeat;
  background-size: 100% auto;
  border-radius: 0.1rem;
  padding-top: 0.001rem;
  position: relative;
  .close {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    img {
      width: 100%;
    }
  }
  .header {
    width: 3.42rem;
    height: 0.76rem;
    margin: 0.3rem auto;
    img {
      width: 100%;
    }
  }
  .rule-contain {
    width: 100%;
    height: 9.5rem;
    overflow: scroll;
    padding: 0 0.3rem;
    .rule-tiptitle {
      width: 100%;
      height: 0.46rem;
      img {
        height: 0.46rem;
      }
    }
    .rule-detail {
      width: 5.94rem;
      margin: 0 auto;
      font-size: 0.24rem;
      color: #000;
      line-height: 0.4rem;
    }
    .table {
      display: block;
      width: 5.94rem;
      height: 3.48rem;
      margin: 0 auto;
    }
  }
}
</style>
