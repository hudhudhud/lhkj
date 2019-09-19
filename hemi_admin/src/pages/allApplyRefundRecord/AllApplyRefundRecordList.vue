<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="订单号">
        <el-input v-model="form.orderId" placeholder="输入预商户订单号查询"></el-input>
      </el-form-item>
      <el-form-item label="预支付订单号">
        <el-input v-model="form.preOrderId" placeholder="输入预支付订单号查询"></el-input>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="form.applyStatus" placeholder="处理状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="未受理" value="0"></el-option>
          <el-option label="已受理" value="1"></el-option>
          <el-option label="拒绝受理" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退款状态">
        <el-select v-model="form.refundStatus" placeholder="退款状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="未退款" value="0"></el-option>
          <el-option label="已退款" value="1"></el-option>
          <el-option label="退款失败" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="refund_apply/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column prop="id" label="ID" width="90">
      </el-table-column>
      <el-table-column label="订单号" width="160" prop="orderId">
      </el-table-column>
      <el-table-column label="预支付订单号" width="190" prop="preOrderId">
      </el-table-column>
      <el-table-column label="金额" width="90" prop="amount">
      </el-table-column>
      <el-table-column label="退款原因" width="180" prop="applyReason">
      </el-table-column>
      <el-table-column label="处理状态" width="150">
        <template slot-scope="props">
          <el-tag type="danger" v-if="props.row.applyStatus==2">拒绝受理</el-tag>
          <el-tag type="success" v-if="props.row.applyStatus==1">已受理</el-tag>
          <el-tag type="info" v-if="props.row.applyStatus==0">未受理</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="申请提交时间" width="180" prop="applyCommitTime">
      </el-table-column>
      <el-table-column label="退款状态" width="150">
        <template slot-scope="props">
          <el-tag type="danger" v-if="props.row.refundStatus==2">退款失败</el-tag>
          <el-tag type="success" v-if="props.row.refundStatus==1">已退款</el-tag>
          <el-tag type="info" v-if="props.row.refundStatus==0">未退款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="180" prop="applyUserName">
      </el-table-column>
      <el-table-column label="申请处理时间" width="180" prop="applyProcessTime">
      </el-table-column>
      <el-table-column label="退款流水" width="180" prop="refundSerialsId">
      </el-table-column>
      <el-table-column label="退款失败原因" prop="remark" min-width="300">
      </el-table-column>
      <el-table-column label="操作" fixed min-width="90">
        <template slot-scope="props">
          <el-button v-if="props.row.applyStatus==0" @click="refundAudit(props.row)" :loading="props.row.loading">审核</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="退款审核" v-model="showDialog">
      <AllApplyRefundRecordForm :preOrder="preOrder" @success="onSearch" @close="showDialog=false"></AllApplyRefundRecordForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import AllApplyRefundRecordForm from "./AllApplyRefundRecordForm";
export default {
  components: {
    AllApplyRefundRecordForm
  },
  data() {
    return {
      form: { refundStatus: "", applyStatus: "" },
      showDialog: false,
      loading: false,
      preOrder: ""
    };
  },
  methods: {
    refundAudit(preOrder) {
      this.preOrder = preOrder;
      this.showDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.catalog = null;
      this.$refs.myTable.search();
    }
  },
  activated() {
    this.onSearch();
  }
};
</script>

<style scoped>
</style>
