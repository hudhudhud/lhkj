<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="模版名">
        <el-input v-model="form.defName" placeholder="输入模版名查询"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option value=1 label="地区白名单"></el-option>
          <el-option value=2 label="号码白名单"></el-option>
          <el-option value=3 label="号码黑名单"></el-option>
          <el-option value=4 label="API限制(白名单)"></el-option>
          <el-option value=5 label="API限制(黑名单)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" :loading="loading" plain>新增模版</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="chooseDef" :loading="loading" plain>选取模版</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="listDef/queryBySessionData" :param="form" @loaded="loading=false">
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="defName" label="模版名" width="200">
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
      <el-table-column label="操作" min-width="100">
        <template slot-scope="props">
          <el-button @click="lookUp(props.row)" v-if="props.row.public=='0'" :loading="props.row.loading" plain>编辑配置</el-button>
          <el-button type="info" v-else :loading="props.row.loading" plain>公共模版不可编辑</el-button>
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
      form: {
        type: ""
      },
      listDef: {},
      loading: false,
      ShowDialog: false
    }
  },
  methods: {
    chooseDef () {
      this.$router.push({
        path: "listDef/phoneLocationLimitConfigForm"
      })
    },
    lookUp (listDef) {
      if (listDef.type == 1) {
        // 地区白名单
        this.$router.push({
          path: "listDef/BWMobileListForm/" + listDef.id
        })
      } else if (listDef.type == 2) {
        // 号码白名单
        this.$router.push({
          path: "listDef/BWMobileListList/" + 0 + "/" + listDef.id
        })
      } else if (listDef.type == 3) {
        // 号码白名单
        this.$router.push({
          path: "listDef/BWMobileListList/" + 1 + "/" + listDef.id
        })
      } else if (listDef.type == 4) {
        // API限制
        this.$message.error("暂无")
      }
    },
    onAdd () {
      this.listDef = {
        type: 1
      }
      this.ShowDialog = true
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
