<template>
  <div>
    <LayoutSearch>
      <el-form-item label="联系电话">
        <el-input v-model="searchForm.data3" placeholder="输入联系电话查询"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker v-model="searchForm.beginDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker v-model="searchForm.endTime" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" type="primary" plain>查询</el-button>
        <el-button @click="onExport" :loading="isExport" type="primary" plain>导出</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="rentTable" :disableAutoHeight="true" url="homeCar/form/select" :param="searchForm"
      @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="序号">
      </el-table-column>
      <el-table-column prop="submitDate" label="申请日期">
      </el-table-column>
      <el-table-column prop="data3" label="联系方式">
      </el-table-column>
      <el-table-column prop="data1" label="客户选择的居住区域">
      </el-table-column>
      <el-table-column prop="data2" label="年龄段">
      </el-table-column>
      <el-table-column prop="data4" label="可承受最高月租金">
      </el-table-column>
      <el-table-column prop="data5" label="倾向独租/合租">
      </el-table-column>
      <el-table-column prop="data6" label="是否愿意租住品牌公寓">
      </el-table-column>
      <el-table-column prop="data7" label="影响房屋选择排序">
      </el-table-column>
      <el-table-column prop="data8" label="是否愿意签订长期租约">
      </el-table-column>
    </LayoutTable>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </div>
</template>

<script>
export default {
  name: "ssRentHouse",
  data() {
    return {
      searchForm: {
        data3: null,
        beginDate: null,
        endDate: null,
        formId: 22
      },
      loading: false,
      isExport: false
    };
  },
  props: {},
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.rentTable.search();
    },
    async onExport() {
      this.isExport = true;
      let data = { type: "ZFXQ", formId: 22 };
      let rs = await this.$post("homeCar/export/getout", data);
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else {
        this.$message.error(rs.error);
      }
      this.isExport = false;
    },
    viewInfo() {}
  }
};
</script>

<style scoped>
</style>
