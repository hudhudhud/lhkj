<template>
  <div
    class="dialog"
    v-if="state"
  >
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div
            class="close"
            @click="hidedialog"
          ></div>
          <div
            class="modal-container"
            :class="content.type"
          >
            <!-- 文本消息 -->
            <div
              class="modal-main"
              v-html="dialogContent"
              v-if="content.type=='msg-dialog'"
            >
            </div>
            <!-- 购买机会 -->
            <div
              class="modal-main"
              v-if="content.type =='buy-lettery-chance'"
            >
              <!--  <p>亲， 您本月的抽奖机会已用完</p> -->
              <p>是否花费¥{{content.actualPrice}}购买一次抽奖机会 </p>
              <button @click="payForChance()">立即购买</button>
              <div v-if="content.actId == 546409986 || content.actId == 551180212|| content.actId == 557046383">所付款项将于2小时内原路退回</div>
            </div>
            <!-- 游戏规则 -->
            <div
              class="modal-main"
              v-if="content.type=='lottery-rules-dialog'"
            >
              <h4>游戏规则</h4>
              <p v-html='content.article'>
              </p>
            </div>
            <!-- 奖品列表 -->
            <div
              class="modal-main"
              v-if="content.type=='my-prizes-dialog'"
            >
              <img
                src="./imgs/my-prizes-pic.png"
                alt=""
              >
              <p>奖品列表</p>
              <ul
                v-infinite-scroll="loadPrize"
                infinite-scroll-immediate-check="false"
                infinite-scroll-disabled="noMore"
                infinite-scroll-distance="10"
              >
                <li
                  v-for="(prize, ind) in content.myPrizeList"
                  :key="'prize'+ind"
                >
                  <span>{{prize.proStandardName}}</span>
                  <!-- 0.未调用 1.调用中 2.已受理 3.调用失败 4.回调成功 5.回调失败 -->
                  <button v-if="prize.fishState == 4 && prize.proType != 2">已领取</button>
                  <button
                    v-else-if="prize.fishState == 3 || prize.fishState == 5"
                    class="receive-btn"
                    @click="goReceive(prize)"
                  ></button>
                  <button
                    v-else
                    class="receive-btn"
                    @click="goReceive(prize)"
                  ></button>
                </li>
                <div
                  v-if="!content.myPrizeList.length"
                  class="order-nomore"
                >快去抽奖赢取奖品吧</div>
                <div
                  v-if="noMore"
                  class="order-nomore"
                >没有更多了</div>
              </ul>
            </div>
            <!-- 抽奖结果 -->
            <div
              class="modal-main"
              v-if="content.type=='current-prize-dialog'"
            >
              <template v-if="content.proType==8">
                <img
                  class="gratulation-pic"
                  src="./imgs/noprize.png"
                  alt=""
                >
                <img
                  class="prizePic"
                  :src="content.prizePic"
                  alt=""
                >
              </template>
              <template v-else>
                <img
                  class="gratulation-pic"
                  src="./imgs/gratulation-pic.png"
                  alt=""
                >
                <img
                  class="prizePic"
                  :src="content.prizePic"
                  alt=""
                >
                <p>恭喜您获得{{content.prizeName }}</p>
                <div class="info">请到'我-我的奖品'查看奖品详情</div>
              </template>

            </div>
            <!-- 卡密领取 -->
            <div
              class="modal-main"
              v-if="content.type=='prize-dialog-2'"
            >
              <img
                :src="content.prizePic"
                alt=""
              >
              <p>{{content.prizeName}} {{cardPwd}}</p>
              <button
                v-if="content.Unreceived"
                @click="clickReceivePwd(content.prize)"
              ></button>
            </div>
            <!-- 直充领取 -->
            <div
              class="modal-main"
              v-if="content.type=='prize-dialog-1'"
            >
              <img
                :src="content.prizePic"
                alt=""
              >
              <p>恭喜您获得{{content.prizeName}}</p>
              <input
                v-if="content.Unreceived"
                type="text"
                v-model="account"
                placeholder="请您输入手机号领取"
              />
              <button
                v-if="content.Unreceived"
                @click="clickReceive(content.prize)"
              ></button>
            </div>
            <!-- 领取成功 -->
            <div
              class="modal-main"
              v-if="content.type=='receive-success-dialog'"
            >
              <img
                class="gratulation-pic"
                src="./imgs/receive-success.png"
                alt=""
              >
              <img
                class="prizePic"
                :src="content.prizePic"
                alt=""
              >
              <p>恭喜您获得{{content.prizeName}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  data () {
    return {
      loading: false,
      state: false,
      noMore: false,
      account: '',
      currentPage: 2,
      cardPwd: '',
      message: '',
      content: {},
      payUrl: payUrl
    };
  },
  methods: {
    async payForChance () {
      if (navigator.userAgent.indexOf('boc') > -1) {
        MessageBox({
          message: '请在完成支付后，点击左上角返回活动页面。',
          title: '重要提示',
          confirmButtonText: '去支付'
        }).then(action => {
          if (action == 'confirm') {
            this.payOrder();
          }
        });
      } else {
        this.payOrder();
      }
    },
    payOrder () {
      let successUrl = `${window.location.protocol}//${window.location.host}/${
        this.content.merchantAppid
      }/merchant/index/act/${this.content.actId}`;
      Toast('订单已生成...正在跳转支付');
      let payUrl = `${this.payUrl}${
        this.content.prepayId
      }?redirectUrl=${encodeURIComponent(successUrl)}`;
      window.location.href = payUrl;
    },
    async loadPrize () {
      Indicator.open();
      this.loading = true;
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.content.actId,
        pageSize: 10,
        currentPage: this.currentPage
      });
      if (rs.status === 200) {
        let list = rs.payload.list;

        if (!list || list.length === 0) {
          this.noMore = true;
        } else {
          // Array.prototype.push.apply(this.content.myPrizeList, list)
          list.forEach(item => {
            this.content.myPrizeList.push(item);
          });
        }
        this.currentPage++;
      }
      this.loading = false;
      Indicator.close();
    },
    hidedialog () {
      this.state = false;
    },
    goReceive (prize) {
      this.$dialog({
        state: true,
        content: {
          type: 'prize-dialog-' + prize.proType,
          Unreceived: true,
          prizeName: prize.proStandardName,
          prizePic: prize.standardImgUrl,
          prize: prize
        }
      });
    },
    async clickReceivePwd (prize) {
      Indicator.open();
      this.loading = true;
      let rs = await this.$post('api/order/draw', {
        orderCode: prize.orderCode
      });
      if (rs.status === 200) {
        this.cardPwd = JSON.parse(rs.payload)[0].cardPwd;
      } else {
        Toast(rs.error);
      }
      this.loading = false;
      Indicator.close();
    },
    async clickReceive (prize) {
      if (!this.account) {
        return;
      }
      Indicator.open();
      this.loading = true;
      let rs = await this.$post('api/order/draw', {
        orderCode: prize.orderCode,
        account: this.account
      });
      if (rs.status === 200) {
        // this.currentPage++
        this.$dialog({
          state: true,
          content: {
            type: 'receive-success-dialog',
            prizeName: prize.proStandardName,
            prizePic: prize.standardImgUrl,
            Unreceived: false
          }
        });
      } else {
        Toast(rs.error);
      }
      this.loading = false;
      Indicator.close();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 98;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    .close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: 0.24rem;
      margin-top: -0.82rem;
      border-radius: 50%;
      background: url(./imgs/close.png) no-repeat;
      background-size: cover;
    }
    .modal-container {
      margin: 0 auto;
      background-color: #fff;
      border-radius: 0.58rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
      text-align: center;
    }

    .msg-dialog {
      height: 2.7rem;
      width: 6rem;
      padding-top: 0.7rem;
      line-height: 0.46rem;
      background: url(./imgs/msg-dialog-bg.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.3rem;
      .modal-main {
        max-width: 5.76rem;
        margin: 0 auto;
        color: #623e37;
      }
    }
    .buy-lettery-chance {
      width: 6.06rem;
      height: 4.6rem;
      padding-top: 0.5rem;
      border-radius: 0.68rem;
      background: url(./imgs/receive-prize-bg.png) no-repeat;
      background-size: 100% 100%;
      p {
        line-height: 1.6rem;
      }
      button {
        width: 1.8rem;
        height: 0.6rem;
        background: #ff5c5d;
        border: none;
        border-radius: 0.5rem;
      }
      div {
        line-height: 0.5rem;
      }
    }
    .current-prize-dialog,
    .receive-success-dialog {
      width: 6.02rem;
      background: #fffee3;
      padding-bottom: 0.6rem;
      .gratulation-pic {
        width: 6.02rem;
        height: 2.57rem;
        margin-top: -1.54rem;
      }
      .prizePic {
        max-width: 3.8rem;
        margin: 0.4rem 0;
      }
      p {
        color: #5f3b34;
        padding-top: 0.5rem;
        font-size: 0.28rem;
      }
      .info {
        color: #666;
        line-height: 0.6rem;
      }
    }
    .my-prizes-dialog {
      width: 6.02rem;
      padding-bottom: 0.3rem;
      background: #fffee3;
      border-radius: 0.3rem;
      max-height: 8.76rem;
      p {
        line-height: 0.8rem;
      }
      img {
        width: 6.02rem;
        height: 2.57rem;
        margin-top: -1.54rem;
      }
      ul {
        width: 4.71rem;
        margin: 0 auto;
        padding: 0;
        max-height: 6.8rem;
        overflow-y: scroll;
        .order-nomore {
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          color: #999;
        }
        li {
          display: flex;
          justify-content: space-between;
          font-size: 0.28rem;
          line-height: 0.5rem;
          color: #999999;
          margin-bottom: 0.2rem;
          button {
            width: 1.76rem;
            height: 0.5rem;
            text-align: center;
            color: #999999;
            border: none;
          }
          .receive-btn {
            border: none;
            background: url(./imgs/click-receive.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .lottery-rules-dialog {
      width: 6.06rem;
      height: 8.76rem;
      padding-top: 0.66rem;
      background: #fffee3 url(./imgs/lettery-rules-bg.png) no-repeat;
      background-size: 100% 100%;
      border-radius: 0.7rem;
      color: #5c3731;
      h4 {
        font-size: 0.36rem;
        margin-bottom: 0.2rem;
      }
      p {
        font-size: 0.3rem;
        padding: 0.2rem;
        line-height: 0.4rem;
        text-align: left;
        height: 6.4rem;
        overflow: scroll;
      }
    }
    .prize-dialog-1,
    .prize-dialog-2 {
      width: 6.06rem;
      height: 7.12rem;
      margin: 0 auto;
      border-radius: 0.68rem;
      background: url(./imgs/receive-prize-bg.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.3rem;
      img {
        width: 3.86rem;
        height: 1.96rem;
        margin-bottom: 0.2rem;
        margin-top: 1.04rem;
      }
      p {
        color: #5f3b34;
        font-size: 0.28rem;
      }
      input {
        height: 0.8rem;
        width: 4.14rem;
        padding-left: 0.3rem;
        line-height: 0.8rem;
        display: block;
        border-radius: 0.6rem;
        margin: 0.44rem auto 0.8rem;
        border: 1px solid #e2e0da;
      }
      button {
        width: 1.92rem;
        height: 0.62rem;
        border: none;
        margin-top: 0.3rem;
        background: url(./imgs/receive-prize.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .prize-dialog-2 {
      height: 6.12rem;
      p {
        margin: 0.4rem 0 1.1rem;
      }
      button {
        margin-top: 0;
      }
    }
  }
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
