<template>
  <LayoutPage>
    <el-button type="primary" @click="onAdd" style="margin: 10px 10px 0;">新增</el-button>
    <ssProductList ref="JCTable" type="JC" :id="id" @edit="onEdit($event)"></ssProductList>
    <el-dialog :visible.sync="isShow" @close="onCancel">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="选择类型">
          <el-select v-model="form.storeId" :filterable="true" clearable placeholder="请选择" style="width: 100%;">
            <el-option v-for="opt in opts" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" :autosize="true" v-model="form.cooperateName"></el-input>
        </el-form-item>
        <el-form-item label="上传商品图片">
          <UploadImages v-model="form.img" action="file/upload" :max="1"></UploadImages>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
        storeId: "",
        name: "",
        unitPrice: "",
        img: [],
        status: false,
        cooperateName: ""
      },
      isShow: false, // 弹窗开关
      id: null,
      isloading: false,
      opts: []
    };
  },
  methods: {
    onAdd() {
      this.form = {
        id: null,
        storeId: "",
        name: "",
        unitPrice: "",
        img: [],
        status: false,
        cooperateName: ""
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
      console.log(this.form)
      if (
        !this.form.img[0] ||
        !this.form.name ||
        !this.form.unitPrice ||
        !this.form.cooperateName ||
        !this.form.storeId
      ) {
        this.$message("请完善信息！");
        return false;
      }
      this.isloading = true;
      let data = {
        merchantId: this.id,
        storeId: this.form.storeId,
        showPicture: this.form.img[0].url,
        name: this.form.name,
        unitPrice: this.form.unitPrice,
        status: this.form.status,
        cooperateName: this.form.cooperateName
      };
      if (this.form.id) {
        data.id = this.form.id;
      }
      let rs = await this.$post("/homeCar/saveUpdateMerchantdise", data);
      if (rs.status == "200") {
        this.$refs.JCTable.refresh();
        this.isShow = false;
        this.$message.success(rs.message);
      } else {
        this.$message.error(rs.error);
      }
      this.isloading = false;
    }
  },
  created() {
    if ("id" in this.$route.query) {
      this.id = this.$route.query.id;
      this.$post("/homeCar/groupByMerchantId", { merchantId: this.id }).then(
        rs => {
          if (rs.status == 200) {
            this.opts = [];
            Object.keys(rs.payload).forEach(key => {
              this.opts.push({ label: rs.payload[key], value: +key });
            });
          } else {
            this.$message.error(rs.error);
          }
        }
      );
    }
  }
};
</script>
