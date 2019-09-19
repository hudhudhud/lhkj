<template>
  <div class="register-input">
    <div class="msg">
      <img
        src="./img/register/phone.png"
        alt=""
      >
      <input
        type="text"
        placeholder="请输入手机号"
        v-model="tel"
        disabled="true"
      >
    </div>
    <!-- <div class="msg">
      <img
        src="./img/register/yanzheng.png"
        class="yanzheng"
        alt=""
      >
      <input
        type="text"
        placeholder="请输入验证码"
      ><span
        class="clickget"
        :style="{'color': theme||'#fff'}"
      >点击获取</span>
    </div> -->
    <div
      class="msg"
      v-if="showdepart || false"
    >
      <img
        src="./img/register/student.png"
        alt=""
        class="student"
      >
      <input
        type="text"
        placeholder="请输入学生号"
        v-model="mark"
      >
    </div>
    <div
      class="btnsure"
      :style="{'backgroundColor':theme ||'#fff'}"
      @click="handlesure()"
    >确认报名</div>
  </div>
</template>
<script>
export default {
  name: 'register',
  props: {
    theme: {
      require: false,
      type: String
    },
    showdepart: {
      require: false,
      type: Boolean
    }
  },
  data () {
    return {
      tel: this.$store.state.cust ? this.$store.state.cust.tel : '',
      mark: '',
      list: { tel: '', mark: '' }
    };
  },
  methods: {
    handlesure () {
      this.list.tel = this.tel;
      this.list.mark = this.mark;
      console.log(999, this.list);
      this.$emit('handlesure', this.list);
    }
  }
};
</script>
<style lang="scss" scoped>
.msg {
  width: 6rem;
  height: 0.92rem;
  background-color: #f6f2ff;
  border-radius: 0.46rem;
  margin: 0.2rem auto;
  position: relative;
  img {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    margin: auto auto auto 0.4rem;
    width: 0.24rem;
    height: 0.36rem;
  }
  input {
    width: 3.5rem;
    outline-style: none;
    border: 0px;
    height: 0.9rem;
    background: #f6f2ff;
    line-height: 0.9rem;
    font-size: 0.28rem;
    color: #999999;
    margin: 0.01rem auto auto 0.9rem;
  }
  .clickget {
    width: 1.5rem;
    font-family: SourceHanSansCN-Normal;
    font-size: 0.28rem;
    // color: #5e53f0;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.1rem;
    margin: auto 0.2rem auto auto;
    line-height: 0.92rem;
    height: 0.92rem;
    text-align: center;
  }
  .yanzheng {
    width: 0.28rem;
    height: 0.32rem;
  }
  .student {
    width: 0.39rem;
    height: 0.29rem;
  }
}
.btnsure {
  width: 6rem;
  height: 0.92rem;
  // background: url("./img/register/btnsure.png");
  // background-size: 100% 100%;
  margin: 0.38rem auto;
  line-height: 0.92rem;
  text-align: center;
  font-size: 0.3rem;
  color: #fff;
  border-radius: 0.44rem;
}
</style>
