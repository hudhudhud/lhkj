<template>
  <div :class="['menu-wrapper', collapse ? 'simple-mode' : 'full-mode', {'first-level': !isNest}]">
    <template v-if="item.type=='URL' && item.router != null">
      <app-link :to="resolvePath(item.router)">
        <el-menu-item :index="item.router" :class="{'submenu-title-noDropdown': !isNest}">
          <span v-if="item.mname" slot="title">{{ item.mname }}</span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else-if="item.type !='HIDDEN'" :index="item.router?item.router:item.mid+''" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="" :name="item.icon||'example'" />
        <span v-if="item.mname" slot="title">{{ item.mname }}</span>
      </template>

      <sidebar-item v-for="(child, idx) in item.children" :is-nest="true"  :item=" child" 
        :base-path="resolvePath(child.router)" :collapse="collapse" class="nest-menu" />

    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from "path";
import { Route } from "vue-router";
import { isExternal } from "@/utils/validate";
import { Component, Vue, Prop } from "vue-property-decorator";
import AppLink from "./Link.vue";

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: "SidebarItem",
  components: {
    AppLink
  }
})
export default class SidebarItem extends Vue {
  @Prop({ required: true }) private item!: Route;
  @Prop({ default: false }) private isNest!: boolean;
  @Prop({ default: false }) private collapse!: boolean;
  @Prop({ default: "" }) private basePath!: string;
  private onlyOneChild: Route | null = null;

  private resolvePath(routePath: string) {
    /*  if (isExternal(routePath)) {
      return routePath;
    } */
   // console.log(routePath);
    if(routePath){
      return path.resolve(this.basePath, routePath);
    }
    return this.basePath
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding-left: 10px !important;
      position: relative;

      .el-tooltip {
        padding: 0 10px !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding-left: 10px !important;

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
</style>
