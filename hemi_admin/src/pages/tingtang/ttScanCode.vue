<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="机构号">
        <el-input v-model="form.organCode" placeholder="输入机构号查询"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" placeholder="输入手机号查询"></el-input>
      </el-form-item>
      <!-- <el-form-item label="产品">
        <el-select v-model="form.productId" placeholder="请选择产品" size="mini" clearable>
          <el-option v-for="product in productList" :key="product.id" :label="product.productName" :value="product.productId">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label=查询时间范围>
        <el-date-picker v-model="form.oldTime" type="datetime" placeholder="请选择查询起始时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=——>
        <el-date-picker v-model="form.newTime" type="datetime" placeholder="请选择查询结束时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="derived" :loading="derivedloading">导出</el-button>
      </el-form-item>
    </LayoutSearch>
    总结算金额:{{this.settledPrice.settledprice}}元
    <LayoutTable ref="myTable" url="staffActLog/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column prop="id" label="记录ID" width="100">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="140">
      </el-table-column>
      <el-table-column prop="productname" label="活动" width="200">
      </el-table-column>
      <el-table-column prop="organCode" label="机构号" width="170">
      </el-table-column>
      <el-table-column prop="createTime" label="扫码时间">
      </el-table-column>
    </LayoutTable>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {
        orderCode: "",
        proStandardId: this.$route.params.standardId || "",
        orderState: "0",
        actId: "",
        merchantId: "",
        tel: ""
      },
      loading: false,
      showDialog: false,
      showConfigDialog: false,
      order: null,
      submiting: false,
      bussinessList: [],
      productList: [],
      settledPrice: "0",
      derivedloading: false
    };
  },
  methods: {
    async derived() {
      this.derivedloading = true;
      let rs = await this.$post("staffActLog/derived", this.form);
      if (rs.status == "300") {
        this.findRedisKey(rs.payload);
        // this.$el.querySelector("#exelIframe").src = rs.payload
      } else {
        this.derivedloading = false;
        this.$message.error(rs.msg);
      }
    },
    async findRedisKey(key) {
      let rs = await this.$post("staffBusinessLog/findRedisKey", {
        key: key
      });
      if (rs.status == 200) {
        this.derivedloading = false;
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else if (rs.status == 300) {
        let this_ = this;
        setTimeout(function() {
          this_.findRedisKey(key);
        }, 1500);
      } else {
        this.derivedloading = false;
        this.$message.error(rs.msg);
      }
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async findBussinessLogById() {
      let rs = await this.$post("staffBusinessLog/resendByCredit", this.form);
      if (rs.status == "200") {
        this.bussinessList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
    },
    async findOneLevelBussiness(rs) {
      if (!this.form.levelOneId) {
        this.form.type = "";
        this.form.bussinessId = "";
        this.twoLevelBussinessList = [];
      } else {
        this.form.type = 0;
        let res = await this.$get("staffBusinessLog/getByParentId/" + rs);
        if (res.status == "200") {
          this.twoLevelBussinessList = res.payload;
        } else {
          this.$message.error(res.msg);
        }
        this.onSearch();
      }
    },
    async getAllProducts() {
      let rs = await this.$post("staffActLog/products/get", this.form);
      if (rs.status == "200") {
        this.productList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
    },
    async getSettledPrice() {
      let rs = await this.$post("staffActLog/settled/price/get", this.form);
      if (rs.status == "200") {
        this.settledPrice = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
    }
  },
  created() {
    // this.getAllProducts();
    this.getSettledPrice();
  }
};
</script>

<style scoped>
</style>
