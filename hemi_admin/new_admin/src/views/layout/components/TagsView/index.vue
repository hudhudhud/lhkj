<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag)?'active':''" :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span" class="tags-view-item" @click.middle.native="closeSelectedTag(tag)" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.name }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <!-- <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">Close</li> -->
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts">
import ScrollPane from "./ScrollPane.vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import SysModuleResponse from "@/api/modules/SysModuleResponse";
import path from "path";

@Component({
  components: {
    ScrollPane
  }
})
export default class tagsView extends Vue {
  private visible = false;
  private top = 0;
  private left = 0;
  private selectedTag = {};
  private affixTags: any[] = [];

  get visitedViews() {
    return AppModule.visitedViews;
  }
  get routes() {
    return AppModule.routes;
  }
  private addTags() {
    const { name } = this.$route;
    if (name) {
      console.log(name);
      AppModule.addVisitedView(this.$route);
      /*  AppModule.addVisitedView(this.$route)
       AppModule.addCachedView(this.$route) */
      // this.$store.dispatch('tagsView/addView', this.$route)
    }
    return false;
  }
  private moveToCurrentTag() {
    const tags: any = this.$refs.tag;
    const scrollPane: any = this.$refs.scrollPane;
    console.log(tags);
    this.$nextTick(() => {
      for (const tag of tags) {
        console.log(tag);
        if (tag.to.path === this.$route.path) {
          scrollPane.moveToTarget(tag);
          // when query is different then update
          if (tag.to.fullPath !== this.$route.fullPath) {
            this.$store.dispatch("tagsView/updateVisitedView", this.$route);
          }
          break;
        }
      }
    });
  }
  private refreshSelectedTag(view: any) {
    AppModule.delCachedView(view);
    const { router } = view;
    this.$nextTick(() => {
      this.$router.replace({
        path: "/redirect" + router
      });
    });
  }
  private closeSelectedTag(view: any) {
    /*  this.$store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
      if (this.isActive(view)) {
        this.toLastView(visitedViews, view);
      }
    }); */
    // AppModule.delVisitedView(view);
    AppModule.DEL_VISITED_VIEW(view);
    if (this.isActive(view)) {
      this.toLastView(AppModule.visitedViews, view);
    }
  }
  private closeOthersTags() {
    this.$router.push(this.selectedTag);
    this.$store
      .dispatch("tagsView/delOthersViews", this.selectedTag)
      .then(() => {
        this.moveToCurrentTag();
      });
  }
  private closeAllTags(view: SysModuleResponse) {
    AppModule.delAllViews();
    this.toLastView(AppModule.visitedViews, view);
  }
  private toLastView(visitedViews: SysModuleResponse[], view: any) {
    const latestView = visitedViews[visitedViews.length - 1];
    if (latestView) {
      this.$router.push(latestView);
    } else {
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to your needs.
      if (view.name === "Dashboard") {
        // to reload home page
        this.$router.replace({ path: "/redirect" + view.path });
      } else {
        this.$router.push("/");
      }
    }
  }
  private openMenu(tag: SysModuleResponse, e: any) {
    const menuMinWidth = 105;
    let el: any = this.$el;

    const offsetLeft = el.getBoundingClientRect().left; // container margin left
    const offsetWidth = el.offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = e.clientX - offsetLeft + 15; // 15: margin right

    if (left > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left;
    }

    this.top = e.clientY;
    this.visible = true;
    this.selectedTag = tag;
  }
  private closeMenu() {
    this.visible = false;
  }
  private isActive(route: SysModuleResponse) {
    return route.path === this.$route.path;
  }
  private filterAffixTags(routes: SysModuleResponse[]) {
    // private  filterAffixTags(routes, basePath = '/') {
    let tags: object[] = [];
     console.error(routes);
    
    if(!routes||!routes.length){
      return []
    }
    routes.forEach(route => {
      if (route) {
        const tagPath = path.resolve(route.path, route.router);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.mname
        });
      }
      if (route.children) {
        // const tempTags = this.filterAffixTags(route.children, route.path)
        const tempTags = this.filterAffixTags(route.children);
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags];
        }
      }
    });
    return tags;
  }
  private initTags() {
    const affixTags: any[] = (this.affixTags = this.filterAffixTags(
      this.routes
    ));
    for (const tag of affixTags) {
      // Must have tag name
      if (tag.name) {
        AppModule.addVisitedView(tag);
      }
    }
  }
  @Watch("$route")
  fn() {
    this.addTags();
    this.moveToCurrentTag();
  }

  @Watch("visible")
  handler(val: boolean) {
    if (val) {
      document.body.addEventListener("click", this.closeMenu);
    } else {
      document.body.removeEventListener("click", this.closeMenu);
    }
  }
  mounted() {
    this.initTags();
    this.addTags();
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
