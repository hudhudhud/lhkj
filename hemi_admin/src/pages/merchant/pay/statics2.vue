<template>
  <LayoutPage>
    <LayoutSearch>

      <el-form-item label="商户名称">
        <el-select v-model="form.merchantId" placeholder="请选择商户" size="mini" clearable>
          <el-option v-for="merchant in merchants" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker v-model="form.datetime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label=日期>
                <el-date-picker v-model="form.datetime" type="datetime" placeholder="请选择查询日期" default-time="00:00:00" size="mini">
                </el-date-picker>
            </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
    </LayoutSearch>
    当页总金额:{{this.wholePrice}}
    <LayoutTable ref="myTable" url="/pay/query" :param="form" @loaded="ppp" show-pager>
      <el-table-column prop="merchantid" label="商户Id" width="100">
      </el-table-column>
      <el-table-column prop="paynums" label="支付笔数" width="140">
      </el-table-column>
      <el-table-column prop="payamount" label="支付总金额" width="240">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="merchantname" label="商户名称">
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
      merchants: [],
      wholePrice: "0"
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    async getAllMerchant () {
      let rs = await this.$get("/pay/get/merchants")
      if (rs.status == "200") {
        this.merchants = rs.payload.list
      } else {
        this.$message.error(rs.msg)
      }
    },
    ppp (list, rs) {
      this.loading = false
      this.wholePrice = rs.payload.wholePrice
    }
  },
  created () {
    this.getAllMerchant()
  }
}

</script>

<style scoped>
</style>
