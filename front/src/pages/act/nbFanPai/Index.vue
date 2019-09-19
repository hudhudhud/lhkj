<template>
  <div :class="{active:showprice}">
    <back></back>
    <div class="yifenchou">
      <div class="header">

      </div>
      <div class="main">
        <div class="bg">
          <div class="pai">
            <div
              class="fanpai-item"
              v-for="i in 4"
              :key='i'
            >
              <FanPai
                :index="i"
                :payload="payload"
                :res="res"
                @action="lettery(i)"
              ></FanPai>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <mt-popup
          v-model="showprice"
          class="mypop"
          popup-transition="popup-fade"
        >
          <div class="price">
            <div class="cover"></div>
            <img
              src="./imgs/close.png"
              alt=""
              class="close"
              @click="close2"
            >
            <img
              :src="prize.standardImgUrl"
              class="imgprize"
              alt=""
            >
            <p class="more more1">{{prize.prizeName}}</p>
            <p
              class="more"
              v-if="prize.proType==11"
            >请前往微信页面领取红包</p>
            <p
              class="more"
              v-else
            >请到 我的-我的订单 充值使用</p>
            <img
              src="./imgs/get.png"
              alt=""
              class="btn"
              @click="close2"
            >
          </div>
        </mt-popup>
      </transition>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast, Popup, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
import { loadChance } from '@/lib/api';
import FanPai from './components/FanPai';
import pannel from './imgs/pannel.png';
import pannelBack from './imgs/pannelback.jpg';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      payUrl: payUrl,
      showImg: false,
      showprice: false,
      secondActList: null,
      mask: null,
      chances: 0,
      num: null,
      protype: '',
      showp: false,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 557194802 : 555417496,
      prize: [],
      merchantId: this.$store.state.merchantId,
      orderCode: '',
      institutionNum: '',
      payload: {
        w: '100%',
        h: '3.6rem',
        pannel: pannel,
        pannelBack: pannelBack,
        transformFlag: false,
        index: -1
      },
      res: {
        prize: ''
      }
    };
  },
  components: {
    [Popup.name]: Popup,
    FanPai
  },
  methods: {
    show () {
      this.showprice = true;
    },
    close2 () {
      this.showprice = false;
    },
    async lettery (i) {
      if (this.chances < 1) {
        Toast('您的机会已用尽');
        return;
      }
      let token = this.$store.state.token;
      if (!token) {
        MessageBox({
          message: '抽奖前，需要您登陆哦',
          title: '提示',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        }).then(action => {
          if (action == 'confirm') {
            this.choujiang(i);
          }
        });
      } else {
        this.choujiang(i);
      }
    },
    async choujiang (i) {
      Indicator.open();
      let rs = await this.$post('api/lottery_draw', {
        actId: this.secondActId
      });
      if (rs.status == 200) {
        this.chances--;
        this.prize = rs.payload;
        this.$set(this.res, 'prize', rs.payload);
        this.$set(this.payload, 'index', i);
        this.$set(this.payload, 'transformFlag', true);
        setTimeout(() => {
          this.showprice = true;
        }, 1500);
      } else {
        Toast({
          message: rs.error,
          position: 'middle',
          duration: 1500
        });
      }
      Indicator.close();
    }
  },
  created () {
    loadChance(this.act.actId, rs => {
      this.chances = rs.payload.chances;
    });
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.active {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.yifenchou {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #e44a38;
  padding-bottom: 0.2rem;
  .header {
    position: relative;
    width: 100%;
    height: 3.2rem;
    background: url("./imgs/header.jpg") no-repeat 0 0rem;
    background-size: 100% 100%;
    .btnrule {
      position: absolute;
      width: 1.9rem;
      height: 0.72rem;
      top: 0.8rem;
      right: 0;
      background: url("./imgs/rulebtn.jpg") no-repeat;
      background-size: 100% 100%;
    }
  }
  .main {
    width: 100%;
    min-height: calc(100vh - 3rem);
    background: url("./imgs/bg.jpg") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding-bottom: 0.1rem;
    padding-top: 0.01rem;
    .bg {
      position: relative;
      margin-top: -1rem;
      height: 10.7rem;
      width: 100%;
      background: url("./imgs/bg2.jpg") no-repeat;
      background-size: 100% 100%;
      padding-top: 0.01rem;
      img.btnbuy {
        width: 4.16rem;
        margin-top: 0.1rem;
      }
      .pai {
        width: 6rem;
        height: 7.8rem;
        display: flex;
        justify-content: space-around;
        margin: 1.8rem auto 0;
        flex-wrap: wrap;
        .fanpai-item {
          width: 2.65rem;
          height: 3.6rem;
        }
      }
    }
  }
}
.sorryDialog {
  width: 6.93rem;
  height: 8.31rem;
  background: url("./imgs/tankuang.jpg") no-repeat 0.4rem 0;
  background-size: 100% 100%;
  .content {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    .headertop {
      height: 1.15rem;
      width: 4.03rem;
      background: url("./imgs/thanks.jpg") no-repeat;
      background-size: 100% 100%;
      margin: 0.3rem auto;
    }
    .header {
      height: 0.41rem;
      width: 2.08rem;
      background: url("./imgs/yaoqing.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.3rem auto;
    }
    .body {
      width: 1.95rem;
      height: 1.69rem;
      background: url(./imgs/youku.png) no-repeat;
      background-size: 100% 100%;
      margin: 0.35rem auto;
    }
    .btn {
      width: 3.24rem;
      height: 0.83rem;
      background: url("./imgs/btntiyan.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .tips {
      span {
        font-size: 0.3rem;
        color: rgb(249, 1, 69);
        font-weight: 600;
      }
      color: #888882;
      font-size: 0.28rem;
      width: 5rem;
      margin: 0.3rem auto;
      padding-left: 0.3rem;
      line-height: 0.4rem;
      text-align: justify;
    }
  }
}
.mypop {
  background: transparent;
  top: 35%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.price {
  position: relative;
  height: 6.31rem;
  width: 6.93rem;
  position: relative;
  margin: 2rem auto 0;
  background: url("./imgs/tankuang.jpg") no-repeat 0.4rem 0;
  background-size: 100% 100%;
  border-top: 0.01rem solid transparent;
  .cover {
    width: 2.08rem;
    height: 0.41rem;
    background: url("./imgs/conslts.jpg") no-repeat;
    background-size: 100% 100%;
    margin: 0.8rem auto 0;
  }
  .close {
    position: absolute;
    top: -0.5rem;
    right: 0rem;
    height: 0.52rem;
    width: 0.53rem;
  }
  .imgprize {
    width: 2.2rem;
    display: block;
    margin: 0.2rem auto 0.1rem;
    left: 0;
    right: 0;
  }
  .btn {
    height: 1.33rem;
    width: 3.74rem;
    display: block;
    margin: 0.15rem auto 0;
  }
  .more {
    width: 5rem;
    margin: 0 auto;
    text-align: center;
    font-family: SourceHanSansCN-Medium;
    font-size: 0.24rem;
    letter-spacing: 0px;
    color: #fd144b;
  }
  .more1 {
    color: rgb(255, 161, 0);
  }
  .methods {
    width: 4.6rem;
    height: 2.5rem;
    margin: 0.1rem auto;
    padding-left: 0.2rem;

    line-height: 0.4rem;
    h5 {
      font-size: 0.24rem;
      color: #fd144b;
      margin-bottom: 0.1rem;
    }
    .detail {
      width: 4.6rem;
      height: 2rem;
      font-size: 0.24rem;
      color: #666666;
      overflow: scroll;
      text-align: justify;
    }
  }
}
</style>
