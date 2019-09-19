<template>
  <div class="outer">
    <div class="header" :style="{'background-color': tpl.headerBgColor, 'color':tpl.textColor }">
      <div class="back-btn" :style="{'border-color': tpl.textColor }"></div>
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
  directives: { highLight }
};
</script>
<style lang="scss" scoped>
.outer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .header {
    position: relative;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #1cb4f8;
    .back-btn {
      position: absolute;
      transform: rotate(-45deg);
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      top: 17px;
      height: 12px;
      width: 12px;
      left: 14px;
    }
  }
}
</style>
