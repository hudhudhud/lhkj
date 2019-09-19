<template>
  <LayoutPage>
    <LayoutSearch>
      <el-row>
        <el-form-item label=订单号>
          <el-input v-model="form.orderCode" placeholder="请输入订单号" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
        </el-form-item>
      </el-row>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="order/predate/list" :row-class-name="tableRowClassName" :param="form" show-pager>
      <el-table-column prop="orderCode" :label="'订单号'" width="150">
      </el-table-column>
      <el-table-column prop="orderPredateRecord" label="预定详细信息" width="1000">
      </el-table-column>
      <el-table-column prop="status" label="是否处理" width="50">
        <template slot-scope="props">
          {{ props.row.isRisk=="1"?"是":"否" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="300">
        <template slot-scope="props">
          <el-button type="success" :loading="props.row.loading" plain>标记处理</el-button>
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
        orderCode: ""
      },
      loading: false,
      order: null,
      submiting: false
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.isFreeze == 1) {
        return "warning-row";
      }
      return "";
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
      this.loading = false;
    },
    setSuccess(order) {
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.doSuccess(order);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    setFail(order) {
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // })

          this.doFail(order);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {}
};
</script>

<style>
.el-table .warning-row,
.warning-row td {
  background: rgb(233, 204, 150) !important;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
