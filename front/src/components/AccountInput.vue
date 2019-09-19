
<template>
  <div>
    <mt-popup
      v-model="show"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="showCommitPhoneNum msgBox">
        <div
          class="input"
          v-if="standard"
        >
          <label for=""> 请输入{{standard.accountName}} <input
              type="text"
              v-model="account"
            >
          </label>
        </div>
        <div
          class="btn"
          @click="commitAccount"
        >确定</div>
      </div>

    </mt-popup>
  </div>
</template>
<script>
export default {
  name: 'AccountInput',
  props: ['show', 'standard'],
  data () {
    return {
      account: ''
    };
  },
  methods: {
    commitAccount () {
      if (this.account == '') {
        this.$toast('请输入' + this.standard.accountName);
        return;
      }
      if (this.standard.accountPattern) {
        if (!new RegExp(this.standard.accountPattern).test(this.account)) {
          this.$toast(this.standard.accountName + '格式有误');
          return;
        }
      }
      this.$emit('emit-account', this.account);
    }
  }
};
</script>
<style lang="scss" scoped>
.showCommitPhoneNum {
  width: 5rem;
  height: 3.6rem;
  text-align: center;
  background: #fff;
  .top-bar {
    line-height: 0.8rem;
    color: #fff;
    text-align: center;
  }
  .input {
    margin: 0.5rem auto 0.6rem;
    text-align: center;
  }
  input {
    width: 2.8rem;
    border-bottom: 1px solid #666;
    padding-left: 0.2rem;
    line-height: 0.5rem;
    font-size: 0.3rem;
  }
  .btn {
    width: 2rem;
    line-height: 0.56rem;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    background: #418c2e;
    background-size: 100% 100%;
  }
}
</style>
