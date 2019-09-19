<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="卡号">
        <el-input v-model="form.cardNo" placeholder="输入卡号查询"></el-input>
      </el-form-item>
      <el-form-item label="卡密">
        <el-input v-model="form.cardPwd" placeholder="输入卡密查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd" v-if="!generateStatus">批量生成券码</el-button>
      <el-button v-else :loading="true">生成中</el-button>
      <el-button @click="onExport" v-if="!exportStatus">按批次导出券码</el-button>
      <el-button v-else :loading="true">导出中</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/colo/couponCode/query" :param="form" @loaded="loading = false" show-pager>
      <el-table-column label="ID" width="80" prop="id">
      </el-table-column>
      <el-table-column label="批次ID" width="160" prop="batchId">
      </el-table-column>
      <el-table-column label="券定义id" width="160" prop="couponDefineId">
      </el-table-column>
      <el-table-column label="创建时间" width="180" prop="ctime">
      </el-table-column>
      <el-table-column label="过期时间" width="180" prop="ptime">
      </el-table-column>
      <el-table-column label="核销时间" width="180" prop="checktime">
      </el-table-column>
      <el-table-column width="90" prop="status" label="券类型">
        <template slot-scope="props">
          <el-tag v-if="props.row.status=='1'" type="info">已核销</el-tag>
          <el-tag v-else-if="props.row.status=='0'" type="success">未核销</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="卡号" width="180" prop="cardNo">
      </el-table-column>
      <el-table-column label="卡密" prop="cardPwd" width="160">
      </el-table-column>
      <!-- <el-table-column label="操作" min-width="100" fixed="right">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
        </template>
      </el-table-column> -->
    </LayoutTable>
    <LayoutDialog title="生成券码" v-model="ShowDialog">
      <CodeForm :code="code" @generateStart="redisGenerateStart" @close="ShowDialog=false"></CodeForm>
    </LayoutDialog>
    <LayoutDialog title="导出券码" v-model="ExportShowDialog">
      <ExportForm :code="code" @exportStart="redisExportStart" @close="ExportShowDialog=false"></ExportForm>
    </LayoutDialog>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
import CodeForm from "./CodeForm";
import ExportForm from "./ExportForm";
export default {
  components: { CodeForm, ExportForm },
  data() {
    return {
      form: {},
      ShowDialog: false,
      loading: false,
      code: null,
      ExportShowDialog: false,
      exportStatus: false,
      generateStatus: false
    };
  },
  methods: {
    onExport() {
      this.code = null;
      this.ExportShowDialog = true;
    },
    async redisGenerateStart(key) {
      this.generateStatus = true;
      let rs = await this.$post("/colo/couponCode/findRedisKey/" + key);
      if (rs.status == "200") {
        if (rs.payload) {
          this.generateStatus = false;
          this.$el.querySelector("#exelIframe").src = rs.payload;
        } else {
          let this_ = this;
          setTimeout(function() {
            this_.redisGenerateStart(key);
          }, 3000);
        }
      } else {
        this.generateStatus = false;
        this.$message.error(rs.error);
      }
    },
    async redisExportStart(key) {
      this.exportStatus = true;
      let rs = await this.$post("/colo/couponCode/findRedisKey/" + key);
      if (rs.status == "200") {
        if (rs.payload) {
          this.exportStatus = false;
          this.$el.querySelector("#exelIframe").src = rs.payload;
        } else {
          let this_ = this;
          setTimeout(function() {
            this_.redisExportStart(key);
          }, 3000);
        }
      } else {
        this.exportStatus = false;
        this.$message.error(rs.error);
      }
    },
    edit(code) {
      this.code = code;
      this.ShowDialog = true;
    },
    onAdd() {
      this.code = null;
      this.ShowDialog = true;
    },
    onSearch() {
      this.loading = true;
      this.code = null;
      this.$refs.myTable.search();
    }
  },
  activated() {}
};
</script>

<style scoped>
</style>
