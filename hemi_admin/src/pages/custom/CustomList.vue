<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="商户名称" prop="merchantId">
        <el-select v-model="form.merchantId" filterable clearable placeholder="请选择">
          <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" placeholder="输入昵称查询"></el-input>
      </el-form-item>
      <el-form-item label="号码">
        <el-input v-model="form.tel" placeholder="输入号码查询"></el-input>
      </el-form-item>
      <el-form-item label="注册时间:">
        <el-date-picker v-model="form.cTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="custom/query" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="nickname" label="昵称" width="170">
      </el-table-column>
      <!-- <el-table-column prop="merchantId" label="商户ID" width="100">
            </el-table-column> -->
      <el-table-column prop="tel" label="号码" width="140">
      </el-table-column>
      <el-table-column prop="merchantname" label="商户" width="140">
      </el-table-column>
      <el-table-column prop="ctime" label="注册时间" width="180">
      </el-table-column>
      <el-table-column label="头像" width="150">
        <template slot-scope="props">
          <img :src="props.row.headImgUrl" v-if="props.row.headImgUrl" style="width:35%;" />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="props">
          <el-button @click="setStatusCode(props.row)" :type="props.row.statusCode=='1'?'success':'danger'" :loading="props.row.loading">{{props.row.statusCode=='1'?'有效':'冻结'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否忽略风控" width="100 " align="center ">
        <template slot-scope="props ">
          <el-button @click="setIsIgnoreRisk(props.row) " :type="props.row.isIgnoreRisk=='1' ? 'danger': 'success' "
            :loading="props.row.loading ">{{props.row.isIgnoreRisk=='1'?'忽略':'不忽略'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作 " min-width="100 ">
        <template slot-scope="props ">
          <el-button @click="showUnbind(props.row.id) " v-if="$hasAuth('02120100000000000000')" :loading="props.row.loading "
            plain>解绑</el-button>
          <el-button @click="getCode(props.row) " v-if="$hasAuth('03060100000000000000')" :disabled="props.row.statusCode!='1' "
            :loading="props.row.loading " plain>查看code</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <el-dialog title="解除绑定" :visible.sync="unbindStatus" width="40%">
      <el-table ref="multipleTable" :data="bindDataList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"></el-table-column>
        <el-table-column prop="authName" label="绑定平台" min-width="150"></el-table-column>
        <el-table-column prop="bindTime" label="绑定时间" min-width="150"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUnbind()">确 定</el-button>
      </span>
    </el-dialog>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cTime: []
      },
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      unbindStatus: false,
      bindDataList: [],
      multipleSelection: [],
      selectCustomId: null,
      merchantList: []
    };
  },
  methods: {
    async setStatusCode(custom) {
      this.loading = false;
      var rs = await this.$post("custom/updateStatusCode", {
        id: custom.id,
        statusCode: custom.statusCode == "1" ? "0" : "1"
      });
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.onSearch();
      } else {
        this.$message({
          type: "error",
          message: rs.error
        });
      }
      this.loading = true;
    },
    async setIsIgnoreRisk(custom) {
      this.loading = false;
      var rs = await this.$post("custom/updateIsIgnore", {
        id: custom.id,
        isIgnoreRisk: custom.isIgnoreRisk == 1 ? 0 : 1
      });
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.onSearch();
      } else {
        this.$message({
          type: "error",
          message: rs.error
        });
        this.loading = true;
      }
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async getCode(custom) {
      this.loading = true;
      var rs = await this.$post("custom/get/code", {
        id: custom.id
      });
      if (rs.status == "200") {
        this.$alert(rs.payload, "登录code", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        this.$message({
          type: "error",
          message: rs.error
        });
      }
      this.loading = false;
    },
    async showUnbind(id) {
      let rs = await this.$post("custom/get/bindList", {
        id: id
      });
      if (rs.status === 200) {
        let rows = rs.payload.list;
        this.bindDataList = rows;
        this.selectCustomId = id;
        this.unbindStatus = true;
        if (rows) {
          this.$nextTick(() => {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          });
        }
      } else {
        this.$message({
          type: "error",
          message: rs.error
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async saveUnbind() {
      let authTypeList = [];
      this.multipleSelection.forEach(row => {
        authTypeList.push(row.authType);
      });
      if (authTypeList.length === 0) {
        this.$message.error("请至少选择一条数据");
        return;
      }
      let rs = await this.$post("custom/unbind/relation", {
        id: this.selectCustomId,
        authTypeList: authTypeList
      });
      if (rs.status === 200) {
        let successCount = rs.payload.successCount;
        this.$message.success("成功解绑" + successCount + "条数据");
        this.unbindStatus = false;
      } else {
        this.$message.error(rs.error);
      }
    },
    async loadMerchant() {
      this.submiting = true;
      let rs = await this.$get("merchant/get_merchant_list");
      if (rs.status == "200") {
        rs.payload.forEach(merchant => {
          merchant.checked = !!false;
        });
        this.merchantList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    }
  },
  created() {
    this.loadMerchant();
  }
};
</script>

<style scoped>
</style>
