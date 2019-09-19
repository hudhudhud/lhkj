<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="form.mname" placeholder="输入模块名查询" style="width: 200px;" class="filter-item"
        @input="handleFilter" />
      <!--         @keyup.enter.native="handleFilter"
 -->
      <el-select v-model="form.state" clearable placeholder="状态" style="width: 90px" class="filter-item"
        @change="handleFilter">
        <el-option v-for="item in stateOptions" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>

      <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        <!--         @click="handleFilter"
 -->
        查询
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click='addRoot'>新增</el-button>
    </div>

    <el-table v-loading="listLoading" ref="myTable" :data="list" element-loading-text="Loading" max-height='700' border
      fit highlight-current-row>
      <el-table-column align="center" label="mid" width="95">
        <template slot-scope="scope">
          {{ scope.row.mid }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="level" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.level }}
        </template>
      </el-table-column>
      <el-table-column label="模块名称">
        <template slot-scope="scope">
          <!--           <span :style="{' margin-left':(scope.row.level-1)*30+'px'}">{{scope.row.mname}}</span>
      -->
          <span :style="{'margin-left':(scope.row.level-1)*30+'px'}">{{scope.row.mname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="模块权限验证" width="120" align="center">
        <template slot-scope="{row}">
  <el-button size="mini" :type="statusMap[row.authState].styl" icon="el-icon-edit"
    @click="handleModifyStatus(row, 'authState', statusMap[row.authState].num)">
    {{row.authState | statusFilter }}
  </el-button>
</template>
      </el-table-column>
      <el-table-column label="API路由" align="center">
        <template slot-scope="scope">
  <span>{{ scope.row.path }}</span>
</template>
      </el-table-column>
      <el-table-column label="登录验证" width="120" align="center">
        <template slot-scope="{row}">

  <el-button size="mini" :type="statusMap[row.loginState].styl" icon="el-icon-edit"
    @click="handleModifyStatus(row, 'loginState', statusMap[row.loginState].num)">
    {{row.loginState | statusFilter }}
  </el-button>
</template>

      </el-table-column>
      <el-table-column label="前端路由" width="" align="center">
        <template slot-scope="scope">
  {{ scope.row.router }}
</template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="{row}">
  <el-button size="mini" :type="statusMap[row.status].styl" icon="el-icon-edit"
    @click="handleModifyStatus(row, 'status', statusMap[row.status].num)">
    {{row.status | statusFilter }}
  </el-button>
</template>

      </el-table-column>

      <!--   <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template> -->
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
  <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleAdd(row)">
    新增
  </el-button>

</template>
      </el-table-column>
    </el-table>
    <!--  <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        reviewer
      </el-checkbox>
    </div> -->
    <!-- 新增 -->
    <el-dialog :title="'新增'" :visible.sync="dialogFormVisibleAdd">
      <module-form :form="mod" @close="dialogFormVisibleAdd = false" @emit-save="handlerAfterSave"></module-form>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog :title="temp.mname" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">

        <el-form-item label="mid">
          <el-input v-model="temp.mid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="level">
          <el-input v-model="temp.level" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="模块名称">
          <el-input v-model="temp.mname"></el-input>
        </el-form-item>
        <el-form-item label="api路由">
          <el-input v-model="temp.path"></el-input>
        </el-form-item>
        <el-form-item label="前端路由">
          <el-input v-model="temp.router"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script lang="ts">
// import { getList } from "@/api/table";
import { Component, Vue, Watch } from "vue-property-decorator";
import { AuthApi } from "@/api";
import { Form as ElForm, Row } from "element-ui";
import SysModuleResponse from "@/api/modules/SysModuleResponse";
import { updateModuleUsingPOST } from "./module";
import { waves } from "@/directive/waves/index"; // waves directive
import ModuleForm from "./ModuleForm.vue";

@Component({
  components: {
    ModuleForm
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
    },
    flagFilter(status: number) {
      const statusMap: { [id: string]: object } = {
        0: { txt: "启用", type: "success" },
        1: { txt: "禁用", type: "danger" }
      };
      return statusMap[status];
    }
  }
})
export default class Table extends Vue {
  // let list = [];
  private list: SysModuleResponse[] = [];
  private tolist: SysModuleResponse[] = [];
  private temp: SysModuleResponse = new SysModuleResponse();
  private mod: SysModuleResponse = new SysModuleResponse();
  private tableKey = 0;
  private dialogFormVisible = false;
  private dialogFormVisibleAdd = false;
  private dialogStatus = "";
  private statusMap = {
    0: { num: 1, styl: "danger" },
    1: { num: 0, styl: "success" }
  };

  private rules = {
    type: [{ required: true, message: "type is required", trigger: "change" }],
    title: [{ required: true, message: "title is required", trigger: "blur" }]
  };
  private listLoading = true;
  private stateOptions = [
    { value: 1, label: "可用" },
    { value: 0, label: "禁用" }
  ];
  private form = {
    page: 1,
    limit: 20,
    mname: "",
    state: 1,
    title: undefined,
    type: undefined,
    sort: "+id"
  };

  private created() {
    this.fetchData();
  }
  private addRoot(){
    this.$set(this.mod, "pmid", 0);
    this.$set(this.mod, "level", 1);
    this.$set(this.mod, "serialNo", 1);
    this.$set(this.mod, "type",'NODE')
    this.dialogFormVisibleAdd=true

  }
  /*  @Watch("form")
  private onFormChange(val: string, oldval: string) {
    alert(val);
    this.handleFilter();
  } */
  private handleAdd(row: SysModuleResponse) {
    /*  let preStatus = {
      status: 1,
      authState: 1,
      loginState: 1
    }; */

    // this.mod = Object.assign(this.mod, preStatus);
    this.$set(this.mod, "pmid", row.mid);
    this.$set(this.mod, "level", row.level + 1);
    this.$set(this.mod, "serialNo", 1);
    this.$set(this.mod, "type",'')
    this.dialogFormVisibleAdd = true;
    /* this.mod = Object.assign({}, row);
    
    for (var i in row) {
      if (i == "level") {
        this.$set(this.mod, "level", row.level + 1);
      } else {
        this.$set(this.mod, i, "");
      }
    } */
  }
  private handlerAfterSave(form: SysModuleResponse) {
    // this.list.unshift(form);
    this.fetchData();
    this.dialogFormVisibleAdd = false;
  }
  private handleUpdate(row: SysModuleResponse) {
    this.temp = Object.assign({}, row); // copy obj
    // this.temp.timestamp = new Date(this.temp.timestamp)
    this.dialogStatus = "update";
    this.dialogFormVisible = true;
    this.$nextTick(() => {
      (this.$refs.dataForm as ElForm).clearValidate();
    });
  }
  private createData() {
    (this.$refs.dataForm as ElForm).validate(valid => {
      if (valid) {
        updateModuleUsingPOST(this.temp, (rs: any) => {
          if (rs.status == 200) {
            this.$notify({
              title: "温馨提示",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
          }
        });
      }
    });
  }
  private async updateData() {
    (this.$refs["dataForm"] as ElForm).validate(valid => {
      if (valid) {
        updateModuleUsingPOST(this.temp, (rs: any) => {
          if (rs.status == 200) {
            for (const v of this.list) {
              if (v.mid === this.temp.mid) {
                const index = this.list.indexOf(v);
                this.list.splice(index, 1, this.temp);
                break;
              }
            }
            this.$notify({
              title: "温馨提示",
              message: "修改成功",
              type: "success",
              duration: 2000
            });

            this.dialogFormVisible = false;
          }
        });
      }
    });
  }
  private handleFilter() {
    if (this.form.mname != "") {
      this.list = this.tolist.filter(item => {
        return item.mname.indexOf(this.form.mname) > -1;
      });
    } else {
      this.list = this.tolist;
    }
    this.list = this.list.filter(item => {
      // alert(item.status);
      return item.status == this.form.state;
    });
  }
  private handleModifyStatus(
    row: SysModuleResponse,
    stateType: string,
    value: number
  ) {
    switch (stateType) {
      case "status":
        row.status = value;
        break;
      case "loginState":
        row.loginState = value;
        break;
      case "authState":
        row.authState = value;
        break;
    }
    updateModuleUsingPOST(row, (rs: any) => {
      if (rs.status == 200) {
        this.$message({
          message: "操作成功",
          type: "success"
        });
      }
    });
  }
  private onSearch() {
    alert(0);
    console.log(ElForm);
    // this.$refs["myTable"].search();
  }

  private filter(list: SysModuleResponse[]) {
    let toList: SysModuleResponse[] = [];
    this.generalLevel(list, toList);
    return toList.filter(item => {
      return item.mname.indexOf(this.form.mname) > -1;
    });
  }
  private generalLevel(list: SysModuleResponse[], toList: SysModuleResponse[]) {
    list.forEach((item, index) => {
      toList.push(item);
      if (item.children) {
        this.generalLevel(item.children, toList);
      }
    });
  }
  private async fetchData() {
    this.form.page = 1;
    this.listLoading = true;
    let { payload } = await AuthApi.queryModuleListUsingGET();
    if (payload) {
      this.list = this.filter(payload);
      this.tolist = this.list;
      this.listLoading = false;
    }
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
   

