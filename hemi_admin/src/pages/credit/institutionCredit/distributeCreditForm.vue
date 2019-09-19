<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">

      <el-form-item label=" 积分类型" prop="creditType">
        <el-select v-model="form.creditTypeId" @change="getCreditTypeName" placeholder="请选择">
          <el-option v-for="creditType in creditTypeList" :key="creditType.id" :label="creditType.creditTypeName"
            :value="creditType.creditTypeId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发放数量" prop="changeAmount">
        <el-input type="number" v-model.number="form.changeAmount"></el-input>
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
        changeAmount: "",
        creditType: "",
        creditTypeName: "",
        subsidiaryMechanismId: this.$route.params.subsidiaryMechanismId,
        mechanismId: this.$route.params.mechanismId,
        subsidiaryMechanismName: this.$route.params.subsidiaryMechanismName
      },
      submiting: false,
      creditTypeList: [],
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

    async loadCreditTypeList(mechanismId) {
      let rs = await this.$post(
        "credit/mechanismCreditConf/querySubsidiaryMechanismCreditConf",
        {
          mechanismId: mechanismId
        }
      );
      if (rs.status == "200") {
        console.info("creditTypeList:" + rs.payload);
        this.creditTypeList = rs.payload.creditConfDetailList;
      }
    },
    getCreditTypeName(id) {
      if (id) {
        this.creditTypeList.forEach(item => {
          console.info(item);
          if (item.creditTypeId == id) {
            this.form.creditTypeName = item.creditTypeName;
          }
        });
      }
    },
    async doSubmit() {
      this.submiting = true;
      // 添加保存接口
      let rs = await this.$post(
        "credit/mechanismCreditConf/saveOrUpdate",
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
        this.$message.error(rs.message);
      }
      this.submiting = false;
    },
    // async LoadSubsidiaryMechanismName(subsidiaryMechanismId) {
    //   let rs = await this.$post(
    //     "credit/mechanismCreditConf/querySubsidiaryMechanismCreditConf",
    //     {
    //       mechanismId: subsidiaryMechanismId
    //     }
    //   );
    //   if (rs.status == "200") {
    //     this.form.subsidiaryMechanismName = rs.payload.mechanismName;
    //   }
    // },
    close() {
      this.$router.go(-1);
    }
  },
  created() {
    let mechanismId = this.$route.params.mechanismId;
    // let subsidiaryMechanismId = this.$route.params.subsidiaryMechanismId;
    if (mechanismId) {
      this.loadCreditTypeList(mechanismId);
    }
    // if (subsidiaryMechanismId) {
    //   this.LoadSubsidiaryMechanismName(subsidiaryMechanismId);
    // }
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
