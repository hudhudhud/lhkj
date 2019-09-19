<template>
  <LayoutPage :showPager="showPager" :pager="pager" @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange">
    <div class="app-container">
      <div class="filter-container">
        <el-form :inline="true">

          <el-form-item label="用户名称">

            <el-input v-model="form.username" placeholder="输入名称查询" style="width: 200px;" class="filter-item" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" clearable placeholder="状态" style="width: 90px" class="filter-item">
              <el-option v-for="item in stateOptions" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData()">
            查询
          </el-button>
          <el-button v-waves type="success" @click="handleAdd()">
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
        <el-table-column class-name="status-col" label="用户名" width="160" align="center">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="customId" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.customId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信昵称">
          <template slot-scope="scope">
            {{
            scope.row.nickName }}
          </template>
        </el-table-column>
        <el-table-column label="是否密码登录" width="120" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" :type="statusMap[row.pwdLogin].styl" icon="el-icon-edit"
              @click="handleModifyStatus(row, 'pwdLogin', statusMap[row.pwdLogin].num)">
              {{row.pwdLogin | pwdLoginFilter }}
            </el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column label="用户状态" width="120" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" :type="statusMap[row.status].styl" icon="el-icon-edit"
              @click="handleModifyStatus(row, 'status', statusMap[row.status].num)">
              {{row.status | statusFilter }}
            </el-button>
          </template>

        </el-table-column> -->

        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{row.status | statusFilter }}
            </el-tag>
          </template>
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>

            <el-button v-if="row.status!='deleted'" size="mini" @click="handleBindCode(row)">
              绑定
            </el-button>
            <el-button v-if="row.status==0" size="mini" @click="handleModifyStatus(row, 'status', 1)">
              还原
            </el-button>
            <el-button v-else-if='row.status==1' size="mini" @click="handleModifyStatus(row, 'status', 0)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="formTitle" :visible.sync="dialogFormVisibleAdd">
        <user-form :form="mod" :roleList="roleList" :roleIdList="checkList" @close="dialogFormVisibleAdd = false"
          @emit-save="handlerAfterSave"></user-form>
      </el-dialog>

    </div>
    <!-- QRCODE -->
    <el-dialog title="扫描二维码绑定" :visible.sync="qrCodeDialogVisible" width="20%" center="center">
      <img :src="qrCode" width=200 height=200 style="display: block;margin:0 auto" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="qrCodeDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </LayoutPage>

</template>
  <script lang="ts">
// import { getList } from "@/api/table";
import { Component, Vue, Watch } from "vue-property-decorator";
import { AuthApi } from "@/api";
import { Form as ElForm, Row } from "element-ui";
import SysUserVO from "@/api/modules/SysUserVO";
import Pager from "@/api/base/Pager";
import SysUserResponse from "@/api/modules/SysUserResponse";
import SysUserRoleResponse from "@/api/modules/SysUserRoleResponse";
import SysRoleVO from "@/api/modules/SysRoleVO";
import SysRoleResponse from "@/api/modules/SysRoleResponse";
import { waves } from "@/directive/waves"; // waves directive
import UserForm from "./UserForm.vue";

@Component({
  components: {
    UserForm
  },
  name: "user",
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
    },
    pwdLoginFilter(pwdLogin: number) {
      const statusMap: { [id: string]: string } = {
        1: "是",
        0: "否"
      };
      return statusMap[pwdLogin];
    }
  }
})
export default class Table extends Vue {
  // let list = [];
  private qrCode = "";
  private list: SysUserResponse[] = [];
  private tolist: SysUserResponse[] = [];
  private roleList: SysRoleResponse[] = [];
  private checkList: string[] = [];
  private paramsX = new SysRoleVO();
  private temp: SysUserResponse = new SysUserResponse();
  private mod: SysUserResponse = new SysUserResponse();
  private tableKey = 0;
  private dialogFormVisible = false;
  private qrCodeDialogVisible = false;
  private dialogFormVisibleAdd = false;
  private showPager = true;
  private dialogStatus = "";
  private formTitle = "";
  private pager = new Pager<object>();
  private statusMap = {
    0: { num: 1, styl: "danger" },
    1: { num: 0, styl: "success" }
  };

