
<template>

  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">

        <el-form-item label="角色名称">

          <el-input v-model="form.name" placeholder="输入名称查询" style="width: 200px;" class="filter-item" />
        </el-form-item>

        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">

          查询
        </el-button>

      </el-form>

    </div>

    <el-table v-loading="listLoading" ref="myTable" :data="list" element-loading-text="Loading" border fit
      highlight-current-row>

      <el-table-column align="center" label="角色id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="角色状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="statusMap[row.state].styl"> {{row.state | statusFilter }}</el-tag>
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
      <role-form :form="mod" :merchantList="merchantList" :merchantAuthList="merchantAuthList"
        @close="dialogFormVisibleAdd = false" @emit-save="dialogFormVisibleAdd = false"></role-form>
    </el-dialog>
  </div>

</template>
  <script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Pager from "@/api/base/Pager";
import SysRoleResponse from "@/api/modules/SysRoleResponse";
import SysUserVO from "@/api/modules/SysUserVO";
import UserMerchantVO from "@/api/modules/UserMerchantVO";
import { waves } from "@/directive/waves"; // waves directive
import RoleForm from "./RoleForm.vue";
import MerchantResponse from "@/api/modules/MerchantResponse";
import MerchantVO from "@/api/modules/MerchantVO";

import { AuthApi, MerchantApi } from "@/api";
import SysRoleVO from "@/api/modules/SysRoleVO";

@Component({
  components: {
    RoleForm
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
  private list: SysRoleResponse[] = [];
  private tolist: SysRoleResponse[] = [];
  private pager = new Pager<object>();
  private mod: SysRoleResponse = new SysRoleResponse();
  private showPager = true;
  private listLoading = false;
  private dialogFormVisibleAdd = false;
  private merchantList: MerchantResponse[] = [];

  private merchantAuthList: number[] = [];
  private statusMap = {
    0: { num: 1, styl: "danger" },
    1: { num: 0, styl: "success" }
  };
  private formTitle = "默认标题";
  private form = {
    name: "",
    state: -1
  };

  /* load role merchant */
  private async getMerchantAuthList(roleId: string) {
    let parmas = new UserMerchantVO();
    let list: number[] = [];
    parmas.roleId = roleId;
    const rs = await AuthApi.findRoleMerchantAuthUsingPOST(parmas);
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
  private async getMerchantList(row: SysRoleResponse) {
    const rs = await MerchantApi.findMerchantListUsingPOST();
    if (rs.status == 200) {
      this.mod = row;
      this.merchantList = rs.payload;
      this.dialogFormVisibleAdd = true;
      this.getMerchantAuthList(row.rid);
    }
  }
  /* load data */
  private async fetchData() {
    this.listLoading = true;
    let parmas = new SysRoleVO();
    const rs = await AuthApi.findRoleListUsingPOST(parmas);
    if (rs.status == 200) {
      this.list = rs.payload;
      this.tolist = rs.payload;
      this.listLoading = false;
    }
  }

  /* search */
  private handleFilter() {
    this.list = this.tolist;
    if (this.form.name != "") {
      this.list = this.list.filter(item => {
        return item.name.indexOf(this.form.name) > -1;
      });
    }
    if (this.form.state != -1) {
      this.list = this.list.filter((item: SysRoleResponse) => {
        return item.state == this.form.state;
      });
    }
  }
  created() {
    /* load list */
    this.pager.currentPage = 1;
    this.pager.pageSize = 2;
    let parmas = new SysUserVO();
    this.fetchData();
  }
}
</script>