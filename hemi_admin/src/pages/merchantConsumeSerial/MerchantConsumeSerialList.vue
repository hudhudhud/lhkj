<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="商户" v-if="merchantList.length>1">
                <el-select v-model="form.merchantId" placeholder="请选择商户">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="merchant in merchantList" :key="merchant.id" :value="merchant.id" :label="merchant.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流水类型">
                <el-select v-model="form.serialType" placeholder="流水类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="消费" value="0"></el-option>
                    <el-option label="充值" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="交易类型">
                <el-select v-model="form.consumeWay" placeholder="交易类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="无类型" value="0"></el-option>
                    <el-option label="红包" value="1"></el-option>
                    <el-option label="转账" value="2"></el-option>
                    <el-option label="其它" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="derived" :loading="derivedloading">导出</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="merchantConsumeSerial/query" :param="form" @loaded="loading = false" show-pager>
            <el-table-column prop="merchantname" label="商户名称" v-if="merchantList.length>1" width="170">
            </el-table-column>
            <el-table-column prop="amount" label="交易金额" width="100">
            </el-table-column>
            <el-table-column prop="ctime" label="交易时间" width="180">
            </el-table-column>
            <el-table-column prop="serialType" label="流水类型" width="120">
                <template slot-scope="props">
                    <el-tag v-model="props.row.serialType" v-if="props.row.serialType=='0'">消费</el-tag>
                    <el-tag v-model="props.row.serialType" v-else-if="props.row.serialType=='1'">充值</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="consumeWay" label="交易类型" width="120">
                <template slot-scope="props">
                    <el-tag type="info" v-model="props.row.consumeWay" v-if="props.row.consumeWay=='0'">无类型</el-tag>
                    <el-tag v-model="props.row.consumeWay" v-else-if="props.row.consumeWay=='1'">红包</el-tag>
                    <el-tag v-model="props.row.consumeWay" v-else-if="props.row.consumeWay=='2'">转账</el-tag>
                    <el-tag type="info" v-model="props.row.consumeWay" v-else-if="props.row.consumeWay=='3'">其它</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="500">
                <template slot-scope="props">
                    <!-- <el-button @click="resend(props.row)" :disabled="props.row.isadd == '1'" plain>重新发送</el-button> -->
                </template>
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
        serialType: "",
        consumeWay: "",
        merchantId: ""
      },
      merchantList: [],
      loading: false,
      derivedloading: false
    }
  },
  methods: {
    async derived () {
      this.derivedloading = true
      let rs = await this.$post("merchantConsumeSerial/derive", this.form)
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.derivedloading = false
    },
    async getMerchantList () {
      let rs = await this.$post("merchantConsumeSerial/getMerhcantList")
      this.merchantList = rs.payload
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    }
  },
  created () {
    this.getMerchantList()
  }
}
</script>

<style scoped>
</style>
