<template>
  <div class="FruitDialog">
    <Popup v-model="showDialog" lockScroll="true" pop-transition="popup-fade" modal="false" :closeOnClickModal="maskClicked">
      <div class="FruitDialog-main">
        <span class="FruitDialog-close" :style="{'backgroundImage': 'url(' + templateConfig.ruleDialogClose+')', }"
          @click="close"></span>
        <div class="FruitDialog-title" :style="{'backgroundImage': 'url(' + templateConfig.prizeDialogBg+')', }">
          <p class="FruitDialog-title-tips" v-if="prize.proType !== '8'">恭喜您获得</p>
          <p class="FruitDialog-title-prize">{{prize.prizeName}}</p>
          <div class="FruitDialog-thanks" v-if="prize.proType === '8'">
            <img :src="prize.standardImgUrl" alt="">
          </div>
        </div>
        <div class="FruitDialog-content" v-if="prize.proType !== '8'">
          <div class="FruitDialog-action" @click="confirm">{{actionText}}</div>
          <div class="FruitDialog-desc">
            <p class="FruitDialog-desc-title">使用说明:</p>
            <div class="FruitDialog-desc-txt" v-html="prize.standardInstruction">
            </div>
          </div>
        </div>
        <div class="FruitDialog-content" v-if="prize.proType === '8'">
          <p class="FruitDialog-tips-title">温馨提示：</p>
          <p class="FruitDialog-tips">
            您可在生活频道首页—话费充值，满50元即可随机立减，最高立减20元，每月可享受一次 。
          </p>
          <div class="FruitDialog-action" @click="close">知道了</div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';
export default {
  name: 'FruitDialog',
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
      default: '立即支付'
    }
  },
  data () {
    return {
      showDialog: false,
      maskClicked: false,
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
.FruitDialog {
  &-main {
    width: 5.8rem;
    font-family: SourceHanSansCN-Medium;
    position: relative;
    padding-bottom: 0.3rem;
  }

  &-close {
    position: absolute;
    top: 0.2rem;
    right: -0.2rem;
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    border-radius: 50%;
    background-size: cover;
  }
  &-thanks {
    width: 1rem;
    height: 0.96rem;
    margin: 0.2rem auto;
    img {
      width: 100%;
    }
  }
  &-title {
    width: 100%;
    height: 3.44rem;
    background-size: 100% auto;
    margin-top: -0.6rem;
    padding-top: 0.6rem;
    text-align: center;
    &-tips {
      font-size: 0.32rem;
      margin-top: 0.6rem;
      color: #fff;
    }
    &-prize {
      font-size: 0.34rem;
      color: #ffe962;
      margin-top: 0.3rem;
    }
  }
  &-desc {
    width: 5rem;
    margin: 0.35rem auto;
    background-color: #e2fcd9;
    color: #333;
    text-align: justify;
    padding: 0.24rem 0.18rem;
    &-title {
      font-size: 0.25rem;
      font-weight: bold;
      margin-bottom: 0.1rem;
    }
    &-txt {
      font-size: 0.24rem;
      line-height: 1.5;
    }
  }
  &-action {
    width: 3.77rem;
    height: 0.77rem;
    margin: 0 auto;
    line-height: 0.77rem;
    font-size: 0.3rem;
    color: #feea6e;
    text-align: center;
    background-color: #ff8a35;
    border-radius: 0.39rem;
    box-shadow: 0 0.12rem 0.15rem 0 rgba(250, 149, 75, 0.43);
  }

  /deep/ .mint-popup {
    border-radius: 0.1rem;
    top: 50%;
  }
}
.FruitDialog-tips {
  padding: 0.1rem 0.2rem 0.2rem 0.2rem;
  &-title {
    padding: 0.1rem 0.2rem;
  }
}
</style>
