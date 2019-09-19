<template>
  <LayoutPage class="content-mer">
    <LayoutSearch>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="活动主题">
          <el-input placeholder="请输入活动主题" v-model="searchForm.title">
          </el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="searchForm.region" :filterable="true" clearable placeholder="请选择活动区域"
            style="width: 100%;">
            <el-option v-for="opt in opts" :key="opt" :label="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :loading="loading">查询</el-button>
          <el-button type="primary" @click="add" :loading="loading">新增</el-button>
          <el-button :loading="isExport" type="primary" plain @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="homeCar/preferential/backHomeShowAll" :param="searchForm" @loaded="loading=false"
      show-pager :disableAutoHeight="true">
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" type="index" label="序号">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="title" label="主题">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="150" prop="region" label="区域">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="address" label="活动地址">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="actDateTime" label="活动时间">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" label="活动链接">
        <template slot-scope="scope">
          <a :href="scope.row.linkAddress" target="_blank">{{scope.row.linkAddress}}</a>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" label="活动列表图片">
        <template slot-scope="scope">
          <img :src="scope.row.pictureUrl">
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" label="活动表单图片">
        <template slot-scope="scope">
          <img :src="scope.row.headPicture">
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="200" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <!-- 弹窗 -->
    <el-dialog :visible.sync="isShow">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="活动主题">
          <el-input placeholder="请输入活动主题" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" :filterable="true" clearable placeholder="请选择活动区域" style="width: 100%;">
            <el-option v-for="opt in opts" :key="opt" :label="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-input placeholder="请输入活动时间" v-model="form.actDateTime"></el-input>
        </el-form-item>
        <el-form-item label="活动地址">
          <el-input placeholder="请输入活动地址" v-model="form.address">
          </el-input>
        </el-form-item>
        <el-form-item label="活动链接">
          <el-input placeholder="请输入活动链接" v-model="form.linkAddress">
          </el-input>
        </el-form-item>
        <el-form-item label="活动列表图片">
          <UploadImages v-model="form.list_img" action="file/upload" :max="1"></UploadImages>
        </el-form-item>
        <el-form-item label="活动表单图片">
          <UploadImages v-model="form.banner_img" action="file/upload" :max="1"></UploadImages>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSave" :loading="loading">确定</el-button>
      </div>
    </el-dialog>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>
<script>
import UploadImages from "@/components/UploadImages";
export default {
  components: { UploadImages },
  data() {
    return {
      searchForm: {
        title: "",
        region: ""
      },
      form: {
        formId: 30,
        id: null,
        title: "",
        region: "",
        actDateTime: "",
        address: "",
        status: true,
        list_img: [],
        linkAddress: "",
        banner_img: []
      },
      opts: [],
      loading: false,
      isExport: false,
      isShow: false
    };
  },
  methods: {
    search() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    add() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
        if (key == "list_img" || key == "banner_img") {
          this.form[key] = [];
        }
      });
      this.form.formId = 30;
      this.form.status = 1;
      this.isShow = true;
    },
    onEdit(data) {
      this.form.id = data.id;
      this.form.title = data.title;
      this.form.region = data.region;
      this.form.address = data.address;
      this.form.linkAddress = data.linkAddress;
      this.form.status = data.status;
      this.form.list_img = [
        {
          url: data.pictureUrl
        }
      ];
      this.form.banner_img = [
        {
          url: data.headPicture
        }
      ];
      this.formId = 30;
      this.isShow = true;
    },
    onDelete(id) {
      this.$confirm("此操作将永久删除,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/homeCar/preferential/deleteHome", { id }).then(rs => {
            if (rs.status == 200) {
              this.$message.success(rs.message);
              this.search();
            } else {
              this.$message.error(rs.error);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    async onExport() {
      this.isExport = true;
      let data = { type: "home" };
      let rs = await this.$post("/homeCar/hl/preferential/export/getout", data);
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else {
        this.$message.error(rs.error);
      }
      this.isExport = false;
    },
    onCancel() {
      this.isShow = false;
    },
    // 新增或编辑弹窗的保存
    onSave() {
      if (
        !this.form.list_img[0] ||
        !this.form.banner_img[0] ||
        !this.form.actDateTime ||
        !this.form.title ||
        !this.form.region ||
        !this.form.linkAddress ||
        !this.form.address
      ) {
        this.$message.info("请完善信息！");
        return false;
      }
      let data = { ...this.form };
      data.pictureUrl = this.form.list_img[0].url;
      data.headPicture = this.form.banner_img[0].url;
      delete data.daterange;
      delete data.list_img;
      delete data.banner_img;
      this.$post("/homeCar/saveAndUpdateHome", data).then(rs => {
        if (rs.status == 200) {
          this.search();
          this.isShow = false;
          this.$message.success(rs.message);
        } else {
          this.$message.error(rs.error);
        }
      });
    }
  },
  created() {
    this.$post("/homeCar/preferential/groupByRegionHome").then(rs => {
      if (rs.status == 200) {
        this.opts = rs.payload;
      }
    });
  }
};
</script>
<style lang='scss'>
.content-mer {
  .el-table {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
.el-pagination {
  text-align: center;
  padding: 30px 0;
}
</style>
