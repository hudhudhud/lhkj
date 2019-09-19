<template>
  <div>
  
    <div class="page">
       <div class="finishing" v-highLight="'finishingImg'">
      <img :src="tpl.finishingImg" alt="" >
    </div>
      <div class="page-bg" v-highLight="'pageBg'">
        <img :src="tpl.pageBg" alt="" width="100%">
      </div>
      <div class="page-titlePng" v-highLight="'titlePng'">
        <img :src="tpl.titlePng" alt="">
      </div>
      <!-- <div class="page-rule" @click="PopupFlag=true" v-highLight> -->
      <div class="page-rule"   v-highLight="'ruleBtnImg'">
        <img :src="tpl.ruleBtnImg" alt="">
      </div>

      <div class="page-prize" v-highLight="'prizeBtnImg'">
        <img :src="tpl.prizeBtnImg" alt="">
      </div>

      <div class="page-tips" v-highLight="'bulletBg'" :style="{'backgroundImage': 'url(' + tpl.bulletBg+')', }">
        <!--         <img :src="tpl.bulletBg||tplDefault.bulletBg" alt="">
 -->
        <bullet></bullet>

      </div>
      <div class="page-circle">
        <HemiRotate ref="myRotate" :setting="tpl" @start="showPrize=true">
        </HemiRotate>
        <!-- <img :src="tpl.circleBg||tplDefault.circleBg" alt=""> -->

      </div>
      <div class="page-chance" v-highLight="'chanceBg'" :style="{'backgroundImage': 'url(' + tpl.chanceBg+')', }">
        剩余0次抽奖机会
      </div>
    </div>

    <!-- <div class="page-prize" @click="goPrize">
        <img :src="tplDefault.prizeImg" alt="">
      </div> -->
   <!--  <ruleDialog :setting="tpl" :PopupFlag="PopupFlag" @close-dialog="PopupFlag=false"></ruleDialog>
    <prizeDialog :setting="tpl" :PopupFlag="showPrize" @close-dialog="showPrize=false"></prizeDialog> -->

  </div>

  </div>
</template>
<script>
import { highLight } from "@/directive/highLight"; // waves directive

import titlePng from "./img/CanvasLettory/titlePng.png";
import ruleBtnImg from "./img/CanvasLettory/ruleBtnImg.png";
import bulletBg from "./img/CanvasLettory/bulletBg.png";
import circleBg from "./img/CanvasLettory/circleBg.png";
import chanceBg from "./img/CanvasLettory/chanceBg.png";
import ruleDialogBg from "./img/CanvasLettory/ruleDialogBg.png";
import finishingImg from "./img/CanvasLettory/finishingImg.png";
import pointerImage from "./img/CanvasLettory/pointerImage.png";
import ruleDialogClose from "./img/CanvasLettory/close.png";
import prizeDialogBg from "./img/CanvasLettory/prizeDialogBg.png";
import prizeImg from "./img/CanvasLettory/prizeImg.png";
import prizeBtnImg from "./img/CanvasLettory/prizeBtnImg.png";
import HemiRotate from "./lego/HemiRotate";
import bullet from "./lego/bullet";
// import ruleDialog from "./lego/ruleDialog";
// import prizeDialog from "./lego/prizeDialog";

// import prizeImg from './img/CanvasLettory/prizeImg.png'
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
    bullet,
  },
  data() {
    return {
      ruleSetting: {
        detail: "暂无说明",
        bgUrl: this.tpl.ruleDialogBg
      },
      PopupFlag: false,
      showPrize: false,
      tplDefault: {
        key: "CanvasLettory",
        pageBg: null,
        titlePng: titlePng,
        // prizeImg: prizeImg,
        ruleBtnImg: ruleBtnImg,
        prizeBtnImg: prizeBtnImg,
        ruleDialogBg: ruleDialogBg,
        ruleDialogClose: ruleDialogClose,
        circleBg: circleBg,
        chanceBg: chanceBg,
        prizeDialogBg: prizeDialogBg,
        prizeImg: prizeImg,
        finishingImg: finishingImg,
        bulletBg: bulletBg,
        pointerImage: pointerImage,
        pannelColor1: "rgb(99,153,57)",
        pannelColor2: "rgb(210,245,199)",
        pageColor: "#ccf3c0"
      }
    };
  },
  methods: {},
  mounted() {
    for (var i in this.tpl) {
      if (this.tpl[i]) {
        this.$set(this.tplDefault, i, this.tpl[i]);
      }
    }
    this.$emit("update-settings", this.tplDefault);
  }
};
</script>
<style lang="scss" scoped>
.finishing  {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  img {
   display: block;
   width: 100%;
  }
}
.page {
  position: absolute;
  width: 100%;
  height:100%;
  &-bg img {
    display: block;
  }
  &-titlePng img {
    display: block;
    margin: 18px auto 0;
    width: 287px;
  }
  &-rule,
  &-prize {
    position: absolute;
    right: 0;
    width: 55px;
    height: 40px;
    z-index: 10;
  }
  &-rule {
    top: 10px;
  }
  &-rule img,
  &-prize img {
    width: 100%;
  }
  &-prize {
    top: 70px;
  }

  &-tips {
    margin: 0 auto;
    width: 281px;
    height: 36px;
    background-size: 100% 100%;
    background-position: 0 -3px;
    background-repeat: no-repeat;
    padding: 0 10px 0 46px;
  }
  &-circle {
    display: block;
    margin: 20px auto;
    width: 294px;
  }
  &-chance {
    position:relative;
    z-index:100;
    color: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
    text-align: center;
    margin: 20px auto;
    width: 241px;
    background-size: 100% 100%;
  }
}
</style>

