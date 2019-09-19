<template>
  <div style="background: #ffffff; height: 100%;">
    <div style="width: 88%; margin: 0 auto;">
      <div class="banner1">
        <img src="./imgs/zldkhjlpt.png"/>
      </div>
      <div class="form">
        <div class="form-item">姓名：<input v-model="form.name" placeholder="请输入姓名"></div>
        <div class="form-item">工号：<input v-model="form.ehr" placeholder="请输入工号"></div>
        <div class="form-item">密码：<input type="password" v-model="form.pwd" placeholder="请输入密码">
          <div style="margin-top: 0.2rem; font-size: 0.24rem; line-height: 0.24rem; color: #333333">
            <img style="height: 0.24rem; margin: 0 0.1rem; vertical-align: bottom;" src="./imgs/mm_logo.png">密码重置
          </div>
        </div>
      </div>
      <div class="button">
        <img src="./imgs/dl.png" @click="login"/>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      hasInfo: false,
      form: {
        name: '',
        ehr: '',
        pwd: ''
      }
    };
  },
  methods: {
    // 点击登录
    async login () {
      if (!this.form.name) {
        Toast('请输入姓名');
        return;
      }
      if (!this.form.ehr) {
        Toast('请输入员工号');
        return;
      }
      if (!this.form.pwd) {
        Toast('请输入密码');
        return;
      }
      let rs = await this.$post('/borf/staff/login', this.form);
      if (rs.status == 200) {
        this.$store.commit('setToken', rs.payload.jwt);
        this.$store.commit('setCust', rs.payload.cust);
        sessionStorage.setItem('partner_' + config.merchantId + '_token', rs.payload.jwt);
        sessionStorage.setItem('partner_' + config.merchantId + '_cust', JSON.stringify(rs.payload.cust));
        localStorage.setItem('partner_' + config.merchantId + '_token', rs.payload.jwt);
        localStorage.setItem('partner_' + config.merchantId + '_cust', JSON.stringify(rs.payload.cust));
        Toast('登陆成功');
        window.location.replace(`${window.location.protocol}//${window.location.host}/partner/rfyh/khjl/khjlHome`);
      } else {
        let error = rs.error;
        let message = rs.message;
        let msg = '';
        if (error && !message) {
          msg += error;
        }
        if (message) {
          msg += message;
        }
        Toast(msg);
      }
    }
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
  .form {
    margin: 0.88rem auto 0;
    width: 5.4rem;
    text-align: center;
  }
  .form-item {
    width: 100%;
    text-align: right;
    color: #333333;
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .form-item input {
    width: 4.4rem;
    height: 0.7rem;
    color: #999999;
    font-size: 0.26rem;
    line-height: 0.7rem;
    border: 0.01rem solid #cccccc;
    border-radius: 0.05rem;
    padding-left: 0.2rem;
  }
  .button {
    margin: 1.4rem auto 0 auto;
    text-align: center;
  }
  .button img {
    height: 0.88rem;
  }
</style>
