<template>
  <div class="login">
    <div class="login-client login-button" @click="clientlogin(1)">
      <img src="./imgs/clientlogin.png" alt>
    </div>
    <div class="login-staff login-button" @click="stafflogin(2)">
      <img src="./imgs/stafflogin.png" alt>
    </div>
  </div>
</template>

<script>
import config from '../config';
import { gotoAuth } from '@/router';

export default {
  methods: {
    async customLoginStatus () {
      if (!this.$store.state.cust) {
        let targetURL = window.location.href;
        gotoAuth(config.merchantId, targetURL, true);
      }
      if (this.$store.state.cust.tel) {
        this.getCustom();
      }
    },
    clientlogin () {
      this.$router.push({
        name: 'clientlogin',
        query: { custId: this.$route.query.custId }
      }); // 登陆换路由
    },
    stafflogin () {
      this.$router.push({
        name: 'stafflogin',
        query: { custId: this.$route.query.custId }
      }); // 登陆换路由
    },
    async getCustom () {
      let rs = await this.$post('/custom/get/custom/by_customId');
      if (rs.status == 200) {
        this.$store.commit('setToken', rs.payload.jwt);
        this.$store.commit('setCust', rs.payload.cust);
        sessionStorage.setItem('partner_' + config.merchantId + '_token', rs.payload.jwt);
        sessionStorage.setItem('partner_' + config.merchantId + '_cust', JSON.stringify(rs.payload.cust));
        localStorage.setItem('partner_' + config.merchantId + '_token', rs.payload.jwt);
        localStorage.setItem('partner_' + config.merchantId + '_cust', JSON.stringify(rs.payload.cust));
        if (rs.payload.cust.customType == 1) {
          // 员工
          window.location.replace(
            `${window.location.protocol}//${
              window.location.host
            }/partner/shzh/home`
          );
        } else if (rs.payload.cust.customType == 2) {
          window.location.replace(
            `${window.location.protocol}//${
              window.location.host
            }/partner/shzh/hometwo`
          );
        }
      }
    }
  },
  async created () {
    await this.customLoginStatus();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 13.36rem;
  background: #eff0f1;
  overflow-y: auto;
  background: url("./imgs/loginbg.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 8.9rem;
  .login-button {
    width: 5.96rem;
    height: 0.82rem;
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
