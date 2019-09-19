<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/couponDefine/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="100" prop="id">
      </el-table-column>
      <el-table-column label="名称" width="100" prop="name">
      </el-table-column>
      <el-table-column label="商品名" width="180" prop="productName">
      </el-table-column>
      <el-table-column label="规格名" width="180" prop="prostandardName">
      </el-table-column>
      <el-table-column label="配置区域mark" width="140" prop="configAreaMark">
      </el-table-column>
      <el-table-column label="代金券面值" width="120" prop="cashCouponValue">
      </el-table-column>
      <el-table-column label="折扣券折扣" width="120" prop="discount">
      </el-table-column>
      <el-table-column label="默认成本" width="120" prop="defaultCost">
      </el-table-column>
      <el-table-column width="90" prop="couponType" label="券类型">
        <template slot-scope="props">
          <el-tag v-if="props.row.couponType=='1'">代金券</el-tag>
          <el-tag v-else-if="props.row.couponType=='2'">折扣券</el-tag>
          <el-tag v-else-if="props.row.couponType=='3'">抵扣券</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100" fixed="right">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
          <!-- <el-button @click="del(props.row)" :loading="props.row.loading">删除</el-button> -->
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑券定义" v-model="ShowDialog">
      <DefineForm :define="define" @success="onSearch" @close="ShowDialog=false"></DefineForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import DefineForm from "./DefineForm";
export default {
  components: { DefineForm },
  data() {
    return {
      form: {},
      ShowDialog: false,
      loading: false,
      define: null
    };
  },
  methods: {
    edit(define) {
      this.define = define;
      this.ShowDialog = true;
    },
    onAdd() {
      this.define = null;
      this.ShowDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.define = null;
      this.$refs.myTable.search();
    }
  },
  activated() {}
};
</script>

<style scoped>
</style>
