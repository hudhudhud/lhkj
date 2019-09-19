<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/product/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="100" prop="id">
      </el-table-column>
      <el-table-column label="创建时间" width="180" prop="ctime">
      </el-table-column>
      <el-table-column label="产品" width="180" prop="typeName">
      </el-table-column>
      <el-table-column label="产品图片" width="180" align="center">
        <template slot-scope="props">
          <img :src="props.row.productImage" v-if="props.row.productImage" style="max-height:50px;" />
        </template>
      </el-table-column>
      <el-table-column width="90" prop="type" label="类型">
        <template slot-scope="props">
          <el-tag>{{props.row.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑" v-model="ShowDialog">
      <ProductForm :product="product" @success="onSearch" @close="ShowDialog=false"></ProductForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import ProductForm from "./ProductForm";
export default {
  components: { ProductForm },
  data() {
    return {
      form: {},
      ShowDialog: false,
      loading: false,
      product: null
    };
  },
  methods: {
    edit(product) {
      this.product = product;
      this.ShowDialog = true;
    },
    onAdd() {
      this.product = null;
      this.ShowDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.product = null;
      this.$refs.myTable.search();
    }
  },
  activated() {}
};
</script>

<style scoped>
</style>
