
<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="订单号">
        <el-input v-model="orderId" placeholder="输入订单号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" v-if="orderId" :url="'refund_apply/refund_info/get/'+orderId" :param="form" @loaded="loading = false">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.preOrderList" border>
            <el-table-column width="100" prop="status" label="支付状态">
              <template slot-scope="props">
                <el-tag type="info" v-if="props.row.status=='1'">未支付</el-tag>
                <el-tag type="success" v-else-if="props.row.status=='2'">已支付</el-tag>
                <el-tag type="error" v-else>未知状态</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="120" prop="refundStatus" label="退款状态">
              <template slot-scope="props">
                <el-tag type="info" v-if="props.row.refundStatus=='0'">未退款</el-tag>
                <el-tag type="success" v-else-if="props.row.refundStatus=='1'">已退款</el-tag>
                <el-tag type="danger" v-else-if="props.row.refundStatus=='2'">退款失败</el-tag>
                <el-tag type="error" v-else>未知</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="120" prop="fishState" label="提货状态">
              <template slot-scope="props">
                <el-tag type="info" v-if="props.row.fishState=='0'">未调用</el-tag>
                <el-tag type="success" v-else-if="props.row.fishState=='1'">调用中</el-tag>
                <el-tag type="danger" v-else-if="props.row.fishState=='2'">已受理</el-tag>
                <el-tag type="danger" v-else-if="props.row.fishState=='3'">调用失败</el-tag>
                <el-tag type="danger" v-else-if="props.row.fishState=='4'">提货成功</el-tag>
                <el-tag type="danger" v-else-if="props.row.fishState=='5'">提货失败</el-tag>
                <el-tag type="error" v-else>未知状态</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="preOrderTime" label="下单时间" width="180">
            </el-table-column>
            <el-table-column prop="totalFee" label="需支付金额" width="120">
            </el-table-column>
            <el-table-column prop="merchantId" label="商户ID" width="100">
            </el-table-column>
            <el-table-column prop="preOrderId" label="预支付订单号" width="230">
            </el-table-column>
            <el-table-column label="操作" width="120" fixed>
              <template slot-scope="props">
                <el-button type="danger" @click="apply(props.row)" v-if="props.row.refundStatus!='1' && props.row.status=='2'">申请退款</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="orderCode" label="订单号" width="220">
      </el-table-column>
      <el-table-column prop="proDesc" label="购买物品" width="220">
      </el-table-column>
      <el-table-column prop="actualPrice" label="实际支付价格" width="150">
      </el-table-column>
      <el-table-column prop="tel" label="登陆人号码" width="150">
      </el-table-column>
      <el-table-column prop="rechargeAccount" label="充值号码" width="150">
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="190">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <!-- <el-table-column label="操作" min-width="500">
                <template slot-scope="props">
                    <el-button @click="resend(props.row)" :disabled="props.row.isadd == '1'" plain>重新发送</el-button>
                </template>
            </el-table-column> -->
    </LayoutTable>
    <LayoutDialog title="退款审核" v-model="ShowDialog">
      <ApplayRefundForm :preOrder="preOrder" @success="success" @close="close"></ApplayRefundForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import ApplayRefundForm from "./ApplayRefundForm"
export default {
  components: {
    ApplayRefundForm
  },
  data () {
    return {
      orderId: this.$route.params.orderCode,
      form: {
        tel: ""
      },
      loading: false,
      ShowDialog: false,
      preOrder: null
    }
  },
  methods: {
    close () {
      this.ShowDialog = false
      this.preOrder = null
    },
    success () {
      this.ShowDialog = false
      this.preOrder = null
      this.onSearch()
    },
    async apply (preOrder) {
      console.log("退款状态", preOrder.refundStatus)

      preOrder.amount = preOrder.totalFee
      preOrder.orderId = preOrder.merchantOrder
      this.preOrder = preOrder
      this.ShowDialog = true
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    }
  },
  created () {}
}
</script>

<style scoped>
</style>
