<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="订单号">
        <el-input v-model="form.orderId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit" :loading="submiting">导出</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="cashier/queryCcbCsvIssueOrder" :param="form" @loaded="loading=false">
      <el-table-column prop="orderId" label="订单号" align="center">
      </el-table-column>
      <el-table-column prop="trasactionTime" label="交易日期" align="center">
      </el-table-column>
      <el-table-column prop="accountingTime" label="记账日期" align="center">
      </el-table-column>
      <el-table-column prop="status" label="订单状态" align="center">
      </el-table-column>
    </LayoutTable>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>

</template>

<script>
import UploadButton from "@/components/UploadButton"
export default {
  components: {
    UploadButton
  },
  data () {
    return {
      form: {
        id: "",
        ccbCsvBatchSerialId: this.$route.params.batchSerialnum,
        orderId: "",
        trasactionTime: "",
        accountingTime: "",
        bankSerial: "",
        merchantSerial: "",
        status: "",
        bankAccount: "",
        orderAmount: "",
        endingAmount: "",
        transactionAmount: "",
        serviceCharge: "",
        posId: "",
        cardType: "",
        currentPage: "",
        pageSize: ""
      },
      submiting: false,
      loading: false
    }
  },
  methods: {
    async doSubmit () {
      this.submiting = true

      let rs = await this.$post("cashier/exportCcbCsvIssueOrder", this.form)

      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload
        this.$message({
          message: rs.message,
          type: "success"
        })
        this.$emit("success", this.form)
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    exportList (id) {
      this.$router.push({
        path: "/coupon/exportCouponStock/" + id
      })
    },
    async editOnline (activity) {
      let rs = await this.$post("activity/update_online", {actId: activity.actId, actStatus: activity.actStatus})
      if (rs.status == "200") {
        this.onSearch()
      }
    }
  },
  created () {
  }
}
</script>
