<template>
  <Popup v-model="showDialog" lockScroll="true" pop-transition="popup-fade" modal="false">
    <div class="dialog-main" :style="{'backgroundImage': 'url(' + templateConfig.prizeDialogBg+')' }">
      <span class="dialog-close" :style="{'backgroundImage': 'url(' + templateConfig.ruleDialogClose+')' }"
        @click="close"></span>
      <template v-if="prize.proType !== '8'">
        <div class="dialog-title">
          恭喜您抽奖成功！
        </div>
        <div class="dialog-content">
          <div class="prize-img">
            <img :src="prize.standardImgUrl" alt="">
          </div>
          <p class="prize-tips">恭喜您获得</p>
          <p class="prize-prize">{{prize.prizeName}}</p>
        </div>
        <div class="dialog-action" @click="confirm">{{actionText}}</div>
      </template>
      <template v-else>
        <div class="dialog-title">
          很遗憾您未中奖！
        </div>
        <div class="dialog-action" @click="close">关闭</div>
      </template>
    </div>
  </Popup>
</template>

<script>
import { Popup } from 'mint-ui';
export default {
  name: 'custDialog',
  components: {
    Popup
  },
  props: {
    templateConfig: {
      require: true,
      type: Object
    },
    actionText: {
      type: String,
      default: '点击领取'
    }
  },
  data () {
    return {
      showDialog: false,
      prize: {
        prizeName: '',
        standardInstruction: '',
        proType: ''
      }
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
    setPrize (prize) {
      this.prize = prize;
    }
  }
};
</script>

<style scoped lang="scss">
.mint-popup {
  background-color: transparent;
}
.dialog-main {
  box-sizing: border-box;
  width: 6.38rem;
  height: 6.22rem;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  padding: 0.9rem 0 0.44rem;
  .dialog-close {
    position: absolute;
    top: 0.2rem;
    right: -0.2rem;
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    border-radius: 50%;
    background-size: cover;
  }
  .dialog-title {
    line-height: 1rem;
    font-size: 0.48rem;
    color: #fff;
  }
  .dialog-content {
    width: 100%;
    height: 2.45rem;
    margin: 0.3rem auto 0.32rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.28rem;
    color: #333;
    .prize-tips {
      color: #fe3f3d;
    }
    p {
      line-height: 0.4rem;
    }
  }
  .dialog-action {
    width: 3rem;
    height: 0.75rem;
    background-repeat: no-repeat;
    background-size: 100%;
    font-size: 0.34rem;
    color: #fff;
    background-color: rgb(18, 158, 235);
    margin: 0 auto;
    line-height: 0.75rem;
    border-radius: 0.4rem;
  }
}
</style>
