<template>
  <LayoutForm>
    <LayoutSearch>
      <el-form-item label="白名单">
        <el-input v-model="form.account" placeholder="输入白名单"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="impotwhite()" type="primary">号码白名单导入</el-button>
        <el-button @click="impotareawhite()" type="primary">号区白名单导入</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="downloadTemplate()" type="primary">下载白名单模板</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="white/get_white_detail" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="ID" width="300" align="center">
      </el-table-column>
      <el-table-column prop="account" label="账号" width="300" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="props">
          <el-button @click="del(props.row)" type="danger" :loading="props.row.loading" plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="号区白名单选择" v-model="showDialog">
      <WhiteAreaImport @success="onSearch" @close="showDialog=false"></WhiteAreaImport>
    </LayoutDialog>
  </LayoutForm>
</template>

<script>
import WhiteAreaImport from "./WhiteAreaImport"

export default {
  components: {
    WhiteAreaImport
  },
  data () {
    return {
      form: {
        actId: this.$route.params.actId,
        account: "",
        actType: ""

      },
      showDialog: false
    }
  },
  methods: {
    impotwhite () {
      this.$router.push({
        path: "/activity/whiteImport/" + this.form.actId
      })
    },
    async downloadTemplate () {
      if (this.form.actType == 1) {
        window.open("https://static.lianhaikeji.com/template/template_sell.xlsx")
      } else if (this.form.actType == 2) {
        window.open("https://static.lianhaikeji.com/template/template_lottery.xlsx")
      } else {
        window.open("https://static.lianhaikeji.com/template/template_seckill.xlsx")
      }
    },
    async loadActType () {
      let rs = await this.$post("activity/get_act_type", {actId: this.form.actId})
      if (rs.status == "200") {
        this.form.actType = rs.payload.actType
      }
    },
    async dodel (white) {
      let rs = await this.$post("white/del_white", {whiteId: white.id})
      if (rs.status == "200") {
        this.onSearch()
        this.$message({
          type: "success",
          message: "删除成功"
        })
      }
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    impotareawhite () {
      this.showDialog = true
    },
    del (white) {
      this.$confirm("此操作将永久删除该账号,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.dodel(white)
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    }
  },
  created () {
    this.loadActType()
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
