<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="limit/get_limit" :param="form" @loaded="loading=false">
      <el-table-column prop="limitId" label="限制ID" width="80" align="center">
      </el-table-column>
      <el-table-column prop="limitName" label="限制名称" width="150" align="center">
      </el-table-column>
      <el-table-column prop="limitStrategyName" label="限制策略名称" width="150" align="center">
      </el-table-column>
      <!-- <el-table-column prop="configure" label="限制项" width="200" align="center">
      </el-table-column> -->
      <el-table-column prop="limitConfigure" label="限制配置" width="300" align="center">
      </el-table-column>
      <el-table-column prop="className" label="类名" width="150" align="center">
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="100" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60">
        <template slot-scope="props">
          <el-button @click="del(props.row)" type="danger" :loading="props.row.loading" plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <!-- <LayoutDialog title="商品信息" v-model="showDialog">
      <ActivityForm :product="product" @close="showDialog=false" @success="onSearch"></ActivityForm>
    </LayoutDialog> -->
  </LayoutPage>
</template>

<script>
import ActivityForm from "./ActivityForm"

export default {
  components: {
    ActivityForm
  },
  data () {
    return {
      form: {
        relationId: "",
        relationType: "",
        id: ""
      },
      loading: false,
      showDialog: false
    }
  },
  methods: {

    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    onAdd () {
      this.$router.push({
        path: "/activity/limit/" + this.form.relationId + "/addLimit/" + this.form.id
      })
    },
    async dodel (limit) {
      let rs = await this.$post("limit/del", {limitId: limit.limitId})
      if (rs.status == "200") {
        this.onSearch()
      }
    },
    del (limit) {
      this.$confirm("此操作将永久删除该限制,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.dodel(limit)
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
    if (this.$route.params.proId) {
      this.form.relationId = this.$route.params.proId
      this.form.relationType = "3"
      this.form.id = "1"
    } else {
      this.form.relationId = this.$route.params.actId
      this.form.relationType = "2"
      this.form.id = "2"
    }
  }
}
</script>

<style scoped>
</style>
