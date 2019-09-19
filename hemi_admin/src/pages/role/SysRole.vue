<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="角色名称">
        <el-input v-model="form.rname" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="可用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd">新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="role/query" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="rid" label="rid" width="100">
      </el-table-column>
      <el-table-column prop="rname" label="rname" width="200">
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.state=="1"?"success":"info"'>{{ props.row.state=="1"?"有效":"无效" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button @click="resume(props.row)" type="success" v-if="props.row.state=='0'" :loading="props.row.loading">恢复</el-button>
          <el-button @click="dis(props.row)" type="danger" v-if="props.row.state=='1'" :loading="props.row.loading">禁用</el-button>
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      form: { rname: "", state: "" },
      loading: false,
      showDialog: false,
      role: null
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    edit (role) {
      this.$router.push({
        path: "role/edit/" + role.rid
      })
    },
    onAdd () {
      this.$router.push({
        path: "role/add"
      })
    },
    async resume (role) {
      role.loading = true
      let rs = await this.$post("role/setRoleState", {
        rid: role.rid,
        state: "1"
      })
      if (rs.status == "200") {
        role.state = "1"
      }
      role.loading = false
    },
    async dis (role) {
      role.loading = true
      let rs = await this.$post("role/setRoleState", {
        rid: role.rid,
        state: "0"
      })
      if (rs.status == "200") {
        role.state = "0"
      }
      role.loading = false
    }
  },
  activated () {
    this.onSearch()
  }
}
</script>

<style scoped>
</style>
