<template>
  <LayoutPage>
    <el-button type="primary" @click="onAdd" style="margin: 10px 10px 0;">新增</el-button>
    <ssProductList ref="carTable" type="CAR" :id="id" @edit="onEdit($event)"></ssProductList>
    <el-dialog :visible.sync="isShow" @close="onCancel">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="车辆名称">
          <el-input v-model="form.name" placeholder="请输入车辆名称"></el-input>
        </el-form-item>
        <el-form-item label="车辆价格(万元)">
          <el-input v-model="form.unitPrice" placeholder="请输入车辆价格"></el-input>
        </el-form-item>
        <el-form-item label="上传车辆图片">
          <UploadImages v-model="form.img" action="file/upload" :max="1"></UploadImages>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSave" :loading="isloading">确定</el-button>
      </div>
    </el-dialog>
  </LayoutPage>
</template>
<script>
import ssProductList from "./components/ssProductList";
import UploadImages from "@/components/UploadImages";
export default {
  components: { ssProductList, UploadImages },
  data() {
    return {
      form: {
        id: null,
        name: "",
        unitPrice: "",
        img: [],
        status: false
      },
      isShow: false, // 弹窗开关
      id: null, // 商户ID
      isloading: false
    };
  },
  methods: {
    onAdd() {
      this.form = {
        id: null,
        name: "",
        unitPrice: "",
        img: [],
        status: false
      };
      this.isShow = true;
    },
    onEdit(data) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = data[key];
      });
      this.form.img = [{ url: data.showPicture }];
      this.isShow = true;
    },
    onCancel() {
      this.isShow = false;
    },
    async onSave() {
      if (!this.form.img[0] || !this.form.name || !this.form.unitPrice) {
        this.$message("请完善信息！");
        return false;
      }
      this.isloading = true;
      let data = {
        merchantId: this.id,
        showPicture: this.form.img[0].url,
        name: this.form.name,
        unitPrice: this.form.unitPrice,
        status: this.form.status
      };
      if (this.form.id) {
        data.id = this.form.id;
      }
      let rs = await this.$post("/homeCar/addMerchandise", data);
      if (rs.status == "200") {
        this.$refs.carTable.refresh();
        this.isShow = false;
        this.$message.success(rs.message);
      } else {
        this.$message.error(rs.error);
      }
      this.isloading = false;
    }
  },
  async created() {
    if ("id" in this.$route.query) {
      this.id = this.$route.query.id;
    }
  }
};
</script>
