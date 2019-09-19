<template>
  <div>

    <div class="background" :style="{'backgroundImage': 'url('+ tpl.background+')'}">
    </div>

    <div class="wap">
      <img class="banner" v-highLight="'banner'" :src="tpl.banner" alt>

      <HemiGrid :template-config="tpl"></HemiGrid>

      <!-- <MessageModal
        v-model="payloadModal"
        :act="act"
      ></MessageModal> -->
      <template>
        <div class="btn-div">
          <button class="win-record" v-highLight="'recordBtn'"
            :style="{'backgroundImage': 'url('+ tpl.recordBtn+')'}"></button>
          <button class="act-detail" v-highLight="'ruleBtn'"
            :style="{'backgroundImage': 'url('+ tpl.ruleBtn+')'}"></button>
        </div>
      </template>

    </div>

  </div>
</template>

<script>
import HemiGrid from "../lego/HemiGridCommon";
import { highLight } from "@/directive/highLight";
export default {
  props: {
    tpl: {
      type: Object,
      require: true
    }
  },
  directives: { highLight },

  data() {
    return {
      order: null,
      orderCode: "",
      canPay: false,
      latestPayTime: null,
      latestPayTimeFormatted: "",
      PopupFlag: false,
      payloadModal: {}
    };
  },
  components: {
    HemiGrid
  },
  async created() {},
  methods: {
    openMessage(payload) {
      console.log(payload);
      this.payloadModal = payload;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.background {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  background-size: 100% 100%;
  img {
    display: block;
    width: 100%;
  }
}
.wap {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  overflow: auto;
  .banner {
    display: block;
    margin: 20px auto;
    width: 80%;
  }
  .btn-div {
    margin: 20px 0 30px;
    text-align: center;
    button {
      height: 30px;
      width: 90px;
      margin: 0 10px;
      border: none;
      background: none;
      &.win-record {
        background-size: 100% 100%;
      }
      &.act-detail {
        background-size: 100% 100%;
      }
    }
  }
}
.service-tel {
  text-align: center;
  color: #333;
  // background: #fff;
}
.remark {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
}
</style>
