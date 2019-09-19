<template>
  <div class="out-box" :style="{'background-color': tpl.pageColor}" v-highLight="'pageColor'">
    <div class="container" :style="{'background-image': 'url('+tpl.background+')', 'height': bgHeight}"
      v-highLight="'background'">
      <div class="card-box" :style="{'background-image': 'url('+tpl.cardBg+')'}" v-highLight="'cardBg'">
        <div class="card-body">
          <scratch-card element-id='scratchWrap' :ratio="0.4" :move-radius="30" :clear-callback="clearDone">
            <div slot='result' class="prize-result">
              一等奖
            </div>
          </scratch-card>
        </div>
        <div v-show="isBtnShow" class="start-scratch" @click="startScratch"
          :style="{'background-image': 'url('+tpl.startBtn+')'}" v-highLight="'startBtn'"></div>
      </div>
      <div class="prize-desc" :style="{'background-image': 'url('+tpl.prizeDesc+')'}" v-highLight="'prizeDesc'"></div>
      <div class="view-act-rule" :style="{'background-image': 'url('+tpl.viewRuleBtn+')'}" v-highLight="'viewRuleBtn'">
      </div>
      <div class="rule-holder">
        活动规则
      </div>
    </div>
  </div>
</template>
<script>
import { highLight } from "@/directive/highLight";
import ScratchCard from "./scratch-card";

export default {
  props: {
    tpl: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      isBtnShow: true
    };
  },
  components: { ScratchCard },
  directives: { highLight },
  methods: {
    clearDone() {
      // this.isOpen = true;
    },
    startScratch() {
      if (this.isBtnShow) {
        this.isBtnShow = false;
      }
    }
  },
  computed: {
    bgHeight() {
      let height = this.tpl.bgHeight;
      if (!height) {
        return "1100px";
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
        return "1100px";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
}
.container {
  width: 100%;
  min-height: 667px;
  background-repeat: no-repeat;
  background-size: 100%;
  .card-box {
    position: relative;
    display: inline-block;
    width: 319px;
    height: 210px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-top: 220px;
    margin-left: 5.5%;
    .card-body {
      position: absolute;
      background: #c9c9c9;
      width: 230px;
      height: 183px;
      top: 13px;
      left: 65px;
      .prize-result {
        color: #f00;
        font-size: 25px;
        text-align: center;
        margin-top: 75px;
        font-weight: bold;
      }
    }
    .start-scratch {
      position: absolute;
      z-index: 10;
      width: 230px;
      height: 183px;
      background-repeat: no-repeat;
      background-position: center;
      top: 13px;
      left: 64px;
      background-size: 80%;
    }
  }
  .prize-desc {
    display: inline-block;
    width: 286px;
    height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin: 15px 36px 18px;
  }
  .view-act-rule {
    width: 140px;
    height: 35px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin: 0 110px;
  }
  .rule-holder {
    box-sizing: border-box;
    height: 429px;
    color: #333;
    font-size: 15px;
    padding: 40px 26px;
  }
}
// .dialog {
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.6);
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   z-index: 99;
//   .main {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 83.46%;
//     height: 6.33rem;
//     transform: translate(-50%, -50%);
//     background: url(//static.lianhaikeji.com/images/20190709/e48f14fd7e6a44029eb8ea7a86b64620.png)
//       no-repeat;
//     background-size: 100%;
//     .prize-img {
//       display: inline-block;
//       width: 1.75rem;
//       height: 1.75rem;
//       margin-top: 1.3rem;
//       margin-left: 35.5%;
//     }
//     .dialog-info {
//       display: inline-block;
//       color: #fc575a;
//       font-size: 0.28rem;
//       width: 52.7%;
//       line-height: 0.4rem;
//       margin-top: 0.2rem;
//       margin-left: 27%;
//     }
//     .close-btn {
//       width: 0.6rem;
//       height: 0.6rem;
//       background: url(//static.lianhaikeji.com/images/20190709/c04d6229bc25483c99c399c1beffd662.png)
//         no-repeat;
//       background-size: 100%;
//       position: absolute;
//       top: -0.7rem;
//       right: -0.1rem;
//     }
//     .view-btn {
//       width: 54.3%;
//       height: 0.86rem;
//       background: url(//static.lianhaikeji.com/images/20190709/f000de6bd2a44032b8386cd1e39a0584.png)
//         no-repeat;
//       background-size: 100%;
//       position: absolute;
//       bottom: 0.26rem;
//       left: 50%;
//       transform: translateX(-50%);
//     }
//   }
// }
</style>
