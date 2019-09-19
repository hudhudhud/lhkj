<template>
  <LayoutForm>
    <el-form>
      <el-form-item label="状态" prop="status">
        <el-radio v-model="form.status" label='1'>有效</el-radio>
        <el-radio v-model="form.status" label='0'>无效</el-radio>
      </el-form-item>
      <el-form-item label="商户" prop="merchantId">
        <el-select v-model="form.merchantId" placeholder="请选择券定义">
          <el-option v-for="item in merchantList " :key="item.id" :value="item.id" :label="item.merchantName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="券定义">
        <template>
          <el-transfer v-model="form.couponDefineList" filterable target-order="push" :titles="['可选券定义','已选券定义']"
            :props="{key:'id',label:'name'}" :data="couponDefineList"></el-transfer>
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
      merchantList: [],
      couponDefineList: [],
      loading: false,
      form: {
        status: "1",
        couponDefineList: []
      }
    };
  },
  methods: {
    async onSubmit() {
      let rs = await this.$post(
        "colo/merchantCouponDefineConfig/oneMerchantOfManySave",
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
    }
  },
  created() {
    this.getCouponDefineList();
    this.getMerchantList();
  }
};
</script>
<style>
</style>
