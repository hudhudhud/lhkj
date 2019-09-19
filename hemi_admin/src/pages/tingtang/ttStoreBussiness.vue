<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="短信发送状态">
        <el-select v-model="form.smsStatus" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="发送成功" value="1"></el-option>
          <el-option label="未发送" value="0"></el-option>
          <el-option label="发送失败" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动大类">
        <el-select v-model="form.bussinessType" placeholder="请选择业务类型" size="mini" clearable @change="getBusinessList">
          <el-option v-for="bussiness in bussinessTypeList" :key="bussiness.id" :label="bussiness.bussnissName" :value="bussiness.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体活动">
        <el-select v-model="form.businessId" placeholder="请选择业务" size="mini" clearable>
          <el-option v-for="bussiness in businessList" :key="bussiness.id" :label="bussiness.name" :value="bussiness.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构号">
        <el-input v-model="form.organCode" placeholder="输入机构号查询"></el-input>
      </el-form-item>
      <br>
      <el-form-item label=查询时间范围>
        <el-date-picker v-model="form.oldTime" type="datetime" placeholder="请选择查询起始时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=——>
        <el-date-picker v-model="form.newTime" type="datetime" placeholder="请选择查询结束时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.userName" placeholder="输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" placeholder="输入手机号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="derived" :loading="derivedloading">导出</el-button>
      </el-form-item>
    </LayoutSearch>
    总结算金额: {{settledPrice.settledPrice}}元
    <LayoutTable ref="myTable" url="staffBusinessLog/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column prop="id" label="记录ID" width="100">
      </el-table-column>
      <!-- <el-table-column prop="parentname" label="业务类型" width="100">
      </el-table-column> -->
      <el-table-column prop="name" label="活动" width="180">
      </el-table-column>
      <!-- <el-table-column prop="authId" label="客户id" width="150">
      </el-table-column> -->
      <el-table-column prop="smsStatus" label="短信发送状态" width="130">
        <template slot-scope="props">
          <el-tag type="success" v-if="props.row.smsStatus=='1'">成功</el-tag>
          <el-tag type="info" v-else-if="props.row.smsStatus=='0'">未发送</el-tag>
          <el-tag type="danger" v-else-if="props.row.smsStatus=='2'">发送失败</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="orderId" label="订单号" width="140">
      </el-table-column> -->
      <el-table-column prop="mobile" label="手机号" width="160">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="230">
      </el-table-column>
      <el-table-column prop="productId" label="产品id" width="100">
      </el-table-column>
      <el-table-column prop="organCode" label="机构号" width="120">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="ehr" label="录入员工号" width="110">
      </el-table-column>
      <el-table-column prop="productname" label="奖品名称" width="100">
      </el-table-column>
      <el-table-column prop="standinstruction" label="优惠金额" width="100">
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="200">
        <template slot-scope="props">
          <el-button @click="resend(props.row)" v-if="props.row.smsStatus=='2'" plain :loading="loading">重新发送</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
export default {
  data() {
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
      loading: false,
      showDialog: false,
      showConfigDialog: false,
      order: null,
      submiting: false,
      businessList: [],
      bussinessTypeList: [],
      settledPrice: "0",
      derivedloading: false
    };
  },
  methods: {
    async resend(prop) {
      this.loading = true;
      let rs = await this.$post("staffBusinessLog/resendSms", prop);
      if (rs.status == "200") {
        this.$message({
          message: "重发完成",
          type: "success"
        });
        this.loading = false;
        this.onSearch();
      } else {
        this.$message.error(rs.msg);
        this.loading = false;
      }
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async derived() {
      this.derivedloading = true;
      let rs = await this.$post("staffBusinessLog/derived", this.form);
      if (rs.status == "300") {
        this.findRedisKey(rs.payload);
        // this.$el.querySelector("#exelIframe").src = rs.payload
      } else {
        this.derivedloading = false;
        this.$message.error(rs.msg);
      }
    },
    async findRedisKey(key) {
      let rs = await this.$post("staffBusinessLog/findRedisKey", {
        key: key
      });
      if (rs.status == 200) {
        this.derivedloading = false;
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else if (rs.status == 300) {
        let this_ = this;
        setTimeout(function() {
          this_.findRedisKey(key);
        }, 1500);
      } else {
        this.derivedloading = false;
        this.$message.error(rs.msg);
      }
    },
    async getSettlePrice() {
      let rs = await this.$get("staffBusinessLog/get_settled_price");
      if (rs.status == "200") {
        this.settledPrice = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
    },
    async getAllBusinessType() {
      let rs = await this.$post("staffBusinessLog/get/allBusinessType");
      this.bussinessTypeList = rs.payload;
    },
    async getBusinessList() {
      if (this.form.bussinessType) {
        let rs = await this.$post("staffBusinessLog/get/business/by_type", {
          type: this.form.bussinessType
        });
        this.businessList = rs.payload;
      } else {
        this.businessList = [];
        this.form.businessId = "";
      }
    }
  },
  created() {
    this.getAllBusinessType();
    this.getSettlePrice();
  }
};
</script>

<style scoped>
</style>
