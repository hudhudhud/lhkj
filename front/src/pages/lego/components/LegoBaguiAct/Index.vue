<template>
  <div class="tankuang" v-if="showTankuang">
    <div class="showget" v-show="showget">
      <div class="main">
        <img src="./imgs/wrong.png" alt="" @click="closeOrOpen('showTankuang','showget',false)" class="close">
        <img src="./imgs/get.jpg" alt="" @click="get" class="get">
      </div>
    </div>
    <div class="showMessage" v-show="showMessage">
      <div class="main">
        <img class="close" src="./imgs/wrong.png" alt="" @click="closeOrOpen('showTankuang', 'showMessage', false)">
        <div class="content">
          <div class="header">
            <img class="jing" src="./imgs/jing.jpg" alt="">
            <span>八桂金+10 </span>
          </div>
          <div class="details">
            恭喜你得到10个专属八桂金
            点击“我的八桂金”查看明细
            可在兑换专区中
            兑换您喜欢的礼品哦！
          </div>
          <div class="btn">
            <img class="know" src="./imgs/know.jpg" alt="" @click="closeOrOpen('showTankuang','showMessage',false)">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
export default {
  data () {
    return {
      showget: false,
      showMessage: false,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 562557677 : 551236566,
      secondActList: null,
      showTankuang: false
    };
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.secondActList = rs.payload;
      }
    },
    async determine (actId) {
      let rs = await this.$post('api/act/limit/', { actId: this.secondActId });
      if (rs.status === 200) {
        this.closeOrOpen('showTankuang', 'showget', true);
      }
    },
    closeOrOpen () {
      // 消息开关
      const args = Array.from(arguments);
      var boolean = args.pop();
      var vm = this;
      args.forEach(function (item) {
        vm[item] = boolean;
      });
    },
    get () {
      var std = this.secondActList
        ? this.secondActList.productList[0].standardList[0]
        : null;
      this.createOrder(std);
    },
    async createOrder (standard) {
      Indicator.open();
      let rs = await this.$post('api/activity/newCreateOrder', {
        actId: this.secondActId,
        standardId: standard.id,
        commodityNum: 1
      });
      if (rs.status === 200) {
        this.showget = false;
        this.showMessage = true;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  created () {
    this.loadAct(this.secondActId);
    this.determine(this.secondActId);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tankuang {
  width: 100%;
  min-height: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  overflow-y: auto;
  .showget {
    position: fixed;
    width: 100%;
    top: 0rem;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    overflow-y: auto;
    z-index: 100;
    .main {
      position: relative;
      width: 5.56rem;
      height: 7.47rem;
      margin: 2rem auto 0;
      background: url("./imgs/guijin1.jpg") no-repeat;
      background-size: 100% 100%;
      img.close {
        height: 0.57rem;
        width: 0.57rem;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
      }
      img.get {
        position: absolute;
        width: 1.68rem;
        height: 1.68rem;
        left: 0;
        right: 0;
        margin: 5rem auto 0;
      }
    }
  }
  .showMessage {
    position: fixed;
    width: 100%;
    top: 0rem;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    overflow-y: auto;
    z-index: 100;
    .main {
      position: relative;
      width: 5.82rem;
      height: 7.47rem;
      margin: 2rem auto 0;
      background: url("./imgs/guijin2.jpg") no-repeat;
      background-size: 100% 100%;
      img.close {
        height: 0.57rem;
        width: 0.57rem;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
      }
      .content {
        height: 4rem;
        width: 3.8rem;
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -1.7rem;
        div {
          text-align: center;
          width: 100%;
        }

        .header {
          position: relative;
          height: 20%;
          line-height: 0.8rem;

          img.jing {
            width: 0.46rem;
            height: 0.46rem;
            display: inline-block;
            position: absolute;
            top: 0.14rem;
            left: 0.65rem;
          }
          span {
            height: 0.6rem;
            display: inline-block;
            margin-left: 0.46rem;
            font-family: "FZZhengHeiS-DB-GB";
            color: #fbdb3e;
            font-size: 0.42rem;
            background-clip: text;
            -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
            background-image: -webkit-linear-gradient(
              top,
              #fff8da,
              #f9d016,
              #fff8da
            );
            -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
          }
        }
        .details {
          height: 60%;
          line-height: 0.5rem;
          color: #ffe16b;
          font-size: 0.3rem;
          font-weight: 700;
          text-shadow: 0.03rem 0.03rem 0.01rem #444;
        }
        .btn {
          height: 20%;
          line-height: 0.8rem;
        }
        img.know {
          width: 2.68rem;
          height: 0.68rem;
        }
      }
    }
  }
}
</style>
