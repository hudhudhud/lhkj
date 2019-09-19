<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar|| 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' + '?imageView2/1/w/80/h/80'"
          class="user-avatar">
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click.native="showPasswordReset=true">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="showPasswordReset">
      <PasswordReset @close="showPasswordReset=false" :show="showPasswordReset" :uid="uid"></PasswordReset>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import { UserModule } from "@/store/modules/user";
import PasswordReset from "./PasswordReset.vue";
@Component({
  components: {
    Breadcrumb,
    PasswordReset,
    Hamburger
  }
})
export default class Navbar extends Vue {
  private showPasswordReset = false;
  get sidebar() {
    return AppModule.sidebar;
  }
  get uid() {
    console.log(UserModule.user);
    return UserModule.user.id;
  }
  get avatar() {
    return UserModule.avatar;
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  private logout() {
    UserModule.FedLogOut().then(() => {
      location.reload(); // 为了重新实例化vue-router对象 避免bug
    });
  }
  private editPWD() {
    /* UserModule.LogOut().then(() => {
      location.reload(); // 为了重新实例化vue-router对象 避免bug
    }); */
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
