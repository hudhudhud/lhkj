<template>
  <div class="body">
    <div class="form">
      <div class="qrcode-box" v-loading="refreshingQrcode">
        <div class="qrcode-scanning" v-show="showScanning">已扫码,请确认登录</div>
        <div id="qrcode" ref="qrcode" class="qrcode"></div>
        <div class="qrcode-tip" v-show="!showScanning">
          使用微信扫描二维码登录
          <i class="el-icon-refresh" @click="generateUrl"></i>
        </div>
      </div>
      <div class="title">系统登录</div>
      <label class="row-input">
        <i class="iconfont row-icon">&#xe63e;</i>
        <input class="row-input-inner uid" maxlength="20" v-model="form.uid" type="text" @keydown="onAccountKeyDown"
          placeholder="请输入用户名" />
      </label>
      <label class="row-input">
        <i class="iconfont row-icon">&#xe603;</i>
        <input type="password" name="txtPassword" style="display:none">
        <input name="txtPassword" maxlength="20" class="row-input-inner password" v-model="form.password" @keydown="onPasswordKeyDown"
          :type="showPassword?'text':'password'" placeholder="请输入密码" autocomplete="off" />
        <i class="iconfont row-icon showpassword" @click="showPassword=!showPassword">&#xe611;</i>
      </label>
      <label class="row-input">
        <i class="iconfont row-icon">&#xe60d;</i>
        <input class="row-input-inner verifycode" maxlength="20" v-model="form.code" type="text" @keydown="onVerifyCodeKeyDown"
          placeholder="请输入验证码" />
        <div class="verify-box" v-loading="loadingVerifyCode" @click="getVerifyId">
          <img v-if="verifyId" @load="loadingVerifyCode = false" :src="apiBasePath+'auth/getVerifyImage/'+verifyId" />
        </div>
      </label>
      <div class="row-remember">
        <el-checkbox v-model="store">记住用户名</el-checkbox>
      </div>
      <div class="row-button">
        <el-button type="primary" size="medium" @click="doLogin" :loading="loading">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import QRCode from "qrcodejs2";

