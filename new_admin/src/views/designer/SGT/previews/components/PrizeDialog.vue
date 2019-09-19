<template>
  <div class="page">
    <!-- <img class="tplsSurface" :src="tplsSurface" /> -->
    <div class="dialog">
      <div class="dialog-main">
        <img :src="tpl.prizeDialogBg" v-highLight="'prizeDialogBg'" class="dialog-bg">
        <img :src="tpl.prizeImg" v-highLight="'prizeImg'" class="prizeImg">
        <img :src="tpl.prizeDialogBtn" v-highLight="'prizeDialogBtn'" class="dialog-btn">
      </div>
    </div>
  </div>

</template>
<script>
import { highLight } from "@/directive/highLight"; // waves directive

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
    return {};
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
}
.dialog-main {
  position: relative;
  margin: 150px auto 0;
  width: 295px;
  .dialog-bg {
    display: block;
    width: 100%;
  }
  .prizeImg {
    position: absolute;
    top: 100px;
    width: 100px;
    left: 50%;
    transform: translateX(-50px);
  }
  .dialog-btn {
    position: absolute;
    bottom: 22px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 120px;
  }
}
</style>
