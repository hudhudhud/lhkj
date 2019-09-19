<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/proStandard/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="100" prop="id">
      </el-table-column>
      <el-table-column label="创建时间" width="180" prop="ctime">
      </el-table-column>
      <el-table-column label="产品" width="180" prop="productname">
      </el-table-column>
      <el-table-column label="规格" width="180" prop="prostandardName">
      </el-table-column>
      <el-table-column label="估值" width="180" prop="valuedPrice">
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑" v-model="ShowDialog">
      <ProStandardForm :ProStandard="ProStandard" @success="onSearch" @close="ShowDialog=false"></ProStandardForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import ProStandardForm from "./ProStandardForm";
export default {
  components: { ProStandardForm },
  data() {
    return {
      form: {},
      ShowDialog: false,
      loading: false,
      ProStandard: null
    };
  },
  methods: {
    edit(ProStandard) {
      this.ProStandard = ProStandard;
      this.ShowDialog = true;
    },
    onAdd() {
      this.ProStandard = null;
      this.ShowDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.ProStandard = null;
      this.$refs.myTable.search();
    }
  },
  activated() {}
};
</script>

<style scoped>
</style>
