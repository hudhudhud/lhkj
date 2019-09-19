<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="活动id" prop="activityId">
        <el-input type="text" :rows="15" placeholder="" v-model="form.activityId"></el-input>
      </el-form-item>
      <el-form-item label="商户id" prop="merchantId">
        <el-input type="text" :rows="15" placeholder="" v-model="form.merchantId"></el-input>
      </el-form-item>
      <el-form-item label="表单标题" prop="title">
        <el-input type="text" :rows="15" placeholder="" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="表单描述" prop="description">
        <el-input type="text" :rows="15" placeholder="" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="表单描述CSS" prop="description">
        <el-input type="text" :rows="15" placeholder="" v-model="form.descriptionCss"></el-input>
      </el-form-item>
      <el-form-item label="表单CSS" prop="cssStyle">
        <el-input type="textarea" :rows="15" placeholder="" v-model="form.cssStyle"></el-input>
      </el-form-item>
      <el-form-item label="表单头部html" prop="cssStyle">
        <el-input type="textarea" :rows="15" placeholder="" v-model="form.headHtm"></el-input>
      </el-form-item>
      <el-form-item label="表单尾部html" prop="cssStyle">
        <el-input type="textarea" :rows="15" placeholder="" v-model="form.bottomHtm"></el-input>
      </el-form-item>
      <el-form-item label="允许重复提交" prop="canResubmit">
        <el-switch v-model="form.canResubmit"></el-switch>
      </el-form-item>
      <el-form-item label="允许更新数据" prop="canUpdateData">
        <el-switch v-model="form.canUpdateData"></el-switch>
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
  data: function () {
    let form = null;
    form = {
      id: null,
      activityId: null,
      merchantId: null,
      title: "",
      description: "",
      descriptionCss: "",
      headHtm: "",
      bottomHtm: "",
      cssStyle: "",
      canResubmit: true,
      canUpdateData: true
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
        "form/forms",
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
