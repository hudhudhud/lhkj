<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="支付类型">
                <el-select v-model="form.payType" placeholder="请选择">
                    <el-option label="所有" value=""></el-option>
                    <el-option label="微信支付" value="2"></el-option>
                    <el-option label="中行支付" value="3"></el-option>
                    <el-option label="工行支付" value="4"></el-option>
                    <el-option label="建行支付" value="5"></el-option>
                    <el-option label="工行融e联支付" value="6"></el-option>
                    <el-option label="建行信用卡支付" value="7"></el-option>
                    <el-option label="建行网关信用卡支付" value="8"></el-option>
                    <el-option label="建行网关储蓄卡支付" value="9"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退款状态">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="所有" value=""></el-option>
                    <el-option label="未退款" value="0"></el-option>
                    <el-option label="已退款" value="1"></el-option>
                    <el-option label="未知" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="form.orderId" placeholder="输入订单号查询"></el-input>
            </el-form-item>
            <el-form-item label="退款订单号">
                <el-input v-model="form.preOrderId" placeholder="输入退款订单号查询"></el-input>
            </el-form-item>
            <el-form-item label="退款流水号">
                <el-input v-model="form.refundSerialId" placeholder="输入退款流水号查询"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark" placeholder="输入备注查询"></el-input>
            </el-form-item>
            <el-form-item label=查询时间范围>
                <el-date-picker v-model="form.begdate" type="datetime" placeholder="请选择查询起始时间" default-time="00:00:00" size="mini">
                </el-date-picker>
            </el-form-item>
            <el-form-item label=——>
                <el-date-picker v-model="form.enddate" type="datetime" placeholder="请选择查询结束时间" default-time="00:00:00" size="mini">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
            退款总额:{{form.amount}}
        </LayoutSearch>
        <LayoutTable ref="myTable" url="refundRecord/query" :param="form" @loaded="setTable" show-pager>
            <el-table-column prop="id" label="ID" width="110">
            </el-table-column>
            <el-table-column prop="payType" label="支付类型" width="200">
                <template slot-scope="props">
                    <el-tag v-if="props.row.payType=='2'">微信支付</el-tag>
                    <el-tag v-else-if="props.row.payType=='3'">中行支付</el-tag>
                    <el-tag v-else-if="props.row.payType=='4'">工行支付</el-tag>
                    <el-tag v-else-if="props.row.payType=='5'">建行支付</el-tag>
                    <el-tag v-else-if="props.row.payType=='6'">工行融e联支付</el-tag>
                    <el-tag v-else-if="props.row.payType=='7'">建行信用卡支付</el-tag>
                    <el-tag v-else-if="props.row.payType=='8'">建行网关信用卡支付</el-tag>
                    <el-tag v-else-if="props.row.payType=='9'">建行网关储蓄卡支付</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="退款状态" width="100">
                <template slot-scope="props">
                    <el-tag type="info" v-if="props.row.status=='0'">未退款</el-tag>
                    <el-tag type="success" v-else-if="props.row.status=='1'">已退款</el-tag>
                    <el-tag type="warning" v-else-if="props.row.status=='2'">未知</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单号" width="190">
            </el-table-column>
            <el-table-column prop="preOrderId" label="退款订单号" width="190">
            </el-table-column>
            <el-table-column prop="refundAmount" label="退款金额" width="100">
            </el-table-column>
            <el-table-column prop="refundSerialId" label="退款流水号" width="190">
            </el-table-column>
            <el-table-column prop="ctime" label="退款时间" width="180">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="100">
            </el-table-column>
            <!-- <el-table-column label="操作" fixed="right" min-width="200">
                <template slot-scope="props">
                    <el-button @click="edit(props.row)" plain>编辑</el-button>
                </template>
            </el-table-column> -->
        </LayoutTable>
    </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      form: {
        payType: "",
        status: "",
        amount: 0
      },
      loading: false
    }
  },
  methods: {
    setTable (rs1, rs2) {
      this.loading = false
      this.form.amount = rs2.payload.amount
    },
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
