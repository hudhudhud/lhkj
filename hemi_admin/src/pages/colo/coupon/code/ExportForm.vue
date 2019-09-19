<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="批次ID" prop="batchId">
        <el-select v-model="form.batchId">
          <el-option v-for="item in batchList" :key="item.id" :label="item.remark" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">开始导出</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    code: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      submiting: false,
      form: {},
      batchList: [],
      rules: {
        batchId: [{ required: true, message: "选择券批次", trigger: "change" }]
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
        "colo/couponCode/export/batch_coupon/" + this.form.batchId
      );
      if (rs.status == "200") {
        this.$message({
          message: "开始导出",
          type: "success"
        });
        this.$emit("exportStart", rs.payload);
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
    async getAllBatch() {
      var res = await this.$post("colo/couponBatch/get/list/all");
      console.log("res,", res);
      if (res.status == "200") {
        this.batchList = res.payload;
      } else {
        this.$message.error(res.error);
      }
    }
  },
  created() {
    this.getAllBatch();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
