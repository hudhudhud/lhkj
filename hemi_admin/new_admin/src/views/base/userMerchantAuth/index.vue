
<template>
  <LayoutPage :showPager="showPager" :pager="pager" @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange">

    <div class="app-container">
      <div class="filter-container">
        <el-form :inline="true">

          <el-form-item label="用户名称">

            <el-input v-model="form.username" placeholder="输入名称查询" style="width: 200px;" class="filter-item" />
          </el-form-item>

          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">

            查询
          </el-button>

        </el-form>

      </div>

      <el-table v-loading="listLoading" ref="myTable" :data="list" element-loading-text="Loading" border fit
        highlight-current-row>

        <el-table-column align="center" label="用户id">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="用户名" align="center">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>

        <el-table-column label="用户状态" align="center">
          <template slot-scope="{row}">
            <el-tag :type="statusMap[row.status].styl"> {{row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">

          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="getMerchantList(row)">
              商户配置
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="formTitle" :visible.sync="dialogFormVisibleAdd">
        <auth-form :form="mod" :merchantList="merchantList" :merchantAuthList="merchantAuthList"
          @close="dialogFormVisibleAdd = false" @emit-save="handlerAfterSave"></auth-form>
      </el-dialog>
    </div>
  </LayoutPage>

</template>
  <script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Pager from "@/api/base/Pager";
import SysUserResponse from "@/api/modules/SysUserResponse";
import UserMerchantVO from "@/api/modules/UserMerchantVO";
import SysUserVO from "@/api/modules/SysUserVO";
import { waves } from "@/directive/waves"; // waves directive
import AuthForm from "./AuthForm.vue";
import MerchantResponse from "@/api/modules/MerchantResponse";
import { AuthApi, MerchantApi } from "@/api";

@Component({
  components: {
    AuthForm
  },
  directives: { waves },
  filters: {
    statusFilter(status: number) {
      const statusMap: { [id: string]: string } = {
        1: "有效",
        0: "无效"
      };
      return statusMap[status];
    }
  }
})
export default class Table extends Vue {
  private list: SysUserResponse[] = [];
  private tolist: SysUserResponse[] = [];
  private pager = new SysUserVO();
  private mod: SysUserResponse = new SysUserResponse();
  private showPager = true;
  private merchantList: MerchantResponse[] = [];
  private merchantAuthList: number[] = [];
  private listLoading = false;
  private loading = false;
  private dialogFormVisibleAdd = false;
  private statusMap = {
    0: { num: 1, styl: "danger" },
    1: { num: 0, styl: "success" }
  };
  private formTitle = "默认标题";
  private form = {
    username: "",
    status: -1
  };
  private handlerAfterSave() {
    this.dialogFormVisibleAdd = false;
  }
  /* load user merchant */
  private async getMerchantAuthList(userId: number) {
    let parmas = new UserMerchantVO();
    let list: number[] = [];
    parmas.userId = userId;
    const rs = await AuthApi.findUserMerchantAuthUsingPOST(parmas);
    if (rs.status == 200) {
      if (rs.payload.length)
        rs.payload.forEach(element => {
          list.push(element.merchantId);
        });
      this.dialogFormVisibleAdd = true;
      this.$nextTick(() => {
        this.merchantAuthList = list;
      });
    }
  }
  /* load merchant */
  private async getMerchantList(row: SysUserResponse) {
    const rs = await MerchantApi.findMerchantListUsingPOST();
    if (rs.status == 200) {
      this.mod = row;
      this.merchantList = rs.payload;
      this.getMerchantAuthList(row.id);
    }
  }

  /* fenye */
  private handleSizeChange(pageSize: number) {
    Object.assign(this.pager, { pageSize: pageSize });
    this.fetchData();
  }
  /* fenye */
  private handleCurrentChange(currentPage: number) {
    Object.assign(this.pager, { currentPage: currentPage });
    this.fetchData();
  }
  /* load data */
  private async fetchData() {
    this.listLoading = true;
    const rs = await AuthApi.findUserListUsingPOST(this.pager);
    if (rs.status == 200) {
      this.list = rs.payload.list;
      this.tolist = rs.payload.list;
      this.pager.totalCount = rs.payload.totalCount;
      this.listLoading = false;
    }
  }
  /* search */
  private handleFilter() {
    this.list = this.tolist;
    if (this.form.username != "") {
      this.list = this.list.filter(item => {
        return item.username.indexOf(this.form.username) > -1;
      });
    }
    if (this.form.status != -1) {
      this.list = this.list.filter(item => {
        return item.status == this.form.status;
      });
    }
  }
  created() {
    /* load list */
    this.pager.currentPage = 1;
    this.pager.pageSize = 2;
    this.listLoading = true;
    this.fetchData();
  }
}
</script>