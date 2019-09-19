<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-select v-model="form.merchantId" placeholder="请选择商户" clearable>
          <el-option v-for="item in merchantList" :key="item.id" :value="item.id" :label="item.merchantName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.productId" placeholder="请选择商品" clearable @change="getProstandardList">
          <el-option v-for="item in productList" :key="item.id" :value="item.id" :label="item.typeName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.standardId" placeholder="请选择规格" clearable>
          <el-option v-for="item in prostandardList" :key="item.id" :value="item.id" :label="item.prostandardName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/order/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="100" prop="id">
      </el-table-column>
      <el-table-column label="创建时间" width="180" prop="ctime">
      </el-table-column>
      <el-table-column label="商户" width="180" prop="merchantname">
      </el-table-column>
      <el-table-column label="券定义" width="180" prop="coupondefinename">
      </el-table-column>
      <el-table-column label="面值" width="180" prop="cashCouponValue">
      </el-table-column>
      <el-table-column label="银行结算价格" width="180" prop="chargeBankAmount">
      </el-table-column>
      <el-table-column label="商户结算价格" width="180" prop="merchantChargeAmount">
      </el-table-column>
      <el-table-column label="产品" width="180" prop="productname">
      </el-table-column>
      <el-table-column label="规格" width="180" prop="prostandardname">
      </el-table-column>
      <el-table-column label="操作人ID" width="180" prop="operatorId">
      </el-table-column>
      <el-table-column label="券码" width="200" prop="couponCode">
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="props">
          <!-- <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button> -->
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      loading: false,
      productList: [],
      merchantList: [],
      prostandardList: []
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async getMerchantList() {
      let rs = await this.$post("/colo/merchant/get/list");
      if (rs.status == "200") {
        this.merchantList = rs.payload;
      }
    },
    async getProductList() {
      let rs = await this.$post("/colo/product/get/list");
      if (rs.status == "200") {
        this.productList = rs.payload;
      }
    },
    async getProstandardList(id) {
      if (id) {
        let rs = await this.$post("/colo/proStandard/get/by_productid/" + id);
        if (rs.status == "200") {
          this.prostandardList = rs.payload;
        }
      }
    }
  },
  created() {
    this.getMerchantList();
    this.getProductList();
  }
};
</script>

<style scoped>
</style>
