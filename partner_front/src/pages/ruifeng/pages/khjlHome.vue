<template>
  <div style="background: #ffffff; height: 100%;">
    <div style="width: 88%; margin: 0 auto;">
      <div class="banner1">
        <img src="./imgs/zldkhjlpt.png"/>
      </div>
      <div class="bot_div">
        <img src="./imgs/wdyxewm.png" @click="wdyxewm"/>
        <img src="./imgs/wdkh.png" @click="wdkh"/>
        <img src="./imgs/yxyjjl.png" @click="yxyjjl"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      hasInfo: false,
      form: {
        name: '',
        mobile: '',
        card_num: ''
      }
    };
  },
  methods: {
    wdyxewm () {
      this.$router.push('khjlewm');
    },
    wdkh () {
      this.$router.push('khxxlb');
    },
    yxyjjl () {
      Toast('功能暂未开放，尽请期待！');
    }
  },
  async created () {
  }
}
</script>

<style scoped>
  .banner1 {
    padding-top: 1.4rem;
    text-align: center;
  }
  .banner1 img {
    height: 0.49rem;
  }
  .bot_div {
    text-align: center;
    width: 100%;
    margin: 1.08rem auto 0 auto;
  }
  .bot_div img {
    height: 1.8rem;
    margin: 0 auto 0.7rem auto;
  }
</style>
