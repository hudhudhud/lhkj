<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="卡券码" prop="couponNumber">
        <el-input v-model="form.couponNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">确定</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
    <div v-for="(item, ind) in obj" :key="'index'+ind">
      <span v-bind:title="message">{{item}}</span>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      obj: {},
      message: "123",
      form: {
        couponNumber: ""
      },
      rules: {
        couponNumber: [
          { required: true, message: "券码", trigger: "change" },
          {
            min: 3,
            max: 40,
            message: "长度在 3 到 40 个字符",
            trigger: "change"
          }
        ]
      },
      loading: false,
      submiting: false
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
      this.form.roleList = this.roleList;
      let rs = await this.$post("coupon/showCouponStockOne", this.form);

      this.obj = rs.payload;

      this.submiting = false;
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
</style>
