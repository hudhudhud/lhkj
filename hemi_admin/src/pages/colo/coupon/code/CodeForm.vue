<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="批次ID" prop="batchId">
        <el-select v-model="form.batchId">
          <el-option v-for="item in batchList" :key="item.id" :label="item.remark" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">生成券码</el-button>
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
      batchList: [],
      submiting: false,
      form: {},
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
        "colo/couponCode/generateCode/" + this.form.batchId
      );
      if (rs.status == "200") {
        this.$message({
          message: "开始生成",
          type: "success"
        });
        this.$emit("generateStart", rs.payload);
        this.close();
      } else {
        this.submiting = false;
        this.$message.error(rs.error);
      }
      this.submiting = false;
    },
    close() {
      this.$emit("close");
    },
    async getBatchList() {
      var res = await this.$post("colo/couponBatch/get/list/unused");
      console.log("res,", res);
      if (res.status == "200") {
        this.batchList = res.payload;
      } else {
        this.$message.error(res.error);
      }
    }
  },
  activated() {},
  created() {
    this.getBatchList();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
