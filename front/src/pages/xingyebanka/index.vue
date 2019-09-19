<template>
  <div class="banka">
    <back></back>
    <div class="main">
      <div class="tip">
        2019年8月1日至2020年1月31日，通过本页面办卡成功的新户最高可获赠“王卡1年特大通用流量包”，同时还可享受兴业银行超值积分权益！<br>
        <span @click="showRule=true">活动细则</span>
      </div>
      <div
        class="btn"
        @click="handle()"
      ><img
          src="./imgs/btn.png"
          alt=""
        ></div>
    </div>
    <mt-popup
      v-model="showRule"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="rule">
        <div class="header"><img
            src="./imgs/ruleheader.png"
            alt=""
          ></div>
        <div class="ruledetail">
          1、活动仅适用于在中国联通腾讯王卡官微，首次申请并核发的兴业信用卡新客户（2019年8月1日至2020年1月31日期间进件并最晚于2020年1月31日完成核卡的兴业银行信用卡主卡的持卡人包括整户注销7个月及以上客户）。同一客户可同时参加三项活动，活动期间客户的同一笔交易可同时纳入三项活动的交易统计；<br>
          2、活动内容：①每月刷一笔兴业信用卡（不限金额）即送20G通用流量包，累计境外交易满3000元再送6个月每月20G通用流量包，每位客户最多送12个月每月20G通用流量包。②每月刷满6笔99元，可享最低6积分兑换屈臣氏、必胜客、迪卡侬、哈根达斯、汉堡王、歌帝梵、呷哺呷哺、万宁等品牌权益，更多选择更多欢乐，尽在“活力6积分”；<br>
          3、 “刷卡送特大通用流量包”活动流程及规则：活动期间内，参与活动的客户当月刷一笔兴业信用卡（不限金额）即赠送20G通用流量包，同一身份证客户每月限享一次优惠，当月未刷卡则不赠送流量；境外交易累计满3000元一次性赠送6个月每月20G通用流量包，同一身份证客户活动期间内限享一次优惠。由本活动服务商于次月15日前为达标客户完成流量充值并短信通知客户。
          4、流量充值均通过客户本人的联通手机号码进行验证和充值，该手机号码必须与兴业银行信用卡系统登记的手机号码一致；<br>
          5、参与活动的境外交易形式含境外刷卡、境外取现、境外网付交易，不含预授权交易、退货交易、支付宝及微信等各种第三方支付渠道的境外交易、云闪付交易（包含各种Pay类交易等）,不含境外溢缴款取现交易。境外包含港澳台地区，本活动统一汇率折算比例为1美元=6.9人民币；参与活动的刷卡交易是指客户名下（同一身份证下）任一一张卡片的刷卡交易，含取现、网付交易、支付宝及微信等各种第三方支付渠道的交易，不含退货交易、溢缴款取现交易。<br>
          6、 “兴动全城，活力6积分”活动细则：以兴业信用卡官网公告为准，请登录兴业银行信用卡官网—缤纷优惠—全国活动优惠，查询具体活动细则；<br>
          7、本活动服务商为“联洲科技公司”（以下简称“服务商”），兴业银行仅提供支付服务，对本活动所涉及商品及相关服务不承担任何责任。如进一步咨询话费兑换及流量充值问题，可拨打服务商电话0571-88052823；<br>
          8、参加本活动的持卡人如有下述任一情况：所持兴业信用卡被停用或管制、自行注销整户信用卡、拒不偿还兴业银行信用卡欠款、在兴业银行信用卡使用中有任何舞弊/欺诈或非真实交易、违反本活动办法及其他相关规定的，兴业银行有权取消其参加本活动的资格而无须作出任何通知；<br>
          9、在法律允许的范围内，兴业银行保留对本次活动条款进行解释的权利，并有权根据情况取消本活动或增删、修订本规则（包括但不限于优惠时间及回馈标准等），并于网站、账单、语音电话等媒体或银行网点公告后生效。
        </div>
      </div>
      <div
        class="close"
        @click="showRule=false"
      ><img
          src="./imgs/close.png"
          alt=""
        ></div>
    </mt-popup>
  </div>
</template>
<script>
import { Toast, Popup } from 'mint-ui';
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
    handle () {
      Toast('敬请期待！');
    }
  }
};
</script>
<style lang="scss" scoped>
.banka {
  width: 100%;
  min-height: 100vh;
  background: #ac2233 url(./imgs/bg.png) no-repeat;
  background-size: 100% auto;
  padding-top: 9.78rem;
  padding-bottom: 0.3rem;
  .main {
    width: 80%;
    margin: 0 auto;
    .tip {
      font-size: 0.28rem;
      color: #fff;
      font-weight: 600;
      line-height: 0.45rem;
      span {
        color: #ffd325;
        font-style: italic;
        text-decoration: underline;
        font-weight: 700;
        font-size: 0.35rem;
      }
    }
  }
}
.mypop {
  background: transparent;
}
.rule {
  width: 6.14rem;
  height: 8.62rem;
  background: url(./imgs/rulebg.png) no-repeat;
  background-size: 100% auto;
  padding-top: 0.4rem;
  .header {
    width: 3.11rem;
    height: 0.35rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .ruledetail {
    width: 5.8rem;
    height: 7.2rem;
    overflow: scroll;
    font-size: 0.26rem;
    color: #fff;
    margin: 0.32rem auto;
    line-height: 0.4rem;
  }
}
.close {
  width: 0.58rem;
  height: 0.58rem;
  margin: 0.5rem auto;
  img {
    width: 100%;
  }
}
.btn {
  width: 3.13rem;
  height: 0.86rem;
  margin: 0.5rem auto;
  img {
    width: 100%;
  }
}
</style>
