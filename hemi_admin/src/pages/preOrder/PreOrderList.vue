<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="预支付订单号">
                <el-input v-model="form.preOrderId" placeholder="输入预支付订单号查询"></el-input>
            </el-form-item>
            <el-form-item label="商户订单号">
                <el-input v-model="form.merchantOrder" placeholder="输入预商户订单号查询"></el-input>
            </el-form-item>
            <el-form-item label="支付状态">
                <el-select v-model="form.status" placeholder="支付状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="0" value="0"></el-option>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="preOrder/query" :param="form" @loaded="loading=false" show-pager>
            <el-table-column prop="preOrderId" label="预支付订单号" width="200">
            </el-table-column>
            <el-table-column prop="merchantId" label="商户ID" width="90">
            </el-table-column>
            <el-table-column prop="proDescribe" label="商品描述" width="220">
            </el-table-column>
            <el-table-column prop="merchantOrder" label="商户订单号" width="190">
            </el-table-column>
            <el-table-column prop="totalFee" label="价格" width="80">
            </el-table-column>
            <el-table-column prop="ordertime" label="预支付订单时间" width="180">
            </el-table-column>
            <el-table-column prop="attach" label="通知时原样带回" width="180">
            </el-table-column>
            <el-table-column prop="authId" label="authId" width="180">
            </el-table-column>
            <el-table-column prop="sysFlag" label="系统标志" width="90">
            </el-table-column>
            <el-table-column prop="quantity" label="quantity" width="90">
            </el-table-column>
            <el-table-column prop="status" label="支付状态" width="110">
                <template slot-scope="props">
                    <el-tag type="info" v-if="props.row.status=='0'">0</el-tag>
                    <el-tag type="success" v-else-if="props.row.status=='1'">1</el-tag>
                    <el-tag type="danger" v-else-if="props.row.status=='2'">2</el-tag>
                    <el-tag type="danger" v-else-if="props.row.status=='2'">3</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
                <template slot-scope="props">
                </template>
            </el-table-column>
        </LayoutTable>
    </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      loading: false
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
