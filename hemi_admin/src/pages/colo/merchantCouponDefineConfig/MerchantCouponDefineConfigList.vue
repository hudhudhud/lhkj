<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="oneOfOne">单种券配置单商户</el-button>
      <el-button @click="oneCouponOfMany">单种券配置多商户</el-button>
      <el-button @click="oneMerchantOfMany">单商户配置多种券</el-button>
      <el-button @click="manyOfMany">多商户配置多种券</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/merchantCouponDefineConfig/query" :param="form" @loaded="loading = false"
      show-pager>
      <el-table-column label="ID" width="100" prop="id">
      </el-table-column>
      <el-table-column label="商户" width="180" prop="merchantname">
      </el-table-column>
      <el-table-column label="券定义" width="180" prop="coupondefinename">
      </el-table-column>
      <el-table-column width="90" prop="status" label="状态">
        <template slot-scope="props">
          <el-tag type="danger" v-if="props.row.status=='0'">无效</el-tag>
          <el-tag type="success" v-else-if="props.row.status=='1'">有效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑" v-model="ShowDialog">
      <MerchantCouponDefineConfigForm :config="config" @success="onSearch" @close="ShowDialog=false"></MerchantCouponDefineConfigForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import MerchantCouponDefineConfigForm from "./MerchantCouponDefineConfigForm";
import ManyOfManyForm from "./ManyOfManyForm";
import OneCouponOfManyForm from "./OneCouponOfManyForm";
import OneMerchantOfManyForm from "./OneMerchantOfManyForm";
export default {
  components: {
    MerchantCouponDefineConfigForm,
    ManyOfManyForm,
    OneCouponOfManyForm,
    OneMerchantOfManyForm
  },
  data() {
    return {
      form: {},
      ShowDialog: false,
      loading: false,
      config: null,
      oneCouponOfManyDialog: false,
      oneMerchantOfManyDialog: false,
      manyOfManyDialog: false
    };
  },
  methods: {
    edit(config) {
      this.config = config;
      this.ShowDialog = true;
    },
    // 单对单
    oneOfOne() {
      this.config = null;
      this.ShowDialog = true;
    },
    // 单券多商户
    oneCouponOfMany() {
      this.$router.push({
        path: "/colo/merchantCouponDefineConfig/oneCouponOfManyForm"
      });
    },
    // 单商户多券
    oneMerchantOfMany() {
      this.$router.push({
        path: "/colo/merchantCouponDefineConfig/oneMerchantOfManyForm"
      });
    },
    // 多对多
    manyOfMany() {
      this.$router.push({
        path: "/colo/merchantCouponDefineConfig/manyOfMany"
      });
    },
    onAdd() {},
    onSearch() {
      this.loading = true;
      this.config = null;
      this.$refs.myTable.search();
    }
  },
  activated() {}
};
</script>

<style scoped>
</style>
