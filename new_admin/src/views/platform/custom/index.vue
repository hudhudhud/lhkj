<template>
  <LayoutPage :showPager="true" :pager="pager" @handleCurrentChange="pageChange">
    <div class="app-container">
      <LayoutSearch>
        <el-form-item label="商户名称" prop="merchantId">
          <el-select v-model="searchForm.merchantId" filterable clearable placeholder="请选择">
            <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchForm.nickname" placeholder="输入昵称查询"></el-input>
        </el-form-item>
        <el-form-item label="号码">
          <el-input v-model="searchForm.tel" placeholder="输入号码查询"></el-input>
        </el-form-item>
        <el-form-item label="注册时间:">
          <el-date-picker v-model="searchForm.timerange" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" :loading="isLoading" plain>查询</el-button>
        </el-form-item>
      </LayoutSearch>
      <baseTable :columns='columns' :list='customList' :loading='isLoading' :param='searchForm' @search='onSearch'>
        <template slot-scope="{scope}" slot="avatar">
          <img :src="scope.row.headImgUrl" v-if="scope.row.headImgUrl" style="max-height:50px;" />
        </template>
        <template slot-scope="{scope}" slot="status">
          <el-button @click="updateStatusOrRisk(1, scope.row)" :type="scope.row.statusCode==1? 'success': 'danger'">
            {{scope.row.statusCode==1? '激活': '禁用'}}
          </el-button>
        </template>
        <template slot-scope="{scope}" slot="risk">
          <el-button @click="updateStatusOrRisk(2, scope.row)" :type="scope.row.isRisk==1? 'success': 'danger'">
            {{scope.row.isRisk==1? '开启': '关闭'}}</el-button>
        </template>
        <template slot-scope="{scope}" slot="action">
          <el-button v-if="$hasAuth('103110')" @click="handleUnbind(scope.row)" type="primary" :plain="true">解绑
          </el-button>
          <el-button v-if="$hasAuth('103109')" @click="handleViewCode(scope.row)" type="primary" :plain="true">查看code
          </el-button>
        </template>
      </baseTable>
    </div>
    <el-dialog title="解除绑定" :visible.sync="showUnbind" width="40%">
      <el-table ref="multipleTable" :data="bindDataList" @selection-change="multipleSelection = $event">
        <el-table-column type="selection" min-width="55"></el-table-column>
        <el-table-column prop="authName" label="绑定平台" min-width="150"></el-table-column>
        <el-table-column prop="bindTime" label="绑定时间" min-width="150"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUnbind()">确定</el-button>
      </span>
    </el-dialog>
  </LayoutPage>
</template>

<script>
import LayoutPage from "@/components/layout/LayoutPage";
import LayoutSearch from "@/components/layout/LayoutSearch";
import baseTable from "@/components/baseTable/baseTable";
import Pager from "@/api/base/Pager";
import { CustomApi, MerchantApi } from "@/api";
import moment from "moment";
export default {
  components: { LayoutPage, LayoutSearch, baseTable },
  data() {
    return {
      showUnbind: false,
      searchForm: {
        merchantId: null,
        nickname: null,
        tel: null,
        timerange: []
      },
      isLoading: false,
      pager: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      merchantList: [],
      customList: [],
      bindDataList: [],
      multipleSelection: [],
      selectCustomId: null,
      columns: [
        { key: "nickname", title: "昵称", minWidth: 150 },
        { key: "tel", title: "号码", minWidth: 150 },
        {
          key: "merchantId",
          title: "商户",
          minWidth: 150,
          format: val => {
            let item = this.merchantList.find(item => item.id === val);
            return item ? item.name : "";
          }
        },
        {
          key: "registerTime",
          title: "注册时间",
          minWidth: 150,
          format: time => {
            return moment(time).format("YYYY-MM-DD HH:mm:ss");
          }
        },
        { key: "headImgUrl", title: "头像", slot: "avatar", minWidth: 100 },
        { key: "statusCode", title: "状态", slot: "status", minWidth: 100 },
        {
          key: "isRisk",
          title: "是否风控",
          slot: "risk",
          minWidth: 100
        },
        {
          title: "操作",
          minWidth: 200,
          slot: "action"
        }
      ]
    };
  },
  methods: {
    async getCustoms() {
      let data = Object.assign(this.searchForm, this.pager);
      if (this.searchForm.timerange) {
        data.startTime = this.searchForm.timerange[0];
        data.endTime = this.searchForm.timerange[1];
      } else {
        data.startTime = null;
        data.endTime = null;
      }
      this.isLoading = true;
      let rs = await CustomApi.queryCustomListUsingPOST(data);
      if (rs.status == 200) {
        this.pager.currentPage = rs.payload.currentPage;
        this.pager.totalCount = rs.payload.totalCount;
        this.customList = rs.payload.list;
      }
      this.isLoading = false;
    },
    pageChange(page) {
      this.pager.currentPage = page;
      this.getCustoms();
    },
    async getMerchants() {
      let rs = await MerchantApi.findMerchantListUsingPOST();
      if (rs.status == 200) {
        this.merchantList = rs.payload;
      }
    },
    onSearch() {
      this.pager.currentPage = 1;
      this.getCustoms();
    },
    async handleViewCode(row) {
      let rs = await CustomApi.getOauthCodeUsingGET({ customId: row.id });
      if (rs.status == 200) {
        this.$alert(rs.payload, "登录code", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        this.$message.error(rs.error);
      }
    },
    async handleUnbind({ id }) {
      let rs = await CustomApi.getBindListUsingGET({ customId: id });
      if (rs.status === 200) {
        let rows = rs.payload.list;
        this.bindDataList = rows;
        this.selectCustomId = id;
        this.showUnbind = true;
        if (rows) {
          this.$nextTick(() => {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          });
        }
      } else {
        this.$message.error(rs.error);
      }
    },
    async saveUnbind() {
      // 接口暂未完成
      this.showUnbind = false;
      this.$message.info("relation接口暂未完成，后续补充");
      // let authTypeList = [];
      // this.multipleSelection.forEach(row => {
      //   authTypeList.push(row.authType);
      // });
      // if (authTypeList.length === 0) {
      //   this.$message.error("请至少选择一条数据");
      //   return;
      // }
      // let rs = await CustomApi.unbindRelationUsingPOST({
      //   id: this.selectCustomId,
      //   authTypeList: authTypeList
      // });
      // if (rs.status === 200) {
      //   let successCount = rs.payload.successCount;
      //   this.$message.success("成功解绑" + successCount + "条数据");
      //   this.showUnbind = false;
      // } else {
      //   this.$message.error(rs.error);
      // }
    },
    /**
     * 更新用户状态或风控
     * @param type 1:更改状态，2更改风控
     * @param data 当前操作的用户信息
     */
    async updateStatusOrRisk(type, data) {
      this.isLoading = true;
      let param = { id: data.id };
      if (type == 1) {
        data.statusCode == 1 ? (param.statusCode = 0) : (param.statusCode = 1);
      } else {
        data.isRisk == 1 ? (param.isRisk = 0) : (param.isRisk = 1);
      }
      let rs = await CustomApi.updateCustomInfoUsingPOST(param);
      if (rs.status == 200) {
        if (type == 1) {
          data.statusCode = param.statusCode;
        } else {
          data.isRisk = param.isRisk;
        }
        this.$message.success(rs.message);
      } else {
        this.$message.error(rs.error);
      }
      this.isLoading = false;
    }
  },
  created() {
    this.getMerchants();
    this.getCustoms();
    console.log(this.$store.state.app);
  }
};
</script>

<style scoped>
</style>
