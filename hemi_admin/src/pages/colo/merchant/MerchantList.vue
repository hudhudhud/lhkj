<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-select v-model="form.provinceCode" placeholder="请选择省" clearable @change="getCity">
          <el-option v-for="item in provinceList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.cityCode" placeholder="请选择市" clearable @change="getDistrict">
          <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.districtCode" placeholder="请选择区" clearable>
          <el-option v-for="item in districtList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/merchant/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="100" prop="id">
      </el-table-column>
      <el-table-column label="商户" width="180" prop="merchantName">
      </el-table-column>
      <el-table-column label="注册手机号" width="180" prop="registerMobile">
      </el-table-column>
      <el-table-column label="联系人" width="120" prop="contact">
      </el-table-column>
      <el-table-column label="经度" width="120" prop="longitude">
      </el-table-column>
      <el-table-column label="纬度" width="120" prop="latitude">
      </el-table-column>
      <el-table-column label="地址描述" width="120" prop="address">
      </el-table-column>
      <el-table-column label="省" width="120" prop="province">
      </el-table-column>
      <el-table-column label="市" width="120" prop="city">
      </el-table-column>
      <el-table-column label="区" width="120" prop="district">
      </el-table-column>
      <el-table-column label="区域id" width="120" prop="areaId">
      </el-table-column>
      <el-table-column width="90" prop="status" label="状态">
        <template slot-scope="props">
          <el-tag type="info" v-if="props.row.status=='0'">无效</el-tag>
          <el-tag type="success" v-else-if="props.row.status=='1'">有效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
          <!-- <el-button @click="del(props.row)" :loading="props.row.loading">删除</el-button> -->
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑商户" v-model="ShowDialog">
      <MerchantForm :merchant="merchant" @success="onSearch" @close="ShowDialog=false"></MerchantForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import MerchantForm from "./MerchantForm";
export default {
  components: { MerchantForm },
  data() {
    return {
      form: {},
      ShowDialog: false,
      loading: false,
      merchant: null,
      districtList: [],
      cityList: [],
      provinceList: []
    };
  },
  methods: {
    edit(merchant) {
      this.merchant = merchant;
      this.ShowDialog = true;
    },
    onAdd() {
      this.merchant = null;
      this.ShowDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.merchant = null;
      this.$refs.myTable.search();
    },
    async getProvince() {
      let rs = await this.$post("/colo/cityArea/get/list/province");
      if (rs.status == "200") {
        this.provinceList = rs.payload;
      }
    },
    async getCity(id) {
      if (id) {
        let rs = await this.$post("/colo/cityArea/get/list/by_pid/" + id);
        if (rs.status == "200") {
          this.cityList = rs.payload;
        }
      }
    },
    async getDistrict(id) {
      if (id) {
        let rs = await this.$post("/colo/cityArea/get/list/by_pid/" + id);
        if (rs.status == "200") {
          this.districtList = rs.payload;
        }
      }
    }
  },
  created() {
    this.getProvince();
  }
};
</script>

<style scoped>
</style>
