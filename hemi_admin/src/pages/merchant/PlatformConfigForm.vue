<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="平台界面JSON配置" prop="platformConfig">
        <el-input type="textarea" :rows="15" placeholder="请输入平台界面配置(JSON格式)" v-model="form.platformConfig"></el-input>
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
    let form = null;
    form = {
      id: this.merchant.id,
      platformConfig: ""
    };
    return {
      submiting: false,
      form: form,
      rules: {
        platformConfig: [
          { required: true, message: "请输入平台界面配置", trigger: "change" },
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
    async loadMerchant() {
      let rs = await this.$post("merchant/getMerchant", {
        id: this.merchant.id
      });
      if (rs.status == "200") {
        this.form.platformConfig = rs.payload.platformConfig;
      } else {
        this.$message.error(rs.msg);
      }
    },
    async doSubmit() {
      this.submiting = true;
      let rs = await this.$post("merchant/updatePlatformConfig", this.form);
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
    }
  },
  activated() {},
  created() {
    this.loadMerchant();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
