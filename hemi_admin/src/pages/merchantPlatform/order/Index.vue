<template>
  <LayoutPage>
    <LayoutSearch>

      <el-form-item label=商户>
        <el-select v-model="form.merchantId" placeholder="请选择商户" size="mini" clearable @change="findActivity">
          <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=客户注册号码>
        <el-input v-model="form.tel" placeholder="请输入客户号码" size="mini"></el-input>
      </el-form-item>
      <el-form-item label=活动>
        <el-select v-model="form.actId" placeholder="请选择活动" clearable size="mini">
          <el-option v-for="activity in activityList" :key="activity.id" :label="activity.actName" :value="activity.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=订单号>
        <el-input v-model="form.orderCode" placeholder="请输入订单号" size="mini"></el-input>
      </el-form-item>

      <el-form-item label=充值号码>
        <el-input v-model="form.rechargeAccount" placeholder="请输入充值号码" size="mini"></el-input>
      </el-form-item>
      <el-form-item label=查询时间范围>
        <el-date-picker v-model="form.begdate" type="datetime" placeholder="请选择查询起始时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=——>
        <el-date-picker v-model="form.enddate" type="datetime" placeholder="请选择查询结束时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=订单状态>
        <el-select v-model="form.orderState" placeholder="请选择订单状态" size="mini">
          <el-option label="所有订单" value="0"></el-option>
          <el-option label="正在下单" value="1"></el-option>
          <el-option label="订单取消" value="2"></el-option>
          <el-option label="订单完成" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="!form.proStandardId" label=支付状态>
        <el-select v-model="form.payState" placeholder="请选择支付状态" size="mini">
          <el-option label="所有订单" value="0"></el-option>
          <el-option label="未支付" value="1"></el-option>
          <el-option label="已支付" value="2"></el-option>
          <el-option label="退款中" value="3"></el-option>
          <el-option label="退款完成" value="4"></el-option>
          <el-option label="超时支付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
        <el-button type="primary" @click="ouputExcel" :loading="loading">导出</el-button>
      </el-form-item>

    </LayoutSearch>
    <LayoutTable ref="myTable" url="order/search" @expand-change="loadFishOrder" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="orderCode" label="订单号" width="200">
      </el-table-column>
      <el-table-column prop="proName" label="商品名称" width="200">
      </el-table-column>
      <el-table-column prop="proStandardName" label="商品规格" width="100">
      </el-table-column>
      <el-table-column prop="actualPrice" label="实际支付" width="50">
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="200">
      </el-table-column>
      <el-table-column prop="commodityNum" label="商品数量" width="50">
      </el-table-column>
      <el-table-column prop="credit" label="使用积分" width="50">
      </el-table-column>
      <el-table-column prop="couponName" label="使用卡券" width="100">
      </el-table-column>
      <el-table-column label="购买抽奖" width="50">
        <template slot-scope="props">
          {{ props.row.proType=="3"?"是":"否" }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag v-for="tag in orderTags" :key="tag.name" :type='tag.type' v-if="props.row.orderState==tag.value">
            {{tag.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" width="130" align="center">
        <template slot-scope="props">
          <el-tag v-for="tag in payTags" :key="tag.name" :type='tag.type' v-if="props.row.payState==tag.value">
            {{tag.name}}
          </el-tag>
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
        orderCode: "",
        proStandardId: this.$route.params.standardId || "",
        orderState: "0",
        actId: "",
        merchantId: "",
        tel: "",
        rechargeAccount: "",
        begdate: "",
        enddate: "",
        payState: "0",
        fishState: "-1"
      },
      fishOrderTags: [
        { value: "0", name: "未提货", type: "" },
        { value: "1", name: "提货中", type: "success" },
        { value: "2", name: "已受理", type: "info" },
        { value: "4", name: "提货成功", type: "success" },
        { value: "3", name: "提货失败", type: "warning" },
        { value: "5", name: "提货异常", type: "danger" }
      ],
      orderTags: [
        { value: "1", name: "下单", type: "" },
        { value: "2", name: "订单取消", type: "warning" },
        { value: "3", name: "订单完成", type: "success" }
      ],
      payTags: [
        { value: "1", name: "未支付", type: "" },
        { value: "2", name: "支付成功", type: "success" },
        { value: "3", name: "正在退款", type: "info" },
        { value: "4", name: "退款成功", type: "success" }
      ],
      loading: false,
      showDialog: false,
      showConfigDialog: false,
      order: null,
      submiting: false,
      merchantList: [],
      activityList: [],
      fishOrderList: []
    }
  },
  methods: {
    async loadFishOrder (row) {
      let rs = await this.$post("order/show_fishorder/" + row.orderCode)
      if (rs.status == "200") {
        this.fishOrderList = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    async ouputExcel () {
      this.submiting = true
      let rs = await this.$post("order/merchantplatform/export", this.form)
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload
      } else {
        this.$message.error(rs.msg)
      }

      this.submiting = false
    },
    comfirmFishOrder (order) {
      this.order = order
      this.$router.push({
        path: "order/comfirmFishOrder/" + order.orderNumber
      })
    },
    async loadMerchantList () {
      this.submiting = true
      let rs = await this.$get("merchant/get_merchant_list")
      if (rs.status == "200") {
        this.merchantList = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    findActivity () {
      if (this.form.merchantId != null && this.form.merchantId != "") {
        this.findActivityByMerchantId()
      } else {
        this.form.actId = ""
        this.activityList = []
      }
    },
    async findActivityByMerchantId () {
      this.submiting = true
      let rs = await this.$get("order/show_activity/" + this.form.merchantId)
      if (rs.status == "200") {
        this.activityList = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    }
  },
  created () {
    this.loadMerchantList()
  }
}
</script>

<style scoped>
</style>
