<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="名称">
                <el-input v-model="form.defName" placeholder="输入名称查询"></el-input>
            </el-form-item>
            <el-form-item label="重复发放">
                <el-select v-model="form.isRepeat" placeholder="可用状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="支持" value=1></el-option>
                    <el-option label="不支持" value=0></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="onAdd" type="success" plain>新增</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="creditConfig/query" :param="form" @loaded="loading=false" show-pager>
            <el-table-column prop="defName" label="名称" width="170">
            </el-table-column>
            <el-table-column prop="changeCredit" label="积分改变量" width="170">
            </el-table-column>
            <el-table-column prop="apartTimes" label="参与上限" width="170">
            </el-table-column>
            <el-table-column label="重复发放" width="170">
                <template slot-scope="props">
                    <el-tag :type='props.row.isRepeat=="1"?"success":"info"'>{{ props.row.isRepeat=="1"?"支持":"不支持" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="props">
                    <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button>
                </template>
            </el-table-column>
        </LayoutTable>
        <LayoutDialog title="编辑" v-model="ShowDialog">
            <EditCreditConfigForm :creditConfig="creditConfig" @success="onSearch" @close="ShowDialog=false"></EditCreditConfigForm>
        </LayoutDialog>
    </LayoutPage>
</template>

<script>

import EditCreditConfigForm from "./EditCreditConfigForm"
export default {
  components: {
    EditCreditConfigForm
  },
  data () {
    return {
      ShowDialog: false,
      creditConfig: {},
      form: {},
      loading: false
    }
  },
  methods: {
    edit (creditConfig) {
      this.creditConfig = creditConfig
      this.ShowDialog = true
    },
    onAdd () {
      this.creditConfig = {}
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
