<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="预约时间">
        <el-date-picker v-model="searchForm.dateGap" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange"
          align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="预约网点">
        <el-select v-model="searchForm.searchCriteria[1].value">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in banks4Higher" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" type="primary" plain>查询</el-button>
        <el-button @click="exportExcel" :loading="loading" type="primary">导出</el-button>
        <el-button @click="saveRemark" :loading="loading" type="primary">保存</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="form/formData/17/12" :param="searchForm" @loaded="loading=false" show-pager>
      <el-table-column prop="submitMonth" label="时间" width="100">
      </el-table-column>
      <el-table-column prop="data1" label="所辖行" width="100">
      </el-table-column>
      <el-table-column prop="data2" label="预约网点" width="180">
      </el-table-column>
      <el-table-column prop="data3" label="预约时间" width="100">
      </el-table-column>
      <el-table-column prop="data4" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="data5" label="联系号码" width="100">
      </el-table-column>
      <el-table-column prop="data6" label="产证编号" width="100">
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark"></el-input>
        </template>
      </el-table-column>
    </LayoutTable>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        // searchCriteria: [
        //   {
        //     key: "data2",
        //     operation: "equal",
        //     value: ""
        //   }
        // ],
        dateGap: []
      },
      loading: false,
      submiting: false,
      higherBanks: [],
      banks: [],
      banks4Higher: [],
      allBank: [],
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
      }
    };
  },
  computed: {
    // user() {
    //   return this.$store.state.user
    // }
  },
  watch: {
    // user(val) {
    //   if (val) {
    //     // this.getWdh(val)
    //   }
    // }
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    // 加载网点信息
    loadBanks: async function() {
      let rs = await this.$get(
        "form/formResources/bankResources/CCB/higher?city=" + "苏州市"
      );
      if (rs.status != "200") {
        this.$message.error(rs.error);
      } else {
        const bankArr = rs.payload;
        this.higherBanks = bankArr.map(t => t.higherBank);
        this.banks = bankArr.flatMap(t => t.banks);
        this.banks4Higher = bankArr.flatMap(t => t.banks);
        this.allBank = bankArr;
      }
    },
    higherBankChange: async function(higherBankAttr) {
      this.banks4Higher = this.allBank
        .filter(t => t.higherBank === higherBankAttr)
        .flatMap(t => t.banks);
      if (this.banks4Higher.length < 1) {
        this.banks4Higher = this.allBank;
      }
    },
    exportExcel: async function() {
      this.loading = true;
      let searchForm = this.searchForm;
      let excelForm = {
        excelMapList: [
          {
            dataKey: "submitMonth",
            columnKey: "时间"
          },
          {
            dataKey: "data1",
            columnKey: "所属行"
          },
          {
            dataKey: "data2",
            columnKey: "预约网店"
          },
          {
            dataKey: "data3",
            columnKey: "预约时间"
          },
          {
            dataKey: "data4",
            columnKey: "姓名"
          },
          {
            dataKey: "data5",
            columnKey: "联系号码"
          },
          {
            dataKey: "data6",
            columnKey: "产证编号"
          },
          {
            dataKey: "remark",
            columnKey: "备注"
          }
        ],
        search: searchForm
      };
      let rs = await this.$post("/form/formData/17/12/export", excelForm);
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
        this.loading = false;
      } else {
        this.$message.error(rs.error);
      }
      this.loading = false;
    },

    saveRemark: function() {
      let rowsData;
      rowsData = JSON.parse(JSON.stringify(this.$refs.myTable.list)).map(t => {
        t.originData = null;
        t.remarks = t.remark;
        return t;
      });
      this.$post("/form/formData/remark", rowsData)
        .then(resp => {
          if (resp.status == "200") {
            this.$message.success("保存成功");
          } else {
            this.$message.error(resp.error);
          }
        })
        .catch(error => this.$message.error(error));
    }
  },
  created() {
    // 加载网点信息
    this.loadBanks();
  },
  mounted() {
    // if (this.user) {
    //   // this.getWdh(this.user)
    // }
  }
};
</script>

<style scoped>
</style>
