<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="名称">
                <el-input v-model="form.defName" placeholder="输入名称查询"></el-input>
            </el-form-item>
            <el-form-item label="type">
                <el-input v-model="form.defType" placeholder="输入type查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="onAdd" type="success" plain>新增</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="creditDef/query" :param="form" @loaded="loading=false" show-pager>
            <el-table-column prop="defName" label="名称" width="170">
            </el-table-column>
            <el-table-column prop="defType" label="type" width="170">
            </el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="props">
                    <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button>
                </template>
            </el-table-column>
        </LayoutTable>
        <LayoutDialog title="编辑" v-model="ShowDialog">
            <EditCreditDefForm :creditDef="creditDef" @success="onSearch" @close="ShowDialog=false"></EditCreditDefForm>
        </LayoutDialog>
    </LayoutPage>
</template>

<script>

import EditCreditDefForm from "./EditCreditDefForm"
export default {
  components: {
    EditCreditDefForm
  },
  data () {
    return {
      ShowDialog: false,
      creditDef: {},
      form: {},
      loading: false
    }
  },
  methods: {
    edit (creditDef) {
      this.creditDef = creditDef
      this.ShowDialog = true
    },
    onAdd () {
      this.creditDef = {}
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
