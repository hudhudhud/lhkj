<template>
  <div class="grid-page">

    <div class="page-body">
      <slot></slot>
    </div>
    <div class="paginate-pager" v-if="showPager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.currentPage"
        :page-sizes="[2,10,30,50]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SysUserVO from "@/api/modules/SysUserVO";

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: "LayoutPage"
})
export default class Hamburger extends Vue {
  @Prop({ default: false }) private showPager!: boolean;
  @Prop({ default:()=>{return new SysUserVO()}  }) private pager!: SysUserVO;
  private handleSizeChange(pageSize: number) {
    this.$emit("handleSizeChange", pageSize);
  }
  private handleCurrentChange(currentPage: number) {
    this.$emit("handleCurrentChange", currentPage);
  }
}
</script>

<style scoped>
.el-pagination{
  text-align:center;
}
</style>
