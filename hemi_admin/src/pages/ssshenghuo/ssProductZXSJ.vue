<template>
  <LayoutPage>
    <el-button type="primary" @click="onAdd" style="margin: 10px 10px 0;">新增</el-button>
    <ssProductList ref="ZXSJTable" type="ZXSJ" :id="id" @view="onDetail($event)" @edit="onEdit($event)"></ssProductList>
    <el-dialog :visible.sync="isShow" @close="onCancel">
      <!-- 详情 -->
      <div v-if="isView">
        <el-row type="flex" align="middle" class="mb-md">
          <!-- 案例名 -->
          <el-col :span="3" class="text-right">
            案例名：
          </el-col>
          <el-col :span="9">
            {{info.name}}
          </el-col>
          <!-- 房型 -->
          <el-col :span="3" class="text-right">
            房型：
          </el-col>
          <el-col :span="9">
            {{info.description}}
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="mb-md">
          <!-- 面积 -->
          <el-col :span="3" class="text-right">
            面积：
          </el-col>
          <el-col :span="9">
            {{info.address}}
          </el-col>
          <!-- 设计风格 -->
          <el-col :span="3" class="text-right">
            设计风格：
          </el-col>
          <el-col :span="9">
            {{info.merchantType}}
          </el-col>
        </el-row>
        <!-- 设计说明 -->
        <el-row class="mb-md">
          <el-col :span="3" class="text-right">
            设计说明：
          </el-col>
          <el-col :span="21">
            {{info.avatar}}
          </el-col>
        </el-row>
        <!-- 效果图 -->
        <el-row>
          <el-col :span="3" class="text-right">
            首图：
          </el-col>
          <el-col :span="21">
            <div class="img-box">
              <img :src="info.showPicture" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="text-right">
            效果图：
          </el-col>
          <el-col :span="21">
            <div v-for="picture in info.storeScenesPictures" :key="picture.id" class="img-box">
              <img :src="picture.url" />
            </div>
          </el-col>
        </el-row>
      </div>
      <el-form v-else ref="form" :model="form" label-width="100px">
        <el-form-item label="案例名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="房型">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="面积">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="设计风格">
          <el-input v-model="form.merchantType"></el-input>
        </el-form-item>
        <el-form-item label="设计说明">
          <el-input type="textarea" :autosize="true" v-model="form.avatar"></el-input>
        </el-form-item>
        <el-form-item label="首图">
          <UploadImages v-model="form.banner" action="file/upload" :max="1"></UploadImages>
        </el-form-item>
        <el-form-item label="效果图">
          <UploadImages v-model="form.imgs" action="file/upload"></UploadImages>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <template v-if="isView">
          <el-button @click="onCancel">关闭</el-button>
        </template>
        <template v-else>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSave" :loading="isloading">确定</el-button>
        </template>
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
        description: "",
        address: "",
        merchantType: "",
        banner: [],
        imgs: [],
        avatar: "",
        status: false
      },
      isShow: false, // 弹窗开关
      id: null,
      isloading: false,
      isView: false, // 区分是详情还是新增
      info: null // 详情信息
    };
  },
  methods: {
    onAdd() {
      this.form = {
        id: null,
        name: "",
        banner: [],
        description: "",
        address: "",
        merchantType: "",
        imgs: [],
        avatar: "",
        status: false
      };
      this.isShow = true;
    },
    onEdit(data) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = data[key];
      });
      this.form.imgs = [];
      data.storeScenesPictures.forEach(img => {
        this.form.imgs.push({ url: img.url });
      });
      this.form.banner = [
        {
          url: data.showPicture
        }
      ];
      this.isShow = true;
    },
    onCancel() {
      this.isView = false;
      this.isShow = false;
      this.info = null;
    },
    // 查看详情
    onDetail(data) {
      this.info = data;
      this.isView = true;
      this.isShow = true;
    },
    async onSave() {
      if (
        !this.form.imgs[0] ||
        !this.form.banner ||
        !this.form.description ||
        !this.form.address ||
        !this.form.merchantType ||
        !this.form.avatar ||
        !this.form.name
      ) {
        this.$message("请完善信息！");
        return false;
      }
      this.isloading = true;
      let pic = [];
      this.form.imgs.forEach(item => {
        pic.push(item.url);
      });
      let data = {
        name: this.form.name,
        merchantId: this.id,
        description: this.form.description,
        address: this.form.address,
        merchantType: this.form.merchantType,
        pictures: pic,
        avatar: this.form.avatar,
        status: this.form.status,
        showPicture: this.form.banner[0].url
      };
      let url; // 装修设计商品新增和编辑接口不同
      if (this.form.id) {
        url = "/homeCar/store/backCreateOrUpdate";
        data.id = this.form.id;
      } else {
        url = "/homeCar/addMerchandise";
      }
      let rs = await this.$post(url, data);
      if (rs.status == "200") {
        this.$refs.ZXSJTable.refresh();
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
    }
  }
};
</script>
<style scoped>
.mb-md {
  margin-bottom: 16px;
}
.text-right {
  text-align: right;
}
.img-box {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 10px 10px 0;
  border: 1px solid #333;
}
.img-box img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
