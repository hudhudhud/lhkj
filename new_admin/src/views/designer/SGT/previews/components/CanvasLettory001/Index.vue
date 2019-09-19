<template>
  <div>
    <div class="page">
      <div class="page-bg" v-highLight="'pageBg'">
        <img :src="tpl.pageBg" width="100%">
        <img :src="tpl.finishingImg" class="finishing">
      </div>
      <!-- <div class="page-rule" v-highLight="'ruleBtnImg'">
        <img :src="tpl.ruleBtnImg">
      </div> -->
      <div class="page-prize" v-highLight="'prizeBtnImg'">
        <img :src="tpl.prizeBtnImg">
      </div>
      <div class="page-main">
        <div class="page-circle">
          <HemiRotate ref="myRotate" :setting="tpl"></HemiRotate>
        </div>
        <div class="rule-box">
          <img :src="tpl.ruleImg" v-highLight="'ruleImg'">
          <div class="rule-desc">
            活动规则
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { highLight } from "@/directive/highLight"; // waves directive

import HemiRotate from "./HemiRotate";
import bullet from "./bullet";
export default {
  props: {
    tpl: {
      type: Object,
      require: true
    }
  },
  directives: { highLight },

  components: {
    HemiRotate,
    bullet
  },
  data() {
    return {
      ruleSetting: {
        detail: "暂无说明",
        bgUrl: this.tpl.ruleDialogBg
      },
      PopupFlag: false,
      showPrize: false
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &-main {
    position: absolute;
    width: 100%;
    top: 280px;
    .rule-box {
      box-sizing: border-box;
      width: 90%;
      margin: 15px auto 0;
      background-color: #fff;
      padding: 10px 10px 35px;
      border-radius: 10px;
      min-height: 680px;
      img {
        display: block;
        margin: 0 auto 8px;
        height: 60px;
      }
      .rule-desc {
        font-size: 12px;
        color: #333;
        line-height: 18px;
      }
    }
  }
  &-bg {
    position: relative;
    img {
      display: block;
      width: 100%;
    }
    .finishing {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
  }
  &-rule,
  &-prize {
    position: absolute;
    right: 0;
    width: 90px;
    height: 35px;
    z-index: 10;
  }
  &-rule {
    top: 10px;
  }
  &-prize img {
    width: 100%;
  }
  &-prize {
    top: 21px;
  }
  &-circle {
    display: block;
    margin: 20px auto;
    width: 294px;
  }
}
</style>

