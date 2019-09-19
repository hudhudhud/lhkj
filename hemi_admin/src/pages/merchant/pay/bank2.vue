<template>
    <LayoutPage>
        <LayoutSearch>

            <el-form-item label="日期">
                <el-date-picker v-model="form.searchTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="/pay/bank/serials/get" :param="form" show-pager>
            <el-table-column prop="accountName" label="账户名称" width="150">
            </el-table-column>
            <el-table-column prop="accountNo" label="账号" width="300">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="amount" label="收入金额汇总">
            </el-table-column>
        </LayoutTable>
        <iframe id="exelIframe" style="display:none;"></iframe>
    </LayoutPage>
</template>

<script>

export default {
  data () {
    return {
      form: {
        merchantId: ""
      },
      loading: false,
      showDialog: false,
      showConfigDialog: false,
      order: null,
      submiting: false,
      derivedloading: false,
      wholePrice: "0"
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    }
  },
  created () {

  }
}

</script>

<style scoped>
</style>
