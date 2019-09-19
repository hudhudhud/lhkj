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
        <LayoutTable ref="myTable" url="lottery/get_winning_recode_list" :param="form" @loaded="loading=false">
            <el-table-column prop="id" label="ID" width="100" align="center">
            </el-table-column>
            <el-table-column prop="prizeName" label="注册用户" width="100" align="center">
            </el-table-column>
            <el-table-column label="抽奖时间" align="center">
            </el-table-column>

        </LayoutTable>
    </LayoutPage>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      form: {

      }

    }
  },
  methods: {

    created () {
    }
  }
}
</script>

<style scoped>
</style>
