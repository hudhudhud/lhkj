<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="客户申请书编号">
        <el-input v-model="form.customNo" placeholder="输入客户申请书编号查询"></el-input>
      </el-form-item>
      <el-form-item label="客户手机号码">
        <el-input v-model="form.phone" placeholder="输入客户手机号码查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="this.subsidiaryConfList.length==0" @click="single" type="success" plain>单个发放</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="this.subsidiaryConfList.length==0" @click="batch" type="success" plain>批量发放</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="credit/mechanismCreditConf/outGivingCreditRecordList" :param="form" @loaded="loading=false"
      show-pager>
      <el-table-column prop="customNo" label="客户申请书编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="客户手机号码" width="200" align="center">
      </el-table-column>
      <el-table-column label="积分信息" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.phone">
            {{scope.row.creditTypeName}}:{{scope.row.creditAmount}}
          </span>
          <span v-else>
            发给机构:{{scope.row.subsidiaryName}},{{scope.row.creditTypeName}}:{{scope.row.creditAmount}}
          </span>

        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        customNo: ""
      },
      loading: false,
      showDialog: false,
      subsidiaryConfList: []
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async loadCreditTypeList() {
      let rs = await this.$post(
        "credit/mechanismCreditConf/querySubsidiaryMechanismCreditConf",
        {
          mechanismId: ""
        }
      );
      if (rs.status == "200") {
        console.info("=======" + rs.payload.subsidiaryConfList);
        this.subsidiaryConfList = rs.payload.subsidiaryConfList;
      }
    },
    single() {
      this.$router.push({
        path: "/provideCredit/singleProvide"
      });
    },
    batch() {
      this.$router.push({
        path: "/provideCredit/batchProvide"
      });
    }
  },
  created() {
    this.loadCreditTypeList();
  }
};
</script>

<style scoped>
</style>
