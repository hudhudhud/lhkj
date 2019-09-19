<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="时间">
        <el-date-picker v-model="searchForm.dateGap" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange"
          align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="管辖行">
        <el-select v-model="searchForm.searchCriteria[0].value" @change="higherBankChange">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in higherBanks" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网点">
        <el-select v-model="searchForm.searchCriteria[1].value">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in banks4Higher" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房产面积">
        <el-select v-model="searchForm.searchCriteria[2].value">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in houseAreaArr" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="贷款额度">
        <el-select v-model="searchForm.searchCriteria[3].value">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in houseLoanAmountArr" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" type="primary" plain>查询</el-button>
        <el-button @click="exportExcel" :loading="loading" type="primary">导出</el-button>
        <el-button @click="saveRemark" :loading="loading" type="primary">保存</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="form/formData/14/12" :param="searchForm" @loaded="loading=false" show-pager>
      <el-table-column prop="submitDate" label="时间" width="100">
      </el-table-column>
      <el-table-column prop="data7" label="管辖行" width="150">
      </el-table-column>
      <el-table-column prop="data5" label="网点" width="100">
      </el-table-column>
      <el-table-column prop="data1" label="客户姓名" width="100">
      </el-table-column>
      <el-table-column prop="data2" label="联系方式" width="100">
      </el-table-column>
      <el-table-column prop="data3" label="房产位置" width="120">
      </el-table-column>
      <el-table-column prop="data4" label="房屋面积" width="100">
      </el-table-column>
      <el-table-column prop="data6" label="贷款额度" width="100">
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
      wdh: true,
      searchForm: {
        searchCriteria: [
          {
            key: "data7",
            operation: "equal",
            value: ""
          },
          {
            key: "data5",
            operation: "equal",
            value: ""
          },
          {
            key: "data4",
            operation: "equal",
            value: ""
          },
          {
            key: "data6",
            operation: "equal",
            value: ""
          }
        ],
        dateGap: []
      },
      loading: false,
      submiting: false,
      showEdit: false,
      refereeItem: {},
      refereeStoreList: [],
      subbranchList: [],
      higherBanks: [],
      banks: [],
      banks4Higher: [],
      allBank: [],
      houseAreaArr: [],
      houseLoanAmountArr: [],
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
    loadResources: function() {
      let $this = this;
      this.$get("/form/formResources/values/" + "houseArea")
        .then(success => {
          if (success.status != "200") {
            $this.$message.error(success.error);
          } else {
            $this.houseAreaArr = success.payload;
          }
        })
        .catch(error => this.$message.error(error));
      this.$get("/form/formResources/values/" + "houseLoanAmount")
        .then(success => {
          if (success.status != "200") {
            $this.$message.error(success.error);
          } else {
            $this.houseLoanAmountArr = success.payload;
          }
        })
        .catch(error => this.$message.error(error));
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
            dataKey: "submitDate",
            columnKey: "时间"
          },
          {
            dataKey: "data7",
            columnKey: "管辖行"
          },
          {
            dataKey: "data6",
            columnKey: "网点"
          },
          {
            dataKey: "data1",
            columnKey: "客户姓名"
          },
          {
            dataKey: "data2",
            columnKey: "联系方式"
          },
          {
            dataKey: "data3",
            columnKey: "房产位置"
          },
          {
            dataKey: "data4",
            columnKey: "房屋面积"
          },
          {
            dataKey: "data5",
            columnKey: "贷款额度"
          },
          {
            dataKey: "remark",
            columnKey: "备注"
          }
        ],
        search: searchForm
      };
      let rs = await this.$post("/form/formData/14/12/export", excelForm);
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
    this.loadResources();
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
