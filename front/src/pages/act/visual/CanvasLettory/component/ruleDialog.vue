<template>
  <div class="RoleDialog">
    <Popup v-model="showDialog" lockScroll="true" pop-transition="popup-fade" modal="false" :closeOnClickModal="maskClicked">
      <div class="RoleDialog-main" :style="{'backgroundImage': 'url(' + templateConfig.ruleDialogBg+')', }">
        <span class="RoleDialog-close" :style="{'backgroundImage': 'url(' + templateConfig.ruleDialogClose+')', }"
          @click="close"></span>
        <div class="RoleDialog-title">
          活动规则
        </div>
        <div class="RoleDialog-content" v-html="detail">
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';
export default {
  props: {
    templateConfig: {
      require: true,
      type: Object
    }
  },
  name: 'ruleDialog',
  components: {
    Popup
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
.RoleDialog {
  &-main {
    width: 5.97rem;
    height: 7.8rem;
    background-size: 100% 100%;
    font-family: SourceHanSansCN-Medium;
    position: relative;
    padding-bottom: 0.3rem;
    background-color: transparent;
  }

  &-close {
    position: absolute;
    top: -0.4rem;
    right: -0.3rem;
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    border-radius: 50%;
    background-size: cover;
  }
  &-title {
    font-size: 0.44rem;
    color: #ff8a35;
    text-align: center;
    padding-top: 0.66rem;
  }
  &-content {
    font-size: 0.24rem;
    line-height: 1.5;
    color: #333;
    margin: 0.2rem 0.6rem;
    max-height: 5.6rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  /deep/ .mint-popup {
    border-radius: 0.1rem;
    top: 50%;
    background: transparent;
  }
}
</style>
