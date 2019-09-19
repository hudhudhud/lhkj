<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="地区白名单" value="1"></el-option>
          <el-option label="号码白名单" value="2"></el-option>
          <el-option label="号码黑名单" value="3"></el-option>
          <el-option label="API限制(白名单)" value="4"></el-option>
          <el-option label="API限制(黑名单)" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版名">
        <el-input v-model="form.defName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd " plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="mobileWhiteList/query" :param="form " @loaded="loading=false " show-pager>
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="defName" label="模版名" width="200 ">
      </el-table-column>
      <el-table-column label="类型" width="150">
        <template slot-scope="props">
          <el-tag v-if="props.row.type==1">地区白名单</el-tag>
          <el-tag v-if="props.row.type==2">号码白名单</el-tag>
          <el-tag v-if="props.row.type==3">号码黑名单</el-tag>
          <el-tag v-if="props.row.type==4">API限制(白名单)</el-tag>
          <el-tag v-if="props.row.type==5">API限制(黑名单)</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button>
          <el-button @click="lookUp(props.row)" :loading="props.row.loading" plain>查看配置详情</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="模版配置" v-model="ShowDialog">
      <EditListDetForm :listDef="listDef" @success="onSearch" @close="ShowDialog=false"></EditListDetForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>

import EditListDetForm from "./EditListDetForm"
export default {
  components: {
    EditListDetForm
  },
  data () {
    return {
      listDef: {},
      form: {
        type: ""
      },
      loading: false,
      ShowDialog: false
    }
  },
  methods: {
    edit (listDef) {
      this.listDef = listDef
      this.ShowDialog = true
    },
    onAdd () {
      this.listDef = {
        type: 1
      }
      this.ShowDialog = true
    },
    async lookUp (prop) {
      if (prop.type == 1) {
        // 地区白名单
        this.$router.push({
          path: "commonWhiteList/phoneLocationLimitConfigForm/" + prop.id
        })
      } else if (prop.type == 2) {
        // 号码白名单
        this.$router.push({
          path: "commonWhiteList/CommonMobileList/" + 0 + "/" + prop.id
        })
      } else if (prop.type == 3) {
        // 号码黑名单
        this.$router.push({
          path: "commonWhiteList/BWMobileListList/" + 1 + "/" + prop.id
        })
      } else if (prop.type == 4) {
        // API限制
        this.$message.error("暂无")
      }
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
