<template>
  <div style="background: #ffffff; height: 100%;">
    <div style="width: 88%; margin: 0 auto;">
      <div class="banner1">
        <img src="./imgs/phjrkzl.png"/>
      </div>
      <div class="form">
        <div class="form-item"><span style="color: red">*</span>姓名：<input v-model="form.name" placeholder="请输入姓名"></div>
        <div class="form-item"><span style="color: red">*</span>身份证后六位：<input v-model="form.card_num" placeholder="请输入身份证后六位" maxlength="6"></div>
        <div class="form-item">手机号码：<input type="tel" v-model="form.mobile" placeholder="请输入手机号码" maxlength="11"></div>
      </div>
      <div class="button">
        <img src="./imgs/cyc.jpg" style="margin-bottom: 0.3rem;" @click="ljsq()"/><br>
        <img v-if="hasInfo" src="./imgs/ztyl.png" @click="$router.push('khrk/khztyl')"/>
      </div>
      <div class="hdgz">
        <p class="title">活动规则：</p>
        <div class="body">
          <p>组团有礼：关注“瑞丰银行微生活”公众号→在微活动中进入二维码平台（或者扫描他人二维码）→登记本人信息→点击“测一测”，第二次登陆将出现“组团有礼”→分享二维码→推荐客户→成功领取积分。</p>
          <p>申请流程：下载并登录丰收互联APP→融资→浙里贷立即申请→选择浙里贷-公积金贷。</p>
          <p>详情请咨询瑞丰银行各大网点，咨询电话4008896383</p>
        </div>
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
      },
      double_click: false
    };
  },
  methods: {
    loadShare () {
      let share = sessionStorage.getItem('share');
      if (share) {
        this.$set(this.form, 'partner_cust_id', share);
      }
    },
    async loadUserInfo () {
      let rs = await this.$post('/borf/get/info');
      if (rs.status == 200) {
        if (!rs.payload) {
          return;
        }
        localStorage.setItem('hasInfo', true)
        this.hasInfo = true
        this.form.name = rs.payload.name
        this.form.mobile = rs.payload.mobile
        this.form.card_num = rs.payload.cardNum
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
    },
    async ljsq () {
      this.form.name = this.form.name.replace(/ /g, '');
      this.form.card_num = this.form.card_num.replace(/ /g, '');
      if (!this.form.name) {
        Toast('请输入姓名');
        return;
      } else if (!(/^\D+$/.test(this.form.name))) {
        Toast('姓名中不能出现数字');
        return;
      }
      if (!this.form.card_num) {
        Toast('请输入身份证后六位');
        return;
      } else if (!(/^(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.form.card_num))) {
        Toast('身份证后六位输入有误');
        return;
      } else {
        this.form.card_num = this.form.card_num.toUpperCase()
      }
      if (this.form.mobile) {
        let phoneReg = /^1[3456789]\d{9}$/;
        if (!phoneReg.test(this.form.mobile)) {
          Toast('请输入正确的手机号码');
          return;
        }
      }
      var url = '/borf/submit/info';
      if (this.hasInfo) {
        url = '/borf/update/info';
      }
      // 判断是否双击
      if (!this.double_click) {
        this.double_click = true;
        // 开始请求接口
        let rs = await this.$post(url, this.form);
        if (rs.status == 200 || rs.status == 301 || rs.status == 302) {
          Toast('提交成功！');
          this.hasInfo = true;
          this.double_click = false;
          window.location.replace('https://a.app.qq.com/o/simple.jsp?pkgname=com.yitong.zjrc.mfs.android&fromcase=40003');
        } else {
          this.double_click = false;
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
  },
  async created () {
    this.loadShare();
    await this.loadUserInfo();
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
    margin: 0.9rem auto 0;
    width: 5.7rem;
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
    width: 3.3rem;
    height: 0.7rem;
    color: #999999;
    font-size: 0.26rem;
    line-height: 0.7rem;
    border: 0.01rem solid #cccccc;
    border-radius: 0.05rem;
    padding-left: 0.2rem;
  }
  .button {
    margin: 0.54rem auto 0 auto;
    text-align: center;
  }
  .button img {
    height: 0.88rem;
  }
  .hdgz {
    margin: 0.46rem auto 0 auto;
  }
  .title {
    font-size: 0.32rem;
    color: #333333;
  }
  .body {
    margin-top: 0.24rem;
    font-size: 0.26rem;
    color: #666666;
    line-height: 0.4rem;
  }
  .body p {
    text-indent: 2em;
  }
</style>
