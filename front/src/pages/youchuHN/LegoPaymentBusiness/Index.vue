<template>
  <div
    class="tab"
    v-if="act"
  >
    <div class="tab-box">
      <!-- <div
        class="tab-item"
        v-for="(item, index) in paymentType"
        :key="index"
        @click="choose(index, item)"
        :class="{'active': index==isSelected, 'mgrl': index ==1, 'l':index == 0,'r':index == 2}"
      > -->
      <div>
        缴{{paymentNameList[type-2]}}
      </div>
      <div
        class="popsearch"
        @click="showCity=true"
      ><img
          src="./imgs/search.png"
          alt=""
        ></div>
    </div>
    <div>
      <template>
        <picker
          :paymentId="paymentId"
          @eimt-companyCode="acceptCompanyCode"
          :province="provinceList[type-2]"
          :proStandardId="act.productList[0].standardList[type - 2].id"
        ></picker>
      </template>
    </div>
    <div class="tab-input">
      <input
        type="text"
        v-model="account"
        placeholder="请输入户号"
        maxlength="11"
      />
      <div
        class="btn"
        @click="check()"
      >
        <img
          src="./imgs/confirm.png"
          alt=""
        >
      </div>
    </div>

    <div class="tab-tip">
      6-10位用户编号，请查看账单/短信
    </div>
    <mt-popup
      v-model="showtip"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="tipmsg">
        <div class="tipcontent">
          尊敬的客户，本月您已享受过68折优惠活动，本次缴费需原价支付哦。
        </div>
        <div
          class="btntip"
          @click="gotopay()"
        ><img
            src="../imgs/btntip.png"
            alt=""
          ></div>
      </div>
      <div
        class="tipclose"
        @click="showtip=false"
      ><img
          src="../imgs/close.png"
          alt=""
        ></div>
    </mt-popup>
    <mt-popup
      v-model="showtime"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="tipmsg1">
        <div class="tiptop">温馨提示</div>
        <div class="tipcontent"> 每周六周日上午9点起，使用湖南省内邮储银行卡支付才有机会享受68折优惠哦。</div>
        <div class="tipcontent">
          输入信息后，查询速度可能较慢，点击确认充值进入下一页面，不要关闭，请耐心等待。
        </div>
        <div
          class="btnnext"
          @click="showtime=false, goCommit()"
        ><img
            src="../imgs/btnsure.png"
            alt=""
          ></div>
      </div>
      <div
        class="tipclose"
        @click="showtime=false"
      ><img
          src="../imgs/close.png"
          alt=""
        ></div>
    </mt-popup>
    <mt-popup
      v-model="showCity"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="cityMsg">
        <img
          :src="cityImg[type-2]"
          alt=""
        >
      </div>
      <div
        class="tipclose"
        @click="showCity=false"
      ><img
          src="../imgs/close.png"
          alt=""
        ></div>
    </mt-popup>
  </div>
</template>

