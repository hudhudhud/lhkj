<template>
  <div class="RoleDialog">
    <Popup v-model="showDialog" lockScroll="true" pop-transition="popup-fade" modal="false"
      :closeOnClickModal="maskClicked">
      <div class="RoleDialog-main" :style="{'backgroundImage': 'url(' + templateConfig.ruleDialogBg+')', }">
        <span class="RoleDialog-close" :style="{'backgroundImage': 'url(' + templateConfig.ruleDialogClose+')', }"
          @click="close"></span>
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
    width: 100vw;
    height: 9.03rem;
    background-size: 100% 100%;
    font-family: SourceHanSansCN-Medium;
    position: relative;
    padding-bottom: 0.3rem;
    background-color: transparent;
  }

  &-close {
    position: absolute;
    bottom: 0;
    left: 50vw;
    transform: translateX(-50%);
    display: block;
    width: 0.78rem;
    height: 0.78rem;
    background-size: 100%;
  }
  &-content {
    display: inline-block;
    font-size: 0.26rem;
    line-height: 1.5;
    color: #333;
    margin: 1.5rem 18vw 0;
    max-height: 5.7rem;
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
