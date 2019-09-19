<template>
  <div>
    <headerBar :title="tpl.title || '卡券特卖'" :bg-color="tpl.headBgColor"></headerBar>
    <div class="seckill">
      <div class="banner">
        <a>
          <img class="banner-img" :src="tpl.banner">
        </a>
      </div>
      <div class="chances">
        剩余<span>0</span>次购买机会
      </div>
      <div class="seckill-container">
        <div class="seckill-wrapper">
          <div class="plate-item">
            <div class="plate-info">
              <div class="item-img">
                <img src="//static.lianhaikeji.com/images/20190711/19ad557ffe1d4cd298886959b7871483.png">
              </div>
              <div class="item-detail">
                <div class="proName">
                  测试
                  <!-- <span>(每人限购一个)</span> -->
                </div>
                <div class="proDesc">原价1元</div>

              </div>
              <div class="item-price">
                <!-- <span>￥{{standard.currentPrice}}</span> -->
                <b>￥10元</b>
              </div>
              <div class="item-btn">
                <div class="surplusStock">剩余0件</div>
                <div class="btn" :style="{'backgroundColor': tpl.buyBtnColor,'backgroundImage': 'url(' + tpl.buyBtnImg+')'}">
                  <template v-if="!tpl.buyBtnImg">
                    抢购
                  </template></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="act-rule">
        <div class="rule-title">活动规则</div>
        <div class="detail" v-html="'暂无说明'"></div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import headerBar from './lego/headerBar';
export default {
  props: {
    tpl: {
      type: Object,
      require: true
    }
  },
  components: {
    headerBar
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  background: #fff;
  .chances {
    width: 80%;
    height: 30px;
    line-height: 30px;
    margin: 20px auto 0;
    border-radius: 15px;
    background: rgb(255, 246, 232);
    color: rgb(34, 34, 34);
    font-size: 14px;
    text-align: center;
    span {
      display: inline-block;
      padding: 0 2px;
      color: rgb(243, 67, 91);
      font-size: 16px;
    }
  }
  .seckill-container {
    width: 100%;
    padding-bottom: 27px;
    color: #333;
    .ad {
      margin: 0 12px;
    }
    .title {
      padding-top: 20px;
      height: 45px;
      background-size: 100% 100%;
      background-position-x: -2px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
    }
    .seckill-wrapper {
      .plate-item {
        border-bottom: 1px dashed #939393;
        &:nth-last-child(1) {
          border: none;
        }
        .seckill-title {
          padding-top: 12px;
          white-space: nowrap;
          line-height: 30px;
          font-size: 16px;
          color: #fff;
          .time-item {
            display: inline-block;
            font-size: 0;
            div {
              display: inline-block;
              text-align: center;
              width: 30px;
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              &.time-bg {
                background-size: 100% 100%;
              }
            }
          }
        }
        .plate-info {
          display: flex;
          padding: 15px 5%;
          align-items: center;
          .item-img {
            flex: 1;
            font-size: 0;
            max-width: 60px;
            height: 60px;
            margin-right: 3%;
            padding: 5px;
            img {
              width: 55px;
              height: 55px;
              border-radius: 50%;
              margin-left: -6%;
              margin-top: -6%;
            }
          }
          .item-btn {
            width: 90px;
            .surplusStock {
              color: #000;
              font-size: 12px;
              margin: 0.5px 0 3px;
            }
            .btn {
              margin: 0 auto;
              background-size: 100% 100%;
              color: white;
              border-radius: 8px;
              text-align: center;
              padding: 0;
              width: 55px;
              line-height: 23px;
            }
            .storeMap {
              font-size: 12px;
            }
            div {
              text-align: center;
            }
          }
          .item-detail {
            flex: 2;
            height: 50px;
            line-height: 20px;
            .proName {
              font-size: 14px;
            }
            .proDesc {
              color: #ffa8a8;
              text-decoration: line-through;
              font-size: 12px;
              line-height: 35px;
            }
            .expire {
              display: flex;
              align-items: center;
              font-size: 12px;
              .currentPrice {
                flex: 1;
              }
            }
          }
          .item-price {
            flex: 1;
            b {
              color: #db1d34;
            }
          }
        }
      }
    }
    .act-rule {
      padding: 15px;
      .rule-title {
        font-size: 16px;
        padding: 10px 0;
      }
      .detail {
        line-height: 20px;
      }
    }
  }
}
.banner-img {
  display: block;
  max-width: 100%;
}

.running-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}
.running {
  position: fixed;
  z-index: 1988;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  background: #fff;
  padding: 50px 20px;
  text-align: center;
  font-size: 15px;
  line-height: 25px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
