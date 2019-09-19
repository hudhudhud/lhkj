<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="状态" prop="status">
        <el-radio v-model="form.status" label='1'>有效</el-radio>
        <el-radio v-model="form.status" label='0'>无效</el-radio>
      </el-form-item>
      <el-form-item label="券定义" prop="couponDefineId">
        <el-select v-model="form.couponDefineId" placeholder="请选择券定义">
          <el-option v-for="item in couponDefineList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户" prop="merchantId">
        <el-select v-model="form.merchantId" placeholder="请选择商户">
          <el-option v-for="item in merchantList" :key="item.id" :value="item.id" :label="item.merchantName"></el-option>
        </el-select>
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
    config: {
      require: true,
      type: Object
    }
  },
  data() {
    let form = {};
    if (this.config) {
      form = {
        id: this.config.id,
        couponDefineId: this.config.couponDefineId,
        merchantId: this.config.merchantId,
        status: this.config.status + ""
      };
    } else {
      form = {
        status: "1"
      };
    }
    return {
      submiting: false,
      form: form,
      merchantList: [],
      couponDefineList: [],
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
      let rs = await this.$post(
        "/colo/merchantCouponDefineConfig/save",
        this.form
      );
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$emit("success", this.form);
        this.close();
      } else {
        this.submiting = false;
        this.$message.error("该配置已存在,请勿重复添加");
      }
      this.submiting = false;
    },
    close() {
      this.$emit("close");
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

<style scoped>
.form {
  position: relative;
}
</style>
