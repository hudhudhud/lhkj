<template>
  <div class="main">
    <div class="back-btn" @click="$router.back()">&lt;</div>
    <div class="input">
      <textarea v-model="msg"></textarea>
    </div>
    <div class="button">
      <div class="ckdf"></div>
      <div class="tjfk" @click="tjfk"></div>
    </div>
    <div :class="{'showSuccess': showSuccess}" class="success"></div>
    <div class="ckls" @click="$router.push('feedbackHistory')"></div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  data () {
    return {
      showSuccess: false,
      msg: '',
      submited: false
    }
  },
  methods: {
    async tjfk () {
      if (this.submited) {
        Toast('您已提交成功，请勿重复提交');
        return;
      }
      Indicator.open()
      let rs = await this.$post('/staff/saveFeedback', {
        cusId: this.$store.state.cust.id,
        mid: this.$store.state.cust.merchantId,
        msg: this.msg
      })
      if (rs.status === 200) {
        this.submited = true
        this.showSuccess = true
        setTimeout(() => {
          this.showSuccess = false
        }, 2000)
      } else {
        Toast('保存失败')
      }
      Indicator.close()
    }
  }
}
</script>

<style scoped>
  .back-btn {
    position: fixed;
    color: #fff;
    background: rgba(0,0,0,0.1);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    text-align: center;
    font-size: 0.4rem;
    line-height: 0.5rem;
    font-weight: bolder;
    top: 0.2rem;
    left: 0.2rem;
  }
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("./imgs/feedback_bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .input {
    margin: 1.06rem auto 0 auto;
    width: 6.87rem;
    height: 3.33rem;
    background: url("./imgs/qfkndwt.png") no-repeat;
    background-size: 100% 100%;
  }

  .input textarea {
    border: none;
    background: none;
    color: rgb(51, 51, 51);
    font-size: 0.3rem;
    text-align: left;
    font-family: simhei;
    resize: none;
    margin-top: 1.2rem;
    padding: 0 0.3rem;
    width: 100%;
    height: 2rem;
  }

  .button {
    margin-top: 0.54rem;
    width: 100%;
    height: 0.7rem;
    display: flex;
    justify-content: center;
  }

  .ckdf {
    display: none;
    width: 2.5rem;
    height: 0.7rem;
    margin-right: 0.28rem;
    background: url("./imgs/ckdf.png") no-repeat;
    background-size: 100% 100%;
  }

  .tjfk {
    width: 2.5rem;
    height: 0.7rem;
    background: url("./imgs/tjfk.png") no-repeat;
    background-size: 100% 100%;
  }

  .success {
    margin: 0 auto;
    margin-top: 0.4rem;
    width: 2.54rem;
    height: 2.38rem;
    background: url("./imgs/tjcg.png") no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .showSuccess {
    opacity: 1;
  }

  .ckls {
    background: url("./imgs/cklswtjdf.png") no-repeat;
    background-size: 100% 100%;
    width: 5.23rem;
    height: 1.66rem;
    margin: 0 auto;
  }
</style>
