<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="活动名称" prop="actName">
        <el-input v-model="form.actName"></el-input>
      </el-form-item>
      <el-form-item label="商户名称" prop="merchantId">

        <el-select v-if="!form.actId" v-model="form.merchantId" filterable clearable placeholder="请选择">
          <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>
        <el-select v-if="form.actId" v-model="form.merchantId" disabled placeholder="请选择">
          <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动开始时间" prop="startTime">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
export default {
  props: {
    activity: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      form: {
        is_open_buy: "0",
        dataProjectStatus: "1",
        actId: "",
        actName: "",
        actType: "7",
        checkLogin: "0",
        fullScreen: "0",
        merchantId: "",
        detail: "",
        startTime: "",
        endTime: "",
        isDeleted: "",
        actIcon: "",
        overTime: "600",
        highestPrice: "",
        lowestPrice: "",
        templateConfig: "",
        actTemplate: "",
        actJoinNum: "",
        maxBuyNum: "",
        valuationType: "",
        maxIntegralNum: "",
        minIntegralNum: "",
        ruleText: "",
        remarks: "",
        nonDefaultTotal: "",
        whiteLimitType: "",
        isFirstOrder: ""
      },
      submiting: false,
      merchantList: [],
      rules: {
        actName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
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
    async loadActivity(actId) {
      this.submiting = true;
      let rs = await this.$post("activity/get_act_one", { actId: actId });
      if (rs.status == "200") {
        this.form.actId = actId;
        this.form.actName = rs.payload.actName;
        this.form.startTime = rs.payload.startTime;
        this.form.endTime = rs.payload.endTime;
        this.form.merchantId = rs.payload.merchantId;
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async loadMerchant() {
      this.submiting = true;
      let rs = await this.$get("merchant/get_merchant_list");
      if (rs.status == "200") {
        rs.payload.forEach(merchant => {
          merchant.checked = !!false;
        });
        this.merchantList = rs.payload;
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async doSubmit() {
      this.submiting = true;
      let rs = await this.$post("activity/save", this.form);
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
    },
    close() {
      this.$router.go(-1);
    }
  },
  created() {
    this.loadMerchant();
    let actId = this.$route.params.actId;
    if (actId) {
      this.loadActivity(actId);
    }
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
