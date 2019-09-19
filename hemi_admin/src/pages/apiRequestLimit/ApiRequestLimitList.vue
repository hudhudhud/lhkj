<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="apiRequestLimit/queryApiRequestLimitWhithPage" :param="form" @loaded="loading=false"
                 show-pager>
      <el-table-column prop="priority" label="优先级数" width="100" align="center">
      </el-table-column>
      <el-table-column prop="tagetUrl" label="目标地址" width="100" align="center">
      </el-table-column>
      <el-table-column label="限制时长" width="100" align="center">
        <template slot-scope="props">
          {{props.row.duration + " " + durationUnitArry[props.row.durationUnit]}}
        </template>
      </el-table-column>
      <el-table-column prop="requestMaxTimes" label="最多访问次数" width="100" align="center">
      </el-table-column>
      <el-table-column label="冻结时长" width="100" align="center">
        <template slot-scope="props">
          {{props.row.freezeDuration==null?"":props.row.freezeDuration + " " + durationUnitArry[props.row.freezeDurationUnit]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="props">
          <el-button @click="edit(props.row.id) " type="success " :loading="props.row.loading " plain>编辑</el-button>
          <el-button @click="del(props.row.id) " type="danger " :loading="props.row.loading " plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>

</template>

<script>
export default {
  components: {},
  data () {
    return {
      form: {
        id: "",
        tagetUrl: "",
        duration: "",
        durationUnit: "",
        requestMaxTimes: "",
        freezeDuration: "",
        freezeDurationUnit: "",
        priority: ""
      },
      durationUnitArry: ["毫秒", "秒", "分钟", "小时", "天"],
      loading: false
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    edit (id) {
      this.$router.push({
        path: "/apiRequestLimit/editApiRequestLimit/" + id
      })
    },
    onAdd () {
      this.$router.push({
        path: "/apiRequestLimit/addApiRequestLimit"
      })
    },
    async dodel (id) {
      let rs = await this.$post("apiRequestLimit/delApiRequestLimit", {id: id})
      if (rs.status == "200") {
        this.onSearch()
      }
    },
    del (id) {
      this.$confirm("此操作将永久删除该配置,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.dodel(id)
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
    }
  },
  created () {
  }
}
</script>
