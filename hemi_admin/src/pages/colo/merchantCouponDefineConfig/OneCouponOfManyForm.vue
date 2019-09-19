<template>
  <LayoutForm>
    <el-form>
      <el-form-item label="商户所属省">
        <el-select v-model="terms.provinces" multiple placeholder="请选择" @change="getCityList">
          <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户所属市">
        <el-select v-model="terms.citys" multiple placeholder="请选择" @change="getDistrictList">
          <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户所属区">
        <el-select v-model="terms.districts" multiple placeholder="请选择" @change="setDistrictIds">
          <el-option v-for="item in districtList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="screening" :loading="loading">点击筛选</el-button>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="状态" prop="status">
        <el-radio v-model="form.status" label='1'>有效</el-radio>
        <el-radio v-model="form.status" label='0'>无效</el-radio>
      </el-form-item>
      <el-form-item label="券定义" prop="couponDefineId">
        <el-select v-model="form.couponDefineId" placeholder="请选择券定义">
          <el-option v-for="item in couponDefineList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户">
        <template>
          <el-transfer v-model="form.merchantList" filterable target-order="push" :titles="['可选商户','已选商户']" :props="{key:'id',label:'merchantName'}"
            :data="merchantList"></el-transfer>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>
<script>
export default {
  data() {
    return {
      terms: {},
      merchantList: [],
      couponDefineList: [],
      loading: false,
      districtList: [],
      cityList: [],
      provinceList: [],
      form: {
        status: "1",
        merchantList: []
      }
    };
  },
  methods: {
    async screening() {
      console.log(this.terms);
    },
    async onSubmit() {
      let rs = await this.$post(
        "colo/merchantCouponDefineConfig/oneCouponOfManySave",
        this.form
      );
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.back();
      } else {
        this.$message.error(rs.message);
      }
    },
    back() {
      this.$router.go(-1);
    },
    async getCouponDefineList() {
      var rs = await this.$post("/colo/couponDefine/get/list");
      if (rs.status == "200") {
        this.couponDefineList = rs.payload;
      }
    },
    async getMerchantList() {
      var rs = await this.$post("/colo/merchant/get/list");
      if (rs.status == "200") {
        this.merchantList = rs.payload;
      }
    },
    async getProvinceList() {
      let rs = await this.$post("/colo/cityArea/get/list/province");
      if (rs.status == "200") {
        this.provinceList = rs.payload;
      }
    },
    async getCityList() {
      let provinceIds = "";
      this.terms.provinces.forEach(element => {
        if (provinceIds) {
          provinceIds += "," + element;
        } else {
          provinceIds += element;
        }
      });
      this.terms.provinceIds = provinceIds;
      if (provinceIds) {
        let rs = await this.$post(
          "/colo/cityArea/get/list/city/by_pids",
          this.terms
        );
        if (rs.status == "200") {
          this.cityList = rs.payload;
        }
      } else {
        this.cityList = [];
        this.districtList = [];
        this.terms.cityIds = "";
        this.terms.districtIds = "";
      }
    },
    async getDistrictList() {
      let cityIds = "";
      this.terms.citys.forEach(element => {
        if (cityIds) {
          cityIds += "," + element;
        } else {
          cityIds += element;
        }
      });
      this.terms.cityIds = cityIds;
      if (cityIds) {
        let rs = await this.$post(
          "/colo/cityArea/get/list/district/by_pids",
          this.terms
        );
        if (rs.status == "200") {
          this.districtList = rs.payload;
        }
      } else {
        this.terms.districtIds = "";
        this.districtList = [];
      }
    },
    setDistrictIds() {
      let districtIds = "";
      this.terms.districts.forEach(element => {
        if (districtIds) {
          districtIds += "," + element;
        } else {
          districtIds += element;
        }
      });
      this.terms.districtIds = districtIds;
    }
  },
  created() {
    this.getProvinceList();
    this.getCouponDefineList();
    this.getMerchantList();
  }
};
</script>
<style>
</style>
