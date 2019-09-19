<template>
  <LayoutPage>
    <LayoutSearch>
      <el-select v-model="form.payType" placeholder="请选择">
        <el-option v-for="pay in payList" :key="pay.authType" :value="pay.authType" :label="pay.name"></el-option>
      </el-select>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-button v-for="pay in payList" :key="pay.authType" :value="pay.authType" @click="onAdd(pay.authType)" v-if="form.payType==pay.authType">新增{{pay.name}}模版</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="payConfig/query" :param="form" @loaded="loading=false">
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="configName" label="模版名" width="200">
      </el-table-column>
      <el-table-column label="操作" min-width="500">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button>
          <el-button v-if="form.payType=='5'" @click="editPlatform(props.row)">建行外联平台配置</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      payList: [],
      form: {
        payType: "2"
      },
      loading: false
    };
  },
  methods: {
    editPlatform(payConfig) {
      console.log(payConfig.bankMerchantId);
      if (payConfig.bankMerchantId) {
        this.$router.push({
          path: "payConfig/editCCBPlatformConfig/" + payConfig.bankMerchantId
        });
      } else {
        this.$router.push({ path: "payConfig/addCCBPlatformConfig" });
      }
    },
    async getPayList() {
      var rs = await this.$post("payConfig/getPayTypeList");
      this.payList = rs.payload.list;
    },
    onAdd(payType) {
      if (payType == "2") {
        // 微信
        this.$router.push({ path: "payConfig/addWXPayConfig" });
      } else if (payType == "3") {
        // 中行
        this.$router.push({ path: "payConfig/addBOCConfigForm" });
      } else if (payType == "4") {
        // 工行
        this.$router.push({ path: "payConfig/addICBCConfigForm" });
      } else if (payType == "5") {
        // 建行
        this.$router.push({ path: "payConfig/addCCBConfigForm/0" });
      } else if (payType == "6") {
        // 工行融E联
        this.$router.push({ path: "payConfig/addICBCEConfigForm" });
      } else if (payType == "7") {
        // 建行信用卡
        this.$router.push({ path: "payConfig/addCCBConfigForm/1" });
      } else if (payType == "8") {
        // 建行网关信用卡
        this.$router.push({ path: "payConfig/addCCBConfigForm/2" });
      } else if (payType == "9") {
        // 建行网关储蓄卡
        this.$router.push({ path: "payConfig/addCCBConfigForm/3" });
      } else {
        this.$message.error("暂无该模版类型");
      }
    },
    edit(payConfig) {
      if (this.form.payType == "2") {
        // 微信
        this.$router.push({
          path: "payConfig/editWXPayConfig/" + payConfig.id
        });
      } else if (this.form.payType == "3") {
        // 中行
        this.$router.push({
          path: "payConfig/editBOCConfigForm/" + payConfig.id
        });
      } else if (this.form.payType == "4") {
        // 工行
        this.$router.push({
          path: "payConfig/editICBCConfigForm/" + payConfig.id
        });
      } else if (this.form.payType == "5") {
        // 建行
        this.$router.push({
          path: "payConfig/editCCBConfigForm/" + payConfig.id + "/0"
        });
      } else if (this.form.payType == "6") {
        // 工行融E联
        this.$router.push({
          path: "payConfig/editICBCEConfigForm/" + payConfig.id
        });
      } else if (this.form.payType == "7") {
        // 建行信用卡
        this.$router.push({
          path: "payConfig/editCCBConfigForm/" + payConfig.id + "/1"
        });
      } else if (this.form.payType == "8") {
        // 建行网关信用卡
        this.$router.push({
          path: "payConfig/editCCBConfigForm/" + payConfig.id + "/2"
        });
      } else if (this.form.payType == "9") {
        // 建行网关信用卡
        this.$router.push({
          path: "payConfig/editCCBConfigForm/" + payConfig.id + "/3"
        });
      } else {
        this.$message.error("暂无该模版类型");
      }
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    }
  },
  created() {
    this.getPayList();
  }
};
</script>

<style scoped>
</style>
