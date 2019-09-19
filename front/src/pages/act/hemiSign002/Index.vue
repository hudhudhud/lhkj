<template>
  <div>
    <div class="bgj-sign">
      <div class="bg">
        <img src="./imgs/IMG_BG.png" alt>
      </div>
      <div class="bgj-main">
        <div class="sign-bar">
          <!-- <div class="sign-title">
            点击电池签到
            <span>7</span>次可领取奖品哦～
          </div>-->
          <!-- 签到按钮 -->
          <div class="sign-button" @click="sign">
            <img src="./imgs/signpic.png" alt>
          </div>
          <div class="totalpoint">
            已累计获得
            <span>{{bgjTotal}}</span>分
          </div>
          <div class="sign-activity">
            <div class="sign-count">
              <div v-for="(item,index) in  arr" :key="'num' + index">
                <div v-if="item==continuity+1 && !isSigned" class="todayactive">
                  <span>天数</span>
                  <span>{{item}}</span>
                </div>
                <div v-else-if="item< continuity+1 " class="active">
                  <span>天数</span>
                  <span>{{item}}</span>
                </div>
                <div v-else>
                  <span>天数</span>
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="sign-getter" v-for="(prize,ind) in prizeList" :key="'prize'+ind">
              <template
                v-if="continuity == (isSigned ? prize.signPrize.signTimes : prize.signPrize.signTimes-1) && prize.signPrize.compare != '>'
                || continuity > (isSigned ? prize.signPrize.signTimes : prize.signPrize.signTimes-1) && prize.signPrize.compare == '>'"
              >
                <div class="sign-linten">
                  <img
                    :src="prize.signPrize.prizeImg||'//static.lianhaikeji.com/lib/imgs/default.jpg'"
                  >
                </div>
                <div class="info">
                  <div class="sign-fm" v-html="prize.signPrize.prizeName"></div>
                  <p>连续签到7次后</p>
                  <p>可领取更多积分哦～</p>
                </div>

                <div class="sign-receive" v-if="prize.drawState==1" @click="getPrize(prize)">领取</div>
                <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==2">已领取</div>
                <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==3">未满足</div>
                <div class="sign-receive sign-item-btn-dis" v-if="prize.drawState==4">已抢完</div>
              </template>
            </div>
          </div>
          <div class="rules">
            <img src="./imgs/IMG_HDGZ.png" alt>
            <div class="main" v-html="act.detail||'暂无说明'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      allclick: false,
      arr: [1, 2, 3, 4, 5, 6, 7],
      count: 0,
      day: 3,
      isSigned: false,
      signTimeArry: {},
      accumulative: [],
      continuity: 0,
      payUrl: payUrl,
      prizeList: [],
      bgjTotal: 0,
      resetPeriods: {
        '0': '',
        '1': '本周',
        '2': '本月',
        '3': '每日'
      }
    };
  },
  methods: {
    async sign () {
      Indicator.open();
      let rs = await this.$post('api/signIn/signIn', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.isSigned = true;
        Toast('签到成功');
        // 签到成功后，数据重新请求
        await this.loadSignState();
        this.loadPrizeList();
        this.getUserPrizeCount();
      } else {
        Toast(rs.error);
      }
      Indicator.close();
      this.day = this.day + 1;
    },
    async getUserPrizeCount () {
      let rs = await this.$post('api/signIn/getUserPrizeCount', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.bgjTotal = rs.payload;
      }
    },
    async getPrize (prize) {
      Indicator.open();
      let rs = await this.$post('api/signIn/addSignPrizeDraw', {
        actId: this.act.actId,
        signPrizeId: prize.signPrize.id
      });
      if (rs.status == 200) {
        Toast('领取成功');
        prize.drawState = 2;
        // 领取成功后，数据重新请求
        await this.loadSignState();
        this.loadPrizeList();
        this.getUserPrizeCount();
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async loadSignState () {
      let rs = await this.$post('api/signIn/getTodaySignState', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.isSigned = rs.payload.isSigned;
        this.signTimeArry = rs.payload.signTimeArry;
        this.continuity = rs.payload.signTimeArry['4'].continuity;
        if (this.continuity > 7 || (this.continuity == 7 && !this.isSigned)) {
          for (let i = 0; i < 7; i++) {
            this.arr[i] = i + 1 + parseInt((this.continuity + 1) / 7) * 7;
            console.log('arr', this.arr);
          }
        }
        console.log('4', rs.payload.signTimeArry['4'].continuity);
      } else {
        Toast(rs.error);
      }
    },
    async loadAct () {
      let rs = await this.$get('api/getActDetails/' + this.setting.actId);
      if (rs.status == 200) {
        this.act = rs.payload;
      } else {
        Toast(rs.error);
      }
    },
    async loadPrizeList () {
      let rs = await this.$post('api/signIn/querySignPrizeForCus', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        rs.payload.forEach(element => {
          this.prizeList.push(element);
        });
        console.log('prize', this.prizeList);
      } else {
        Toast(rs.error);
      }
    }
  },
  watch: {
    day: function (newday) {
      if (newday == 7) {
        this.allclick = true;
      }
    }
  },

  async created () {
    Indicator.open();
    await this.loadSignState();
    this.loadPrizeList();
    this.getUserPrizeCount();
    Indicator.close();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bgj-sign {
  position: absolute;
  width: 100%;
  height: 100%;
  .bg {
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .bgj-main {
    position: absolute;
    width: 100%;
    top: 3.16rem;
    padding: 0 0.28rem;
    .sign-bar {
      .totalpoint {
        margin: 0.2rem auto 0;
        text-align: center;
        font-size: 0.3rem;

        span {
          display: inline-block;
          padding: 0.08rem;
          border-radius: 0.06rem;
          vertical-align: middle;
          background-color: #9d4b24;
          font-size: 0.3rem;
          font-weight: bold;
          color: #fff;
        }
      }
      .sign-button {
        width: 3.24rem;
        height: 1.2rem;
        margin: 0.2rem auto 0;
        img {
          width: 100%;
        }
      }
      .sign-activity {
        position: relative;
        margin-top: 0.38rem;
        height: 4.32rem;
        background: url("./imgs/IMG_CD.png") no-repeat;
        background-size: 100% 100%;
        .sign-count {
          position: absolute;
          top: 0.19rem;
          left: 0.7rem;
          height: 1.52rem;
          width: 5.52rem;
          display: flex;
          flex-direction: row-reverse;
          div {
            flex: 1;
            margin: 0 0.05rem;
            div {
              width: 100%;
              height: 1.52rem;
              color: #fff;
              background-color: #666;
              border: 0.01rem solid #666;
              border-radius: 0.06rem;
              span {
                padding-top: 0.25rem;
                font-size: 0.24rem;
                display: block;
                text-align: center;
              }
              &.active {
                background-color: #fc5d8d;
                border: 0.01rem solid #fc5d8d;
                border-radius: 0.06rem;
              }
              &.todayactive {
                animation: myfirst 2s infinite;
                background-color: #fdc44a;
                border: 0.01rem solid #fdc44a;
                background-size: 100% 100%;
              }
            }
          }
        }
        .sign-getter {
          position: absolute;
          top: 2.82rem;
          left: 0.74rem;
          width: 5.4rem;
          // height: 1.04rem;
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: center;
          .sign-linten {
            img {
              width: 1.04rem;
            }
          }
          .info {
            flex: 1;
            padding: 0 0.3rem;
            font-size: 0.36rem;
            line-height: 0.34rem;
            color: rgb(51, 51, 51);
            font-weight: 500;
            span {
              display: block;
            }
            p {
              font-size: 0.2rem;
              color: #cdc5c7;
            }
          }
          .sign-receive {
            width: 1.4rem;
            height: 0.52rem;
            background: url(./imgs/BTN_LQ.png) no-repeat;
            background-size: 100% 100%;
            color: #fff;
            text-align: center;
            line-height: 0.52rem;
            font-size: 0.28rem;
            &.sign-item-btn-dis {
              background: url(./imgs/BTN_LQ_D.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .rules {
        background: url("./imgs/rulebg.png") no-repeat;
        background-size: 100% 100%;
        width: 6.94rem;
        height: 3.06rem;
        margin-top: 0.4rem;
        text-align: center;
        img {
          margin-top: 0.42rem;
          width: 1.96rem;
        }
      }
      .main {
        padding: 0.3rem;
        text-align: left;
        font-size: 0.28rem;
        color: #fff;
        line-height: 0.46rem;
      }
    }
  }
}
@keyframes myfirst {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
