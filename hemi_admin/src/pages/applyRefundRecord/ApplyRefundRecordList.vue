<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="订单号">
        <el-input v-model="form.orderId" placeholder="输入订单号查询"></el-input>
      </el-form-item>
      <el-form-item label="预支付订单号">
        <el-input v-model="form.preOrderId" placeholder="输入预支付订单号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="refund_apply/kefu/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column prop="id" label="编号" width="70">
      </el-table-column>
      <el-table-column label="退款金额" width="90" prop="amount">
      </el-table-column>
      <el-table-column label="订单号" width="230" prop="orderId">
      </el-table-column>
      <el-table-column label="预支付订单号" width="230" prop="preOrderId">
      </el-table-column>
      <el-table-column label="申请时间" width="180" prop="applyCommitTime">
      </el-table-column>
      <el-table-column label="申请备注" width="230" prop="applyReason">
      </el-table-column>
      <el-table-column width="120" prop="applyStatus" label="申请状态">
        <template slot-scope="props">
          <el-tag type="info" v-if="props.row.applyStatus=='0'">未受理</el-tag>
          <el-tag type="success" v-else-if="props.row.applyStatus=='1'">已受理</el-tag>
          <el-tag type="danger" v-else-if="props.row.applyStatus=='2'">驳回</el-tag>
          <el-tag type="danger" v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="needCancelOrder" label="订单处理">
        <template slot-scope="props">
          <el-tag type="success" v-if="props.row.needCancelOrder=='0'">不取消订单</el-tag>
          <el-tag type="warning" v-else-if="props.row.needCancelOrder=='1'">取消订单</el-tag>
          <el-tag type="danger" v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-form-item label="退款状态">
        <el-select v-model="form.refundStatus" placeholder="退款状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="未退款" value="0"></el-option>
          <el-option label="已退款" value="1"></el-option>
          <el-option label="退款失败" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-table-column label="驳回理由" width="230" prop="refuseReason">
      </el-table-column>
      <el-table-column label="退款流水" width="230" prop="refundSerialsId">
      </el-table-column>
      <el-table-column label="退款失败原因" prop="remark">
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {
        // id: this.$route.params.id
      },
      ipShowDialog: false,
      loading: false,
      merchant: ""
    };
  },
  methods: {
    edit(merchant) {
      this.merchant = merchant;
      this.ipShowDialog = true;
    },
    onAdd() {
      this.merchant = {};
      this.ipShowDialog = true;
    },
    async del(white) {
      if (confirm("确定删除IP吗？")) {
        white.loading = true;
        let rs = await this.$post("merchantIp/delMerchantIpByid", {
          id: white.id,
          mid: this.$route.params.id
        });
        if (rs.status == "200") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.$emit("success");
          this.$emit("close");
          this.$refs.myTable.search();
        } else {
          this.$message.error(rs.msg);
        }
        white.loading = false;
      }
    },
    onSearch() {
      this.loading = true;
      this.catalog = null;
      this.$refs.myTable.search();
    }
  },
  activated() {}
};
</script>

<style scoped>
</style>
