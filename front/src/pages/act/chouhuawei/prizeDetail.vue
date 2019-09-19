<template>
  <div v-if="prize">
    <back></back>
    <div class="bg">
      <div class="bg-header">
      </div>
      <div class="bg-center">
        <div class="prize">
          <img
            :src="prize.standardImgUrl"
            alt=""
          >
        </div>
      </div>
      <div class="bg-main">
        <div class="ruledetail">
          <div class="info">
            <h1>领取信息</h1>
            <span>手机号：{{mobile}}</span>
          </div>

          <div class="rule">
            <img
              v-if="prize.proType==1"
              class="use"
              src="./imgs/use.png"
              alt=""
              @click="$router.push(`/${$store.state.merchantAppid}/merchant/shenzhenBOC/guide`)"
            >
            <h1>
              温馨提示:
            </h1>
            <div v-html="standardInstruction">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="bg">
      <img
        class="img"
        src="./imgs/prize-bg.jpg"
        alt=""
      >
      <div class="main">
        <div class="wrap">
          <div class="prize-name">
            {{prize.proStandardName}}
          </div>

          <div class="cloud-cover">
            <img
              src="./imgs/btn-use.png"
              alt=""
              @click="$router.push(`/${$store.state.merchantAppid}/merchant/shenzhenBOC/guide`)"
            >
          </div>
        </div>

      </div>

    </div> -->
  </div>

</template>

<script>
// import { Indicator, Toast } from 'mint-ui';

export default {
  data () {
    return {
      mobile: this.$store.state.cust.tel,
      name: this.$store.state.cust.name,
      prize: null,
      standardInstruction: '',
      actId: this.$route.params.actId,
      list: []
    };
  },

  components: {},
  methods: {
    async loadStd (proStandardId) {
      this.loading = true;
      let rs = await this.$post('api/getStandard/' + proStandardId);
      if (rs.status == 200) {
        this.standardInstruction = rs.payload.standardInstruction;
        console.log(rs.payload);
      }
    },
    async loadAct (actId) {
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + this.actId);
      if (rs.status === 200) {
        this.rule = rs.payload.detail;
      }
    },
    async loadOrder () {
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.actId,
        status: 2
      });
      if (rs.status === 200) {
        let list = rs.payload.list;
        this.prize = list[0];
        this.loadStd(list[0].proStandardId);
        list.forEach((item, i) => {
          this.list.push(item);
        });
      }
    }
  },
  created () {
    this.loadAct();
    this.loadOrder();
  }
};
</script>
<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url("./imgs/bg-bottom.jpg") repeat-y;
  background-size: 100% auto;
  overflow-y: auto;
  .bg-header {
    width: 100%;
    height: 2.2rem;
    background: url("./imgs/header2.jpg") no-repeat;
    background-size: 100% 100%;
    overflow: auto;
  }
  .bg-center {
    width: 100%;
    height: 6.74rem;
    background: url("./imgs/bg-center.png") no-repeat;
    background-size: 100% 100%;
    overflow: auto;
    .prize {
      position: relative;
      height: 3.1rem;
      width: 3.36rem;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
  }
  .bg-main {
    width: 100%;
    .ruledetail {
      width: 6.86rem;
      height: 6.46rem;
      background: url("./imgs/rulebg.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      padding-top: 1.6rem;
      margin: -3rem auto 1rem;
      .info {
        height: 1.4rem;
        width: 6.86rem;
        text-align: center;
        position: absolute;
        top: 0;
        h1 {
          font-weight: bold;
          font-size: 0.36rem;
          color: white;
          margin: 0.24rem auto;
        }
        span {
          font-size: 0.32rem;
          color: white;
          font-weight: bold;
          display: inline-block;
          margin: 0 0.5rem 0.24rem 0.4rem;
        }
      }
      .rule {
        text-align: left;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        color: rgb(51, 51, 51);
        font-size: 0.28rem;
        text-align: justify;
        line-height: 0.4rem;
        height: 4.6rem;
        overflow-y: scroll;
        h1 {
          color: rgb(208, 96, 130);
          font-size: 0.36rem;
          font-family: SimHei;
        }
        .use {
          display: block;
          width: 2.2rem;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
