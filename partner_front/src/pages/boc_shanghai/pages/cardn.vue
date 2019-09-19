<template>
  <div class="cardn">
    <!-- <div class="card-header">
      <div v-if="cardType == 1">如何激活您的信用卡</div>
      <div v-if="cardType == 2">信用卡额度不足怎么办？</div>
      <div v-if="cardType == 3">信用卡如何还款？</div>
      <div v-if="cardType == 4">信用卡遗失如何应急？</div>
    </div> -->
    <myheader v-if="cardType == 1" title='如何激活您的信用卡' ></myheader>
    <myheader v-if="cardType == 2" title='信用卡额度不足怎么办？' ></myheader>
    <myheader v-if="cardType == 3" title='信用卡如何还款？' ></myheader>
    <myheader v-if="cardType == 4" title='信用卡遗失如何应急？' ></myheader>
    <div class="content">
      <div class="title" v-if="cardType == 1">
        <img src="./imgs/activate.png" alt>
      </div>
      <div class="title" v-if="cardType == 2">
        <img src="./imgs/limit.png" alt>
      </div>
      <div class="title" v-if="cardType == 3">
        <img src="./imgs/repayment.png" alt>
      </div>
      <div class="title" v-if="cardType == 4">
        <img src="./imgs/lose.png" alt>
      </div>
      <template v-if="cardType == 1">
        <div class="main">
          <div class="list-num">1、</div>
          <div class="word">如您已持有我行其他信用卡，则您的信用卡沿用已设置的电话查询密码，无需再设置新的查询密码。</div>
        </div>
        <div class="main">
          <div class="list-num">2、</div>
          <div class="word">激活后您可以根据自己的用卡习惯，定制属于自己的个性服务如设置交易密码、开通自动还款、选择POS消费验证方式、选择电子账单等。</div>
        </div>
        <div class="main">
          <div class="list-num">3、</div>
          <div class="word">如您的账单地址、家庭地址、手机号码或其他联系方式发生变更时，请及时致电客服热线更新相关信息。您也可以持本人有效身份证件至中行就近网点办理。</div>
        </div>
      </template>
      <template v-if="cardType == 2">
        <div class="main">
          <div class="list-num">1、</div>
          <div class="word">
            <span>临时额度调整：</span>配合您的短期用卡需求，我行可为您调高信用额度，最长30天有效，到期后自动恢复为原来的信用额度
          </div>
        </div>
        <div class="main">
          <div class="word">
            <span>友情提示：</span>临时加额只调整您的消费额度，取现额度和一般分期额度不变。为进一步加强信用卡风险管理，总行
            <span class="tel">4006695566</span>客服中心临时增额规则进行了调整，客户电话临增如未达预期的话可亲临柜面提交财力证明申请或通过您的理财经理予以申请，我行按照授信政策审批。
          </div>
        </div>
        <div class="main">
          <div class="list-num">2、</div>
          <div class="word">
            <span>长期额度调整：</span>您可在开卡6个月后致电4006695566（白金卡致电4006695569）或至中行就近网点提出长增申请，我们将根据您的用卡情况及补充提供的财力证明等，受理您的调额需求。
          </div>
        </div>
        <div class="main">
          <div class="word">
            <span>友情提示：</span>当您的卡账户状态不正常时额度无法调整。
          </div>
        </div>
      </template>
      <template v-if="cardType == 3">
        <div class="main">
          <div class="no-word">您可以到中国银行网点，通过柜台或ATM、存取款一体机等办理现金或转账还款。</div>
        </div>
        <div class="main">
          <div
            class="no-word"
          >您还可登录我行网上银行，开通自动还款服务。在到期还款日前，以全额或最低还款额的方式，通过您本人在中国银行开立的活期存折（一本通）、长城电子借记卡或长城人民币信用卡等进行自动转账还款，或通过跨行转账等方式进行还款。</div>
        </div>
      </template>
      <template v-if="cardType == 4">
        <div class="main">
          <div class="no-word">
            当您遇到信用卡不慎遗失的情况，请即刻拨打
            <span class="tel">4006695566</span>（白金卡拨打4006695569）挂失，以控制失卡风险，中行客服人员会为您操作挂失补卡，新卡约在一周左右的时间寄送到您的账单地址。
          </div>
        </div>
        <div class="main">
          <div class="no-word">
            如您不确定信用卡是否确实遗失，想在找到信用卡后可以继续使用，您可致电
            <span class="tel">4006695566</span>（白金卡拨打4006695569）做临时挂失，在临时挂失期间卡片将暂停使用；如您事后找到卡片，可再次致电4006695566（白金卡拨打4006695569）解除临时挂失，卡片即可恢复正常使用。如确认已遗失，可致电总行客服热线操作正式挂失补卡。
          </div>
        </div>
      </template>
    </div>
    <div class="bottombg" v-if="cardType == 1">
      <img src="./imgs/tu1.png" alt>
    </div>
    <div class="bottombg" v-if="cardType == 2">
      <img src="./imgs/tu2.png" alt>
    </div>
    <div class="bottombg" v-if="cardType == 3">
      <img src="./imgs/tu3.png" alt>
    </div>
    <div class="bottombg" v-if="cardType == 4">
      <img src="./imgs/tu4.png" alt>
    </div>
  </div>
</template>

<script>
import myheader from '../../boc_shenzhen/pages/components/myheader'
export default {
  components: {
    myheader
  },
  data () {
    return {
      cardType: ''
    };
  },
  methods: {
    getcardType () {
      this.cardType = this.$route.params.page;
    }
  },
  mounted () {
    this.getcardType();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cardn {
  font-family: "simhei";
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: scroll;
  .card-header {
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    background-color: red;
  }
  .content {
    padding: 0.32rem 0.52rem 0.28rem 0.32rem;
    .title {
      width: 100%;
      height: 0.56rem;
      padding-bottom: 0.26rem;
      border-bottom: 1px solid #ccc;
      img {
        display: block;
        width: 3.64rem;
      }
    }
    .main {
      margin: 0.4rem 0 0.4rem 0;
      position: relative;

      .list-num {
        position: absolute;
      }
      .word {
        span {
          font-weight: bold;
        }
        .tel {
          font-weight: normal;
          color: #f4293f;
        }
        margin-left: 0.45rem;
        line-height: 0.4rem;
      }
      .no-word {
        margin-left: 0.12rem;
      }
    }
  }
  .bottombg {
    font-size: 0;
    width: 7.5rem;
    margin-top: 0.78rem;
    img {
      width: 100%;
    }
  }
}
</style>