  private pageDefault = {
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 30, 50]
  };

  private rules = {
    type: [{ required: true, message: "type is required", trigger: "change" }],
    title: [{ required: true, message: "title is required", trigger: "blur" }]
  };
  private listLoading = false;
  private stateOptions = [
    { value: -1, label: "全部" },
    { value: 1, label: "可用" },
    { value: 0, label: "禁用" }
  ];
  private form = {
    username: "",
    status: 1
  };
  /* qrcode */

  private async handleBindCode(row: SysUserResponse) {
    const rs = await AuthApi.generateBindingUrlUsingPOST({ userId: row.id });
    if (rs.status == 200) {
      this.qrCodeDialogVisible = true;
      this.qrCode = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(
        rs.payload.bindingURL
      )}&width=400&margin=0&correction=H`;
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
  /* @Watch("form.username")
  onUsernameChanged(val: string, oldVal: string) {
    this.handleFilter()
  }
  @Watch("form.status")
  onStatusChanged(val: number, oldVal: number) {
    console.log(val);
  } */
  private created() {
    /* load table */
    Object.assign(this.pager, this.pageDefault);
    this.fetchData();
    this.loadRoleList();
  }
  private async loadRoleList() {
    /* load roleList */
    const rs = await AuthApi.findRoleListUsingPOST(new SysRoleVO());
    if (rs.status == 200) {
      this.roleList = rs.payload;
    }
  }

  /*  @Watch("form")
  private onFormChange(val: string, oldval: string) {
    alert(val);
    this.handleFilter();
  } */

  private handleSizeChange(pageSize: number) {
    Object.assign(this.pager, { pageSize: pageSize });
    this.fetchData();
  }
  private handleCurrentChange(currentPage: number) {
    Object.assign(this.pager, { currentPage: currentPage });
    this.fetchData();
  }
  private async handleAdd() {
    this.mod = new SysUserResponse();
    this.dialogFormVisibleAdd = true;
    console.log(this.list[0]);
  }
  private handlerAfterSave(form: SysUserResponse) {
    /*   this.list.unshift(form);
    this.dialogFormVisibleAdd = false; */
    this.fetchData(() => {
      this.dialogFormVisibleAdd = false;
    });
  }
  private async handleUpdate(row: SysUserResponse) {
    this.checkList = [];
    this.mod = Object.assign({}, row); // copy obj
    const rs = await AuthApi.findUserRoleUsingGET({ uid: row.id });
    if (rs.status == 200) {
   
      this.dialogFormVisibleAdd = true;
      this.$nextTick(()=>{
           rs.payload.forEach((el: SysUserRoleResponse) => {
        this.checkList.push(el.rid);
      });
      }) 
    }
  }
  /*  */

  private async handleModifyStatus(
    row: SysUserVO,
    stateType: string,
    value: number
  ) {
    await this.$confirm("确认操作?", "提示", {type: "warning"})
    switch (stateType) {
      case "status":
        row.status = value;
        break;
      case "pwdLogin":
        row.pwdLogin = value;
        break;
    }
    const rs = await AuthApi.updateStatusUsingPOST(row);
    if (rs.status == 200) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      await this.fetchData()
    }
  }
  private filter(list: SysUserResponse[]) {
    let toList: SysUserResponse[] = [];
    this.generalLevel(list, toList);
    return toList.filter(item => {
      // return item.mname.indexOf(this.form.mname) > -1;
    });
  }
  private generalLevel(list: SysUserResponse[], toList: SysUserResponse[]) {
    list.forEach((item, index) => {
      toList.push(item);
      /*  if (item.children) {
        this.generalLevel(item.children, toList);
      } */
    });
  }
  private async fetchData(cb?: any) {
    //  this.form.page = 1;
    if (this.pager) {
      console.log(this.pager);
    }
    this.listLoading = true;
    let parmas = new SysUserVO();
    parmas.username=this.form.username;
    if(this.form.status!=-1){
       parmas.status=this.form.status
    }
    let { payload } = await AuthApi.findUserListUsingPOST(
      Object.assign(parmas, this.pager)
    );
    if (payload) {
      this.list = payload.list;
      this.tolist = payload.list;
      this.pager = payload;
    }
    this.listLoading = false;
    cb && cb();
  }
}
</script> 
   <style lang="scss" scoped>
.filter-item {
  margin: 0 10px 10px 0;
  &:last-child {
    margin-right: 0;
  }
}
</style>
   

