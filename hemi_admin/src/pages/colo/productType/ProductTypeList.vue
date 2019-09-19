<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/productType/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="100" prop="id">
      </el-table-column>
      <el-table-column label="type" width="90" prop="type">
      </el-table-column>
      <el-table-column label="name" width="180" prop="name">
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑" v-model="ShowDialog">
      <ProductTypeForm :productType="productType" @success="onSearch" @close="ShowDialog=false"></ProductTypeForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import ProductTypeForm from "./ProductTypeForm";
export default {
  components: { ProductTypeForm },
  data() {
    return {
      form: {},
      ShowDialog: false,
      loading: false,
      productType: null
    };
  },
  methods: {
    edit(productType) {
      this.productType = productType;
      this.ShowDialog = true;
    },
    onAdd() {
      this.productType = null;
      this.ShowDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.productType = null;
      this.$refs.myTable.search();
    }
  },
  activated() {}
};
</script>

<style scoped>
</style>
