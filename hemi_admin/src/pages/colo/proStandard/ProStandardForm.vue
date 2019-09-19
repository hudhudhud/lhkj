<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="产品" prop="productId">
        <el-select v-model="form.productId" placeholder="请选择产品">
          <el-option v-for="item in productList" :key="item.id" :value="item.id" :label="item.typeName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格名" prop="prostandardName">
        <el-input v-model="form.prostandardName"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="valuedPrice">
        <el-input v-model="form.valuedPrice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UploadFileButton from "@/components/UploadFileButton";
export default {
  components: {
    UploadFileButton
  },
  props: {
    ProStandard: {
      require: true,
      type: Object
    }
  },
  data() {
    let form = {};
    if (this.ProStandard) {
      form = {
        id: this.ProStandard.id,
        prostandardName: this.ProStandard.prostandardName,
        valuedPrice: this.ProStandard.valuedPrice,
        productId: this.ProStandard.productId
      };
    }
    return {
      submiting: false,
      form: form,
      productList: [],
      rules: {
        ip: [
          { required: true, message: "请输入IP", trigger: "change" },
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
      let rs = await this.$post("/colo/proStandard/save", this.form);
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
    },
    async getProStandardList() {
      var rs = await this.$post("/colo/product/get/list");
      if (rs.status == "200") {
        this.productList = rs.payload;
      }
    }
  },
  created() {
    this.getProStandardList();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
