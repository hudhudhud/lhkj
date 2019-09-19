<template>
  <LayoutPage class="content-mer">
    <LayoutSearch>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="品牌">
          <el-input v-model="searchForm.brand"></el-input>
        </el-form-item>
        <el-form-item label="活动开始日期">
          <el-date-picker v-model="searchForm.preferentialBeginTime" type="date" value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束日期">
          <el-date-picker v-model="searchForm.preferentialEndTime" type="date" value-format="yyyy-MM-dd"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :loading="loading">查询</el-button>
          <el-button type="primary" @click="add" :loading="loading">新增</el-button>
          <el-button :loading="isExport" type="primary" plain @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="homeCar/preferential/backShowAll" :param="searchForm" @loaded="loading=false"
      show-pager :disableAutoHeight="true">
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" type="index" label="序号">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="brand" label="品牌">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="150" prop="carTypeName" label="车型">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" label="优惠时间">
        <template slot-scope="scope">
          {{scope.row.preferentialBeginTime}}至{{scope.row.preferentialEndTime}}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="preferentialExplain"
        label="优惠政策">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" label="车辆图片">
        <template slot-scope="scope">
          <img :src="scope.row.pictureUrl">
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="300" label="操作">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="updateStatus($event,scope.row.id)" active-color="#13ce66"
            inactive-color="#D3D3D3" :active-value="true" :inactive-value="false">
          </el-switch>
          <el-button size="mini" type="primary" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <!-- 弹窗 -->
    <el-dialog :visible.sync="isShow">
      <el-form ref="form" :model="form" label-min-width="100px">
        <el-form-item label="品牌">
          <el-select v-model="form.brand" :filterable="true" clearable placeholder="请选择" style="width: 100%;">
            <el-option v-for="opt in opts" :key="opt" :label="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车型">
          <el-input v-model="form.carTypeName"></el-input>
        </el-form-item>
        <el-form-item label="优惠时间">
          <el-date-picker style="width:100%;" v-model="form.daterange" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="优惠政策">
          <el-input v-model="form.preferentialExplain"></el-input>
        </el-form-item>
        <el-form-item label="车辆图片">
          <UploadImages v-model="form.img" action="file/upload" :max="1"></UploadImages>
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
        brand: "",
        preferentialBeginTime: "",
        preferentialEndTime: "",
        status: true
      },
      form: {
        id: null,
        brand: "",
        carTypeName: "",
        daterange: [],
        preferentialExplain: "",
        img: [],
        status: 1
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
        if (key == "img" || key == "daterange") {
          this.form[key] = [];
        }
      });
      this.form.status = 1;
      this.isShow = true;
    },
    updateStatus(status, id) {
      this.$post("/homeCar/preferential/saveAndUpdate", { status, id }).then(
        rs => {
          if (rs.status == 200) {
            this.search();
            this.$message.success(rs.message);
          } else {
            this.$message.error(rs.error);
          }
        }
      );
    },
    onEdit(data) {
      this.form.id = data.id;
      this.form.brand = data.brand;
      this.form.carTypeName = data.carTypeName;
      this.form.preferentialExplain = data.preferentialExplain;
      this.form.status = data.status;
      this.form.img = [
        {
          url: data.pictureUrl
        }
      ];
      this.form.daterange = [
        data.preferentialBeginTime,
        data.preferentialEndTime
      ];
      this.isShow = true;
    },
    onDelete(id) {
      this.$confirm("此操作将永久删除,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/homeCar/preferential/delete", { id }).then(rs => {
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
      let data = { type: "car" };
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
        !this.form.img[0] ||
        !this.form.daterange[0] ||
        !this.form.brand ||
        !this.form.carTypeName ||
        !this.form.preferentialExplain
      ) {
        this.$message.info("请完善信息！");
        return false;
      }
      let data = { ...this.form };
      data.preferentialBeginTime = this.form.daterange[0];
      data.preferentialEndTime = this.form.daterange[1];
      data.pictureUrl = this.form.img[0].url;
      delete data.daterange;
      delete data.img;
      this.$post("/homeCar/preferential/saveAndUpdate", data).then(rs => {
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
    this.$post("/homeCar/preferential/groupByBrand").then(rs => {
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
