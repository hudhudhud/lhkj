<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">

        <el-form-item label="角色名称">

          <el-input v-model="form.name" placeholder="输入名称查询" style="width: 200px;" class="filter-item" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.state" clearable placeholder="状态" style="width: 90px" class="filter-item">
            <el-option v-for="item in stateOptions" :key="item.label" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search"
          @click="handleFilter()">

          查询
        </el-button>
        <el-button v-waves type="success" size="small" @click="handleAdd">
          新增
        </el-button>
      </el-form>

    </div>

    <el-table v-loading="listLoading" ref="myTable" :data="list" element-loading-text="Loading" border fit
      highlight-current-row>
      <el-table-column align="center" label="id" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="rid" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="{row}">
          <el-button size="mini" :type="statusMap[row.state].styl" icon="el-icon-edit"
            @click="updateStatusUsingPOST(row, statusMap[row.state].num)">
            {{row.state | statusFilter }}
          </el-button>
        </template>

      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-tag :type="row.state | statusFilter">
            {{row.state | statusFilter }}
          </el-tag>
        </template>
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisibleAdd">
      <role-form ref="roleForm" :form="mod" :modules="moduleList" :roleModuleList="roleModuleList"
        @close="dialogFormVisibleAdd = false" @emit-save="handlerAfterSave">
      </role-form>
    </el-dialog>
  </div>

</template>
  <script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { updateStatusUsingPOST } from "./role";
import Pager from "@/api/base/Pager";
import SysModuleResponse from "@/api/modules/SysModuleResponse";
import SysRoleResponse from "@/api/modules/SysRoleResponse";
import SysRoleVO from "@/api/modules/SysRoleVO";
import { waves } from "@/directive/waves"; // waves directive
import RoleForm from "./RoleForm.vue";
import { AuthApi } from "@/api";

@Component({
  components: {
    RoleForm
  },
  directives: { waves },
  filters: {
    statusFilter(status: number) {
      const statusMap: { [id: string]: string } = {
        published: "gray",
        已启用: "success",
        已禁用: "danger",
        1: "已启用",
        0: "已禁用"
      };
      return statusMap[status];
    }
  }
})
export default class Table extends Vue {
  private list: SysRoleResponse[] = [];
  private tolist: SysRoleResponse[] = [];
  private moduleList: SysModuleResponse[] = [];

  private pager = new Pager<object>();
  private mod = {};
  private showPager = true;
  private listLoading = false;
  private dialogFormVisibleAdd = false;
  private roleModuleList: SysModuleResponse[] = [];

  private updateStatusUsingPOST = updateStatusUsingPOST;
  private statusMap = {
    0: { num: 1, styl: "danger" },
    1: { num: 0, styl: "success" }
  };
  private formTitle = "默认标题";
  private form = {
    name: "",
    state: -1
  };
  private async getModuleList() {
    let { payload } = await AuthApi.queryModuleListUsingGET();
    this.moduleList = payload;
  }
  private count = 0;
  /* status */
  private stateOptions = [
    { value: -1, label: "全部" },
    { value: 1, label: "可用" },
    { value: 0, label: "禁用" }
  ];
  /* edit */
  private async handleUpdate(row: SysRoleResponse) {
    // row.state = String(row.state)
    this.mod = Object.assign({}, row); // copy obj

    await this.getUserModuleList(row.rid);
  }
  /* after add */
  private handlerAfterSave() {
    this.dialogFormVisibleAdd = false;
    this.fetchData();
  }
  /* add */
  private handleAdd() {
    this.formTitle = "新增角色";
    this.mod = new SysRoleResponse();
    this.dialogFormVisibleAdd = true;
  }
  /* roleM */
  private async getUserModuleList(roleId: string) {
    let { payload } = await AuthApi.queryModuleByRoleIdUsingGET({
      roleId: roleId
    });
    this.dialogFormVisibleAdd = true;
    this.$nextTick(() => {
      this.roleModuleList = payload;
    });
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
    //  this.form.page = 1;
    if (this.pager) {
      console.log(this.pager);
    }
    this.listLoading = true;
    let parmas = new SysRoleVO();
    let { payload } = await AuthApi.findRoleListUsingPOST(parmas);
    if (payload) {
      this.list = payload;
      this.tolist = payload;
    }
    this.listLoading = false;
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
      this.list = this.list.filter(item => {
        return item.state == this.form.state;
      });
    }
  }

  created() {
    /* load list */
    this.pager.currentPage = 1;
    this.pager.pageSize = 2;
    this.fetchData();
    this.getModuleList();
  }
}
</script>