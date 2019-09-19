<template>
  <div>
    <headerBar :title="act.actName"></headerBar>
    <div class="container">
      <div class="bg">
        <img
          src="./imgs/bg.jpg"
          alt
        >
      </div>
      <div
        class="rule-btn"
        @click="$href(`/luckyBoxH5/ruleCcb`);
"
      ></div>
      <div class="stars">
      </div>
      <div class="wrapper">
        <div
          v-for="(product,ind) in act.productList"
          :key="'product_'+ind"
        >
          <template>
            <div
              class="line"
              v-if="ind != 0"
            >
              <img
                src="./imgs/line.png"
                alt
              >
            </div>
            <div class="desc-box">
              <div class="left-avatar">
                <img
                  :src="sourceMap[ind].avatar"
                  alt
                >
              </div>
              <div class="right">
                <div
                  class="star-box"
                  v-if="orderList.length"
                >
                  <img
                    src="./imgs/littleStarOn.png"
                    v-for="(item, index) in startSetting[product.id]"
                    v-if="index < 5"
                    :key="'on'+index"
                    alt
                  >
                  <img
                    src="./imgs/littleStarOff.png"
                    v-for="(item, index) in 5 - startSetting[product.id]"
                    :key="'off'+index"
                    alt
                  >
                  <img
                    class="share-send"
                    src="./imgs/share-send.png"
                    alt
                    @click="ccbShare(product.id)"
                  >
                </div>
                <div
                  class="star-box"
                  v-else
                >
                  <img
                    src="./imgs/littleStarOff.png"
                    v-for="(item, index) in 5"
                    :key="'off'+index"
                    alt
                  >
                  <img
                    class="share-send"
                    src="./imgs/share-send.png"
                    alt
                    @click="ccbShare(product.id)"
                  >
                </div>

                <div class="desc-pic">
                  <img
                    :src="sourceMap[ind].brandImg"
                    alt
                  >
                </div>
              </div>
            </div>
          </template>
          <div
            v-for="(standard,ind2) in product.standardList"
            :key="'_standard_'+ind2"
          >
            <div class="standard-item">
              <div class="pro-img item">
                <img :src="standard.standardImgUrl">
                <div>{{standard.standardName}}</div>
              </div>
              <div class="pro-desc item">
                <div class="originalPrice">
                  商品原价：￥
                  <b>{{standard.originalPrice}}</b>
                </div>
                <div class="payPrice">
                  优惠价：￥
                  <b>{{standard.currentPrice}}</b>
                </div>
              </div>
              <div class="buy-btn item">
                <div
                  class="btn"
                  @click="buy(standard, act.actId)"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <img
          class="line"
          src="./imgs/line.png"
          alt
        >
        <img
          class="buttom-txt"
          src="./imgs/buttom-txt.png"
          alt
        >
        <!-- bullet -->
        <div
          class="bullet-box"
          v-if="flyList.length"
        >

          <div
            class="list"
            :style="{top:-bulletTop+'px'}"
          >
            <div
              class="bullet"
              v-for="(bullet,ind) in flyList"
              :key="ind"
            >
              {{bullet.txt}}
            </div>
          </div>

        </div>
        <!-- btn -->
        <div class="checkResultBtn">
          <img
            @click="showpayMsg=true"
            src="./imgs/checkPrizeBtn.png"
            alt=""
          >
        </div>
        <mt-popup
          v-model="showpayMsg"
          class="mypop"
          popup-transition="popup-fade"
        >
          <div class="main">
          </div>
        </mt-popup>
      </div>

    </div>
    <div
      class="dialog"
      v-if="openDialog"
    >
      <div class="card">
        <div class="star-ring">
          <img
            class="star"
            src="./imgs/dialog-star-on.png"
            v-for="(item, index) in amountStar"
            v-if="index < 5"
            :key="index+'on'"
            :style="{'margin': `${-Math.abs(30*(index -2)/ 2)}px 0`}"
          >
          <img
            class="star"
            src="./imgs/dialog-star-off.png"
            v-for="(item, index) in 5 - amountStar"
            :key="index+'off'"
            :style="{'margin': `${-Math.abs(30*(index+amountStar -2)/ 2)}px 0px`}"
          >
        </div>
        <div class="star-add">
          <img
            src="./imgs/luckyStarTxt.png"
            alt
          >
          +{{addStarNum}}
        </div>
        <div
          class="btn"
          @click="openDialog=false"
        ></div>
        <div class="share">
          首次转发可再点亮一颗幸运星
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceMap from './sourceMap.json';
import { Indicator, Toast, Popup } from 'mint-ui';
import { payUrl } from '@/config/';
import headerBar from '@/components/headerBar';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    headerBar,
    Popup
  },
  data () {
    return {
      timer: null,
      showpayMsg: false,
      flyList: [],
      bulletTop: 0,
      bulletList: [
        { txt: '恭喜159****9909抽中华为mate20手机' },
        { txt: '恭喜130****5219抽中戴森吹风机' },
        { txt: '恭喜139****7082抽中戴森吹风机' },
        { txt: '恭喜180****8357抽中猪年金钞' },
        { txt: '恭喜177****9266抽中猪年金钞' },
        { txt: '恭喜176****7775抽中猪年金钞' }
      ],
      openDialog: false,
      payUrl: payUrl,
      account: '',
      sourceMap: sourceMap,
      templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      timeStatusMap: {},
      running: false,
      orderList: [],
      proIdList: [],
      startSetting: {},
      orderProIdList: [],
      addStarNum: 0,
      shareProid: null,
      amountStar: 0,
      storeMap: {}
    };
  },
  methods: {
    startBullet () {
      if (this.bulletList.length) {
        let key = this.bulletList.length * Math.random();
        let bullet = this.bulletList[parseInt(key)];
        let fly = {
          txt: bullet.txt
        };
        this.flyList.push(fly);
      }
      this.bulletTop += 10 * parseInt(3 * Math.random());
      this.timer = setTimeout(this.startBullet, 1000);
    },
    ccbShare (proId) {
      if (!this.orderList.length) {
        Toast('请参与该板块的商品购买后再转发');
        return;
      }
      let url = `${window.location.protocol}//${window.location.host}/${
        this.$store.state.merchantAppid
      }/merchant/luckyBoxH5/index`;
      var dict = [];
      dict['scheme'] = 'ccbwebapi';
      dict['operation'] = 'webshare';
      dict['title'] = '苏州建行旺季风暴';
      dict['description'] = '点击参与';
      dict['url'] = encodeURIComponent(url);
      dict['imageurl'] =
        'http://static.lianhaikeji.com/images/20181229/c0b12863b615462d8fb6cf7141658a0b.jpeg';
      this.callNative(dict);
      this.addAttend(proId);
    },
    callNative (dict) {
      var para = this.makeParas(dict);
      this.executeCallIframe(
        dict['scheme'] + '://' + dict['operation'] + '?' + para
      );
    },
    executeCallIframe (url) {
      // 构造调用客户端分享功能的请求
      let iframe = null;
      if (iframe == null) {
        iframe = document.createElement('IFRAME');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      iframe.setAttribute('src', url);
    },
    makeParas (dict) {
      // 构造URL请求参数字符串
      var para = '';
      for (var key in dict) {
        if (key != 'scheme' && key != 'operation') {
          para = para + key + '=' + dict[key] + '&';
        }
      }
      para = para.substr(0, para.length - 1);
      return para;
    },
    async addAttend (proId) {
      let rs = await this.$post('api/add/attend/person', {
        actId: this.act.actId,
        remark: proId
      });
      if (rs.status == 200) {
        this.shareProid = proId;
        let key = proId.toString();
        this.startSetting[key] += 1;
        this.amountStar += 1;
        localStorage.setItem(
          this.act.actId + 'orderLength',
          parseInt(localStorage.getItem(this.act.actId + 'orderLength')) + 1
        );
      } else {
        // Toast(rs.error)
      }
    },
    async findAttend () {
      let rs = await this.$post('api/find/attend/person', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.shareProid = rs.payload;
      }
    },
    counter (arr1, i) {
      let newArr = [];
      while (arr1.indexOf(i) > -1) {
        newArr.push(arr1[arr1.indexOf(i)]);
        arr1.splice(arr1.indexOf(i), 1);
      }
      console.log(newArr.length);
      return newArr.length;
    },
    async loadOrder () {
      Indicator.open();
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.act.actId,
        status: 2
      });
      if (rs.status === 200) {
        await this.findAttend();
        let list = rs.payload.list;
        this.orderList = rs.payload.list;
        list.forEach(item => {
          this.orderProIdList.push(item.proId);
        });
        this.act.productList.forEach(element => {
          this.proIdList.push(element.id);
        });
        this.proIdList.forEach(element => {
          this.$set(
            this.startSetting,
            element,
            this.counter(this.orderProIdList, element.toString())
          );
        });

        this.$set(
          this.startSetting,
          this.shareProid,
          this.startSetting[this.shareProid] + 1
        );

        this.amountStar =
          this.shareProid == null
            ? this.orderList.length
            : this.orderList.length + 1;
        if (localStorage.getItem(this.act.actId + 'orderLength') > 0) {
          this.addStarNum =
            this.amountStar -
            localStorage.getItem(this.act.actId + 'orderLength');
        } else {
          this.addStarNum = this.orderList.length;
        }
        if (this.amountStar > 0) {
          this.openDialog = true;
        }
        localStorage.setItem(this.act.actId + 'orderLength', this.amountStar);
      }
      Indicator.close();
    },
    async signUp () {
      if (!this.account) {
        Toast('请输入您的手机号');
        return;
      }
      if (!new RegExp(/^1[3456789]\d{9}$/).test(this.account)) {
        Toast('您输入的手机号有误');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/attend/activity', {
        account: this.account,
        actId: this.act.actId
      });
      if (rs.status == 200) {
        Toast(rs.payload);
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    buy (standard, actId) {
      this.$href(`/index/convert/${standard.id}?actId=${actId}`);
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  },
  created () {
    this.loadOrder();
    this.startBullet();
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.container {
  position: absolute;
  top: 0.8rem;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  bottom: 0;
  .bg {
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .share-right {
    position: absolute;
    top: 1.2rem;
    right: 0;
    width: 1.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #09b6f2;
    font-weight: bold;
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
    border-radius: 0.3rem 0 0 0.3rem;
  }
  .rule-btn {
    position: fixed;
    top: 0.6rem;
    right: 0;
    margin-top: 0.35rem;
    width: 1.85rem;
    height: 0.7rem;
    background: url(./imgs/rule-bg.png) no-repeat;
    background-size: 100% 100%;
    z-index: 99;
    &.resule-btn {
      top: 1.6rem;
      background: url(./imgs/result.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .stars {
    position: absolute;
    top: 4.6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.93rem;
    margin: 0 auto 0.66rem;
    text-align: center;
    font-size: 0;
    img.star {
      width: 0.89rem;
      height: 0.87rem;
    }
    img.title {
      margin-top: 4rem;
      width: 5.19rem;
    }
  }
  .wrapper {
    position: absolute;
    width: 100%;
    top: 9.4rem;
    padding: 0.9rem 0.34rem 0;
    .line {
      text-align: center;
      img {
        width: 6.16rem;
      }
    }
    .desc-box {
      @include flex(row, nowrap, space-between, center);
      .left-avatar {
        img {
          margin: 0.2rem 0 0;
          width: 100%;
        }
      }
      .right {
        position: relative;
        margin-left: 0.2rem;
        padding-top: 0.2rem;
        .star-box {
          position: absolute;
          top: 0.28rem;
          left: 0.5rem;
          font-size: 0;
          img {
            width: 0.26rem;
          }
          .share-send {
            position: relative;
            left: 1.4rem;
            width: 1rem;
            bottom: 0.44rem;
          }
        }

        .desc-pic img {
          width: 100%;
        }
      }
    }
    .form {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      margin: 0.4rem auto 0.53rem;
      input {
        width: 4.62rem;
        height: 0.72rem;
        padding-left: 0.2rem;
        border-radius: 0.1rem;
        line-height: 0.72rem;
        color: #333;
        font-size: 0.34rem;
      }
      .signUp {
        width: 1.55rem;
        height: 1.56rem;
        background: url(./imgs/sign-btn.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 0.3rem;
      }
    }

    .standard-item {
      @include flex(row, nowrap, space-between, center);
      color: #564500;
      white-space: nowrap;
      margin-bottom: 0.3rem;
      margin-top: 0.2rem;
      font-size: 0.22rem;
      .item {
        flex: 1;
      }
      .pro-img {
        max-width: 1.69rem;
        margin-right: 0.3rem;
        img {
          width: 1.69rem;
          display: block;
        }
        text-align: center;
      }
      .pro-desc {
        font-size: 0.22rem;
        .originalPrice {
          position: relative;
          margin: 0.3rem 0 0.1rem;
          b {
            font-size: 0.34rem;
            &:after {
              content: " ";
              position: absolute;
              top: 0.08rem;
              left: 1.4rem;
              right: 0;
              border-bottom: 2px solid #fff;
              transform-origin: 0% 100%;
              transform: scaleY(0.8);
              transform: rotate(18deg);
            }
          }
        }
        .payPrice {
          b {
            font-size: 0.4rem;
            color: #c42303;
          }
        }
        b {
          padding-left: 0.1rem;
        }
      }
      .buy-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn {
          width: 1.72rem;
          height: 0.6rem;
          background: url(./imgs/buy-btn.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    p {
      text-align: center;
      img {
        width: 6.7rem;
      }
    }
    .line {
      display: block;
      margin: 0 auto 0.2rem;
      width: 6.16rem;
    }
    .buttom-txt {
      display: block;
      margin: 0 auto;
      width: 6.18rem;
    }
  }
}
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .card {
    position: relative;
    top: 4.6rem;
    width: 5.89rem;
    height: 6.54rem;
    margin: 0 auto;
    background: url(./imgs/star-card-new.png) no-repeat;
    background-size: 100% auto;
    .star-ring {
      position: relative;
      bottom: 0.7rem;
      white-space: nowrap;
      text-align: center;
      img {
        width: 1.18rem;
      }
    }
    .star-add {
      position: relative;
      top: 2.28rem;
      text-align: center;
      color: #fdd94d;
      font-weight: bold;
      font-size: 0.4rem;
      img {
        width: 1.24rem;
        vertical-align: -0.05rem;
      }
    }
    .btn {
      position: relative;
      margin: 0 auto;
      top: 2.9rem;
      width: 4.94rem;
      height: 0.88rem;
      background: url(./imgs/confirm.png) no-repeat;
      background-size: 100% auto;
    }
    .share {
      position: relative;
      top: 3.2rem;
      text-align: center;
      font-size: 0.26rem;
      color: #fff;
      img {
        vertical-align: -0.15rem;
        width: 0.47rem;
        margin: 0 0.1rem;
      }
    }
  }
}

.bullet-box {
  position: relative;
  overflow: hidden;
  text-align: center;
  margin: 0.3rem auto 0;
  background-size: 100% 100%;
  height: 0.62rem;
  line-height: 0.62rem;
  text-align: left;
  padding-left: 0.2rem;
  font-size: 0.26rem;
  .list {
    position: absolute;
    width: 100%;
    top: 0;
    left: 53%;
    transform: translateX(-50%);
    transition: all 5s;
    text-align: center;
    transition-timing-function: linear;
    & .bullet-fly {
      bottom: 100%;
    }
  }
}
.bullet {
  font-size: 0.26rem;
  color: rgb(240, 37, 81);
  height: 0.62rem;
  line-height: 0.62rem;
}
.checkResultBtn {
  width: 4.54rem;
  margin: 0.3rem auto;
  img {
    width: 100%;
  }
}
.mypop {
  background: transparent;
  .main {
    width: 5.7rem;
    height: 8.49rem;
    background: url(./imgs/letteryNotice.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
