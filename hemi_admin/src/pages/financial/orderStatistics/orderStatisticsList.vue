<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="日期">
                <el-date-picker v-model="form.orderTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
            <el-row>
                <el-form-item :label="'总计金额:'+totalPrice+'元'">
                </el-form-item>
            </el-row>
        </LayoutSearch>

        <LayoutTable ref="myTable" url="order/get_statement" :param="form" @loaded="getLoaded" show-pager>
            <el-table-column prop="baseProName" label="商品名称" width="250" align="center">
            </el-table-column>
            <el-table-column prop="orderTime" label="日期" width="140" align="center">
            </el-table-column>
            <el-table-column prop="proStandardFishCostTotal" label="金额汇总" align="center">
            </el-table-column>
        </LayoutTable>
    </LayoutPage>
</template>

<script>

export default {
  data () {
    return {
      form: {
        merchantId: "",
        orderTime: ""

      },
      loading: false,
      showDialog: false,
      showConfigDialog: false,
      order: null,
      submiting: false,
      derivedloading: false,
      totalPrice: ""
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
      this.loading = false
    },
    getLoaded (list, rs) {
      this.loading = false
      this.totalPrice = rs.payload.totalPrice
      console.log("rs", rs)
    }
  },
  created () {

  }
}

</script>

<style scoped>
</style>
