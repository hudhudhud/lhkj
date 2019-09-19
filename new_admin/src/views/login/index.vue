<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <div class="qrcode-box" v-if="codeUrl" v-loading="refreshingQrcode">
        <div class="qrcode-scanning" v-show="showScanning">已扫码,请确认登录</div>
        <div id="qrcode" ref="qrcode" class="qrcode">
          <img :src="codeUrl" alt="">
        </div>
        <div class="qrcode-tip" v-show="!showScanning">
          使用微信扫描二维码登录
          <i class="el-icon-refresh" @click="generateUrl"></i>
        </div>
      </div>
      <h3 class="title">
        后台登录

      </h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input v-model="loginForm.password" :type="pwdType" name="password" auto-complete="on" placeholder="密码"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input ref="code" v-model="loginForm.code" placeholder="验证码" name="code" />
        <div v-loading="loadingVerifyCode" class="verify-box" @click="getVerifyId">
          <img v-if="verifyId" :src="apiBasePath+'auth/login/code/verify_image/'+verifyId"
            @load="loadingVerifyCode = false">
        </div>
      </el-form-item>
      <div class="row-remember">
        <el-checkbox v-model="store">记住用户名</el-checkbox>
      </div>

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { isValidUsername } from "@/utils/validate";
import { Component, Vue, Watch } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import { Route } from "vue-router";
import { Form as ElForm } from "element-ui";
import { AuthApi } from "@/api";
import config from "@/config";
import { login } from "@/api/login";

const validateUsername = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入正确的用户名"));
  } else {
    callback();
  }
};
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error("密码不能小于5位"));
  } else {
    callback();
  }
};
const validateCode = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入验证码"));
  } else {
    callback();
  }
};
@Component
export default class Login extends Vue {
  private loginForm = {
    username: "",
    password: "",
    code: ""
  };
  private refreshingQrcode = false;
  private codeUrl = "";
  private loginRules = {
    username: [
      { required: true, trigger: "blur", validator: validateUsername }
    ],
    password: [{ required: true, trigger: "blur", validator: validatePass }],
    code: [{ required: true, trigger: "blur", validator: validateCode }]
  };
  private loadingVerifyCode = false;
  private store = false;
  private verifyId = "";
  private apiBasePath = config.apiBasePath;
  private loading = false;
  private showQrcode = false;
  private showScanning = false;
  private pwdType = "password";
  private codeType = "code";
  private loginURL = "";
  private loginCode = "";
  private redirect: string | undefined = undefined;
  private _checkIndex: any = null;
  @Watch("$route", { immediate: true })
  private OnRouteChange(route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this.redirect = route.query && (route.query.redirect as string);
  }
  @Watch("store")
  private onStoreChange(val: number) {
    localStorage.setItem("storeAccount", val ? "1" : "0");
  }
  private showPwd() {
    if (this.pwdType === "password") {
      this.pwdType = "";
    } else {
      this.pwdType = "password";
    }
  }
  private async check() {
    if (this._checkIndex) {
      clearTimeout(this._checkIndex);
    }
    let rs = await AuthApi.checkLoginStatusUsingGET({
      loginCode: this.loginCode
    });
    if (rs.status == 200 && rs.payload.sta == "success") {
      this.showQrcode = false;
      sessionStorage.setItem("token", rs.payload.value);
      // this.$store.commit("setUser", rs.payload.user);
      UserModule.SET_USER(rs.payload.user);
      this.$router.replace("/dashboard");
    } else if (rs.payload.sta == "timeout") {
      this.generateUrl();
    } else if (rs.payload.sta == "waiting") {
      this.showScanning = true;
      this._checkIndex = setTimeout(this.check, 1000);
    } else {
      this._checkIndex = setTimeout(this.check, 1000);
    }
  }
  private async generateUrl() {
    this.refreshingQrcode = true;
    let rs = await AuthApi.generateLoginUrlUsingPOST();
    if (rs.payload) {
      this.loginURL = rs.payload.loginURL;
      this.loginCode = rs.payload.loginCode;
    }
    // 生成二维码
    this.showQrcode = true;
    this.$nextTick(() => {
      this.codeUrl = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(
        this.loginURL
      )}&width=400&margin=0&correction=H`;
    });
    this.check();
    this.refreshingQrcode = false;
  }
  private async getVerifyId() {
    this.loadingVerifyCode = true;
    let rs = await AuthApi.getVerifyIdUsingGET();
    console.log(rs);
    this.verifyId = rs.payload;
  }
  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        // this.doLogin();
        UserModule.Login(
          Object.assign(this.loginForm, { verifyId: this.verifyId })
        )
          .then(rs => {
            this.loading = false;
            this.$router.push({ path: this.redirect || "/" });
          })
          .catch(() => {
           this.getVerifyId();
            this.loading = false;
          });
      } else {
        this.getVerifyId();
        return false;
      }
    });
  }
  created() {
    this.generateUrl();
  }
  mounted() {
    this.getVerifyId();
  }
  beforeDestroy() {
    if (this._checkIndex) {
      clearTimeout(this._checkIndex);
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent !important;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0;
      color: $lightGray;
      height: 47px;
      outline: none !important;
      &:-webkit-autofill {
        background: transparent !important;
        border: 0;
        outline: none !important;
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;
  .el-form-item {
    background: #283443 !important;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $lightGray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}

.verify-box {
  width: 120px;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
}
.verify-box img {
  height: 100%;
}
.row-remember {
  margin-bottom: 20px;
  text-align: right;
}

.qrcode-box {
  position: absolute;
  top: 106px;
  left: -200px;
  background: #fff;
  padding: 14px;
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
.qrcode img {
  width: 168px;
  height: 168px;
}
</style>
