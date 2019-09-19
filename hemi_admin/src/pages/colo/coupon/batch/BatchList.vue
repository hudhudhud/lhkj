<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/couponBatch/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="80" prop="id">
      </el-table-column>
      <el-table-column label="券定义ID" width="130" prop="couponDefineId">
      </el-table-column>
      <el-table-column label="创建时间" width="180" prop="ctime">
      </el-table-column>
      <el-table-column label="过期时间" width="180" prop="ptime">
      </el-table-column>
      <el-table-column label="成本单价" width="120" prop="sellSinglePrice">
      </el-table-column>
      <el-table-column label="数量" width="120" prop="num">
      </el-table-column>
      <el-table-column width="100" prop="status" label="生成状态">
        <template slot-scope="props">
          <el-tag v-if="props.row.status=='1'" type="info">已生成</el-tag>
          <el-tag v-else-if="props.row.status=='0'" type="success">未生成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" width="220">
      </el-table-column>
      <el-table-column label="操作" min-width="100" fixed="right">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" v-if="props.row.status=='0'" :loading="props.row.loading">编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑券定义" v-model="ShowDialog">
      <BatchForm :batch="batch" @success="onSearch" @close="ShowDialog=false"></BatchForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import BatchForm from "./BatchForm";
export default {
  components: { BatchForm },
  data() {
    return {
      form: {},
      batchList: [],
      ShowDialog: false,
      loading: false,
      batch: ""
    };
  },
  methods: {
    edit(batch) {
      this.batch = batch;
      this.ShowDialog = true;
    },
    onAdd() {
      this.batch = null;
      this.ShowDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.batch = null;
      this.$refs.myTable.search();
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
