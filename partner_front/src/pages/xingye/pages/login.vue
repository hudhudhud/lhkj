<template>
  <div class="main">
    <div class="login">
      <div class="login-client login-button" @click="goAuth">
        <img src="./imgs/login_btn.jpg" alt>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config';
import { gotoAuth } from '@/router';

export default {
  methods: {
    goAuth () {
      let targetURL = window.location.href.replace('login', 'Home');
      gotoAuth(config.merchantId, targetURL, true);
    }
  },
  created () {
    if (this.$store.state.cust) {
      this.$router.push('Home')
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #e4e9ed;
  }
  .login {
    position: absolute;
    width: 100%;
    height: 12.85rem;
    background: #eff0f1;
    overflow-y: auto;
    background: url("./imgs/login_bg.jpg") no-repeat;
    background-size: 100% 100%;
    padding-top: 11.05rem;
    .login-button {
      width: 6.12rem;
      height: 1.09rem;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .login-staff {
      margin-top: 0.38rem;
    }
  }
</style>
