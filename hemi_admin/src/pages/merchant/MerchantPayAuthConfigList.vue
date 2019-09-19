<template>
  <LayoutPage>
    <LayoutTable ref="myTable" url="merchant/getMerchantPayTypeConfig" :param="form" @loaded="getPayList">
      <!-- <el-table-column prop="authType" label="authType" width="100">
      </el-table-column> -->
      <el-table-column prop="name" label="名称" width="150">
      </el-table-column>
      <el-table-column prop="authStatus" label="配置" width="120">
        <template slot-scope="props">
          <el-button @click="delCofig(props.row)" v-if="!!(props.row.authStatus)">已启用</el-button>
          <el-tag type="danger" v-model="props.row.authStatus" v-else>未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="500">
        <template slot-scope="props">
          <el-select v-model="props.row.configId" @change="props.row.saveButtonStatus=true" placeholder="请选择默认支付模版">
            <template v-if="props.row.authType=='2'">
              <el-option v-for="item in wxList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='3'">
              <el-option v-for="item in bocList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='4'">
              <el-option v-for="item in icbcList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='5'">
              <el-option v-for="item in ccbList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='6'">
              <el-option v-for="item in icbceList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='7'">
              <el-option v-for="item in ccbCreditList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='8'">
              <el-option v-for="item in ccbWgCreditList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='9'">
              <el-option v-for="item in ccbWgList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='12'">
              <el-option v-for="item in aliPayList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
          </el-select>
          <el-select v-model="props.row.extendConfigId"  v-if="props.row.configId" @change="props.row.saveButtonStatus=true" multiple placeholder="请选择备用支付模版">
            <template v-if="props.row.authType=='2'">
              <el-option v-for="item in wxList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='3'">
              <el-option v-for="item in bocList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='4'">
              <el-option v-for="item in icbcList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='5'">
              <el-option v-for="item in ccbList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='6'">
              <el-option v-for="item in icbceList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='7'">
              <el-option v-for="item in ccbCreditList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='8'">
              <el-option v-for="item in ccbWgCreditList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='9'">
              <el-option v-for="item in ccbWgList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='12'">
              <el-option v-for="item in aliPayList" :key="item.id" :label="item.configName" :value="item.id"></el-option>
            </template>
          </el-select>
          <el-button v-if="props.row.saveButtonStatus" @click="savePayConfig(props.row)" :loading="statusLoading">保存</el-button>
          <!-- <el-button @click="dispose(props.row)" v-model="props.row.authStatus" :loading="props.row.statusLoading">{{props.row.authStatus?"修改配置":"配置参数"}}</el-button> -->
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      statusLoading: false,
      form: { id: this.$route.params.id },
      wxList: [],
      bocList: [],
      icbcList: [],
      ccbList: [],
      icbceList: [],
      ccbCreditList: [],
      ccbWgCreditList: [],
      ccbWgList: [],
      aliPayList: []
    };
  },
  methods: {
    async delCofig(prop) {
      this.$confirm(
        "此操作将导致该商户无法使用" + prop.name + ",是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.delCofigImpl(prop);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作"
          });
        });
    },
    async delCofigImpl(prop) {
      let rs = await this.$post(
        "/merchant/delMerchantPayConfigConnectionByPayType",
        { merchantId: this.form.id, payType: prop.authType }
      );
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "关闭成功"
        });
      } else {
        this.$message({
          type: "error",
          message: "关闭失败," + rs.error
        });
      }
      this.onSearch();
    },
    async savePayConfig(merchant) {
      this.statusLoading = true;
      var rs = await this.$post("merchant/savePayConfigConnection", {
        id: merchant.id,
        merchantId: this.$route.params.id,
        payType: Number(merchant.authType),
        configId: merchant.configId,
        extendConfigId: JSON.stringify(merchant.extendConfigId)
      });
      this.onSearch();
      if (rs.status == "200") {
        this.onSearch();
        this.$message({
          type: "success",
          message: "保存成功"
        });
      } else {
        this.$message({
          type: "error",
          message: rs.msg
        });
      }
      this.statusLoading = false;
    },
    getPayList(list, rs) {
      this.loading = false;
      let payList = rs.payload.list;
      payList.forEach(element => {
        this.getAuthListByType(Number(element.authType));
      });
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async getAuthListByType(type) {
      let rs = await this.$post("payConfig/query", { payType: type });
      if (rs.status == "200") {
        if (type == 2) {
          this.wxList = rs.payload.list;
        } else if (type == 3) {
          this.bocList = rs.payload.list;
        } else if (type == 4) {
          this.icbcList = rs.payload.list;
        } else if (type == 5) {
          this.ccbList = rs.payload.list;
        } else if (type == 6) {
          this.icbceList = rs.payload.list;
        } else if (type == 7) {
          // 建行信用卡
          this.ccbCreditList = rs.payload.list;
        } else if (type == 8) {
          this.ccbWgCreditList = rs.payload.list;
        } else if (type == 9) {
          this.ccbWgList = rs.payload.list;
        } else if (type == 12) {
          this.aliPayList = rs.payload.list;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
