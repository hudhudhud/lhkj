<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="券类型" prop="couponType">
        <el-radio v-model="form.couponType" :label="1">代金券</el-radio>
        <el-radio v-model="form.couponType" :label="2">折扣券</el-radio>
        <el-radio v-model="form.couponType" :label="3">抵扣券</el-radio>
      </el-form-item>
      <el-form-item label="定义名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品" prop="productId">
        <el-select v-model="form.productId" @change="getProStandard" placeholder="请选择">
          <el-option v-for="item in productList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="prostandardId">
        <el-select v-model="form.prostandardId" @change="setProstandardName" placeholder="请选择">
          <el-option v-for="item in proStandardList" :key="item.id" :label="item.prostandardName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置区域mark" prop="configAreaMark">
        <el-input v-model="form.configAreaMark"></el-input>
      </el-form-item>
      <el-form-item label="代金券面值" v-if="form.couponType=='1'" prop="cashCouponValue">
        <el-input v-model="form.cashCouponValue"></el-input>
      </el-form-item>
      <el-form-item label="折扣券折扣" v-if="form.couponType=='2'" prop="discount">
        <el-input v-model="form.discount"></el-input>
      </el-form-item>
      <el-form-item label="默认成本" prop="defaultCost">
        <el-input v-model="form.defaultCost"></el-input>
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
    define: {
      require: true,
      type: Object
    }
  },
  data() {
    let form = {};
    if (this.define) {
      form = {
        id: this.define.id,
        name: this.define.name,
        productId: this.define.productId,
        productName: this.define.productName,
        prostandardId: this.define.prostandardId,
        prostandardName: this.define.prostandardId,
        configAreaMark: this.define.configAreaMark,
        cashCouponValue: this.define.cashCouponValue,
        discount: this.define.discount,
        defaultCost: this.define.defaultCost,
        couponType: this.define.couponType
      };
    }
    return {
      submiting: false,
      form: form,
      productList: [],
      proStandardList: [],
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
      let rs = await this.$post("colo/couponDefine/save", this.form);
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
    async getProduct() {
      let rs = await this.$post("colo/product/get/list");
      if (rs.status == "200") {
        this.productList = rs.payload;
      }
      if (this.define) {
        this.getProStandard(this.define.prostandardId);
      }
    },
    async getProStandard(e) {
      this.productList.forEach(element => {
        if (element.id == e) {
          this.form.typeName = element.typeName;
        }
      });
      this.proStandardList = [];
      let rs = await this.$post("colo/proStandard/get/by_productid/" + e);
      if (rs.status == "200") {
        this.proStandardList = rs.payload;
      }
    },
    async setProstandardName(e) {
      this.proStandardList.forEach(element => {
        if (element.id == e) {
          this.form.prostandardName = element.prostandardName;
        }
      });
    }
  },
  created() {
    this.getProduct();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
