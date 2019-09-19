<template>
  <div>
    <cbbHeader
      title="详情"
      :bgColor="'#5FB534'"
    ></cbbHeader>
    <div class="container">
      <div class="pro">
        <img
          :src="standard.standardImgUrl"
          alt
        >
      </div>
      <div class="title">{{standard.standardName}}</div>
      <div
        v-if="proType ==1"
        class="phone inputinfo"
      >
        <input
          type="text"
          :placeholder="'请输入'+standard.accountName"
          v-model="account"
        >
      </div>
      <div class="exchangecode inputinfo">
        <input
          type="text"
          placeholder="请输入兑换码"
          v-model="couponNumber"
        >
      </div>
      <div
        class="exchange"
        @click="createOrder"
      >立即兑换</div>
      <div
        class="topic"
        v-if="proType == 9"
      >收货地址</div>
      <div
        class="address"
        v-if="proType == 9"
      >
        <div
          class="addinfo"
          v-if="this.address"
        >
          <div class="info">
            <div
              class="pretermit"
              v-if="this.address.isDefault==1"
            >默认</div>
            <div class="add">
              {{this.address.name}}
              <span>{{this.address.phone}}</span>
              <p>{{this.address.provinceName}}{{this.address.cityName}}{{this.address.areaName}}{{this.address.detailAddress}}</p>
            </div>
          </div>
          <div
            class="editor"
            @click="gotoaddressList"
          >
            <img
              src="./imgs/arrow.png"
              alt
            >
          </div>
        </div>
      </div>
      <div
        class="add-btn"
        v-if="proType == 9 && !address"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/youchu/address`)"
      >
        <b>+</b>请填写收货地址
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
import cbbHeader from '@/components/cbbHeader';
export default {
  data () {
    return {
      account: '',
      standard: '',
      couponNumber: '',
      payUrl: payUrl,
      proType: '',
      standardImgUrl: '',
      timer: null,
      count: 0,
      orderCode: '',
      standardName: '',
      isComfirmed: false,
      address: null
    };
  },
  components: {
    cbbHeader
  },
  computed: {
    actId () {
      return this.$route.params.actId;
    },
    rid () {
      return this.$route.params.rid;
    }
  },
  methods: {
    async createOrder () {
      // 检查账号格式
      if (this.proType == 1) {
        if (!this.account) {
          Toast('请输入' + this.standard.accountName);
          return;
        }
        if (this.standard.accountPattern) {
          if (!new RegExp(this.standard.accountPattern).test(this.account)) {
            Toast('请输入正确的' + this.standard.accountName);
            return;
          }
        }
      }
      if (!this.couponNumber) {
        Toast('请输入优惠码');
        return;
      }
      if (this.proType == 9 && !this.address) {
        Toast('请确认收货地址');
        return;
      }
      if (this.proType == 1) {
        await MessageBox.confirm(
          `请确认您要充值的帐号为${this.account}兑换成功，不可修改！`,
          '温馨提示'
        ).then(action => {
          this.isComfirmed = false;
          if (action == 'confirm') {
            this.isComfirmed = true;
          }
        });
        if (!this.isComfirmed) {
          return;
        }
      }

      Indicator.open();
      let rs = await this.$post('api/activity/newCreateOrder', {
        actId: parseInt(this.$route.params.actId),
        standardId: this.standard.standardId,
        commodityNum: 1,
        couponNumber: this.couponNumber,
        customAddressId: this.proType == 9 ? this.address.id : null,
        account: this.account
      });
      if (rs.status === 200) {
        this.orderCode = rs.payload.orderCode;
        this.turns();
      } else {
        Toast(rs.error);
        Indicator.close();
      }
    },
    async turns () {
      if (this.count > 6) {
        Toast(this.errorMsg);
        clearTimeout(this.timer);
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/index/order`
        );
        return;
      }

      this.count++;
      console.log('clu:' + this.count);
      let rs = await this.$post('api/order/check/status', {
        orderCode: this.orderCode
      });
      if (rs.status == 200) {
        if (rs.payload.is_pay == '1') {
          const { prepayId, orderCode } = rs.payload;
          let successUrl = `${window.location.protocol}//${
            window.location.host
          }/${
            this.$store.state.merchantAppid
          }/merchant/paysuccess/${orderCode}`;
          Toast('订单已生成...正在跳转支付');
          let payPath = `${
            this.payUrl
          }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
          window.location.replace(payPath);
        } else {
          Toast('兑换成功');
          Indicator.close();
          this.$router.push(
            `/${this.$store.state.merchantAppid}/merchant/index/order`
          );
        }
      } else {
        this.errorMsg = rs.error;
        this.timer = setTimeout(() => {
          this.turns();
        }, 2000);
      }
    },
    async getProDetail () {
      let rs = await this.$get('api/getStandard/' + this.$route.params.rid);
      if (rs.status == 200) {
        this.standard = rs.payload;
        this.proType = rs.payload.proType;
      }
    },
    async getDefaultAdd () {
      let rs = await this.$get('/api/cityArea/custom/queryAddress');
      console.log(rs);
      if (rs.status == 200) {
        if (rs.payload.length > 0) {
          let addressId = this.$route.query.addressId;
          if (addressId) {
            rs.payload.forEach(element => {
              if (element.id == addressId) {
                this.address = element;
              }
            });
          } else {
            rs.payload.forEach(element => {
              if (element.isDefault == 1) {
                this.address = element;
              }
            });
          }
          if (!this.address) {
            this.address = rs.payload[0];
          }
        }
      }
    },
    gotoaddressList () {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/youchu/addressList?standardId=${this.rid}&actId=${
          this.$route.params.actId
        }#enableSearch`
      );
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  },
  async mounted () {
    await this.getDefaultAdd();
    await this.getProDetail();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  height: 1.55rem;
  padding-top: 0.35rem;
  background: url("./imgs/headerbg.png") no-repeat;
  background-size: 100% 100%;
  .pro {
    position: relative;
    margin: 0 auto 0.38rem;
    width: 2.82rem;
    height: 2.82rem;
    background: url("./imgs/probg.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    img {
      width: 1.46rem;
      position: absolute;
      top: 50%;
      margin-top: -0.7rem;
      left: 50%;
      margin-left: -0.78rem;
    }
  }
  .title {
    text-align: center;
    font-size: 0.36rem;
    color: rgb(51, 51, 51);
    margin-bottom: 0.64rem;
  }
  .inputinfo {
    width: 6rem;
    height: 0.9rem;
    margin: 0 auto;
    margin-bottom: 0.32rem;
    input {
      width: 100%;
      height: 100%;
      font-size: 0.32rem;
      padding-left: 0.32rem;
      border: 1px solid rgb(177, 184, 193);
      border-radius: 0.08rem;
    }
  }
  .exchange {
    width: 6rem;
    height: 0.96rem;
    background-color: rgb(40, 173, 57);
    line-height: 0.96rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    margin: 0.5rem auto;
    border-radius: 0.08rem;
  }
  .topic {
    padding-left: 0.32rem;
  }
  .address {
    padding: 0.32rem;
    p {
      font-size: 0.28rem;
      color: rgb(51, 51, 51);
      margin-bottom: 0.25rem;
    }
    .addinfo {
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
      color: rgb(51, 51, 51);
      .info {
        display: flex;
        .pretermit {
          width: 0.64rem;
          height: 0.34rem;
          color: rgb(232, 81, 81);
          background-color: rgb(248, 227, 220);
          text-align: center;
          line-height: 0.34rem;
          font-size: 0.24rem;
        }
        .add {
          margin-left: 0.16rem;
          span {
            font-size: 0.28rem;
            color: rgb(179, 182, 188);
          }
          p {
            margin-top: 0.16rem;
          }
        }
      }
    }
    .editor {
      text-align: center;
      width: 0.78rem;
      img {
        width: 0.48rem;
      }
    }
  }
  .add-btn {
    width: 3.6rem;
    border-radius: 0.4rem;
    height: 0.7rem;
    color: #fff;
    font-size: 0.3rem;
    line-height: 0.7rem;
    background: #5fb534;
    text-align: center;
    margin: 0 auto 0.3rem;
  }
}
</style>
