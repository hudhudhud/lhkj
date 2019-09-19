<template>
  <div class="UseTipDialog">
    <Popup
      v-model="showDialog"
      lockScroll="true"
      pop-transition="popup-fade"
      modal="false"
      :closeOnClickModal="maskClicked"
    >
      <div class="UseTipDialog-main">
        <p class="UseTipDialog-title">商品说明</p>
        <p class="UseTipDialog-title-second">{{secondTitle}}</p>
        <div class="UseTipDialog-content">
          <slot></slot>
        </div>
        <div class="UseTipDialog-tip">可上下滑动商品说明</div>
        <div
          class="UseTipDialog-action"
          @click="confirm"
        >知道了</div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';

export default {
  name: 'UseTipDialog',
  components: {
    Popup
  },
  props: {
    secondTitle: {
      type: String
    }
  },
  data () {
    return {
      tips: '',
      showDialog: false,
      maskClicked: false
    };
  },
  methods: {
    open () {
      this.showDialog = true;
    },
    close () {
      this.showDialog = false;
      this.$parent.custPopOpen = false;
      this.$emit('close');
    },
    confirm () {
      this.showDialog = false;
      this.$parent.custPopOpen = false;
      this.$emit('confirm');
    }
  }
};
</script>

<style scoped lang="scss">
.UseTipDialog {
  &-main {
    width: 6.23rem;
    font-family: SourceHanSansCN-Medium;
    position: relative;
    padding-bottom: 0.45rem;
    margin: 0 auto;
  }

  &-title {
    color: #fe6270;
    font-size: 0.48rem;
    padding: 0.53rem 0 0.33rem 0;
    text-align: center;
    &-second {
      font-size: 0.33rem;
      color: #555454;
      text-align: center;
    }
  }

  &-content {
    margin: 0.24rem;
    padding: 0 0.2rem;
    font-size: 0.24rem;
    text-align: justify;
    color: #333;
    line-height: 1.5;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    height: 2.8rem;
  }
  &-tip {
    width: 100%;
    font-size: 0.24rem;
    color: red;
    text-align: left;
    padding-left: 0.5rem;
  }
  &-action {
    width: 3rem;
    height: 0.81rem;
    line-height: 0.81rem;
    color: #fe6270;
    margin: 1.8rem auto;
    font-size: 0.36rem;
    text-align: center;
    background-color: #fccb35;
    box-shadow: 0 0.04rem 0.04rem 0 rgba(11, 2, 5, 0.3),
      inset 0 -0.11rem 0.08rem 0 #fbf15c;
    border-radius: 41px;
  }

  /deep/ .mint-popup {
    border-radius: 0.29rem;
    background-image: url("../imgs/dialogback.png");
    background-size: 100% 100%;
    width: 7.45rem;
    height: 7.86rem;
    background-color: transparent;
  }
}
</style>
