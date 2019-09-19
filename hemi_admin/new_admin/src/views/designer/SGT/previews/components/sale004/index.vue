<template>
  <div class="out-box" :style="{'background-color': tpl.pageColor}" v-highLight="'pageColor'">
    <div class="container" :style="{'background-image': 'url('+tpl.pageBg+')','height':ctxHeight}"
      v-highLight="'pageBg'">
      <div class="activity-box" :style="{'margin-top': proBoxTop}" v-highLight="'proBoxTop'">
        <img class="product-img" src="//static.lianhaikeji.com/images/20190801/ba24b08acad34afa9d17abf23a5236fc.png">
        <div class="progress-bar">
          <div>
            <span>已抢50%</span>
          </div>
        </div>
        <img class="buy-btn" :src="tpl.buyBtn" v-highLight="'buyBtn'">
      </div>
      <div class="container-bottom">
        <img class="rule-img" :src="tpl.ruleImg" v-highLight="'ruleImg'">
        <img class="order-img" :src="tpl.orderImg" v-highLight="'orderImg'">
      </div>
    </div>
  </div>
</template>

<script>
import { highLight } from "@/directive/highLight";

export default {
  props: {
    tpl: {
      type: Object,
      require: true
    }
  },
  directives: { highLight },
  computed: {
    ctxHeight() {
      let height = this.tpl.ctxHeight;
      if (!height) {
        return "603px";
      }
      let v = height.replace(/\s/g, "");
      if (v) {
        if (v == "auto") {
          return v;
        }
        if (v.indexOf("rem") >= 0) {
          let val = v.replace("rem", "");
          return val * 50 + "px";
        } else if (v.indexOf("px") >= 0) {
          let val = v.replace("px", "");
          return val / 2 + "px";
        } else {
          return v;
        }
      } else {
        return "603px";
      }
    },
    proBoxTop() {
      let height = this.tpl.proBoxTop;
      if (!height) {
        return "190px";
      }
      let v = height.replace(/\s/g, "");
      if (v) {
        if (v == "auto") {
          return v;
        }
        if (v.indexOf("rem") >= 0) {
          let val = v.replace("rem", "");
          return val * 50 + "px";
        } else if (v.indexOf("px") >= 0) {
          let val = v.replace("px", "");
          return val / 2 + "px";
        } else {
          return v;
        }
      } else {
        return "190px";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  .container {
    position: relative;
    width: 100%;
    height: auto;
    overflow-y: auto;
    background-repeat: no-repeat;
    background-size: 100%;
    .activity-box {
      width: 100%;
      img {
        max-width: 100%;
      }
      .progress-bar {
        position: absolute;
        width: 240px;
        top: 375px;
        border: 2px solid #feb000;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 6px;
        overflow: hidden;
      }
      .progress-bar div {
        display: block;
        width: 50%;
        position: relative;
        background: #feb000; /* 进度条背景颜色 */
        height: 12px; /* 高度 */
        line-height: 12px;
        span {
          position: absolute;
          font-size: 10px;
          color: #ec001d;
          top: 1px;
          left: 35px;
        }
      }
      .buy-btn {
        position: absolute;
        height: 35px;
        top: 404px;
        left: 102.5px;
        // transform: translateX(-50%);
      }
    }
    .container-bottom {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        height: 38px;
      }
    }
  }
}
</style>
