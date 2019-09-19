<template>
  <LayoutPage class="content-mer">
    <LayoutSearch>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="活动主题">
          <el-input v-model="searchForm.title" placeholder="请输入活动主题"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="searchForm.region" :filterable="true" clearable placeholder="请选择活动区域"
            style="width: 100%;">
            <el-option v-for="opt in opts" :key="opt" :label="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :loading="loading">查询</el-button>
          <el-button :loading="isExport" type="primary" plain @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="homeCar/form/findbylist" :param="searchForm" @loaded="loading=false" show-pager
      :disableAutoHeight="true">
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" type="index" label="序号">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="data5" label="活动主题">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="data7" label="活动时间">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="data8" label="活动区域">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" prop="data1" label="姓名">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" prop="data2" label="性别">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="data3" label="手机号码">
      </el-table-column>
    </LayoutTable>
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
      opts: [],
      loading: false,
      isExport: false
    };
  },
  methods: {
    search() {
      this.loading = true;
      this.$refs.myTable.search();
    },

    async onExport() {
      this.isExport = true;
      let rs = await this.$post("/homeCar/home/preferential/export/getout");
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else {
        this.$message.error(rs.error);
      }
      this.isExport = false;
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
