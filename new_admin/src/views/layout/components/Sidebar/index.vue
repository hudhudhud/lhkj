<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156"
      text-color="#bfcbd9" active-text-color="#409EFF" mode="vertical">
      <sidebar-item v-if="routes.length" v-for="(route, idx) in routes" :key="route.path+idx" :item="route" :base-path="route.path"
        :collapse="collapse" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import { UserModule } from "@/store/modules/user";
import SidebarItem from "./SidebarItem.vue";
import routes from "@/routers/router-base";
import { AuthApi } from "@/api";
import SysModuleResponse from "@/api/modules/SysModuleResponse";

@Component({
  components: {
    SidebarItem
  }
})
export default class SideBar extends Vue {
  @Prop({ default: false }) private collapse!: boolean;
  get sidebar() {
    return AppModule.sidebar;
  }

  get routes() {
    // return localStorage.getItem("routes");
    /* console.log((this.$router as any).options.routes);*/
    return AppModule.routes;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }

  async created() {
    if (Object.keys(UserModule.user).length > 0) {
      AppModule.LoadRouter();
    } else {
      await UserModule.refreshUserInfo();
      AppModule.LoadRouter();
    }
  }
}
</script>

<style lang="scss">
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out,
    0s padding-right ease-in-out;
}

.scrollbar-wrapper {
  overflow-x: hidden !important;

  .el-scrollbar__view {
    height: 100%;
  }
}

.el-scrollbar__bar {
  &.is-vertical {
    right: 0px;
  }

  &.is-horizontal {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
