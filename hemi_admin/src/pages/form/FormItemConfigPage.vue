<template>
  <div class="form">
    <el-form :rules="rules" ref="form" label-width="100px">
      <el-form-item label="项类型" prop="formItemType">
        <el-input type="text" :rows="15" placeholder="" v-model="itemForm.formItemType"></el-input>
      </el-form-item>
      <el-form-item label="dataKey" prop="dataKey">
        <el-input type="text" :rows="15" placeholder="" v-model="itemForm.dataKey"></el-input>
      </el-form-item>
      <el-form-item label="label" prop="label">
        <el-input type="text" :rows="15" placeholder="" v-model="itemForm.label"></el-input>
      </el-form-item>
      <el-form-item label="资源key" prop="resourceKey">
        <el-input type="text" :rows="15" placeholder="" v-model="itemForm.resourceKey"></el-input>
      </el-form-item>
      <el-form-item label="额外资源链接" prop="extraResourceUrl">
        <el-input type="text" :rows="15" placeholder="" v-model="itemForm.extraResourceUrl"></el-input>
      </el-form-item>
      <el-form-item label="表单项CSS" prop="cssStyle">
        <el-input type="textarea" :rows="15" placeholder="" v-model="itemForm.cssStyle"></el-input>
      </el-form-item>
      <el-form-item label="正则验证" prop="verifyRegex">
        <el-input type="textarea" :rows="15" placeholder="" v-model="itemForm.verifyRegex"></el-input>
      </el-form-item>
      <el-form-item label="必要" prop="necessary">
        <el-switch v-model="itemForm.necessary"></el-switch>
      </el-form-item>
      <el-form-item label="隐藏" prop="hidden">
        <el-switch v-model="itemForm.hidden"></el-switch>
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
  props: ["itemForm"],
  data: function () {
    let form = null;
    form = {
      id: null,
      formId: null,
      formItemType: null,
      label: "",
      dataKey: "",
      resourceKey: "",
      extraResourceUrl: null,
      cssStyle: "",
      hidden: false,
      necessary: true,
      options: null,
      verifyRegex: null
    };
    return {
      submiting: false,
      form: form,
      rules: {
        formConfig: [
          {required: true, message: "请输入表单配置", trigger: "change"},
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
        "form/XXX",
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
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    close() {
      this.$emit("close");
    }
  },
  activated() {
  }
};
</script>

<style scoped>
  .form {
    position: relative;
  }
</style>
