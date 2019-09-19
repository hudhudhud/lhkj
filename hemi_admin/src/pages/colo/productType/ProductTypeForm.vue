<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="type" prop="type">
        <el-input v-model="form.type"></el-input>
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
    productType: {
      require: true,
      type: Object
    }
  },
  data() {
    let form = {};
    console.log("productType:", this.productType);
    if (this.productType) {
      form = {
        id: this.productType.id,
        name: this.productType.name,
        type: this.productType.type
      };
    }
    return {
      submiting: false,
      form: form,
      rules: {
        name: [
          { required: true, message: "请输入name", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        type: [
          { required: true, message: "请输入type", trigger: "change" },
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
      let rs = await this.$post("/colo/productType/save", this.form);
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$emit("success", this.form);
        this.close();
      } else {
        this.submiting = false;
        this.$message.error(rs.error);
      }
      this.submiting = false;
    },
    close() {
      this.$emit("close");
    }
  },
  created() {}
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
