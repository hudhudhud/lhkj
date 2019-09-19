<template>
  <div class="page">
    <img class="tplsSurface" :src="tplsSurface" />
    <div class="dialog">
      <div class="main">
        <div class="container">
          <img :src="tpl.thanksDialogBg" v-highLight="'thanksDialogBg'" alt="" class="banner">
          <div class="ruleCont">
            <img :src="tpl.thanksImg" alt="" v-highLight="'thanksImg'">

          </div>
          <!-- <img :src="setting.btn" alt="" class="btn" @click="createOrder(setting)"> -->
        </div>
        <img class="close" :src="tpl.thanksDialogClose" v-highLight="'thanksDialogClose'" alt="">
      </div>
    </div>
  </div>

</template>
<script>
import { highLight } from "@/directive/highLight"; // waves directive

import ruleDialogBg from "./img/CanvasLettory/ruleDialogBg.png";
import ruleDialogClose from "./img/CanvasLettory/close.png";
import prizeDialogBg from "./img/CanvasLettory/prizeDialogBg.png";
import prizeImg from "./img/CanvasLettory/prizeImg.png";
export default {
  name: "ActDialog",
  props: {
    tpl: {
      type: Object,
      require: true
    },
    tplsSurface: {
      type: String,
      require: true
    }
  },
  directives: { highLight },

  data() {
    return {
      tplDefault: {
        pageBg: null,
        ruleDialogBg: ruleDialogBg,
        ruleDialogClose: ruleDialogClose,
        prizeDialogBg: prizeDialogBg,
        prizeImg: prizeImg,
        pageColor: "#ccf3c0"
      }
    };
  },
  mounted() {
    /*   for (var i in this.tpl) {
      if (this.tpl[i]) {
        this.$set(this.tplDefault, i, this.tpl[i]);
      }
    }
    this.$emit("update-settings", this.tplDefault); */
  }
};
</script>
<style lang="scss" scoped>
.tplsSurface {
  display: block;
  width: 100%;
}
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  /*  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  } */
}
.myPopup {
  background: transparent;
  text-align: center;
}
.close {
  position: relative;
  top: 10px;
  display: block;
  margin: 0 auto;
  z-index: 19939316;
  width: 30px;
}
.container {
  margin: 80px auto 0;
  width: 295px;
  .banner {
    display: block;
    width: 100%;
  }
  .ruleCont {
    width: 295px;
    h1 {
      text-align: center;
      font-size: 16px;
      font-weight: normal;
      color: #ff7e2f;
    }
    img {
      display: block;
      margin: 0 auto;
      width: 44px;
      position: absolute;
      top: 300px;
      left: 50%;
      margin-left: -22px;
    }
    p {
      color: #333;
      line-height: 38px;
      text-align: left;
    }
  }
  .btn {
    position: relative;
    bottom: 1.2rem;
    display: block;
    margin: 0 auto;
    width: 4.6rem;
  }
  .content {
    font-size: 0.28rem;
    color: rgb(59, 23, 0);
    line-height: 0.45rem;
    height: 3.5rem;
    overflow: scroll;
    span {
      color: rgb(240, 11, 0);
    }
  }
}
</style>

