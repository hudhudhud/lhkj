<template>
  <div class="RuleDialog">
    <Popup
      v-model="showDialog"
      lockScroll="true"
      pop-transition="popup-fade"
      modal="false"
      :closeOnClickModal="maskClicked"
    >
      <div
        class="RuleDialog-close"
        @click="close"
      ></div>
      <div
        class="RuleDialog-main small"
        v-if="size==='small'"
      >
        <div class="RuleDialog-content small">
          <p>对不起，</p>
          <p>本次代金券已被抢购一空！</p>
          <p>期待您下次参与！</p>
          <div
            class="RuleDialog-action"
            @click="confirm"
          >确定</div>
        </div>
      </div>
      <div
        class="RuleDialog-main"
        v-else
      >
        <div class="RuleDialog-title">
          活动规则
        </div>
        <div
          class="RuleDialog-content"
          v-html="detail"
        >
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';
export default {
  name: 'ruleDialog',
  components: {
    Popup
  },
  props: {
    size: {
      default: 'big'
    }
  },
  data () {
    return {
      showDialog: false,
      maskClicked: true,
      detail: ''
    };
  },
  methods: {
    open () {
      this.showDialog = true;
    },
    close () {
      this.showDialog = false;
      this.$emit('close', this);
    },
    confirm () {
      this.$emit('confirm', this);
    },
    setDetail (detail) {
      this.detail = detail;
    }
  }
};
</script>

<style scoped lang="scss">
.RuleDialog {
  &-main {
    width: 6.55rem;
    height: 8.92rem;
    background-image: url("../img/border-big.png");
    background-size: 100% 100%;
    position: relative;
    padding-bottom: 0.3rem;
    background-color: transparent;
    &.small {
      height: 4.94rem;
      background-image: url("../img/border-small.png");
    }
  }

  &-close {
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    width: 0.68rem;
    transform: translateX(-50%);
    display: block;
    height: 0.65rem;
    border-radius: 50%;
    background-image: url(../img/close.png);
    background-size: 100% 100%;
    z-index: 88;
  }
  &-title {
    font-size: 0.34rem;
    color: #fe637d;
    text-align: center;
    padding-top: 1.92rem;
  }
  &-content {
    font-size: 0.24rem;
    line-height: 1.5;
    margin: 0.2rem auto;
    color: #333;
    width: 4.67rem;
    max-height: 5.8rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &.small {
      padding-top: 2.1rem;
      text-align: center;
      font-size: 0.28rem;
      color: #333;
      p {
        line-height: 1.5;
      }
    }
  }
  &-action {
    margin: 0.1rem auto;
    width: 2.6rem;
    height: 0.74rem;
    line-height: 0.74rem;
    background-color: #fe637d;
    border-radius: 0.1rem;
    color: #fff;
  }
  /deep/ .mint-popup {
    border-radius: 0.1rem;
    top: 50%;
    background: transparent;
  }
}
</style>
