<template>
  <div class="wrapper">
    <headerBar
      title="一元游青山"
      :bgColor="'#38B49A'"
    ></headerBar>
    <div class="ticket border">青秀山成人电子票</div>
    <div class="form">
      <div class="input date-input">
        <label for>使用日期：</label>
        <input
          type="text"
          @click="openPicker"
          v-model="date"
          readonly
        >
      </div>
      <div class="input">
        <label for>购买份数：</label>1份
      </div>
      <div class="input">
        <label for>零售价：</label>
        <span class="orange">&yen;20.0</span>
      </div>
      <div class="input noBorder">
        <label for>总计费用：</label>
        <span class="orange">&yen;1.0</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="ticket border">购票人信息</div>
    <div class="input">
      <label for>联系人：</label>
      <input
        type="text"
        placeholder="*必填，姓名"
        v-model="name"
      >
    </div>
    <div class="input">
      <label for>手机号：</label>
      <input
        type="text"
        placeholder="*必填，用于接收订单短信"
        v-model="mobile"
      >
    </div>
    <div
      class="button"
      @click="order"
    >下单支付</div>
    <template>
      <mt-datetime-picker
        ref="picker"
        v-model="date"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :startDate="startDate"
      ></mt-datetime-picker>
    </template>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import moment from 'moment';
import { payUrl } from '@/config/';
import headerBar from '@/components/headerBar';

export default {
  data () {
    return {
      date: '',
      startDate: new Date(moment().format()),
      name: '',
      mobile: '',
      orderCode: '',
      payUrl,
      actId: ''
    };
  },
  components: {
    headerBar
  },
  methods: {
    openPicker () {
      this.$refs.picker.open();
    },
    handleConfirm (data) {
      this.date = moment(data).format('YYYY-MM-DD');
    },
    async pay () {
      Indicator.open();
      let rs = await this.$post('/api/re_buy', {
        orderCode: this.orderCode,
        merchantId: this.$store.state.merchantId
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/order`;
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        Toast('购买失败:' + rs.error);
      }
      Indicator.close();
    },
    async order () {
      if (!this.name || !this.mobile || !this.date) {
        Toast('请填写信息');
        return;
      }
      let phoneReg = /^1[3456789]\d{9}$/;
      if (!phoneReg.test(this.mobile)) {
        Toast('手机号输入有误');
        return;
      }
      let rs = await this.$post('api/activity/act/actPredate/save/table', {
        actId: this.actId,
        orderCode: this.orderCode,
        name: this.name,
        mobile: this.mobile,
        date: this.date
      });
      if (rs.status == 200) {
        this.pay();
      } else {
        Toast(rs.error);
      }
    },
    getorderCode () {
      this.orderCode = this.$route.params.orderCode;
      this.actId = this.$route.params.actId;
    }
  },
  mounted () {
    this.getorderCode();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrapper {
  font-size: 0.3rem;
  text-indent: 2em;
  .border {
    border-bottom: 1px solid #ccc;
  }
  .ticket {
    line-height: 0.9rem;
    font-size: 0.32rem;
    font-weight: bold;
  }
  .orange {
    color: #ff9000;
  }

  .line {
    height: 0.2rem;
    background: #efefef;
  }
  .input {
    padding: 0.3rem 0 0.2rem;
    border-bottom: 1px solid #ccc;
    &.noBorder {
      border-bottom: none;
    }
    input {
      height: 0.56rem;
      width: 3.7rem;
      padding-left: 0.1rem;
      line-height: 0.56rem;
      border-radius: 0.1rem;
      // border: 1px solid #ccc;
    }
  }
  .date-input {
    input {
      width: 3rem;
      border: 1px solid #ccc;
    }
  }
  .button {
    text-indent: 0;
    width: 5.6rem;
    height: 0.8rem;
    background-color: #40bc9a;
    margin: 0.4rem auto;
    border-radius: 20rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
  }
}
</style>
