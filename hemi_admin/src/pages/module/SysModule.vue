<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="模块">
        <el-input v-model="form.mname" placeholder="输入模块名查询"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="可用状态">
          <el-option label="可用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="module/query" :param="form" :filter="filter">
      <el-table-column label="模块" width="220">
        <template slot-scope="props">
          <span :style="{'margin-left':(props.row.level-1)*30+'px'}">{{props.row.mname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="level" width="50">
      </el-table-column>
      <el-table-column prop="path" label="API路由" width="150">
      </el-table-column>
      <el-table-column prop="router" label="前端路由" width="150">
      </el-table-column>
      <el-table-column label="操作" min-width="280" fixed="right">
        <template slot-scope="props">
          <el-button @click="add(props.row)" :loading="props.row.loading">新增</el-button>
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
          <el-button @click="resume(props.row)" type="success" v-if="props.row.state=='0'" :loading="props.row.loading">启用</el-button>
          <el-button @click="dis(props.row)" type="danger" v-if="props.row.state=='1'" :loading="props.row.loading">禁用</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="模块信息" v-model="showDialog">
      <ModuleForm :mod="mod" @success="onSearch" @close="showDialog=false"></ModuleForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import ModuleForm from "./ModuleForm"

export default {
  components: {
    ModuleForm
  },
  data () {
    return {
      form: { mname: "", state: "1" },
      showDialog: false,
      mod: null
    }
  },
  methods: {
    edit (mod) {
      this.mod = mod
      this.showDialog = true
    },
    add (mod) {
      this.$router.push({
        name: "AddModule",
        params: { mid: mod.mid, level: mod.level }
      })
    },
    async resume (mod) {
      mod.loading = true
      let rs = await this.$post("module/setModuleState", {
        mid: mod.mid,
        state: "1"
      })
      if (rs.status == "100") {
        mod.state = "1"
      }
      mod.loading = false
    },
    async dis (mod) {
      mod.loading = true
      let rs = await this.$post("module/setModuleState", {
        mid: mod.mid,
        state: "0"
      })
      if (rs.status == "200") {
        mod.state = "0"
      }
      mod.loading = false
    },

    filter (list) {
      let toList = []
      this.generalLevel(list, toList)
      return toList.filter(item => {
        return item.mname.indexOf(this.form.mname) > -1
      })
    },
    generalLevel (list, toList) {
      list.forEach((item, index) => {
        toList.push(item)
        if (item.children) {
          this.generalLevel(item.children, toList)
        }
      })
    },
    onSearch () {
      this.$refs["myTable"].search()
    },
    handleSizeChange () {},
    handleCurrentChange () {}
  },
  created () {},
  activated () {
    this.onSearch()
  }
}
</script>

<style scoped>
</style>
