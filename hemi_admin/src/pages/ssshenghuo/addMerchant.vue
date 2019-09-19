<template>
  <LayoutPage class='content'>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="origin.nameLabel">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="LOGO">
        <UploadImages v-model="logoImgs" action="file/upload" :max='1'></UploadImages>
      </el-form-item>
      <el-form-item label="门头照片">
        <UploadImages v-model="doorImgs" action="file/upload" :max='1'></UploadImages>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.synopsis" :rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </LayoutPage>
</template>
<script>
import UploadImages from "@/components/UploadImages";
export default {
  components: {
    UploadImages
  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        phone: "",
        synopsis: "",
        logoUrl: "",
        showPicture: "",
        type: "", // 固定传参
        status: false,
        popular: false
      },
      logoImgs: [],
      doorImgs: [],
      config: {
        add: {
          mer: {
            title: "新增4s店",
            type: "VEHICL_SHOWALL",
            nameLabel: "4s店名称",
            postUrl: "/homeCar/add/merchant"
          },
          jjjd: {
            title: "新增家居家电门店",
            type: "ENTERPRISE_APPLIANCES",
            nameLabel: "门店名称",
            postUrl: "/homeCar/add/merchant"
          },
          zxsj: {
            title: "新增装修设计门店",
            type: "ENTERPRISE_DECORATE",
            nameLabel: "门店名称",
            postUrl: "/homeCar/add/merchant"
          },
          jc: {
            title: "新增建材门店",
            type: "BUILDING_MATERIAL",
            nameLabel: "门店名称",
            postUrl: "/homeCar/add/merchant"
          }
        },
        edit: {
          mer: {
            title: "修改4s店",
            type: "VEHICL_SHOWALL",
            nameLabel: "4s店名称",
            postUrl: "/homeCar/add/merchant"
          },
          jjjd: {
            title: "修改家居家电门店",
            type: "ENTERPRISE_APPLIANCES",
            nameLabel: "门店名称",
            postUrl: "/homeCar/add/merchant"
          },
          zxsj: {
            title: "修改装修设计门店",
            type: "ENTERPRISE_DECORATE",
            nameLabel: "门店名称",
            postUrl: "/homeCar/add/merchant"
          },
          jc: {
            title: "修改建材门店",
            type: "BUILDING_MATERIAL",
            nameLabel: "门店名称",
            postUrl: "/homeCar/add/merchant"
          }
        }
      },
      origin: null,
      id: null // 商户ID，路由参数，如存在则表示编辑，反之新增
    };
  },
  created() {
    if ("id" in this.$route.query) {
      this.id = this.$route.query.id;
      this.origin = this.config.edit[this.$route.params.origin];
      this.$post("/homeCar/merchants/findBackMerchantById", {
        id: this.id
      }).then(rs => {
        if (rs.status === 200) {
          let data = rs.payload;
          this.form.name = data.name;
          this.form.address = data.address;
          this.form.phone = data.phone;
          this.form.synopsis = data.synopsis;
          this.form.logoUrl = data.logoUrl;
          this.logoImgs = [{ url: data.logoUrl }];
          this.form.showPicture = data.showPicture;
          this.doorImgs = [{ url: data.showPicture }];
          this.form.status = data.status;
          this.form.popular = data.popular;
        } else {
          this.$message.error(rs.error);
        }
      });
    } else {
      this.id = null;
      this.origin = this.config.add[this.$route.params.origin];
    }
    this.$route.meta.title = this.origin.title;
  },
  methods: {
    async onSubmit() {
      if (
        !this.form.name ||
        !this.form.address ||
        !this.form.phone ||
        !this.form.synopsis ||
        this.logoImgs.length == 0 ||
        this.doorImgs.length == 0
      ) {
        this.$message.info("请完善信息！");
        return false;
      }
      this.form.logoUrl = this.logoImgs[0].url;
      this.form.showPicture = this.doorImgs[0].url;
      this.form.type = this.origin.type;
      if (this.id) {
        this.form.id = this.id;
      }
      let res = await this.$post(this.origin.postUrl, this.form);
      if (res.status === 200) {
        this.$message.success(res.message);
        window.history.go(-1);
      } else {
        this.$message.error(res.error);
      }
    },
    back() {
      window.history.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: 10px;
}
</style>
