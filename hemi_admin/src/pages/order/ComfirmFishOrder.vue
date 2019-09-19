<template>
  <LayoutPage>
    <LayoutTable ref="myTable" url="order/comfirm" :param="form" @loaded="loading=false">
      <el-table-column prop="out_trade_id" label="飞鱼订单号">
      </el-table-column>
      <el-table-column prop="order_number" label="飞鱼平台订单号">
      </el-table-column>
      <el-table-column label="飞鱼平台订单状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag v-for="tag in tags" :key="tag.name" :type='tag.type' v-if="props.row.status==tag.value">
            {{tag.name}}
          </el-tag>
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
        orderNumber: this.$route.params.orderNumber
      },
      loading: false,
      submiting: false,
      tags: [
        { value: "0", name: "正在处理", type: "" },
        { value: "1", name: "交易成功", type: "success" },
        { value: "2", name: "交易失败", type: "warning" }
      ]
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    }
  }
};
</script>

<style scoped>
</style>
