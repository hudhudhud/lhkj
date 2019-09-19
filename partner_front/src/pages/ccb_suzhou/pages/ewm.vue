<template>
  <div class="main">
    <div class="ewm">
      <img :src="src">
      <div class="score-list">
        <div class="score-item">
          <p>本月推荐<span>(个)</span></p>
          <p>{{bytj}}</p>
        </div>
        <div class="score-item">
          <p>总计<span>(个)</span></p>
          <p>{{zj}}</p>
        </div>
        <div class="score-item">
          <p>获得积分<span>(分)</span></p>
          <p>{{hdjf}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import config from '../config/index';
export default {
  data () {
    return {
      src: '',
      bytj: 0,
      zj: 0,
      hdjf: 0
    };
  },
  methods: {
    // 剩余积分
    async getTotalCredit () {
      let rs = await this.$post('/user_credit/get', {
        customId: this.$store.state.cust.id
      });
      if (rs.status == 200) {
        this.hdjf = rs.payload.accumulatedCredit
          ? rs.payload.accumulatedCredit
          : 0;
      } else {
        Toast(rs.error);
      }
    },
    loadEwm () {
      let cusid = this.$store.state.cust.id;
      let linkQrcode;
      if (navigator.userAgent.indexOf('MicroMessenger') === -1) {
        linkQrcode =
          window.location.protocol +
          '//' +
          window.location.host +
          `/customer/ccb/autoLogin/${
            config.merchantId
          }?redirectUrl=http%3A%2F%2F${
            window.location.host
          }%2Fpartner%2Fszjh%2Fhome%3Fshare%3D${cusid}`;
      } else {
        linkQrcode =
          window.location.protocol +
          '//' +
          window.location.host +
          '/partner/szjh?share=' +
          cusid;
      }
      this.src = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(
        linkQrcode
      )}&width=400&margin=0&correction=L`;
    },
    async getinfo () {
      let rs = await this.$post('/new_partner/countBoundUser', {});
      if (rs.status == 200) {
        this.zj = rs.payload.count;
      } else {
        Toast(rs.error);
      }
      let rs2 = await this.$post('/new_partner/countThisMonthBoundUser', {});
      if (rs2.status == 200) {
        this.bytj = rs2.payload.count;
      } else {
        Toast(rs2.error);
      }
    }
  },
  mounted () {
    this.loadEwm();
    this.getTotalCredit();
    this.getinfo();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  position: absolute;
  padding-bottom: 0.3rem;
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: url("./imgs/home_bg.png") no-repeat;
  background-size: 100% 100%;
}

.ewm {
  margin: 0.92rem auto 0 auto;
  width: 6.84rem;
  height: 8.5rem;
  background: url("./imgs/ewm_bg.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  img {
    width: 5.04rem;
    height: 5.08rem;
    margin-top: 0.46rem;
  }
}

.score-list {
  padding: 0 0.55rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-item {
  font-family: "PingFang SC";
  font-weight: bold;
  font-size: 0.32rem;
  p:first-child {
    color: rgb(6, 122, 77);
    span {
      font-size: 0.24rem;
    }
  }
  p:last-child {
    color: white;
    font-size: 0.4rem;
    margin-top: 0.52rem;
  }
}
</style>
