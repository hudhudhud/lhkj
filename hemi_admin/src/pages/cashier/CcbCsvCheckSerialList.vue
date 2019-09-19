<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="交易日期">
        <el-date-picker v-model="form.transactionTime" type="datetime" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="文件名">
        <el-input v-model="form.fileName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <UploadButton :action="'cashier/uploadCsv'" @success="success">点击上传</UploadButton>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">刷新</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="cashier/queryCcbCsvCheckSerial" :param="form" @loaded="loading=false">
      <el-table-column prop="batchSerialnum" label="批次ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="fileName" label="导入文件名" width="100" align="center">
      </el-table-column>
      <el-table-column prop="transactionTime" label="交易日期" width="100" align="center">
      </el-table-column>
      <el-table-column prop="csvGetTime" label="出单日期" width="100" align="center">
      </el-table-column>
      <el-table-column prop="totalOrderNum" label="导入总量" width="100" align="center">
      </el-table-column>
      <el-table-column prop="checkedNum" label="已处理数量" width="100" align="center">
      </el-table-column>
      <el-table-column prop="iffyOrderNum" label="问题单数量" width="100" align="center">
      </el-table-column>
      <el-table-column label="处理状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag v-if="props.row.status=='0'">处理中</el-tag>
          <el-tag type="success" v-if="props.row.status=='1'">已处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="处理进度" width="100" align="center">
        <template slot-scope="props">
          {{(props.row.checkedNum/props.row.totalOrderNum*100).toString().substr(0, 5)}}%
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="props">
          <el-button @click="showDetail(props.row.batchSerialnum)" type="primary" :loading="props.row.loading " plain>查看明细</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>

</template>

<script>
import UploadButton from "@/components/UploadButton"
export default {
  components: {
    UploadButton
  },
  data () {
    return {
      form: {
        batchSerialnum: "",
        status: "",
        csvGetTime: "",
        transactionTime: "",
        fileName: "",
        totalOrderNum: "",
        checkedNum: "",
        iffyOrderNum: ""
      },
      loading: false
    }
  },
  methods: {
    success (rs) {
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "导入成功"
        })
        this.$refs.myTable.search()
      } else {
        this.$message({
          type: "error",
          message: rs.message
        })
      }
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    showDetail (id) {
      this.$router.push({
        path: "/cashier/detail/" + id
      })
    }
  },
  created () {
  }
}
</script>
