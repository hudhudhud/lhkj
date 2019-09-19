<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="商品名称" prop="proName">
        <el-input v-model="form.proName"></el-input>
      </el-form-item>

      <!-- <el-form-item label="商品类型" prop="proType">
        <el-select v-model="form.proType" placeholder="请选择">
          <el-option v-for="proType in proTypeList" :key="proType.id" :label="proType.type" :value="proType.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="商品排序" prop="proSort">
        <template>
          <el-input-number v-model="form.proSort" :min="1" :max="10"></el-input-number>
        </template>
      </el-form-item>
      <el-form-item label="商品描述 " prop="proDetails ">
        <el-input type="textarea" v-model="form.proDetails "></el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="proDescript ">
        <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.proDescript "></el-input>
      </el-form-item>

      <el-form-item label="商品封面上传 " prop="homeImgList ">
        <UploadImages v-model="homeImgList " action="file/upload "></UploadImages>

      </el-form-item>
      <el-form-item label="商品图标上传 " prop="iconList ">
        <UploadImages v-model="iconList " action="file/upload "></UploadImages>
      </el-form-item>
      <!-- <el-form-item label="状态 ">
        <el-radio v-model="form.isDeleted " label="0 " border>正常</el-radio>
        <el-radio v-model="form.isDeleted " label="1 " border>禁用</el-radio>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
        <el-button @click="close " v-if="!submiting ">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
import UploadImages from "@/components/UploadImages";

export default {
  components: {
    UploadImages
  },

  // props: {
  //   product: {
  //     require: true,
  //     type: Object
  //   }

  data() {
    return {
      oldForm: null,
      form: {
        actId: this.$route.params.actId,
        proId: this.$route.params.proId,
        proName: "",
        // proType: "",
        proSort: "1",
        proDetails: "",
        proDescript: "",
        isDeleted: "0",
        proHomeImgUrl: "",
        proIconUrl: ""
        // baseProId: ""
      },
      homeImgList: [],
      iconList: [],
      submiting: false,

      // baseProList: [],

      // proTypeList: [
      //   {
      //     id: "1",
      //     type: "充值"
      //   },
      //   {
      //     id: "2",
      //     type: "卡密"
      //   }, {
      //     id: "3",
      //     type: "资产"
      //   },
      //   {
      //     id: "4",
      //     type: "实物"
      //   }
      // ],
      rules: {
        proName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        proType: [
          { required: true, message: "请选择商品类型", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    validForm() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          const passed = await this.$checkMail({
            proId: this.form.proId,
            actId: this.form.actId,
            sendType: this.form.proId ? "productConfig" : "addProduct",
            proName: this.form.proName,
            oldForm: this.oldForm,
            newForm: this.form
          });
          if (passed) {
            this.doSubmit();
          }
        } else {
          return false;
        }
      });
    },

    async loadProduct(proId) {
      this.submiting = true;
      let rs = await this.$post("product/get_product_one", { proId: proId });
      if (rs.status == "200") {
        this.form.proName = rs.payload.proName;
        // this.form.proType = rs.payload.proType
        this.form.proSort = rs.payload.proSort;
        // this.form.baseProId = rs.payload.baseProId
        this.form.proDetails = rs.payload.proDetails;
        this.form.proDescript = rs.payload.proDescript;
        this.homeImgList = [{ url: rs.payload.proHomeImgUrl }];
        this.iconList = [{ url: rs.payload.proIconUrl }];
        this.form.actId = rs.payload.actId;
        this.oldForm = JSON.parse(JSON.stringify(this.form));
      }
      this.submiting = false;
    },

    async doSubmit() {
      this.submiting = true;
      if (this.homeImgList != "") {
        if (this.homeImgList[0].url) {
          this.form.proHomeImgUrl = this.homeImgList[0].url;
        }
      }
      if (this.iconList != "") {
        if (this.iconList[0].url) {
          this.form.proIconUrl = this.iconList[0].url;
        }
      }

      let rs = await this.$post("product/save_product", this.form);

      if (rs.status == "200") {
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
    let proId = this.$route.params.proId;
    if (proId) {
      this.loadProduct(proId);
    } else {
      this.oldForm = JSON.parse(JSON.stringify(this.form));
    }
    // this.loadBasePro()
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
