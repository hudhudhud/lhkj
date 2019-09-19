<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" :url="`act_department/get_act_department/${this.form.merchantId}`" :param="form" @loaded="loading=false">
      <el-table-column prop="id" label="部门ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="departmentName" label="部门名称" width="250" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="250">
        <template slot-scope="props">
          <el-button @click="act(props.row.id) " type="success " :loading="props.row.loading " plain>活动</el-button>
          <el-button @click="edit(props.row.id) " type="success " :loading="props.row.loading " plain>编辑</el-button>
          <el-button @click="del(props.row) " type="danger " :loading="props.row.loading " plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>

</template>

<script>

export default {
  data () {
    return {
      form: {
        merchantId: this.$route.params.merchantId
      },
      merchantList: [],
      loading: false,
      showDialog: false,
      activity: null,
      dialogVisible: false,
      link: ""

    }
  },
  methods: {

    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    act (id) {
      this.$router.push({
        path: this.$route.params.merchantId + "/actList/" + id
      })
    },
    edit (id) {
      this.$router.push({
        path: this.$route.params.merchantId + "/editDepartment/" + id
      })
    },

    onAdd () {
      this.$router.push({
        path: this.$route.params.merchantId + "/addDepartment/"
      })
    },
    async dodel (activity) {
      let rs = await this.$post("activity/del", {actId: activity.actId})
      if (rs.status == "200") {
        this.onSearch()
      }
    },
    del (activity) {
      this.$confirm("此操作将永久删除该活动,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.dodel(activity)
        this.$message({
          type: "success",
          message: "删除成功"
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    async editOnline (activity) {
      let rs = await this.$post("activity/update_online", {actId: activity.actId, actStatus: activity.actStatus})
      if (rs.status == "200") {
        this.onSearch()
      }
    }
  },
  created () {

  }
}
</script>

<style scoped>
</style>
