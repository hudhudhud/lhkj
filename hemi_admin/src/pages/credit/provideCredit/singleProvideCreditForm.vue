<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="活动" prop="actId">
        <el-select v-model="form.actId" @change="getPro" placeholder="请选择">
          <el-option v-for="act in activityList" :key="act.id" :label="act.actName" :value="act.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" prop="proStandardId">
        <el-select v-model="form.proStandardId" placeholder="请选择">
          <el-option v-for="pro in proList" :key="pro.id" :label="pro.standardName" :value="pro.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户申请书编号" prop="customNo">
        <el-input v-model="form.customNo"></el-input>
      </el-form-item>
      <el-form-item label="客户手机号码" prop="tel">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">发放</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
export default {
  data() {
    return {
      form: {
        actId: "",
        phone: "",
        proStandardId: "",
        customNo: ""
      },
      submiting: false,
      proList: [],
      activityList: [],
      rules: {}
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

    async loadAct(actType) {
      let rs = await this.$get("activity/get_act/" + actType);
      if (rs.status == "200") {
        rs.payload.forEach(act => {
          act.checked = !!false;
        });
        this.activityList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
    },

    async getPro(actId) {
      let rs = await this.$get("activity/get_pro_list/" + actId);
      if (rs.status == "200") {
        console.info("=====rs.payload:" + rs.payload);
        rs.payload.forEach(act => {
          act.checked = !!false;
        });
        let list = rs.payload;
        this.proList = list[0].standardList;
        console.info("this.proList:" + this.proList);
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },

    close() {
      this.$router.go(-1);
    },

    async doSubmit() {
      this.submiting = true;
      // 添加保存接口
      let rs = await this.$post(
        "credit/mechanismCreditConf/outGivingCreditToConsumer",
        this.form
      );

      if (rs.status == "200") {
        console.info("rs===" + rs.message);
        this.$message({
          message: rs.message,
          type: "success"
        });
        this.$emit("success", this.form);
        this.$router.go(-1);
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    }
  },
  created() {
    let actType = "8";
    this.loadAct(actType);
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