export default {
  components: {
    QRCode
  },
  data() {
    return {
      form: {
        uid: "",
        password: "",
        code: ""
      },
      showPassword: false,
      store: false,
      loading: false,
      apiBasePath: config.apiBasePath,
      verifyId: null,
      loadingVerifyCode: false,
      loginCode: "",
      loginURL: "",
      showScanning: false,
      refreshingQrcode: false
    };
  },
  watch: {
    store(val) {
      localStorage.setItem("storeAccount", val ? "1" : "0");
    }
  },
  methods: {
    onAccountKeyDown(e) {
      if (e.keyCode === 13) {
        this.$el.querySelector(".password").focus();
      }
    },
    onPasswordKeyDown(e) {
      if (e.keyCode === 13) {
        this.$el.querySelector(".verifycode").focus();
      }
    },
    onVerifyCodeKeyDown(e) {
      if (e.keyCode === 13) {
        this.doLogin();
      }
    },
    async check() {
      if (this._checkIndex) {
        clearTimeout(this._checkIndex);
      }
      let rs = await this.$post(
        "scanCodeLogin/check_login_status?loginCode=" + this.loginCode
      );
      if (rs.status == 200 && rs.payload.sta == "success") {
        this.showQrcode = false;
        sessionStorage.setItem("token", rs.payload.value);
        this.$store.commit("setUser", rs.payload.user);
        this.$router.replace("/main");
      } else if (rs.payload.sta == "timeout") {
        this.generateUrl();
      } else if (rs.payload.sta == "waiting") {
        this.showScanning = true;
        this._checkIndex = setTimeout(this.check, 1000);
      } else {
        this._checkIndex = setTimeout(this.check, 1000);
      }
    },
    qrcode() {
      this.$el.querySelector("#qrcode").innerHTML = "";
      /* eslint-disable  no-unused-vars */
      let qrcode = new QRCode("qrcode", {
        width: 150, // 设置宽度
        height: 150, // 设置高度
        text: this.loginURL
      });
    },
    async generateUrl() {
      this.refreshingQrcode = true;
      let rs = await this.$post("scanCodeLogin/generate_login_url");
      if (rs.payload) {
        this.loginURL = rs.payload.loginURL;
        this.loginCode = rs.payload.loginCode;
        console.info(this.loginURL);
      }
      // 生成二维码
      this.showQrcode = true;
      this.$nextTick(() => {
        this.qrcode();
      });
      this.check();
      this.refreshingQrcode = false
    },
    async getVerifyId() {
      this.loadingVerifyCode = true;
      let rs = await this.$get("/auth/getVerifyId");
      if (rs.status === 200) {
        this.verifyId = rs.payload;
      }
    },
    async doLogin() {
      if (!this.form.uid) {
        this.$message.error("请输入用户名");
        return null;
      }
      if (!this.form.password) {
        this.$message.error("请输入密码");
        return null;
      }
      if (!this.form.code) {
        this.$message.error("请输入验证码");
        return null;
      }

      this.loading = true;
      let rs = await this.$post(
        "/auth/login",
        Object.assign(this.form, { verifyId: this.verifyId })
      );
      if (rs.status === 200) {
        rs = rs.payload;
        sessionStorage.setItem("token", rs.token);
        this.$store.commit("setUser", rs.user);
        if (this.store) {
          localStorage.setItem("storeUid", "1");
          localStorage.setItem("uid", this.form.uid);
        } else {
          localStorage.removeItem("storeUid");
          localStorage.removeItem("uid");
        }
        this.$router.replace("/main");
      } else {
        this.$message.error(rs.error);
        this.getVerifyId();
      }
      this.loading = false;
    }
  },
  mounted() {
    let storeUid = localStorage.getItem("storeUid");
    let uid = localStorage.getItem("uid");
    this.store = storeUid === "1";
    if (this.store && uid) {
      this.form.uid = uid;
      this.$el.querySelector(".password").focus();
    } else {
      this.$el.querySelector(".uid").focus();
    }
    this.getVerifyId();
  },
  created() {
    this.generateUrl();
  },
  beforeDestroy() {
    if (this._checkIndex) {
      clearTimeout(this._checkIndex);
    }
  }
};
</script>

<style scoped>
.body {
  height: 100%;
  width: 100%;
  background: #2d3a4b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  position: relative;
  flex: 0 0 400px;
  min-height: 300px;
  margin-top: -50px;
}
.title {
  line-height: 50px;
  font-size: 26px;
  color: #eee;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}
.row-input {
  display: flex;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
}
.row-input input {
  flex: 1 1 auto;
  background: transparent;
  border: 0;
  color: #fff;
}
.row-icon {
  flex: 0 0 40px;
  font-size: 16px;
  color: #999;
  text-align: center;
}
.row-input-inner,
.row-input-inner:-webkit-autofill {
  flex: 1 1 auto;
  border: 0;
  margin-right: 5px;
  background: transparent !important;
  outline: none !important;
  color: #fff !important;
  font-size: 14px !important;
  box-shadow: 0 0 0px 1000px rgb(38, 46, 58) inset;
  -webkit-text-fill-color: #fff;
}
.row-remember {
  text-align: right;
}
.row-button {
  margin-top: 30px;
}
.row-button button {
  width: 100%;
}
.showpassword {
  cursor: pointer;
}
.showpassword:hover {
  color: #fff;
}
.verify-box {
  flex: 0 0 100px;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border-radius: 0 5px 5px 0;
}
.verify-box img {
  height: 100%;
}
.qrcode-box {
  position: absolute;
  top: 80px;
  height: 150px;
  left: -200px;
  background: #fff;
  padding: 20px;
}
.qrcode-scanning {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  line-height: 190px;
  text-align: center;
  font-size: 18px;
}
.qrcode-tip {
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  line-height: 30px;
  text-align: center;
  color: #eee;
  font-size: 14px;
}
.el-icon-refresh {
  cursor: pointer;
}
</style>