<script>
import picker from './picker';
import { getActDetail } from '@/lib/api';
import { Popup } from 'mint-ui';
import city1 from './imgs/city1.jpg';
import city2 from './imgs/city2.jpg';
import city3 from './imgs/city3.png';
export default {
  name: 'legopayment',
  props: ['setting', 'type', 'settingAll'],
  data () {
    return {
      showtime: false,
      showCity: false,
      isSelected: 0,
      count: 0,
      queryId: '',
      timer: null,
      errorMsg: '',
      paymentName: '',
      account: sessionStorage.getItem(this.type + '_account')
        ? sessionStorage.getItem(this.type + '_account')
        : '',
      paymentId: '',
      companyCode: '',
      paymentType: null,
      act: null,
      showtip: false,
      provinceList: ['430000_100', 'v1918', '430000_300'],
      cityImg: [city1, city2, city3],
      payttipshow: false,
      paymentNameList: ['水费', '电费', '燃气费']
    };
  },
  computed: {
    proStandardId () {
      return this.act
        ? this.act.productList[0].standardList[this.type - 2].id
        : '';
    }
  },
  components: { picker, [Popup.name]: Popup },
  methods: {
    check () {
      if (!this.companyCode || !this.account) {
        this.$toast('请完善信息');
        return;
      }
      this.showtime = true;
    },
    goCommit () {
      this.showtime = false;
      // } else {
      //   // this.turns();
      //   let week = new Date().getDay();
      //   console.log(week);
      //   if (week === 0 || week === 6) {
      //     this.$router.push(
      //       `/${this.$store.state.merchantAppid}/merchant/youchuHN/payment?companyId=${this.companyCode}&actId=${this.setting.actId}&proStandardId=${this.proStandardId}&account=${this.account}&paymentName=${this.paymentName}`
      //     );
      //   } else {
      //     // this.showtip = true;
      //     this.gotopay();
      //   }
      // }
      if (this.payttipshow) {
        this.showtip = true;
      } else {
        sessionStorage.setItem(this.type + '_account', this.account);
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/youchuHN/payment?companyId=${this.companyCode}&actId=${this.setting.actId}&proStandardId=${this.proStandardId}&account=${this.account}&paymentName=${this.paymentName}`
        );
      }
    },
    gotopay () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/youchuHN/payment?companyId=${this.companyCode}&actId=${this.setting.actId}&proStandardId=${this.proStandardId}&account=${this.account}&paymentName=${this.paymentName}`
      );
    },
    acceptCompanyCode (val) {
      this.companyCode = val;
    },
    choose (i, item) {
      this.isSelected = i;
      this.paymentName = item.name;
      this.paymentId = item.id;
    },
    async getPaymentType () {
      let rs = await this.$post('api/search/wec', {
        action: 'queryType',
        proStandardId: this.act.productList[0].standardList[this.type - 2].id
      });
      if (rs.status == 200) {
        let payload = JSON.parse(rs.payload);
        if (payload.code == 200) {
          if (payload.list == []) {
            return;
          }
          this.paymentType = payload.list;
          this.paymentId = payload.list[this.type - 2].id;
          this.paymentName = payload.list[this.type - 2].name;
        } else {
          this.$toast('系统出错');
        }
      } else {
        this.$toast(rs.error);
      }
    },
    async checktip () {
      let rs = await this.$post('api/order/searchIsRecharge', {
        actIds: this.settingAll
      });
      if (rs.status === 200) {
        this.payttipshow = true;
      }
    }
  },
  async created () {
    this.act = await getActDetail(this.setting.actId);
    console.log(this.act);
    /* if (this.act) {
      this.getPaymentType();
    } */
    this.checktip();
  }
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  margin: 0 auto 0;
  &-box {
    width: 100%;
    height: 0.71rem;
    background: url("./imgs/yh2.png") no-repeat;
    background-position: 0 0;
    background-size: 0.68rem 0.71rem;
    line-height: 0.71rem;
    padding-left: 0.6rem;
    font-size: 0.32rem;
    color: #222;
    position: relative;
    .popsearch {
      width: 2.3rem;
      height: 0.42rem;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0.3rem;
      margin: auto;
      img {
        width: 100%;
      }
    }
  }

  &-item {
    width: 2.3rem;
    height: 0.56rem;
    line-height: 0.56rem;
    background: #eee;
    position: relative;
    .youhui {
      position: absolute;
      width: 0.92rem;
      height: 0.35rem;
      top: -0.3rem;
      left: 0;
    }
    &.active {
      background: #40bd49;
      color: #fff;
    }
    &.l {
      border-radius: 0.1rem 0 0 0.1rem;
    }
    &.r {
      border-radius: 0 0.1rem 0.1rem 0;
    }
    &.mgrl {
      margin: 0 1px;
    }
  }
  &-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.9rem;
    /* margin-left: 0.3rem; */
    margin: 0 auto 0;
    input {
      padding: 0 0.4rem;
      color: #434343;
      width: 5.57rem;
      height: 0.8rem;
      background-color: #f9fafc;
      border-radius: 0.16rem;
      border: solid 0.01rem #d7d7d7;
      height: 0.8rem;
      margin-top: 0.04rem;
      &.coupon {
        height: 0.8rem;
        line-height: 0.8rem;
      }
    }
    .btn {
      display: flex;
      height: 1.05rem;
      width: 1.05rem;
      border-radius: 50%;
      // background: url(./imgs/confirm.png) no-repeat;
      // background-size: cover;
      img {
        width: 100%;
      }
    }
  }
  &-tip {
    font-size: 0.26rem;
    color: #999;
    width: 6.9rem;
    margin: 0.15rem auto;
  }
}
.tipmsg {
  width: 5.89rem;
  height: 6.24rem;
  background: url("../imgs/tip.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 2.2rem;
  .tipcontent {
    width: 80%;
    text-align: center;
    font-size: 0.34rem;
    margin: 0.3rem auto;
    line-height: 0.6rem;
  }
  .btntip {
    width: 3.43rem;
    height: 0.78rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
.tipmsg2 {
  height: 4.9rem;
}
.tipclose {
  width: 0.52rem;
  height: 0.52rem;
  margin: 0.3rem auto;
  img {
    width: 100%;
  }
}
.mypop {
  background: transparent;
}
.cityMsg {
  background: transparent;
  border-radius: 0.3rem;
  overflow: hidden;
  img {
    width: 6.5rem;
    display: block;
  }
}
.tipmsg1 {
  width: 5.88rem;
  min-height: 4rem;
  background: url(../imgs/tip.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  padding-bottom: 0.5rem;
  .tipcontent {
    font-size: 0.26rem;
    color: #333;
    text-indent: 0.4rem;
    line-height: 0.45rem;
    width: 80%;
    margin: 0.3rem auto;
  }
  .tiptop {
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 700;
    margin: 0.7rem auto 1rem;
    color: #fff;
  }

  .btnnext {
    width: 3.43rem;
    height: 0.78rem;
    margin: 0.3rem auto 0;
    img {
      width: 100%;
    }
  }
}
</style>
