<template>
  <LayoutPage>
    <LayoutSearch>
      <el-row>
        <el-form-item label=订单号>
          <el-input v-model="form.orderCode" placeholder="请输入订单号" size="mini"></el-input>
        </el-form-item>
        <el-form-item label=商户>
          <el-select v-model="form.merchantId" placeholder="请选择商户" size="mini" clearable @change="findActivity">
            <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=活动>
          <el-select v-model="form.actId" placeholder="请选择活动" clearable size="mini">
            <el-option v-for="activity in activityList" :key="activity.id" :label="activity.actName" :value="activity.id">
            </el-option>
          </el-select>
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
          <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
          <el-button type="primary" @click="ouputExcel" :loading="loading">导出</el-button>
        </el-form-item>
      </el-row>
    </LayoutSearch>
    <el-dialog title="提示" :visible.sync="this.isProgress" width="70%">
      <span>
        <el-progress :percentage="progress" color="#8e71c7"></el-progress>
      </span>
    </el-dialog>
    <LayoutTable ref="myTable" url="orderReceiptAddress/search" :row-class-name="tableRowClassName" :param="form"
      show-pager>
      <el-table-column prop="orderCode" label="订单号">
      </el-table-column>
      <el-table-column prop="proStandardName" label="商品规格名称">
      </el-table-column>
      <el-table-column prop="name" label="收件人名称">
      </el-table-column>
      <el-table-column prop="phone" label="收件人手机号">
      </el-table-column>
      <el-table-column prop="zipCode" label="邮编">
      </el-table-column>
      <el-table-column prop="provinceCode" label="省编号">
      </el-table-column>
      <el-table-column prop="provinceName" label="省名称">
      </el-table-column>
      <el-table-column prop="cityCode" label="城市编号">
      </el-table-column>
      <el-table-column prop="cityName" label="城市名称">
      </el-table-column>
      <el-table-column prop="areaCode" label="区域编号">
      </el-table-column>
      <el-table-column prop="areaName" label="区域名称">
      </el-table-column>
      <el-table-column prop="detailAddress" label="详细地址">
      </el-table-column>
      <el-table-column prop="expressCompany" label="快递公司">
      </el-table-column>
      <el-table-column prop="expressCode" label="快递编号">
      </el-table-column>
      <el-table-column prop="content" label="备注">
      </el-table-column>
    </LayoutTable>

    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>

</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {
        orderCode: "",
        proStandardId: this.$route.params.standardId || "",
        orderState: "0",
        actId: "",
        merchantId: "",
        proType: "",
        tel: "",
        rechargeAccount: "",
        begdate: "",
        enddate: "",
        payState: "0",
        fishState: "-1"
      },
      loading: false,
      showDialog: false,
      showConfigDialog: false,
      showRemarkDialog: false,
      order: null,
      submiting: false,
      lowFailNum: 0,
      highFailNum: 0,
      merchantList: [],
      activityList: [],
      fishOrderList: [],
      orderList: [],
      sumPrice: "",
      sumFishCost: "",
      isProgress: false,
      progress: 0
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.isFreeze == 1) {
        return "warning-row";
      }
      return "";
    },
    async ouputExcel() {
      this.submiting = true;
      let rs = await this.$post("orderReceiptAddress/export", this.form);
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }

      this.submiting = false;
    },
    // onAdd() {
    //   this.$router.push({
    //     path: "/coupon/addCoupon"
    //   });
    // },
    loginConfig(merchant) {
      this.$router.push({
        path: "merchant/loginConfig/" + merchant.id
      });
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    // onAdd() {
    //   this.merchant = null;
    //   this.$router.push({
    //     path: "merchant/add"
    //   });
    // },
    async loadMerchantList() {
      this.submiting = true;
      let rs = await this.$get("merchant/get_merchant_list");
      if (rs.status == "200") {
        this.merchantList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    findActivity() {
      if (this.form.merchantId != null && this.form.merchantId != "") {
        this.findActivityByMerchantId();
      } else {
        this.form.actId = "";
        this.activityList = [];
      }
    },
    async findActivityByMerchantId() {
      this.submiting = true;
      let rs = await this.$get("order/show_activity/" + this.form.merchantId);
      if (rs.status == "200") {
        this.activityList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    }
  },
  created() {
    this.loadMerchantList();
  }
};
</script>

<style>
.el-table .warning-row,
.warning-row td {
  background: rgb(233, 204, 150) !important;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
