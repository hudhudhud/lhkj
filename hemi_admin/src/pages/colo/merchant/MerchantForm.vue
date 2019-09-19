<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="商户名" prop="merchantName">
        <el-input v-model="form.merchantName"></el-input>
      </el-form-item>
      <el-form-item label="注册手机号" prop="registerMobile">
        <el-input v-model="form.registerMobile"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="form.longitude"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="地址描述" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="区域ID" prop="areaId">
        <el-input v-model="form.areaId"></el-input>
      </el-form-item>
      <el-form-item label="省" prop="provinceCode">
        <el-select v-model="form.provinceCode" @change="setProvince">
          <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市" prop="cityCode">
        <el-select v-model="form.cityCode" @change="setCity">
          <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区" prop="districtCode">
        <el-select v-model="form.districtCode" @change="setDistrict">
          <el-option v-for="item in districtList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio v-model="form.status" :label="0">无效</el-radio>
        <el-radio v-model="form.status" :label="1">有效</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    merchant: {
      require: true,
      type: Object
    }
  },
  data() {
    let form = {};
    if (this.merchant) {
      form = {
        id: this.merchant.id,
        merchantName: this.merchant.merchantName,
        registerMobile: this.merchant.registerMobile,
        contact: this.merchant.contact,
        longitude: this.merchant.longitude,
        latitude: this.merchant.latitude,
        address: this.merchant.address,
        areaId: this.merchant.areaId,
        status: this.merchant.status,
        province: this.merchant.province,
        provinceCode: this.merchant.provinceCode,
        city: this.merchant.city,
        cityCode: this.merchant.cityCode,
        district: this.merchant.district,
        districtCode: this.merchant.districtCode
      };
    }
    return {
      submiting: false,
      form: form,
      provinceList: [],
      cityList: [],
      districtList: [],
      rules: {
        ip: [
          { required: true, message: "请输入IP", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    validForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit();
        } else {
          return false;
        }
      });
    },
    async doSubmit() {
      this.submiting = true;
      let rs = await this.$post("colo/merchant/save", this.form);
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$emit("success", this.form);
        this.close();
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    close() {
      this.$emit("close");
    },
    async getProvince() {
      let rs = await this.$post("/colo/cityArea/get/list/province");
      if (rs.status == "200") {
        this.provinceList = rs.payload;
      }
    },
    async setProvince(id) {
      this.provinceList.forEach(element => {
        if (element.id == id) {
          this.form.province = element.name;
        }
      });
      let rs = await this.$post("/colo/cityArea/get/list/by_pid/" + id);
      if (rs.status == "200") {
        this.cityList = rs.payload;
      }
    },
    async setCity(id) {
      this.cityList.forEach(element => {
        if (element.id == id) {
          this.form.city = element.name;
        }
      });
      let rs = await this.$post("/colo/cityArea/get/list/by_pid/" + id);
      if (rs.status == "200") {
        this.districtList = rs.payload;
      }
    },
    async setDistrict(id) {
      this.districtList.forEach(element => {
        if (element.id == id) {
          this.form.district = element.name;
        }
      });
    }
  },
  created() {
    this.getProvince();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
