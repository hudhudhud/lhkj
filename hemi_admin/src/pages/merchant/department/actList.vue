<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item>
                <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" :url="`act_department/get_act_list/${this.form.departmentId}`" :param="form" @loaded="loading=false">
            <el-table-column prop="id" label="活动ID" width="150" align="center">
            </el-table-column>
            <el-table-column prop="actName" label="活动名称" align="center">
            </el-table-column>
        </LayoutTable>
    </LayoutPage>

</template>

<script>

export default {
  data () {
    return {
      form: {
        departmentId: this.$route.params.id
      },
      loading: false,
      showDialog: false,
      dialogVisible: false
    }
  },
  methods: {

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
