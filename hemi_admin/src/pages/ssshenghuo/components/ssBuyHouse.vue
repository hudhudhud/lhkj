<template>
  <div>
    <LayoutSearch>
      <el-form-item label="联系电话">
        <el-input v-model="searchForm.data7" placeholder="输入联系电话查询"></el-input>
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
    <LayoutTable :disableAutoHeight="true" ref="buyTable" url="homeCar/form/select" :param="searchForm"
      @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="序号">
      </el-table-column>
      <el-table-column prop="submitDate" label="申请日期">
      </el-table-column>
      <el-table-column prop="data7" label="联系电话">
      </el-table-column>
      <el-table-column prop="data1" label="拟购买房产坐落">
      </el-table-column>
      <el-table-column prop="data2" label="房屋总价(万元)">
      </el-table-column>
      <el-table-column prop="data3" label="拟贷款金额(万元)">
      </el-table-column>
      <el-table-column prop="data4" label="拟贷款期限(年)">
      </el-table-column>
      <el-table-column prop="data5" label="家庭月收入(元)">
      </el-table-column>
    </LayoutTable>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </div>
</template>

<script>
export default {
  name: "ssBuyHouse",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchForm: {
        data7: null,
        beginDate: null,
        endDate: null,
        formId: 21
      },
      loading: false,
      isExport: false
    };
  },
  props: {},
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.buyTable.search();
    },
    async onExport() {
      this.isExport = true;
      let data = { type: "MFXQ", formId: 21 };
      let rs = await this.$post("homeCar/export/getout", data);
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else {
        this.$message.error(rs.error);
      }
      this.isExport = false;
    }
  }
};
</script>

<style scoped>
</style>
