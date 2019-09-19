<template>
  <div>
    <div class="bgj-sign">
      <div class="bg">
        <img :src="tpl.pageBgImg" alt>
      </div>
      <div class="bgj-main">
        <div class="sign-bar">
          <div class="sign-title">
            点击电池签到
            <span>7</span>次可领取奖品哦～
          </div>
          <div class="sign-activity" :style="{'backgroundImage': 'url(' + tpl.chargeImg+')'}">
            <div class="sign-count">
              <div v-for="(item,index) in  7" :key="'num' + index">
                <div v-if="index==1" class="todayactive" :style="{'backgroundImage': 'url(' + tpl.signImg+')'}">
                  <span>次数</span>
                  <span>{{item}}</span>
                </div>
                <div v-else-if="index==0 " class="active" :style="{'backgroundImage': 'url(' + tpl.signedImg+')'}">
                  <span>次数</span>
                  <span>{{item}}</span>
                </div>
                <div v-else :style="{'backgroundImage': 'url(' + tpl.waitSignImg+')'}">
                  <span>次数</span>
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="sign-getter">
              <div class="sign-linten">
                <img :src="'//static.lianhaikeji.com/lib/imgs/default.jpg'">
              </div>
              <div class="sign-fm" v-html="'测试'"></div>
              <div class="sign-receive" :style="{'backgroundImage': 'url(' + tpl.receiveBtnImg+')'}">领取</div>
            </div>
          </div>
          <div class="rules">
            <img :src="tpl.ruleTitleImg" alt="">
          </div>
          <div class="main" v-html="'暂无说明'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tpl: {
      type: Object,
      require: true
    },
    data() {
      return {
        arr: [1, 2, 3, 4, 5, 6, 7],
      }
    },
  },
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
    top: 180px;
    padding: 0 14px;
    .sign-bar {
      .sign-title {
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        color: #fff;
        span {
          color: #fbda30;
          font-size: 14px;
          font-weight: bold;
        }
      }
      .sign-activity {
        position: relative;
        margin-top: 14px;
        height: 215px;
        background-size: 100% 100%;
        .sign-count {
          position: absolute;
          top: 9px;
          left: 35px;
          height: 76px;
          width: 276px;
          display: flex;
          flex-direction: row-reverse;
          div {
            flex: 1;
            margin: 0 2px;
            div {
              width: 100%;
              height: 76px;
              color: #fff;
              background-size: 100% 100%;
              span {
                padding-top: 12px;
                font-size: 12px;
                display: block;
                text-align: center;
              }
              &.active {
                background-size: 100% 100%;
              }
              &.todayactive {
                animation: myfirst 2s infinite;
                background-size: 100% 100%;
              }
            }
          }
        }
        .sign-getter {
          position: absolute;
          top: 141px;
          left: 37px;
          width: 270px;
          // height: 1.04rem;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .sign-linten {
            img {
              width: 52px;
            }
          }
          .sign-fm {
            flex: 1;
            padding: 0 15px;
            font-size: 14px;
            line-height: 17px;
            color: rgb(51, 51, 51);
            span {
              display: block;
            }
          }
          .sign-receive {
            width: 70px;
            height: 26px;
            background-size: 100% 100%;
            color: #fff;
            text-align: center;
            line-height: 26px;
            font-size: 14px;
            &.sign-item-btn-dis {
              filter: grayscale(100%);
            }
          }
        }
      }
      .rules {
        margin-top: 44px;
        text-align: center;
        img {
          width: 100px;
        }
      }
      .main {
        padding: 15px;
        text-align: left;
        font-size: 14px;
        color: #fff;
        line-height: 23px;
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
