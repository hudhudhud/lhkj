<template>
  <div>
    <img
      class="banner"
      :src="setting.bannerUrl"
      alt=""
      @click="show=true"
    >
    <mt-popup
      v-model="show"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="tipdetail">
        <div
          class="content"
          style="text-align:center;"
        >
          <input
            type="text"
            v-model="inviteCode"
            placeholder="请输入您的邀请码"
          >
          <div>
            <button @click="jump">确定</button>

          </div>
        </div>

      </div>

    </mt-popup>
  </div>
</template>
<script>
export default {
  props: {
    setting: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      inviteCode: '',
      show: false
    };
  },
  methods: {
    jump () {
      if (this.inviteCode == this.setting.pass) {
        window.location.href = this.setting.targetUrl;
      } else {
        this.$toast('你输入的邀请码已失效');
        this.show = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  display: block;
  margin: 0.2rem auto 0.3rem;
  width: 90%;
}

.tipdetail {
  width: 5.8rem;
  background: #fff;
  padding: 0.7rem 0.6rem;
  .content {
    line-height: 0.46rem;
    font-size: 0.28rem;
    color: #333;
    text-align: center;
    input {
      padding-left: 0.2rem;
      font-size: 0.28rem;
      border: 1px solid #666;
      height: 0.66rem;
      line-height: 0.66rem;
    }
    button {
      font-size: 0.3rem;
      color: #fff;
      line-height: 0.66rem;
      height: 0.66rem;
      background: #f3432d;
      border-radius: 0.2rem;
      padding: 0 0.4rem;
      border: none;
      margin-top: 0.4rem;
    }
  }
}
</style>
