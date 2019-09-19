<template>
  <LayoutPage>
    <LayoutSearch>

      <el-form-item v-if="this.subsidiaryConfList" prop="creditTypeId">
        <el-select v-model="creditTypeId" placeholder="请选择积分类型">
          <el-option v-for="creditType in creditConfList" :key="creditType.id" :label="creditType.creditTypeName"
            :value="creditType.creditTypeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="this.subsidiaryConfList">
        <el-button type="primary" @click="autoAdjustCredit" :loading="loading" plain>自动调整积分</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>刷新</el-button>
      </el-form-item>

    </LayoutSearch>

    <span v-for="credit in this.creditConfList" :key="credit.id">
      <img :src="credit.creditIconUrl" height="30" width="30" />{{credit.creditTypeName}}:{{credit.amount}},
    </span>
    <LayoutTable ref="myTable" url="credit/mechanismCreditConf/querySubsidiaryMechanismCreditConf" :param="form"
      @loaded="getPayload" list-colum-name="subsidiaryConfList">
      <el-table-column prop="mechanismName" label="机构名称" width="200" align="center">
      </el-table-column>
      <el-table-column label="积分信息" align="center" width="450">
        <template slot-scope="scope">
          <span v-for="credit in scope.row.creditConfDetailList" :key="credit.id">
            <img :src="credit.creditIconUrl" height="30" width="30" />{{credit.creditTypeName}}:{{credit.amount}},
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="props">
          <el-button @click="distributeCredit(props.row)" type="success" :loading="props.row.loading" plain>分配积分</el-button>
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
        mechanismName: ""
      },
      creditTypeId: "",
      mechanismId: "",
      loading: false,
      showDialog: false,
      subsidiaryConfList: [],
      creditConfList: []
      // creditTypeList: []
    };
  },

  methods: {
    getPayload(list, rs) {
      this.loading = false;
      console.log("list", list);
      console.log("rs", rs);
      this.creditConfList = rs.payload.creditConfDetailList;
      this.subsidiaryConfList = rs.payload.subsidiaryConfList;
      this.mechanismId = rs.payload.mechanismId;
      // this.loadCreditTypeList(this.mechanismId);
    },
    // async loadCreditTypeList(mechanismId) {
    //   let rs = await this.$post(
    //     "credit/mechanismCreditConf/querySubsidiaryMechanismCreditConf",
    //     {
    //       mechanismId: mechanismId
    //     }
    //   );
    //   if (rs.status == "200") {
    //     console.info("creditTypeList:" + rs.payload);
    //     this.creditTypeList = rs.payload.creditConfDetailList;
    //   }
    // },
    async autoAdjustCredit() {
      this.loading = true;
      let rs = await this.$post(
        "credit/mechanismCreditConf/auto/outGivingMechanismCredit?creditTypeId=" +
          this.creditTypeId
      );
      if (rs.status == "200") {
        this.$message({
          message: rs.message,
          type: "success"
        });
        this.$emit("success", this.form);
        this.onSearch();
      } else {
        this.loading = false;
        this.$message.error(rs.message);
      }
      this.loading = false;
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },

    distributeCredit(institution) {
      this.$router.push({
        path:
          "/institutionCredit/distributeCredit/" +
          institution.mechanismId +
          "/" +
          institution.mechanismName +
          "/" +
          this.mechanismId
      });
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
