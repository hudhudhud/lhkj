<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="产品名" prop="typeName">
        <el-input v-model="form.typeName"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择产品">
          <el-option v-for="item in typeList" :key="item.type" :value="item.type" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传产品图片" prop="imageList">
        <UploadImages v-model="imageList" action="file/upload" :max="1"></UploadImages>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UploadImages from "@/components/UploadImages";
export default {
  components: {
    UploadImages
  },
  props: {
    product: {
      require: true,
      type: Object
    }
  },
  data() {
    let form = {};
    let imageList = [];
    if (this.product) {
      form = {
        id: this.product.id,
        productImage: this.product.productImage,
        typeName: this.product.typeName,
        type: this.product.type
      };
      if (this.product.productImage) {
        imageList.push({ url: this.product.productImage });
      }
    }
    return {
      submiting: false,
      form: form,
      typeList: [],
      imageList: imageList,
      rules: {
        typeName: [
          { required: true, message: "请输入产品名", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }]
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
      if (this.imageList.length > 0) {
        this.form.productImage = this.imageList[0].url;
      }
      let rs = await this.$post("colo/product/save", this.form);
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
    async getProductTypeList() {
      let rs = await this.$get("/colo/productType/get/list");
      this.typeList = rs.payload;
    }
  },
  created() {
    this.getProductTypeList();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
